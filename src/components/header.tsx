"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
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
      className="nav-link relative px-1 py-2 text-base font-medium text-text-secondary transition-colors duration-200 hover:text-accent md:py-1 md:text-sm"
    >
      {label}
      <span
        className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-all duration-200 ease-out"
        aria-hidden="true"
      />
    </a>
  )
}

// Animated hamburger icon that morphs to X
function MenuIcon({ open }: { open: boolean }) {
  // Use path-based approach - more reliable rotation in SVG
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="text-current"
    >
      {/* Top line → rotates to form \ of the X */}
      <motion.path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open
          ? { d: "M 4 4 L 14 14" }
          : { d: "M 2 4 L 16 4" }
        }
        transition={{ duration: 0.3, ease: EASE.smooth }}
      />
      {/* Middle line → fades out */}
      <motion.path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M 2 9 L 16 9"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15, ease: EASE.smooth }}
      />
      {/* Bottom line → rotates to form / of the X */}
      <motion.path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open
          ? { d: "M 4 14 L 14 4" }
          : { d: "M 2 14 L 16 14" }
        }
        transition={{ duration: 0.3, ease: EASE.smooth }}
      />
    </motion.svg>
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
    <>
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

        {/* Mobile: animated hamburger/X */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`relative z-[110] flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 ${
              mobileOpen
                ? "border-white/10 bg-transparent text-white"
                : "border-border bg-surface text-text-tertiary shadow-sm"
            }`}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

    </header>

      {/* Mobile menu — full-screen overlay (outside header to avoid backdrop-filter containing block) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
            style={{ backgroundColor: "#0A1628" }}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE.smooth }}
          >
            {/* Background grid */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.06) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
              aria-hidden="true"
            />
            {/* Glow orb */}
            <div
              className="pointer-events-none absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full opacity-30 blur-[120px]"
              style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.2), transparent 70%)" }}
              aria-hidden="true"
            />

            {/* Top bar: logo + close */}
            <div className="relative flex items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setMobileOpen(false)}
              >
                <Logo textColor="#FFFFFF" className="h-8 w-auto" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white"
              >
                <MenuIcon open={true} />
              </button>
            </div>

            {/* Accent line */}
            <div
              className="mx-6 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(42, 160, 230, 0.3), transparent)" }}
              aria-hidden="true"
            />

            {/* Nav links — centered with hover states */}
            <div className="relative flex flex-1 flex-col items-center justify-center gap-1 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: EASE.smooth }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      const isAnchor = link.href.startsWith("/#")
                      if (isAnchor) {
                        e.preventDefault()
                        setMobileOpen(false)
                        const id = link.href.replace("/#", "")
                        setTimeout(() => {
                          const el = document.getElementById(id)
                          if (el) el.scrollIntoView({ behavior: "smooth" })
                        }, 350)
                      } else {
                        setMobileOpen(false)
                      }
                    }}
                    className="group block rounded-xl px-8 py-3 text-center text-2xl font-semibold text-white/80 transition-all duration-200 hover:bg-white/5 hover:text-accent active:bg-white/10"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full" />
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="relative px-6 pb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35, ease: EASE.smooth }}
            >
              <Link
                href="/contact"
                className="btn-trace inline-flex w-full items-center justify-center px-5 py-3.5 text-base"
                onClick={() => setMobileOpen(false)}
              >
                <span>Get Started</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
