"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { passwordStrength, validateAuth } from "@/lib/validation";
import { saveSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import { Field, Input } from "./Field";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const strength = passwordStrength(pw);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = validateAuth({ email: fd.get("email"), password: fd.get("password"), name: fd.get("name"), company: fd.get("company") }, mode);
    setErrors(res.errors);
    if (!res.ok) {
      document.getElementById(`a-${Object.keys(res.errors)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    // Demo only: no credentials leave the browser and the password is discarded.
    const name = mode === "signup" ? res.value.name : res.value.email.split("@")[0].replace(/[._-]/g, " ");
    saveSession({ name: name.replace(/\b\w/g, (c) => c.toUpperCase()), email: res.value.email, company: res.value.company || "Grocery Store" });
    window.setTimeout(() => router.push("/dashboard"), 600);
  };

  return (
    <>
      <h1 className="text-[clamp(2rem,3vw,2.6rem)] font-medium tracking-[-0.03em]">{mode === "login" ? "Welcome back." : "Create your account."}</h1>
      <p className="mt-2 text-[15px] text-muted">
        {mode === "login" ? "Log in to the demo merchant dashboard." : "Start exploring Yapay with demonstration data."}
      </p>
      <form onSubmit={submit} noValidate className="mt-8 space-y-5">
        {mode === "signup" && (
          <>
            <Field label="Full name" id="a-name" error={errors.name}><Input id="a-name" name="name" autoComplete="name" error={errors.name} /></Field>
            <Field label="Business name" id="a-company" error={errors.company}><Input id="a-company" name="company" autoComplete="organization" error={errors.company} /></Field>
          </>
        )}
        <Field label="Email" id="a-email" error={errors.email}><Input id="a-email" name="email" type="email" autoComplete="email" error={errors.email} /></Field>
        <Field label="Password" id="a-password" error={errors.password} hint={mode === "signup" ? "At least 10 characters with a letter and a number." : undefined}>
          <div className="relative">
            <Input id="a-password" name="password" type={show ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} value={pw} onChange={(e) => setPw(e.target.value)} error={errors.password} className="pr-12" />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-ink">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {mode === "signup" && pw && (
            <div className="mt-2 flex gap-1" aria-label={`Password strength ${strength} of 4`}>
              {[1, 2, 3, 4].map((n) => <span key={n} className={cn("h-1 flex-1 rounded-full", n <= strength ? (strength < 2 ? "bg-danger" : strength < 3 ? "bg-warning" : "bg-success") : "bg-fog")} />)}
            </div>
          )}
        </Field>
        {mode === "login" && (
          <div className="flex items-center justify-between text-[13px]">
            <label className="flex items-center gap-2 text-muted"><input type="checkbox" className="h-4 w-4 accent-[#0866F9]" /> Remember me</label>
            <span className="text-muted">Password reset is unavailable in the demo</span>
          </div>
        )}
        <button type="submit" disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-electric text-[15px] font-medium text-white transition-colors hover:bg-bright disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "login" ? "Log in" : "Create demo account"}
        </button>
      </form>
      <p className="mt-6 text-[14px] text-muted">
        {mode === "login" ? "New to Yapay? " : "Already have an account? "}
        <Link href={mode === "login" ? "/signup" : "/login"} className="font-medium text-ink underline underline-offset-4">{mode === "login" ? "Create an account" : "Log in"}</Link>
      </p>
    </>
  );
}
