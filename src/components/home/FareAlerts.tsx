"use client";

import { BellRing } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Container } from "@/components/layout/Container";

export function FareAlerts() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-8 rounded-[2rem] bg-secondary px-6 py-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="grid size-11 place-items-center rounded-2xl bg-main text-ivory">
              <BellRing className="size-5" aria-hidden />
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-main">
              Get fare alerts before the seats go
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-main/75">
              One email a week with the routes that actually dropped in price.
              No countdown timers, no fake urgency.
            </p>
          </div>

          {subscribed ? (
            <p
              role="status"
              className="rounded-2xl bg-main px-6 py-8 text-center text-sm font-semibold text-ivory"
            >
              You’re on the list. Watch your inbox every Tuesday.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <label
                htmlFor={inputId}
                className="text-xs font-semibold tracking-[0.14em] text-main/70 uppercase"
              >
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id={inputId}
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full bg-ivory px-5 py-3.5 text-sm font-medium text-main ring-1 ring-main/15 outline-none placeholder:text-main/40 focus:ring-2 focus:ring-main"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-main px-7 py-3.5 text-sm font-semibold text-ivory transition hover:bg-main/90"
                >
                  Notify me
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
