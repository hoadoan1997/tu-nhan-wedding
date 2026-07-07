"use client"

import { motion } from "framer-motion"

interface CoupleIllustrationProps {
  /** When true the couple raises their arms and bounces in celebration */
  celebrating: boolean
}

/** Small hearts that drift up from the couple every few seconds */
function FloatingHearts() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute text-light-steel"
          style={{ left: `${30 + i * 20}%`, bottom: "40%", fontSize: 14 - i * 2 }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.8, 0], y: -60 - i * 15, x: i % 2 ? 10 : -10 }}
          transition={{
            duration: 3,
            delay: i * 1.4,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}

/**
 * Minimal line-art bride & groom in the site's dusty-rose palette.
 * Idle: gentle side-to-side sway. Celebrating: bounce with raised arms
 * (arm poses swap via SVG path change, body bounce via framer-motion).
 */
export function CoupleIllustration({ celebrating }: CoupleIllustrationProps) {
  return (
    <motion.div
      aria-hidden
      className="relative mx-auto w-40 md:w-48"
      animate={
        celebrating
          ? { y: [0, -14, 0, -8, 0], rotate: 0 }
          : { rotate: [-2, 2, -2], y: 0 }
      }
      transition={
        celebrating
          ? { duration: 0.9, ease: "easeOut" }
          : { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <svg viewBox="0 0 200 160" fill="none" className="w-full h-auto">
        {/* ---------- Groom ---------- */}
        {/* head */}
        <circle cx="72" cy="38" r="14" fill="#FDF8F8" stroke="#6B3A40" strokeWidth="2.5" />
        {/* hair */}
        <path d="M59 34c1-9 8-14 13-14s12 5 13 14c-4-5-8-7-13-7s-9 2-13 7z" fill="#6B3A40" />
        {/* smile */}
        <path d="M67 43c2 2.5 8 2.5 10 0" stroke="#6B3A40" strokeWidth="2" strokeLinecap="round" />
        {/* suit body */}
        <path d="M56 132V72c0-11 7-18 16-18s16 7 16 18v60z" fill="#6B3A40" />
        {/* shirt + bowtie */}
        <path d="M72 54l-5 10 5 14 5-14z" fill="#FDF8F8" />
        <path d="M68 62h8l-4 5z" fill="#C4919B" />
        {/* arms: idle = groom's inner arm around bride; celebrating = both raised */}
        {celebrating ? (
          <>
            <path d="M60 70 L42 44" stroke="#6B3A40" strokeWidth="7" strokeLinecap="round" />
            <path d="M84 70 L96 46" stroke="#6B3A40" strokeWidth="7" strokeLinecap="round" />
            <circle cx="42" cy="44" r="4.5" fill="#FDF8F8" stroke="#6B3A40" strokeWidth="2" />
            <circle cx="96" cy="46" r="4.5" fill="#FDF8F8" stroke="#6B3A40" strokeWidth="2" />
          </>
        ) : (
          <>
            <path d="M60 70 L48 100" stroke="#6B3A40" strokeWidth="7" strokeLinecap="round" />
            <path d="M84 70 Q100 78 108 88" stroke="#6B3A40" strokeWidth="7" strokeLinecap="round" />
          </>
        )}

        {/* ---------- Bride ---------- */}
        {/* dress */}
        <path d="M128 54c-14 0-24 26-28 78h56c-4-52-14-78-28-78z" fill="#FDF8F8" stroke="#C4919B" strokeWidth="2.5" />
        {/* head */}
        <circle cx="128" cy="38" r="14" fill="#FDF8F8" stroke="#C4919B" strokeWidth="2.5" />
        {/* hair bun */}
        <path d="M115 34c1-9 8-14 13-14s12 5 13 14c-4-5-8-7-13-7s-9 2-13 7z" fill="#8A5A5F" />
        <circle cx="141" cy="24" r="5" fill="#8A5A5F" />
        {/* veil */}
        <path d="M114 30c-6 8-8 20-6 30" stroke="#E8C4C8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M142 30c6 8 8 20 6 30" stroke="#E8C4C8" strokeWidth="2.5" strokeLinecap="round" />
        {/* smile */}
        <path d="M123 43c2 2.5 8 2.5 10 0" stroke="#C4919B" strokeWidth="2" strokeLinecap="round" />
        {/* arms: idle = holding bouquet in front; celebrating = raised with bouquet */}
        {celebrating ? (
          <>
            <path d="M118 62 L104 42" stroke="#C4919B" strokeWidth="6" strokeLinecap="round" />
            <path d="M138 62 L154 40" stroke="#C4919B" strokeWidth="6" strokeLinecap="round" />
            {/* tossed-up bouquet */}
            <g transform="translate(154 34)">
              <circle r="7" fill="#C4919B" />
              <circle cx="-5" cy="3" r="4" fill="#E8C4C8" />
              <circle cx="5" cy="3" r="4" fill="#E8C4C8" />
              <circle cy="-5" r="4" fill="#C9B99A" />
            </g>
          </>
        ) : (
          <>
            <path d="M118 62 Q112 76 118 84" stroke="#C4919B" strokeWidth="6" strokeLinecap="round" />
            <path d="M138 62 Q144 76 138 84" stroke="#C4919B" strokeWidth="6" strokeLinecap="round" />
            {/* bouquet held at waist */}
            <g transform="translate(128 88)">
              <circle r="8" fill="#C4919B" />
              <circle cx="-6" cy="3" r="4.5" fill="#E8C4C8" />
              <circle cx="6" cy="3" r="4.5" fill="#E8C4C8" />
              <circle cy="-6" r="4.5" fill="#C9B99A" />
            </g>
          </>
        )}

        {/* ground shadow */}
        <ellipse cx="100" cy="140" rx="58" ry="6" fill="#C4919B" opacity="0.15" />
      </svg>
      <FloatingHearts />
    </motion.div>
  )
}
