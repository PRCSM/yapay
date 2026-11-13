import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="currentColor" opacity="0.18" />
      <path d="M6.5 7.5 12 13l5.5-5.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M12 13v4.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Yapay home"
      className={cn(
        "inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em]",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark />
      <span>Yapay</span>
    </Link>
  );
}
