"use client"

import { useState, useRef, useEffect, Fragment } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
import Link from "next/link"
import { ArrowRight, Linkedin } from "lucide-react"
import Image from "next/image"
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
    body: "Automatically verify COIs against your insurance requirements, previously approved COIs, and equipment schedules. Serial number verification, coverage checks, and multi-asset deals reviewed 4x faster, saving hundreds of hours every month.",
    href: "/solutions/coi-verification",
    primaryCta: "Learn More",
    secondaryCta: "Get Started",
    secondaryHref: "/contact",
    badge: "Live Now",
    gradient: "from-[#2AA0E6]/10 to-transparent",
  },
  {
    animation: LienValidationWorkflow,
    title: "Automated Lien Validation",
    subtitle: "PPSA & UCC Filing Verification",
    body: "We're building automated filing verification for PPSA registrations and UCC filings. Debtor names, collateral descriptions, and registration details compared against the deal package before they go out.",
    href: "/solutions/lien-validation",
    primaryCta: "Learn More",
    secondaryCta: "Join the Waitlist",
    secondaryHref: "/contact",
    badge: "Coming Soon",
    gradient: "from-[#006AAE]/10 to-transparent",
  },
  {
    animation: DebtorSearchWorkflow,
    title: "Debtor Search Intelligence",
    subtitle: "Registration Analysis",
    body: "Debtor search results can run hundreds of pages. We're building intelligence that cuts through the volume, surfacing existing registrations, general security agreements, and blanket liens so your team can assess the full picture in minutes instead of hours.",
    href: "/solutions/debtor-search",
    primaryCta: "Learn More",
    secondaryCta: "Join the Waitlist",
    secondaryHref: "/contact",
    badge: "Coming Soon",
    gradient: "from-[#003263]/10 to-transparent",
  },
]

const problemCards = [
  {
    animation: ManualWorkflow,
    title: "Manual",
    body: "Your team opens PDFs, reads fields line by line, and cross-references data against deal requirements by hand.",
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

const teamMembers = [
  {
    name: "Your Name",
    title: "Co-Founder & CEO",
    photo: "/team/placeholder-1.jpg",
    linkedin: "https://linkedin.com/in/yourprofile",
    bio: "Background in equipment finance operations with experience leading documentation and funding teams. Built Swift Stack to solve the verification bottleneck that slows down every deal.",
  },
  {
    name: "Coworker Name",
    title: "Co-Founder & CTO",
    photo: "/team/placeholder-2.jpg",
    linkedin: "https://linkedin.com/in/coworkerprofile",
    bio: "Engineering background with deep expertise in document intelligence and AI systems. Designed the verification engine that powers Swift Stack's field-level comparison and deficiency detection.",
  },
]

const ctaSteps = [
  { number: 1, title: "Analyze", body: "We review your workflows\nand verification needs" },
  { number: 2, title: "Configure", body: "Set up for your deal types\nand document rules" },
  { number: 3, title: "Accelerate", body: "Automated verification\nrunning on your documents" },
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
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      {/* Line grid background */}
      <div
        className="bg-line-grid-fade pointer-events-none absolute inset-0"
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
            Document Intelligence for Equipment Finance
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.2 }}
          >
            Automate the pre-funding document checks between approval and payout. Less
            manual review. Fewer missed deficiencies. Faster funding.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
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
        </motion.div>
      </div>

    </section>
  )
}

function Problem() {
  const reduced = useReducedMotion()

  return (
    <section className="relative py-20 md:py-28">
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
            Between deal approval and funding, your documentation team manually verifies every document in the deal package. The rules are clear, but the work adds up.
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
        <span className={`absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${card.badge === "Live Now" ? "bg-verified/10 text-verified" : "bg-accent/10 text-accent"}`}>
          {card.badge === "Live Now" && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
            </span>
          )}
          {card.badge}
        </span>
      )}

      <div className="mb-4 h-40 w-full">
        <Animation play={play} />
      </div>

      <h3 className="text-xl font-semibold text-text-primary">
        {card.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {card.body}
      </p>

      {/* CTAs — Action primary, Learn More secondary */}
      <div className="mt-auto flex flex-col gap-2 pt-6">
        <Link
          href={card.secondaryHref}
          className="cta-arrow inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
        >
          {card.secondaryCta}
          <span className="inline-flex transition-transform duration-200">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        <Link
          href={card.href}
          className="text-xs text-text-tertiary transition-colors duration-200 hover:text-accent"
        >
          {card.primaryCta}
        </Link>
      </div>
    </div>
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

function AboutSwiftStack() {
  const reduced = useReducedMotion()

  return (
    <section className="relative flex min-h-screen flex-col justify-center py-14 md:py-20">
      <div className="absolute inset-0 bg-surface-alt/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">About Swift Stack</p>
            <h2 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Built by People Who Know This Work
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Swift Stack was built alongside the documentation, funding, and operations teams who live these workflows every day.
            </p>
          </div>
        </FadeIn>

        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-2"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={reduced ? undefined : staggerItem}
              className="card-glow flex flex-col items-center rounded-2xl border border-border p-8 text-center"
            >
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-surface-alt">
                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-text-tertiary">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text-primary">{member.name}</h3>
              <p className="text-sm font-medium text-accent">{member.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{member.bio}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-tertiary transition-colors duration-200 hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function WhySwiftStack() {
  return (
    <section className="relative py-16 md:py-24">
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
          <div className="mt-8 space-y-6 text-center">
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              We believe operational efficiency unlocks human potential. When your team isn&apos;t buried in repetitive document review, they&apos;re more focused, more alert, and more present for the work that actually requires their judgment.
            </p>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              Swift Stack is shaped by the people who live these workflows every day. The documentation, funding, and operations teams who do this work are the ones driving what we build and how we build it.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote: "Swift Stack cut our COI review time by 75%. What used to take our team hours of manual checking now happens in minutes, with higher accuracy than we ever achieved by hand.",
    name: "Placeholder Name",
    title: "VP Operations",
    company: "Mid-Market Equipment Finance Lender",
  },
]

function Testimonials() {
  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">What Our Clients Say</p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-8 md:p-12">
            <svg className="mb-6 h-8 w-8 text-accent opacity-40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <blockquote className="text-lg leading-relaxed text-text-primary md:text-xl">
              {testimonials[0].quote}
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                {testimonials[0].name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{testimonials[0].name}</p>
                <p className="text-sm text-text-secondary">{testimonials[0].title}, {testimonials[0].company}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="relative py-20 md:py-28">
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
                className="mt-3 max-w-[200px] text-center"
                animate={{ opacity: i <= activeStep ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-sm font-medium text-white">{step.title}</p>
                <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-gray-400">{step.body}</p>
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
    <section id="cta" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
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
                COI verification is live and in production. Lien validation and debtor search intelligence are on the way. Get in touch to see how Swift Stack fits into your document verification workflow.
              </p>

              <CTASteps />

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
      {/* <SectionDivider />
      <AboutSwiftStack /> */}
      <SectionDivider />
      <WhySwiftStack />
      {/* <SectionDivider />
      <Testimonials />
      <SectionDivider /> */}
      <FAQ />
      <CTA />
    </>
  )
}
