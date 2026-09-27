import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "on-ivory" | "on-main";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "on-ivory",
}: SectionHeadingProps) {
  const onMain = tone === "on-main";

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p
          className={`text-xs font-semibold tracking-[0.18em] uppercase ${
            onMain ? "text-secondary" : "text-main/60"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-2 text-3xl font-semibold tracking-tight sm:text-4xl ${
            onMain ? "text-ivory" : "text-main"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-3 text-sm leading-6 ${
              onMain ? "text-ivory/80" : "text-main/70"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
