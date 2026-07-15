"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { removeDiacritics, type SeatingTable } from "@/lib/utils"
import { CoupleIllustration } from "@/components/couple-illustration"
import { SeatingResultCard, type MatchedGuest } from "@/components/seating-result-card"

interface SeatingSearchProps {
  tables: SeatingTable[]
  autoFocus?: boolean
}

/**
 * Typeahead match: each query word must be a PREFIX of a name word, across a
 * contiguous run of name words. So "ton" suggests "Tony", and "van son"
 * matches "Hồ Văn Sơn". Prefix (not `.includes()`) keeps diacritic-stripped
 * collisions in check — e.g. "yen" won't match inside "Nguyễn"→"nguyen" — while
 * still surfacing partial input as suggestions (the multi-match pick list lets
 * the guest choose when several names share a prefix, like "Trịnh"/"Triệu").
 */
function nameMatches(name: string, queryWords: string[]): boolean {
  const nameWords = removeDiacritics(name).toLowerCase().split(/\s+/)
  for (let start = 0; start <= nameWords.length - queryWords.length; start++) {
    if (queryWords.every((w, i) => nameWords[start + i].startsWith(w))) return true
  }
  return false
}

export function SeatingSearch({ tables, autoFocus = false }: SeatingSearchProps) {
  const [query, setQuery] = useState("")

  const normalizedQuery = removeDiacritics(query).toLowerCase().trim()
  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean)

  const results: MatchedGuest[] = normalizedQuery.length >= 2
    ? tables.flatMap((table) =>
        table.guests
          .map((guest, seatIndex) => ({ guest, seatIndex }))
          .filter(({ guest }) => nameMatches(guest.name, queryWords))
          .map(({ guest, seatIndex }) => ({
            guestName: guest.name,
            tableNumber: table.number,
            tableName: table.name,
            tableLocation: table.location,
            // Filter by seat, not by name — the real chart has identical
            // names at one table (e.g. two "Con dì Loan")
            tablemates: table.guests
              .filter((_, i) => i !== seatIndex)
              .map((g) => g.name),
          }))
      )
    : []

  const guestCount = tables.reduce((sum, t) => sum + t.guests.length, 0)
  const singleMatch = results.length === 1 ? results[0] : null

  return (
    <div className="mb-12">
      {/* Bride & groom — sway idle, celebrate when a table is found */}
      <CoupleIllustration celebrating={singleMatch !== null} />

      {/* Minimal underline-only search input; accent line draws out from
          the center on focus (group-focus-within drives the scale) */}
      <div className="group relative max-w-sm mx-auto mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search guest name"
          placeholder="Search by name"
          autoFocus={autoFocus}
          className="w-full bg-transparent text-center font-body text-lg text-dusty-blue placeholder:text-slate-gray/50 border-0 border-b border-slate-gray/40 pb-2 focus:outline-none"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 w-full h-px bg-dusty-blue origin-center scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Results */}
      <div className="max-w-md mx-auto mt-8 text-center" aria-live="polite" role="status">
        <AnimatePresence mode="wait">
          {/* Empty state before typing */}
          {query.trim().length < 2 && guestCount > 0 && (
            <motion.p
              key="empty-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-body text-sm text-slate-gray/70"
            >
              {guestCount} guests · {tables.length} tables — try typing your first name
            </motion.p>
          )}

          {/* Exactly one guest → full welcome card with envelope reveal */}
          {singleMatch && (
            <motion.div key={`card-${singleMatch.guestName}-${singleMatch.tableNumber}`}>
              <SeatingResultCard guest={singleMatch} />
            </motion.div>
          )}

          {/* Several guests → compact pick list */}
          {results.length > 1 && (
            <motion.div
              key="multi"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {results.map((r, idx) => (
                <p
                  key={`${r.guestName}-${r.tableNumber}-${idx}`}
                  className="font-body text-lg text-slate-gray py-1.5"
                >
                  {r.guestName} <span className="text-slate-gray/60">|</span>{" "}
                  <span className="text-dusty-blue">Table {r.tableNumber}</span>
                </p>
              ))}
              <p className="font-body text-xs text-slate-gray/70 mt-3">
                Type the full name to see your table details
              </p>
            </motion.div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <motion.p
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-body text-slate-gray py-4"
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
