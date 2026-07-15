"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Church,
  MapPin,
  Martini,
  Sparkles,
  Music,
  Car,
  UtensilsCrossed,
  Heart,
  ChevronRight,
  Camera,
  Wine,
  CupSoda,
  Utensils,
} from "lucide-react"
import { EventDetailModal, type ModalItem } from "@/components/event-detail-modal"
import { DINNER_MENU } from "@/components/reception-menu-data"

interface TimelineEvent {
  time: string
  title: string
  icon: React.ReactNode
  details?: string[]
  // When set, the entry shows a button that opens a popup with the full detail
  // (cocktail-hour offerings, dinner menu) — keeps the timeline row compact.
  modal?: { label: string; heading?: string; numbered?: boolean; items: ModalItem[] }
  venue?: { name: string; address: string; mapQuery: string }
}

const events: TimelineEvent[] = [
  {
    time: "3:00 PM",
    title: "Prenuptial Mass",
    icon: <Church size={26} strokeWidth={1.5} />,
    venue: {
      name: "Holy Vietnamese Martyrs Catholic Church",
      address: "4545 Timmers Way, Norcross, GA 30093",
      mapQuery: "Holy Vietnamese Martyrs Catholic Church, 4545 Timmers Way, Norcross, GA 30093",
    },
  },
  {
    time: "6:00 PM",
    title: "Travel to Reception",
    icon: <Car size={26} strokeWidth={1.5} />,
    venue: {
      name: "Canton House",
      address: "2255 Pleasant Hill Rd Ste 250, Duluth, GA 30096",
      mapQuery: "Canton House, 2255 Pleasant Hill Rd Ste 250, Duluth, GA 30096",
    },
  },
  {
    time: "6:30 PM",
    title: "Greeting & Cocktail Hour",
    icon: <Martini size={26} strokeWidth={1.5} />,
    modal: {
      label: "View details",
      items: [
        {
          icon: <Camera size={18} strokeWidth={1.5} />,
          label: "Photos",
          text: "Pictures with us, then photo booth",
        },
        {
          icon: <Wine size={18} strokeWidth={1.5} />,
          label: "Bar",
          text: "Casamigo Reposado, Hennessy VSOP",
        },
        {
          icon: <CupSoda size={18} strokeWidth={1.5} />,
          label: "Non-Alcohol",
          text: "Coke, Diet Coke, Sprite, Jasmine Milk Tea",
        },
        {
          icon: <Utensils size={18} strokeWidth={1.5} />,
          label: "Childhood Snacks",
          text: "Bánh tráng trộn (rice paper salad), bắp xào (stir-fried corn)",
        },
      ],
    },
  },
  {
    time: "7:30 PM",
    title: "Wedding Party Entrance & Family Introduction",
    icon: <Sparkles size={26} strokeWidth={1.5} />,
  },
  {
    time: "7:45 PM",
    title: "Dinner",
    icon: <UtensilsCrossed size={26} strokeWidth={1.5} />,
    modal: { label: "View menu", ...DINNER_MENU },
  },
  {
    time: "8:30 PM",
    title: "Party Time",
    icon: <Music size={26} strokeWidth={1.5} />,
    details: ["Dance Floor Open, Karaoke"],
  },
  {
    time: "10:30 PM",
    title: "Reception Ends",
    icon: <Heart size={26} strokeWidth={1.5} />,
  },
]

function VenueLine({ venue }: { venue: NonNullable<TimelineEvent["venue"]> }) {
  return (
    <a
      href={`https://www.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group/venue mt-2 inline-block"
    >
      <span className="flex items-start gap-1.5 font-body text-sm text-dark-slate group-hover/venue:text-dusty-blue transition-colors">
        <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-muted-gold" />
        <span>
          {venue.name}
          <br />
          <span className="text-slate-gray">{venue.address}</span>
        </span>
      </span>
    </a>
  )
}

/**
 * Centered "Order of Events" timeline: a vertical line down the middle,
 * entries alternating left/right with the icon mirrored on the other side.
 */
export function OrderOfEventsTimeline() {
  const [active, setActive] = useState<TimelineEvent | null>(null)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        {/* Center line — spans the events only, not the signature below */}
        <div aria-hidden className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-dusty-blue/40" />

        <div className="space-y-12 md:space-y-16">
        {events.map((event, i) => {
          const textLeft = i % 2 === 0
          const text = (
            <div className={textLeft ? "text-right pr-6 md:pr-10" : "text-left pl-6 md:pl-10"}>
              <p className="font-display text-lg md:text-xl text-burgundy">{event.time}</p>
              <p className="font-display text-xl md:text-2xl text-dusty-blue mt-1">{event.title}</p>
              {event.details?.map((line) => (
                <p key={line} className="font-body text-sm text-slate-gray mt-2 leading-relaxed">
                  {line}
                </p>
              ))}
              {event.modal && (
                <button
                  type="button"
                  onClick={() => setActive(event)}
                  className="group/btn mt-3 inline-flex items-center gap-1 font-body text-sm text-dusty-blue hover:text-burgundy transition-colors"
                >
                  <span className="border-b border-muted-gold/60 pb-0.5 group-hover/btn:border-burgundy">
                    {event.modal.label}
                  </span>
                  <ChevronRight size={15} strokeWidth={1.5} />
                </button>
              )}
              {event.venue && <VenueLine venue={event.venue} />}
            </div>
          )
          const icon = (
            <div className={`flex ${textLeft ? "justify-start pl-6 md:pl-10" : "justify-end pr-6 md:pr-10"}`}>
              <div className="w-14 h-14 rounded-full bg-white border border-muted-gold/50 flex items-center justify-center text-dusty-blue shadow-sm">
                {event.icon}
              </div>
            </div>
          )
          return (
            <motion.div
              key={event.time}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative grid grid-cols-2 items-center"
            >
              {/* Tick connecting the entry to the center line */}
              <div
                aria-hidden
                className={`absolute top-1/2 left-1/2 h-px w-5 bg-dusty-blue/40 ${textLeft ? "-translate-x-full" : ""}`}
              />
              {textLeft ? (
                <>
                  {text}
                  {icon}
                </>
              ) : (
                <>
                  {icon}
                  {text}
                </>
              )}
            </motion.div>
          )
        })}
        </div>
      </div>

      {/* Signature, echoing the printed order-of-events card */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mt-14"
      >
        <p className="font-script text-3xl md:text-4xl text-dusty-blue">Tu Nguyen &amp; Nhan Tu</p>
        <p className="font-body text-sm text-slate-gray tracking-[0.25em] mt-3 uppercase">
          July 17, 2026 · Duluth, GA
        </p>
      </motion.div>

      <EventDetailModal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.title ?? ""}
        time={active?.time}
        heading={active?.modal?.heading}
        headerIcon={active?.icon}
        numbered={active?.modal?.numbered}
        items={active?.modal?.items ?? []}
      />
    </div>
  )
}
