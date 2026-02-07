"use client"

import { motion } from "framer-motion"
import { TimelineCard } from "./timeline-card"

const storyMilestones = [
  {
    date: "March 2020",
    title: "First Meeting",
    description:
      "We met for the first time at a small coffee shop near campus. A chance encounter that opened a beautiful love story.",
    imageSrc: "/images/wedding-04.jpg",
    side: "left" as const,
  },
  {
    date: "July 2020",
    title: "First Date",
    description:
      "Our first real date at the cinema, watching a romantic film and sharing stories about our lives and dreams.",
    imageSrc: "/images/wedding-05.jpg",
    side: "right" as const,
  },
  {
    date: "December 2021",
    title: "A Trip to Remember",
    description:
      "A memorable trip together to Da Lat, where we created unforgettable memories. Beautiful photos and sweet moments.",
    imageSrc: "/images/wedding-06.jpg",
    side: "left" as const,
  },
  {
    date: "May 2023",
    title: "The Proposal",
    description:
      "A romantic evening by the sea, he got down on one knee and proposed. The happiest moment of our lives.",
    imageSrc: "/images/wedding-12.jpg",
    side: "right" as const,
  },
  {
    date: "July 2026",
    title: "Our Big Day",
    description:
      "We will officially become husband and wife, starting a new chapter of our lives together. Thank you for being part of our journey!",
    imageSrc: "/images/wedding-09.jpg",
    side: "left" as const,
  },
]

export function LoveStorySection() {
  return (
    <section id="story" className="py-20 md:py-32 bg-ice-blue relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            Our Love Story
          </h2>
          <div className="w-24 h-1 bg-muted-gold mx-auto" />
        </motion.div>

        {/* Timeline Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-48 bottom-20 w-0.5 bg-silver/30" />

        <div className="relative">
          {storyMilestones.map((milestone, index) => (
            <TimelineCard key={index} {...milestone} />
          ))}
        </div>
      </div>
    </section>
  )
}
