import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "blue" | "dark" | "light" | "outline" | "outline-light" | "ghost";

const variants: Record<Variant, string> = {
  blue: "bg-electric text-white hover:bg-bright shadow-[0_8px_24px_-10px_rgba(8,102,249,0.8)]",
  dark: "bg-ink text-white hover:bg-graphite",
  light: "bg-white text-ink hover:bg-mist",
  outline: "border border-line text-ink hover:border-ink",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  ghost: "text-ink hover:bg-fog",
};

type Common = { variant?: Variant; size?: "sm" | "md" | "lg"; className?: string; children: ReactNode; magnetic?: boolean };
const sizes = { sm: "h-8 px-4 text-[13px]", md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-[15px]" };

export function Button({ variant = "blue", size = "md", className, children, magnetic, ...rest }: Common & ComponentProps<"button">) {
  const btn = (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.97] disabled:opacity-50",
        variants[variant], sizes[size], className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn;
}

export function ButtonLink({ href, variant = "blue", size = "md", className, children, magnetic, ...rest }: Common & { href: string } & Omit<ComponentProps<typeof Link>, "href">) {
  const link = (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.97]",
        variants[variant], sizes[size], className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

/**
 * Reference-style pill: dark surface, white label, blue circular arrow at the end.
 * Hover: blue circle expands to fill the pill, arrow shifts diagonally.
 */
export function ArrowPill({
  href, children, tone = "dark", className, ...rest
}: { href: string; children: ReactNode; tone?: "dark" | "light" | "blue"; className?: string } & Omit<ComponentProps<typeof Link>, "href">) {
  const surface =
    tone === "dark" ? "bg-ink text-white" : tone === "blue" ? "bg-electric text-white" : "bg-white text-ink";
  const circle = tone === "blue" ? "bg-white text-electric" : "bg-electric text-white";
  return (
    <Magnetic>
      <Link
        href={href}
        className={cn(
          "group/pill relative isolate inline-flex h-12 items-center gap-3 overflow-hidden rounded-full pl-5 pr-1.5 text-sm font-medium transition-transform duration-300 active:scale-[0.97]",
          surface, className,
        )}
        {...rest}
      >
        <span
          aria-hidden
          className={cn(
            "absolute right-1.5 top-1/2 -z-10 h-9 w-9 -translate-y-1/2 rounded-full transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/pill:w-[calc(100%-12px)]",
            circle.split(" ")[0],
          )}
        />
        <span className={cn("transition-colors duration-300", tone === "light" && "group-hover/pill:text-white", tone === "blue" && "group-hover/pill:text-electric")}>{children}</span>
        <span className={cn("relative grid h-9 w-9 place-items-center overflow-hidden rounded-full", circle.split(" ")[1])}>
          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/pill:translate-x-6 group-hover/pill:-translate-y-6 group-hover/pill:-rotate-45" />
          <ArrowRight className="absolute h-4 w-4 -translate-x-6 translate-y-6 -rotate-45 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/pill:translate-x-0 group-hover/pill:translate-y-0 group-hover/pill:rotate-0" />
        </span>
      </Link>
    </Magnetic>
  );
}

export function ArrowLink({ href, children, className, tone = "dark" }: { href: string; children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-medium",
        tone === "dark" ? "text-ink" : "text-white",
        className,
      )}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-out-expo)] group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </Link>
  );
}
