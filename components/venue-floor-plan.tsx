"use client"

import type { SeatingTable } from "@/lib/utils"
import { RoundTable } from "@/components/round-table"
import { TreeIcon, FlowerIcon, DanceFloorElement, StageElement } from "@/components/venue-decorations"

interface VenueFloorPlanProps {
  tables: SeatingTable[]
  highlightedGuest: string | null
}

/* Absolute positions (px) for each table on the 1400×1000 canvas */
const TABLE_POSITIONS: Record<number, { left: number; top: number; size?: number }> = {
  1:  { left: 560, top: 20, size: 300 },
  2:  { left: 200, top: 140 },
  3:  { left: 920, top: 140 },
  4:  { left: 30,  top: 360 },
  5:  { left: 1090, top: 360 },
  6:  { left: 200, top: 560 },
  7:  { left: 920, top: 560 },
  8:  { left: 30,  top: 700 },
  9:  { left: 1090, top: 700 },
  10: { left: 200, top: 760 },
  11: { left: 560, top: 760 },
  12: { left: 920, top: 760 },
}

/* Decorative tree positions along edges */
const TREE_POSITIONS = [
  { left: 80, top: 15, scale: 1.1 },
  { left: 400, top: 5, scale: 0.9 },
  { left: 950, top: 10, scale: 1 },
  { left: 1250, top: 20, scale: 0.85 },
  { left: 1330, top: 200, scale: 0.7 },
  { left: 50, top: 930, scale: 0.9 },
  { left: 700, top: 950, scale: 0.8 },
  { left: 1300, top: 920, scale: 1 },
]

/* Flower accent positions */
const FLOWER_POSITIONS = [
  { left: 520, top: 330 },
  { left: 870, top: 330 },
  { left: 520, top: 710 },
  { left: 870, top: 710 },
]

export function VenueFloorPlan({ tables, highlightedGuest }: VenueFloorPlanProps) {
  return (
    <div className="relative">
      {/* Scroll container */}
      <div className="overflow-x-auto pb-4">
        {/* Canvas */}
        <div
          role="img"
          aria-label="Venue floor plan showing 12 tables around a central dance floor"
          className="relative mx-auto border-2 border-muted-gold/40 rounded-2xl bg-gradient-to-b from-ice-blue to-warm-blush/30"
          style={{ width: 1400, height: 1050, minWidth: 1400 }}
        >
          {/* Dance floor — center */}
          <DanceFloorElement
            className="absolute"
            style={{ left: 460, top: 370, width: 480, height: 260 }}
          />

          {/* Stage — bottom center */}
          <StageElement
            className="absolute"
            style={{ left: 580, top: 960, width: 240, height: 55 }}
          />

          {/* Decorative trees */}
          {TREE_POSITIONS.map((pos, i) => (
            <div
              key={`tree-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: pos.left,
                top: pos.top,
                transform: `scale(${pos.scale})`,
              }}
            >
              <TreeIcon className="w-8 h-11 opacity-40" />
            </div>
          ))}

          {/* Flower accents */}
          {FLOWER_POSITIONS.map((pos, i) => (
            <div
              key={`flower-${i}`}
              className="absolute pointer-events-none"
              style={{ left: pos.left, top: pos.top }}
            >
              <FlowerIcon className="w-5 h-5 opacity-30" />
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
                  size={pos.size ?? 280}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile scroll hint — right edge gradient */}
      <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-ice-blue to-transparent pointer-events-none md:hidden rounded-r-2xl" />
    </div>
  )
}
