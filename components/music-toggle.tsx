"use client"

import { useState, useRef, useCallback } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function MusicToggle({ audioSrc }: { audioSrc: string }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const initializedRef = useRef(false)

  /* Restore music state on first user interaction (avoids autoplay issues) */
  const handleFirstInteraction = useCallback(() => {
    if (initializedRef.current || !audioRef.current) return
    initializedRef.current = true
    const consent = localStorage.getItem("music-consent")
    if (consent === "true") {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [])

  const toggle = () => {
    handleFirstInteraction()
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
    localStorage.setItem("music-consent", String(!playing))
  }

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 bg-dusty-blue text-white p-4 rounded-full shadow-lg hover:bg-light-steel transition-colors"
        aria-label={playing ? "Mute music" : "Play music"}
      >
        {playing ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </>
  )
}
