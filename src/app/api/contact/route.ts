import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";

/**
 * Contact / sales enquiries. Validates server-side and returns field errors.
 * Nothing is persisted in this demo. To deliver enquiries, forward `value` to a CRM or
 * email provider here using a server-only secret (never expose it to the client).
 */
const hits = new Map<string, { n: number; t: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now - h.t < 60_000 && h.n >= 5) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }
  hits.set(ip, h && now - h.t < 60_000 ? { n: h.n + 1, t: h.t } : { n: 1, t: now });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  // Honeypot: bots fill hidden fields.
  if ((body as Record<string, unknown>).website) return NextResponse.json({ ok: true, reference: "ok" });

  const { ok, errors } = validateContact(body as Record<string, unknown>);
  if (!ok) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const reference = `YP-${now.toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, reference });
}
