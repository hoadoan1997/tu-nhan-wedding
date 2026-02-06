"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface TimelineCardProps {
  date: string
  title: string
  description: string
  imageSrc: string
  side: "left" | "right"
}

export function TimelineCard({ date, title, description, imageSrc, side }: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12 md:mb-16 ${
        side === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Card Content */}
      <div className="flex-1 bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <p className="text-xs md:text-sm text-muted-gold uppercase tracking-wider mb-2">
          {date}
        </p>
        <h3 className="font-display text-xl md:text-2xl text-dusty-blue mb-3">
          {title}
        </h3>
        <p className="font-body text-sm md:text-base text-dark-slate leading-relaxed">
          {description}
        </p>
      </div>

      {/* Timeline Dot (Desktop Only) */}
      <div className="hidden md:block w-4 h-4 bg-dusty-blue rounded-full border-4 border-ice-blue z-10 flex-shrink-0" />

      {/* Photo */}
      <div className="flex-1 relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-md">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </motion.div>
  )
}
