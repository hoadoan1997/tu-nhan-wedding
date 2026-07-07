# Codebase Structure Summary

## Directory Layout

```
wedding_website/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage (main scroll page, video-ready)
│   ├── gallery/page.tsx          # Gallery route
│   ├── rsvp/page.tsx             # RSVP form route
│   ├── seating/page.tsx          # Find Your Seat — name search only, no floor plan
│   ├── seating/qr-sign/page.tsx  # Printable A4 QR sign (noindex) for venue entrance
│   ├── layout.tsx                # Root layout wrapper
│   ├── template.tsx              # Global template (music, nav)
│   └── api/submit-rsvp/route.ts  # RSVP submission endpoint
├── components/                   # Reusable React components
│   ├── hero-section.tsx          # Video-ready with HAS_VIDEO flag
│   ├── couple-section.tsx
│   ├── love-story-section.tsx
│   ├── timeline-card.tsx
│   ├── wedding-details-section.tsx
│   ├── map-embed.tsx
│   ├── gift-registry-section.tsx
│   ├── guestbook-section.tsx
│   ├── gallery-grid.tsx
│   ├── gallery-lightbox.tsx
│   ├── rsvp-form.tsx
│   ├── countdown-timer.tsx
│   ├── navigation-bar.tsx
│   ├── music-toggle.tsx
│   ├── scroll-indicator.tsx
│   ├── footer.tsx
│   └── seating-search.tsx        # Guest name search — whole-word match, no floor plan visualization
├── lib/                          # Utility functions
│   ├── google-sheets.ts          # Google Sheets API client
│   └── utils.ts                  # Helper utilities (cn for clsx)
├── public/
│   ├── images/                   # 23 wedding photos (optimized)
│   ├── images/ai/                # AI-generated image assets (MiniMax)
│   ├── video/                    # Video files (WebM, MP4)
│   ├── audio/                    # Background music files
│   ├── minimax-output/           # MiniMax processing outputs
│   ├── data/seating.json         # 12-table seating configuration
│   └── *.svg                     # SVG assets
├── .mcp.json                     # MiniMax MCP configuration
├── globals.css                   # Global styles (masonry grid, print rules)
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS v4 config
└── next.config.js                # Next.js configuration
```

## Key Files

### App Routes
- `app/page.tsx` — Server component fetching guestbook from Google Sheets, video-ready hero
- `app/gallery/page.tsx` — Gallery page with grid and lightbox
- `app/rsvp/page.tsx` — RSVP form page
- `app/seating/page.tsx` — Guest name search → table assignment card (no visual floor plan)
- `app/seating/qr-sign/page.tsx` — Printable A4 sign with QR linking to `/seating?src=qr`
- `app/api/submit-rsvp/route.ts` — POST endpoint with validation & rate limiting

### Component Library
- **Layout**: navigation-bar, footer, scroll-indicator
- **Sections**: hero (video-ready), couple, love-story, wedding-details, gift-registry, guestbook
- **Seating**: seating-search (whole-word Vietnamese name matching)
- **Forms**: rsvp-form, gallery (grid + lightbox)
- **Utilities**: countdown-timer, music-toggle, map-embed, timeline-card

### Data Integration
- `lib/google-sheets.ts` — Handles authentication, append, and read operations
- Requires env vars: `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEET_ID`
- `public/data/seating.json` — 12 tables with guest name/role, source for seating-search

### Data Types (lib/utils.ts)
- `Guest` — `{ name: string, role: GuestRole }` (`role` is data-only now — no UI component consumes it since the floor plan/avatar removal below)
- `GuestRole` — "groom" | "bride" | "male" | "female" | "elder-male" | "elder-female" | "boy" | "girl"
- `SeatingTable` — `{ number: number, name: string, guests: Guest[] }`

## Recent Enhancements (2026-07-07)

### Find Your Seat — QR Code + Simplified Search
- **Added**: `app/seating/qr-sign/page.tsx` — printable A4 sign (noindex), couple photo, cursive heading, QR themed in burgundy, 3-step bilingual-free instructions
- **Added**: `public/images/qr-seating.svg` — static QR (no runtime dep), encodes `/seating?src=qr`
- **Added**: `?src=qr` autofocuses the search input on arrival (`app/seating/page.tsx`, `seating-search.tsx`)
- **Removed**: venue floor plan visualization entirely — `venue-floor-plan.tsx`, `round-table.tsx`, `venue-decorations.tsx`, `guest-avatar.tsx`, `guest-avatar-variants.tsx` deleted (user feedback: not visually clear on mobile). `/seating` now shows a name/table result card only.
- **Fixed**: search false positives — diacritic-stripped substring/prefix matching caused cross-name collisions (e.g. "Yến" matched "Nguyễn", "Trí" matched "Trịnh"/"Triệu"). Now strict whole-word matching with a sliding window, supporting both single-word and full multi-word name queries.

### Hero Section (Phase 02 Prep, still pending video assets)
- **Video Infrastructure**: HAS_VIDEO flag, `<video>` element with WebM+MP4 sources
- **Accessibility**: useSyncExternalStore for prefers-reduced-motion detection
- **Responsive**: Full width, max-height constraints

## Dependencies

| Package | Purpose |
|---------|---------|
| next@16.1.6 | Framework & server |
| react@19.2.3, react-dom@19.2.3 | UI library |
| typescript@5 | Type safety |
| tailwindcss@4 | Styling |
| framer-motion@12.33.0 | Animations & motion |
| googleapis@171.4.0 | Google Sheets API |
| lucide-react@0.563.0 | Icons |
| yet-another-react-lightbox@3.28.0 | Gallery lightbox |
| react-masonry-css@1.0.16 | Gallery layout |
| clsx@2.1.1, tailwind-merge@3.4.0 | CSS utilities |

## Assets

- **Images**: 23 wedding photos in `public/images/`
- **AI Images**: Placeholder directory `public/images/ai/` (MiniMax-ready)
- **Video**: Directory `public/video/` for WebM & MP4 files
- **Audio**: Background music in `public/audio/`
- **Processing**: MiniMax outputs in `public/minimax-output/`
- **Icons**: lucide-react (in-code) + SVG files

## Configuration Files

- `.mcp.json` — MiniMax MCP setup for AI video/audio generation
- `globals.css` — Masonry grid styles, print rules (hides nav/footer/music-toggle on `/seating/qr-sign`)
- `.gitignore` — Excludes node_modules, .env.local, MiniMax output directories, `.mcp.json`, `public/minimax-output/`
