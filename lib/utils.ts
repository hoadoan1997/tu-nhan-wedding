import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Vietnamese diacritics removal for fuzzy name search
export function removeDiacritics(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
}

export type GuestRole = "groom" | "bride" | "male" | "female" | "elder-male" | "elder-female" | "boy" | "girl"

export interface Guest {
  name: string
  role: GuestRole
}

export interface SeatingTable {
  number: number
  name: string
  guests: Guest[]
}

export interface SeatingData {
  tables: SeatingTable[]
}
