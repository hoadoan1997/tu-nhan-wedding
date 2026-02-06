"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

export function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: 1,
    message: "",
    honeypot: "", // Anti-spam hidden field
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/submit-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit")
      }

      setSuccess(true)
      setFormData({ name: "", phone: "", guests: 1, message: "", honeypot: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit RSVP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-20 h-20 text-dusty-blue mx-auto mb-6" />
            <h3 className="font-display text-3xl text-dusty-blue mb-4">
              Thank You!
            </h3>
            <p className="font-body text-lg text-slate-gray">
              We have received your RSVP. We look forward to celebrating with you!
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-8 px-6 py-3 bg-dusty-blue text-white rounded-lg hover:bg-light-steel transition-colors"
            >
              Submit Another RSVP
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            {/* Honeypot field — hidden from users, visible to bots */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-body text-dark-slate mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-dusty-blue"
                placeholder="Your full name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-body text-dark-slate mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-dusty-blue"
                placeholder="0912345678"
                pattern="^0\d{9,10}$"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="guests" className="block text-sm font-body text-dark-slate mb-2">
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="guests"
                required
                min="1"
                max="10"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-dusty-blue"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-body text-dark-slate mb-2">
                Your Wishes (Optional)
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-dusty-blue resize-none"
                placeholder="Send your best wishes to the couple..."
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-dusty-blue text-white rounded-lg hover:bg-light-steel transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send size={20} />
                  <span>Confirm Attendance</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
