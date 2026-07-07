"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useSyncExternalStore } from "react"
import { CountdownTimer } from "./countdown-timer"
import { ScrollIndicator } from "./scroll-indicator"

/* Video files — set to true once MiniMax generates hero.webm/hero.mp4 */
const HAS_VIDEO = false

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}
function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true)

  useEffect(() => {
    if (!prefersReduced && HAS_VIDEO) videoRef.current?.play().catch(() => {})
  }, [prefersReduced])

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background layer — parallax photo (always present as base/poster) */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src="/images/wedding-01.jpg"
          alt="Wedding celebration"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Video overlay — plays on top of photo when available */}
        {HAS_VIDEO && !prefersReduced && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/video/hero.webm" type="video/webm" />
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-dark-slate/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-slate/30 via-transparent to-dark-slate/70" />
      </motion.div>

      {/* Hero Content — top section for names, bottom for countdown */}
      <div className="h-full flex flex-col items-center justify-between text-center px-4 pt-28 md:pt-32 pb-12 md:pb-16">
        {/* Top: Couple names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-white"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.4)" }}
        >
          Tú Nguyễn & Nhàn Từ
        </motion.h1>

        {/* Spacer — lets couple photo show in center */}
        <div />

        {/* Bottom: Save the date + countdown */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-ice-blue mb-2 tracking-widest"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            SAVE THE DATE
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl md:text-3xl font-display text-white mb-8"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            07 / 17 / 2026
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <CountdownTimer targetDate={new Date("2026-07-17T15:00:00-04:00")} />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
