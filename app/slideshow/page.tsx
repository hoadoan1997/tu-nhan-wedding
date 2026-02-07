"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const photos = Array.from({ length: 22 }, (_, i) => ({
  src: `/images/wedding-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Wedding photo ${i + 1}`,
}))

export default function SlideshowPage() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % photos.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="fixed inset-0 bg-black cursor-pointer" onClick={next}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={photos[current].src}
            alt={photos[current].alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
