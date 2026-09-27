import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { DEALS } from "@/data/site";
import { formatInr } from "@/lib/format";
import { SectionHeading } from "./SectionHeading";

export function FareDeals() {
  return (
    <section className="py-8" id="deals">
      <Container>
        <div className="rounded-[2rem] bg-main px-6 py-12 sm:px-10">
          <SectionHeading
            tone="on-main"
            eyebrow="Limited fares"
            title="This week’s yellow-tag deals"
            description="Hand-picked routes with extra seat inventory. Fares refresh every morning."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {DEALS.map((deal) => (
              <Link
                key={deal.route}
                href={`/flights?from=${deal.from}&to=${deal.to}`}
                className="group rounded-3xl bg-ivory p-6 text-main transition hover:-translate-y-1"
              >
                <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-bold">
                  Save {deal.save}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{deal.route}</h3>
                <p className="mt-1 text-sm text-main/65">{deal.cabin}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-xs text-main/65">from</span>
                  <span className="text-2xl font-semibold">
                    {formatInr(deal.price)}
                  </span>
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-main/70 group-hover:text-main">
                  View fare →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
