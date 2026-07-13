"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

/**
 * Geometry traced from the official Canton House "Ballroom A + B" floor plan
 * PDF: 28 tables, stage + sweetheart table on the left wall, service blocks
 * along the right wall, three double doors on the bottom wall opening to the
 * lobby (reception desk + room label live below the wall, as in the PDF).
 * All numbers are viewBox units.
 */
const TABLE_POSITIONS: Record<number, { x: number; y: number }> = {
  18: { x: 151, y: 32 }, 20: { x: 216, y: 32 }, 22: { x: 279, y: 32 },
  24: { x: 339, y: 32 }, 26: { x: 402, y: 32 }, 28: { x: 453, y: 32 },
  10: { x: 209, y: 94 }, 12: { x: 270, y: 94 }, 14: { x: 333, y: 94 }, 16: { x: 392, y: 94 },
  2: { x: 205, y: 154 }, 4: { x: 266, y: 154 }, 6: { x: 326, y: 154 }, 8: { x: 389, y: 154 },
  1: { x: 211, y: 233 }, 3: { x: 275, y: 233 }, 5: { x: 334, y: 233 }, 7: { x: 394, y: 233 },
  9: { x: 212, y: 293 }, 11: { x: 276, y: 293 }, 13: { x: 335, y: 293 }, 15: { x: 394, y: 293 },
  27: { x: 455, y: 320 },
  17: { x: 165, y: 355 }, 19: { x: 224, y: 355 }, 21: { x: 283, y: 355 }, 23: { x: 342, y: 355 },
  25: { x: 409, y: 355 },
}

const VIEW_W = 620
const VIEW_H = 470
const WALL_Y = 393 // bottom wall of the ballroom; lobby strip below
const TABLE_R = 21
const HIGHLIGHT_R = 26

/** Bottom-wall double doors as [leftEdge, rightEdge] in viewBox units */
const DOORS: [number, number][] = [
  [104, 143],
  [371, 407],
  [531, 564],
]

function DoorOpening({ a, b }: { a: number; b: number }) {
  const hw = (b - a) / 2
  const m = a + hw
  return (
    <g>
      {/* Gap in the wall */}
      <line x1={a} y1={WALL_Y} x2={b} y2={WALL_Y} stroke="#FFFFFF" strokeWidth={5} />
      {/* Two leaves swinging into the room */}
      <path d={`M ${a} ${WALL_Y - hw} A ${hw} ${hw} 0 0 1 ${m} ${WALL_Y}`} fill="none" stroke="#C9B99A" strokeWidth={1} />
      <line x1={a} y1={WALL_Y} x2={a} y2={WALL_Y - hw} stroke="#C9B99A" strokeWidth={1.5} />
      <path d={`M ${b} ${WALL_Y - hw} A ${hw} ${hw} 0 0 0 ${m} ${WALL_Y}`} fill="none" stroke="#C9B99A" strokeWidth={1} />
      <line x1={b} y1={WALL_Y} x2={b} y2={WALL_Y - hw} stroke="#C9B99A" strokeWidth={1.5} />
    </g>
  )
}

function FloorPlanSvg({ tableNumber, animateDelay }: { tableNumber: number; animateDelay: number }) {
  const target = TABLE_POSITIONS[tableNumber]
  return (
    <svg
      // 36 units of headroom so the pin isn't clipped on top-row tables
      viewBox={`0 -36 ${VIEW_W} ${VIEW_H + 36}`}
      className="w-full h-auto"
      role="img"
      aria-label={`Floor plan with table ${tableNumber} highlighted`}
    >
      {/* Ballroom */}
      <rect x={2} y={2} width={592} height={WALL_Y - 2} rx={4} fill="#FDF7F8" stroke="#C9B99A" strokeWidth={2} />

      {/* Stage + sweetheart table (left wall) */}
      <rect x={6} y={110} width={56} height={160} rx={4} fill="#C9B99A" opacity={0.4} />
      <path d={`M 62 160 a 26 30 0 0 1 0 60 z`} fill="#FFFFFF" stroke="#C4919B" strokeWidth={1} />
      <text x={30} y={196} fill="#6B3A40" fontSize={14} textAnchor="middle" transform="rotate(-90 30 196)" style={{ letterSpacing: 3 }}>
        STAGE
      </text>

      {/* Service blocks along the right wall (as on the venue plan) */}
      <rect x={539} y={10} width={47} height={37} rx={2} fill="#8A7A6B" opacity={0.85} />
      <rect x={514} y={69} width={61} height={33} rx={2} fill="#EAD9BE" />
      <rect x={553} y={129} width={22} height={50} rx={2} fill="#E8C4C8" />
      <rect x={475} y={347} width={31} height={33} rx={2} fill="#8A7A6B" opacity={0.85} />

      {/* Three double doors on the bottom wall */}
      {DOORS.map(([a, b]) => (
        <DoorOpening key={a} a={a} b={b} />
      ))}

      {/* Lobby: reception desk + room label, below the wall like the PDF */}
      <rect x={180} y={412} width={58} height={38} rx={2} fill="#FFFFFF" stroke="#C9B99A" strokeWidth={1} />
      <text x={209} y={434} fill="#8A7A6B" fontSize={9} textAnchor="middle" style={{ letterSpacing: 1 }}>
        RECEPTION
      </text>
      <text x={370} y={438} fill="#6B3A40" fontSize={20} textAnchor="middle" fontWeight={600}>
        Ballroom A + B
      </text>

      {/* Tables */}
      {Object.entries(TABLE_POSITIONS).map(([num, pos]) => {
        const isTarget = Number(num) === tableNumber
        return (
          <g key={num}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isTarget ? HIGHLIGHT_R : TABLE_R}
              fill={isTarget ? "#6B3A40" : "#F9EDEF"}
              stroke={isTarget ? "#C9B99A" : "#C4919B"}
              strokeWidth={isTarget ? 2 : 1}
            />
            <text
              x={pos.x}
              y={pos.y + (isTarget ? 7.5 : 6)}
              fill={isTarget ? "#FFFFFF" : "#7C7C85"}
              fontSize={isTarget ? 22 : 17}
              fontWeight={isTarget ? 700 : 500}
              textAnchor="middle"
            >
              {num}
            </text>
          </g>
        )
      })}

      {/* Pulse ring + dropping pin on the guest's table */}
      {target && (
        <>
          <motion.circle
            cx={target.x}
            cy={target.y}
            r={HIGHLIGHT_R}
            fill="none"
            stroke="#6B3A40"
            strokeWidth={2}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{ duration: 1.6, delay: animateDelay + 0.6, repeat: Infinity, repeatDelay: 0.6, ease: "easeOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <motion.g
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: animateDelay + 0.5, ease: "easeOut" }}
          >
            <path
              d={`M ${target.x} ${target.y - HIGHLIGHT_R - 6}
                  c -9 -14 -9 -24 0 -30 c 9 6 9 16 0 30 z`}
              fill="#C4919B"
              stroke="#6B3A40"
              strokeWidth={1}
            />
            <circle cx={target.x} cy={target.y - HIGHLIGHT_R - 27} r={4} fill="#FDF7F8" />
          </motion.g>
        </>
      )}
    </svg>
  )
}

/** Fullscreen overlay: the plan rendered wide (horizontally swipeable on
 *  phones) and auto-scrolled so the guest's table starts centered. */
function FullMapOverlay({ tableNumber, onClose }: { tableNumber: number; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    const target = TABLE_POSITIONS[tableNumber]
    if (!el || !target) return
    const svgWidth = el.querySelector("svg")?.clientWidth ?? el.scrollWidth
    el.scrollLeft = (target.x / VIEW_W) * svgWidth - el.clientWidth / 2
  }, [tableNumber])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-ice-blue/95 backdrop-blur-sm flex flex-col items-center justify-center px-2"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close floor plan"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 border border-muted-gold/40 flex items-center justify-center text-burgundy"
      >
        <X size={20} />
      </button>

      <p className="font-body text-sm text-burgundy tracking-widest uppercase mb-3">
        Table {tableNumber} — Ballroom A + B
      </p>

      {/* Stop propagation so panning/tapping the map doesn't close it */}
      <div
        ref={scrollRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl overflow-x-auto rounded-xl border border-muted-gold/40 bg-white/80 p-2"
      >
        <div className="min-w-[620px]">
          <FloorPlanSvg tableNumber={tableNumber} animateDelay={0} />
        </div>
      </div>

      <p className="font-body text-xs text-slate-gray mt-3">Swipe to explore · tap outside to close</p>
    </motion.div>
  )
}

/**
 * "You are here"-style mini floor plan shown in the seating result card:
 * all tables as numbered circles, the guest's table highlighted in burgundy
 * with a dropping pin and pulse ring. Tap opens the fullscreen version.
 */
export function VenueMiniMap({ tableNumber }: { tableNumber: number }) {
  const [expanded, setExpanded] = useState(false)

  if (!TABLE_POSITIONS[tableNumber]) return null

  return (
    <>
      {/* Negative margins let the map use the card's full width on phones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mt-5 -mx-5"
      >
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Open full floor plan"
          className="block w-full rounded-xl border border-muted-gold/40 bg-white/70 p-2 cursor-zoom-in"
        >
          <FloorPlanSvg tableNumber={tableNumber} animateDelay={1.0} />
        </button>
        <p className="font-body text-[11px] text-slate-gray/70 tracking-widest uppercase mt-2 text-center">
          Tap map to enlarge
        </p>
      </motion.div>

      {/* Portal to <body>: the card's transform would otherwise re-anchor
          position:fixed and clip the overlay */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {expanded && <FullMapOverlay tableNumber={tableNumber} onClose={() => setExpanded(false)} />}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
