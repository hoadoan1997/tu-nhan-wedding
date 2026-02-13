/* SVG avatar variant components for each GuestRole — used by GuestAvatar */

/* Shared skin/hair colors */
const SKIN = "#F5D5C8"
const SKIN_SHADOW = "#E8C4B8"
const HAIR_BLACK = "#2D2D2D"
const HAIR_GRAY = "#9CA3AF"
const SUIT_DARK = "#2D3748"
const DRESS_CREAM = "#FDF8F0"
const BLOUSE_ROSE = "#C4919B"
const GOLD = "#C9B99A"

export function GroomAvatar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-full h-full">
      <circle cx="24" cy="24" r="23" fill={SUIT_DARK} />
      <ellipse cx="24" cy="44" rx="18" ry="10" fill={SUIT_DARK} />
      <rect x="20" y="30" width="8" height="5" rx="2" fill={SKIN} />
      <circle cx="24" cy="22" r="10" fill={SKIN} />
      <path d="M14 20c0-6 4-12 10-12s10 6 10 12c0-2-3-8-10-8s-10 6-10 8z" fill={HAIR_BLACK} />
      <rect x="22" y="34" width="4" height="3" rx="1" fill={GOLD} />
      <path d="M14 38l10 4 10-4c0-3-4-5-10-5s-10 2-10 5z" fill={SUIT_DARK} />
      <path d="M19 36l5 6" stroke={SKIN_SHADOW} strokeWidth="0.5" opacity="0.3" />
      <path d="M29 36l-5 6" stroke={SKIN_SHADOW} strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

export function BrideAvatar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-full h-full">
      <circle cx="24" cy="24" r="23" fill={DRESS_CREAM} />
      <ellipse cx="24" cy="44" rx="16" ry="10" fill={DRESS_CREAM} />
      <rect x="21" y="30" width="6" height="4" rx="2" fill={SKIN} />
      <circle cx="24" cy="22" r="10" fill={SKIN} />
      <path d="M13 22c0-7 5-13 11-13s11 6 11 13c0-3-3-9-11-9s-11 6-11 9z" fill={HAIR_BLACK} />
      <ellipse cx="14" cy="26" rx="3" ry="8" fill={HAIR_BLACK} opacity="0.9" />
      <ellipse cx="34" cy="26" rx="3" ry="8" fill={HAIR_BLACK} opacity="0.9" />
      <circle cx="20" cy="12" r="2" fill={DRESS_CREAM} opacity="0.8" />
      <circle cx="18" cy="14" r="1.2" fill={BLOUSE_ROSE} opacity="0.6" />
      <path d="M16 37c0-2 4-4 8-4s8 2 8 4l-2 8H18l-2-8z" fill={DRESS_CREAM} />
    </svg>
  )
}

export function MaleAvatar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-full h-full">
      <circle cx="24" cy="24" r="23" fill="#E8D5D0" />
      <ellipse cx="24" cy="44" rx="16" ry="9" fill={SUIT_DARK} opacity="0.8" />
      <rect x="21" y="30" width="6" height="4" rx="2" fill={SKIN} />
      <circle cx="24" cy="22" r="9.5" fill={SKIN} />
      <path d="M14.5 20c0-6 4.5-11 9.5-11s9.5 5 9.5 11c0-2-3-7-9.5-7s-9.5 5-9.5 7z" fill={HAIR_BLACK} />
      <path d="M16 37c0-2 4-4 8-4s8 2 8 4v6H16v-6z" fill={SUIT_DARK} opacity="0.7" />
      <path d="M22 33v4" stroke={SKIN_SHADOW} strokeWidth="0.5" opacity="0.3" />
      <path d="M26 33v4" stroke={SKIN_SHADOW} strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

export function FemaleAvatar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-full h-full">
      <circle cx="24" cy="24" r="23" fill="#F0E0E3" />
      <ellipse cx="24" cy="44" rx="14" ry="9" fill={BLOUSE_ROSE} />
      <rect x="21" y="30" width="6" height="4" rx="2" fill={SKIN} />
      <circle cx="24" cy="22" r="9.5" fill={SKIN} />
      <path d="M14 21c0-6 4.5-12 10-12s10 6 10 12c0-3-3-8-10-8s-10 5-10 8z" fill={HAIR_BLACK} />
      <ellipse cx="14.5" cy="24" rx="2.5" ry="6" fill={HAIR_BLACK} opacity="0.85" />
      <ellipse cx="33.5" cy="24" rx="2.5" ry="6" fill={HAIR_BLACK} opacity="0.85" />
      <path d="M17 37c0-2 3.5-3.5 7-3.5s7 1.5 7 3.5v6H17v-6z" fill={BLOUSE_ROSE} />
    </svg>
  )
}

export function ElderMaleAvatar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-full h-full">
      <circle cx="24" cy="24" r="23" fill="#E0D8D5" />
      <ellipse cx="24" cy="44" rx="16" ry="9" fill={SUIT_DARK} />
      <rect x="21" y="30" width="6" height="4" rx="2" fill={SKIN_SHADOW} />
      <circle cx="24" cy="22" r="9.5" fill={SKIN_SHADOW} />
      <path d="M15 20c0-5.5 4-10 9-10s9 4.5 9 10c0-2-3-6.5-9-6.5s-9 4.5-9 6.5z" fill={HAIR_GRAY} />
      <circle cx="20" cy="22" r="3.5" stroke={SUIT_DARK} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="28" cy="22" r="3.5" stroke={SUIT_DARK} strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M23.5 22h1" stroke={SUIT_DARK} strokeWidth="1" opacity="0.5" />
      <path d="M15 37c0-2 4-4 9-4s9 2 9 4v7H15v-7z" fill={SUIT_DARK} />
    </svg>
  )
}

export function ElderFemaleAvatar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-full h-full">
      <circle cx="24" cy="24" r="23" fill="#E8DDD8" />
      <ellipse cx="24" cy="44" rx="14" ry="9" fill={BLOUSE_ROSE} opacity="0.8" />
      <rect x="21" y="30" width="6" height="4" rx="2" fill={SKIN_SHADOW} />
      <circle cx="24" cy="22" r="9.5" fill={SKIN_SHADOW} />
      <path d="M14 21c0-6 4.5-12 10-12s10 6 10 12c0-3-3-8-10-8s-10 5-10 8z" fill={HAIR_GRAY} />
      <circle cx="15" cy="18" r="2.5" fill={HAIR_GRAY} opacity="0.7" />
      <circle cx="33" cy="18" r="2.5" fill={HAIR_GRAY} opacity="0.7" />
      <circle cx="17" cy="15" r="2" fill={HAIR_GRAY} opacity="0.6" />
      <circle cx="31" cy="15" r="2" fill={HAIR_GRAY} opacity="0.6" />
      <path d="M17 37c0-2 3.5-3.5 7-3.5s7 1.5 7 3.5v6H17v-6z" fill={BLOUSE_ROSE} opacity="0.8" />
    </svg>
  )
}

export function BoyAvatar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-full h-full">
      <circle cx="24" cy="24" r="23" fill="#E8E4DF" />
      <ellipse cx="24" cy="46" rx="13" ry="8" fill={SUIT_DARK} opacity="0.6" />
      <rect x="22" y="31" width="4" height="3" rx="1.5" fill={SKIN} />
      <circle cx="24" cy="22" r="10" fill={SKIN} />
      <path d="M14 19c0-5 4.5-10 10-10s10 5 10 10c0-2-3.5-7-10-7s-10 5-10 7z" fill={HAIR_BLACK} />
      <path d="M18 11l2-2 3 1 3-1 2 2" stroke={HAIR_BLACK} strokeWidth="1.5" fill="none" />
      <path d="M18 38c0-1.5 3-3 6-3s6 1.5 6 3v6H18v-6z" fill={SUIT_DARK} opacity="0.5" />
    </svg>
  )
}

export function GirlAvatar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-full h-full">
      <circle cx="24" cy="24" r="23" fill="#F5E8EC" />
      <ellipse cx="24" cy="46" rx="12" ry="8" fill={BLOUSE_ROSE} opacity="0.7" />
      <rect x="22" y="31" width="4" height="3" rx="1.5" fill={SKIN} />
      <circle cx="24" cy="22" r="10" fill={SKIN} />
      <path d="M14 20c0-6 4.5-11 10-11s10 5 10 11c0-2.5-3.5-7.5-10-7.5s-10 5-10 7.5z" fill={HAIR_BLACK} />
      <circle cx="13" cy="20" r="3.5" fill={HAIR_BLACK} />
      <circle cx="35" cy="20" r="3.5" fill={HAIR_BLACK} />
      <circle cx="13" cy="17" r="2" fill={BLOUSE_ROSE} />
      <circle cx="35" cy="17" r="2" fill={BLOUSE_ROSE} />
      <path d="M18 38c0-1.5 3-3 6-3s6 1.5 6 3v6H18v-6z" fill={BLOUSE_ROSE} opacity="0.7" />
    </svg>
  )
}
