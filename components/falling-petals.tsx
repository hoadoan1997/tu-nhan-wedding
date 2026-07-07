"use client"

import { useEffect, useState } from "react"

interface Petal {
  left: number // vw
  size: number // px
  delay: number // s
  duration: number // s
  drift: number // px horizontal sway amplitude
  rotate: number // deg
  opacity: number
}

const PETAL_COUNT = 8

/**
 * Ambient falling rose petals covering the whole page. Petals are generated
 * client-side after mount (avoids SSR hydration mismatch from randomness)
 * and hidden entirely for users who prefer reduced motion.
 */
export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    setPetals(
      Array.from({ length: PETAL_COUNT }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 10,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 8,
        drift: 20 + Math.random() * 40,
        rotate: Math.random() * 360,
        opacity: 0.35 + Math.random() * 0.3,
      }))
    )
  }, [])

  return (
    <div aria-hidden className="falling-petals pointer-events-none fixed inset-0 overflow-hidden z-0">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute"
          style={{
            left: `${p.left}vw`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.rotate}deg`,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              d="M12 2C7 6 5 11 8 16c2 3.5 6 4 8 2 2.5-2.5 2-7-1-11-1-1.5-2-3-3-5z"
              fill="#E8C4C8"
              stroke="#C4919B"
              strokeWidth="0.5"
            />
          </svg>
        </span>
      ))}

      <style>{`
        .petal {
          top: -5vh;
          animation-name: petal-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes petal-fall {
          0% {
            transform: translate(0, 0) rotate(var(--spin));
          }
          25% {
            transform: translate(var(--drift), 28vh) rotate(calc(var(--spin) + 90deg));
          }
          50% {
            transform: translate(calc(var(--drift) * -0.6), 55vh) rotate(calc(var(--spin) + 200deg));
          }
          75% {
            transform: translate(var(--drift), 82vh) rotate(calc(var(--spin) + 290deg));
          }
          100% {
            transform: translate(0, 110vh) rotate(calc(var(--spin) + 360deg));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .falling-petals {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
