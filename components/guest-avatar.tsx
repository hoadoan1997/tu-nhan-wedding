import { cn } from "@/lib/utils"
import type { GuestRole } from "@/lib/utils"
import {
  GroomAvatar, BrideAvatar, MaleAvatar, FemaleAvatar,
  ElderMaleAvatar, ElderFemaleAvatar, BoyAvatar, GirlAvatar,
} from "@/components/guest-avatar-variants"

interface GuestAvatarProps {
  role: GuestRole
  highlighted?: boolean
  className?: string
}

const AVATAR_MAP: Record<GuestRole, () => React.ReactElement> = {
  groom: GroomAvatar,
  bride: BrideAvatar,
  male: MaleAvatar,
  female: FemaleAvatar,
  "elder-male": ElderMaleAvatar,
  "elder-female": ElderFemaleAvatar,
  boy: BoyAvatar,
  girl: GirlAvatar,
}

export function GuestAvatar({ role, highlighted = false, className }: GuestAvatarProps) {
  const AvatarSvg = AVATAR_MAP[role]

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden",
        highlighted && "ring-2 ring-muted-gold shadow-[0_0_12px_rgba(201,185,154,0.5)]",
        className
      )}
    >
      <AvatarSvg />
    </div>
  )
}
