"use client"

import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { ArrowRight, FileUp, ScanSearch, FileCheck, ShieldCheck, Clock, Shield, TrendingUp } from "lucide-react"
import { COIHeroAnimation } from "@/components/coi-hero-animation"
import { FadeIn } from "@/components/fade-in"
import { Accordion } from "@/components/accordion"
import { AnimatedDivider } from "@/components/animated-divider"
import { CountUp } from "@/components/count-up"
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
  EASE,
} from "@/lib/animation"

// ---------- Data ----------

const faqItems = [
  {
    question: "What COI formats does Swift Stack support?",
    answer:
      "PDF, scanned images, and digital certificates. The AI extraction layer handles format variations without manual intervention.",
  },
  {
    question: "How does asset verification work for large deals?",
    answer:
      "For each asset on the insurance, Swift Stack verifies the serial number, asset name, actual cash value, and deductible against the equipment schedule, enabling seamless verification of asset accuracy. Serial number formats are normalized automatically (dashes, spaces, and leading zeros handled for accurate matching). For a 50-asset deal, the full comparison runs in seconds. Mismatches are flagged with specific field-level detail so your team knows exactly what to follow up on.",
  },
  {
    question: "What happens when a COI fails verification?",
    answer:
      "Flagged COIs show each specific deficiency: the field, the expected value, the actual value, and the reason for the flag. Your team knows exactly what to follow up on without re-reading the entire document.",
  },
  {
    question: "Is this just COI tracking?",
    answer:
      "No. COI tracking tools tell you whether a document has been received. Swift Stack reads the document, compares every field against your deal requirements and equipment schedule, and tells you whether the contents are correct. It's document analysis, not document tracking.",
  },
]

const steps = [
  {
    icon: FileUp,
    title: "Ingest",
    body: "Swift Stack receives the certificate of insurance. PDFs, scanned images, and digital certificates are all supported. Documents come in through your existing workflow.",
  },
  {
    icon: ScanSearch,
    title: "Analyze",
    body: "The system reads both documents, extracts every relevant field, and runs a field-by-field comparison against your insurance requirements or last approved COI. Serial number verification, entity name matching, coverage limits, endorsements, and policy details are all verified using a combination of AI extraction and structured logic.",
  },
  {
    icon: FileCheck,
    title: "Output",
    body: "Results are presented as a readable overlay directly on the insurance document. Every field is highlighted with the verification result, so your analyst can see exactly what passed, what failed, and why, without switching between screens or cross-referencing manually.",
  },
]

const complianceItems = [
  "Full audit trail on every extraction, comparison, and routing decision",
  "Every action is logged and traceable for compliance review",
  "Verification logic adapts to your deal types and requirements",
]

const checkItems = [
  "Serial numbers",
  "Asset descriptions",
  "Equipment schedule cross-referencing",
  "Loss payee designations",
  "Actual cash value",
  "Deductible",
  "Endorsement requirements",
  "Policy dates",
  "Policy expiration",
  "Insurer details",
  "Policy number",
  "Entity name matching",
]

const benefits = [
  {
    icon: Clock,
    title: "Time Savings",
    body: "Multi-asset COI reviews are the most time-consuming step in pre-funding documentation. Automated field-by-field comparison streamlines the review process, resulting in immense time savings at scale.",
  },
  {
    icon: Shield,
    title: "Fewer Missed Deficiencies",
    body: "Manual review at volume means deficiencies get missed. Swift Stack checks every field consistently, catching issues that even experienced analysts can overlook.",
  },
  {
    icon: TrendingUp,
    title: "More Deal Capacity, Same Team",
    body: "COI verification handles the repetitive comparison so your team can focus on the exceptions and judgment calls that actually require their expertise.",
  },
]

// ---------- Sections ----------

function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Dot grid background */}
      <div
        className="bg-dot-grid-fade pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, transparent 50%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.18), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Breadcrumb */}
        <motion.p
          className="mb-4 text-sm text-text-tertiary"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE.smooth }}
        >
          <Link href="/" className="hover:text-accent transition-colors duration-200">Solutions</Link>
          {" / "}
          <span className="text-text-secondary">COI Verification</span>
        </motion.p>

        {/* Status pill */}
        <motion.div
          className="mb-5 flex items-center justify-center"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE.smooth, delay: 0.05 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-verified/10 px-3 py-1 text-xs font-medium text-verified">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
            </span>
            Live Now
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="text-gradient text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.1 }}
        >
          Smarter Insurance Reviews for Equipment Finance
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.2 }}
        >
          Verify certificates of insurance against deal requirements and previously approved COIs automatically. Purpose-built for equipment finance: multi-asset deals, serial number matching, and comprehensive insurance verification.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
          >
            See how it works
          </Link>
        </motion.div>

        {/* Framed animation */}
        <motion.div
          className="mx-auto mt-12 max-w-3xl"
          initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE.smooth, delay: 0.35 }}
        >
          <div className="relative rounded-2xl border border-border bg-surface p-4 shadow-lg shadow-accent/5 md:p-6">
            {/* Glow behind */}
            <div
              className="pointer-events-none absolute inset-0 -m-8 rounded-3xl opacity-40 blur-3xl"
              style={{ background: "radial-gradient(ellipse at center, rgba(42, 160, 230, 0.08), transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="relative">
              <COIHeroAnimation />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Problem() {
  const reduced = useReducedMotion()

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-surface-alt/50" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">The Problem</p>
            <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              COI Verification in Equipment Finance Is More Complex Than It Looks
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-text-secondary md:text-lg">
            Every COI that crosses your desk requires checking coverage types, limits, serial numbers, named insured, additional insured, loss payee, policy dates, and insurer details. Each field must be cross-referenced against the equipment schedule and deal requirements.
          </p>
        </FadeIn>

        {/* Stat rows */}
        <motion.div
          className="mt-12 space-y-5"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div
            variants={reduced ? undefined : staggerItem}
            className="flex items-center gap-6 rounded-2xl border border-border bg-surface p-5"
          >
            <span className="shrink-0 text-3xl font-bold text-accent md:text-4xl">~5 min</span>
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">Each review takes several minutes per document</p>
          </motion.div>

          <motion.div
            variants={reduced ? undefined : staggerItem}
            className="flex items-center gap-6 rounded-2xl border border-border bg-surface p-5"
          >
            <span className="shrink-0 text-3xl font-bold text-accent md:text-4xl">10-50+</span>
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">Multi-asset deals with serial numbers take significantly longer</p>
          </motion.div>

          <motion.div
            variants={reduced ? undefined : staggerItem}
            className="flex items-center gap-6 rounded-2xl border border-border bg-surface p-5"
          >
            <span className="shrink-0 text-3xl font-bold text-accent md:text-4xl">
              ~<CountUp target={15} suffix="%" />
            </span>
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">Roughly 15% of COIs have at least one deficiency on first submission</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Solution() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">The Solution</p>
          <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Insurance Document Intelligence, Purpose-Built
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
            Swift Stack applies document intelligence to the insurance verification workflow in equipment finance. The system ingests your incoming certificate of insurance, analyzes every relevant field against your insurance requirements and internal rules, and presents any issues or warnings directly in the document for a clear and confident review.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-8 border-l-2 border-accent pl-6">
            <p className="text-base leading-relaxed text-text-primary md:text-lg">
              In production, this means 4x faster COI reviews, with multi-asset deals that used to take hours processed in minutes. Your team conducts exception-based reviews instead of checking every detail manually, reclaiming time and reducing risk.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function HowItWorks() {
  const reduced = useReducedMotion()

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">How It Works</p>
            <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              How Swift Stack Verifies Every COI
            </h2>
          </div>
        </FadeIn>

        {/* Vertical timeline */}
        <motion.div
          className="relative mt-12 ml-6 border-l-2 border-border pl-8 md:ml-10 md:pl-10"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                variants={reduced ? undefined : staggerItem}
                className={`relative ${i < steps.length - 1 ? "pb-10" : ""}`}
              >
                {/* Circle on the timeline */}
                <div className="absolute -left-[calc(2rem+13px)] flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-surface md:-left-[calc(2.5rem+13px)]">
                  <span className="text-xs font-bold text-accent">{i + 1}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-base">{step.body}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Built-in compliance */}
        <FadeIn delay={0.2}>
          <div className="mt-12">
            <h3 className="text-base font-semibold text-text-primary">Built-in compliance</h3>
            <div className="mt-4 space-y-3">
              {complianceItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 mt-0.5">
                    <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function WhatItChecks() {
  const reduced = useReducedMotion()

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-surface-alt/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Verification</p>
            <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Verification Coverage
            </h2>
          </div>
        </FadeIn>

        <motion.div
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {checkItems.map((item) => (
            <motion.div
              key={item}
              variants={reduced ? undefined : staggerItem}
              className="card-glow flex items-center gap-2.5 p-3.5"
            >
              <ShieldCheck className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="text-sm font-medium text-text-primary">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function WhatThisMeans() {
  const reduced = useReducedMotion()

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Benefits</p>
            <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              What This Means for Your Team
            </h2>
          </div>
        </FadeIn>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                variants={reduced ? undefined : staggerItem}
                className="card-modern p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{benefit.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
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
              COI Verification Questions
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
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center md:px-16 md:py-20">
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full opacity-20 blur-[100px]"
              style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.4), transparent 70%)" }}
              aria-hidden="true"
            />

            <div className="relative">
              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Ready to Rethink Insurance Verification?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                Your team reviews COIs every day. Swift Stack makes every review faster, more consistent, and easier to audit.
              </p>

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <p className="mt-6 text-sm text-gray-400">
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

// ---------- Page ----------

export default function COIVerificationContent() {
  return (
    <>
      <Hero />
      <AnimatedDivider />
      <Problem />
      <AnimatedDivider />
      <Solution />
      <AnimatedDivider />
      <HowItWorks />
      <AnimatedDivider />
      <WhatItChecks />
      <AnimatedDivider />
      <WhatThisMeans />
      <AnimatedDivider />
      <FAQ />
      <CTA />
    </>
  )
}
