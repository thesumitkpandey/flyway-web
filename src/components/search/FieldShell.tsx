import type { ReactNode } from "react";

type FieldShellProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function FieldShell({ label, children, className = "" }: FieldShellProps) {
  return (
    <div className={`relative ${className}`}>
      <p className="text-[11px] font-semibold tracking-[0.14em] text-main/55 uppercase">
        {label}
      </p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export const FIELD_VALUE_CLASS =
  "text-xl font-semibold leading-tight text-main sm:text-2xl";

export const FIELD_META_CLASS =
  "mt-1 truncate text-xs text-main/60";
