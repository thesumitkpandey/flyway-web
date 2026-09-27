"use client";

import { TRIP_TYPES, type TripType } from "./types";

type TripTypeTabsProps = {
  value: TripType;
  onChange: (value: TripType) => void;
};

export function TripTypeTabs({ value, onChange }: TripTypeTabsProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Trip type"
      className="inline-flex rounded-full bg-main/8 p-1"
    >
      {TRIP_TYPES.map((trip) => {
        const selected = trip.id === value;
        return (
          <button
            key={trip.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(trip.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              selected ? "bg-main text-ivory" : "text-main/70 hover:text-main"
            }`}
          >
            {trip.label}
          </button>
        );
      })}
    </div>
  );
}
