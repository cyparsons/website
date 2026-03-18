"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Plus, Minus } from "lucide-react"
import { DURATION, EASE } from "@/lib/animation"

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduced = useReducedMotion()

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-accent/25 bg-gradient-to-br from-accent/[0.03] to-transparent shadow-md shadow-accent/5"
                : "border-border bg-surface hover:border-accent/15 hover:shadow-sm"
            }`}
          >
            <button
              className="flex w-full cursor-pointer items-center gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              {/* Number indicator */}
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-300 ${
                  isOpen
                    ? "bg-accent text-white"
                    : "bg-surface-alt text-text-tertiary group-hover:bg-accent/10 group-hover:text-accent"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex-1 text-base font-medium text-text-primary">
                {item.question}
              </span>

              <motion.span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                  isOpen ? "bg-accent/10" : "bg-transparent"
                }`}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: reduced ? 0 : 0.2, ease: EASE.easeOut }}
              >
                {isOpen ? (
                  <Minus className="h-4 w-4 text-accent" strokeWidth={2} />
                ) : (
                  <Plus className="h-4 w-4 text-text-tertiary" strokeWidth={2} />
                )}
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: reduced ? 0 : DURATION.accordion, ease: EASE.easeInOut },
                    opacity: { duration: reduced ? 0 : 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pl-6 md:pl-[4.25rem] text-sm leading-relaxed text-text-secondary md:text-base">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
