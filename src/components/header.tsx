"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { EASE } from "@/lib/animation"

const solutions = [
  { label: "COI Verification", href: "/solutions/coi-verification", live: true },
  { label: "Lien Validation", href: "/solutions/lien-validation" },
  { label: "Debtor Search Intelligence", href: "/solutions/debtor-search" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-surface/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Swift Stack Solutions"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold text-text-primary">
            Swift Stack
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              aria-expanded={solutionsOpen}
            >
              Solutions
              <motion.span
                animate={{ rotate: solutionsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  className="absolute left-0 top-full mt-3 w-60 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-xl shadow-black/5"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, ease: EASE.easeOut }}
                >
                  {solutions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors duration-150 hover:bg-surface-alt hover:text-text-primary"
                    >
                      {item.label}
                      {item.live && (
                        <span className="rounded-full bg-verified/10 px-2 py-0.5 text-[10px] font-medium text-verified">Live</span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/blog"
            className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="#"
            className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
          >
            Log In
          </Link>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center justify-center px-5 py-2.5 text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-text-primary" />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] border-l border-border bg-surface shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: EASE.smooth }}
            >
              <div className="p-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="mb-8"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-text-primary" />
                </button>

                <div className="flex flex-col gap-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                    Solutions
                  </p>
                  {solutions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="pl-2 text-base text-text-secondary transition-colors duration-150 hover:text-text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <hr className="my-2 border-border" />

                  <Link href="/blog" className="text-base text-text-secondary hover:text-text-primary" onClick={() => setMobileOpen(false)}>Blog</Link>
                  <Link href="/contact" className="text-base text-text-secondary hover:text-text-primary" onClick={() => setMobileOpen(false)}>Contact</Link>
                  <Link href="#" className="text-base text-text-secondary hover:text-text-primary" onClick={() => setMobileOpen(false)}>Log In</Link>

                  <Link
                    href="/contact"
                    className="btn-primary mt-4 inline-flex items-center justify-center px-5 py-3 text-base"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
