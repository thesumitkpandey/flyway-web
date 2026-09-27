export type Airport = {
  code: string;
  city: string;
  name: string;
  country: string;
};

export const AIRPORTS: Airport[] = [
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi International", country: "India" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj Intl", country: "India" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International", country: "India" },
  { code: "MAA", city: "Chennai", name: "Chennai International", country: "India" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International", country: "India" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhas Chandra Bose Intl", country: "India" },
  { code: "GOI", city: "Goa", name: "Dabolim", country: "India" },
  { code: "COK", city: "Kochi", name: "Cochin International", country: "India" },
  { code: "PNQ", city: "Pune", name: "Pune International", country: "India" },
  { code: "AMD", city: "Ahmedabad", name: "Sardar Vallabhbhai Patel Intl", country: "India" },
  { code: "JAI", city: "Jaipur", name: "Jaipur International", country: "India" },
  { code: "SXR", city: "Srinagar", name: "Sheikh ul-Alam International", country: "India" },
  { code: "DXB", city: "Dubai", name: "Dubai International", country: "United Arab Emirates" },
  { code: "AUH", city: "Abu Dhabi", name: "Zayed International", country: "United Arab Emirates" },
  { code: "DOH", city: "Doha", name: "Hamad International", country: "Qatar" },
  { code: "SIN", city: "Singapore", name: "Changi", country: "Singapore" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi", country: "Thailand" },
  { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur International", country: "Malaysia" },
  { code: "DPS", city: "Bali", name: "Ngurah Rai International", country: "Indonesia" },
  { code: "HKG", city: "Hong Kong", name: "Hong Kong International", country: "Hong Kong" },
  { code: "HND", city: "Tokyo", name: "Haneda", country: "Japan" },
  { code: "ICN", city: "Seoul", name: "Incheon International", country: "South Korea" },
  { code: "LHR", city: "London", name: "Heathrow", country: "United Kingdom" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt am Main", country: "Germany" },
  { code: "AMS", city: "Amsterdam", name: "Schiphol", country: "Netherlands" },
  { code: "IST", city: "Istanbul", name: "Istanbul", country: "Türkiye" },
  { code: "JFK", city: "New York", name: "John F. Kennedy International", country: "United States" },
  { code: "SFO", city: "San Francisco", name: "San Francisco International", country: "United States" },
  { code: "YYZ", city: "Toronto", name: "Toronto Pearson International", country: "Canada" },
  { code: "SYD", city: "Sydney", name: "Kingsford Smith", country: "Australia" },
  { code: "MLE", city: "Malé", name: "Velana International", country: "Maldives" },
  { code: "CMB", city: "Colombo", name: "Bandaranaike International", country: "Sri Lanka" },
  { code: "KTM", city: "Kathmandu", name: "Tribhuvan International", country: "Nepal" },
];

export function findAirport(code: string): Airport | undefined {
  return AIRPORTS.find((airport) => airport.code === code.toUpperCase());
}

export function airportOrFirst(code: string): Airport {
  return findAirport(code) ?? AIRPORTS[0];
}

export function searchAirports(query: string, excludeCode?: string): Airport[] {
  const term = query.trim().toLowerCase();
  const pool = AIRPORTS.filter((airport) => airport.code !== excludeCode);

  if (!term) {
    return pool.slice(0, 8);
  }

  return pool
    .filter((airport) =>
      [airport.code, airport.city, airport.name, airport.country]
        .join(" ")
        .toLowerCase()
        .includes(term),
    )
    .slice(0, 8);
}
