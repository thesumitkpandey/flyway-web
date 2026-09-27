import Link from "next/link";
import { FOOTER_COLUMNS } from "@/data/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto bg-main text-ivory" id="support">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-ivory/80">
            Thoughtful flight search for people who care how they arrive. Book
            with clear fares, real support, and routes that respect your time.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/80 hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-ivory/15">
        <Container className="flex flex-col gap-3 py-5 text-xs text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Flyway. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/#privacy" className="hover:text-secondary">
              Privacy
            </Link>
            <Link href="/#terms" className="hover:text-secondary">
              Terms
            </Link>
            <Link href="/#cookies" className="hover:text-secondary">
              Cookies
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
