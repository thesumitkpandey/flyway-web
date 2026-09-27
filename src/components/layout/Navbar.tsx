"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/data/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-main text-ivory">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href) && !link.href.includes("#");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-ivory text-main"
                    : "text-ivory/85 hover:bg-ivory/10 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/#support"
            className="rounded-full px-4 py-2 text-sm font-medium text-ivory/90 hover:bg-ivory/10"
          >
            Sign in
          </Link>
          <Link
            href="/flights"
            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-main hover:bg-secondary/90"
          >
            Book a flight
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-xl text-ivory hover:bg-ivory/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-ivory/15 bg-main md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ivory hover:bg-ivory/10"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/flights"
              className="mt-2 rounded-xl bg-secondary px-3 py-2.5 text-center text-sm font-semibold text-main"
              onClick={() => setOpen(false)}
            >
              Book a flight
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
