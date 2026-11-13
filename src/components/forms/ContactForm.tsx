"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { TOPICS, VOLUMES, validateContact, type ContactInput, type FieldErrors } from "@/lib/validation";
import { Field, Input, Select, Textarea } from "./Field";

export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = (TOPICS as readonly string[]).includes(params.get("topic") ?? "") ? params.get("topic")! : "sales";
  const [errors, setErrors] = useState<FieldErrors<ContactInput>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [ref, setRef] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    payload.consent = fd.get("consent") === "on";
    const check = validateContact(payload);
    setErrors(check.errors);
    if (!check.ok) {
      const first = Object.keys(check.errors)[0];
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setMessage(data.error ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }
      setRef(data.reference);
      setStatus("done");
    } catch {
      setMessage("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div role="status" className="rounded-[24px] bg-white p-10 text-center ring-1 ring-line">
        <CheckCircle2 className="mx-auto h-12 w-12 text-electric" />
        <h2 className="mt-5 text-[24px] font-medium">Thanks — we've got it.</h2>
        <p className="mt-2 text-[15px] text-muted">Reference <span className="font-mono text-ink">{ref}</span>. This demo validates your enquiry on the server but does not store or forward it.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 rounded-full border border-line px-5 py-2.5 text-[14px] hover:border-ink">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[24px] bg-white p-6 ring-1 ring-line sm:grid-cols-2 sm:p-8">
      <Field label="Full name" id="c-name" error={errors.name}><Input id="c-name" name="name" autoComplete="name" error={errors.name} /></Field>
      <Field label="Work email" id="c-email" error={errors.email}><Input id="c-email" name="email" type="email" autoComplete="email" error={errors.email} /></Field>
      <Field label="Company" id="c-company" error={errors.company}><Input id="c-company" name="company" autoComplete="organization" error={errors.company} /></Field>
      <Field label="Topic" id="c-topic" error={errors.topic}>
        <Select id="c-topic" name="topic" defaultValue={initialTopic} error={errors.topic}>
          <option value="sales">Sales</option>
          <option value="enterprise">Enterprise pricing</option>
          <option value="partnerships">Partnerships</option>
          <option value="support">Support</option>
          <option value="press">Press</option>
        </Select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Monthly payment volume (optional)" id="c-volume" error={errors.volume}>
          <Select id="c-volume" name="volume" defaultValue="" error={errors.volume}>
            <option value="">Prefer not to say</option>
            {VOLUMES.map((v) => <option key={v} value={v}>{v}</option>)}
          </Select>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="How can we help?" id="c-message" error={errors.message}><Textarea id="c-message" name="message" error={errors.message} /></Field>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-[13px] text-muted">
          <input id="c-consent" type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "c-consent-error" : undefined} className="mt-0.5 h-4 w-4 accent-[#0866F9]" />
          I agree to be contacted about this enquiry. Please don't include card numbers or other sensitive financial data.
        </label>
        {errors.consent && <p id="c-consent-error" className="mt-1.5 text-[12px] text-danger">{errors.consent}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="inline-flex h-12 items-center gap-2 rounded-full bg-electric px-7 text-[14px] font-medium text-white transition-colors hover:bg-bright disabled:opacity-60">
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Send enquiry
        </button>
        <p role="alert" className="text-[13px] text-danger">{status === "error" ? message : ""}</p>
      </div>
    </form>
  );
}
