"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SeatingSearch } from "@/components/seating-search"
import { VenueFloorPlan } from "@/components/venue-floor-plan"
import type { SeatingTable } from "@/lib/utils"

export default function SeatingPage() {
  const [tables, setTables] = useState<SeatingTable[]>([])
  const [highlightedTable, setHighlightedTable] = useState<number | null>(null)
  const [highlightedGuest, setHighlightedGuest] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    fetch("/data/seating.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!Array.isArray(data?.tables)) throw new Error("Invalid seating data")
        setTables(data.tables)
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError("Could not load seating data.")
      })
    return () => controller.abort()
  }, [])

  /* Auto-scroll to highlighted table */
  useEffect(() => {
    if (highlightedTable) {
      document.getElementById(`table-${highlightedTable}`)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }
  }, [highlightedTable])

  return (
    <main className="min-h-screen bg-ice-blue pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dusty-blue hover:text-light-steel transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span className="font-body">Back to Home</span>
          </Link>

          <h1 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            Find Your Seat
          </h1>
          <div className="w-24 h-1 bg-muted-gold mx-auto" />
          <p className="font-body text-lg text-slate-gray mt-4">
            Search your name below to find your table assignment
          </p>
        </div>

        {error && (
          <p className="text-center font-body text-red-500 mb-8">{error}</p>
        )}

        {/* Search */}
        <SeatingSearch
          tables={tables}
          onTableHighlight={setHighlightedTable}
          onGuestHighlight={setHighlightedGuest}
        />

        {/* Venue Floor Plan */}
        {tables.length > 0 && (
          <VenueFloorPlan
            tables={tables}
            highlightedGuest={highlightedGuest}
          />
        )}
      </div>
    </main>
  )
}
