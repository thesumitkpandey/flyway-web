"use client";

import { FARE_TYPES, type FareType } from "./types";

type SpecialFaresProps = {
  value: FareType;
  onChange: (value: FareType) => void;
};

export function SpecialFares({ value, onChange }: SpecialFaresProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-semibold tracking-[0.14em] text-main/55 uppercase">
        Special fares
      </span>
      {FARE_TYPES.map((fare) => {
        const selected = fare.id === value;
        return (
          <button
            key={fare.id}
            type="button"
            onClick={() => onChange(fare.id)}
            aria-pressed={selected}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              selected
                ? "bg-secondary text-main ring-1 ring-main/20"
                : "bg-main/6 text-main/70 hover:bg-main/12 hover:text-main"
            }`}
          >
            {fare.label}
            {selected ? (
              <span className="ml-1.5 font-medium text-main/60">
                {fare.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
