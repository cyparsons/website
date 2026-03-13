"use client"

import { useState, useRef } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { HeroAnimation } from "@/components/hero-animation"
import { SolutionAnimation } from "@/components/solution-animation"
import { FadeIn } from "@/components/fade-in"
import { Accordion } from "@/components/accordion"
import { CountUp } from "@/components/count-up"
import { FAQSchema } from "@/components/schema"
import { GridPulses } from "@/components/grid-pulses"
// AnimatedDivider replaced by HorizonLine
import { EASE, staggerItem, viewportOnce } from "@/lib/animation"

// ---------- Data ----------

const checkItems = [
  "Serial numbers",
  "Coverage types and limits",
  "Loss payee designations",
  "Asset descriptions",
  "Additional insured designations",
  "Named insured / entity matching",
  "Equipment schedule cross-referencing",
  "Endorsement requirements",
  "Actual cash value",
  "Policy dates and expiration",
  "Insurer details",
  "Deductible",
  "Policy number",
]

const faqItems = [
  {
    question: "Does Swift Stack integrate with our existing systems?",
    answer:
      "Yes. We currently integrate with Microsoft SharePoint and Outlook for automated file retrieval. Google Drive integration is in progress.",
  },
  {
    question: "What COI formats does Swift Stack support?",
    answer:
      "PDF, scanned images, and digital certificates. The AI extraction layer handles format variations without manual intervention.",
  },
  {
    question: "How does asset verification work for large deals?",
    answer:
      "For each asset on the insurance, Swift Stack verifies the serial number, asset name, actual cash value, and deductible against the equipment schedule. Serial number formats are normalized automatically (dashes, spaces, and leading zeros handled for accurate matching). For a 50-asset deal, the full comparison runs in seconds. Mismatches are flagged with specific field-level detail so your team knows exactly what to follow up on.",
  },
  {
    question: "What happens when a COI fails verification?",
    answer:
      "Flagged COIs show each specific deficiency: the field, the expected value, the actual value, and the reason for the flag. Your team knows exactly what to follow up on without re-reading the entire document.",
  },
  {
    question: "Is this just COI tracking?",
    answer:
      "No. COI tracking tools tell you whether a document has been received. Swift Stack reads the document, compares every field against your deal requirements and equipment schedule, and tells you whether the contents are correct. It's document verification, not document tracking.",
  },
  {
    question: "Is Swift Stack built specifically for equipment finance?",
    answer:
      "Yes. Swift Stack is purpose-built for equipment finance COI verification. The system understands multi-asset deals, equipment schedules with dozens or hundreds of serial numbers, and the specific insurance requirements that equipment lenders need verified before funding. Generic document tools don't handle this level of detail.",
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
]

// Custom stagger timing for check grid (110ms between items)
const checkStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11 },
  },
}

// ---------- Helpers ----------

function scrollToCTA(e: React.MouseEvent) {
  e.preventDefault()
  const el = document.getElementById("cta")
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

// ---------- Section 1: Hero ----------

function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      {/* Background */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <GridPulses variant="light" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, transparent 50%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.18), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[1fr_1.5fr] md:gap-10 lg:gap-16">
        {/* Text */}
        <div>
          <motion.h1
            className="text-gradient text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.easeInOut }}
          >
            Document Intelligence for Equipment Finance Insurance
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.easeInOut, delay: 0.12 }}
          >
            Insurance verification that plugs into your existing process. Faster COI reviews, fewer missed deficiencies, more confident results.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.easeInOut, delay: 0.24 }}
          >
            <a
              href="#cta"
              onClick={scrollToCTA}
              className="btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Animation */}
        <motion.div
          className="relative flex flex-col items-center"
          initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE.smooth, delay: 0.2 }}
        >
          <div
            className="pointer-events-none absolute inset-0 -m-12 rounded-3xl opacity-60 blur-3xl"
            style={{ background: "radial-gradient(ellipse at center, rgba(42, 160, 230, 0.1), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative w-[90%]">
            <HeroAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Section 2: The Problem ----------

function TheProblem() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#0A1628" }}>
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <GridPulses variant="dark" />
      {/* Bright grid near orbs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 400px 300px at 65% 15%, rgba(0,0,0,0.6), transparent), radial-gradient(ellipse 400px 300px at 25% 85%, rgba(0,0,0,0.5), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 400px 300px at 65% 15%, rgba(0,0,0,0.6), transparent), radial-gradient(ellipse 400px 300px at 25% 85%, rgba(0,0,0,0.5), transparent)",
        }}
        aria-hidden="true"
      />
      {/* Radial fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, #0A1628 75%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — top right */}
      <div
        className="pointer-events-none absolute top-[15%] left-[65%] -translate-x-1/2 -translate-y-1/2 h-[550px] w-[650px] rounded-full opacity-50 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.35), transparent 65%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — bottom left */}
      <div
        className="pointer-events-none absolute bottom-[10%] left-[25%] -translate-x-1/2 h-[500px] w-[600px] rounded-full opacity-45 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(50, 180, 255, 0.3), transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-accent">The Problem</p>
          <h2 className="mx-auto max-w-4xl text-center text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            These Checks Exist for a Reason. The Manual Reviews Don&apos;t Have To.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-8 max-w-[700px] text-center text-base leading-relaxed text-slate-400 md:text-lg">
            Serial numbers, coverage limits, actual cash values, endorsements, loss payee, additional insured. These fields get checked on every COI that comes through because they protect your position on the asset. Every asset on the equipment schedule means more to verify and more time to get through it. The checks are necessary. The way they get done is what can be improved.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ---------- Section 3: The Solution ----------

function TheSolution() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Grid */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 500px 400px at 40% 30%, rgba(0,0,0,0.6), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 500px 400px at 40% 30%, rgba(0,0,0,0.6), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — upper left */}
      <div
        className="pointer-events-none absolute top-[25%] left-[35%] -translate-x-1/2 -translate-y-1/2 h-[500px] w-[650px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-accent">The Solution</p>
          <h2 className="text-gradient mx-auto max-w-3xl text-center text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
            Your Team Reviews Exceptions. Swift Stack Handles the Rest.
          </h2>
        </FadeIn>

        {/* Animation */}
        <FadeIn delay={0.15}>
          <div className="mt-12">
            <SolutionAnimation />
          </div>
        </FadeIn>

        {/* Supporting points + takeaway */}
        <FadeIn delay={0.25}>
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-3 w-3 text-accent" />
                </span>
                <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                  Every field checked against your equipment schedule and coverage requirements
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-3 w-3 text-accent" />
                </span>
                <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                  Exceptions surfaced with the specific issue, visible right on the document
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-3 w-3 text-accent" />
                </span>
                <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                  Your team reviews only what&apos;s flagged
                </p>
              </div>
            </div>

            <div className="divider-gradient mx-auto mt-6 max-w-xs" />

            <p className="text-gradient mt-6 text-center text-lg font-semibold md:text-xl">
              Instead of starting a review, they&apos;re finishing one.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ---------- Section 4: What It Checks ----------

function WhatItChecks() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Grid */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 450px 350px at 65% 45%, rgba(0,0,0,0.6), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 450px 350px at 65% 45%, rgba(0,0,0,0.6), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — right */}
      <div
        className="pointer-events-none absolute top-[40%] left-[65%] -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-gradient text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              COI Verification Coverage
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
              Every field on the certificate of insurance is verified against your equipment lease insurance requirements and equipment schedule.
            </p>
          </div>
        </FadeIn>

        <motion.div
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3"
          variants={reduced ? undefined : checkStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {checkItems.map((item, i) => (
            <motion.div
              key={item}
              variants={reduced ? undefined : staggerItem}
              className={`flex items-center gap-3 rounded-xl border border-border bg-surface p-3 ${
                i === checkItems.length - 1 ? "md:col-start-2" : ""
              }`}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-text-primary">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Section 5: Results ----------

function Results() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#0A1628" }}>
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      {/* Bright grid near orb */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 450px 350px at 30% 30%, rgba(0,0,0,0.6), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 450px 350px at 30% 30%, rgba(0,0,0,0.6), transparent)",
        }}
        aria-hidden="true"
      />
      {/* Radial fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, #0A1628 75%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — top left */}
      <div
        className="pointer-events-none absolute top-[25%] left-[30%] -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full opacity-35 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.22), transparent 70%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            What This Looks Like in Production
          </h2>
        </FadeIn>

        {/* Hero metric */}
        <div className="mt-12 text-center">
          <div className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            <CountUp target={4} suffix="x" />
          </div>
          <p className="mt-2 text-lg font-medium text-slate-400">Faster COI Reviews</p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <motion.div
            className="rounded-2xl border border-[#1E3A5F] bg-[#0E1F35] p-8"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={(reduced || inView) ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={reduced ? undefined : { duration: 0.5, delay: 2.0, ease: EASE.easeInOut }}
          >
            <h3 className="text-lg font-semibold text-white">Risk Reduction</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              On the low end, roughly 15% of COIs have at least one deficiency on first submission. Swift Stack identifies issues with 99% accuracy, catching deficiencies consistently before they delay funding or create exposure. Every field, every document, every time.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-[#1E3A5F] bg-[#0E1F35] p-8"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={(reduced || inView) ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={reduced ? undefined : { duration: 0.5, delay: 2.12, ease: EASE.easeInOut }}
          >
            <h3 className="text-lg font-semibold text-white">Team Capacity</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              The time your team saves on field-by-field verification goes back into the work that actually requires their judgment: following up on exceptions, resolving deficiencies, and moving deals forward. Same team, more throughput, less burnout from repetitive review.
            </p>
          </motion.div>
        </div>

        {/* Attribution */}
        <p className="mt-8 text-center text-xs text-slate-500">
          Based on production data from a mid-market Canadian equipment finance lender.
        </p>
      </div>
    </section>
  )
}

// ---------- Section 6: Testimonial ----------

function Testimonial() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Grid */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 400px 300px at 50% 50%, rgba(0,0,0,0.5), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 400px 300px at 50% 50%, rgba(0,0,0,0.5), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — center */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.12), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE.easeInOut }}
        >
          {/* Decorative quote mark */}
          <svg className="mx-auto mb-6 h-10 w-10 text-accent opacity-30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>

          <blockquote className="text-xl leading-relaxed text-text-primary md:text-2xl">
            &ldquo;Swift Stack changed how our team handles COI reviews. What used to take hours of manual comparison now surfaces exactly what needs attention. We catch more, faster, with less effort.&rdquo;
          </blockquote>

          <p className="mt-6 text-sm font-medium text-text-secondary">
            Documentation Team Lead, Mid-Market Canadian Equipment Finance Lender
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Section 7: FAQ ----------

function FAQ() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Grid */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 400px 350px at 70% 60%, rgba(0,0,0,0.6), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 400px 350px at 70% 60%, rgba(0,0,0,0.6), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — lower right */}
      <div
        className="pointer-events-none absolute top-[55%] left-[70%] -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <FadeIn>
          <h2 className="text-gradient mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Common Questions
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion items={faqItems} />
        </FadeIn>
      </div>
    </section>
  )
}

// ---------- Section 8: CTA ----------

function CTASection() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg("")

    if (!email.trim()) {
      setStatus("error")
      setErrorMsg("Please enter your email address.")
      return
    }

    if (!consent) {
      setStatus("error")
      setErrorMsg("Please provide consent to receive communications.")
      return
    }

    setStatus("loading")

    // TODO: Wire up HubSpot integration
    console.log("CTA form submission:", { email, consent })

    // Simulate success for now
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      setConsent(false)
      setTimeout(() => setStatus("idle"), 2000)
    }, 800)
  }

  return (
    <section id="cta" className="py-16 md:py-24">
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
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Improve the Way Your Team Reviews COIs.
              </h2>

              <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg" noValidate>
                {/* Email + submit row */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === "error") { setStatus("idle"); setErrorMsg("") }
                    }}
                    placeholder="Your work email"
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm bg-white/5 text-white placeholder-gray-400 outline-none transition-colors duration-200 focus:border-accent focus:ring-1 focus:ring-accent ${
                      status === "error" ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm whitespace-nowrap disabled:opacity-80"
                    style={status === "success" ? { background: "var(--color-verified)", boxShadow: "none" } : undefined}
                  >
                    {status === "loading" && (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    )}
                    {status === "success" && (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Sent
                      </>
                    )}
                    {(status === "idle" || status === "error") && "Get Started"}
                  </button>
                </div>

                {/* Error message */}
                {status === "error" && errorMsg && (
                  <p className="mt-2 text-left text-sm text-red-400">{errorMsg}</p>
                )}

                {/* CASL consent checkbox */}
                <label className="mt-4 flex items-start gap-3 text-left cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked)
                      if (status === "error") { setStatus("idle"); setErrorMsg("") }
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-accent"
                  />
                  <span className="text-xs leading-relaxed text-gray-400">
                    I agree to receive emails from Swift Stack Solutions about product updates, launch announcements, and related company communications.
                  </span>
                </label>

                {/* CASL disclosure */}
                <p className="mt-3 text-left text-[11px] leading-relaxed text-gray-500">
                  You can withdraw your consent at any time by clicking the unsubscribe link in any email or by contacting{" "}
                  <a href="mailto:hello@swiftstacksolutions.com" className="text-gray-400 underline hover:text-white">
                    hello@swiftstacksolutions.com
                  </a>
                  . Swift Stack Solutions, swiftstacksolutions.com.
                </p>
              </form>

              {/* Email fallback */}
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

// ---------- Divider ----------

function HorizonLine() {
  return (
    <div className="relative" aria-hidden="true">
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(42, 160, 230, 0.35) 50%, transparent 95%)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-[600px] rounded-full blur-3xl"
        style={{ background: "rgba(42, 160, 230, 0.06)" }}
      />
    </div>
  )
}

// ---------- Page ----------

export default function HomePage() {
  return (
    <>
      <FAQSchema items={faqItems} />
      <Hero />
      <HorizonLine />
      <TheProblem />
      <HorizonLine />
      <TheSolution />
      <HorizonLine />
      <WhatItChecks />
      <HorizonLine />
      <Results />
      <HorizonLine />
      <Testimonial />
      <HorizonLine />
      <FAQ />
      <CTASection />
    </>
  )
}
