import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { RSVPForm } from "@/components/rsvp-form"

export const metadata = {
  title: "RSVP | Tu Nguyen & Nhan Tu",
  description: "Please confirm your attendance at our wedding celebration",
}

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-ice-blue pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dusty-blue hover:text-light-steel transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span className="font-body">Back to Home</span>
          </Link>

          <h1 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            RSVP
          </h1>
          <div className="w-24 h-1 bg-muted-gold mb-4" />
          <p className="font-body text-lg text-slate-gray">
            Your presence would be our greatest honor. Please confirm your attendance so we can prepare the best for you.
          </p>
        </div>

        <RSVPForm />
      </div>
    </main>
  )
}
