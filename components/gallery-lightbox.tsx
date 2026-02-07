"use client"

import { useState } from "react"
import Image from "next/image"
import Masonry from "react-masonry-css"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

interface Photo {
  src: string
  alt: string
  blurDataURL?: string
  width: number
  height: number
}

interface GalleryLightboxProps {
  photos: Photo[]
}

const breakpointCols = {
  default: 3,
  1024: 2,
  640: 1,
}

export function GalleryLightbox({ photos }: GalleryLightboxProps) {
  const [index, setIndex] = useState(-1)

  return (
    <>
      <Masonry
        breakpointCols={breakpointCols}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {photos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setIndex(idx)}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              placeholder={photo.blurDataURL ? "blur" : "empty"}
              blurDataURL={photo.blurDataURL}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-dark-slate/0 group-hover:bg-dark-slate/20 transition-colors duration-300" />
          </div>
        ))}
      </Masonry>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map((photo) => ({ src: photo.src, alt: photo.alt }))}
      />
    </>
  )
}
