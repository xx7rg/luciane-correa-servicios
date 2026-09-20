interface Env {
  VISITS_KV: KVNamespace;
}

interface CountryCount {
  code: string;
  count: number;
}

interface VisitStats {
  total: number;
  countries: CountryCount[];
}

const COUNTRY_PREFIX = "country:";
const VALID_COUNTRY = /^[A-Z]{2}$/;

async function readStats(kv: KVNamespace): Promise<VisitStats> {
  const list = await kv.list({ prefix: COUNTRY_PREFIX });
  const countries = await Promise.all(
    list.keys.map(async (key) => {
      const value = await kv.get(key.name);
      return { code: key.name.slice(COUNTRY_PREFIX.length), count: Number(value) || 0 };
    }),
  );
  countries.sort((a, b) => b.count - a.count);
  const total = countries.reduce((sum, country) => sum + country.count, 0);
  return { total, countries };
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const stats = await readStats(env.VISITS_KV);
  return Response.json(stats);
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const country = (request.cf?.country as string | undefined) ?? "";
  if (VALID_COUNTRY.test(country)) {
    const key = `${COUNTRY_PREFIX}${country}`;
    const current = Number(await env.VISITS_KV.get(key)) || 0;
    await env.VISITS_KV.put(key, String(current + 1));
  }
  const stats = await readStats(env.VISITS_KV);
  return Response.json(stats);
};
