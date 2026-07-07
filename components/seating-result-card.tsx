"use client"

import { motion } from "framer-motion"

export interface MatchedGuest {
  guestName: string
  tableNumber: number
  tableName: string
  tableLocation?: string
  tablemates: string[]
}

/** One-shot petal burst shown when the welcome card reveals */
function PetalBurst() {
  const petals = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2
    return {
      x: Math.cos(angle) * (70 + (i % 3) * 25),
      y: Math.sin(angle) * (50 + (i % 3) * 20),
      rotate: i * 72,
      delay: i * 0.03,
    }
  })
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="absolute w-3 h-3"
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate, scale: 1.2 }}
          transition={{ duration: 1.2, delay: 0.5 + p.delay, ease: "easeOut" }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              d="M12 2C7 6 5 11 8 16c2 3.5 6 4 8 2 2.5-2.5 2-7-1-11-1-1.5-2-3-3-5z"
              fill="#E8C4C8"
              stroke="#C4919B"
              strokeWidth="0.5"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  )
}

/** Odometer-style digit: a 0-9 strip that rolls to the target digit.
 *  The strip is absolutely positioned from the container's top edge so the
 *  1em window and the per-digit 1em rows share the exact same origin —
 *  baseline-based inline layout drifts a few px and lets neighbours peek. */
function RollingDigit({ digit, delay }: { digit: number; delay: number }) {
  return (
    <span
      className="relative inline-block h-[1em] w-[1ch] overflow-hidden"
      style={{ verticalAlign: "-0.15em" }}
    >
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col items-center leading-none"
        initial={{ y: 0 }}
        animate={{ y: `-${digit}em` }}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.8, 0.3, 1] }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="flex h-[1em] items-center justify-center">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

/** Table number that rolls into place like a split-flap board */
function RollingNumber({ value, delay }: { value: number; delay: number }) {
  const digits = String(value).split("").map(Number)
  return (
    <span aria-label={String(value)}>
      {digits.map((d, i) => (
        <RollingDigit key={i} digit={d} delay={delay + i * 0.12} />
      ))}
    </span>
  )
}

/**
 * Welcome card revealed like an invitation sliding out of an opening
 * envelope, shown when the search narrows to exactly one guest.
 */
export function SeatingResultCard({ guest }: { guest: MatchedGuest }) {
  return (
    <div className="relative mx-auto max-w-sm" style={{ perspective: 800 }}>
      <PetalBurst />

      {/* Envelope flap opens first… */}
      <motion.div
        aria-hidden
        className="absolute inset-x-6 top-0 h-10 origin-top rounded-t-lg bg-light-steel/70 border border-silver"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: -160, opacity: 0.4 }}
        transition={{ duration: 0.45, ease: "easeIn" }}
      />

      {/* …then the card slides up out of it */}
      <motion.div
        initial={{ y: 46, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-muted-gold/40 px-8 py-8 text-center shadow-sm"
      >
        <p className="font-body text-sm text-slate-gray tracking-widest uppercase">Welcome</p>
        <p className="font-script text-4xl text-dusty-blue mt-2">{guest.guestName}</p>

        <div className="w-16 h-px bg-muted-gold mx-auto my-5" />

        <p className="font-body text-2xl text-burgundy">
          Table <RollingNumber value={guest.tableNumber} delay={0.7} />
        </p>
        <p className="font-body text-sm text-slate-gray mt-1">{guest.tableName}</p>
        {guest.tableLocation && (
          <p className="font-body text-sm text-slate-gray mt-1">📍 {guest.tableLocation}</p>
        )}

        {guest.tablemates.length > 0 && (
          <div className="mt-6">
            <p className="font-body text-xs text-slate-gray tracking-widest uppercase mb-2">
              Seated with you
            </p>
            <p className="font-body text-sm text-dark-slate leading-relaxed">
              {guest.tablemates.join(" · ")}
            </p>
          </div>
        )}

        <p className="font-script text-xl text-dusty-blue mt-6">
          We&apos;re so happy you&apos;re here
        </p>
      </motion.div>
    </div>
  )
}
