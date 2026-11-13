/** Illustrative API samples — Yapay is a concept; these endpoints are not live. */
export const requestSamples = {
  curl: `# Create a payment (illustrative)
curl https://api.yapay.example/v1/payments \\
  -u "$YAPAY_SECRET_KEY:" \\
  -H "Idempotency-Key: order_1842" \\
  -d amount=3617 \\
  -d currency=usd \\
  -d "payment_method_types[]=card" \\
  -d description="Grocery Store"`,
  node: `// Create a payment (illustrative)
import Yapay from "@yapay/node";

const yapay = new Yapay(process.env.YAPAY_SECRET_KEY);

const payment = await yapay.payments.create(
  {
    amount: 3617,
    currency: "usd",
    payment_method_types: ["card"],
    description: "Grocery Store",
  },
  { idempotencyKey: "order_1842" },
);`,
  python: `# Create a payment (illustrative)
import os
import yapay

client = yapay.Client(os.environ["YAPAY_SECRET_KEY"])

payment = client.payments.create(
    amount=3617,
    currency="usd",
    payment_method_types=["card"],
    description="Grocery Store",
    idempotency_key="order_1842",
)`,
} as const;

export const responseSample = `{
  "id": "pay_3NkX8vQ2",
  "object": "payment",
  "amount": 3617,
  "currency": "usd",
  "status": "requires_confirmation",
  "description": "Grocery Store",
  "livemode": false,
  "created": 1794873600
}`;

export const webhookSample = `// Verify and handle a webhook (illustrative)
export async function POST(req: Request) {
  const body = await req.text();
  const event = yapay.webhooks.verify(
    body,
    req.headers.get("yapay-signature"),
    process.env.YAPAY_WEBHOOK_SECRET,
  );

  if (event.type === "payment.succeeded") {
    await fulfilOrder(event.data.id); // idempotent
  }
  return new Response(null, { status: 200 });
}`;

export type Lang = keyof typeof requestSamples;
