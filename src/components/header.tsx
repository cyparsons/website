"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { EASE } from "@/lib/animation"
import { Logo } from "@/components/logo"

const navLinks = [
  { label: "Solution", href: "/#solution" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Results", href: "/#results" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
]

function NavLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const isHomepageAnchor = href.startsWith("/#")

  function handleClick(e: React.MouseEvent) {
    if (isHomepageAnchor) {
      e.preventDefault()
      onClick?.()
      const id = href.replace("/#", "")
      if (pathname === "/") {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        router.push(href)
      }
    } else {
      onClick?.()
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="nav-link relative px-1 py-1 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent"
    >
      {label}
      <span
        className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-all duration-200 ease-out"
        aria-hidden="true"
      />
    </a>
  )
}

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
        <Link
          href="/"
          className="flex items-center"
          onClick={() => {
            if (window.location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          }}
        >
          <Logo textColor="var(--color-text-primary)" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} label={link.label} href={link.href} />
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href="https://app.swiftcoi.ai/"
            className="nav-link relative px-1 py-1 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent"
          >
            Log In
            <span
              className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-all duration-200 ease-out"
              aria-hidden="true"
            />
          </a>
          <Link
            href="/contact"
            className="btn-trace inline-flex items-center justify-center px-5 py-2 text-sm"
          >
            <span>Get Started</span>
          </Link>
        </div>

        {/* Mobile: Get Started always visible + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/contact"
            className="btn-trace inline-flex items-center justify-center px-4 py-2 text-sm"
          >
            <span>Get Started</span>
          </Link>
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

                <div className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      label={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                    />
                  ))}
                  <div className="mt-2 border-t border-border/50 pt-5 flex flex-col gap-4">
                    <a
                      href="https://app.swiftcoi.ai/"
                      className="text-base text-text-secondary hover:text-accent transition-colors duration-200"
                      onClick={() => setMobileOpen(false)}
                    >
                      Log In
                    </a>
                    <Link
                      href="/contact"
                      className="btn-trace inline-flex w-full items-center justify-center px-5 py-3 text-sm"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Get Started</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
