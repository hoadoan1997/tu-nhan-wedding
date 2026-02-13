import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface DecorationProps {
  className?: string
  style?: CSSProperties
}

/* Inline SVG decorative tree — simple trunk + canopy */
export function TreeIcon({ className }: DecorationProps) {
  return (
    <svg viewBox="0 0 30 44" fill="none" aria-hidden="true" className={cn("text-sage-green", className)}>
      {/* Canopy */}
      <ellipse cx="15" cy="14" rx="12" ry="13" fill="currentColor" opacity="0.35" />
      <ellipse cx="15" cy="18" rx="9" ry="10" fill="currentColor" opacity="0.25" />
      {/* Trunk */}
      <rect x="13" y="26" width="4" height="14" rx="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

/* Small flower accent */
export function FlowerIcon({ className }: DecorationProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn("text-muted-gold", className)}>
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="10" cy="5" r="2.5" fill="currentColor" opacity="0.25" />
      <circle cx="14.5" cy="8" r="2.5" fill="currentColor" opacity="0.25" />
      <circle cx="13" cy="13.5" r="2.5" fill="currentColor" opacity="0.25" />
      <circle cx="7" cy="13.5" r="2.5" fill="currentColor" opacity="0.25" />
      <circle cx="5.5" cy="8" r="2.5" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

/* Dance floor ellipse with label */
export function DanceFloorElement({ className, style }: DecorationProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} style={style}>
      <div className="w-full h-full border-2 border-dashed border-muted-gold/30 rounded-[50%] flex items-center justify-center bg-warm-blush/10">
        <span className="font-display text-muted-gold/50 text-lg select-none">
          Dance Floor
        </span>
      </div>
    </div>
  )
}

/* Stage rectangle with label */
export function StageElement({ className, style }: DecorationProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} style={style}>
      <div className="w-full h-full bg-burgundy/15 border border-muted-gold/30 rounded-lg flex items-center justify-center gap-2">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-4 h-4 text-muted-gold/50">
          <path d="M8 2v8M5 6l3-4 3 4M4 12h8M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="font-display text-muted-gold/50 text-sm select-none">
          Stage
        </span>
      </div>
    </div>
  )
}
