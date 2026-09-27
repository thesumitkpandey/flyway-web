import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DESTINATIONS } from "@/data/site";
import { formatInr } from "@/lib/format";
import { SectionHeading } from "./SectionHeading";

export function PopularDestinations() {
  return (
    <section className="py-16" id="destinations">
      <Container>
        <SectionHeading
          eyebrow="Popular now"
          title="Places people are flying this month"
          description="Lowest one-way fares found in the last 48 hours, including taxes."
          action={
            <Link
              href="/flights"
              className="inline-flex items-center gap-1 rounded-full bg-main/8 px-4 py-2 text-sm font-semibold text-main transition hover:bg-main/15"
            >
              See all routes
              <ArrowUpRight className="size-4" />
            </Link>
          }
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((place) => {
            const onSecondary = place.accent === "secondary";

            return (
              <Link
                key={place.code}
                href={`/flights?from=${place.from}&to=${place.code}`}
                className={`group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-3xl p-5 transition hover:-translate-y-1 ${
                  place.span === "wide" ? "sm:col-span-2" : ""
                } ${
                  onSecondary
                    ? "bg-secondary text-main ring-1 ring-main/15"
                    : "bg-main text-ivory"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-5 -bottom-10 text-[7.5rem] leading-none font-bold opacity-10 ${
                    onSecondary ? "text-main" : "text-ivory"
                  }`}
                >
                  {place.code}
                </span>

                <div className="relative">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${
                      onSecondary
                        ? "bg-main/10 text-main/80"
                        : "bg-ivory/15 text-secondary"
                    }`}
                  >
                    {place.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold">{place.city}</h3>
                  <p
                    className={`text-sm ${
                      onSecondary ? "text-main/70" : "text-ivory/75"
                    }`}
                  >
                    {place.country} · from {place.from}
                  </p>
                </div>

                <p className="relative flex items-end justify-between gap-2">
                  <span>
                    <span
                      className={`block text-xs ${
                        onSecondary ? "text-main/70" : "text-ivory/70"
                      }`}
                    >
                      One way from
                    </span>
                    <span className="text-2xl font-semibold">
                      {formatInr(place.price)}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
