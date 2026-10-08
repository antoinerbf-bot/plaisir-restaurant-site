import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown, ArrowRight, Calendar, Check, ChevronLeft, ChevronRight,
  Clock, Instagram, MapPin, Menu as MenuIcon, Phone, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/plaisir-logo.png.asset.json";
import interior from "@/assets/plaisir-interieur.jpg.asset.json";
import {
  phone, phoneDisplay, maps, socials, siteUrl,
  dishes, signatures, gallery, hoursDisplay, copy, isOpenNow, schemaOrg,
  type Lang, type Category,
} from "@/lib/plaisir-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Restaurant Plaisir — Cuisine belgo-française à Lasne | Réservation" },
      { name: "description", content: "Restaurant Plaisir à Lasne (Belgique) : cuisine belgo-française généreuse par Patrick Ridremont & Tristan Petiaux. Carte, menus, horaires, réservation en ligne." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Restaurant Plaisir — Lasne" },
      { property: "og:description", content: "Cuisine belgo-française canaille et généreuse. Réservez votre table à Lasne." },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: siteUrl },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schemaOrg) }],
  }),
  component: Home,
});

function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [category, setCategory] = useState<Category>("starters");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [bookSent, setBookSent] = useState(false);
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const sections = ["histoire", "carte", "incontournables", "atmosphere", "infos"];
  const currentImage = gallery[lightbox ?? 0] ?? gallery[0];
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    setOpen(isOpenNow());
    const id = setInterval(() => setOpen(isOpenNow()), 60000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (lightbox === null && !bookOpen && !mobileMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightbox(null); setBookOpen(false); setMobileMenu(false); }
      if (lightbox !== null) {
        if (e.key === "ArrowRight") setLightbox((c) => (c === null ? null : (c + 1) % gallery.length));
        if (e.key === "ArrowLeft") setLightbox((c) => (c === null ? null : (c - 1 + gallery.length) % gallery.length));
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, bookOpen, mobileMenu]);

  function openBook() { setBookSent(false); setBookOpen(true); setMobileMenu(false); }
  function handleBook(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const tel = String(fd.get("phone") || "");
    const date = String(fd.get("date") || "");
    const time = String(fd.get("time") || "");
    const guests = String(fd.get("guests") || "");
    const message = String(fd.get("message") || "");
    const subject = encodeURIComponent(`Réservation Plaisir — ${name} — ${date} ${time} — ${guests} pers.`);
    const body = encodeURIComponent(`Nouvelle demande de réservation\n\nNom: ${name}\nEmail: ${email}\nTéléphone: ${tel}\nDate: ${date}\nHeure: ${time}\nCouverts: ${guests}\nMessage: ${message || "—"}\n\n— Envoyé depuis le site Plaisir`);
    window.location.href = `mailto:contact@plaisir-lasne.be?subject=${subject}&body=${body}`;
    setBookSent(true);
  }

  return (
    <main id="haut" className="overflow-x-hidden bg-cream text-foreground">
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "border-b border-wine/10 bg-cream/95 text-wine shadow-sm backdrop-blur-md" : "border-b border-cream/20 bg-transparent text-cream"}`}>
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-20 md:px-10 lg:px-14">
          <a href="#haut" className="w-fit text-[11px] font-semibold tracking-[0.16em] uppercase" aria-label="Restaurant Plaisir">PLAISIR<span className={`hidden sm:inline ${scrolled ? "text-gold" : "text-gold/90"}`}> · LASNE</span></a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {t.nav.map((label, i) => (
              <a key={sections[i]} href={`#${sections[i]}`} className={`text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-gold ${scrolled ? "text-wine/80" : "text-cream/90"}`}>{label}</a>
            ))}
          </nav>
          <span className={`font-display text-lg italic lg:hidden ${scrolled ? "text-wine" : "text-gold"}`}>Plaisir</span>
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <div className="flex items-center gap-0.5 text-[11px] font-bold tracking-[0.08em]" aria-label="Language">
              <button type="button" className={`h-8 px-1.5 ${lang === "fr" ? "text-gold" : scrolled ? "text-wine/50" : "text-cream/60"}`} onClick={() => setLang("fr")} aria-pressed={lang === "fr"}>FR</button>
              <span className={scrolled ? "text-wine/30" : "text-cream/40"}>/</span>
              <button type="button" className={`h-8 px-1.5 ${lang === "en" ? "text-gold" : scrolled ? "text-wine/50" : "text-cream/60"}`} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
            </div>
            <Button onClick={openBook} className={`hidden h-10 rounded-none px-5 text-[11px] font-semibold uppercase tracking-[0.08em] shadow-none md:inline-flex ${scrolled ? "border border-wine bg-wine text-cream hover:bg-teal" : "border border-gold bg-transparent text-gold hover:bg-gold hover:text-wine"}`}>
              {t.reserve}<ArrowRight className="ml-1 size-3.5" />
            </Button>
            <button type="button" className={`lg:hidden ${scrolled ? "text-wine" : "text-cream"}`} onClick={() => setMobileMenu(true)} aria-label={t.menuToggle}><MenuIcon size={22} /></button>
          </div>
        </div>
      </header>

      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-wine/98 text-cream lg:hidden" role="dialog" aria-modal="true">
          <div className="flex h-16 items-center justify-between px-5">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase">PLAISIR · LASNE</span>
            <button type="button" onClick={() => setMobileMenu(false)} aria-label={t.close}><X size={22} /></button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pt-8" aria-label="Mobile">
            {t.nav.map((label, i) => (
              <a key={sections[i]} href={`#${sections[i]}`} onClick={() => setMobileMenu(false)} className="border-b border-cream/10 py-4 font-display text-2xl">{label}</a>
            ))}
            <button type="button" onClick={openBook} className="mt-8 flex h-14 items-center justify-center gap-2 border border-gold bg-gold text-sm font-semibold uppercase tracking-wider text-wine">{t.reserve}<ArrowRight size={16} /></button>
          </nav>
        </div>
      )}

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-wine">
        <img src={interior.url} alt={gallery[0][lang]} className="absolute inset-0 h-full w-full object-cover" width={1600} height={901} fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/70 to-wine/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-28 pt-32 md:px-10 md:pb-36 lg:px-14">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold"><span className="h-px w-8 bg-gold" />{t.heroKicker}</p>
            <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-cream whitespace-pre-line">{t.heroTitle}</h1>
            <p className="mt-3 font-display text-xl italic text-gold sm:text-2xl">{t.heroTagline}</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">{t.heroText}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="h-12 rounded-none border-0 bg-gold px-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-wine shadow-none hover:bg-cream"><a href="#carte">{t.explore}<ArrowRight className="ml-1.5 size-3.5" /></a></Button>
              <Button onClick={openBook} className="h-12 rounded-none border border-cream/40 bg-transparent px-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream shadow-none hover:bg-cream/10">{t.reserve}</Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-[11px] tracking-wide text-cream/60">
              <span className="inline-flex items-center gap-1.5"><span className={`size-1.5 rounded-full ${open ? "bg-emerald-400" : "bg-cream/40"}`} />{open ? t.openNow : t.closedNow}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{t.location}</span>
            </div>
          </div>
        </div>
        <a href="#histoire" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/50 hover:text-gold">{t.scroll}<ArrowDown size={14} className="animate-bounce" /></a>
      </section>

      <section id="histoire" className="bg-cream py-20 md:py-28 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-14">
          <div>
            <Eyebrow>{t.introEyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-lg font-display text-4xl leading-[1.12] text-wine sm:text-5xl lg:text-[3.25rem]">{t.introTitle}</h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-xl text-base leading-relaxed text-wine/75 sm:text-lg">{t.introText}</p>
            <blockquote className="mt-10 border-l-2 border-gold pl-6"><p className="font-display text-xl italic text-wine sm:text-2xl">{t.introQuote}</p></blockquote>
            <div className="mt-10 flex flex-wrap gap-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-wine/50">
              <span>{t.cuisine}</span><span>{t.capacity}</span><span>Patrick Ridremont · Tristan Petiaux</span>
            </div>
          </div>
        </div>
      </section>

      <section id="carte" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
          <div className="max-w-xl">
            <Eyebrow>{t.menuEyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-[1.12] text-wine sm:text-5xl lg:text-[3.25rem]">{t.menuTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-wine/65 sm:text-base">{t.menuText}</p>
          </div>
          <div className="mt-10 flex gap-1 overflow-x-auto border-b border-wine/10" role="tablist">
            {(Object.keys(dishes) as Category[]).map((cat) => (
              <button key={cat} type="button" role="tab" aria-selected={category === cat} onClick={() => setCategory(cat)}
                className={`shrink-0 border-b-2 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${category === cat ? "border-wine text-wine" : "border-transparent text-wine/40 hover:text-wine/70"}`}>
                {t.categories[cat]}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-0 sm:grid-cols-2" role="tabpanel">
            {dishes[category].map((dish) => (
              <article key={dish.fr} className="flex items-start justify-between gap-4 border-b border-wine/10 py-5 sm:px-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-display text-lg text-wine sm:text-xl">{dish[lang]}</h3>
                    {dish.highlight && <span className="text-[9px] font-bold text-gold">★</span>}
                  </div>
                  {dish.description && <p className="mt-1 text-sm leading-snug text-wine/50">{dish.description[lang]}</p>}
                </div>
                <span className="shrink-0 font-display text-lg tabular-nums text-wine">{dish.price}&nbsp;€</span>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-wine/40">{t.menuNote}</p>
        </div>
      </section>

      <section id="incontournables" className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
          <Eyebrow>{t.signaturesEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.12] text-wine sm:text-5xl">{t.signaturesTitle}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {signatures.map((item, i) => (
              <figure key={item.dish.fr} className="group cursor-pointer" onClick={() => setLightbox(i + 1)}>
                <div className="relative aspect-[3/4] overflow-hidden bg-wine/5">
                  <img src={item.src} alt={item.dish[lang]} loading="lazy" width={600} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 bg-wine/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-cream">{item.tag[lang]}</span>
                </div>
                <figcaption className="mt-4">
                  <h3 className="font-display text-lg text-wine">{item.dish[lang]}</h3>
                  <p className="mt-0.5 text-sm text-wine/50">{item.dish.price}&nbsp;€</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="atmosphere" className="bg-teal py-20 text-cream md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
          <Eyebrow light>{t.galleryEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.12] sm:text-5xl">{t.galleryTitle}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">{t.galleryText}</p>
          <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            <button type="button" onClick={() => setLightbox(0)} className="group col-span-2 row-span-2 overflow-hidden" aria-label={gallery[0][lang]}>
              <img src={interior.url} alt={gallery[0][lang]} loading="lazy" width={1600} height={901} className="aspect-[4/3] h-full w-full object-cover transition-opacity group-hover:opacity-85 md:min-h-[420px]" />
            </button>
            {gallery.slice(1).map((item, i) => (
              <button key={item.src} type="button" onClick={() => setLightbox(i + 1)} className="group overflow-hidden" aria-label={item[lang]}>
                <img src={item.src} alt={item[lang]} loading="lazy" width={600} height={800} className="aspect-square w-full object-cover transition-opacity group-hover:opacity-85" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="infos" className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14">
          <div>
            <Eyebrow>{t.practicalEyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-md font-display text-4xl leading-[1.12] text-wine sm:text-5xl">{t.practicalTitle}</h2>
            <div className="mt-10 space-y-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-wine/50">{t.address}</p>
                <address className="mt-2 font-display text-xl not-italic text-wine">Chemin du Gros Tienne 1<br />1380 Lasne, Belgique</address>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={openBook} className="h-12 rounded-none bg-wine px-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream shadow-none hover:bg-teal"><Calendar className="mr-1.5 size-3.5" />{t.reserve}</Button>
                <Button asChild variant="outline" className="h-12 rounded-none border-wine/30 bg-transparent px-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-wine shadow-none hover:bg-wine hover:text-cream"><a href={`tel:${phone}`}><Phone className="mr-1.5 size-3.5" />{phoneDisplay}</a></Button>
                <Button asChild variant="outline" className="h-12 rounded-none border-wine/30 bg-transparent px-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-wine shadow-none hover:bg-wine hover:text-cream"><a href={maps} target="_blank" rel="noreferrer"><MapPin className="mr-1.5 size-3.5" />{t.directions}</a></Button>
              </div>
            </div>
          </div>
          <div className="lg:border-l lg:border-wine/10 lg:pl-16">
            <h3 className="flex items-center gap-2 font-display text-2xl text-wine"><Clock size={18} className="text-gold" />{t.hours}</h3>
            <div className="mt-6 space-y-0">
              {hoursDisplay.map((row) => (
                <div key={row.fr} className="grid grid-cols-[1fr_auto] gap-4 border-b border-wine/10 py-3.5 text-sm">
                  <span className="font-medium text-wine">{row[lang]}</span>
                  <span className={row.hours ? "text-wine/55" : "font-medium text-wine/35">{row.hours ?? t.closed}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.15em] text-wine/50">{t.follow}</p>
            <div className="mt-3 flex gap-6 text-sm">
              <a href={socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-wine underline decoration-gold/60 underline-offset-8 hover:text-gold"><Instagram size={16} />Instagram</a>
              <a href={socials.facebook} target="_blank" rel="noreferrer" className="text-wine underline decoration-gold/60 underline-offset-8 hover:text-gold">Facebook ↗</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-wine px-5 py-14 text-cream md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 border-b border-gold/20 pb-10 md:flex-row md:items-end">
          <div>
            <img src={logo.url} alt="Plaisir" className="h-auto w-36 object-contain brightness-0 invert" width={200} height={40} />
            <p className="mt-4 max-w-xs text-sm text-cream/60">{t.footer}</p>
          </div>
          <div className="flex flex-wrap gap-8 text-[11px] font-semibold uppercase tracking-[0.1em]">
            <a href="#carte" className="hover:text-gold">{t.categories.starters}</a>
            <button type="button" onClick={openBook} className="hover:text-gold">{t.reserve}</button>
            <a href={`tel:${phone}`} className="hover:text-gold">{phoneDisplay}</a>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 pt-6 text-xs text-cream/40">
          <span>© {new Date().getFullYear()} Restaurant Plaisir</span>
          <span>Chemin du Gros Tienne 1 · 1380 Lasne</span>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold/40 bg-wine text-cream md:hidden">
        <a href={`tel:${phone}`} className="flex h-14 items-center justify-center gap-1.5 border-r border-cream/15 text-[10px] font-semibold uppercase"><Phone size={14} />{t.call}</a>
        <button type="button" onClick={openBook} className="flex h-14 items-center justify-center gap-1.5 border-r border-cream/15 text-[10px] font-semibold uppercase text-gold">{t.reserve}</button>
        <a href={maps} target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-1.5 text-[10px] font-semibold uppercase"><MapPin size={14} />{t.directions}</a>
      </div>

      {lightbox !== null && (
        <div role="dialog" aria-modal="true" aria-label={currentImage[lang]} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wine/96 p-4 text-cream" onClick={() => setLightbox(null)}>
          <button type="button" onClick={() => setLightbox(null)} aria-label={t.close} className="absolute right-5 top-5 text-cream/70 hover:text-gold"><X size={24} /></button>
          <img src={currentImage.src} alt={currentImage[lang]} className="max-h-[78vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="mt-4 font-display text-lg">{currentImage[lang]}</p>
          <div className="mt-5 flex items-center gap-8">
            <button type="button" className="text-cream/70 hover:text-gold" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }} aria-label={t.previous}><ChevronLeft size={24} /></button>
            <span className="text-xs tracking-widest">{lightbox + 1} / {gallery.length}</span>
            <button type="button" className="text-cream/70 hover:text-gold" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} aria-label={t.next}><ChevronRight size={24} /></button>
          </div>
        </div>
      )}

      {bookOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="book-title" className="fixed inset-0 z-50 flex items-end justify-center bg-wine/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setBookOpen(false)}>
          <div className="w-full max-w-lg overflow-hidden bg-cream shadow-2xl sm:rounded-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-wine/10 px-6 py-4">
              <div>
                <h2 id="book-title" className="font-display text-xl text-wine sm:text-2xl">{t.bookTitle}</h2>
                <p className="mt-0.5 text-xs text-wine/50">{t.bookSubtitle}</p>
              </div>
              <button type="button" onClick={() => setBookOpen(false)} aria-label={t.close} className="text-wine/40 hover:text-wine"><X size={20} /></button>
            </div>
            {bookSent ? (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-wine text-cream"><Check size={24} /></div>
                <h3 className="mt-5 font-display text-2xl text-wine">{t.bookSuccess}</h3>
                <p className="mt-2 max-w-xs text-sm text-wine/60">{t.bookSuccessText}</p>
                <Button onClick={() => setBookOpen(false)} className="mt-8 h-11 rounded-none bg-wine px-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream hover:bg-teal">OK</Button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4 px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.bookName} name="name" required />
                  <Field label={t.bookEmail} name="email" type="email" required />
                </div>
                <Field label={t.bookPhone} name="phone" type="tel" required />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label={t.bookDate} name="date" type="date" required min={today} />
                  <Field label={t.bookTime} name="time" type="time" required />
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-wine/60">{t.bookGuests}</label>
                    <div className="relative">
                      <Users size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-wine/30" />
                      <select name="guests" required defaultValue="2" className="h-11 w-full appearance-none border border-wine/15 bg-white pl-9 pr-3 text-sm text-wine outline-none focus:border-wine">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-wine/60">{t.bookMessage}</label>
                  <textarea name="message" rows={2} className="w-full resize-none border border-wine/15 bg-white px-3 py-2.5 text-sm text-wine outline-none focus:border-wine" />
                </div>
                <Button type="submit" className="h-12 w-full rounded-none bg-wine text-[11px] font-semibold uppercase tracking-[0.12em] text-cream shadow-none hover:bg-teal">{t.bookSubmit}<ArrowRight className="ml-1.5 size-3.5" /></Button>
                <p className="text-center text-xs text-wine/40">{t.bookNote}{" "}<a href={`tel:${phone}`} className="font-medium text-wine underline decoration-gold underline-offset-4">{phoneDisplay}</a></p>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="h-14 md:hidden" />
    </main>
  );
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.19em] ${light ? "text-gold" : "text-wine"}`}>
      <span className="h-px w-7 bg-gold" />{children}
    </p>
  );
}

function Field({ label, name, type = "text", required, min }: { label: string; name: string; type?: string; required?: boolean; min?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-wine/60">{label}{required && <span className="text-gold"> *</span>}</label>
      <input name={name} type={type} required={required} min={min} className="h-11 w-full border border-wine/15 bg-white px-3 text-sm text-wine outline-none focus:border-wine" />
    </div>
  );
}
