export const TRIP_TYPES = [
  { id: "oneway", label: "One way" },
  { id: "round", label: "Round trip" },
] as const;

export type TripType = (typeof TRIP_TYPES)[number]["id"];

export const CABIN_CLASSES = [
  { id: "economy", label: "Economy" },
  { id: "premium", label: "Premium economy" },
  { id: "business", label: "Business" },
  { id: "first", label: "First class" },
] as const;

export type CabinClass = (typeof CABIN_CLASSES)[number]["id"];

export const FARE_TYPES = [
  { id: "regular", label: "Regular", hint: "Regular fares" },
  { id: "student", label: "Student", hint: "Extra baggage" },
  { id: "senior", label: "Senior citizen", hint: "Up to ₹600 off" },
  { id: "forces", label: "Armed forces", hint: "Up to ₹600 off" },
  { id: "medical", label: "Doctors & nurses", hint: "Up to ₹600 off" },
] as const;

export type FareType = (typeof FARE_TYPES)[number]["id"];

export const TRAVELLER_GROUPS = [
  { id: "adults", label: "Adults", hint: "12 years and above", min: 1, max: 9 },
  { id: "children", label: "Children", hint: "2 to 11 years", min: 0, max: 8 },
  { id: "infants", label: "Infants", hint: "Under 2 years", min: 0, max: 6 },
] as const;

export type TravellerGroup = (typeof TRAVELLER_GROUPS)[number]["id"];

export type Travellers = Record<TravellerGroup, number>;

export function cabinLabel(cabin: CabinClass): string {
  return CABIN_CLASSES.find((option) => option.id === cabin)?.label ?? "Economy";
}

export function countTravellers(travellers: Travellers): number {
  return travellers.adults + travellers.children + travellers.infants;
}
