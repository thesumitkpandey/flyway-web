import { addDays, format, isValid, parseISO } from "date-fns";

export function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function todayIso(): string {
  return toIsoDate(new Date());
}

export function isoAfter(isoDate: string, days: number): string {
  const parsed = parseISO(isoDate);
  return isValid(parsed) ? toIsoDate(addDays(parsed, days)) : todayIso();
}

type DateParts = { day: string; month: string; weekday: string };

export function splitDate(isoDate: string): DateParts | null {
  const parsed = parseISO(isoDate);
  if (!isValid(parsed)) {
    return null;
  }

  return {
    day: format(parsed, "d"),
    month: format(parsed, "MMM ''yy"),
    weekday: format(parsed, "EEEE"),
  };
}

export function formatLongDate(isoDate: string): string {
  const parsed = parseISO(isoDate);
  return isValid(parsed) ? format(parsed, "EEE, d MMM yyyy") : isoDate;
}
