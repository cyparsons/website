"use client"

import { useState } from "react"
import Link from "next/link"
import { Send, CheckCircle2, ArrowRight, AlertCircle } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const HUBSPOT_PORTAL_ID = "342638668"
const HUBSPOT_FORM_ID = "a371dfee-da93-4ea1-8266-94a85751008b"

interface FieldErrors {
  name?: string
  email?: string
  company?: string
}

function validateFields(data: FormData): FieldErrors {
  const errors: FieldErrors = {}
  const name = (data.get("name") as string).trim()
  const email = (data.get("email") as string).trim()
  const company = (data.get("company") as string).trim()

  if (!name) errors.name = "Please enter your name"
  if (!email) {
    errors.email = "Please enter your email"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address"
  }
  if (!company) errors.company = "Please enter your company name"

  return errors
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const errors = validateFields(data)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    setError(false)

    const fields = [
      { objectTypeId: "0-1", name: "full_name", value: data.get("name") as string },
      { objectTypeId: "0-1", name: "email", value: data.get("email") as string },
      { objectTypeId: "0-1", name: "company", value: data.get("company") as string },
      { objectTypeId: "0-1", name: "jobtitle", value: data.get("jobtitle") as string },
      { objectTypeId: "0-1", name: "message", value: data.get("message") as string },
    ].filter((f) => f.value)

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields,
            context: {
              pageUri: window.location.href,
              pageName: "Get Started",
            },
          }),
        }
      )

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  function clearFieldError(field: keyof FieldErrors) {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  return (
    <main className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 20%, transparent 40%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[10%] left-[30%] -translate-x-1/2 h-[500px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ---------- Left: Content ---------- */}
          <div className="flex flex-col">
            <FadeIn>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
                Get Started
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl pb-1">
                From Every Field to Just Exceptions
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                Whether you&apos;re managing COI reviews across multi-asset deals, handling renewal volumes, or looking to reduce deficiencies before funding, we can help your team move faster with fewer misses.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-tertiary">
                Not sure if we&apos;re the right fit? We&apos;re always happy to chat about document verification, AI in financial operations, or where this space is headed. No pitch required.
              </p>
            </FadeIn>
          </div>

          {/* ---------- Right: Form ---------- */}
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl border border-border/60 bg-surface p-8 md:p-10">
              {/* Accent top line */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
                aria-hidden="true"
              />

              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle2 className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
                    Message sent
                  </h2>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-text-secondary">
                    We&apos;ll be in touch within one business day.
                  </p>
                  <p className="mt-6 text-sm text-text-tertiary">
                    In the meantime, follow along where we share the latest.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 w-full md:flex-row md:w-auto md:gap-4">
                    <Link
                      href="/blog"
                      className="btn-trace inline-flex items-center justify-center gap-1.5 px-5 py-3 text-sm"
                    >
                      <span>Read our blog</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href="https://www.linkedin.com/company/swift-stack-solutions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-trace inline-flex items-center justify-center gap-1.5 px-5 py-3 text-sm"
                    >
                      <span>Follow on LinkedIn</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h2 className="mb-6 text-xl font-semibold text-text-primary md:text-2xl">
                    Send us a message
                  </h2>

                  {error && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <p className="text-sm text-red-400">
                        Something went wrong. Please try again or email us directly at{" "}
                        <a href="mailto:hello@swiftstacksolutions.com" className="underline">
                          hello@swiftstacksolutions.com
                        </a>
                      </p>
                    </div>
                  )}

                  {/* Full name */}
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-primary">
                      Full name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={() => clearFieldError("name")}
                      className={`w-full rounded-lg border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-all duration-150 focus:outline-none focus:ring-1 ${
                        fieldErrors.name
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
                          : "border-border focus:border-accent focus:ring-accent"
                      }`}
                      placeholder="Jane Smith"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Work email */}
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-primary">
                      Work email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={() => clearFieldError("email")}
                      className={`w-full rounded-lg border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-all duration-150 focus:outline-none focus:ring-1 ${
                        fieldErrors.email
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
                          : "border-border focus:border-accent focus:ring-accent"
                      }`}
                      placeholder="jane@company.com"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-text-primary">
                      Company <span className="text-accent">*</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      onChange={() => clearFieldError("company")}
                      className={`w-full rounded-lg border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-all duration-150 focus:outline-none focus:ring-1 ${
                        fieldErrors.company
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
                          : "border-border focus:border-accent focus:ring-accent"
                      }`}
                      placeholder="Acme Financial"
                    />
                    {fieldErrors.company && (
                      <p className="mt-1.5 text-xs text-red-400">{fieldErrors.company}</p>
                    )}
                  </div>

                  {/* Job Title */}
                  <div>
                    <label htmlFor="jobtitle" className="mb-1.5 block text-sm font-medium text-text-primary">
                      Job Title <span className="text-text-tertiary font-normal">(optional)</span>
                    </label>
                    <input
                      id="jobtitle"
                      name="jobtitle"
                      type="text"
                      className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-all duration-150 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="VP Operations"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-primary">
                      Message <span className="text-text-tertiary font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-all duration-150 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Tell us about your COI review process, deal volume, or what you're looking to improve"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-trace inline-flex w-full cursor-pointer items-center justify-center gap-2 px-6 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{submitting ? "Sending..." : "Send Message"}</span>
                    {!submitting && <Send className="h-4 w-4" />}
                  </button>

                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  )
}
