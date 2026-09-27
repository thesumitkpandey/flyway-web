"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { searchAirports, type Airport } from "@/data/airports";
import { useClickOutside } from "@/hooks/useClickOutside";
import { FIELD_META_CLASS, FIELD_VALUE_CLASS, FieldShell } from "./FieldShell";

type AirportFieldProps = {
  label: string;
  value: Airport;
  excludeCode?: string;
  onSelect: (airport: Airport) => void;
};

export function AirportField({
  label,
  value,
  excludeCode,
  onSelect,
}: AirportFieldProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = searchAirports(query, excludeCode);
  const shown = open ? query : value.city;
  const showCode = !(open && query !== value.city);

  function close() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  useClickOutside(containerRef, close, open);

  function choose(airport: Airport) {
    onSelect(airport);
    close();
    inputRef.current?.blur();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) =>
        index === 0 ? Math.max(results.length - 1, 0) : index - 1,
      );
    } else if (event.key === "Enter" && open) {
      event.preventDefault();
      const airport = results[activeIndex];
      if (airport) {
        choose(airport);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
      event.currentTarget.blur();
    }
  }

  return (
    <div ref={containerRef} className={`relative ${open ? "z-30" : ""}`}>
      <FieldShell label={label} className="px-4 py-3.5">
        <div className="flex min-w-0 items-baseline gap-2 overflow-hidden">
          <input
            ref={inputRef}
            value={shown}
            size={showCode ? Math.max(shown.length, 1) : undefined}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
              setOpen(true);
            }}
            onFocus={() => {
              setQuery(value.city);
              setActiveIndex(0);
              setOpen(true);
              requestAnimationFrame(() => inputRef.current?.select());
            }}
            onKeyDown={onKeyDown}
            placeholder="City or airport"
            role="combobox"
            aria-controls={listboxId}
            aria-expanded={open}
            aria-autocomplete="list"
            aria-label={`${label} airport`}
            autoComplete="off"
            className={`min-w-0 border-0 bg-transparent p-0 shadow-none outline-none placeholder:text-main/35 focus:ring-0 ${FIELD_VALUE_CLASS} ${
              showCode ? "w-auto max-w-[calc(100%-2.75rem)] shrink" : "w-full"
            }`}
          />
          {showCode ? (
            <span className="shrink-0 text-base font-medium text-main/60">
              {value.code}
            </span>
          ) : null}
        </div>
        <span className={`block ${FIELD_META_CLASS}`}>
          {open && query !== value.city ? "Matching airports" : value.name}
        </span>
      </FieldShell>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={`${label} suggestions`}
          className="absolute top-full right-0 left-0 z-30 max-h-64 overflow-y-auto rounded-b-2xl bg-ivory py-1 shadow-xl shadow-main/15 ring-1 ring-main/10"
        >
          {results.map((airport, index) => (
            <li key={airport.code}>
              <button
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(airport)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left ${
                  index === activeIndex ? "bg-main/8" : ""
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-main">
                    {airport.city}
                  </span>
                  <span className="block truncate text-xs text-main/60">
                    {airport.name}, {airport.country}
                  </span>
                </span>
                <span className="shrink-0 rounded-lg bg-secondary px-2 py-0.5 text-xs font-bold text-main">
                  {airport.code}
                </span>
              </button>
            </li>
          ))}

          {results.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-main/60">
              No airports match “{query}”.
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
