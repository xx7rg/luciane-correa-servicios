import { Check, LogIn, LogOut, Star, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  published: boolean;
  createdAt: number;
}

const STORAGE_KEY = "lc_admin_token";

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(STORAGE_KEY) || "");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [items, setItems] = useState<Testimonial[] | null>(null);

  async function loadAll(currentToken: string) {
    const res = await fetch("/api/testimonials?all=1", { headers: { Authorization: `Bearer ${currentToken}` } });
    if (res.status === 401) {
      sessionStorage.removeItem(STORAGE_KEY);
      setToken("");
      setAuthError("Contraseña incorrecta.");
      return;
    }
    setItems((await res.json()) as Testimonial[]);
  }

  useEffect(() => {
    if (token) loadAll(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, passwordInput);
    setToken(passwordInput);
    setAuthError("");
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setItems(null);
  }

  async function togglePublished(item: Testimonial) {
    await fetch(`/api/testimonials?id=${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ published: !item.published }),
    });
    await loadAll(token);
  }

  async function remove(item: Testimonial) {
    if (!confirm(`¿Eliminar la opinión de ${item.name}?`)) return;
    await fetch(`/api/testimonials?id=${item.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    await loadAll(token);
  }

  if (!token) {
    return (
      <div className="admin-shell admin-login">
        <form onSubmit={handleLogin} className="admin-login-card">
          <h1>Panel de opiniones</h1>
          <p>Introduce la contraseña de administración para aprobar o rechazar las opiniones enviadas por tus clientes.</p>
          <input
            type="password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            placeholder="Contraseña"
            autoFocus
            required
          />
          {authError && <p className="admin-error">{authError}</p>}
          <button type="submit">
            <LogIn size={16} /> Entrar
          </button>
        </form>
      </div>
    );
  }

  const pending = items?.filter((item) => !item.published) ?? [];
  const published = items?.filter((item) => item.published) ?? [];

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1>Opiniones de clientes</h1>
        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={15} /> Salir
        </button>
      </header>

      <div className="admin-list">
        {items === null && <p className="admin-empty">Cargando…</p>}
        {items && items.length === 0 && <p className="admin-empty">Todavía no ha llegado ninguna opinión. En cuanto un cliente envíe una desde la web, aparecerá aquí para que la apruebes.</p>}

        <h3 className="admin-list-title">Pendientes de revisar ({pending.length})</h3>
        {pending.length === 0 && <p className="admin-empty">No hay opiniones esperando aprobación.</p>}
        {pending.map((item) => (
          <article className="admin-item" key={item.id}>
            <div className="admin-item-head">
              <strong>{item.name}</strong>
              <Stars rating={item.rating} />
            </div>
            <p>{item.text}</p>
            <div className="admin-item-actions">
              <button className="admin-approve" onClick={() => togglePublished(item)}>
                <Check size={14} /> Aprobar y publicar
              </button>
              <button className="admin-delete" onClick={() => remove(item)}>
                <X size={14} /> Rechazar
              </button>
            </div>
          </article>
        ))}

        {published.length > 0 && (
          <>
            <h3 className="admin-list-title">Publicadas en la web ({published.length})</h3>
            {published.map((item) => (
              <article className="admin-item is-published" key={item.id}>
                <div className="admin-item-head">
                  <strong>{item.name}</strong>
                  <Stars rating={item.rating} />
                </div>
                <p>{item.text}</p>
                <div className="admin-item-actions">
                  <button onClick={() => togglePublished(item)}>Ocultar de la web</button>
                  <button className="admin-delete" onClick={() => remove(item)}>
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              </article>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="admin-stars" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={13} fill={index < rating ? "currentColor" : "none"} />
      ))}
    </span>
  );
}
