"use client"

import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  ManualWorkflow,
  RepetitiveWorkflow,
  RiskyWorkflow,
  COIVerificationWorkflow,
  LienValidationWorkflow,
  DebtorSearchWorkflow,
} from "@/components/workflow-animations"
import { HeroAnimation } from "@/components/hero-animation"
import { FadeIn } from "@/components/fade-in"
import { CountUp } from "@/components/count-up"
import { Accordion } from "@/components/accordion"
import { FAQSchema } from "@/components/schema"
import { AnimatedDivider } from "@/components/animated-divider"
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
  EASE,
} from "@/lib/animation"

// ---------- Data ----------

const solutionCards = [
  {
    animation: COIVerificationWorkflow,
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
    animation: LienValidationWorkflow,
    title: "Automated Lien Validation",
    subtitle: "PPSA & UCC Filing Verification",
    body: "We're building automated filing verification for PPSA registrations and UCC filings. Debtor names, collateral descriptions, and registration details compared against the deal package.",
    href: "/solutions/lien-validation",
    cta: "Join the Waitlist",
    badge: "Coming Soon",
    gradient: "from-[#006AAE]/10 to-transparent",
  },
  {
    animation: DebtorSearchWorkflow,
    title: "Debtor Search Intelligence",
    subtitle: "Registration Analysis",
    body: "Debtor search results can run hundreds of pages. We're building intelligence that surfaces existing registrations, general security agreements, and blanket liens in minutes.",
    href: "/solutions/debtor-search",
    cta: "Join the Waitlist",
    badge: "Coming Soon",
    gradient: "from-[#003263]/10 to-transparent",
  },
]

const problemCards = [
  {
    animation: ManualWorkflow,
    title: "Manual",
    body: "Field-by-field PDF review on every deal. Your team opens documents, reads line by line, and cross-references by hand.",
  },
  {
    animation: RepetitiveWorkflow,
    title: "Repetitive",
    body: "Same verification checks on every deal, every day. Skilled people doing work that doesn't require their expertise.",
  },
  {
    animation: RiskyWorkflow,
    title: "Risky",
    body: "At volume, deficiencies slip through. A missed serial number or expired policy can mean funding against incomplete coverage.",
  },
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
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      {/* Dot grid background */}
      <div
        className="bg-dot-grid-fade pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      {/* Radial fade to mask grid edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, transparent 50%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />

      {/* Ambient glow behind hero */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.18), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[1fr_1.5fr] md:gap-10 lg:gap-16">
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

        {/* Animation — floating with glow, no border frame */}
        <motion.div
          className="relative flex justify-center"
          initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE.smooth, delay: 0.2 }}
        >
          {/* Glow behind the animation */}
          <div
            className="pointer-events-none absolute inset-0 -m-12 rounded-3xl opacity-60 blur-3xl"
            style={{ background: "radial-gradient(ellipse at center, rgba(42, 160, 230, 0.1), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative w-full">
            <HeroAnimation />
          </div>
        </motion.div>
      </div>

      {/* Credibility line */}
      <motion.p
        className="relative mt-16 text-center text-sm text-text-tertiary"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Purpose-built for equipment finance lenders in Canada and the US
      </motion.p>
    </section>
  )
}

function Problem() {
  const reduced = useReducedMotion()

  return (
    <section className="relative py-14 md:py-20">
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-surface-alt/50" aria-hidden="true" />

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
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-text-secondary md:text-lg">
            Between deal approval and funding, your documentation team
            manually verifies every document in the deal package. They open
            PDFs, read fields line by line, cross-reference data against deal
            requirements, and flag issues by hand.
          </p>
        </FadeIn>

        {/* Problem cards with workflow animations */}
        <motion.div
          className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {problemCards.map((card) => {
            const Animation = card.animation
            return (
              <motion.div
                key={card.title}
                variants={reduced ? undefined : staggerItem}
                className="card-glow group p-6 text-center"
              >
                <div className="mx-auto mb-4 h-16 w-full max-w-[120px]">
                  <Animation />
                </div>
                <p className="text-lg font-semibold text-text-primary">{card.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{card.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}


function Solutions() {
  const reduced = useReducedMotion()

  return (
    <section id="solutions" className="py-14 md:py-20">
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
          className="mt-12 grid gap-6 md:grid-cols-3"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {solutionCards.map((card) => {
            const Animation = card.animation
            return (
              <motion.div
                key={card.href}
                variants={reduced ? undefined : staggerItem}
                className="card-shimmer group relative p-6"
              >
                {/* Gradient accent at top */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.gradient} z-10`} />

                {card.badge && (
                  <span className="absolute top-4 right-4 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {card.badge}
                  </span>
                )}

                <div className="mb-4 h-24 w-full">
                  <Animation />
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
  return (
    <section className="relative py-14 md:py-20">
      <div className="absolute inset-0 bg-surface-alt/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Why Swift Stack</p>
            <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Why We Build What We Build
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto mt-8 max-w-[700px] space-y-5 text-center">
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              We believe operational efficiency unlocks human potential. When
              your team isn&apos;t buried in repetitive document review,
              they&apos;re more focused, more alert, and more present for the
              work that actually requires their judgment.
            </p>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              Swift Stack is shaped by the people who live these workflows every
              day. The documentation, funding, and operations teams who do this
              work are the ones driving what we build and how we build it.
            </p>
            <p className="mt-6 text-sm text-text-tertiary">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-verified align-middle animate-pulse" />
              In production with a mid-market Canadian equipment finance lender
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="relative py-14 md:py-20">
      {/* Dot grid background for texture */}
      <div
        className="bg-dot-grid-fade pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6">
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
    <section id="cta" className="py-14 md:py-20">
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

              <p className="mt-3 text-sm text-gray-400">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-400 align-middle animate-pulse" />
                In production with a mid-market Canadian equipment finance lender
              </p>

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
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/8"
                  >
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
  return <AnimatedDivider />
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
