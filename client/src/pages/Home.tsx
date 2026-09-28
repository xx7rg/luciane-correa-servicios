import {
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  HeartHandshake,
  House,
  Instagram,
  ImagePlus,
  MapPin,
  Menu,
  PawPrint,
  Send,
  Shirt,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const WHATSAPP_PHONE = "34653287150";
const waLink = (text: string) => `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
const WHATSAPP = waLink("Hola Luciane, me gustaría recibir más información sobre tus servicios.");

const packageOptions = [
  { number: "01", title: "Limpieza semanal", text: "Para mantener tu hogar siempre cuidado, ordenado y listo para disfrutar.", detail: "Cada semana", message: "Hola Luciane, me interesa el paquete de limpieza semanal." },
  { number: "02", title: "Limpieza quincenal", text: "Un apoyo regular para cuidar tu espacio con calma y constancia.", detail: "Cada dos semanas", message: "Hola Luciane, me interesa el paquete de limpieza quincenal." },
  { number: "03", title: "Limpieza profunda", text: "Una puesta a punto completa para renovar cada rincón de tu hogar.", detail: "A medida", message: "Hola Luciane, me interesa el paquete de limpieza profunda." },
];

const services = [
  {
    number: "01",
    icon: House,
    title: "Limpieza de hogares",
    text: "Apartamentos y casas cuidados con orden, atención y un acabado impecable.",
    message: "Hola Luciane, me interesa el servicio de limpieza de hogares.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Limpieza de portales",
    text: "Espacios comunes limpios, frescos y preparados para recibir a cada vecino.",
    message: "Hola Luciane, me interesa el servicio de limpieza de portales.",
  },
  {
    number: "03",
    icon: Shirt,
    title: "Planchado de ropa",
    text: "Ropa planchada con cuidado para que tu tiempo vuelva a estar contigo.",
    message: "Hola Luciane, me interesa el servicio de planchado de ropa.",
  },
  {
    number: "04",
    icon: PawPrint,
    title: "Cuidado de mascotas",
    text: "Acompañamiento atento y responsable para los animales de la familia.",
    message: "Hola Luciane, me interesa el servicio de cuidado de mascotas.",
  },
  {
    number: "05",
    icon: HeartHandshake,
    title: "Cuidado de niños",
    text: "Una presencia cercana y responsable para el cuidado de los más pequeños.",
    message: "Hola Luciane, me interesa el servicio de cuidado de niños.",
  },
];

interface CountryCount {
  code: string;
  count: number;
}

interface VisitStats {
  total: number;
  countries: CountryCount[];
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

const countryDisplayNames = typeof Intl !== "undefined" && "DisplayNames" in Intl ? new Intl.DisplayNames(["es"], { type: "region" }) : null;

function countryName(code: string) {
  return countryDisplayNames?.of(code) ?? code;
}

function flagEmoji(code: string) {
  if (!/^[A-Z]{2}$/i.test(code)) return "🏳️";
  return String.fromCodePoint(...[...code.toUpperCase()].map((char) => 127397 + char.charCodeAt(0)));
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      <path d="M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  return (
    <div className="star-picker" role="radiogroup" aria-label="Valoración de 1 a 5 estrellas">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} estrella${n > 1 ? "s" : ""}`}
          className={n <= value ? "is-filled" : ""}
          onClick={() => onChange(n)}
        >
          <Star size={24} fill={n <= value ? "currentColor" : "none"} />
        </button>
      ))}
    </div>
  );
}

interface ReviewFormState {
  name: string;
  text: string;
  rating: number;
  company: string;
}

function ReviewForm({
  reviewForm,
  setReviewForm,
  reviewStatus,
  onSubmit,
}: {
  reviewForm: ReviewFormState;
  setReviewForm: (value: ReviewFormState) => void;
  reviewStatus: "idle" | "sending" | "sent" | "error";
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  if (reviewStatus === "sent") {
    return <p className="review-form-status">¡Gracias por tu opinión! Se publicará en cuanto sea revisada.</p>;
  }
  return (
    <form className="review-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="company"
        value={reviewForm.company}
        onChange={(event) => setReviewForm({ ...reviewForm, company: event.target.value })}
        className="review-form-hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <label>
        Tu nombre
        <input value={reviewForm.name} onChange={(event) => setReviewForm({ ...reviewForm, name: event.target.value })} placeholder="¿Cómo te llamas?" required />
      </label>
      <label>
        Tu valoración
        <StarPicker value={reviewForm.rating} onChange={(rating) => setReviewForm({ ...reviewForm, rating })} />
      </label>
      <label>
        Tu opinión
        <textarea value={reviewForm.text} onChange={(event) => setReviewForm({ ...reviewForm, text: event.target.value })} rows={3} placeholder="Cuéntanos cómo fue tu experiencia" required />
      </label>
      <button type="submit" disabled={reviewStatus === "sending"}>
        {reviewStatus === "sending" ? "Enviando…" : "Enviar opinión"}
      </button>
      {reviewStatus === "error" && <p className="review-form-status is-error">Hubo un problema al enviar. Inténtalo de nuevo o escríbenos por WhatsApp.</p>}
    </form>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formWhatsappUrl, setFormWhatsappUrl] = useState("");
  const [visitStats, setVisitStats] = useState<VisitStats | null>(null);
  const [visitCount, setVisitCount] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", text: "", rating: 5, company: "" });
  const [reviewStatus, setReviewStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const visitsRef = useRef<HTMLDivElement>(null);
  const hasAnimatedVisits = useRef(false);
  const backToTopRef = useRef<HTMLAnchorElement>(null);
  const [nearFooter, setNearFooter] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();

    const lines = [
      `Hola Luciane, soy ${name}.`,
      `Mi teléfono: ${phone}.`,
      service && `Servicio de interés: ${service}.`,
      message,
    ].filter(Boolean);

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join(" "))}`;
    setFormWhatsappUrl(url);
    setFormSent(true);
    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
  }

  async function handleReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (reviewForm.company) return; // honeypot: real visitors never fill this hidden field
    setReviewStatus("sending");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      if (!res.ok) throw new Error("request failed");
      setReviewStatus("sent");
      setReviewForm({ name: "", text: "", rating: 5, company: "" });
    } catch {
      setReviewStatus("error");
    }
  }

  useEffect(() => {
    let cancelled = false;
    const VISIT_COOLDOWN_MS = 60 * 60 * 1000; // 1h: mesma pessoa recarregando não infla o contador
    const lastVisit = Number(localStorage.getItem("lc_visit_last")) || 0;
    const shouldCount = Date.now() - lastVisit > VISIT_COOLDOWN_MS;
    fetch("/api/visits", { method: shouldCount ? "POST" : "GET" })
      .then((res) => (res.ok ? (res.json() as Promise<VisitStats>) : null))
      .then((data) => {
        if (cancelled || !data) return;
        setVisitStats(data);
        if (shouldCount) localStorage.setItem("lc_visit_last", String(Date.now()));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/testimonials")
      .then((res) => (res.ok ? (res.json() as Promise<Testimonial[]>) : []))
      .then((data) => {
        if (!cancelled) setTestimonials(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!visitStats || hasAnimatedVisits.current) return;
    const target = visitsRef.current;
    if (!target) return;
    const total = visitStats.total;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      hasAnimatedVisits.current = true;
      observer.disconnect();
      const duration = 900;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVisitCount(Math.round(total * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, { threshold: 0.3 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [visitStats]);

  useEffect(() => {
    const trigger = backToTopRef.current;
    if (!trigger) return;
    let ticking = false;
    let scrollStopTimer: ReturnType<typeof setTimeout>;
    const update = () => {
      ticking = false;
      const overlap = window.innerHeight - trigger.getBoundingClientRect().top;
      if (overlap > 0) {
        document.documentElement.style.setProperty("--footer-clear", `${overlap + 16}px`);
        setNearFooter(true);
      } else {
        setNearFooter(false);
      }
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => setIsScrolling(false), 450);
      requestUpdate();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(document.body);
    return () => {
      clearTimeout(scrollStopTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Luciane Correa, inicio">
          <span className="brand-mark"><img src="/images/logo.jpg" alt="" /></span>
          <span className="brand-name">Luciane Correa</span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menú">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegación principal">
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#confianza" onClick={() => setMenuOpen(false)}>La diferencia</a>
          <a href="#proceso" onClick={() => setMenuOpen(false)}>Cómo trabajo</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          <a className="social-link" href="https://www.instagram.com/lu250779/" target="_blank" rel="noreferrer" aria-label="Instagram de Luciane Correa" onClick={() => setMenuOpen(false)}><Instagram size={17} /></a>
          <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Hablar por WhatsApp <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>


      <main>
        <section id="inicio" className="hero-section hero-editorial">
          <img className="hero-editorial-image" src="/images/hero-cocina.jpg" alt="Cocina luminosa y ordenada" />
          <div className="hero-editorial-overlay" aria-hidden="true" />
          <div className="hero-editorial-inner">
            <p className="hero-editorial-kicker"><span /> Servicios de limpieza y cuidado · Linares</p>
            <h1>Tu hogar,<br /><em>cuidado</em><br />con cariño.</h1>
            <p className="hero-editorial-lead">Limpieza, orden y tranquilidad para tu día a día. Un servicio cercano, responsable y hecho a tu medida.</p>
            <div className="hero-editorial-actions"><a className="editorial-cta" href="#servicios" onClick={(event) => { event.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Ver servicios <ArrowUpRight size={16} /></a><a className="editorial-link" href={WHATSAPP} target="_blank" rel="noreferrer">Hablar por WhatsApp <span>↗</span></a></div>
          </div>
          <div className="hero-editorial-footer"><span>Luciane Correa</span><span>Linares · Jaén · España</span></div>
        </section>

        {testimonials.length > 0 ? (
          <section className="gallery-section" aria-labelledby="trust-strip-title">
            <div className="gallery-heading"><div><div className="section-label">La confianza importa</div><h2 id="trust-strip-title">Opiniones<br /><em>reales.</em></h2></div><p>Experiencias auténticas de clientes que ya confiaron en el servicio.</p></div>
            <div className="testimonials-row">
              {testimonials.slice(0, 6).map((item) => (
                <div className="testimonial-item" key={item.id}>
                  <div className="testimonial-item-stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={13} fill={index < item.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p>&ldquo;{item.text}&rdquo;</p>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
            {showReviewForm ? (
              <ReviewForm reviewForm={reviewForm} setReviewForm={setReviewForm} reviewStatus={reviewStatus} onSubmit={handleReviewSubmit} />
            ) : (
              <button type="button" className="arrow-link review-form-toggle" onClick={() => setShowReviewForm(true)}>¿Ya usaste el servicio? Déjanos tu opinión <ArrowUpRight size={17} /></button>
            )}
          </section>
        ) : (
          <section className="trust-strip" aria-labelledby="trust-strip-title">
            <div className="section-label">La confianza importa</div>
            <div><h2 id="trust-strip-title">Opiniones reales,<br /><em>de quien ya confió.</em></h2><p>¿Ya usaste alguno de mis servicios? Cuéntame cómo fue tu experiencia.</p></div>
            <ReviewForm reviewForm={reviewForm} setReviewForm={setReviewForm} reviewStatus={reviewStatus} onSubmit={handleReviewSubmit} />
          </section>
        )}

        <section className="intro-section" id="confianza">
          <div className="section-label">01 — La diferencia</div>
          <div className="intro-content">
            <h2>Más que limpiar.<br /><span>Es cuidar tu espacio.</span></h2>
            <div className="intro-text"><p>Un hogar limpio cambia el ritmo del día. Mi trabajo es ayudarte a vivir con más calma, ocupándome de lo importante con discreción, constancia y atención personal.</p><a className="arrow-link" href={waLink("Hola Luciane, quiero contarte lo que necesito para mi hogar.")} target="_blank" rel="noreferrer">Cuéntame lo que necesitas <ArrowUpRight size={17} /></a></div>
          </div>
          <div className="intro-meta"><span><Clock3 size={16} /> Lun–Sáb · 07:00–18:00</span><span><MapPin size={16} /> Linares y alrededores</span><span><WhatsAppIcon size={16} /> Respuesta por WhatsApp</span></div>
        </section>

        <section className="about-section" id="sobre-mi">
          <div className="about-photo-frame">
            <img className="about-photo-image" src="/images/luciane.jpg" alt="Luciane Correa, profesional de limpieza y cuidado del hogar" />
            <div className="about-photo-tag">LC · cuidado cercano</div>
          </div>
          <div className="about-copy">
            <div className="section-label">02 — Sobre mí</div>
            <h2>Un servicio cercano,<br /><em>hecho para ti.</em></h2>
            <p>Soy Luciane y ayudo a familias, hogares y comunidades de Linares a vivir con más orden, calma y confianza. Cada servicio se adapta a lo que necesitas y a la forma en que quieres cuidar tu espacio.</p>
            <div className="availability-box"><CalendarDays size={20} /><div><strong>Horarios de atención</strong><span>Lunes a sábado · 07:00–18:00</span><small>Atención con cita previa.</small></div></div>
            <a className="arrow-link" href={waLink("Hola Luciane, me gustaría consultar tu disponibilidad.")} target="_blank" rel="noreferrer">Consultar disponibilidad <ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section id="servicios" className="services-section">
          <div className="services-heading"><div><div className="section-label">03 — Servicios</div><h2>Soluciones para<br /><em>tu día a día.</em></h2></div><p>Elige el apoyo que necesitas para que tu casa, tu familia y tu tiempo estén mejor.</p></div>
          <div className="services-grid">
            {services.map(({ number, icon: Icon, title, text, message }) => (
              <article className="service-card" key={title}>
                <div className="service-top"><span className="service-number">{number}</span><Icon size={26} strokeWidth={1.35} /></div>
                <h3>{title}</h3><p>{text}</p><a href={waLink(message)} target="_blank" rel="noreferrer" aria-label={`Solicitar ${title}`}><ArrowUpRight size={18} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="packages-section" id="paquetes">
          <div className="packages-heading"><div><div className="section-label">04 — Paquetes</div><h2>Elige el ritmo<br /><em>que necesitas.</em></h2></div><p>Opciones pensadas para que el cuidado de tu hogar encaje con tu rutina.</p></div>
          <div className="packages-grid">
            {packageOptions.map(({ number, title, text, detail, message }) => (
              <article className="package-card" key={title}><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p><div className="package-detail">{detail}<ArrowUpRight size={16} /></div><a href={waLink(message)} target="_blank" rel="noreferrer">Consultar este paquete</a></article>
            ))}
          </div>
          <p className="packages-footnote">Cada hogar es diferente. Te preparo una propuesta personalizada después de conocer tus necesidades.</p>
        </section>

        <section className="gallery-section" id="proceso">
          <div className="gallery-heading"><div><div className="section-label">05 — Cómo trabajo</div><h2>Cada rincón,<br /><em>con atención.</em></h2></div><p>Esto es lo que puedes esperar en cada visita, sin sorpresas.</p></div>
          <div className="process-grid">
            <div className="process-item"><Check size={20} strokeWidth={2} /><div><h3>Cocina</h3><p>Encimeras, electrodomésticos y suelo dejados a punto.</p></div></div>
            <div className="process-item"><Check size={20} strokeWidth={2} /><div><h3>Baños</h3><p>Desinfección completa de sanitarios y azulejos.</p></div></div>
            <div className="process-item"><Check size={20} strokeWidth={2} /><div><h3>Habitaciones y salón</h3><p>Polvo, suelos y una sensación de orden inmediata.</p></div></div>
            <div className="process-item"><Check size={20} strokeWidth={2} /><div><h3>Detalles finales</h3><p>Cristales interiores, orden y últimos acabados revisados.</p></div></div>
          </div>
          <div className="gallery-note"><ImagePlus size={17} /><span>&iquest;Quieres ver el antes y despu&eacute;s de tu propio hogar aqu&iacute;? Escr&iacute;beme por WhatsApp.</span><a className="arrow-link" href={waLink("Hola Luciane, me gustaría enviarte fotos del antes y después de mi hogar.")} target="_blank" rel="noreferrer">Hablar por WhatsApp <ArrowUpRight size={17} /></a></div>
        </section>

        <section className="split-section">
          <div className="split-copy"><div className="section-label">06 — Una forma de trabajar</div><h2>Orden, cuidado<br />y <em>tranquilidad.</em></h2><p>Trabajo con una mirada práctica y detallista: respeto por tu casa, puntualidad y comunicación clara desde el primer contacto.</p><div className="promise-list"><div><span>01</span><p><strong>Responsabilidad</strong><br />Cada tarea merece atención.</p></div><div><span>02</span><p><strong>Confianza</strong><br />Una relación sencilla y transparente.</p></div><div><span>03</span><p><strong>Flexibilidad</strong><br />Un servicio que se adapta a ti.</p></div></div></div>
        </section>

        <section className="care-section"><div className="care-copy"><div className="care-icons" aria-hidden="true"><span><PawPrint size={22} strokeWidth={1.3} /></span><span><HeartHandshake size={22} strokeWidth={1.3} /></span></div><div className="section-label">07 — Cuidado familiar</div><h2>También estoy para<br /><em>lo que más importa.</em></h2><p>Cuidado atento para mascotas y niños, con una presencia serena y responsable cuando no puedes estar.</p><a className="button button-light" href={waLink("Hola Luciane, necesito información sobre cuidado de mascotas o niños.")} target="_blank" rel="noreferrer">Hablemos de tu necesidad <ArrowUpRight size={17} /></a></div></section>

        <section className="faq-section" id="faq">
          <div className="faq-heading"><div><div className="section-label">08 — Preguntas frecuentes</div><h2>Todo claro<br /><em>desde el principio.</em></h2></div><p>Respuestas rápidas para ayudarte a elegir el servicio adecuado.</p></div>
          <div className="faq-list">
            <details><summary>¿Qué servicios ofrece Luciane?</summary><p>Servicios de limpieza de apartamentos, casas y portales, planchado de ropa, cuidado de mascotas y cuidado de niños en Linares y alrededores.</p></details>
            <details><summary>¿Cómo funcionan los paquetes?</summary><p>Puedes elegir una limpieza semanal, quincenal o una limpieza profunda. Cada hogar es diferente, por eso la propuesta final se confirma después de conocer tus necesidades.</p></details>
            <details><summary>¿Cuál es el horario de atención?</summary><p>La atención está disponible de lunes a sábado, de 07:00 a 18:00, siempre con cita previa y según disponibilidad.</p></details>
            <details><summary>¿Cómo puedo reservar un servicio?</summary><p>Puedes escribir por WhatsApp o utilizar el formulario de contacto de esta página. Indica el servicio que necesitas y la zona para recibir una respuesta.</p></details>
            <details><summary>¿Qué formas de pago están disponibles?</summary><p>Las formas de pago se confirman directamente con Luciane al reservar el servicio, según el tipo de trabajo y las condiciones acordadas.</p></details>
            <details><summary>¿Puedo enviar fotos para solicitar un presupuesto?</summary><p>Sí. Puedes enviar fotos del espacio por WhatsApp indicando qué servicio necesitas. Esto ayuda a preparar una orientación más adecuada.</p></details>
          </div>
        </section>

        <section className="quick-contact-section" id="mensaje">
          <div className="quick-contact-copy"><div className="section-label">09 — Solicitar presupuesto</div><h2>Cuéntame qué<br /><em>necesitas.</em></h2><p>Completa el formulario y te prepararé una orientación inicial para el servicio que buscas.</p></div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>Nombre<input name="name" required placeholder="Tu nombre" /></label>
            <label>Teléfono<input name="phone" required placeholder="+34 ..." /></label>
            <label>Servicio<select name="service" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Limpieza semanal</option><option>Limpieza quincenal</option><option>Limpieza profunda</option><option>Otro servicio</option></select></label>
            <label>Mensaje<textarea name="message" required placeholder="¿En qué puedo ayudarte?" rows={4} /></label>
            <button className="button button-primary" type="submit">Solicitar presupuesto <Send size={16} /></button>
            {formSent && (
              <p className="form-status">
                Se abrió WhatsApp con tu mensaje listo para enviar. Si no se abrió automáticamente,{" "}
                <a href={formWhatsappUrl} target="_blank" rel="noreferrer">haz clic aquí</a>.
              </p>
            )}
          </form>
        </section>

        <section id="contacto" className="contact-section"><div className="contact-mark"><img src="/images/logo.jpg" alt="" /></div><div className="contact-name">Luciane Correa</div><div className="section-label">10 — Contacto</div><h2>¿Hablamos?</h2><p>Cuéntame qué necesitas y te responderé por WhatsApp.</p><a className="contact-number" href={WHATSAPP} target="_blank" rel="noreferrer">+34 653 28 71 50 <ArrowUpRight size={23} /></a><div className="contact-place"><MapPin size={16} /> Linares · Jaén · España</div></section>
      </main>

      <a className="back-to-top" ref={backToTopRef} href="#inicio" aria-label="Volver al principio" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><ArrowUp size={17} /><span>Volver al inicio</span></a>
      <a className={`floating-whatsapp${nearFooter ? " is-raised" : ""}${isScrolling ? " is-scrolling" : ""}`} href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><WhatsAppIcon size={22} /><span>WhatsApp</span></a>
      <footer className="site-footer">
        <div className="footer-visits" ref={visitsRef} aria-label="Visitantes por país">
          <span className="footer-copyright">© 2026 Luciane Correa</span>
          {visitStats && (
            <div className="footer-visitor-line">
              <strong><span className="visit-number">{visitCount}</span> visitas</strong>
              {visitStats.countries.slice(0, 2).map((country, index) => (
                <span
                  key={country.code}
                  className={index === 0 ? "visit-country visit-country-main" : "visit-country"}
                  data-tooltip={countryName(country.code)}
                  title={countryName(country.code)}
                  aria-label={countryName(country.code)}
                >
                  {flagEmoji(country.code)}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="footer-credit">Proyecto por <a href="https://www.instagram.com/_7ragnar/" target="_blank" rel="noreferrer"><strong>x7rG ENTERPRISE</strong></a></div>
      </footer>
    </div>
  );
}
