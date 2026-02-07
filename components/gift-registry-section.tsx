"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"

export function GiftRegistrySection() {
  return (
    <section id="gift" className="py-20 md:py-32 bg-cool-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            Registry
          </h2>
          <div className="w-24 h-1 bg-muted-gold mx-auto mb-10" />

          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-dusty-blue/10 rounded-full flex items-center justify-center">
              <Gift size={36} className="text-dusty-blue" />
            </div>
          </div>

          <p className="font-body text-lg md:text-xl text-slate-gray leading-relaxed max-w-2xl mx-auto">
            In lieu of a traditional registry, we kindly invite you to
            participate in a cherished Asian tradition by blessing us with your
            well wishes in form of red envelopes (紅包/lì xì)
          </p>
        </motion.div>
      </div>
    </section>
  )
}
