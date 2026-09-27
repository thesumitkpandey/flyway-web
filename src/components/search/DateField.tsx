"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isValid,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { splitDate, toIsoDate } from "@/lib/date";
import { FIELD_META_CLASS, FIELD_VALUE_CLASS, FieldShell } from "./FieldShell";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type DateFieldProps = {
  label: string;
  value: string;
  min: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  disabledHint?: string;
  onDisabledClick?: () => void;
};

export function DateField({
  label,
  value,
  min,
  onChange,
  disabled = false,
  disabledHint = "Add a date",
  onDisabledClick,
}: DateFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const parts = splitDate(value);

  useClickOutside(containerRef, () => setOpen(false), open);

  if (disabled) {
    return (
      <FieldShell label={label} className="px-4 py-3.5">
        <button
          type="button"
          onClick={onDisabledClick}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <span className="block text-base font-semibold text-main/45">
            {disabledHint}
          </span>
          <span className={`block ${FIELD_META_CLASS}`}>
            Save more on a round trip
          </span>
        </button>
      </FieldShell>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${open ? "z-30" : ""}`}>
      <FieldShell label={label} className="px-4 py-3.5">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <span className={`block ${FIELD_VALUE_CLASS}`}>
            {parts ? (
              <>
                {parts.day}{" "}
                <span className="text-base font-medium text-main/60">
                  {parts.month}
                </span>
              </>
            ) : (
              "Select"
            )}
          </span>
          <span className={`block ${FIELD_META_CLASS}`}>
            {parts ? parts.weekday : "Pick a date"}
          </span>
        </button>
      </FieldShell>

      {open ? (
        <Calendar
          label={label}
          value={value}
          min={min}
          onSelect={(next) => {
            onChange(next);
            setOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

type CalendarProps = {
  label: string;
  value: string;
  min: string;
  onSelect: (value: string) => void;
};

function Calendar({ label, value, min, onSelect }: CalendarProps) {
  const selected = parseISO(value);
  const minDate = startOfDay(parseISO(min));
  const [cursor, setCursor] = useState(() =>
    startOfMonth(isValid(selected) ? selected : new Date()),
  );

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 }),
  });

  const previousMonth = subMonths(cursor, 1);
  const canGoBack = !isBefore(endOfMonth(previousMonth), minDate);

  return (
    <div
      role="dialog"
      aria-label={`${label} calendar`}
      className="absolute top-full right-0 left-0 z-30 min-w-72 rounded-b-2xl bg-ivory p-3 shadow-xl shadow-main/15 ring-1 ring-main/10"
    >
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setCursor(previousMonth)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="grid size-8 place-items-center rounded-lg text-main hover:bg-main/8 disabled:opacity-35"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="text-sm font-semibold text-main">
          {format(cursor, "MMMM yyyy")}
        </p>
        <button
          type="button"
          onClick={() => setCursor(addMonths(cursor, 1))}
          aria-label="Next month"
          className="grid size-8 place-items-center rounded-lg text-main hover:bg-main/8"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center text-[11px] font-semibold tracking-wide text-main/50 uppercase">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7">
        {days.map((day) => {
          const unavailable =
            !isValid(minDate) ? false : isBefore(startOfDay(day), minDate);
          const inMonth = isSameMonth(day, cursor);
          const isSelected = isValid(selected) && isSameDay(day, selected);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={unavailable}
              onClick={() => onSelect(toIsoDate(day))}
              aria-label={format(day, "EEEE d MMMM yyyy")}
              aria-pressed={isSelected}
              className={`mx-auto grid size-8 place-items-center rounded-full text-sm ${
                isSelected
                  ? "bg-main font-semibold text-ivory"
                  : unavailable
                    ? "text-main/25"
                    : inMonth
                      ? "text-main hover:bg-main/8"
                      : "text-main/35 hover:bg-main/8"
              }`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
