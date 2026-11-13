"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Field, Input, Select } from "./Field";

export function PartnerForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    const errs: Record<string, string> = {};
    if (String(payload.company ?? "").trim().length < 2) errs.company = "Enter your company name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(payload.email ?? ""))) errs.email = "Enter a valid email.";
    if (!payload.type) errs.type = "Choose a partner type.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/partners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setErrors(data.errors ?? {}); setStatus("error"); return; }
      setStatus("done");
    } catch { setStatus("error"); }
  };

  if (status === "done") return (
    <div role="status" className="rounded-[24px] bg-white p-10 text-center ring-1 ring-line">
      <CheckCircle2 className="mx-auto h-10 w-10 text-electric" />
      <p className="mt-4 text-[18px] font-medium">Application received (demo)</p>
      <p className="mt-1 text-[14px] text-muted">Validated on the server — nothing was stored.</p>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-[24px] bg-white p-6 ring-1 ring-line sm:p-8">
      <Field label="Company" id="p-company" error={errors.company}><Input id="p-company" name="company" autoComplete="organization" error={errors.company} /></Field>
      <Field label="Work email" id="p-email" error={errors.email}><Input id="p-email" name="email" type="email" autoComplete="email" error={errors.email} /></Field>
      <Field label="Website (optional)" id="p-site" error={errors.site}><Input id="p-site" name="site" type="url" placeholder="https://" error={errors.site} /></Field>
      <Field label="Partner type" id="p-type" error={errors.type}>
        <Select id="p-type" name="type" defaultValue="" error={errors.type}>
          <option value="" disabled>Select…</option>
          <option value="agency">Agency</option>
          <option value="platform">Software platform</option>
          <option value="referral">Referral partner</option>
          <option value="financial">Financial partner</option>
        </Select>
      </Field>
      <button type="submit" disabled={status === "sending"} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-electric text-[14px] font-medium text-white hover:bg-bright disabled:opacity-60">
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Apply to partner
      </button>
      {status === "error" && <p role="alert" className="text-[13px] text-danger">Please check the highlighted fields and try again.</p>}
    </form>
  );
}
