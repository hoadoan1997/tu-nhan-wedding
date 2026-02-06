"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import Image from "next/image"
import { CountdownTimer } from "./countdown-timer"
import { ScrollIndicator } from "./scroll-indicator"

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src="/images/wedding-01.jpg"
          alt="Wedding celebration"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-slate/30 via-transparent to-dark-slate/70" />
      </motion.div>

      {/* Hero Content */}
      <div className="h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-white mb-6"
        >
          Tu Nguyen & Nhan Tu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-ice-blue mb-4 tracking-widest"
        >
          SAVE THE DATE
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl md:text-3xl font-display text-white mb-12"
        >
          31 / 12 / 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <CountdownTimer targetDate={new Date("2026-12-31T18:00:00")} />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
