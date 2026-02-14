"use client"

import { useRef, useState, useEffect } from "react"
import type { SeatingTable } from "@/lib/utils"
import { RoundTable } from "@/components/round-table"
import { DanceFloorElement, StageElement, TreeIcon } from "@/components/venue-decorations"

interface VenueFloorPlanProps {
  tables: SeatingTable[]
  highlightedGuest: string | null
}

/* Design canvas: 1200×900. Scaled to fit container via CSS transform. */
const CANVAS_W = 1200
const CANVAS_H = 900

/* Table positions on the design canvas — compact 4-column layout */
const TABLE_POSITIONS: Record<number, { left: number; top: number; size?: number }> = {
  1:  { left: 475, top: 10, size: 250 },    // head table, top center
  2:  { left: 120, top: 80 },                // row 2 left
  3:  { left: 830, top: 80 },                // row 2 right
  4:  { left: 0,   top: 310 },               // row 3 far-left
  5:  { left: 960, top: 310 },               // row 3 far-right
  6:  { left: 120, top: 520 },               // row 4 left
  7:  { left: 830, top: 520 },               // row 4 right
  8:  { left: 0,   top: 640 },               // row 5 far-left
  9:  { left: 960, top: 640 },               // row 5 far-right
  10: { left: 120, top: 690 },               // bottom row left
  11: { left: 460, top: 690 },               // bottom row center
  12: { left: 800, top: 690 },               // bottom row right
}

const TABLE_SIZE = 240

/* Decorative trees along edges */
const TREES = [
  { left: 60, top: 5 },
  { left: 380, top: 0 },
  { left: 780, top: 0 },
  { left: 1130, top: 5 },
  { left: 30, top: 860 },
  { left: 580, top: 870 },
  { left: 1140, top: 860 },
]

export function VenueFloorPlan({ tables, highlightedGuest }: VenueFloorPlanProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  /* Responsive scaling: fit canvas into container width */
  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return
      const containerW = containerRef.current.clientWidth
      const newScale = Math.min(containerW / CANVAS_W, 1)
      setScale(newScale)
    }
    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="origin-top-left"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          marginBottom: -(CANVAS_H * (1 - scale)),
        }}
      >
        <div
          role="img"
          aria-label="Venue floor plan showing 12 tables around a central dance floor"
          className="relative w-full h-full border-2 border-muted-gold/40 rounded-2xl bg-gradient-to-b from-ice-blue to-warm-blush/30"
        >
          {/* Dance floor — center */}
          <DanceFloorElement
            className="absolute"
            style={{ left: 380, top: 320, width: 440, height: 230 }}
          />

          {/* Stage — bottom center */}
          <StageElement
            className="absolute"
            style={{ left: 480, top: 835, width: 240, height: 50 }}
          />

          {/* Decorative trees */}
          {TREES.map((pos, i) => (
            <div
              key={`tree-${i}`}
              className="absolute pointer-events-none"
              style={{ left: pos.left, top: pos.top }}
            >
              <TreeIcon className="w-7 h-10 opacity-30" />
            </div>
          ))}

          {/* Tables */}
          {tables.map((table) => {
            const pos = TABLE_POSITIONS[table.number]
            if (!pos) return null
            return (
              <div
                key={table.number}
                id={`table-${table.number}`}
                className="absolute"
                style={{ left: pos.left, top: pos.top }}
              >
                <RoundTable
                  table={table}
                  highlightedGuest={highlightedGuest}
                  size={pos.size ?? TABLE_SIZE}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
