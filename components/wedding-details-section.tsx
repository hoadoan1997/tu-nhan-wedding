"use client"

import { motion } from "framer-motion"
import { Church, PartyPopper } from "lucide-react"
import { MapEmbed } from "./map-embed"
import Image from "next/image"

interface EventCardProps {
  icon: React.ReactNode
  title: string
  venue: string
  address: string
  datetime: string
  mapUrl: string
  imageSrc: string
  delay: number
}

function EventCard({ icon, title, venue, address, datetime, mapUrl, imageSrc, delay }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      {/* Venue Photo */}
      <div className="relative h-48 md:h-56">
        <Image
          src={imageSrc}
          alt={venue}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-8">
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
      </div>
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
            venue="Holy Vietnamese Martyrs Catholic Church"
            address="4545 Timmers Way, Norcross, GA 30093"
            datetime="3:00 PM, Friday, July 17, 2026"
            mapUrl="https://www.google.com/maps?q=Holy+Vietnamese+Martyrs+Catholic+Church,+4545+Timmers+Way,+Norcross,+GA+30093&output=embed"
            imageSrc="/images/venue-ceremony.jpg"
            delay={0.2}
          />
          <EventCard
            icon={<PartyPopper size={32} />}
            title="Reception"
            venue="Canton House"
            address="2255 Pleasant Hill Rd Ste 250, Duluth, GA 30096"
            datetime="6:30 PM, Friday, July 17, 2026"
            mapUrl="https://www.google.com/maps?q=Canton+House,+2255+Pleasant+Hill+Rd+Ste+250,+Duluth,+GA+30096&output=embed"
            imageSrc="/images/venue-reception.jpg"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}
