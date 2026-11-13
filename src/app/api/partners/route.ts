import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TYPES = ["agency", "platform", "referral", "financial"];

/** Partner applications — validated server-side, not persisted in this demo. */
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 }); }
  const errors: Record<string, string> = {};
  const company = String(b.company ?? "").trim();
  const email = String(b.email ?? "").trim();
  const website = String(b.site ?? "").trim();
  if (company.length < 2) errors.company = "Enter your company name.";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email.";
  if (!TYPES.includes(String(b.type))) errors.type = "Choose a partner type.";
  if (website && !/^https?:\/\/[^\s.]+\.[^\s]{2,}$/.test(website)) errors.site = "Enter a full URL, e.g. https://example.com";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });
  return NextResponse.json({ ok: true });
}
