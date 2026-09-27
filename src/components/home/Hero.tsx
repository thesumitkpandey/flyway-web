import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FlightSearchCard } from "@/components/search/FlightSearchCard";
import { ASSURANCES } from "@/data/site";
import { isoAfter, todayIso } from "@/lib/date";

export function Hero() {
  const today = todayIso();

  return (
    <>
      <section className="relative overflow-hidden bg-main text-ivory">
        <div
          className="pointer-events-none absolute -top-28 -right-20 size-80 rounded-full bg-secondary/25 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 size-96 rounded-full bg-ivory/10 blur-2xl"
          aria-hidden
        />

        <Container className="relative pt-14 pb-40 text-center sm:pb-44 lg:pt-20">
          <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold tracking-wide text-main uppercase">
            Fly brighter
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Book the flight. Keep the day.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-ivory/85 sm:text-lg">
            Compare live fares across 140+ cities, then book a ticket you can
            actually change.
          </p>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {ASSURANCES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-ivory/85"
              >
                <Check className="size-4 text-secondary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="relative z-20 -mt-32 sm:-mt-36">
        <FlightSearchCard
          initialDepart={today}
          initialReturn={isoAfter(today, 4)}
          minDate={today}
        />
      </Container>
    </>
  );
}
