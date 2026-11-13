/** Shared validation used by client forms AND the server route handlers. */
export type ContactInput = { name: string; email: string; company: string; topic: string; volume: string; message: string; consent: boolean };
export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const TOPICS = ["sales", "enterprise", "partnerships", "support", "press"] as const;
export const VOLUMES = ["< $10k / month", "$10k – $100k / month", "$100k – $1M / month", "> $1M / month"] as const;

export function validateContact(raw: Partial<Record<keyof ContactInput, unknown>>) {
  const v: ContactInput = {
    name: String(raw.name ?? "").trim().slice(0, 120),
    email: String(raw.email ?? "").trim().slice(0, 200),
    company: String(raw.company ?? "").trim().slice(0, 160),
    topic: String(raw.topic ?? "sales"),
    volume: String(raw.volume ?? ""),
    message: String(raw.message ?? "").trim().slice(0, 4000),
    consent: raw.consent === true || raw.consent === "true" || raw.consent === "on",
  };
  const e: FieldErrors<ContactInput> = {};
  if (v.name.length < 2) e.name = "Please enter your full name.";
  if (!EMAIL.test(v.email)) e.email = "Enter a valid work email address.";
  if (v.company.length < 2) e.company = "Tell us your company name.";
  if (!(TOPICS as readonly string[]).includes(v.topic)) e.topic = "Choose a topic.";
  if (v.volume && !(VOLUMES as readonly string[]).includes(v.volume)) e.volume = "Choose a volume range.";
  if (v.message.length < 10) e.message = "A sentence or two helps us route your request (min 10 characters).";
  if (!v.consent) e.consent = "Please agree to be contacted about your enquiry.";
  return { value: v, errors: e, ok: Object.keys(e).length === 0 };
}

export function validateAuth(raw: { email?: unknown; password?: unknown; name?: unknown; company?: unknown }, mode: "login" | "signup") {
  const email = String(raw.email ?? "").trim();
  const password = String(raw.password ?? "");
  const name = String(raw.name ?? "").trim();
  const company = String(raw.company ?? "").trim();
  const e: Record<string, string> = {};
  if (!EMAIL.test(email)) e.email = "Enter a valid email address.";
  if (mode === "signup") {
    if (name.length < 2) e.name = "Enter your name.";
    if (company.length < 2) e.company = "Enter your business name.";
    if (password.length < 10) e.password = "Use at least 10 characters.";
    else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) e.password = "Include at least one letter and one number.";
  } else if (!password) e.password = "Enter your password.";
  return { ok: Object.keys(e).length === 0, errors: e, value: { email, name, company } };
}

export function passwordStrength(p: string) {
  let s = 0;
  if (p.length >= 10) s++;
  if (p.length >= 14) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return Math.min(4, s);
}
