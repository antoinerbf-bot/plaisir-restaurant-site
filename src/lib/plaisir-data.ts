import interior from "@/assets/plaisir-interieur.jpg.asset.json";
import beef from "@/assets/beef-hero.jpg";
import octopus from "@/assets/octopus.jpg";
import egg from "@/assets/egg.jpg";
import cookie from "@/assets/cookie.jpg";

export const phone = "+32492613809";
export const phoneDisplay = "+32 492 61 38 09";
export const maps = "https://www.google.com/maps/search/?api=1&query=Restaurant+Plaisir+Chemin+du+Gros+Tienne+1+1380+Lasne";
export const socials = {
  instagram: "https://www.instagram.com/plaisir_restaurant_lasne/",
  facebook: "https://www.facebook.com/profile.php?id=100057657720995",
};
export const siteUrl = "https://plaisir-restaurant-site.vercel.app";

export type Lang = "fr" | "en";
export type Category = "starters" | "mains" | "desserts" | "cocktails" | "menus";
export type Dish = { fr: string; en: string; price: number; description?: { fr: string; en: string }; highlight?: boolean };

export const dishes: Record<Category, Dish[]> = {
  starters: [
    { fr: "Asperges vertes et blanches", en: "Green & white asparagus", price: 22, description: { fr: "Asperges de saison, vinaigrette maison.", en: "Seasonal asparagus, house vinaigrette." } },
    { fr: "Œuf bio mollet", en: "Soft-boiled organic egg", price: 16, highlight: true, description: { fr: "Œuf bio, texture fondante.", en: "Organic soft-boiled egg." } },
    { fr: "Rillettes de volaille à la truffe", en: "Truffled poultry rillettes", price: 21, description: { fr: "Rillettes onctueuses, touche de truffe.", en: "Silky rillettes, hint of truffle." } },
    { fr: "Terrine de foie gras au spéculoos", en: "Foie gras terrine with speculoos", price: 24, description: { fr: "Foie gras maison, croquant de spéculoos.", en: "House foie gras, speculoos crunch." } },
  ],
  mains: [
    { fr: "Joue de bœuf confite 18 heures", en: "18-hour braised beef cheek", price: 29, highlight: true, description: { fr: "Cuisson lente, sauce réduite.", en: "Slow-cooked, reduced jus." } },
    { fr: "Tatin de chicons caramélisés", en: "Caramelised Belgian endive tarte tatin", price: 26, description: { fr: "Chicons confits, caramel beurre salé.", en: "Confit endives, salted-butter caramel." } },
    { fr: "Poulpe frais grillé", en: "Fresh grilled octopus", price: 34, highlight: true, description: { fr: "Poulpe grillé, herbes et agrumes.", en: "Grilled octopus, herbs and citrus." } },
  ],
  desserts: [
    { fr: "Le cookie Plaisir coupable", en: "The Guilty Pleasure cookie", price: 15, highlight: true, description: { fr: "Cookie généreux, cœur fondant.", en: "Generous cookie, molten centre." } },
    { fr: "Riz au lait vanillé", en: "Vanilla rice pudding", price: 13, description: { fr: "Riz crémeux, vanille bourbon.", en: "Creamy rice, Bourbon vanilla." } },
    { fr: "Pavlova fraise", en: "Strawberry pavlova", price: 13, description: { fr: "Meringue croustillante, fraises.", en: "Crisp meringue, strawberries." } },
    { fr: "Sélection de fromages", en: "Cheese selection", price: 16, description: { fr: "Fromages affinés, confiture maison.", en: "Aged cheeses, house chutney." } },
  ],
  cocktails: [
    { fr: "Aperol Spritz", en: "Aperol Spritz", price: 10 },
    { fr: "Moscow Mule", en: "Moscow Mule", price: 12 },
    { fr: "Negroni", en: "Negroni", price: 12 },
    { fr: "Passion Plaisir ♥", en: "Passion Plaisir ♥", price: 12, description: { fr: "Signature maison — fruit de la passion.", en: "House signature — passion fruit." } },
    { fr: "Cosmopolitan", en: "Cosmopolitan", price: 12 },
    { fr: "Amaretto Sour", en: "Amaretto Sour", price: 12 },
    { fr: "Mai Tai", en: "Mai Tai", price: 13 },
  ],
  menus: [
    { fr: "Menu 4 services", en: "4-course menu", price: 65, description: { fr: "Entrée · Plat · Fromage ou dessert · Café", en: "Starter · Main · Cheese or dessert · Coffee" } },
    { fr: "Menu 5 services", en: "5-course menu", price: 80, description: { fr: "Amuse · Entrée · Plat · Fromage · Dessert · Café", en: "Amuse · Starter · Main · Cheese · Dessert · Coffee" } },
  ],
};

export const signatures = [
  { src: beef, dish: dishes.mains[0], tag: { fr: "Signature", en: "Signature" } },
  { src: octopus, dish: dishes.mains[2], tag: { fr: "Mer", en: "Seafood" } },
  { src: egg, dish: dishes.starters[1], tag: { fr: "Classique", en: "Classic" } },
  { src: cookie, dish: dishes.desserts[0], tag: { fr: "Douceur", en: "Sweet" } },
];

export const gallery = [
  { src: interior.url, fr: "L'intérieur du restaurant Plaisir à Lasne", en: "Inside Restaurant Plaisir in Lasne" },
  { src: beef, fr: "Joue de bœuf confite 18 heures", en: "18-hour braised beef cheek" },
  { src: octopus, fr: "Poulpe frais grillé", en: "Fresh grilled octopus" },
  { src: egg, fr: "Œuf bio mollet", en: "Soft-boiled organic egg" },
  { src: cookie, fr: "Le cookie Plaisir coupable", en: "The Guilty Pleasure cookie" },
];

export const hoursSpec = [
  { days: [2, 3], open: "19:00", close: "21:30" },
  { days: [4], open: "12:00", close: "14:00" },
  { days: [4], open: "19:00", close: "21:30" },
  { days: [5], open: "12:00", close: "14:00" },
  { days: [5, 6], open: "18:00", close: "22:00" },
];

export const hoursDisplay = [
  { fr: "Mardi & mercredi", en: "Tuesday & Wednesday", hours: "19:00 — 21:30" },
  { fr: "Jeudi", en: "Thursday", hours: "12:00 — 14:00  /  19:00 — 21:30" },
  { fr: "Vendredi", en: "Friday", hours: "12:00 — 14:00  /  18:00 — 22:00" },
  { fr: "Samedi", en: "Saturday", hours: "18:00 — 22:00" },
  { fr: "Dimanche & lundi", en: "Sunday & Monday", hours: null as string | null },
];

export const copy = {
  fr: {
    nav: ["Histoire", "La carte", "Signatures", "Ambiance", "Infos"],
    reserve: "Réserver", heroKicker: "Restaurant · Lasne", heroTitle: "Restaurant\nPlaisir.",
    heroTagline: "Le goût du plaisir.",
    heroText: "Une cuisine belgo-française canaille et généreuse, dans une maison où l'on aime prendre le temps.",
    explore: "Découvrir la carte", scroll: "Défiler pour découvrir",
    introEyebrow: "Bienvenue à Lasne", introTitle: "Une maison, mille raisons de s'attarder.",
    introText: "À la croisée du goût et de la convivialité, Patrick Ridremont et le chef Tristan Petiaux imaginent une cuisine sans retenue. Une bâtisse d'inspiration louisianaise, trois salons intimistes et, dans chaque assiette, l'envie de faire plaisir.",
    introQuote: "La gourmandise n'attend pas les grandes occasions.",
    menuEyebrow: "À table", menuTitle: "La carte",
    menuText: "Des assiettes franches, des saveurs généreuses. Choisissez selon l'envie du moment.",
    categories: { starters: "Entrées", mains: "Plats", desserts: "Desserts", cocktails: "Cocktails", menus: "Menus" },
    menuNote: "Carte et prix issus du menu fourni. Sous réserve de modification sur place.",
    signaturesEyebrow: "Les favoris de la maison", signaturesTitle: "À savourer sans modération.",
    galleryEyebrow: "L'esprit du lieu", galleryTitle: "Un lieu à vivre, un moment à partager.",
    galleryText: "Des tables à taille humaine, une cuisine de caractère et le plaisir simple d'être ensemble.",
    practicalEyebrow: "Nous rendre visite", practicalTitle: "Le plaisir de vous recevoir.",
    address: "Adresse", hours: "Horaires", call: "Appeler", directions: "Itinéraire", closed: "Fermé",
    follow: "Suivez-nous", footer: "Cuisine généreuse, moments heureux.",
    close: "Fermer", previous: "Précédent", next: "Suivant", menuToggle: "Ouvrir le menu",
    location: "Lasne, Belgique", openNow: "Ouvert maintenant", closedNow: "Fermé actuellement",
    bookTitle: "Réserver une table", bookSubtitle: "Trois salons intimistes · 12 couverts chacun",
    bookName: "Nom", bookEmail: "E-mail", bookPhone: "Téléphone", bookDate: "Date", bookTime: "Heure",
    bookGuests: "Couverts", bookMessage: "Message (optionnel)", bookSubmit: "Envoyer la demande",
    bookSuccess: "Demande envoyée !",
    bookSuccessText: "Nous vous recontactons rapidement pour confirmer votre table. À très bientôt chez Plaisir.",
    bookNote: "Ou appelez-nous directement", capacity: "3 salons · 12 couverts", cuisine: "Cuisine belgo-française",
  },
  en: {
    nav: ["Story", "Menu", "Signatures", "Atmosphere", "Visit"],
    reserve: "Book a table", heroKicker: "Restaurant · Lasne", heroTitle: "Restaurant\nPlaisir.",
    heroTagline: "The taste of pleasure.",
    heroText: "Generous, unapologetic Belgian-French cooking in a house made for lingering.",
    explore: "Explore the menu", scroll: "Scroll to explore",
    introEyebrow: "Welcome to Lasne", introTitle: "A house worth staying for.",
    introText: "Where flavour meets conviviality, Patrick Ridremont and chef Tristan Petiaux create food without restraint. A Louisiana-inspired house, three intimate dining rooms and a desire to delight in every dish.",
    introQuote: "Good food needs no special occasion.",
    menuEyebrow: "At the table", menuTitle: "The menu",
    menuText: "Honest plates, generous flavours. Follow your appetite.",
    categories: { starters: "Starters", mains: "Mains", desserts: "Desserts", cocktails: "Cocktails", menus: "Set menus" },
    menuNote: "Menu and prices from the supplied card. Subject to change on site.",
    signaturesEyebrow: "House favourites", signaturesTitle: "Worth coming back for.",
    galleryEyebrow: "The spirit of the place", galleryTitle: "A place to be, a moment to share.",
    galleryText: "Intimate tables, food with character and the simple pleasure of being together.",
    practicalEyebrow: "Come see us", practicalTitle: "We look forward to welcoming you.",
    address: "Address", hours: "Opening hours", call: "Call", directions: "Directions", closed: "Closed",
    follow: "Follow along", footer: "Generous cooking, happy moments.",
    close: "Close", previous: "Previous", next: "Next", menuToggle: "Open menu",
    location: "Lasne, Belgium", openNow: "Open now", closedNow: "Currently closed",
    bookTitle: "Book a table", bookSubtitle: "Three intimate rooms · 12 seats each",
    bookName: "Name", bookEmail: "Email", bookPhone: "Phone", bookDate: "Date", bookTime: "Time",
    bookGuests: "Guests", bookMessage: "Message (optional)", bookSubmit: "Send request",
    bookSuccess: "Request sent!",
    bookSuccessText: "We'll get back to you shortly to confirm your table. See you soon at Plaisir.",
    bookNote: "Or call us directly", capacity: "3 rooms · 12 seats", cuisine: "Belgian-French cuisine",
  },
};

export function isOpenNow() {
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (const slot of hoursSpec) {
    if (!slot.days.includes(day)) continue;
    const [oh, om] = slot.open.split(":").map(Number);
    const [ch, cm] = slot.close.split(":").map(Number);
    if (mins >= oh * 60 + om && mins < ch * 60 + cm) return true;
  }
  return false;
}

export const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Restaurant Plaisir",
  image: interior.url,
  telephone: phone,
  url: siteUrl,
  address: { "@type": "PostalAddress", streetAddress: "Chemin du Gros Tienne 1", postalCode: "1380", addressLocality: "Lasne", addressCountry: "BE" },
  geo: { "@type": "GeoCoordinates", latitude: 50.7133, longitude: 4.4878 },
  servesCuisine: ["Belgian", "French"],
  priceRange: "€€",
  acceptsReservations: true,
  hasMenu: `${siteUrl}/#carte`,
  sameAs: [socials.instagram, socials.facebook],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday"], opens: "19:00", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "12:00", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "19:00", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "12:00", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "18:00", closes: "22:00" },
  ],
};
