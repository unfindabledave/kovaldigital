import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Koval",
  description: "How Koval collects, uses, and protects your information.",
  openGraph: {
    title: "Privacy Policy | Koval",
    description: "How Koval collects, uses, and protects your information.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-6 py-16 pb-24 text-[var(--foreground)] lg:px-10">
      <p className="text-sm text-[var(--muted-foreground)]">
        <Link href="/" className="text-[var(--accent-secondary)] transition hover:text-white">
          ← Back to home
        </Link>
      </p>
      <h1 className="mt-8 font-sans text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: April 24, 2026</p>

      <div className="mt-10 space-y-8 text-slate-300">
        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">Overview</h2>
          <p className="mt-3 leading-7">
            Koval (&quot;we&quot;, &quot;us&quot;) runs this website to share information about our programs and to
            let you contact us. This policy explains what we collect, why we collect it, and the
            choices you have. If you do not agree with this policy, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">
            Information we collect
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-7 marker:text-[var(--accent-secondary)]">
            <li>
              <span className="font-medium text-slate-200">Contact form.</span> When you use the
              contact form, we process the name, email, subject, and message you send. This is used
              only to respond to you.
            </li>
            <li>
              <span className="font-medium text-slate-200">Usage data.</span> We may log basic
              technical data (e.g. page views, referrers, approximate region) to understand how the
              site is used and to improve it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">
            How we use information
          </h2>
          <p className="mt-3 leading-7">We use the information above to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 leading-7 marker:text-[var(--accent-secondary)]">
            <li>Reply to inquiries sent through the contact form;</li>
            <li>Operate, secure, and improve the website;</li>
            <li>Comply with legal obligations where required.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">
            Third-party services
          </h2>
          <p className="mt-3 leading-7">
            Form submissions may be delivered through a third-party form provider (for example, to
            route email to our inbox). Those providers act on our instructions and have their own
            privacy terms. We encourage you to review their policies if you use the contact form.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">
            Cookies and similar technologies
          </h2>
          <p className="mt-3 leading-7">
            The site may use cookies or local storage for essential functionality (for example,
            security or preferences). We do not use third-party advertising cookies for sale of
            your data on this page unless we update this policy and your controls accordingly.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">Retention</h2>
          <p className="mt-3 leading-7">
            We keep contact messages and related logs only as long as needed to handle your
            request, for legitimate business operations, or as required by law.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">Your rights</h2>
          <p className="mt-3 leading-7">
            Depending on where you live, you may have the right to access, correct, or delete
            personal information we hold, or to object to certain processing. To exercise these
            rights, contact us using the information below.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">Contact</h2>
          <p className="mt-3 leading-7">
            For questions about this policy, email us at the address shown on the{" "}
            <Link href="/#contact" className="text-[var(--accent-secondary)] underline-offset-2 hover:text-white hover:underline">
              contact section
            </Link>{" "}
            of the site, or use the contact form. For purchases, refunds, and use of our programs,
            see our{" "}
            <Link
              href="/terms"
              className="text-[var(--accent-secondary)] underline-offset-2 hover:text-white hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em] text-white">Changes</h2>
          <p className="mt-3 leading-7">
            We may update this policy from time to time. The &quot;Last updated&quot; date at the top will
            change when we do. Continued use of the site after changes means you accept the updated
            policy.
          </p>
        </section>
      </div>
    </main>
  );
}
