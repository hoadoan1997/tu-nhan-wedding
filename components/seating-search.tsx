"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import { removeDiacritics, type SeatingTable } from "@/lib/utils"

interface SearchResult {
  guestName: string
  tableNumber: number
  tableName: string
}

interface SeatingSearchProps {
  tables: SeatingTable[]
  onTableHighlight: (tableNumber: number | null) => void
  onGuestHighlight?: (guestName: string | null) => void
}

export function SeatingSearch({ tables, onTableHighlight, onGuestHighlight }: SeatingSearchProps) {
  const [query, setQuery] = useState("")

  const results: SearchResult[] = query.trim().length >= 2
    ? tables.flatMap((table) =>
        table.guests
          .filter((guest) =>
            removeDiacritics(guest.name).toLowerCase().includes(
              removeDiacritics(query).toLowerCase()
            )
          )
          .map((guest) => ({
            guestName: guest.name,
            tableNumber: table.number,
            tableName: table.name,
          }))
      )
    : []

  const handleChange = (value: string) => {
    setQuery(value)
    if (value.trim().length < 2) {
      onTableHighlight(null)
      onGuestHighlight?.(null)
      return
    }
    // Find first matching guest + table
    const normalized = removeDiacritics(value).toLowerCase()
    let matchedGuest: string | null = null
    const firstMatch = tables.find((t) =>
      t.guests.some((g) => {
        const match = removeDiacritics(g.name).toLowerCase().includes(normalized)
        if (match && !matchedGuest) matchedGuest = g.name
        return match
      })
    )
    onTableHighlight(firstMatch?.number ?? null)
    onGuestHighlight?.(matchedGuest)
  }

  return (
    <div className="mb-12">
      {/* Search input */}
      <div className="relative max-w-md mx-auto">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-gray"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          aria-label="Search guest name"
          placeholder="Type your name to find your seat..."
          className="w-full pl-12 pr-4 py-3 border border-silver rounded-lg bg-white font-body text-dark-slate placeholder:text-slate-gray/60 focus:outline-none focus:ring-2 focus:ring-dusty-blue/30 focus:border-dusty-blue transition-colors"
        />
      </div>

      {/* Results */}
      <div className="max-w-md mx-auto mt-4" aria-live="polite" role="status">
        <AnimatePresence mode="popLayout">
          {results.map((r) => (
            <motion.div
              key={`${r.guestName}-${r.tableNumber}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white rounded-xl shadow-md p-6 border border-light-steel mb-3"
            >
              <p className="font-body text-slate-gray text-sm mb-1">
                Welcome,
              </p>
              <p className="font-display text-2xl text-dusty-blue mb-2">
                {r.guestName}
              </p>
              <p className="font-body text-dark-slate">
                You&apos;re at{" "}
                <span className="font-semibold text-dusty-blue">
                  Table {r.tableNumber}
                </span>{" "}
                &mdash; {r.tableName}
              </p>
            </motion.div>
          ))}

          {query.trim().length >= 2 && results.length === 0 && (
            <motion.p
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center font-body text-slate-gray py-4"
            >
              No guest found for &ldquo;{query}&rdquo;. Please check the
              spelling or ask the couple for help.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
