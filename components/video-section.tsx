"use client"

import { motion } from "framer-motion"

export function VideoSection() {
  return (
    <section className="py-20 md:py-32 bg-cool-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            Our Video
          </h2>
          <div className="w-24 h-1 bg-muted-gold mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-video w-full rounded-lg overflow-hidden shadow-xl"
        >
          <iframe
            src="https://www.youtube.com/embed/6FTjZGJNdOw"
            title="Wedding Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
