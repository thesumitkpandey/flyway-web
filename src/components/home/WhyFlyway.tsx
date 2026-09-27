import { BadgeCheck, Clock3, Headphones, Ticket } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FEATURES } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

const ICONS = [Ticket, Clock3, BadgeCheck, Headphones];

export function WhyFlyway() {
  return (
    <section className="py-16" id="about">
      <Container>
        <SectionHeading
          eyebrow="Why Flyway"
          title="Built for the journey, not just the ticket"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = ICONS[index];

            return (
              <article
                key={feature.title}
                className="rounded-3xl bg-main/5 p-6 ring-1 ring-main/10 transition hover:bg-main/8"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-main">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-main">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-main/70">
                  {feature.body}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
