interface MapEmbedProps {
  placeUrl: string
  title: string
}

export function MapEmbed({ placeUrl, title }: MapEmbedProps) {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md mt-4">
      <iframe
        src={placeUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${title}`}
      />
    </div>
  )
}
