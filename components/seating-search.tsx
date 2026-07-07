"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
      {/* Minimal underline-only search input */}
      <div className="max-w-sm mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search guest name"
          placeholder="Search by name"
          autoFocus={autoFocus}
          className="w-full bg-transparent text-center font-body text-lg text-dusty-blue placeholder:text-slate-gray/50 border-0 border-b border-slate-gray/40 pb-2 focus:outline-none focus:border-dusty-blue transition-colors"
        />
      </div>

      {/* Results as plain centered lines: "Name | Table N" */}
      <div className="max-w-md mx-auto mt-6 text-center" aria-live="polite" role="status">
        <AnimatePresence mode="popLayout">
          {results.map((r) => (
            <motion.p
              key={`${r.guestName}-${r.tableNumber}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="font-body text-lg text-slate-gray py-1.5"
            >
              {r.guestName} <span className="text-slate-gray/60">|</span>{" "}
              <span className="text-dusty-blue">Table {r.tableNumber}</span>
            </motion.p>
          ))}

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
