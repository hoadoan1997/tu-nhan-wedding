"use client"

import { motion } from "framer-motion"
import { Church, PartyPopper } from "lucide-react"
import { MapEmbed } from "./map-embed"

interface EventCardProps {
  icon: React.ReactNode
  title: string
  venue: string
  address: string
  datetime: string
  mapUrl: string
  delay: number
}

function EventCard({ icon, title, venue, address, datetime, mapUrl, delay }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-dusty-blue/10 rounded-full flex items-center justify-center text-dusty-blue">
          {icon}
        </div>
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-dusty-blue text-center mb-6">
        {title}
      </h3>
      <div className="space-y-3 mb-6">
        <div>
          <p className="text-sm text-slate-gray uppercase tracking-wider mb-1">Venue</p>
          <p className="font-display text-lg text-dark-slate">{venue}</p>
        </div>
        <div>
          <p className="text-sm text-slate-gray uppercase tracking-wider mb-1">Address</p>
          <p className="font-body text-dark-slate">{address}</p>
        </div>
        <div>
          <p className="text-sm text-slate-gray uppercase tracking-wider mb-1">Date & Time</p>
          <p className="font-body text-dark-slate">{datetime}</p>
        </div>
      </div>
      <MapEmbed placeUrl={mapUrl} title={venue} />
    </motion.div>
  )
}

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
            Wedding Details
          </h2>
          <div className="w-24 h-1 bg-muted-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <EventCard
            icon={<Church size={32} />}
            title="Ceremony"
            venue="Notre-Dame Cathedral Basilica"
            address="01 Cong xa Paris, Ben Nghe, District 1, Ho Chi Minh City"
            datetime="5:00 PM - 6:00 PM, Saturday, December 31, 2026"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4948820622156!2d106.69831731411765!3d10.779573192317883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d18e998774!2sNotre-Dame%20Cathedral%20Basilica%20of%20Saigon!5e0!3m2!1sen!2s"
            delay={0.2}
          />
          <EventCard
            icon={<PartyPopper size={32} />}
            title="Reception"
            venue="GEM Center"
            address="08 Nguyen Binh Khiem, Da Kao, District 1, Ho Chi Minh City"
            datetime="7:00 PM - 9:00 PM, Saturday, December 31, 2026"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5166851385384!2d106.70041!3d10.7876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49dab%3A0xa1bd14e483a602db!2sGEM%20Center!5e0!3m2!1sen!2s"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}
