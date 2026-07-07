"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { SeatingSearch } from "@/components/seating-search"
import type { SeatingTable } from "@/lib/utils"

export default function SeatingPage() {
  const [tables, setTables] = useState<SeatingTable[]>([])
  const [error, setError] = useState("")
  const [fromQr] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("src") === "qr"
  )

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

  return (
    <main className="min-h-screen bg-ice-blue pb-16">
      {/* Full-width couple photo banner (same photo as the home hero) */}
      <div className="relative h-56 md:h-80 w-full">
        <Image
          src="/images/wedding-01.jpg"
          alt="Tu Nguyen & Nhan Tu"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft fade into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ice-blue" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Header — minimal, matching the printed QR sign */}
        <div className="mb-10 text-center">
          <p className="font-script text-5xl md:text-6xl text-dusty-blue">
            Tu &amp; Nhan
          </p>
          <h1 className="font-body text-2xl md:text-3xl text-dusty-blue tracking-wide mt-6">
            Please find your seat
          </h1>
        </div>

        {error && (
          <p className="text-center font-body text-red-500 mb-8">{error}</p>
        )}

        {/* Search */}
        <SeatingSearch tables={tables} autoFocus={fromQr} />
      </div>
    </main>
  )
}
