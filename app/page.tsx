import { HeroSection } from "@/components/hero-section"
import { FamilyInvitationSection } from "@/components/family-invitation-section"
import { CoupleSection } from "@/components/couple-section"
import { LoveStorySection } from "@/components/love-story-section"
import { WeddingDetailsSection } from "@/components/wedding-details-section"
import { GiftRegistrySection } from "@/components/gift-registry-section"
import { GuestbookSection } from "@/components/guestbook-section"
import { getSheetRows } from "@/lib/google-sheets"

export default async function Home() {
  let guestbookEntries: { timestamp: string; name: string; message: string }[] = []

  try {
    const rows = await getSheetRows()
    guestbookEntries = rows
      .slice(1) // Skip header row
      .filter((row) => row[4]) // Only entries with messages
      .map((row) => ({
        timestamp: row[0],
        name: row[1],
        message: row[4],
      }))
      .reverse() // Most recent first
      .slice(0, 12) // Max 12 entries
  } catch {
    // Gracefully handle missing Google Sheets config
  }

  return (
    <main>
      <HeroSection />
      <FamilyInvitationSection />
      <CoupleSection />
      <LoveStorySection />
      <WeddingDetailsSection />
      <GiftRegistrySection />
      <GuestbookSection entries={guestbookEntries} />
    </main>
  )
}
