import type { Metadata } from "next"
import Link from "next/link"
import { Clock, ShieldAlert, Target, Zap, CheckCircle2 } from "lucide-react"
import { BreadcrumbSchema } from "@/components/schema"
import { FadeIn } from "@/components/fade-in"
import { CountUp } from "@/components/count-up"

export const metadata: Metadata = {
  title: "Case Study: Dynamic Capital | Swift Stack",
  description:
    "How Dynamic Capital streamlined COI renewal reviews, saving 150+ hours per month with 99% accuracy using Swift Stack's AI-powered verification platform.",
  openGraph: {
    title: "Case Study: Dynamic Capital | Swift Stack",
    description:
      "How Dynamic Capital streamlined COI renewal reviews, saving 150+ hours per month with 99% accuracy.",
    type: "article",
  },
}

const objectives = [
  "Free up analysts for higher-value work rather than repetitive scanning",
  "Reduce risk by improving consistency and catching misses",
  "Increase lending capacity by streamlining repetitive workflows",
]

export default function DynamicCapitalCaseStudy() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
          { name: "Dynamic Capital", href: "/case-studies/dynamic-capital" },
        ]}
      />

      <main className="relative pt-28 pb-0 md:pt-36">
        {/* Background */}
        <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 15%, transparent 40%, var(--color-surface) 80%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[5%] left-[50%] -translate-x-1/2 h-[400px] w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.12), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-6">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-tertiary transition-colors duration-200 hover:text-accent"
            >
              &larr; Back to Home
            </Link>
          </FadeIn>

          {/* ---------- Hero ---------- */}
          <header className="mb-16 md:mb-20">
            <FadeIn>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
                Case Study
              </p>
              <h1 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                How Dynamic Capital Streamlined COI Renewal Reviews
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                Dynamic Capital&apos;s documentation team was spending over 200 hours a month on manual COI reviews. Swift Stack cut that by 75%, giving the team capacity back without adding headcount.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                className="mt-10 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
                aria-hidden="true"
              />
            </FadeIn>
          </header>

          {/* ---------- Challenge ---------- */}
          <section className="mb-16 md:mb-20">
            <FadeIn>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
                The Challenge
              </p>
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                Manual reviews at scale
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
                Dynamic Capital&apos;s COI renewal workflow, like many lenders&apos;, was manual, time-consuming, and riskier than it needed to be. Combing through large and inconsistent COIs, their analysts had to spend long hours validating insurance requirements and matching sometimes hundreds of serial numbers. This manual process required intense focus and repetition, which created two compounding issues.
              </p>
            </FadeIn>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <FadeIn delay={0.1}>
                <div className="card-modern flex h-full flex-col p-6 md:p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">Hours Lost Reviewing</h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary">
                    Review time could range from minutes to hours depending on COI complexity, and this effort scaled with deal volume. In total, analysts were spending over 200 hours a month reviewing COI renewals.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="card-modern flex h-full flex-col p-6 md:p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <ShieldAlert className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">Missed Coverage Gaps</h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary">
                    Manual review under time pressure can lead to missed coverage gaps, inconsistencies, or mismatches that matter for secured assets and proper coverage.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Objectives */}
            <FadeIn delay={0.15}>
              <div className="mt-10">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">The objective was clear</h3>
                <ul className="space-y-3">
                  {objectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-3">
                      <Target className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-base leading-relaxed text-text-secondary">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </section>

          {/* ---------- Solution ---------- */}
          <section className="mb-16 md:mb-20">
            <FadeIn>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
                The Solution
              </p>
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                Built around the real workflow
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
                We built a COI Verification and Renewal Platform designed around Dynamic Capital&apos;s real workflow. Instead of asking analysts to read every document from scratch, the platform analyzes incoming COIs against reference information and surfaces what matters in a clear, reviewable format inside the original PDFs.
              </p>
            </FadeIn>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <FadeIn delay={0.1}>
                <div className="card-modern flex h-full flex-col p-6 md:p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">AI-Powered Verification</h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary">
                    The system surfaces only what requires attention, so analysts can focus on exceptions rather than validating coverage details manually, saving immense review time at scale.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="card-modern flex h-full flex-col p-6 md:p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">In-Document Highlighting</h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary">
                    Findings are presented with clear in-document highlighting, which enables analysts to verify with speed, precision, and confidence. This output method reduces missed errors that would have otherwise presented real risk and costly rework.
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ---------- Results ---------- */}
          <section className="mb-16 md:mb-20">
            <FadeIn>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
                Results
              </p>
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                Results at a glance
              </h2>
            </FadeIn>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <FadeIn delay={0.1}>
                <div className="card-modern flex flex-col items-center p-8 text-center">
                  <CountUp
                    target={4}
                    suffix="x"
                    className="text-gradient text-5xl font-bold md:text-6xl"
                  />
                  <p className="mt-3 text-base font-medium text-text-secondary">
                    Faster COI renewal throughput
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="card-modern flex flex-col items-center p-8 text-center">
                  <CountUp
                    target={150}
                    suffix="+"
                    className="text-gradient text-5xl font-bold md:text-6xl"
                  />
                  <p className="mx-auto mt-3 max-w-[10rem] text-base font-medium text-text-secondary">
                    Hours saved per month
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="card-modern flex flex-col items-center p-8 text-center">
                  <CountUp
                    target={99}
                    suffix="%"
                    className="text-gradient text-5xl font-bold md:text-6xl"
                  />
                  <p className="mt-3 text-base font-medium text-text-secondary">
                    Accuracy on verification outputs
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ---------- Conclusion ---------- */}
          <section className="mb-16 md:mb-20">
            <FadeIn>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
                Conclusion
              </p>
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                More capacity, better controls
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
                With a faster and more consistent COI renewal workflow, Dynamic Capital created more capacity within the insurance team without adding headcount. Reviews became more standardized, exceptions became easier to spot, and analysts could spend their attention on higher-value decisions instead of repetitive document scanning.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
                The result was a measurable increase in Dynamic Capital&apos;s operational effectiveness, with better risk controls, fewer bottlenecks, and less time spent on repetitive, low-value work.
              </p>
            </FadeIn>
          </section>

        </div>
      </main>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A1628" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.2), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative flex min-h-[80vh] items-center pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              See What Swift Stack Can Do for Your Team
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400">
              Dynamic Capital&apos;s results are just the beginning. Get in touch to see how Swift Stack can streamline your document verification workflows.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
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
    </>
  )
}
