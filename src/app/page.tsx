"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion, useInView, useScroll, useTransform } from "motion/react"
import { ArrowRight, Check, ChevronDown } from "lucide-react"
import Link from "next/link"
import { HeroAnimation } from "@/components/hero-animation"
import { SolutionAnimation } from "@/components/solution-animation"
import { IngestAnimation, AnalyzeAnimation, OutputAnimation } from "@/components/workflow-animations"
import { FadeIn } from "@/components/fade-in"
import { Accordion } from "@/components/accordion"
import { CountUp } from "@/components/count-up"
import { FAQSchema } from "@/components/schema"
import { GridPulses } from "@/components/grid-pulses"
// AnimatedDivider replaced by HorizonLine
import { EASE } from "@/lib/animation"

// ---------- Data ----------

const faqCategories = [
  {
    label: "Product",
    items: [
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
        question: "Is Swift Stack built specifically for equipment finance?",
        answer:
          "Yes. Swift Stack is purpose-built for equipment finance COI verification and pre-funding insurance checks. The system understands multi-asset deals, equipment schedules with dozens or hundreds of serial numbers, and the specific equipment lease insurance requirements that lenders need verified before funding. Generic document tools don't handle this level of detail.",
      },
      {
        question: "What if the AI flags something incorrectly?",
        answer:
          "Every flagged item includes the extracted value, the expected value, and the reason for the flag. Your analyst reviews each one before any action is taken. If a flag is incorrect, it's cleared during review. The system is designed around human-in-the-loop review, so nothing moves forward without your team's sign-off.",
      },
      {
        question: "How does Swift Stack handle renewals?",
        answer:
          "When a renewed COI comes in, Swift Stack compares it against the same deal requirements and equipment schedule as the original. Any changes in coverage, limits, or asset details are flagged so your team can confirm the renewal meets the same standards before updating the file.",
      },
    ],
  },
  {
    label: "Workflow",
    items: [
      {
        question: "How does Swift Stack fit into our existing workflow?",
        answer:
          "Swift Stack automates the repetitive parts of document review. It doesn't replace your existing process or remove human oversight. The system handles extraction and comparison. Your team handles exceptions, judgment calls, and final approval. Human-in-the-loop is a core design principle, not an afterthought.",
      },
      {
        question: "Does Swift Stack integrate with our existing systems?",
        answer:
          "Yes. We currently integrate with Microsoft SharePoint and Outlook for automated file retrieval, with more integrations on the way.",
      },
      {
        question: "What COI formats does Swift Stack support?",
        answer:
          "PDF, scanned images, and digital certificates. The AI extraction layer handles format variations without manual intervention.",
      },
      {
        question: "How quickly are documents processed?",
        answer:
          "Most documents are verified in under 30 seconds.",
      },
      {
        question: "Is training required for my team?",
        answer:
          "Minimal. The review experience is the same as what your team already does, just with verification overlays on the document showing exactly what passed and what was flagged. If your team can read a COI today, they can use Swift Stack.",
      },
    ],
  },
  {
    label: "Compliance",
    items: [
      {
        question: "Do you support audit logs and traceability?",
        answer:
          "Yes. Every AI extraction, every field comparison, every routing decision, and every user action is logged. The full audit trail is available for compliance review at any time.",
      },
      {
        question: "Where is our data stored?",
        answer:
          "All documents and verification results are stored securely in your own environment within SharePoint. Your data stays in your infrastructure.",
      },
      {
        question: "What happens to documents after review?",
        answer:
          "Documents, along with the full verification results and any analyst decisions, are stored in your environment and remain audit-ready. Nothing is deleted unless your team decides to remove it.",
      },
    ],
  },
]

// Flat list for schema
const faqItems = faqCategories.flatMap(c => c.items)

const steps = [
  {
    title: "Ingest",
    brief: "Documents flow in from your existing workflow.",
    detail: "Upload certificates of insurance directly, or connect Swift Stack to Microsoft Outlook and SharePoint for automatic document retrieval. PDFs, scanned images, and digital certificates are all supported. No changes to how your team receives documents.",
    Animation: IngestAnimation,
  },
  {
    title: "Analyze",
    brief: "AI and code logic verify every field.",
    detail: "Each COI is read field by field and compared against your equipment schedule and insurance requirements. All deficiencies are caught in a matter of seconds, such as mismatched serial numbers, incorrect actual cash values, wrong asset descriptions, and missing additional insured. Flagged automatically, whether it's one asset or a hundred.",
    Animation: AnalyzeAnimation,
  },
  {
    title: "Output",
    brief: "A streamlined, exception-based review.",
    detail: "Results are presented as a readable overlay directly on the insurance document. Every field is highlighted with the verification result, so your analyst sees exactly what passed, what deficiencies were found, and why. Your team reviews exceptions, not every line. Every document, along with its streamlined review and final verification, is stored in your environment and audit-ready.",
    Animation: OutputAnimation,
  },
]

// ---------- Helpers ----------


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
            className="text-4xl font-bold leading-[1.1] tracking-tight text-text-primary pb-1 md:text-5xl lg:text-6xl"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.easeInOut }}
          >
            Intelligent COI Verification for Equipment Finance Lenders
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.easeInOut, delay: 0.12 }}
          >
            Pre-funding insurance verification that plugs into your existing process. Faster COI reviews across multi-asset deals, fewer missed deficiencies, more confident results.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.easeInOut, delay: 0.24 }}
          >
            <Link
              href="/contact"
              className="btn-trace inline-flex items-center justify-center px-7 py-3.5 text-base"
            >
              <span>Get Started</span>
            </Link>
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
    <section className="relative flex min-h-screen items-center overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#0A1628" }}>
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
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
          backgroundPosition: "center center",
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
            Pre-Funding Insurance Checks Exist for a Reason.<br />
            The Manual Process Doesn&apos;t Have To.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-8 max-w-[700px] text-center text-base leading-relaxed text-slate-400 md:text-lg">
            Serial numbers, coverage limits, actual cash values, endorsements, loss payee, additional insured. These fields get checked on every COI that comes through because they protect your position on the asset. On multi-asset deals, every item on the equipment schedule means more to verify, more deficiencies to catch, and more time before funding. Pre-funding insurance reviews are necessary. The way they get done can be improved.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ---------- Section 3: The Solution ----------

function TheSolution() {
  return (
    <section id="solution" className="relative overflow-hidden py-16 pb-20 md:py-20 md:pb-28">
      {/* Grid */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
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
            Your Team Reviews Exceptions.<br />
            Swift Stack Handles the Rest.
          </h2>
        </FadeIn>

        {/* Animation */}
        <FadeIn delay={0.15}>
          <div className="mt-8">
            <SolutionAnimation />
          </div>
        </FadeIn>

      </div>
    </section>
  )
}

// ---------- Section 4: How It Works (Timeline) ----------

function TimelineNode({ number, inView: isVisible }: { number: number; inView: boolean }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent bg-white text-sm font-bold text-accent shadow-sm cursor-default"
      initial={reduced ? undefined : { scale: 0, opacity: 0 }}
      animate={isVisible || reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE.smooth }}
      whileHover={{
        scale: 1.15,
        boxShadow: "0 0 20px 4px rgba(42, 160, 230, 0.25), 0 0 40px 8px rgba(42, 160, 230, 0.1)",
        transition: { duration: 0.2 },
      }}
    >
      {number}
    </motion.div>
  )
}

function StepText({ step, index, isVisible }: { step: typeof steps[number]; index: number; isVisible: boolean }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="flex flex-col justify-center"
      initial={reduced ? undefined : { opacity: 0, x: 40 }}
      animate={isVisible || reduced ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold text-text-primary md:text-2xl">{step.title}</h3>
      <p className="mt-2 max-w-md text-base font-medium leading-relaxed text-text-primary/80 md:text-lg">
        {step.brief}
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-text-tertiary">
        {step.detail}
      </p>
    </motion.div>
  )
}

function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const step0Ref = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const stepRefs = [step0Ref, step1Ref, step2Ref]

  // Scroll-driven timeline line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })
  const reduced = useReducedMotion()
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Per-step visibility for node animations
  const s0Visible = useInView(step0Ref, { once: true, amount: 0.3 })
  const s1Visible = useInView(step1Ref, { once: true, amount: 0.3 })
  const s2Visible = useInView(step2Ref, { once: true, amount: 0.3 })
  const stepVisible = [s0Visible, s1Visible, s2Visible]

  return (
    <section id="how-it-works" className="relative overflow-visible py-16 pb-28 md:py-24 md:pb-36">
      {/* Background grid */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
          maskImage: "radial-gradient(ellipse 600px 500px at 50% 40%, rgba(0,0,0,0.5), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 600px 500px at 50% 40%, rgba(0,0,0,0.5), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full opacity-20 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">How It Works</p>
            <h2 className="text-gradient pb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Built Around How Your Team Already Works
            </h2>
          </div>
        </FadeIn>

        <div ref={sectionRef} className="relative mt-16">
          {/* ── Mobile layout ── */}
          <div className="md:hidden">
            {/* Mobile timeline line */}
            <div className="pointer-events-none absolute left-5 top-0 bottom-0" style={{ width: "2px" }}>
              <div className="absolute inset-0 rounded-full bg-border/30" />
              <motion.div
                className="absolute inset-x-0 top-0 bottom-0 origin-top rounded-full"
                style={{
                  scaleY: reduced ? 1 : scaleY,
                  background: "linear-gradient(180deg, var(--color-accent), rgba(42, 160, 230, 0.2))",
                }}
              />
            </div>
            {steps.map((step, i) => {
              const Animation = step.Animation
              return (
                <div key={step.title} ref={stepRefs[i]} className="relative py-10 pl-14">
                  <div className="absolute left-0 top-10">
                    <TimelineNode number={i + 1} inView={stepVisible[i]} />
                  </div>
                  <div className="mb-5">
                    <Animation />
                  </div>
                  <StepText step={step} index={i} isVisible={stepVisible[i]} />
                </div>
              )
            })}
          </div>

          {/* ── Desktop layout: animation | timeline | text — per step, sticky parallax ── */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline line — exactly centered */}
              <div className="pointer-events-none absolute top-0 bottom-0" style={{ left: "calc(50% - 1px)", width: "2px" }}>
                <div className="absolute inset-0 rounded-full bg-border/30" />
                <motion.div
                  className="absolute inset-x-0 top-0 bottom-0 origin-top rounded-full"
                  style={{
                    scaleY: reduced ? 1 : scaleY,
                    background: "linear-gradient(180deg, var(--color-accent), rgba(42, 160, 230, 0.2))",
                  }}
                />
              </div>

              {steps.map((step, i) => {
                const Animation = step.Animation
                const mirrored = i === 1
                return (
                  <div key={step.title} ref={stepRefs[i]} className="min-h-[100vh] first:pt-16 last:pb-16">
                    <div className="sticky top-[28vh] py-8 grid grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
                      {/* Left column */}
                      {mirrored ? (
                        <StepText step={step} index={i} isVisible={stepVisible[i]} />
                      ) : (
                        <div className="flex justify-end">
                          <Animation />
                        </div>
                      )}
                      {/* Center: timeline node */}
                      <div className="flex justify-center" style={{ width: "44px" }}>
                        <TimelineNode number={i + 1} inView={stepVisible[i]} />
                      </div>
                      {/* Right column */}
                      {mirrored ? (
                        <div className="flex justify-start">
                          <Animation />
                        </div>
                      ) : (
                        <StepText step={step} index={i} isVisible={stepVisible[i]} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Section 5: Results ----------

const statDetails = {
  speed: "As deal volume grows and multi-asset COIs stack up, manual review becomes a bottleneck. Your team gets that time back for resolving deficiencies, moving deals to funding, and focusing on higher-value work.",
  accuracy: "The deficiencies that matter most in equipment lease insurance are often the easiest to miss at volume. Mismatched serial numbers, incorrect actual cash values, missing endorsements. Consistent, automated review means fewer slip through before funding.",
}

function Results() {
  const [activeStat, setActiveStat] = useState<"speed" | "accuracy" | null>(null)

  return (
    <section id="results" className="relative flex min-h-screen items-center overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#0A1628" }}>
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
        }}
        aria-hidden="true"
      />
      {/* Bright grid near orb */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
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
      {/* Glow orb — left */}
      <div
        className="pointer-events-none absolute top-[40%] left-[25%] -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full opacity-35 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.22), transparent 70%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — right */}
      <div
        className="pointer-events-none absolute top-[35%] left-[75%] -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.18), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-accent">Results</p>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            What This Looks Like in Production
          </h2>
        </FadeIn>

        <div className="mx-auto mt-16 max-w-3xl" onMouseLeave={() => setActiveStat(null)}>
          {/* Stats row — always visible */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-10">
            {/* Speed stat */}
            <FadeIn delay={0.1}>
              <motion.div
                className="cursor-pointer text-center"
                animate={{
                  filter: activeStat === "speed"
                    ? "drop-shadow(0 0 14px rgba(56, 182, 255, 0.35)) drop-shadow(0 0 30px rgba(42, 160, 230, 0.2))"
                    : "drop-shadow(0 0 0px rgba(56, 182, 255, 0))",
                }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveStat(prev => prev === "speed" ? null : "speed")}
                onMouseEnter={() => setActiveStat("speed")}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div
                  className="mx-auto mb-6 h-0.5 w-12 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
                />
                <div className="text-7xl font-bold md:text-8xl">
                  <CountUp
                    target={4}
                    suffix="x"
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #4DB8F0 0%, #2AA0E6 50%, #38B6FF 100%)" }}
                  />
                </div>
                <p className="mt-4 text-lg font-semibold text-white">Faster COI Reviews</p>
              </motion.div>
            </FadeIn>

            {/* Divider */}
            <div className="flex items-center justify-center" aria-hidden="true">
              <div
                className="h-24 w-px md:h-32"
                style={{ background: "linear-gradient(180deg, transparent, rgba(42, 160, 230, 0.3), transparent)" }}
              />
            </div>

            {/* Accuracy stat */}
            <FadeIn delay={0.2}>
              <motion.div
                className="cursor-pointer text-center"
                animate={{
                  filter: activeStat === "accuracy"
                    ? "drop-shadow(0 0 14px rgba(56, 182, 255, 0.35)) drop-shadow(0 0 30px rgba(42, 160, 230, 0.2))"
                    : "drop-shadow(0 0 0px rgba(56, 182, 255, 0))",
                }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveStat(prev => prev === "accuracy" ? null : "accuracy")}
                onMouseEnter={() => setActiveStat("accuracy")}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div
                  className="mx-auto mb-6 h-0.5 w-12 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
                />
                <div className="text-7xl font-bold md:text-8xl">
                  <CountUp
                    target={99}
                    suffix="%"
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #4DB8F0 0%, #2AA0E6 50%, #38B6FF 100%)" }}
                  />
                </div>
                <p className="mt-4 text-lg font-semibold text-white">Deficiency Detection Accuracy</p>
              </motion.div>
            </FadeIn>
          </div>

          {/* Active indicator line */}
          <div className="relative mt-8">
            <div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent 5%, rgba(42, 160, 230, 0.15) 50%, transparent 95%)" }}
            />
            {/* Sliding highlight */}
            <motion.div
              className="absolute top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(56, 182, 255, 0.6), transparent)" }}
              animate={{
                left: activeStat === "speed" ? "0%" : activeStat === "accuracy" ? "50%" : "25%",
                width: activeStat ? "50%" : "0%",
                opacity: activeStat ? 1 : 0,
              }}
              transition={{ duration: 0.35, ease: EASE.smooth }}
            />
          </div>

          {/* Shared detail area — fixed height to prevent layout shift */}
          <div className="relative h-24 md:h-20">
            <AnimatePresence mode="wait">
              {activeStat && (
                <motion.div
                  key={activeStat}
                  className="absolute inset-x-0 top-0 mx-auto max-w-xl pt-6 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE.smooth }}
                >
                  <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                    {statDetails[activeStat]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
          backgroundPosition: "center center",
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

      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          className="relative rounded-2xl border border-border/60 bg-surface px-8 py-10 md:px-12 md:py-14"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE.easeInOut }}
        >
          {/* Accent top line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
            aria-hidden="true"
          />

          <div className="text-center">
            {/* Decorative quote mark */}
            <svg className="mx-auto mb-6 h-10 w-10 text-accent opacity-50" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>

            <blockquote className="text-xl leading-relaxed text-text-primary md:text-2xl">
              &ldquo;Swift Stack made our COI renewal reviews faster and more consistent, with better visibility into coverage gaps. They were responsive and easy to work with, helping us save time and strengthen risk controls.&rdquo;
            </blockquote>

            <p className="mt-6 text-sm font-semibold text-text-primary">
              Carrie Freeman, Director of Operations
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Dynamic Capital
            </p>

            <Link
              href="/case-studies/dynamic-capital"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
            >
              Read the full case study
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Section 7: FAQ ----------

function FAQ() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="faq" className="relative min-h-screen overflow-hidden py-20 md:py-28">
      {/* Grid */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
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
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-accent">FAQ</p>
          <h2 className="text-gradient text-center text-3xl font-bold tracking-tight md:text-4xl">
            What Lenders Ask Us
          </h2>
        </FadeIn>

        {/* Category tabs */}
        <FadeIn delay={0.1}>
          <div className="relative mt-10 grid grid-cols-3 gap-4 mx-auto max-w-md">
            {faqCategories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                className={`relative cursor-pointer rounded-full px-6 py-2 text-center text-sm font-medium transition-all duration-250 ${
                  activeTab === i
                    ? "text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {/* Active pill background */}
                {activeTab === i && (
                  <motion.span
                    layoutId="faq-tab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ duration: 0.3, ease: EASE.smooth }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Tab content */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE.smooth }}
            >
              <Accordion items={faqCategories[activeTab].items} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ---------- Section 8: CTA ----------

function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden" style={{ backgroundColor: "#0A1628" }}>
      {/* Grid — covers entire section including fade zone */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
        }}
        aria-hidden="true"
      />
      {/* Bright grid near glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
          maskImage: "radial-gradient(ellipse 500px 400px at 50% 60%, rgba(0,0,0,0.5), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 500px 400px at 50% 60%, rgba(0,0,0,0.5), transparent)",
        }}
        aria-hidden="true"
      />
      <GridPulses variant="dark" />
      {/* Radial fade to edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 60%, transparent 30%, #0A1628 75%)" }}
        aria-hidden="true"
      />
      {/* Glow orb — center */}
      <div
        className="pointer-events-none absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[500px] w-[650px] rounded-full opacity-40 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.25), transparent 65%)" }}
        aria-hidden="true"
      />

      {/* CTA content */}
      <div className="relative flex min-h-[80vh] items-center pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Fewer Missed Deficiencies. Faster Funding.
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-400 md:text-lg">
              See what changes when your team reviews exceptions instead of every field on every document.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="btn-trace inline-flex items-center justify-center px-8 py-3.5 text-base"
              >
                <span>Get Started</span>
              </Link>
            </div>

          </FadeIn>
        </div>
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
      <HowItWorks />
      <HorizonLine />
      <Results />
      <HorizonLine />
      <Testimonial />
      <HorizonLine />
      <FAQ />
      {/* No HorizonLine — CTA gradient fade handles the transition */}
      <CTASection />
    </>
  )
}
