import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { GalleryGrid } from "@/components/gallery-grid"
import { GalleryLightbox } from "@/components/gallery-lightbox"

export const metadata = {
  title: "Wedding Gallery | Tu Nguyen & Nhan Tu",
  description: "Our most beautiful moments captured in photos",
}

/* All 22 retouched photos + 1 composite */
const galleryPhotos = Array.from({ length: 22 }, (_, i) => ({
  src: `/images/wedding-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Wedding photo ${i + 1}`,
  width: 800,
  height: 1200,
})).concat({
  src: "/images/wedding-composite.jpg",
  alt: "Wedding composite photo",
  width: 1200,
  height: 800,
})

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-ice-blue pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dusty-blue hover:text-light-steel transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span className="font-body">Back to Home</span>
          </Link>

          <h1 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            Wedding Gallery
          </h1>
          <div className="w-24 h-1 bg-muted-gold" />
          <p className="font-body text-lg text-slate-gray mt-4">
            Our most beautiful moments captured in photos
          </p>
        </div>

        {/* Gallery */}
        <GalleryGrid>
          <GalleryLightbox photos={galleryPhotos} />
        </GalleryGrid>
      </div>
    </main>
  )
}
