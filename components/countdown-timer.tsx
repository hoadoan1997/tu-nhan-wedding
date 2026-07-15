"use client"

import { useState, useEffect, useCallback } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = targetDate.getTime() - Date.now()
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }, [targetDate])

  // Start null so the server and the first client render match. Computing the
  // countdown from Date.now() during render makes SSR and hydration disagree
  // (a few seconds apart) and throws a hydration error. The real values are
  // filled in after mount.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  const timeUnits = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds },
  ]

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {timeUnits.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="text-4xl md:text-6xl font-display text-white">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base text-ice-blue uppercase tracking-wider mt-2">
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
