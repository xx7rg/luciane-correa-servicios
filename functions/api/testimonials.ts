interface Env {
  TESTIMONIALS_KV: KVNamespace;
  ADMIN_PASSWORD: string;
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  published: boolean;
  createdAt: number;
}

const PREFIX = "t:";

function isAuthorized(request: Request, env: Env): boolean {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  return Boolean(env.ADMIN_PASSWORD) && token === env.ADMIN_PASSWORD;
}

async function listAll(kv: KVNamespace): Promise<Testimonial[]> {
  const list = await kv.list({ prefix: PREFIX });
  const items = await Promise.all(
    list.keys.map(async (key) => {
      const value = await kv.get(key.name);
      return value ? (JSON.parse(value) as Testimonial) : null;
    }),
  );
  return items.filter((item): item is Testimonial => Boolean(item)).sort((a, b) => b.createdAt - a.createdAt);
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const all = await listAll(env.TESTIMONIALS_KV);
  if (url.searchParams.get("all") === "1") {
    if (!isAuthorized(request, env)) return new Response("Unauthorized", { status: 401 });
    return Response.json(all);
  }
  return Response.json(all.filter((item) => item.published));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Public endpoint: anyone can submit a testimonial from the site. It always lands
  // unpublished (pending review) unless the request carries a valid admin token —
  // that's the only path that auto-publishes, for Luciane adding one herself.
  const admin = isAuthorized(request, env);
  const body = (await request.json()) as { name?: string; text?: string; rating?: number; company?: string };
  if (body.company) return new Response("Unauthorized", { status: 401 }); // honeypot field, bots fill it in
  const name = (body.name || "").trim().slice(0, 80);
  const text = (body.text || "").trim().slice(0, 600);
  if (!name || !text) return new Response("Faltan datos", { status: 400 });
  const rating = Math.min(5, Math.max(1, Math.round(body.rating || 5)));
  const entry: Testimonial = { id: crypto.randomUUID(), name, text, rating, published: admin, createdAt: Date.now() };
  await env.TESTIMONIALS_KV.put(PREFIX + entry.id, JSON.stringify(entry));
  return Response.json({ id: entry.id, published: entry.published });
};

export const onRequestPatch: PagesFunction<Env> = async ({ request, env }) => {
  if (!isAuthorized(request, env)) return new Response("Unauthorized", { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return new Response("Falta id", { status: 400 });
  const key = PREFIX + id;
  const current = await env.TESTIMONIALS_KV.get(key);
  if (!current) return new Response("No encontrado", { status: 404 });
  const entry = JSON.parse(current) as Testimonial;
  const body = (await request.json()) as { published?: boolean };
  if (typeof body.published === "boolean") entry.published = body.published;
  await env.TESTIMONIALS_KV.put(key, JSON.stringify(entry));
  return Response.json(entry);
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!isAuthorized(request, env)) return new Response("Unauthorized", { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return new Response("Falta id", { status: 400 });
  await env.TESTIMONIALS_KV.delete(PREFIX + id);
  return new Response(null, { status: 204 });
};
