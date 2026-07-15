"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

export interface ModalItem {
  // Icon badge shown at the row's left (cocktail categories). When absent and
  // `numbered` is set, an elegant course number is shown instead (dinner menu).
  icon?: React.ReactNode
  label?: string
  text: string
}

interface EventDetailModalProps {
  open: boolean
  onClose: () => void
  title: string
  time?: string
  heading?: string
  headerIcon?: React.ReactNode
  numbered?: boolean
  items: ModalItem[]
}

/**
 * Centered popup for an Order-of-Events entry's full detail (cocktail-hour
 * offerings, dinner menu). Closes on backdrop click or Escape, and locks
 * body scroll while open.
 */
export function EventDetailModal({
  open,
  onClose,
  title,
  time,
  heading,
  headerIcon,
  numbered,
  items,
}: EventDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Non-modal popup: no scroll lock and no backdrop, so the page behind stays
  // visible, scrollable, and interactive. Close on Escape or a click outside.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const onDown = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Light dim to highlight the popup — click-through (pointer-events
              stay off) so the page behind is still visible and scrollable. */}
          <div className="absolute inset-0 bg-dark-slate/25" aria-hidden />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-label={title}
            className="pointer-events-auto relative w-full max-w-md bg-ice-blue rounded-2xl border border-muted-gold/40 shadow-2xl px-6 py-8 max-h-[85vh] overflow-y-auto"
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-slate-gray hover:text-burgundy transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="text-center">
              {headerIcon && (
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white border border-muted-gold/50 flex items-center justify-center text-dusty-blue shadow-sm">
                  {headerIcon}
                </div>
              )}
              {time && <p className="font-display text-sm text-burgundy tracking-wide">{time}</p>}
              <p className="font-script text-3xl text-dusty-blue mt-1">{heading ?? title}</p>
              <div className="w-16 h-px bg-muted-gold/60 mx-auto my-5" />
            </div>

            <ul className="space-y-4 text-left">
              {items.map((item, idx) => (
                <li key={item.text} className="flex items-start gap-3">
                  {item.icon ? (
                    <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-full bg-white border border-muted-gold/40 flex items-center justify-center text-dusty-blue shadow-sm">
                      {item.icon}
                    </span>
                  ) : numbered ? (
                    <span className="flex-shrink-0 w-6 font-display text-base text-muted-gold tabular-nums leading-6">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  ) : null}
                  <span className={item.icon ? "pt-1" : ""}>
                    {item.label && (
                      <span className="block font-display text-base text-dusty-blue">{item.label}</span>
                    )}
                    <span className="font-body text-sm md:text-base text-slate-gray leading-relaxed">
                      {item.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
