import { Container } from "@/components/layout/Container";
import { AIRLINES, STATS } from "@/data/site";

export function TrustStrip() {
  return (
    <section className="pt-20 pb-6">
      <Container>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-main/5 px-5 py-5 ring-1 ring-main/10"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold text-main">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-main/65">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-main/10 pt-8">
          <span className="text-xs font-semibold tracking-[0.18em] text-main/50 uppercase">
            Flying with
          </span>
          {AIRLINES.map((airline) => (
            <span
              key={airline}
              className="text-sm font-semibold text-main/45 transition hover:text-main"
            >
              {airline}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
