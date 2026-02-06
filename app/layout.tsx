import type { Metadata } from "next"
import { Playfair_Display, Cormorant_Garamond, Great_Vibes } from "next/font/google"
import { NavigationBar } from "@/components/navigation-bar"
import { MusicToggle } from "@/components/music-toggle"
import { Footer } from "@/components/footer"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-playfair",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-cormorant",
})

const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  display: "swap",
  variable: "--font-great-vibes",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Tu Nguyen & Nhan Tu | Wedding",
    template: "%s | Tu Nguyen & Nhan Tu",
  },
  description: "You are cordially invited to celebrate our wedding on December 31, 2026",
  keywords: ["wedding", "Tu Nguyen", "Nhan Tu", "celebration"],
  authors: [{ name: "Tu Nguyen & Nhan Tu" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Tu Nguyen & Nhan Tu Wedding",
    description: "Join us on our special day — December 31, 2026!",
    siteName: "Tu & Nhan Wedding",
    images: [
      {
        url: "/images/wedding-01.jpg",
        width: 1200,
        height: 630,
        alt: "Tu Nguyen & Nhan Tu wedding photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu Nguyen & Nhan Tu Wedding",
    description: "Join us on our special day!",
    images: ["/images/wedding-01.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body>
        <NavigationBar />
        {children}
        <Footer />
        <MusicToggle audioSrc="/audio/background-music.mp3" />
      </body>
    </html>
  )
}
