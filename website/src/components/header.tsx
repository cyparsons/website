"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { EASE } from "@/lib/animation"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
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

  function scrollToCTA(e: React.MouseEvent) {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.getElementById("cta")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

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
        <div className="hidden items-center md:flex">
          <a
            href="#cta"
            onClick={scrollToCTA}
            className="btn-primary inline-flex items-center justify-center px-5 py-2.5 text-sm"
          >
            Get Started
          </a>
        </div>

        {/* Mobile: Get Started always visible + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#cta"
            onClick={scrollToCTA}
            className="btn-primary inline-flex items-center justify-center px-4 py-2 text-sm"
          >
            Get Started
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-text-primary" />
          </button>
        </div>
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
                  <Link
                    href="/blog"
                    className="text-base text-text-secondary hover:text-text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="text-base text-text-secondary hover:text-text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact
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
