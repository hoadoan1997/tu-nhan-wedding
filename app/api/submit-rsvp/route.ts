import { NextResponse } from "next/server"
import { appendToSheet } from "@/lib/google-sheets"

/** Sanitize input to prevent Google Sheets formula injection */
function sanitize(input: string): string {
  const trimmed = input.trim()
  // Prefix with single quote if starts with formula characters
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`
  }
  return trimmed
}

/** Simple in-memory rate limiter (per IP, 5 requests per minute) */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }
  entry.count++
  return entry.count > 5
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const { name, phone, guests, message, honeypot } = await request.json()

    // Honeypot anti-spam check — if filled, it's a bot
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    if (!name || !phone || !guests) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate phone format (Vietnamese: 10-11 digits starting with 0)
    const phoneRegex = /^0\d{9,10}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      )
    }

    // Backend validation for guest count
    const guestCount = Number(guests)
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
      return NextResponse.json(
        { error: "Guest count must be between 1 and 10" },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()
    await appendToSheet([
      timestamp,
      sanitize(String(name)),
      sanitize(String(phone)),
      guestCount,
      sanitize(String(message || "")),
    ])

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to submit RSVP. Please try again." },
      { status: 500 }
    )
  }
}
