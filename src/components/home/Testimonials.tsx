import { Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TESTIMONIALS } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Travellers"
          title="What people say after they land"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li
              key={testimonial.name}
              className="flex flex-col rounded-3xl bg-ivory p-6 ring-1 ring-main/12"
            >
              <Quote className="size-6 text-secondary" aria-hidden />
              <p className="mt-4 flex-1 text-sm leading-6 text-main/80">
                {testimonial.quote}
              </p>
              <footer className="mt-6">
                <p className="text-sm font-semibold text-main">
                  {testimonial.name}
                </p>
                <p className="text-xs text-main/60">{testimonial.role}</p>
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
