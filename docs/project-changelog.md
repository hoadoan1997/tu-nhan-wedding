# Project Changelog

All notable changes to the wedding website are documented here.

## [2026-07-07] — QR Code for Find Your Seat + Floor Plan Removal + Search Fix

### Added
- `app/seating/qr-sign/page.tsx` — printable A4 sign (noindex), couple photo, cursive heading, static QR image, 3-step instructions
- `public/images/qr-seating.svg` — QR encoding `https://weddingwebsite-zeta-two.vercel.app/seating?src=qr`, burgundy/white theme colors, error correction Q, no runtime dependency
- `?src=qr` autofocuses the seating search input on arrival; organic `/seating` visits are unaffected
- `@media print` rule in `globals.css` hides global nav/footer/music-toggle when printing the QR sign
- `NEXT_PUBLIC_SITE_URL` set on Vercel Production — matches the URL baked into the printed QR; do not change without reprinting

### Removed
- Venue floor plan visualization on `/seating` (user feedback: not visually clear on mobile) — deleted `venue-floor-plan.tsx`, `round-table.tsx`, `venue-decorations.tsx`, `guest-avatar.tsx`, `guest-avatar-variants.tsx` and the now-dead `.dance-floor`/`shimmer` CSS. `/seating` now returns a name/table-number/table-name card only.

### Fixed
- Seating search false positives from diacritic-stripped substring/prefix matching (e.g. "Yến" matched every "Nguyễn ...", "Trí" matched "Trịnh"/"Triệu"). Search now does strict whole-word matching via a sliding window across name words, supporting both single-word and full multi-word queries (e.g. "Hồ Văn Sơn").

### Known Limitation
- "Vân" and "Văn" still normalize to the same string (diacritic-stripping collapses â/ă to plain "a") — accepted trade-off; fixing it would break plain-ASCII typing for most other Vietnamese names.

---

## [2026-03-03] — MiniMax Media Enhancement & Enhanced Seating Floor Plan

### Infrastructure (Phase 01)
- **MiniMax MCP Configuration**
  - Added `.mcp.json` for MiniMax integration
  - Enabled AI video/audio generation capabilities
- **New Directories Created**
  - `public/video/` — Video file storage (future video embeddings)
  - `public/images/ai/` — AI-generated image assets
  - `public/minimax-output/` — MiniMax processing outputs
  - `public/audio/` — Background music and audio files
- **Git Configuration**
  - Updated `.gitignore` to handle new asset directories

### Components (Phase 08 — Enhanced Seating)
#### `guest-avatar.tsx` — Initials-Based Avatars
- **Replaced**: SVG avatar variants with role-based initials avatars
- **Color System**: 8 guest roles with distinct background colors
  - Bride: Rose (#C4919B), Groom: Dusty Blue (#7B9CB8)
  - Elders: Gold/Burgundy tones, Young guests: Lighter pastels
- **Features**:
  - Dynamic initials extraction from guest names
  - Role-based styling with semantic colors
  - Highlighted state with gold ring & shadow for search results
  - Responsive font sizing (8px–13px via clamp)

#### `round-table.tsx` — Enhanced Table Visualization
- **Visual Enhancements**:
  - Radial gradient tablecloth (40% highlight → 100% rose shadow)
  - Subtle drop shadow for depth
  - Tiny gold centerpiece dot on table label
  - WhileHover scale animation (1.05x spring physics)
- **Guest Interaction**:
  - Radial CSS positioning around circular tables
  - Highlighted guest scales to 1.25x with gold ring
  - Dynamic label sizing (full name when highlighted, last name otherwise)
  - Smooth spring animations on highlight state change

#### `venue-decorations.tsx` — Decorative Elements
- **Dance Floor**:
  - Checkerboard pattern via CSS gradient
  - CSS keyframe shimmer animation for visual depth
  - Reduced-motion support via prefers-reduced-motion media query
- **Stage**:
  - Wood-grain texture via repeating linear gradient
  - Music note SVG icon + "Stage" label
  - Rounded top corners with subtle border/shadow
- **Trees & Flowers**:
  - Inline SVG components (TreeIcon, FlowerIcon)
  - Sage green trees, muted gold flowers
  - Opacity-based layering for subtle appearance
- **Floating Petals** (NEW)
  - 8 ambient petal particles with Framer Motion animation
  - Responsive visibility (hidden on mobile, hides with prefers-reduced-motion)
  - Dynamic duration & stagger via useSyncExternalStore subscription
  - Smooth vertical drift animation

#### `venue-floor-plan.tsx` — Floor Plan Container
- **Visual Updates**:
  - Warm gradient background for venue ambiance
  - Integrated FloatingPetals component for ambient animation
- **Accessibility**:
  - Respects prefers-reduced-motion for all particle animations

### Layout (Phase 02 Prep)
#### `hero-section.tsx` — Video-Ready Structure
- **Video Infrastructure**:
  - Added `HAS_VIDEO` feature flag for conditional rendering
  - `<video>` element with WebM + MP4 source fallback
  - Native controls support for user interaction
- **Accessibility**:
  - Implemented useSyncExternalStore for reduced-motion detection
  - Video muted by default if animation disabled
  - Responsive sizing (full width, max-height constraints)

### CSS (Global Styles)
#### `globals.css` — New Keyframes & Utilities
- **Dance Floor Shimmer** (`@keyframes dance-floor-shimmer`)
  - Alternating opacity for checkerboard effect
  - 2-second loop via `animation: dance-floor-shimmer 2s ease-in-out infinite`
- **Reduced Motion Support**
  - `@media (prefers-reduced-motion: reduce)` disables all animations
  - Applied to dance floor, petals, and scroll indicators

### Breaking Changes
- None — enhancements are backward compatible

### Migration Notes
- No migration required for existing deployments
- Video embedding in hero section is opt-in via `HAS_VIDEO` flag
- Petal animations automatically disable on low-motion preference

### Known Limitations
- Petal animations hidden on viewport < 768px (tablet & mobile)
- MiniMax asset directories ready but not yet populated
- Video feature requires `.webm` and `.mp4` files in `public/video/`

---

## [2026-02-XX] — Initial Release

### Features
- Multi-section homepage (hero, couple, story, details, registry, guestbook)
- Interactive photo gallery with lightbox
- RSVP form with Google Sheets integration
- 12-table seating chart with guest search
- Background music toggle
- Smooth scroll animations via Framer Motion
- Responsive design (mobile, tablet, desktop)

### Security
- Input sanitization & formula injection prevention
- Rate limiting (5 req/min per IP)
- Honeypot spam detection

### Infrastructure
- Vercel deployment ready
- Google Sheets API integration
- Next.js 16 + Tailwind v4 + TypeScript 5
