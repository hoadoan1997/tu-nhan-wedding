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
  autoFocus?: boolean
}

/**
 * Match query words against a contiguous run of EXACT name words only — no
 * substrings, no prefixes. Diacritic-stripped Vietnamese words collide often
 * ("Nguyễn"→"nguyen" contains "yen"; "Trịnh"→"trinh" and "Triệu"→"trieu" both
 * *start with* "tri"), so both `.includes()` and `.startsWith()` produce
 * false matches between genuinely different names once accents are gone.
 * Sliding the exact-word window across name-word positions still lets a full
 * name like "Hồ Văn Sơn" or a partial "Văn Sơn" match, not just one word.
 */
function nameMatches(name: string, queryWords: string[]): boolean {
  const nameWords = removeDiacritics(name).toLowerCase().split(/\s+/)
  for (let start = 0; start <= nameWords.length - queryWords.length; start++) {
    if (queryWords.every((w, i) => nameWords[start + i] === w)) return true
  }
  return false
}

export function SeatingSearch({ tables, autoFocus = false }: SeatingSearchProps) {
  const [query, setQuery] = useState("")

  const normalizedQuery = removeDiacritics(query).toLowerCase().trim()
  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean)

  const results: SearchResult[] = normalizedQuery.length >= 2
    ? tables.flatMap((table) =>
        table.guests
          .filter((guest) => nameMatches(guest.name, queryWords))
          .map((guest) => ({
            guestName: guest.name,
            tableNumber: table.number,
            tableName: table.name,
          }))
      )
    : []

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
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search guest name"
          placeholder="Type your name to find your seat..."
          autoFocus={autoFocus}
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
