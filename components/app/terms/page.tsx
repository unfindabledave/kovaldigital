import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Koval",
  description: "Terms of service, purchases, and refunds for Koval.",
  openGraph: {
    title: "Terms of Service | Koval",
    description: "Terms of service, purchases, and refunds for Koval.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-6 py-16 pb-24 text-[var(--foreground)] lg:px-10">
      <p className="text-sm text-[var(--muted-foreground)]">
        <Link href="/" className="text-[var(--accent-secondary)] transition hover:text-white">
          ← Back to home
        </Link>
      </p>
      <h1 className="mt-8 font-sans text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: April 24, 2026</p>

      <div className="mt-10 space-y-8 text-slate-300">
        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">Agreement</h2>
          <p className="mt-3 leading-7">
            By purchasing, accessing, or using Koval&apos;s programs, content, or community
            (collectively, the &quot;Services&quot;), you agree to these Terms. If you do not agree, do not
            purchase or use the Services.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">
            Purchases &amp; payment
          </h2>
          <p className="mt-3 leading-7">
            Prices and offerings are as shown at checkout (including on our third-party
            sales platform, where applicable). You authorize us and our payment partners to
            charge your chosen payment method for the full amount at the time of purchase.
            You are responsible for providing accurate billing information.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">
            All sales are final; no refunds
          </h2>
          <p className="mt-3 leading-7">
            <strong className="text-slate-200">All purchases are final.</strong> Except where
            required by applicable law, we do not offer refunds, returns, or exchanges for
            digital products, memberships, subscriptions, or one-time fees—whether or not
            you have accessed or completed the content. Chargebacks or payment disputes
            may result in loss of access to the Services. If you believe a charge is
            incorrect, contact us first so we can review it in good faith.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">Access</h2>
          <p className="mt-3 leading-7">
            Access to digital materials and community areas is provided as described at the
            time of purchase and may be time-limited or subject to program rules. You may
            not resell, share, or redistribute access outside what we expressly allow.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">
            No guaranteed results
          </h2>
          <p className="mt-3 leading-7">
            We share education and systems for building online businesses. Outcomes depend on
            your effort, market conditions, and many factors outside our control. We do not
            guarantee income, revenue, or specific results.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">
            Contact
          </h2>
          <p className="mt-3 leading-7">
            Questions about these Terms? Use the{" "}
            <Link
              href="/#contact"
              className="text-[var(--accent-secondary)] underline-offset-2 hover:text-white hover:underline"
            >
              contact
            </Link>{" "}
            options on the site. Our{" "}
            <Link
              href="/privacy"
              className="text-[var(--accent-secondary)] underline-offset-2 hover:text-white hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            also describes how we handle personal data.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">Changes</h2>
          <p className="mt-3 leading-7">
            We may update these Terms. The &quot;Last updated&quot; date will change when we do. Your
            continued use of the Services after changes take effect means you accept the
            updated Terms.
          </p>
        </section>
      </div>
    </main>
  );
}
