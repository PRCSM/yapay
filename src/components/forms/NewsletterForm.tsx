"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  return (
    <form
      className="mt-8"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setState("error");
        setState("done");
      }}
    >
      <label htmlFor="newsletter" className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">Product updates</label>
      <div className="mt-3 flex h-12 items-center rounded-full border border-white/15 bg-white/[0.04] pl-5 pr-1.5 focus-within:border-white/40">
        <input
          id="newsletter"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
          placeholder="you@company.com"
          aria-invalid={state === "error"}
          aria-describedby="newsletter-msg"
          className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
        />
        <button type="submit" aria-label="Subscribe" className="grid h-9 w-9 place-items-center rounded-full bg-electric text-white transition-colors hover:bg-bright">
          {state === "done" ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      <p id="newsletter-msg" role="status" className="mt-2 min-h-5 text-[12px] text-white/50">
        {state === "error" && "Enter a valid email address."}
        {state === "done" && "Thanks — you're on the list (demo, nothing was sent)."}
      </p>
    </form>
  );
}
