import type { Metadata } from "next";
import { DemoBadge } from "@/components/ui/Section";
import { CodeBlock } from "@/components/ui/Code";
import { DocsNav } from "@/components/pages/DocsNav";
import { requestSamples, responseSample, webhookSample } from "@/lib/data/code";

export const metadata: Metadata = { title: "API documentation", description: "Illustrative API reference for the Yapay concept platform." };

const sections = [
  { id: "quickstart", title: "Quickstart" },
  { id: "authentication", title: "Authentication" },
  { id: "payments", title: "Payments" },
  { id: "refunds", title: "Refunds" },
  { id: "webhooks", title: "Webhooks" },
  { id: "errors", title: "Errors" },
];

const errors = [
  ["400", "invalid_request", "A required parameter is missing or malformed."],
  ["401", "authentication_failed", "The API key is missing, invalid or revoked."],
  ["402", "payment_declined", "The payment method was declined."],
  ["409", "idempotency_conflict", "The idempotency key was reused with different parameters."],
  ["429", "rate_limited", "Too many requests — retry with exponential backoff."],
];

export default function DocsPage() {
  return (
    <section className="bg-paper pb-24 pt-36 md:pt-40">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-0 h-28 bg-charcoal" />
      <div className="container-site grid gap-12 lg:grid-cols-[220px_1fr]">
        <DocsNav sections={sections} />
        <article className="min-w-0 max-w-[780px]">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-h2">API reference</h1>
            <DemoBadge>Illustrative — endpoints are not live</DemoBadge>
          </div>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            The Yapay API is organised around REST. It accepts form-encoded or JSON bodies, returns JSON, and uses standard HTTP status codes. This documentation demonstrates the intended developer experience for this concept platform.
          </p>

          <Doc id="quickstart" title="Quickstart">
            <ol className="list-decimal space-y-2 pl-5 text-[15px] text-muted">
              <li>Create an account and copy your <strong className="text-ink">test</strong> secret key from the dashboard.</li>
              <li>Store it as an environment variable on your server — never in client-side code.</li>
              <li>Create a payment from your server, then confirm it with hosted payment fields.</li>
              <li>Listen for <code className="rounded bg-fog px-1.5 py-0.5 font-mono text-[13px] text-ink">payment.succeeded</code> to fulfil the order.</li>
            </ol>
          </Doc>
          <Doc id="authentication" title="Authentication">
            <p>Authenticate with your secret key using HTTP Basic auth (key as username, empty password) or a Bearer token. Test keys begin with <code className="font-mono text-ink">sk_test_</code>, live keys with <code className="font-mono text-ink">sk_live_</code>. Rotate keys from the dashboard at any time.</p>
          </Doc>
          <Doc id="payments" title="Create a payment">
            <p className="mb-4"><code className="rounded bg-fog px-1.5 py-0.5 font-mono text-[13px] text-ink">POST /v1/payments</code> — amounts are in the smallest currency unit (cents). Pass an <code className="font-mono text-ink">Idempotency-Key</code> header to safely retry.</p>
            <div className="space-y-4">
              <CodeBlock title="Request · cURL" code={requestSamples.curl} />
              <CodeBlock title="Request · Node.js" code={requestSamples.node} />
              <CodeBlock title="Response" code={responseSample} />
            </div>
          </Doc>
          <Doc id="refunds" title="Refunds">
            <p>Refund all or part of a succeeded payment with <code className="rounded bg-fog px-1.5 py-0.5 font-mono text-[13px] text-ink">POST /v1/refunds</code>, passing <code className="font-mono text-ink">payment</code> and an optional <code className="font-mono text-ink">amount</code>. Multiple partial refunds are allowed up to the original amount.</p>
          </Doc>
          <Doc id="webhooks" title="Webhooks">
            <p className="mb-4">Events are delivered as signed POST requests and retried with exponential backoff for up to three days until your endpoint returns a 2xx.</p>
            <CodeBlock title="Verify a webhook" code={webhookSample} />
          </Doc>
          <Doc id="errors" title="Errors">
            <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
              <table className="w-full min-w-[520px] text-left text-[14px]">
                <thead className="bg-mist text-[12px] text-muted"><tr><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Code</th><th className="px-4 py-3 font-medium">Meaning</th></tr></thead>
                <tbody>{errors.map(([s, c, m]) => <tr key={c} className="border-t border-line"><td className="px-4 py-3 font-mono">{s}</td><td className="px-4 py-3 font-mono text-electric">{c}</td><td className="px-4 py-3 text-muted">{m}</td></tr>)}</tbody>
              </table>
            </div>
          </Doc>
        </article>
      </div>
    </section>
  );
}

function Doc({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} data-doc-section className="scroll-mt-28 border-t border-line pt-10 mt-12 text-[15px] leading-relaxed text-muted">
      <h2 className="mb-4 text-[24px] font-medium tracking-[-0.02em] text-ink">{title}</h2>
      {children}
    </section>
  );
}
