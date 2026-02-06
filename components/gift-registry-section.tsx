"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

export function GiftRegistrySection() {
  const [copied, setCopied] = useState(false)
  const accountNumber = "1234567890"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="gift" className="py-20 md:py-32 bg-cool-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            Wedding Gift
          </h2>
          <div className="w-24 h-1 bg-muted-gold mx-auto mb-4" />
          <p className="font-body text-lg text-slate-gray">
            Your presence is the most precious gift. If you would like to send your blessings another way:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bank Info */}
            <div>
              <h3 className="font-display text-2xl text-dusty-blue mb-6">
                Bank Transfer
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-gray mb-1">Bank</p>
                  <p className="font-body text-lg text-dark-slate">Vietcombank</p>
                </div>
                <div>
                  <p className="text-sm text-slate-gray mb-1">Account Holder</p>
                  <p className="font-body text-lg text-dark-slate">NGUYEN VAN A</p>
                </div>
                <div>
                  <p className="text-sm text-slate-gray mb-1">Account Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-lg text-dark-slate">{accountNumber}</p>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-ice-blue rounded-lg transition-colors"
                      aria-label="Copy account number"
                    >
                      {copied ? (
                        <CheckCircle size={20} className="text-dusty-blue" />
                      ) : (
                        <Copy size={20} className="text-slate-gray" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-slate-gray mb-4">Scan QR code to transfer</p>
              <div className="relative w-48 h-48 bg-ice-blue rounded-lg p-4">
                <Image
                  src="/images/wedding-composite.jpg"
                  alt="QR Code for bank transfer"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
