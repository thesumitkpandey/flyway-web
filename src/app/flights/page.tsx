import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cabinLabel, type CabinClass } from "@/components/search/types";
import { airportOrFirst } from "@/data/airports";
import { formatLongDate } from "@/lib/date";

type FlightsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toCount(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export default async function FlightsPage({ searchParams }: FlightsPageProps) {
  const params = await searchParams;

  const origin = airportOrFirst(first(params.from) ?? "DEL");
  const destination = airportOrFirst(first(params.to) ?? "DXB");
  const depart = first(params.depart);
  const returnDate = first(params.return);
  const cabin = (first(params.cabin) ?? "economy") as CabinClass;
  const adults = toCount(first(params.adults), 1);
  const children = toCount(first(params.children), 0);
  const infants = toCount(first(params.infants), 0);
  const travellers = adults + children + infants;

  const summary = [
    depart ? formatLongDate(depart) : null,
    returnDate ? `Return ${formatLongDate(returnDate)}` : "One way",
    `${travellers} traveller${travellers === 1 ? "" : "s"}`,
    cabinLabel(cabin),
  ].filter(Boolean);

  return (
    <section className="py-16">
      <Container>
        <p className="text-xs font-semibold tracking-[0.18em] text-main/60 uppercase">
          Your search
        </p>

        <h1 className="mt-3 flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight text-main sm:text-4xl">
          {origin.city}
          <ArrowRight className="size-6 text-main/50" aria-hidden />
          {destination.city}
        </h1>

        <ul className="mt-4 flex flex-wrap gap-2">
          {summary.map((item) => (
            <li
              key={item}
              className="rounded-full bg-main/8 px-3 py-1.5 text-sm font-medium text-main"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-xl text-sm leading-6 text-main/70">
          Live results for {origin.code} → {destination.code} are coming next.
          Your selection is saved in the URL, so you can share or bookmark this
          search.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-main transition hover:bg-secondary/90"
        >
          Change search
        </Link>
      </Container>
    </section>
  );
}
