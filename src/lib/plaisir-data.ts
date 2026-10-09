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
    { fr: "Asperges vertes et blanches", en: "Green & white asparagus", price: 22, description: { fr: "Saison, vinaigrette maison.", en: "Seasonal, house vinaigrette." } },
    { fr: "Œuf bio mollet", en: "Soft-boiled organic egg", price: 16, highlight: true, description: { fr: "Bio, coulant.", en: "Organic, soft yolk." } },
    { fr: "Rillettes de volaille à la truffe", en: "Truffled poultry rillettes", price: 21, description: { fr: "Onctueuses, pointe de truffe.", en: "Silky, with truffle." } },
    { fr: "Terrine de foie gras au spéculoos", en: "Foie gras terrine with speculoos", price: 24, description: { fr: "Maison, spéculoos.", en: "House-made, with speculoos." } },
  ],
  mains: [
    { fr: "Joue de bœuf confite 18 heures", en: "18-hour braised beef cheek", price: 29, highlight: true, description: { fr: "18 h, jus réduit.", en: "18 hours, reduced jus." } },
    { fr: "Tatin de chicons caramélisés", en: "Caramelised Belgian endive tarte tatin", price: 26, description: { fr: "Confits, caramel beurre salé.", en: "Confit, salted-butter caramel." } },
    { fr: "Poulpe frais grillé", en: "Fresh grilled octopus", price: 34, highlight: true, description: { fr: "Grillé, herbes, agrumes.", en: "Grilled, herbs, citrus." } },
  ],
  desserts: [
    { fr: "Le cookie Plaisir coupable", en: "The Guilty Pleasure cookie", price: 15, highlight: true, description: { fr: "Généreux, cœur fondant.", en: "Generous, molten centre." } },
    { fr: "Riz au lait vanillé", en: "Vanilla rice pudding", price: 13, description: { fr: "Crémeux, vanille bourbon.", en: "Creamy, Bourbon vanilla." } },
    { fr: "Pavlova fraise", en: "Strawberry pavlova", price: 13, description: { fr: "Meringue, fraises.", en: "Crisp meringue, strawberries." } },
    { fr: "Sélection de fromages", en: "Cheese selection", price: 16, description: { fr: "Affinés, confiture maison.", en: "Aged, house chutney." } },
  ],
  cocktails: [
    { fr: "Aperol Spritz", en: "Aperol Spritz", price: 10 },
    { fr: "Moscow Mule", en: "Moscow Mule", price: 12 },
    { fr: "Negroni", en: "Negroni", price: 12 },
    { fr: "Passion Plaisir ♥", en: "Passion Plaisir ♥", price: 12, description: { fr: "Signature maison.", en: "House signature." } },
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

export const hoursDisplay: { fr: string; en: string; hours: string | null }[] = [
  { fr: "Mardi & mercredi", en: "Tuesday & Wednesday", hours: "19:00 — 21:30" },
  { fr: "Jeudi", en: "Thursday", hours: "12:00 — 14:00  /  19:00 — 21:30" },
  { fr: "Vendredi", en: "Friday", hours: "12:00 — 14:00  /  18:00 — 22:00" },
  { fr: "Samedi", en: "Saturday", hours: "18:00 — 22:00" },
  { fr: "Dimanche & lundi", en: "Sunday & Monday", hours: null },
];

export const copy = {
  fr: {
    nav: ["La maison", "Carte", "Assiettes", "Le lieu", "Venir"],
    reserve: "Réserver",
    heroKicker: "Lasne",
    heroTitle: "Plaisir",
    heroTagline: "Cuisine belgo-française, sans chichi.",
    heroText: "Des assiettes généreuses, trois salons intimistes, et l'envie de bien recevoir. Patrick Ridremont & le chef Tristan Petiaux.",
    explore: "Voir la carte",
    scroll: "Descendre",
    introEyebrow: "La maison",
    introTitle: "Une bâtisse louisianaise, une cuisine canaille.",
    introText: "Ici on mijote, on nappe, on éponge le fond d'assiette. Tristan Petiaux tient les fourneaux — cuissons lentes, sauces franches. Patrick Ridremont tient la maison. Trois salons de douze couverts, lumière chaude, banquettes orange.",
    introQuote: "On n'y trouve pas des demi-plats.",
    menuEyebrow: "À table",
    menuTitle: "La carte",
    menuText: "Entrées autour de 20 €, plats autour de 30 €. On peut aussi juste passer pour un cocktail.",
    categories: { starters: "Entrées", mains: "Plats", desserts: "Desserts", cocktails: "Cocktails", menus: "Menus" },
    menuNote: "Prix indicatifs — la carte évolue selon les arrivages.",
    signaturesEyebrow: "Quelques assiettes",
    signaturesTitle: "Ce qu'on commande souvent.",
    galleryEyebrow: "Le lieu",
    galleryTitle: "Trois salons, une terrasse.",
    galleryText: "Décor pensé comme un film : plafond orange, bleu canard, lumière douce. Pas un showroom — une vraie salle où on reste.",
    practicalEyebrow: "Infos pratiques",
    practicalTitle: "Venir à Plaisir",
    address: "Adresse",
    hours: "Horaires",
    call: "Appeler",
    directions: "Itinéraire",
    closed: "Fermé",
    follow: "Sur les réseaux",
    footer: "Restaurant Plaisir · Lasne",
    close: "Fermer",
    previous: "Précédent",
    next: "Suivant",
    menuToggle: "Menu",
    location: "Lasne, Belgique",
    openNow: "Ouvert",
    closedNow: "Fermé",
    bookTitle: "Réserver",
    bookSubtitle: "3 salons · 12 couverts chacun",
    bookName: "Nom",
    bookEmail: "E-mail",
    bookPhone: "Téléphone",
    bookDate: "Date",
    bookTime: "Heure",
    bookGuests: "Couverts",
    bookMessage: "Message",
    bookSubmit: "Envoyer",
    bookSuccess: "Demande envoyée",
    bookSuccessText: "On vous rappelle pour confirmer. À bientôt.",
    bookNote: "Ou appelez directement",
    capacity: "36 couverts",
    cuisine: "Belgo-française",
  },
  en: {
    nav: ["The house", "Menu", "Plates", "The place", "Visit"],
    reserve: "Book",
    heroKicker: "Lasne",
    heroTitle: "Plaisir",
    heroTagline: "Belgian-French cooking, no fuss.",
    heroText: "Generous plates, three small rooms, and a proper welcome. Patrick Ridremont & chef Tristan Petiaux.",
    explore: "See the menu",
    scroll: "Scroll",
    introEyebrow: "The house",
    introTitle: "A Louisiana house, unfussy cooking.",
    introText: "Slow cooks, proper sauces, plates you finish. Tristan Petiaux in the kitchen. Patrick Ridremont at the front. Three rooms of twelve, warm light, orange banquettes.",
    introQuote: "No half portions here.",
    menuEyebrow: "At the table",
    menuTitle: "The menu",
    menuText: "Starters around €20, mains around €30. Or just a cocktail on the terrace.",
    categories: { starters: "Starters", mains: "Mains", desserts: "Desserts", cocktails: "Cocktails", menus: "Set menus" },
    menuNote: "Indicative prices — the menu shifts with the market.",
    signaturesEyebrow: "A few plates",
    signaturesTitle: "What people order again.",
    galleryEyebrow: "The place",
    galleryTitle: "Three rooms, a terrace.",
    galleryText: "Cinematic rooms: orange ceiling, teal walls, soft light. Not a showroom — a room you stay in.",
    practicalEyebrow: "Practical",
    practicalTitle: "Finding us",
    address: "Address",
    hours: "Hours",
    call: "Call",
    directions: "Directions",
    closed: "Closed",
    follow: "Follow",
    footer: "Restaurant Plaisir · Lasne",
    close: "Close",
    previous: "Previous",
    next: "Next",
    menuToggle: "Menu",
    location: "Lasne, Belgium",
    openNow: "Open",
    closedNow: "Closed",
    bookTitle: "Book a table",
    bookSubtitle: "3 rooms · 12 seats each",
    bookName: "Name",
    bookEmail: "Email",
    bookPhone: "Phone",
    bookDate: "Date",
    bookTime: "Time",
    bookGuests: "Guests",
    bookMessage: "Message",
    bookSubmit: "Send",
    bookSuccess: "Request sent",
    bookSuccessText: "We'll call you back to confirm. See you soon.",
    bookNote: "Or call us",
    capacity: "36 seats",
    cuisine: "Belgian-French",
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
  hasMenu: siteUrl + "/#carte",
  sameAs: [socials.instagram, socials.facebook],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday"], opens: "19:00", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "12:00", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "19:00", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "12:00", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "18:00", closes: "22:00" },
  ],
};
