"use client"

import { motion } from "framer-motion"

export function FamilyInvitationSection() {
  return (
    <section className="py-16 md:py-24 bg-[#3D2B2E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Parents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12"
        >
          {/* Groom's Parents */}
          <div>
            <p className="text-[10px] md:text-xs text-ice-blue/70 uppercase tracking-[0.25em] mb-3">
              Groom&apos;s Parents
            </p>
            <p className="font-display text-base md:text-lg text-white leading-relaxed">
              Joseph Nguyễn Xuân Anh
            </p>
            <p className="font-display text-base md:text-lg text-white leading-relaxed">
              Mary Trịnh Thị Kim Tuyết
            </p>
          </div>
          {/* Bride's Parents */}
          <div>
            <p className="text-[10px] md:text-xs text-ice-blue/70 uppercase tracking-[0.25em] mb-3">
              Bride&apos;s Parents
            </p>
            <p className="font-display text-base md:text-lg text-white leading-relaxed">
              Thành Từ
            </p>
            <p className="font-display text-base md:text-lg text-white leading-relaxed">
              Yến Lâm
            </p>
          </div>
        </motion.div>

        <div className="w-16 h-0.5 bg-muted-gold mx-auto mb-12" />

        {/* Couple with Titles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
        >
          {/* Groom */}
          <div className="text-center">
            <p className="font-display text-xs md:text-sm text-ice-blue/80 italic mb-1">Joseph</p>
            <p className="font-script text-3xl md:text-5xl text-white mb-1">Tú Nguyễn</p>
            <p className="text-xs md:text-sm text-ice-blue/70 tracking-[0.15em]">Trưởng Nam</p>
          </div>
          {/* Ampersand */}
          <span className="font-script text-3xl md:text-4xl text-muted-gold">&</span>
          {/* Bride */}
          <div className="text-center">
            <p className="font-display text-xs md:text-sm text-ice-blue/80 italic mb-1">Juliana</p>
            <p className="font-script text-3xl md:text-5xl text-white mb-1">Nhàn Từ</p>
            <p className="text-xs md:text-sm text-ice-blue/70 tracking-[0.15em]">Út Nữ</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
