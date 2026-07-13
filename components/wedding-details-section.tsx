"use client"

import { motion } from "framer-motion"
import { OrderOfEventsTimeline } from "./order-of-events-timeline"

export function WeddingDetailsSection() {
  return (
    <section id="details" className="py-20 md:py-32 bg-cool-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            Order of Events
          </h2>
          <div className="w-24 h-1 bg-muted-gold mx-auto" />
        </motion.div>

        <OrderOfEventsTimeline />
      </div>
    </section>
  )
}
