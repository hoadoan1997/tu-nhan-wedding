"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { SeatingSearch } from "@/components/seating-search"
import { FallingPetals } from "@/components/falling-petals"
import type { SeatingTable } from "@/lib/utils"

export default function SeatingPage() {
  const [tables, setTables] = useState<SeatingTable[]>([])
  const [error, setError] = useState("")
  const [fromQr] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("src") === "qr"
  )

  // Subtle parallax: banner photo scrolls slower than the page
  const bannerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const bannerY = useTransform(scrollY, [0, 400], [0, 120])

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
      <FallingPetals />

      {/* Full-width couple photo banner (same photo as the home hero) */}
      <div ref={bannerRef} className="relative h-56 md:h-80 w-full overflow-hidden">
        {/* Oversized + translated for parallax without exposing edges */}
        <motion.div style={{ y: bannerY }} className="absolute inset-0 scale-125">
          <Image
            src="/images/wedding-01.jpg"
            alt="Tu Nguyen & Nhan Tu"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        {/* Soft fade into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ice-blue" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Header — minimal, matching the printed QR sign */}
        <div className="mb-10 text-center">
          {/* Handwriting-style reveal: name sweeps in left-to-right once on load */}
          {/* Negative insets keep the script font's overflowing swashes
              (Pinyon ascenders/descenders) outside the clipping edge */}
          <motion.p
            initial={{ clipPath: "inset(-30% 110% -30% -10%)", opacity: 0.4 }}
            animate={{ clipPath: "inset(-30% -10% -30% -10%)", opacity: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="font-script text-4xl md:text-6xl text-dusty-blue"
          >
            Tu Nguyen &amp; Nhan Tu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="font-body text-2xl md:text-3xl text-dusty-blue tracking-wide mt-6"
          >
            Please find your seat
          </motion.h1>
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
