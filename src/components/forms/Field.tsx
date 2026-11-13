import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const hasH = (c?: string) => Boolean(c && /(^|\s)h-/.test(c));
const base = "w-full rounded-2xl border bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-subtle focus:border-electric focus:ring-4 focus:ring-electric/10";

export function Field({ label, id, error, hint, children }: { label: string; id: string; error?: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-ink">{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] text-danger">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[12px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ error, id, className, ...rest }: ComponentProps<"input"> & { error?: string; id: string }) {
  return <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={cn(base, !hasH(className) && "h-12", error ? "border-danger" : "border-line", className)} {...rest} />;
}

export function Select({ error, id, className, children, ...rest }: ComponentProps<"select"> & { error?: string; id: string }) {
  return (
    <select id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={cn(base, !hasH(className) && "h-12", "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23777%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10", error ? "border-danger" : "border-line", className)} {...rest}>
      {children}
    </select>
  );
}

export function Textarea({ error, id, className, ...rest }: ComponentProps<"textarea"> & { error?: string; id: string }) {
  return <textarea id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={cn(base, "min-h-32 py-3", error ? "border-danger" : "border-line", className)} {...rest} />;
}
