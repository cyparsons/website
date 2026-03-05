"use client"

import { useState, useRef, useEffect, Fragment } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
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
    primaryCta: "Learn More",
    secondaryCta: "Get Started",
    secondaryHref: "#cta",
    badge: "Live Now",
    gradient: "from-[#2AA0E6]/10 to-transparent",
  },
  {
    animation: LienValidationWorkflow,
    title: "Automated Lien Validation",
    subtitle: "PPSA & UCC Filing Verification",
    body: "Automated filing verification for PPSA registrations and UCC filings. Debtor names, collateral descriptions, and registration details compared against the deal package.",
    href: "/solutions/lien-validation",
    primaryCta: "Learn More",
    secondaryCta: "Join the Waitlist",
    secondaryHref: "#cta",
    badge: "Coming Soon",
    gradient: "from-[#006AAE]/10 to-transparent",
  },
  {
    animation: DebtorSearchWorkflow,
    title: "Debtor Search Intelligence",
    subtitle: "Registration Analysis",
    body: "Debtor search results can run hundreds of pages. Intelligence that surfaces existing registrations, general security agreements, and blanket liens in minutes.",
    href: "/solutions/debtor-search",
    primaryCta: "Learn More",
    secondaryCta: "Join the Waitlist",
    secondaryHref: "#cta",
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

const whyCards = [
  {
    title: "Your team handles judgment calls, not data entry",
    body: "Routine extraction and field comparison is automated. Your people step in for exceptions, edge cases, and the decisions that actually need them.",
  },
  {
    title: "Deal 150 gets the same rigor as deal 1",
    body: "Manual review quality drops at volume. Automated verification doesn't get tired, skip fields, or rush before end of day.",
  },
  {
    title: "Built with the teams who do this work",
    body: "Swift Stack is shaped by documentation, funding, and operations teams at equipment finance lenders. Their workflows drive what we build.",
  },
]

const ctaSteps = [
  { number: 1, title: "Analyze", body: "We study your document workflows and verification requirements" },
  { number: 2, title: "Configure", body: "We set up Swift Stack for your specific deal types and business rules" },
  { number: 3, title: "Accelerate", body: "Your team processes more deals with fewer missed deficiencies" },
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
          className="relative flex flex-col items-center"
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
          <div className="relative w-[90%]">
            <HeroAnimation />
          </div>

          {/* Stats row below animation */}
          <motion.div
            className="relative mt-6 flex items-center gap-8 md:gap-12"
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.8 }}
          >
            <div className="text-center">
              <span className="text-2xl font-bold text-accent md:text-3xl">
                <CountUp target={4} suffix="x" />
              </span>
              <p className="mt-1 text-xs text-text-secondary">Faster Verification</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <span className="text-2xl font-bold text-accent md:text-3xl">
                <CountUp target={60} suffix="%" />
              </span>
              <p className="mt-1 text-xs text-text-secondary">COIs with Deficiencies</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <span className="text-2xl font-bold text-accent md:text-3xl">
                <CountUp target={150} suffix="+" />
              </span>
              <p className="mt-1 text-xs text-text-secondary">Deals Verified</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

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


function SolutionCard({ card }: { card: typeof solutionCards[number] }) {
  const [isHovered, setIsHovered] = useState(false)
  const [entryPlay, setEntryPlay] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (inView) {
      setEntryPlay(true)
      const timer = setTimeout(() => setEntryPlay(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [inView])

  const play = entryPlay || isHovered
  const Animation = card.animation

  return (
    <div
      ref={cardRef}
      className="card-shimmer group relative flex h-full flex-col p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient accent at top */}
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.gradient} z-10`} />

      {card.badge && (
        <span className="absolute top-4 right-4 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {card.badge}
        </span>
      )}

      <div className="mb-4 h-24 w-full">
        <Animation play={play} />
      </div>

      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-tertiary">{card.subtitle}</p>
      <h3 className="text-xl font-semibold text-text-primary">
        {card.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {card.body}
      </p>

      {/* CTAs — Learn More primary, secondary below */}
      <div className="mt-auto flex flex-col gap-2 pt-6">
        <Link
          href={card.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all duration-200 hover:gap-2.5"
        >
          {card.primaryCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={card.secondaryHref}
          className="inline-flex items-center gap-1 text-xs text-text-tertiary transition-colors duration-200 hover:text-accent"
        >
          {card.secondaryCta}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
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
          {solutionCards.map((card) => (
            <motion.div
              key={card.href}
              variants={reduced ? undefined : staggerItem}
              className="flex"
            >
              <SolutionCard card={card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function WhySwiftStack() {
  const reduced = useReducedMotion()

  return (
    <section className="relative py-14 md:py-20">
      <div className="absolute inset-0 bg-surface-alt/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start md:gap-16">
          {/* Left: heading */}
          <FadeIn>
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Why Swift Stack</p>
              <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Operational Efficiency Unlocks Human Potential
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Shaped by the documentation, funding, and operations teams who live these workflows every day.
              </p>
            </div>
          </FadeIn>

          {/* Right: slim wide cards */}
          <motion.div
            className="flex flex-col gap-4"
            variants={reduced ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {whyCards.map((card) => (
              <motion.div
                key={card.title}
                variants={reduced ? undefined : staggerItem}
                className="card-glow rounded-xl border border-border px-5 py-4"
              >
                <h3 className="text-sm font-semibold text-text-primary">{card.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">{card.body}</p>
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

function CTASteps() {
  const [activeStep, setActiveStep] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!inView) return
    // Play once: advance through steps, then stop at the end
    let step = -1
    const interval = setInterval(() => {
      step += 1
      setActiveStep(step)
      if (step >= 2) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={ref} className="mx-auto mt-10 max-w-2xl">
      {/* Step circles + connectors + text aligned together */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-0">
        {ctaSteps.map((step, i) => (
          <Fragment key={i}>
            {/* Step column: circle + text */}
            <div className="flex flex-col items-center">
              <motion.div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
                animate={{
                  borderColor: i <= activeStep ? "rgba(42, 160, 230, 1)" : "rgba(255, 255, 255, 0.15)",
                  backgroundColor: i <= activeStep ? "rgba(42, 160, 230, 0.15)" : "transparent",
                  color: i <= activeStep ? "#4DB8F0" : "rgba(255, 255, 255, 0.4)",
                }}
                transition={{ duration: 0.4, ease: EASE.smooth }}
              >
                {step.number}
              </motion.div>
              <motion.div
                className="mt-3 max-w-[160px] text-center"
                animate={{ opacity: i <= activeStep ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-sm font-medium text-white">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">{step.body}</p>
              </motion.div>
            </div>
            {/* Connector line between steps */}
            {i < ctaSteps.length - 1 && (
              <div className="relative mx-3 mt-5 h-px flex-1 min-w-[40px] bg-white/10 self-start">
                <motion.div
                  className="absolute inset-y-0 left-0 h-px bg-accent"
                  animate={{ width: activeStep > i ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: EASE.smooth }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
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

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                COI verification is live and in production. Get in touch to see how
                Swift Stack fits into your document verification workflow.
              </p>

              <CTASteps />

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
