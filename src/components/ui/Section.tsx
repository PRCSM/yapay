import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, tone = "dark", className }: { children: ReactNode; tone?: "dark" | "light" | "blue"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em]",
        tone === "dark" && "text-muted",
        tone === "light" && "text-white/60",
        tone === "blue" && "text-electric",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", tone === "light" ? "bg-sky" : "bg-electric")} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow, title, description, align = "center", tone = "dark", className,
}: { eyebrow?: string; title: ReactNode; description?: ReactNode; align?: "center" | "left"; tone?: "dark" | "light"; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "dark"}>{eyebrow}</Eyebrow>}
      <h2 data-reveal className={cn("text-h2 max-w-[18ch]", tone === "light" ? "text-white" : "text-ink", align === "center" && "mx-auto")}>{title}</h2>
      {description && (
        <p data-reveal data-reveal-delay="0.08" className={cn("max-w-[52ch] text-[15px] leading-relaxed", tone === "light" ? "text-white/60" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function DemoBadge({ children = "Demo data", className, tone = "dark" }: { children?: ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        tone === "dark" ? "bg-[#fff4e0] text-[#8a5a00]" : "bg-white/10 text-white/80",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#e3a008]" aria-hidden />
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "succeeded" | "pending" | "failed" | "refunded" | "paid" | "open" | "overdue" | "draft" | "active" | "paused" | "canceled" }) {
  const map: Record<string, string> = {
    succeeded: "bg-[#e7f6ee] text-[#0d7a3d]",
    paid: "bg-[#e7f6ee] text-[#0d7a3d]",
    active: "bg-[#e7f6ee] text-[#0d7a3d]",
    pending: "bg-[#fff4e0] text-[#8a5a00]",
    open: "bg-ice text-electric",
    draft: "bg-fog text-muted",
    paused: "bg-fog text-muted",
    failed: "bg-[#fdecec] text-[#b42323]",
    overdue: "bg-[#fdecec] text-[#b42323]",
    canceled: "bg-fog text-muted",
    refunded: "bg-[#f1ecff] text-[#5b3cc4]",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium capitalize", map[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}
