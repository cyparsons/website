"use client"

import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { Shield, FileSearch, Database, ArrowRight, Check } from "lucide-react"
import { HeroAnimation } from "@/components/hero-animation"
import { FadeIn } from "@/components/fade-in"
import { CountUp } from "@/components/count-up"
import { Accordion } from "@/components/accordion"
import { FAQSchema } from "@/components/schema"
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
  EASE,
} from "@/lib/animation"

// ---------- Data ----------

const solutionCards = [
  {
    icon: Shield,
    title: "Smarter Insurance Reviews",
    subtitle: "COI Verification",
    body: "Automatically verify COIs against your insurance requirements, previously approved COIs, and equipment schedules. Serial number verification, coverage checks, and multi-asset deals reviewed 4x faster.",
    href: "/solutions/coi-verification",
    cta: "Get Started",
    stats: [
      { value: 4, suffix: "x", label: "Faster Verification" },
      { value: 60, suffix: "%", label: "COIs with Deficiencies" },
    ],
    gradient: "from-[#2AA0E6]/10 to-transparent",
  },
  {
    icon: FileSearch,
    title: "Automated Lien Validation",
    subtitle: "PPSA & UCC Filing Verification",
    body: "We're building automated filing verification for PPSA registrations and UCC filings. Debtor names, collateral descriptions, and registration details compared against the deal package.",
    href: "/solutions/lien-validation",
    cta: "Join the Waitlist",
    badge: "Coming Soon",
    gradient: "from-[#006AAE]/10 to-transparent",
  },
  {
    icon: Database,
    title: "Debtor Search Intelligence",
    subtitle: "Registration Analysis",
    body: "Debtor search results can run hundreds of pages. We're building intelligence that surfaces existing registrations, general security agreements, and blanket liens in minutes.",
    href: "/solutions/debtor-search",
    cta: "Join the Waitlist",
    badge: "Coming Soon",
    gradient: "from-[#003263]/10 to-transparent",
  },
]

const whyPoints = [
  "Built from the ground up for equipment finance operations",
  "Designed with documentation teams, not just for them",
  "Human-in-the-loop is a core principle, not a checkbox",
  "Full audit trail on every extraction, comparison, and decision",
]

const faqItems = [
  {
    question: "Does Swift Stack integrate with our existing document systems?",
    answer:
      "Yes. We currently integrate with Microsoft SharePoint and Outlook for automated file retrieval. Google Drive integration is in progress.",
  },
  {
    question: "How does Swift Stack fit into our existing workflow?",
    answer:
      "Swift Stack automates the repetitive parts of document review. It doesn't replace your existing process or remove human oversight. The system handles extraction and comparison. Your team handles exceptions, judgment calls, and final approval. Human-in-the-loop is a core design principle, not an afterthought.",
  },
  {
    question: "How quickly are documents processed?",
    answer:
      "Most document checks complete in under 30 seconds. The larger the document, the longer it takes.",
  },
  {
    question: "Do you support audit logs and traceability?",
    answer:
      "Yes. Every AI extraction, every field comparison, every routing decision, and every user action is logged. The full audit trail is available for compliance review at any time.",
  },
  {
    question: "Is this built for equipment finance specifically?",
    answer:
      "Yes. Swift Stack was built from the ground up for equipment finance operations. We handle insurance certificate verification, equipment schedule cross-referencing, multi-asset deal logic, and serial number verification today, with lien validation and debtor search intelligence in development.",
  },
]

// ---------- Sections ----------

function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
      {/* Ambient glow behind hero */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        {/* Text */}
        <div>
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5"
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.smooth }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">COI Verification is Live</span>
          </motion.div>

          <motion.h1
            className="text-gradient text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.1 }}
          >
            Pre-Funding Document Verification for Equipment Finance
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.2 }}
          >
            Automate the document checks between approval and payout. Less
            manual review. Fewer missed deficiencies. Faster funding.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.3 }}
          >
            <Link
              href="#cta"
              className="btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#solutions"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              See how it works
            </Link>
          </motion.div>
        </div>

        {/* Animation with glow backdrop */}
        <motion.div
          className="relative flex justify-center"
          initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE.smooth, delay: 0.2 }}
        >
          {/* Glow behind the animation */}
          <div
            className="pointer-events-none absolute inset-0 -m-8 rounded-3xl opacity-50 blur-2xl"
            style={{ background: "radial-gradient(ellipse at center, rgba(42, 160, 230, 0.08), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative rounded-2xl border border-border/50 bg-surface/80 p-4 shadow-xl shadow-accent/[0.03] backdrop-blur-sm">
            <HeroAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section className="relative py-20 md:py-28">
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-alt/50 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">The Problem</p>
            <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Document Verification Is What Slows the Path from Approval to Payout
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-text-secondary md:text-lg">
            Between deal approval and funding, your documentation team
            manually verifies every document in the deal package. They open
            PDFs, read fields line by line, cross-reference data against deal
            requirements, and flag issues by hand.
          </p>
        </FadeIn>

        {/* Stats row */}
        <motion.div
          className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {[
            { value: "Manual", label: "Field-by-field PDF review" },
            { value: "Repetitive", label: "Same checks, every deal" },
            { value: "Risky", label: "Missed deficiencies at volume" },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              className="rounded-xl border border-border bg-surface p-5 text-center"
            >
              <p className="text-lg font-semibold text-text-primary">{item.value}</p>
              <p className="mt-1 text-xs text-text-secondary">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Solutions() {
  const reduced = useReducedMotion()

  return (
    <section id="solutions" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Solutions</p>
            <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Built for Equipment Finance Workflows
            </h2>
            <p className="mt-4 text-base text-text-secondary md:text-lg">
              Three products. One platform. Every document check between approval and payout.
            </p>
          </div>
        </FadeIn>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-3"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {solutionCards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.href}
                variants={reduced ? undefined : staggerItem}
                className="card-modern group relative overflow-hidden p-6"
              >
                {/* Gradient accent at top */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.gradient}`} />

                {card.badge && (
                  <span className="absolute top-4 right-4 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {card.badge}
                  </span>
                )}

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 ring-1 ring-accent/10">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>

                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-tertiary">{card.subtitle}</p>
                <h3 className="text-xl font-semibold text-text-primary">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {card.body}
                </p>

                {/* Stats */}
                {card.stats && (
                  <div className="mt-6 flex gap-8 border-t border-border pt-5">
                    {card.stats.map((stat) => (
                      <div key={stat.label}>
                        <span className="text-3xl font-bold text-gradient-accent">
                          <CountUp target={stat.value} suffix={stat.suffix} />
                        </span>
                        <p className="mt-1 text-xs text-text-secondary">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={card.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all duration-200 hover:gap-2.5"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function WhySwiftStack() {
  const reduced = useReducedMotion()

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-alt/30 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* Left: text */}
          <FadeIn>
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Why Swift Stack</p>
              <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Purpose-Built by the People Who Know These Workflows
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
                We believe operational efficiency unlocks human potential. When
                your team isn&apos;t buried in repetitive document review,
                they&apos;re more focused, more alert, and more present for the
                work that actually requires their judgment.
              </p>
            </div>
          </FadeIn>

          {/* Right: checklist */}
          <motion.div
            className="space-y-4"
            variants={reduced ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {whyPoints.map((point) => (
              <motion.div
                key={point}
                variants={reduced ? undefined : staggerItem}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                </div>
                <p className="text-sm leading-relaxed text-text-primary">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">FAQ</p>
            <h2 className="text-gradient text-3xl font-bold tracking-tight md:text-4xl">
              Common Questions
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion items={faqItems} />
        </FadeIn>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center md:px-16 md:py-20">
            {/* Ambient glow inside CTA */}
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full opacity-20 blur-[100px]"
              style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.4), transparent 70%)" }}
              aria-hidden="true"
            />

            <div className="relative">
              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Get Started
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                COI verification is live and in production. Get in touch to see how
                Swift Stack fits into your document verification workflow.
              </p>

              <div className="mx-auto mt-10 grid max-w-lg gap-4 text-left sm:grid-cols-3">
                {[
                  { title: "See it in action", body: "Walk through your specific workflows" },
                  { title: "Launch pricing", body: "Introductory rates available now" },
                  { title: "Configured for you", body: "Set up for your deal types" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-400">{item.body}</p>
                  </div>
                ))}
              </div>

              {/* Email form */}
              <form
                className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Work email"
                  required
                  className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-accent focus:bg-white/10 focus:ring-2 focus:ring-accent/20"
                />
                <button
                  type="submit"
                  className="btn-primary rounded-xl px-7 py-3.5 text-sm"
                >
                  Get Started
                </button>
              </form>

              {/* CASL consent */}
              <div className="mx-auto mt-4 max-w-md">
                <label className="flex items-start gap-3 text-left">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-gray-600 bg-white/5 text-accent focus:ring-2 focus:ring-accent/30 focus:ring-offset-0"
                  />
                  <span className="text-xs leading-relaxed text-gray-400">
                    I agree to receive emails from Swift Stack Solutions about
                    product updates, launch announcements, and related company
                    communications.
                  </span>
                </label>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  You can withdraw your consent at any time by clicking the
                  unsubscribe link in any email or by contacting{" "}
                  <a href="mailto:hello@swiftstacksolutions.com" className="underline hover:text-gray-400">
                    hello@swiftstacksolutions.com
                  </a>
                  . Swift Stack Solutions, swiftstacksolutions.com.
                </p>
              </div>

              <p className="mt-8 text-sm text-gray-400">
                Or email us directly:{" "}
                <a
                  href="mailto:hello@swiftstacksolutions.com"
                  className="font-medium text-white underline transition-colors duration-200 hover:text-accent"
                >
                  hello@swiftstacksolutions.com
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ---------- Divider ----------

function SectionDivider() {
  return <div className="divider-gradient mx-auto max-w-5xl" />
}

// ---------- Page ----------

export default function HomePage() {
  return (
    <>
      <FAQSchema items={faqItems} />
      <Hero />
      <SectionDivider />
      <Problem />
      <SectionDivider />
      <Solutions />
      <SectionDivider />
      <WhySwiftStack />
      <SectionDivider />
      <FAQ />
      <CTA />
    </>
  )
}
