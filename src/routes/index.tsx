import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight, Calendar, Check, ChevronLeft, ChevronRight,
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
      { title: "Plaisir — Restaurant à Lasne | Cuisine belgo-française" },
      { name: "description", content: "Restaurant Plaisir à Lasne : cuisine belgo-française canaille par Tristan Petiaux & Patrick Ridremont. Carte, horaires, réservation." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Plaisir — Lasne" },
      { property: "og:description", content: "Cuisine belgo-française généreuse. Réserver à Lasne." },
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
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    const body = encodeURIComponent(`Réservation\n\nNom: ${name}\nEmail: ${email}\nTél: ${tel}\nDate: ${date}\nHeure: ${time}\nCouverts: ${guests}\nMessage: ${message || "—"}\n\n— Site Plaisir`);
    window.location.href = `mailto:contact@plaisir-lasne.be?subject=${subject}&body=${body}`;
    setBookSent(true);
  }

  return (
    <main id="haut" className="min-h-screen bg-cream text-wine antialiased">
      <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${scrolled ? "border-b border-wine/10 bg-cream/95 text-wine backdrop-blur-sm" : "bg-transparent text-cream"}`}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
          <a href="#haut" className="font-display text-xl tracking-tight">Plaisir</a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation">
            {t.nav.map((label, i) => (
              <a key={sections[i]} href={`#${sections[i]}`} className={`text-[13px] transition-colors ${scrolled ? "text-wine/70 hover:text-wine" : "text-cream/80 hover:text-cream"}`}>{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[12px] font-medium" aria-label="Language">
              <button type="button" className={`px-1 ${lang === "fr" ? (scrolled ? "text-wine" : "text-cream") : (scrolled ? "text-wine/40" : "text-cream/45")}`} onClick={() => setLang("fr")} aria-pressed={lang === "fr"}>FR</button>
              <span className={scrolled ? "text-wine/25" : "text-cream/30"}>/</span>
              <button type="button" className={`px-1 ${lang === "en" ? (scrolled ? "text-wine" : "text-cream") : (scrolled ? "text-wine/40" : "text-cream/45")}`} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
            </div>
            <Button onClick={openBook} className={`hidden h-9 rounded-sm px-4 text-[12px] font-medium shadow-none md:inline-flex ${scrolled ? "bg-wine text-cream hover:bg-teal" : "bg-cream text-wine hover:bg-white"}`}>{t.reserve}</Button>
            <button type="button" className="md:hidden" onClick={() => setMobileMenu(true)} aria-label={t.menuToggle}><MenuIcon size={20} /></button>
          </div>
        </div>
      </header>

      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-cream md:hidden" role="dialog" aria-modal="true">
          <div className="flex h-14 items-center justify-between px-5">
            <span className="font-display text-xl">Plaisir</span>
            <button type="button" onClick={() => setMobileMenu(false)} aria-label={t.close}><X size={20} /></button>
          </div>
          <nav className="flex flex-col gap-1 px-5 pt-6">
            {t.nav.map((label, i) => (
              <a key={sections[i]} href={`#${sections[i]}`} onClick={() => setMobileMenu(false)} className="border-b border-wine/8 py-4 font-display text-2xl text-wine">{label}</a>
            ))}
            <button type="button" onClick={openBook} className="mt-8 flex h-12 items-center justify-center bg-wine text-sm font-medium text-cream">{t.reserve}</button>
          </nav>
        </div>
      )}

      <section className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[21/9] md:max-h-[78vh]">
          <img src={interior.url} alt={gallery[0][lang]} className="absolute inset-0 h-full w-full object-cover" width={1600} height={901} fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-wine/70 via-wine/20 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-8 md:pb-14">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.14em] text-cream/70">{t.heroKicker}</p>
            <h1 className="font-display text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.95] tracking-tight text-cream">{t.heroTitle}</h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/85 md:text-base">{t.heroTagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="h-10 rounded-sm bg-cream px-5 text-[12px] font-medium text-wine shadow-none hover:bg-white"><a href="#carte">{t.explore}</a></Button>
              <Button onClick={openBook} className="h-10 rounded-sm border border-cream/40 bg-transparent px-5 text-[12px] font-medium text-cream shadow-none hover:bg-cream/10">{t.reserve}</Button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-[12px] text-cream/60">
              <span className={`inline-block size-1.5 rounded-full ${open ? "bg-emerald-400" : "bg-cream/40"}`} />
              {open ? t.openNow : t.closedNow}
              <span className="text-cream/30">·</span>
              {t.location}
            </p>
          </div>
        </div>
      </section>

      <section id="histoire" className="border-b border-wine/8 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-12 md:gap-12 md:px-8">
          <div className="md:col-span-5">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-wine/45">{t.introEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl leading-snug tracking-tight text-wine md:text-4xl">{t.introTitle}</h2>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <p className="text-[15px] leading-relaxed text-wine/75 md:text-base">{t.introText}</p>
            <p className="mt-8 font-display text-xl italic text-wine/80 md:text-2xl">{t.introQuote}</p>
            <p className="mt-6 text-[12px] text-wine/40">{t.cuisine} · {t.capacity} · Tristan Petiaux</p>
          </div>
        </div>
      </section>

      <section id="carte" className="border-b border-wine/8 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-lg">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-wine/45">{t.menuEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-wine md:text-4xl">{t.menuTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-wine/60">{t.menuText}</p>
          </div>
          <div className="mt-10 flex gap-0 overflow-x-auto border-b border-wine/10" role="tablist">
            {(Object.keys(dishes) as Category[]).map((cat) => (
              <button key={cat} type="button" role="tab" aria-selected={category === cat} onClick={() => setCategory(cat)}
                className={`shrink-0 border-b-2 px-4 py-3 text-[13px] transition-colors ${category === cat ? "border-wine text-wine" : "border-transparent text-wine/40 hover:text-wine/70"}`}>
                {t.categories[cat]}
              </button>
            ))}
          </div>
          <div className="mt-2 divide-y divide-wine/8" role="tabpanel">
            {dishes[category].map((dish) => (
              <article key={dish.fr} className="flex items-baseline justify-between gap-6 py-4">
                <div className="min-w-0">
                  <h3 className="font-display text-lg text-wine md:text-xl">{dish[lang]}</h3>
                  {dish.description && <p className="mt-0.5 text-[13px] text-wine/50">{dish.description[lang]}</p>}
                </div>
                <span className="shrink-0 tabular-nums text-[15px] text-wine/80">{dish.price}&nbsp;€</span>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-wine/35">{t.menuNote}</p>
        </div>
      </section>

      <section id="incontournables" className="border-b border-wine/8 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-wine/45">{t.signaturesEyebrow}</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-wine md:text-4xl">{t.signaturesTitle}</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {signatures.map((item, i) => (
              <figure key={item.dish.fr} className="group cursor-pointer" onClick={() => setLightbox(i + 1)}>
                <div className="aspect-[3/4] overflow-hidden bg-wine/5">
                  <img src={item.src} alt={item.dish[lang]} loading="lazy" width={600} height={800} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <figcaption className="mt-3">
                  <h3 className="font-display text-[15px] text-wine md:text-base">{item.dish[lang]}</h3>
                  <p className="text-[13px] text-wine/50">{item.dish.price}&nbsp;€</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="atmosphere" className="border-b border-wine/8 bg-teal py-16 text-cream md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-lg">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-cream/50">{t.galleryEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">{t.galleryTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/70">{t.galleryText}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            <button type="button" onClick={() => setLightbox(0)} className="group col-span-2 row-span-2 overflow-hidden" aria-label={gallery[0][lang]}>
              <img src={interior.url} alt={gallery[0][lang]} loading="lazy" width={1600} height={901} className="aspect-[4/3] h-full w-full object-cover opacity-95 transition-opacity group-hover:opacity-100 md:min-h-[360px]" />
            </button>
            {gallery.slice(1).map((item, i) => (
              <button key={item.src} type="button" onClick={() => setLightbox(i + 1)} className="group overflow-hidden" aria-label={item[lang]}>
                <img src={item.src} alt={item[lang]} loading="lazy" width={600} height={800} className="aspect-square w-full object-cover opacity-95 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="infos" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-wine/45">{t.practicalEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-wine md:text-4xl">{t.practicalTitle}</h2>
            <address className="mt-8 not-italic">
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-wine/40">{t.address}</p>
              <p className="mt-2 font-display text-xl text-wine">Chemin du Gros Tienne 1<br />1380 Lasne</p>
            </address>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button onClick={openBook} className="h-10 rounded-sm bg-wine px-4 text-[12px] font-medium text-cream shadow-none hover:bg-teal"><Calendar className="mr-1.5 size-3.5" />{t.reserve}</Button>
              <Button asChild variant="outline" className="h-10 rounded-sm border-wine/20 bg-transparent px-4 text-[12px] font-medium text-wine shadow-none hover:bg-wine hover:text-cream"><a href={`tel:${phone}`}><Phone className="mr-1.5 size-3.5" />{phoneDisplay}</a></Button>
              <Button asChild variant="outline" className="h-10 rounded-sm border-wine/20 bg-transparent px-4 text-[12px] font-medium text-wine shadow-none hover:bg-wine hover:text-cream"><a href={maps} target="_blank" rel="noreferrer"><MapPin className="mr-1.5 size-3.5" />{t.directions}</a></Button>
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-wine/40"><Clock size={14} />{t.hours}</h3>
            <div className="mt-4 divide-y divide-wine/8">
              {hoursDisplay.map((row) => (
                <div key={row.fr} className="flex justify-between gap-4 py-3 text-[14px]">
                  <span className="text-wine">{row[lang]}</span>
                  <span className={row.hours ? "text-wine/55" : "text-wine/30"}>{row.hours ?? t.closed}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.1em] text-wine/40">{t.follow}</p>
            <div className="mt-3 flex gap-5 text-[14px]">
              <a href={socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-wine/70 underline-offset-4 hover:text-wine hover:underline"><Instagram size={15} />Instagram</a>
              <a href={socials.facebook} target="_blank" rel="noreferrer" className="text-wine/70 underline-offset-4 hover:text-wine hover:underline">Facebook</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-wine/10 bg-wine px-5 py-12 text-cream md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <img src={logo.url} alt="Plaisir" className="h-auto w-28 object-contain brightness-0 invert opacity-90" width={160} height={32} />
            <p className="mt-3 text-[13px] text-cream/50">{t.footer}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-[12px] text-cream/60">
            <a href="#carte" className="hover:text-cream">{t.categories.starters}</a>
            <button type="button" onClick={openBook} className="hover:text-cream">{t.reserve}</button>
            <a href={`tel:${phone}`} className="hover:text-cream">{phoneDisplay}</a>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl justify-between border-t border-cream/10 pt-6 text-[11px] text-cream/35">
          <span>© {new Date().getFullYear()} Plaisir</span>
          <span>Chemin du Gros Tienne 1 · 1380 Lasne</span>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-wine/10 bg-cream md:hidden">
        <a href={`tel:${phone}`} className="flex h-12 items-center justify-center gap-1.5 text-[11px] font-medium text-wine"><Phone size={14} />{t.call}</a>
        <button type="button" onClick={openBook} className="flex h-12 items-center justify-center bg-wine text-[11px] font-medium text-cream">{t.reserve}</button>
        <a href={maps} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-1.5 text-[11px] font-medium text-wine"><MapPin size={14} />{t.directions}</a>
      </div>

      {lightbox !== null && (
        <div role="dialog" aria-modal="true" aria-label={currentImage[lang]} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wine/95 p-4 text-cream" onClick={() => setLightbox(null)}>
          <button type="button" onClick={() => setLightbox(null)} aria-label={t.close} className="absolute right-4 top-4 text-cream/60 hover:text-cream"><X size={22} /></button>
          <img src={currentImage.src} alt={currentImage[lang]} className="max-h-[75vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="mt-4 font-display text-lg">{currentImage[lang]}</p>
          <div className="mt-4 flex items-center gap-6">
            <button type="button" className="text-cream/60 hover:text-cream" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }} aria-label={t.previous}><ChevronLeft size={22} /></button>
            <span className="text-[12px] tabular-nums text-cream/50">{lightbox + 1} / {gallery.length}</span>
            <button type="button" className="text-cream/60 hover:text-cream" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} aria-label={t.next}><ChevronRight size={22} /></button>
          </div>
        </div>
      )}

      {bookOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="book-title" className="fixed inset-0 z-50 flex items-end justify-center bg-wine/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-5" onClick={() => setBookOpen(false)}>
          <div className="w-full max-w-md overflow-hidden bg-cream shadow-xl sm:rounded-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-wine/10 px-5 py-4">
              <div>
                <h2 id="book-title" className="font-display text-xl text-wine">{t.bookTitle}</h2>
                <p className="text-[12px] text-wine/45">{t.bookSubtitle}</p>
              </div>
              <button type="button" onClick={() => setBookOpen(false)} aria-label={t.close} className="text-wine/40 hover:text-wine"><X size={18} /></button>
            </div>
            {bookSent ? (
              <div className="flex flex-col items-center px-5 py-12 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-wine text-cream"><Check size={18} /></div>
                <h3 className="mt-4 font-display text-xl text-wine">{t.bookSuccess}</h3>
                <p className="mt-2 max-w-xs text-[14px] text-wine/55">{t.bookSuccessText}</p>
                <Button onClick={() => setBookOpen(false)} className="mt-6 h-10 rounded-sm bg-wine px-5 text-[12px] font-medium text-cream hover:bg-teal">OK</Button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-3 px-5 py-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t.bookName} name="name" required />
                  <Field label={t.bookEmail} name="email" type="email" required />
                </div>
                <Field label={t.bookPhone} name="phone" type="tel" required />
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label={t.bookDate} name="date" type="date" required min={today} />
                  <Field label={t.bookTime} name="time" type="time" required />
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-wine/50">{t.bookGuests}</label>
                    <div className="relative">
                      <Users size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-wine/30" />
                      <select name="guests" required defaultValue="2" className="h-10 w-full appearance-none border border-wine/15 bg-white pl-8 pr-2 text-[14px] text-wine outline-none focus:border-wine">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-wine/50">{t.bookMessage}</label>
                  <textarea name="message" rows={2} className="w-full resize-none border border-wine/15 bg-white px-2.5 py-2 text-[14px] text-wine outline-none focus:border-wine" />
                </div>
                <Button type="submit" className="h-11 w-full rounded-sm bg-wine text-[12px] font-medium text-cream shadow-none hover:bg-teal">{t.bookSubmit}<ArrowRight className="ml-1.5 size-3.5" /></Button>
                <p className="text-center text-[12px] text-wine/40">{t.bookNote}{" "}<a href={`tel:${phone}`} className="text-wine underline underline-offset-2">{phoneDisplay}</a></p>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="h-12 md:hidden" />
    </main>
  );
}

function Field({ label, name, type = "text", required, min }: { label: string; name: string; type?: string; required?: boolean; min?: string }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-wine/50">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} min={min} className="h-10 w-full border border-wine/15 bg-white px-2.5 text-[14px] text-wine outline-none focus:border-wine" />
    </div>
  );
}
