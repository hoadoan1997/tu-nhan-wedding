"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

interface GuestbookEntry {
  name: string
  message: string
  timestamp: string
}

interface GuestbookSectionProps {
  entries: GuestbookEntry[]
}

export function GuestbookSection({ entries }: GuestbookSectionProps) {
  return (
    <section id="guestbook" className="py-20 md:py-32 bg-ice-blue">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            Guestbook
          </h2>
          <div className="w-24 h-1 bg-muted-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.length > 0 ? (
            entries.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-start gap-3 mb-3">
                  <MessageCircle className="text-dusty-blue flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-display text-lg text-dark-slate">{entry.name}</h4>
                    <p className="text-xs text-slate-gray">
                      {new Date(entry.timestamp).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm text-dark-slate leading-relaxed">
                  {entry.message}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-slate-gray font-body">
              No wishes yet. Be the first to send your blessings!
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
