"use client"

import Masonry from "react-masonry-css"

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1,
}

export function GalleryGrid({ children }: { children: React.ReactNode }) {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {children}
    </Masonry>
  )
}
