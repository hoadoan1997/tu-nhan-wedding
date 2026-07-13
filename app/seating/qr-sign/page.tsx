import Image from "next/image"

export const metadata = {
  title: "Find Your Seat — QR Sign",
  description: "Printable QR sign for the reception seating finder",
  robots: { index: false, follow: false },
}

/* Mirrors the /seating page look: full-width couple photo banner fading
   into the rose background, script names, and dusty-rose text. */
export default function QrSignPage() {
  return (
    <main className="min-h-screen bg-ice-blue">
      {/* Printable A4 sign */}
      <div className="qr-sign-page bg-ice-blue max-w-2xl mx-auto text-center">
        {/* Full-width couple photo banner, same as /seating */}
        <div className="qr-sign-banner relative h-64 w-full">
          <Image
            src="/images/hero-couple-2026.jpg"
            alt="Tu Nguyen & Nhan Tu"
            fill
            priority
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover object-center"
          />
          {/* Soft fade into the rose background */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ice-blue" />
        </div>

        <div className="px-8 pt-8 pb-14">
          <p className="font-script text-5xl text-dusty-blue">Tu Nguyen &amp; Nhan Tu</p>

          <h1 className="font-body text-3xl text-dusty-blue tracking-wide mt-6">
            Please find your seat
          </h1>

          <div className="w-24 h-1 bg-muted-gold mx-auto my-8" />

          {/* White card behind the QR keeps scanner contrast on the rose background */}
          <div className="inline-block bg-white rounded-2xl p-5 border border-muted-gold/40">
            <img
              src="/images/qr-seating.svg"
              alt="QR code to find your seat"
              width={300}
              height={300}
            />
          </div>

          <div className="mt-10 font-body text-lg text-slate-gray space-y-2">
            <p>1. Open your phone camera</p>
            <p>2. Scan the code</p>
            <p>3. Type your name to find your table</p>
          </div>
        </div>
      </div>

      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        @media print {
          /* Force the rose background and photo to actually print */
          .qr-sign-page,
          .qr-sign-page * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .qr-sign-page {
            width: 100%;
            max-width: none;
            min-height: 297mm; /* fill the whole A4 sheet with the background */
          }
          .qr-sign-banner {
            height: 80mm;
          }
        }
      `}</style>
    </main>
  )
}
