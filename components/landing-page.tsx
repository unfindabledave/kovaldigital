"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  ChartBarSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  CodeBracketSquareIcon,
  CommandLineIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, GradientStrokeCard } from "@/components/ui/card";
import { SectionBadge } from "@/components/ui/section-badge";

const whopLink = "https://whop.com/kovaldigital/joinpaid/";
const web3formsEndpoint = "https://api.web3forms.com/submit";
const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

const learningItems = [
  {
    title: "SaaS Development",
    points: ["Build and launch apps", "Monetization strategies"],
    explanation:
      "You learn how to go from idea to shipping product quickly: validation, scoped MVP builds, launch mechanics, and practical pricing loops that turn code into recurring revenue.",
    Icon: CodeBracketSquareIcon,
  },
  {
    title: "eCommerce",
    points: ["Store creation", "Product sourcing and scaling"],
    explanation:
      "You get a full store execution framework, including offer setup, product sourcing workflow, conversion optimization, and scaling systems for profitable repeat sales.",
    Icon: ShoppingBagIcon,
  },
  {
    title: "Social Media Growth",
    points: ["Audience building systems", "Content frameworks"],
    explanation:
      "You learn repeatable audience growth systems: positioning, content structure, distribution cadence, and monetization mapping from attention to customers.",
    Icon: UserGroupIcon,
  },
  {
    title: "Monetization",
    points: ["Revenue engine design", "Conversion systems"],
    explanation:
      "You build monetization architecture that matches your model, including offer ladders, checkout flow optimization, upsells, and retention mechanics.",
    Icon: ChartBarSquareIcon,
  },
  {
    title: "Digital Products",
    points: ["Courses, communities, subscriptions", "Offer architecture"],
    explanation:
      "You design and launch digital products with structure: promise definition, curriculum or value stack, delivery system, and subscription-ready packaging.",
    Icon: CubeTransparentIcon,
  },
  {
    title: "Brand Building",
    points: ["Positioning and authority", "Premium digital identity"],
    explanation:
      "You craft a brand people trust: market position, visual authority, message clarity, and consistency that increases perceived value and conversion.",
    Icon: BriefcaseIcon,
  },
];

const testimonials = [
  {
    quote:
      "I stopped bouncing between random tutorials and finally built a real product with paying customers.",
    author: "Noah V.",
    role: "Founder, B2B micro SaaS",
  },
  {
    quote:
      "The systems are actionable. I launched an eCommerce offer in weeks and scaled with clear playbooks.",
    author: "Mia R.",
    role: "eCommerce operator",
  },
  {
    quote:
      "Koval gave me structure. I now run content, product, and monetization as one connected business.",
    author: "Arden K.",
    role: "Creator and digital entrepreneur",
  },
];

const metricItems = [
  { label: "Members", value: 645, suffix: "+" },
  { label: "Businesses Started", value: 53, suffix: "+" },
  { label: "Revenue Generated", value: 750000, prefix: "$", suffix: "" },
];

const workflowItems = [
  {
    id: "01",
    title: "Join Koval",
    detail:
      "Enter one ecosystem that unifies product building, growth channels, and monetization under one execution system.",
    Icon: CommandLineIcon,
  },
  {
    id: "02",
    title: "Choose your build path",
    detail:
      "Select SaaS, eCommerce, social-led business, or hybrid models based on your current skill and available capital.",
    Icon: GlobeAltIcon,
  },
  {
    id: "03",
    title: "Execute and scale",
    detail:
      "Launch faster with battle-tested frameworks, clear checklists, and systems engineered for compounding online income.",
    Icon: RocketLaunchIcon,
  },
];

const businessEras = [
  {
    era: "2010 – 2014",
    model: "Traditional E-commerce",
    characteristics:
      "Massive growth of marketplaces (Amazon/eBay); the rise of early Shopify stores focused on physical inventory.",
  },
  {
    era: "2015 – 2018",
    model: "Dropshipping & Affiliate",
    characteristics:
      "High volume, low-margin arbitrage; focus on Facebook/Instagram ads to move third-party goods without holding stock.",
  },
  {
    era: "2019 – 2021",
    model: "The Creator Economy",
    characteristics:
      "Transition from “Influencers” to “Business Owners.” Monetization via Patreon, Substack, and digital products (courses/PDFs).",
  },
  {
    era: "2022 – 2024",
    model: "SaaS & Micro-SaaS",
    characteristics:
      "Subscription-based software. Solopreneurs building niche tools (Chrome extensions, Notion templates, specific B2B utilities).",
  },
  {
    era: "2025 – 2026",
    model: "AI-Native & Service-as-Software",
    characteristics:
      "Using LLMs to provide automated agency services (AI SEO, AI Customer Support) and hyper-personalized niche communities.",
  },
] as const;

const floatingParticles = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 13) % 100}%`,
  top: `${(index * 17) % 92}%`,
  duration: 9 + (index % 6),
  delay: (index % 7) * 0.3,
}));

function sendAnalytics(eventName: string, meta?: Record<string, unknown>) {
  const payload = {
    eventName,
    path: typeof window !== "undefined" ? window.location.pathname : "/",
    meta,
  };

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    navigator.sendBeacon("/api/analytics", blob);
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function StatCounter({
  value,
  label,
  prefix = "",
  suffix = "",
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const ref = (element: HTMLDivElement | null) => {
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
  };

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 24, stiffness: 90 });
  const rounded = useTransform(springValue, (latest) =>
    Math.max(0, Math.floor(latest)).toLocaleString(),
  );
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (hasStarted) {
      motionValue.set(value);
    }
  }, [hasStarted, motionValue, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
      <p className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">{label}</p>
    </div>
  );
}

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    sendAnalytics("page_view", { source: "landing_page" });
  }, []);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    if (!web3formsAccessKey) {
      setStatusError(true);
      setStatusMessage("Contact form is not configured yet. Please set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");
    setStatusError(false);

    try {
      const response = await fetch(web3formsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name,
          email,
          message,
          subject: "New message from koval.digital",
        }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Could not send your message.");
      }

      event.currentTarget.reset();
      setStatusMessage("Message sent. The Koval team will reply shortly.");
      sendAnalytics("contact_submitted");
    } catch (error) {
      setStatusError(true);
      setStatusMessage(
        error instanceof Error ? error.message : "Unexpected error while sending message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCardFlip = (title: string) => {
    setFlippedCards((current) => ({ ...current, [title]: !current[title] }));
  };

  return (
    <main className="relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
        style={{ scaleX: progressScale }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          aria-hidden="true"
          className="absolute -left-32 top-20 h-[25rem] w-[25rem] rounded-full bg-[color:rgb(47_107_255_/_0.22)] blur-[130px]"
          animate={
            reduceMotion
              ? { x: 0, y: 0, opacity: 0.55, scale: 1 }
              : { x: [0, 42, 0], y: [0, -28, 0], opacity: [0.4, 0.72, 0.4], scale: [1, 1.04, 1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 22, repeat: Infinity, ease: [0.42, 0, 0.58, 1], repeatType: "mirror" }
          }
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-0 top-28 h-[22rem] w-[22rem] rounded-full bg-[color:rgb(99_179_255_/_0.18)] blur-[140px]"
          animate={
            reduceMotion
              ? { x: 0, y: 0, opacity: 0.48, scale: 1 }
              : { x: [0, -36, 0], y: [0, 24, 0], opacity: [0.28, 0.58, 0.28], scale: [1, 1.05, 1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 26, repeat: Infinity, ease: [0.42, 0, 0.58, 1], repeatType: "mirror" }
          }
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-1/3 h-[18rem] w-[20rem] -translate-x-1/2 rounded-full bg-[color:rgb(30_64_150_/_0.15)] blur-[120px]"
          animate={
            reduceMotion
              ? { opacity: 0.35, y: 0, scale: 1 }
              : { y: [0, -18, 0], opacity: [0.22, 0.38, 0.22], scale: [1, 1.08, 1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 20, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatType: "mirror" }
          }
        />
        <div
          aria-hidden="true"
          className="koval-grid-drift absolute inset-0 bg-[linear-gradient(rgba(102,140,228,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(102,140,228,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_20%,black,transparent_75%)]"
        />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 lg:px-10 lg:pt-14">
        <header className="mb-16 flex items-center justify-between rounded-full border border-[color:rgb(99_179_255_/_0.25)] bg-[color:rgb(9_16_32_/_0.72)] px-4 py-3 shadow-[0_14px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6">
          <p className="text-lg font-semibold tracking-wide text-white sm:text-xl">Koval</p>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
            <a href="#learn" className="transition hover:text-white">
              Learn
            </a>
            <a href="#workflow" className="transition hover:text-white">
              Workflow
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
          </nav>
          <a href={whopLink} target="_blank" rel="noreferrer">
            <Button
              size="sm"
              onClick={() => sendAnalytics("cta_click", { location: "top_nav_join" })}
            >
              Join
            </Button>
          </a>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionBadge label="Built for Real Execution since 2019" />
            <h1 className="mt-8 text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-[var(--foreground)] sm:text-6xl lg:text-[5rem]">
              Build Real
              <br />
              Online <span className="gradient-text">Income</span>
            </h1>
            <div className="mt-4 h-1.5 w-40 rounded-full bg-gradient-to-r from-[var(--accent)]/40 to-[var(--accent-secondary)]/20" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Learn the exact systems behind SaaS, eCommerce, social media growth, and digital
              businesses. One ecosystem. Multiple income models. Execution-focused from day one.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={whopLink} target="_blank" rel="noreferrer">
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => sendAnalytics("cta_click", { location: "hero_primary" })}
                >
                  Join Koval
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href={whopLink} target="_blank" rel="noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => sendAnalytics("cta_click", { location: "hero_secondary" })}
                >
                  Start Building Now
                </Button>
              </a>
            </div>
            <motion.a
              href="#learn"
              className="mt-10 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll to explore
              <ChevronDownIcon className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div
            className="relative hidden min-h-[27rem] overflow-hidden rounded-[2rem] border border-[color:rgb(99_179_255_/_0.25)] bg-[linear-gradient(180deg,rgba(13,21,42,0.95),rgba(10,17,34,0.92))] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.52)] lg:block"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,107,255,0.22),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(99,179,255,0.15),transparent_35%)]"
            />
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={`star-${i}`}
                aria-hidden="true"
                className="absolute block rounded-full bg-blue-100/80"
                style={{
                  left: `${8 + ((i * 19) % 82)}%`,
                  top: `${6 + ((i * 23) % 84)}%`,
                  width: i % 3 === 0 ? "2px" : "1.5px",
                  height: i % 3 === 0 ? "2px" : "1.5px",
                }}
                animate={{ opacity: [0.15, 0.95, 0.15], scale: [1, 1.4, 1] }}
                transition={{
                  duration: 2.4 + (i % 5) * 0.5,
                  delay: (i % 6) * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-6 h-20 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0))] blur-xl"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[62%] h-10 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,20,44,0.75),transparent_70%)] blur-md"
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[color:rgb(99_179_255_/_0.35)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute left-1/2 top-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:rgb(99_179_255_/_0.2)] bg-[radial-gradient(circle_at_50%_40%,rgba(99,179,255,0.12),transparent_70%)]" />
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:rgb(47_107_255_/_0.18)]"
              animate={{ scale: [1, 1.04, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[color:rgb(99_179_255_/_0.35)] bg-[color:rgb(8_18_38_/_0.92)] px-4 py-2 text-[11px] font-semibold tracking-[0.06em] text-blue-100 shadow-[0_0_18px_rgba(47,107,255,0.35)]"
              animate={{ y: [0, -5, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              KOVAL CORE SYSTEM
            </motion.div>
            {[
              "left-[30%] top-[35%]",
              "left-[70%] top-[37%]",
              "left-[42%] top-[66%]",
              "left-[60%] top-[64%]",
            ].map((position, index) => (
              <motion.div
                key={position}
                aria-hidden="true"
                className={`absolute ${position} h-3 w-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shadow-[0_0_16px_rgba(99,179,255,0.85)]`}
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
            <svg
              aria-hidden="true"
              viewBox="0 0 320 320"
              className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 opacity-60"
            >
              <ellipse cx="160" cy="160" rx="112" ry="42" stroke="rgba(99,179,255,0.22)" strokeWidth="1.1" fill="none" />
              <ellipse cx="160" cy="160" rx="82" ry="30" stroke="rgba(99,179,255,0.18)" strokeWidth="1" fill="none" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 320 320"
              className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 opacity-45"
            >
              <path d="M100 112 L160 160 L220 118" stroke="url(#kvdline)" strokeWidth="1.2" fill="none" />
              <path d="M126 214 L160 160 L194 208" stroke="url(#kvdline)" strokeWidth="1.2" fill="none" />
              <defs>
                <linearGradient id="kvdline" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(99,179,255,0.15)" />
                  <stop offset="100%" stopColor="rgba(47,107,255,0.8)" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-100 shadow-[0_0_18px_rgba(99,179,255,0.95)]" />
              <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-100 shadow-[0_0_18px_rgba(99,179,255,0.95)]" />
            </motion.div>
            <motion.div
              className="absolute left-8 top-10 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] px-4 py-3 text-xs font-medium text-white shadow-accent"
              animate={{ y: [0, -10, 0], boxShadow: ["0 6px 20px rgba(47,107,255,0.3)", "0 10px 28px rgba(47,107,255,0.45)", "0 6px 20px rgba(47,107,255,0.3)"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              SaaS systems
            </motion.div>
            <motion.div
              className="absolute bottom-12 right-8 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-xs font-medium text-white shadow-md"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              eCommerce growth
            </motion.div>
            <div className="absolute bottom-8 left-8 grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-[color:rgb(0_82_255_/_0.35)]"
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] shadow-accent">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {metricItems.map((metric) => (
            <StatCounter
              key={metric.label}
              value={metric.value}
              label={metric.label}
              prefix={metric.prefix}
              suffix={metric.suffix}
            />
          ))}
        </div>
      </section>

      <div
        aria-hidden="true"
        className="mx-auto h-20 w-full max-w-6xl bg-[radial-gradient(ellipse_at_center,rgba(99,179,255,0.22),transparent_60%)] px-6 lg:px-10"
      />

      <section id="learn" className="relative mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-8 h-40 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,179,255,0.18),transparent_70%)] blur-2xl"
        />
        <SectionBadge label="What You'll Learn" />
        <h2 className="mt-6 max-w-2xl text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
          A complete online income ecosystem
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
          Tap any card to reveal the practical execution layer behind each growth pillar. The path
          is designed to feel clear, hands-on, and connected.
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {learningItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.02 } },
              }}
              whileHover={{ y: -8, scale: 1.015 }}
            >
              <button
                type="button"
                onClick={() => toggleCardFlip(item.title)}
                className="group relative h-full min-h-[19rem] w-full cursor-pointer text-left [perspective:1400px] sm:min-h-[20.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060b17]"
                aria-label={`Flip ${item.title} card`}
                aria-pressed={Boolean(flippedCards[item.title])}
              >
                <motion.div
                  className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
                  animate={{ rotateY: flippedCards[item.title] ? 180 : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 105,
                    damping: 30,
                    mass: 1.15,
                    restSpeed: 0.2,
                    restDelta: 0.003,
                  }}
                >
                  <Card className="absolute inset-0 flex h-full min-h-0 flex-col overflow-hidden border-[color:rgb(99_179_255_/_0.26)] bg-[linear-gradient(180deg,rgba(11,19,38,0.96),rgba(7,13,28,0.98))] shadow-[0_14px_35px_rgba(0,0,0,0.35)] transition duration-300 group-hover:border-[color:rgb(99_179_255_/_0.48)] group-hover:shadow-[0_18px_45px_rgba(16,44,110,0.45)] [backface-visibility:hidden]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[color:rgb(47_107_255_/_0.2)] to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(99,179,255,0.2),transparent_70%)]"
                    />
                    <div className="relative z-10 flex h-full min-h-0 flex-col">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex shrink-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] p-3 text-white shadow-[0_6px_20px_rgba(47,107,255,0.28)]">
                          <item.Icon className="h-5 w-5" />
                        </div>
                        <div
                          aria-hidden="true"
                          className="h-px min-w-0 flex-1 bg-gradient-to-r from-[var(--accent)]/45 via-white/20 to-transparent"
                        />
                      </div>
                      <h3 className="mt-4 font-sans text-[1.6rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[color:rgb(255_255_255_/_0.03)] px-2.5 py-1.5"
                          >
                            <CheckCircleIcon className="h-4 w-4 shrink-0 text-[var(--accent-secondary)]" />
                            <span className="text-[0.94rem]">{point}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-blue-300/95">
                        Tap to view details
                      </p>
                    </div>
                  </Card>

                  <Card className="absolute inset-0 flex h-full min-h-0 flex-col border-[color:rgb(99_179_255_/_0.3)] bg-[linear-gradient(180deg,rgba(10,17,35,0.98),rgba(7,12,26,0.99))] p-0 shadow-[0_14px_35px_rgba(0,0,0,0.35)] transition duration-300 group-hover:border-[color:rgb(99_179_255_/_0.5)] group-hover:shadow-[0_18px_45px_rgba(16,44,110,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_15%_8%,rgba(99,179,255,0.26),transparent_45%)]"
                    />
                    <div className="relative z-10 flex min-h-0 flex-1 flex-col p-6">
                      <div className="shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="inline-flex shrink-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] p-3 text-white shadow-[0_6px_20px_rgba(47,107,255,0.28)]">
                            <item.Icon className="h-5 w-5" />
                          </div>
                          <div
                            aria-hidden="true"
                            className="h-px min-w-0 flex-1 bg-gradient-to-r from-[var(--accent)]/45 via-white/20 to-transparent"
                          />
                        </div>
                        <h3 className="mt-4 font-sans text-[1.6rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--foreground)]">
                          {item.title}
                        </h3>
                      </div>
                      <div className="no-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
                        <p className="rounded-xl border border-white/10 bg-[color:rgb(255_255_255_/_0.03)] px-3 py-2.5 text-[0.94rem] leading-7 text-slate-200">
                          {item.explanation}
                        </p>
                      </div>
                      <p className="mt-3 shrink-0 text-xs uppercase tracking-[0.14em] text-blue-300/95">
                        Tap to flip back
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="relative bg-[color:#090f1d] py-28 text-white">
        <div className="section-dot-pattern pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[color:rgb(77_124_255_/_0.18)] blur-[140px]" />
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionBadge label="Built on Real Experience" className="border-white/25 bg-white/5" />
          <h2 className="mt-6 max-w-3xl text-4xl text-white sm:text-5xl">
            Every major era of online business
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
            Koval focuses on execution over theory. The system is built for operators who
            want structured outcomes across software, commerce, audience, and digital products.
          </p>
          <div
            className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04]"
            role="table"
            aria-label="Era, dominant business model, and key characteristics"
          >
            <div
              className="hidden border-b border-white/10 bg-white/[0.06] text-xs font-semibold uppercase tracking-[0.12em] text-white/60 md:grid md:grid-cols-12"
              role="row"
            >
              <div className="col-span-2 px-5 py-3" role="columnheader">
                Era
              </div>
              <div className="col-span-3 px-5 py-3" role="columnheader">
                Dominant model
              </div>
              <div className="col-span-7 px-5 py-3" role="columnheader">
                Key characteristics
              </div>
            </div>
            <div className="divide-y divide-white/10" role="rowgroup">
              {businessEras.map((row, index) => (
                <motion.div
                  key={row.era}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  className="grid grid-cols-1 gap-4 px-5 py-5 md:grid-cols-12 md:gap-0 md:py-0"
                  role="row"
                >
                  <div
                    className="md:col-span-2 md:self-stretch md:border-r md:border-white/10 md:px-0 md:py-5"
                    role="cell"
                  >
                    <p className="md:hidden text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                      Era
                    </p>
                    <p className="mt-1 font-mono text-sm text-blue-200/95 md:mt-0">{row.era}</p>
                  </div>
                  <div
                    className="md:col-span-3 md:self-stretch md:border-r md:border-white/10 md:px-5 md:py-5"
                    role="cell"
                  >
                    <p className="md:hidden text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                      Dominant model
                    </p>
                    <p className="mt-1 text-base font-semibold text-white md:mt-0">{row.model}</p>
                  </div>
                  <div className="md:col-span-7 md:px-5 md:py-5" role="cell">
                    <p className="md:hidden text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                      Key characteristics
                    </p>
                    <p className="mt-1 text-sm leading-7 text-white/80 md:mt-0">{row.characteristics}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        aria-hidden="true"
        className="mx-auto h-20 w-full max-w-6xl bg-[radial-gradient(ellipse_at_center,rgba(47,107,255,0.18),transparent_60%)] px-6 lg:px-10"
      />

      <section id="workflow" className="mx-auto max-w-6xl px-6 py-28 lg:px-10">
        <SectionBadge label="How It Works" />
        <h2 className="mt-6 text-4xl text-[var(--foreground)] sm:text-5xl">
          Three steps to automation-level execution
        </h2>
        <div className="relative mt-10 grid gap-5 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[15%] right-[15%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[color:rgb(99_179_255_/_0.35)] to-transparent md:block"
          />
          {workflowItems.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <GradientStrokeCard innerClassName="relative p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[color:rgb(47_107_255_/_0.12)] to-transparent"
                />
                <p className="font-mono text-xs tracking-[0.15em] text-[var(--accent)]">{step.id}</p>
                <step.Icon className="mt-4 h-7 w-7 text-[var(--accent)]" />
                <h3 className="mt-4 font-sans text-xl font-semibold text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.detail}</p>
              </GradientStrokeCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <SectionBadge label="Social Proof" />
        <h2 className="mt-6 text-4xl text-[var(--foreground)] sm:text-5xl">Real work. Not just theory.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={index === 1 ? "md:-translate-y-4" : ""}
              whileHover={{ y: index === 1 ? -20 : -8 }}
            >
              <Card className="h-full relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-secondary)]"
                />
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-[var(--accent)]" />
                <p className="mt-5 text-sm leading-7 text-slate-300">{testimonial.quote}</p>
                <p className="mt-6 font-medium text-[var(--foreground)]">{testimonial.author}</p>
                <p className="text-xs text-slate-400">{testimonial.role}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative bg-[color:#0a1122] py-28 text-white">
        <div className="section-dot-pattern pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true" />
        {floatingParticles.map((particle) => (
          <motion.span
            key={particle.id}
            aria-hidden="true"
            className="absolute block h-1.5 w-1.5 rounded-full bg-white/45"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [0, -16, 0], opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <h2 className="text-4xl text-white sm:text-5xl">Stop Consuming. Start Building.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Build with one connected system for SaaS, eCommerce, and audience-led digital business
            execution.
          </p>
          <a href={whopLink} target="_blank" rel="noreferrer">
            <Button
              size="lg"
              className="mt-8 min-w-44"
              onClick={() => sendAnalytics("cta_click", { location: "final_cta" })}
            >
              Join Now
            </Button>
          </a>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
        <SectionBadge label="Contact" />
        <h2 className="mt-6 text-4xl text-[var(--foreground)] sm:text-5xl">
          Send a message to Koval
        </h2>
        <Card className="mt-8 p-8">
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              required
              name="name"
              type="text"
              placeholder="Name"
              className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:rgb(255_255_255_/_0.02)] px-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[#060b17]"
            />
            <input
              required
              name="email"
              type="email"
              placeholder="Email"
              className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:rgb(255_255_255_/_0.02)] px-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[#060b17]"
            />
            <textarea
              required
              name="message"
              placeholder="Message"
              rows={5}
              className="w-full rounded-xl border border-[var(--border)] bg-[color:rgb(255_255_255_/_0.02)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[#060b17]"
            />
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
          {statusMessage && (
            <p className={`mt-4 text-sm ${statusError ? "text-rose-300" : "text-emerald-300"}`}>
              {statusMessage}
            </p>
          )}
        </Card>
      </section>

      <footer className="border-t border-[var(--border)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="text-base font-semibold text-white sm:text-lg">Koval</p>
          <nav className="flex items-center gap-5">
            <Link className="transition hover:text-white" href="/">
              Home
            </Link>
            <a
              className="transition hover:text-white"
              href={whopLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => sendAnalytics("cta_click", { location: "footer_join" })}
            >
              Join
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
            <Link className="transition hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="transition hover:text-white" href="/terms">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
