import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Instagram, MapPin, Menu as MenuIcon, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/plaisir-logo.png.asset.json";
import interior from "@/assets/plaisir-interieur.jpg.asset.json";
import beef from "@/assets/beef-hero.jpg";
import octopus from "@/assets/octopus.jpg";
import egg from "@/assets/egg.jpg";
import cookie from "@/assets/cookie.jpg";

const phone = "+32492613809";
const maps = "https://www.google.com/maps/search/?api=1&query=Restaurant+Plaisir+Chemin+du+Gros+Tienne+1+1380+Lasne";
const socials = { instagram: "https://www.instagram.com/plaisir_restaurant_lasne/", facebook: "https://www.facebook.com/profile.php?id=100057657720995" };

type Lang = "fr" | "en";
type Category = "starters" | "mains" | "desserts" | "cocktails" | "menus";
type Dish = { fr: string; en: string; price: number; description?: { fr: string; en: string } };
const dishes: Record<Category, Dish[]> = {
  starters: [
    { fr: "Asperges vertes et blanches", en: "Green & white asparagus", price: 22 },
    { fr: "Œuf bio mollet", en: "Soft-boiled organic egg", price: 16 },
    { fr: "Rillettes de volaille à la truffe", en: "Truffled poultry rillettes", price: 21 },
    { fr: "Terrine de foie gras au spéculoos", en: "Foie gras terrine with speculoos", price: 24 },
  ],
  mains: [
    { fr: "Joue de bœuf confite 18 heures", en: "18-hour braised beef cheek", price: 29 },
    { fr: "Tatin de chicons caramélisés", en: "Caramelised Belgian endive tarte tatin", price: 26 },
    { fr: "Poulpe frais grillé", en: "Fresh grilled octopus", price: 34 },
  ],
  desserts: [
    { fr: "Le cookie Plaisir coupable", en: "The Guilty Pleasure cookie", price: 15 },
    { fr: "Riz au lait vanillé", en: "Vanilla rice pudding", price: 13 },
    { fr: "Pavlova fraise", en: "Strawberry pavlova", price: 13 },
    { fr: "Sélection de fromages", en: "Cheese selection", price: 16 },
  ],
  cocktails: [
    { fr: "Aperol Spritz", en: "Aperol Spritz", price: 10 },
    { fr: "Moscow Mule", en: "Moscow Mule", price: 12 },
    { fr: "Negroni", en: "Negroni", price: 12 },
    { fr: "Passion Plaisir ♥", en: "Passion Plaisir ♥", price: 12 },
    { fr: "Cosmopolitan", en: "Cosmopolitan", price: 12 },
    { fr: "Amaretto Sour", en: "Amaretto Sour", price: 12 },
    { fr: "Mai Tai", en: "Mai Tai", price: 13 },
  ],
  menus: [
    { fr: "Menu 4 services", en: "Four-course menu", price: 65, description: { fr: "Tartelette crevettes grises · Œuf bio mollet · Joue de bœuf façon Rossini · Fromages ou pavlova fraise", en: "Grey shrimp tartlet · Soft-boiled organic egg · Rossini-style beef cheek · Cheese or strawberry pavlova" } },
    { fr: "Menu 5 services", en: "Five-course menu", price: 80, description: { fr: "Tartelette crevettes grises · Œuf bio mollet · Poulpe frais grillé · Joue de bœuf façon Rossini · Fromages ou pavlova fraise", en: "Grey shrimp tartlet · Soft-boiled organic egg · Grilled octopus · Rossini-style beef cheek · Cheese or strawberry pavlova" } },
  ],
};

const copy = {
  fr: {
    nav: ["L'histoire", "La carte", "Les incontournables", "L'atmosphère", "Infos pratiques"], reserve: "Réserver une table", heroKicker: "RESTAURANT · LASNE", heroTitle: "Le goût du plaisir.", heroText: "Une cuisine belgo-française canaille et généreuse, dans une maison où l'on aime prendre le temps.", explore: "Découvrir la carte", contact: "Réserver / Contact", scroll: "DÉFILER POUR DÉCOUVRIR", introEyebrow: "BIENVENUE À LASNE", introTitle: "Une maison, mille raisons de s'attarder.", introText: "À la croisée du goût et de la convivialité, Patrick Ridremont et le chef Tristan Petiaux imaginent une cuisine sans retenue. Une bâtisse d'inspiration louisianaise, trois salons intimistes et, dans chaque assiette, l'envie de faire plaisir.", introQuote: "La gourmandise n'attend pas les grandes occasions.", menuEyebrow: "À TABLE", menuTitle: "La carte", menuText: "Des assiettes franches, des saveurs généreuses. Choisissez selon l'envie du moment.", categories: { starters: "Entrées", mains: "Plats", desserts: "Desserts", cocktails: "Cocktails", menus: "Menus" }, menuNote: "Carte et prix issus du menu fourni. Sous réserve de modification sur place.", signaturesEyebrow: "LES FAVORIS DE LA MAISON", signaturesTitle: "À savourer sans modération", galleryEyebrow: "L'ESPRIT DU LIEU", galleryTitle: "Un lieu à vivre, un moment à partager.", galleryText: "Des tables à taille humaine, une cuisine de caractère et le plaisir simple d'être ensemble.", galleryNote: "Photographie du lieu et illustrations culinaires.", practicalEyebrow: "NOUS RENDRE VISITE", practicalTitle: "Le plaisir de vous recevoir.", address: "Adresse", hours: "Horaires", call: "Appeler", directions: "Itinéraire", closed: "Fermé", tuesday: "Mardi & mercredi", thursday: "Jeudi", friday: "Vendredi", saturday: "Samedi", sunday: "Dimanche & lundi", follow: "SUIVEZ-NOUS", footer: "Cuisine généreuse, instants heureux.", visual: "Illustration culinaire", close: "Fermer", previous: "Précédent", next: "Suivant", menuToggle: "Ouvrir le menu", location: "Lasne, Belgique",
  },
  en: {
    nav: ["Our story", "The menu", "Favourites", "Atmosphere", "Visit us"], reserve: "Book a table", heroKicker: "RESTAURANT · LASNE", heroTitle: "The taste of pleasure.", heroText: "Generous, unapologetic Belgian-French cooking in a house made for lingering.", explore: "Explore the menu", contact: "Book / Contact", scroll: "SCROLL TO EXPLORE", introEyebrow: "WELCOME TO LASNE", introTitle: "A house worth staying for.", introText: "Where flavour meets conviviality, Patrick Ridremont and chef Tristan Petiaux create food without restraint. A Louisiana-inspired house, three intimate dining rooms and a desire to delight in every dish.", introQuote: "Good food needs no special occasion.", menuEyebrow: "AT THE TABLE", menuTitle: "The menu", menuText: "Honest plates, generous flavours. Follow your appetite.", categories: { starters: "Starters", mains: "Mains", desserts: "Desserts", cocktails: "Cocktails", menus: "Set menus" }, menuNote: "Menu and prices from the supplied card. Subject to change on site.", signaturesEyebrow: "HOUSE FAVOURITES", signaturesTitle: "Worth coming back for", galleryEyebrow: "THE SPIRIT OF THE PLACE", galleryTitle: "A place to be, a moment to share.", galleryText: "Intimate tables, food with character and the simple pleasure of being together.", galleryNote: "Venue photograph and culinary illustrations.", practicalEyebrow: "COME SEE US", practicalTitle: "We look forward to welcoming you.", address: "Address", hours: "Opening hours", call: "Call", directions: "Directions", closed: "Closed", tuesday: "Tuesday & Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday & Monday", follow: "FOLLOW ALONG", footer: "Generous cooking, happy moments.", visual: "Culinary illustration", close: "Close", previous: "Previous", next: "Next", menuToggle: "Open menu", location: "Lasne, Belgium",
  },
};

const gallery = [
  { src: interior.url, fr: "L'intérieur du restaurant Plaisir à Lasne", en: "Inside Restaurant Plaisir in Lasne", real: true },
  { src: beef, fr: "Joue de bœuf, illustration culinaire", en: "Beef cheek, culinary illustration", real: false },
  { src: octopus, fr: "Poulpe grillé, illustration culinaire", en: "Grilled octopus, culinary illustration", real: false },
  { src: egg, fr: "Œuf bio mollet, illustration culinaire", en: "Organic soft-boiled egg, culinary illustration", real: false },
  { src: cookie, fr: "Cookie Plaisir, illustration culinaire", en: "Plaisir cookie, culinary illustration", real: false },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Restaurant Plaisir — Cuisine belgo-française à Lasne" },
      { name: "description", content: "Découvrez Restaurant Plaisir à Lasne : cuisine belgo-française généreuse, carte et menus, horaires, adresse et réservation au +32 492 61 38 09." },
      { property: "og:title", content: "Restaurant Plaisir — Lasne" },
      { property: "og:description", content: "Une cuisine belgo-française canaille et généreuse à Lasne. Découvrez la carte, les menus et les informations pratiques." },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Restaurant", name: "Restaurant Plaisir", telephone: "+32492613809", address: { "@type": "PostalAddress", streetAddress: "Chemin du Gros Tienne 1", postalCode: "1380", addressLocality: "Lasne", addressCountry: "BE" }, servesCuisine: "Belgian-French", hasMenu: "/#carte", sameAs: [socials.instagram, socials.facebook], openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday"], opens: "19:00", closes: "21:30" }, { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "12:00", closes: "14:00" }, { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "19:00", closes: "21:30" }, { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "12:00", closes: "14:00" }, { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "18:00", closes: "22:00" }] }) }],
  }),
  component: Home,
});

function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [category, setCategory] = useState<Category>("starters");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = copy[lang];
  const sections = ["histoire", "carte", "incontournables", "atmosphere", "infos"];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightbox((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox]);

  return <main className="overflow-x-hidden bg-cream text-foreground">
    <header className="absolute inset-x-0 top-0 z-30 border-b border-cream/25 text-cream">
      <div className="mx-auto grid h-20 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10 lg:h-24 lg:px-16">
        <a href="#haut" className="w-fit text-[11px] font-semibold tracking-[0.14em] uppercase" aria-label="Restaurant Plaisir">PLAISIR <span className="hidden text-gold/90 sm:inline">· LASNE</span></a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">{t.nav.map((label, i) => <a key={sections[i]} className="text-[11px] font-semibold uppercase tracking-[0.09em] transition-colors hover:text-gold" href={`#${sections[i]}`}>{label}</a>)}</nav>
        <span className="font-display text-lg italic text-gold lg:hidden">Plaisir</span>
        <div className="flex items-center justify-end gap-3 sm:gap-6">
          <div className="flex items-center gap-1 text-[11px] font-bold tracking-[0.08em]" aria-label="Language"><Button variant="ghost" size="sm" className={`h-8 px-1.5 hover:bg-cream/10 hover:text-cream ${lang === "fr" ? "text-gold" : "text-cream/70"}`} onClick={() => setLang("fr")} aria-pressed={lang === "fr"}>FR</Button><span className="text-cream/50">/</span><Button variant="ghost" size="sm" className={`h-8 px-1.5 hover:bg-cream/10 hover:text-cream ${lang === "en" ? "text-gold" : "text-cream/70"}`} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</Button></div>
          <Button asChild className="hidden h-10 rounded-none border border-gold bg-transparent px-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-gold shadow-none hover:bg-gold hover:text-wine md:inline-flex"><a href={`tel:${phone}`}>{t.reserve} <ArrowRight /></a></Button>
          <Button variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-gold lg:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? t.close : t.menuToggle}>{mobileMenu ? <X /> : <MenuIcon />}</Button>
        </div>
      </div>
      {mobileMenu && <nav className="flex flex-col gap-1 border-t border-gold/30 bg-wine px-6 py-6 lg:hidden" aria-label="Navigation mobile">{t.nav.map((label, i) => <a key={sections[i]} href={`#${sections[i]}`} onClick={() => setMobileMenu(false)} className="py-3 font-display text-xl">{label}</a>)}</nav>}
    </header>

    <section id="haut" className="relative flex min-h-[660px] items-end bg-wine text-cream md:min-h-[760px] lg:min-h-[min(820px,88vh)]">
      <img src={beef} alt={lang === "fr" ? "Illustration culinaire de joue de bœuf confite" : "Culinary illustration of braised beef cheek"} className="absolute inset-0 h-full w-full object-cover object-[62%_center]" width={1600} height={1104} fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-r from-wine/95 via-wine/65 to-wine/5 md:from-wine/85 md:via-wine/45" />
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-24 pt-44 md:px-16 md:pb-32 lg:px-24">
        <div className="max-w-[720px]"><p className="mb-7 flex items-center gap-4 text-[11px] font-bold tracking-[0.2em] text-gold"><span className="h-px w-9 bg-gold" />{t.heroKicker}</p><h1 className="font-display text-[76px] leading-[0.9] font-normal sm:text-[106px] lg:text-[144px]">Restaurant<br /><span className="italic text-gold">Plaisir.</span></h1><p className="mt-8 font-display text-2xl italic md:text-3xl">{t.heroTitle}</p><p className="mt-5 max-w-[440px] text-sm leading-7 text-cream/85 md:text-base">{t.heroText}</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild className="h-12 rounded-none bg-gold px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-wine shadow-none hover:bg-cream"><a href="#carte">{t.explore}<ArrowRight /></a></Button><Button asChild className="h-12 rounded-none border border-cream/70 bg-transparent px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-cream shadow-none hover:bg-cream hover:text-wine"><a href="#infos">{t.contact}</a></Button></div></div>
      </div>
      <a href="#histoire" className="absolute bottom-7 left-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.17em] text-cream/75 md:left-16 lg:left-24">{t.scroll}<ArrowDown size={14} /></a>
      <span className="absolute right-6 bottom-7 hidden text-[10px] font-bold tracking-[0.17em] text-cream/75 md:block md:right-16 lg:right-24">50°42'48"N · 4°29'16"E</span>
    </section>

    <section id="histoire" className="bg-cream py-20 md:py-28 lg:py-36"><div className="mx-auto grid max-w-[1380px] items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-12 lg:px-20"><div className="relative"><img src={interior.url} alt={lang === "fr" ? "Le salon bleu canard et les banquettes orange du Restaurant Plaisir" : "Teal dining room and orange banquettes inside Restaurant Plaisir"} className="aspect-[5/4] w-full object-cover" width={1600} height={901} loading="lazy" /><div className="absolute -bottom-5 right-0 bg-wine px-6 py-4 font-display text-lg italic text-gold md:-right-5">Lasne, Belgique</div></div><div className="max-w-[560px]"><Eyebrow>{t.introEyebrow}</Eyebrow><h2 className="mt-6 font-display text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">{t.introTitle}</h2><div className="mt-7 h-px w-16 bg-gold" /><p className="mt-7 text-base leading-8 text-muted-foreground">{t.introText}</p><p className="mt-9 border-l-2 border-gold pl-5 font-display text-xl italic text-wine md:text-2xl">{t.introQuote}</p></div></div></section>

    <section id="carte" className="bg-wine py-20 text-cream md:py-28"><div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-20"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Eyebrow light>{t.menuEyebrow}</Eyebrow><h2 className="mt-4 font-display text-5xl md:text-7xl">{t.menuTitle}<span className="text-gold">.</span></h2></div><p className="max-w-[365px] text-sm leading-7 text-cream/75">{t.menuText}</p></div><div className="mt-12 flex gap-1 overflow-x-auto border-b border-gold/30 pb-px [scrollbar-width:none] md:mt-16">{(Object.keys(t.categories) as Category[]).map((key) => <Button key={key} variant="ghost" onClick={() => setCategory(key)} aria-pressed={category === key} className={`h-12 shrink-0 rounded-none border-b-2 px-4 text-[11px] font-bold uppercase tracking-[0.1em] shadow-none hover:bg-cream/10 hover:text-gold md:px-7 ${category === key ? "border-gold text-gold" : "border-transparent text-cream/65"}`}>{t.categories[key]}</Button>)}</div><div className="grid min-h-[335px] gap-x-20 gap-y-0 pt-6 md:grid-cols-2 md:pt-9" key={category}>{dishes[category].map((dish) => <div key={dish.fr} className="flex justify-between gap-6 border-b border-cream/20 py-5 md:py-6"><div className="min-w-0"><h3 className="font-display text-xl leading-snug sm:text-2xl">{dish[lang]}</h3>{dish.description && <p className="mt-2 max-w-[470px] text-xs leading-6 text-cream/65">{dish.description[lang]}</p>}</div><span className="shrink-0 pt-1 font-display text-xl text-gold">{dish.price} €</span></div>)}</div><p className="mt-8 text-xs text-cream/55">{t.menuNote}</p></div></section>

    <section id="incontournables" className="bg-cream py-20 md:py-28"><div className="mx-auto max-w-[1380px] px-6 md:px-12 lg:px-20"><Eyebrow>{t.signaturesEyebrow}</Eyebrow><h2 className="mt-4 max-w-[700px] font-display text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">{t.signaturesTitle}<span className="text-gold">.</span></h2><div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[{ src: beef, dish: dishes.mains[0] }, { src: octopus, dish: dishes.mains[2] }, { src: egg, dish: dishes.starters[1] }, { src: cookie, dish: dishes.desserts[0] }].map(({ src, dish }, i) => <figure key={dish.fr} className="group"><div className="overflow-hidden bg-wine"><img src={src} alt={`${t.visual} : ${dish[lang]}`} loading="lazy" width={i === 0 ? 1600 : 1024} height={i === 0 ? 1104 : 1280} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><figcaption className="flex items-start justify-between gap-3 border-b border-border py-4"><div><span className="text-[10px] font-bold tracking-[0.15em] text-wine/60">0{i + 1}</span><h3 className="mt-1 font-display text-xl leading-snug">{dish[lang]}</h3></div><span className="shrink-0 font-display text-lg text-wine">{dish.price} €</span></figcaption></figure>)}</div></div></section>

    <section id="atmosphere" className="bg-teal py-20 text-cream md:py-28"><div className="mx-auto max-w-[1380px] px-6 md:px-12 lg:px-20"><div className="max-w-[730px]"><Eyebrow light>{t.galleryEyebrow}</Eyebrow><h2 className="mt-4 font-display text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">{t.galleryTitle}</h2><p className="mt-5 max-w-[580px] text-sm leading-7 text-cream/80">{t.galleryText}</p></div><div className="mt-11 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4"><Button variant="ghost" onClick={() => setLightbox(0)} className="group col-span-2 row-span-2 h-auto w-full rounded-none p-0 hover:bg-transparent" aria-label={`${t.visual}: ${gallery[0][lang]}`}><img src={interior.url} alt={gallery[0][lang]} loading="lazy" width={1600} height={901} className="aspect-square h-full w-full object-cover transition-opacity group-hover:opacity-85 md:aspect-[4/3]" /></Button>{gallery.slice(1).map((item, i) => <Button key={item.src} variant="ghost" onClick={() => setLightbox(i + 1)} className="group h-auto w-full rounded-none p-0 hover:bg-transparent" aria-label={`${t.visual}: ${item[lang]}`}><img src={item.src} alt={item[lang]} loading="lazy" width={1024} height={1280} className="aspect-square w-full object-cover transition-opacity group-hover:opacity-85" /></Button>)}</div><p className="mt-5 text-xs text-cream/65">{t.galleryNote}</p></div></section>

    <section id="infos" className="bg-cream py-20 md:py-28"><div className="mx-auto grid max-w-[1380px] gap-12 px-6 md:px-12 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:px-20"><div><Eyebrow>{t.practicalEyebrow}</Eyebrow><h2 className="mt-4 max-w-[580px] font-display text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">{t.practicalTitle}</h2><div className="mt-10 border-t border-border pt-6"><p className="text-[11px] font-bold uppercase tracking-[0.15em] text-wine">{t.address}</p><address className="mt-2 font-display text-xl not-italic">Chemin du Gros Tienne 1<br />1380 Lasne, Belgique</address></div><div className="mt-7 flex flex-wrap gap-3"><Button asChild className="h-12 rounded-none bg-wine px-5 text-xs uppercase tracking-[0.08em] text-cream hover:bg-teal"><a href={`tel:${phone}`}><Phone /> +32 492 61 38 09</a></Button><Button asChild variant="outline" className="h-12 rounded-none border-wine bg-transparent px-5 text-xs uppercase tracking-[0.08em] text-wine hover:bg-wine hover:text-cream"><a href={maps} target="_blank" rel="noreferrer"><MapPin />{t.directions}</a></Button></div></div><div className="border-t border-wine/30 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"><h3 className="font-display text-3xl">{t.hours}</h3><div className="mt-7 space-y-0">{[[t.tuesday,"19:00 — 21:30"],[t.thursday,"12:00 — 14:00  /  19:00 — 21:30"],[t.friday,"12:00 — 14:00  /  18:00 — 22:00"],[t.saturday,"18:00 — 22:00"],[t.sunday,t.closed]].map(([day, hours]) => <div key={day} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border py-4 text-sm"><span className="min-w-0 font-medium">{day}</span><span className="text-right text-muted-foreground">{hours}</span></div>)}</div><p className="mt-10 text-[11px] font-bold uppercase tracking-[0.15em] text-wine">{t.follow}</p><div className="mt-4 flex gap-6 text-sm"><a className="inline-flex items-center gap-2 underline decoration-gold underline-offset-8 hover:text-wine" href={socials.instagram} target="_blank" rel="noreferrer"><Instagram size={17} />Instagram</a><a className="underline decoration-gold underline-offset-8 hover:text-wine" href={socials.facebook} target="_blank" rel="noreferrer">Facebook ↗</a></div></div></div></section>

    <footer className="bg-wine px-6 py-12 text-cream md:px-12 lg:px-20"><div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-8 border-b border-gold/30 pb-10 md:flex-row md:items-end"><div><img src={logo.url} alt="Plaisir" className="h-auto w-40 object-contain" width={435} height={325} loading="lazy" /><p className="mt-1 font-display text-lg italic text-cream/80">{t.footer}</p></div><a className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-gold hover:text-cream" href="#haut">↑ &nbsp; {t.location}</a></div><div className="mx-auto flex max-w-[1380px] flex-wrap justify-between gap-4 pt-7 text-xs text-cream/55"><span>© {new Date().getFullYear()} Restaurant Plaisir</span><span>Chemin du Gros Tienne 1 · 1380 Lasne</span></div></footer>

    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold/50 bg-wine text-cream md:hidden"><a href={`tel:${phone}`} className="flex h-14 items-center justify-center gap-1.5 border-r border-cream/20 text-[11px] font-semibold uppercase tracking-[0.05em]"><Phone size={15}/>{t.call}</a><a href={`tel:${phone}`} className="flex h-14 items-center justify-center gap-1.5 border-r border-cream/20 text-[11px] font-semibold uppercase tracking-[0.05em] text-gold">{t.reserve}</a><a href={maps} target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.05em]"><MapPin size={15}/>{t.directions}</a></div>
    {lightbox !== null && <div role="dialog" aria-modal="true" aria-label={gallery[lightbox][lang]} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wine/95 p-4 text-cream" onClick={() => setLightbox(null)}><Button variant="ghost" size="icon" onClick={() => setLightbox(null)} aria-label={t.close} className="absolute right-5 top-5 text-cream hover:bg-cream/10 hover:text-gold"><X /></Button><img src={gallery[lightbox].src} alt={gallery[lightbox][lang]} className="max-h-[78vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} /><p className="mt-4 font-display text-lg">{gallery[lightbox][lang]}</p><div className="mt-5 flex items-center gap-8"><Button variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-gold" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }} aria-label={t.previous}><ChevronLeft /></Button><span className="text-xs tracking-widest">{lightbox + 1} / {gallery.length}</span><Button variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-gold" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} aria-label={t.next}><ChevronRight /></Button></div></div>}
  </main>;
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) { return <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.19em] ${light ? "text-gold" : "text-wine"}`}><span className="h-px w-7 bg-gold" />{children}</p>; }