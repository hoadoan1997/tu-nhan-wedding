"use client"

import { motion } from "framer-motion"
import { cn, type SeatingTable } from "@/lib/utils"
import { GuestAvatar } from "@/components/guest-avatar"

interface RoundTableProps {
  table: SeatingTable
  highlightedGuest: string | null
  size?: number
}

export function RoundTable({ table, highlightedGuest, size = 280 }: RoundTableProps) {
  const guests = table.guests
  if (guests.length === 0) return null
  const radius = size / 2 - 35
  const centerSize = size * 0.32

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Center circle — table number + name */}
      <div
        className="absolute rounded-full bg-burgundy border border-muted-gold/40 flex flex-col items-center justify-center"
        style={{
          width: centerSize,
          height: centerSize,
          left: size / 2 - centerSize / 2,
          top: size / 2 - centerSize / 2,
        }}
      >
        <p className="font-body text-muted-gold text-[9px] uppercase tracking-widest leading-none">
          Table {table.number}
        </p>
        <p className="font-display text-cream text-sm leading-tight text-center px-1 mt-0.5">
          {table.name}
        </p>
      </div>

      {/* Guest seats — radial positioning */}
      {guests.map((guest, i) => {
        const angleStep = 360 / guests.length
        const angle = angleStep * i - 90
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius
        const isHighlighted = guest.name === highlightedGuest

        return (
          <motion.div
            key={guest.name}
            className="absolute flex flex-col items-center"
            style={{
              left: size / 2 + x - 24,
              top: size / 2 + y - 24,
              width: 48,
            }}
            animate={isHighlighted ? { scale: 1.15 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <GuestAvatar
              role={guest.role}
              highlighted={isHighlighted}
              className="w-10 h-10"
            />
            <span
              className={cn(
                "text-[9px] leading-tight text-center mt-0.5 max-w-[60px] truncate font-body",
                isHighlighted
                  ? "text-muted-gold font-semibold"
                  : "text-dark-slate/70"
              )}
            >
              {guest.name.split(" ").slice(-1)[0]}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
