import Link from "next/link";
import { Plane } from "lucide-react";

type LogoProps = {
  tone?: "on-main" | "on-ivory";
};

export function Logo({ tone = "on-main" }: LogoProps) {
  const mark =
    tone === "on-main"
      ? "bg-secondary text-main"
      : "bg-main text-ivory";
  const word = tone === "on-main" ? "text-ivory" : "text-main";

  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        className={`grid size-9 place-items-center rounded-xl ${mark}`}
        aria-hidden
      >
        <Plane className="size-5 -rotate-45" />
      </span>
      <span className={`text-lg font-semibold tracking-tight ${word}`}>
        Flyway
      </span>
    </Link>
  );
}
