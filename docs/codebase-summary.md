# Codebase Structure Summary

## Directory Layout

```
wedding_website/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage (main scroll page)
│   ├── gallery/page.tsx          # Gallery route
│   ├── rsvp/page.tsx             # RSVP form route
│   ├── seating/page.tsx          # Venue floor plan route
│   ├── layout.tsx                # Root layout wrapper
│   ├── template.tsx              # Global template (music, nav)
│   └── api/submit-rsvp/route.ts  # RSVP submission endpoint
├── components/                   # Reusable React components
│   ├── hero-section.tsx
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
│   ├── seating-search.tsx        # Guest search for seating chart
│   ├── venue-floor-plan.tsx      # Top-down 12-table layout canvas
│   ├── round-table.tsx           # Circular table with radial guest seats
│   ├── guest-avatar.tsx          # Avatar dispatcher by guest role
│   ├── guest-avatar-variants.tsx # 8 SVG avatar components
│   └── venue-decorations.tsx     # Dance floor, stage, trees, flowers
├── lib/                          # Utility functions
│   ├── google-sheets.ts          # Google Sheets API client
│   └── utils.ts                  # Helper utilities (cn for clsx)
├── public/
│   ├── images/                   # 23 wedding photos (optimized)
│   ├── audio/                    # Background music files
│   └── *.svg                     # SVG assets
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS v4 config
└── next.config.js                # Next.js configuration
```

## Key Files

### App Routes
- `app/page.tsx` — Server component fetching guestbook from Google Sheets
- `app/gallery/page.tsx` — Gallery page with grid and lightbox
- `app/rsvp/page.tsx` — RSVP form page
- `app/seating/page.tsx` — Interactive venue floor plan with guest search
- `app/api/submit-rsvp/route.ts` — POST endpoint with validation & rate limiting

### Component Library (20+ components)
- **Layout**: navigation-bar, footer, scroll-indicator
- **Sections**: hero, couple, love-story, wedding-details, gift-registry, guestbook
- **Seating**: seating-search, venue-floor-plan, round-table, guest-avatar, guest-avatar-variants, venue-decorations
- **Forms**: rsvp-form, gallery (grid + lightbox)
- **Utilities**: countdown-timer, music-toggle, map-embed, timeline-card

### Data Integration
- `lib/google-sheets.ts` — Handles authentication, append, and read operations
- Requires env vars: `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEET_ID`
- `public/data/seating.json` — 12 tables with guest name/role for venue floor plan

### Data Types (lib/utils.ts)
- `Guest` — `{ name: string, role: GuestRole }`
- `GuestRole` — "groom" | "bride" | "male" | "female" | "elder-male" | "elder-female" | "boy" | "girl"
- `SeatingTable` — `{ number: number, name: string, guests: Guest[] }`

## Dependencies

| Package | Purpose |
|---------|---------|
| next@16.1.6 | Framework & server |
| react@19.2.3, react-dom@19.2.3 | UI library |
| typescript@5 | Type safety |
| tailwindcss@4 | Styling |
| framer-motion@12.33.0 | Animations |
| googleapis@171.4.0 | Google Sheets API |
| lucide-react@0.563.0 | Icons |
| yet-another-react-lightbox@3.28.0 | Gallery lightbox |
| react-masonry-css@1.0.16 | Gallery layout |
| clsx@2.1.1, tailwind-merge@3.4.0 | CSS utilities |

## Assets

- **Images**: 23 wedding photos in `public/images/`
- **Audio**: Background music in `public/audio/`
- **Icons**: lucide-react (in-code) + SVG files
