import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Printer } from "lucide-react"

export const metadata = {
  title: "Find Your Seat — QR Sign",
  description: "Printable QR sign for the reception seating finder",
  robots: { index: false, follow: false },
}

/* Ink-safe (dark text on white) so it survives cheap print shops that drop background fills */
export default function QrSignPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* On-screen only helper — never printed */}
      <div className="print:hidden bg-ice-blue py-3 px-4 flex items-center justify-between max-w-3xl mx-auto">
        <Link
          href="/seating"
          className="inline-flex items-center gap-2 text-dusty-blue hover:text-light-steel transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="font-body text-sm">Back to Find Your Seat</span>
        </Link>
        <span className="inline-flex items-center gap-2 text-slate-gray font-body text-sm">
          <Printer size={16} />
          Press Cmd/Ctrl+P to print
        </span>
      </div>

      {/* Printable A4 sign */}
      <div className="qr-sign-page max-w-2xl mx-auto py-16 px-8 text-center">
        <div className="w-44 h-44 rounded-full overflow-hidden mx-auto border-2 border-muted-gold/60">
          <Image
            src="/images/wedding-01.jpg"
            alt="Tu Nguyen & Nhan Tu"
            width={176}
            height={176}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="font-display text-3xl text-dark-slate mt-6">Tu Nguyen &amp; Nhan Tu</p>

        <h1 className="font-script text-6xl text-burgundy mt-4">Please Find Your Seat</h1>

        <div className="w-24 h-1 bg-muted-gold mx-auto my-8" />

        <img
          src="/images/qr-seating.svg"
          alt="QR code to find your seat"
          width={320}
          height={320}
          className="mx-auto"
        />

        <div className="mt-10 font-body text-lg text-dark-slate space-y-2">
          <p>1. Open your phone camera</p>
          <p>2. Scan the code</p>
          <p>3. Type your name to find your table</p>
        </div>
      </div>

      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        @media print {
          .qr-sign-page {
            width: 100%;
            max-width: none;
            padding: 15mm;
          }
        }
      `}</style>
    </main>
  )
}
