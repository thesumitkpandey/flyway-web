"use client";

import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import {
  FIELD_META_CLASS,
  FIELD_VALUE_CLASS,
  FieldShell,
} from "./FieldShell";
import {
  CABIN_CLASSES,
  TRAVELLER_GROUPS,
  cabinLabel,
  countTravellers,
  type CabinClass,
  type TravellerGroup,
  type Travellers,
} from "./types";

type TravellerFieldProps = {
  travellers: Travellers;
  cabin: CabinClass;
  onTravellerChange: (group: TravellerGroup, count: number) => void;
  onCabinChange: (cabin: CabinClass) => void;
};

export function TravellerField({
  travellers,
  cabin,
  onTravellerChange,
  onCabinChange,
}: TravellerFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickOutside(containerRef, () => setOpen(false), open);

  const total = countTravellers(travellers);

  return (
    <div ref={containerRef} className="relative">
      <FieldShell label="Travellers & class" className="px-4 py-3.5">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <span className={`block ${FIELD_VALUE_CLASS}`}>
            {total}{" "}
            <span className="text-base font-medium text-main/60">
              {total === 1 ? "traveller" : "travellers"}
            </span>
          </span>
          <span className={`block ${FIELD_META_CLASS}`}>
            {cabinLabel(cabin)}
          </span>
        </button>
      </FieldShell>

      {open ? (
        <div
          role="dialog"
          aria-label="Select travellers and cabin class"
          className="absolute top-2 right-2 z-30 w-[min(20rem,calc(100vw-3rem))] rounded-2xl bg-ivory p-4 shadow-2xl shadow-main/20 ring-1 ring-main/15"
        >
          <ul className="space-y-3">
            {TRAVELLER_GROUPS.map((group) => {
              const count = travellers[group.id];
              return (
                <li
                  key={group.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span>
                    <span className="block text-sm font-semibold text-main">
                      {group.label}
                    </span>
                    <span className="block text-xs text-main/60">
                      {group.hint}
                    </span>
                  </span>

                  <span className="flex items-center gap-2">
                    <CounterButton
                      label={`Remove one ${group.label.toLowerCase()}`}
                      disabled={count <= group.min}
                      onClick={() => onTravellerChange(group.id, count - 1)}
                    >
                      <Minus className="size-4" />
                    </CounterButton>
                    <span className="w-6 text-center text-sm font-semibold text-main">
                      {count}
                    </span>
                    <CounterButton
                      label={`Add one ${group.label.toLowerCase()}`}
                      disabled={count >= group.max}
                      onClick={() => onTravellerChange(group.id, count + 1)}
                    >
                      <Plus className="size-4" />
                    </CounterButton>
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 text-[11px] font-semibold tracking-[0.14em] text-main/55 uppercase">
            Cabin class
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {CABIN_CLASSES.map((option) => {
              const selected = option.id === cabin;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onCabinChange(option.id)}
                  aria-pressed={selected}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    selected
                      ? "bg-main text-ivory"
                      : "bg-main/8 text-main hover:bg-main/12"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-xl bg-secondary py-2.5 text-sm font-semibold text-main hover:bg-secondary/90"
          >
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
}

type CounterButtonProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function CounterButton({
  label,
  disabled,
  onClick,
  children,
}: CounterButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-8 place-items-center rounded-lg bg-main/8 text-main transition hover:bg-main/15 disabled:opacity-35"
    >
      {children}
    </button>
  );
}
