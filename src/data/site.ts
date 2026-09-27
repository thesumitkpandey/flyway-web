export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/flights", label: "Flights" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/#deals", label: "Deals" },
  { href: "/#support", label: "Support" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Flyway",
    links: [
      { href: "/#about", label: "About us" },
      { href: "/#careers", label: "Careers" },
      { href: "/#press", label: "Press" },
      { href: "/#sustainability", label: "Sustainability" },
    ],
  },
  {
    title: "Travel",
    links: [
      { href: "/flights", label: "Search flights" },
      { href: "/#destinations", label: "Popular routes" },
      { href: "/#deals", label: "Fare deals" },
      { href: "/#groups", label: "Group booking" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/#support", label: "Help center" },
      { href: "/#baggage", label: "Baggage" },
      { href: "/#changes", label: "Changes & refunds" },
      { href: "/#contact", label: "Contact" },
    ],
  },
] as const;

export const ASSURANCES = [
  "Zero convenience fee",
  "Live fares from 60+ airlines",
  "Free cancellation window",
] as const;

export const AIRLINES = [
  "IndiGo",
  "Air India",
  "Vistara",
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "Lufthansa",
  "Etihad",
] as const;

export const DESTINATIONS = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    code: "DXB",
    price: 15999,
    from: "DEL",
    tag: "Weekend favourite",
    accent: "main" as const,
    span: "wide" as const,
  },
  {
    city: "Singapore",
    country: "Singapore",
    code: "SIN",
    price: 22450,
    from: "BOM",
    tag: "Visa on arrival",
    accent: "secondary" as const,
    span: "normal" as const,
  },
  {
    city: "London",
    country: "United Kingdom",
    code: "LHR",
    price: 41200,
    from: "DEL",
    tag: "Non-stop",
    accent: "main" as const,
    span: "normal" as const,
  },
  {
    city: "Bali",
    country: "Indonesia",
    code: "DPS",
    price: 18600,
    from: "BLR",
    tag: "Beach season",
    accent: "secondary" as const,
    span: "normal" as const,
  },
  {
    city: "Tokyo",
    country: "Japan",
    code: "HND",
    price: 39800,
    from: "DEL",
    tag: "Cherry blossom",
    accent: "main" as const,
    span: "normal" as const,
  },
  {
    city: "Malé",
    country: "Maldives",
    code: "MLE",
    price: 24700,
    from: "COK",
    tag: "Short hop",
    accent: "secondary" as const,
    span: "wide" as const,
  },
] as const;

export const FEATURES = [
  {
    title: "Transparent fares",
    body: "Taxes, seats, and baggage are priced before checkout. Nothing appears at the last step.",
  },
  {
    title: "Smart connections",
    body: "We rank the fastest routes and the gentlest layovers so you land ready, not rushed.",
  },
  {
    title: "Flexible tickets",
    body: "Change dates or names on most fares with the fee shown up front in your booking.",
  },
  {
    title: "Care on the ground",
    body: "24/7 support from people who can actually rebook you, not a maze of chatbots.",
  },
] as const;

export const DEALS = [
  {
    route: "Delhi → Dubai",
    from: "DEL",
    to: "DXB",
    cabin: "Economy",
    save: "22%",
    price: 15999,
  },
  {
    route: "Mumbai → Singapore",
    from: "BOM",
    to: "SIN",
    cabin: "Premium economy",
    save: "18%",
    price: 22450,
  },
  {
    route: "Bengaluru → Bali",
    from: "BLR",
    to: "DPS",
    cabin: "Economy",
    save: "31%",
    price: 18600,
  },
] as const;

export const STATS = [
  { value: "140+", label: "cities served" },
  { value: "60+", label: "airline partners" },
  { value: "4.8", label: "traveller rating" },
  { value: "24/7", label: "live support" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Booked a Delhi–Dubai return in under two minutes, and the fare on the confirmation matched the one I searched.",
    name: "Ananya Rao",
    role: "Product designer, Bengaluru",
  },
  {
    quote:
      "My layover got cancelled at midnight and someone answered on the first ring. I was rebooked before sunrise.",
    name: "Imran Sheikh",
    role: "Consultant, Mumbai",
  },
  {
    quote:
      "The traveller and class picker is the first one I have used that did not make me guess what I selected.",
    name: "Meera Nair",
    role: "Doctor, Kochi",
  },
] as const;
