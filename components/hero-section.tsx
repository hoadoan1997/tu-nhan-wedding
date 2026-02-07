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
        {/* Parents' Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-6 md:mb-8"
        >
          {/* Groom's Parents */}
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-ice-blue/80 uppercase tracking-[0.2em] mb-1">
              Groom&apos;s Parents
            </p>
            <p className="font-display text-sm md:text-base text-white leading-relaxed">
              Joseph Nguyễn Xuân Anh
            </p>
            <p className="font-display text-sm md:text-base text-white leading-relaxed">
              Mary Trịnh Thị Kim Tuyết
            </p>
          </div>
          {/* Bride's Parents */}
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-ice-blue/80 uppercase tracking-[0.2em] mb-1">
              Bride&apos;s Parents
            </p>
            <p className="font-display text-sm md:text-base text-white leading-relaxed">
              Thành Từ
            </p>
            <p className="font-display text-sm md:text-base text-white leading-relaxed">
              Yến Lâm
            </p>
          </div>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 mb-6"
        >
          {/* Groom */}
          <div className="text-center">
            <p className="font-display text-xs md:text-sm text-ice-blue italic">Joseph</p>
            <p className="font-script text-4xl md:text-6xl lg:text-7xl text-white">Tú Nguyễn</p>
            <p className="text-xs md:text-sm text-ice-blue tracking-[0.15em] mt-1">Trưởng Nam</p>
          </div>
          {/* Ampersand */}
          <span className="font-script text-3xl md:text-5xl text-muted-gold my-1 md:my-0">&</span>
          {/* Bride */}
          <div className="text-center">
            <p className="font-display text-xs md:text-sm text-ice-blue italic">Juliana</p>
            <p className="font-script text-4xl md:text-6xl lg:text-7xl text-white">Nhàn Từ</p>
            <p className="text-xs md:text-sm text-ice-blue tracking-[0.15em] mt-1">Út Nữ</p>
          </div>
        </motion.div>

        {/* Save The Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-xl md:text-2xl text-ice-blue mb-3 tracking-widest"
        >
          SAVE THE DATE
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-2xl md:text-3xl font-display text-white mb-8"
        >
          07 / 17 / 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <CountdownTimer targetDate={new Date("2026-07-17T15:00:00-04:00")} />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
