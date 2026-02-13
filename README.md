# Tu & Nhan Wedding Website

A modern, elegant wedding website for **Tu Nguyen & Nhan Tu** — July 17, 2026 in Georgia, USA.

**Theme:** Dusty Rose Elegance (`#C4919B`)

## Tech Stack

| Tech | Version |
|------|---------|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| Google Sheets API | RSVP backend |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, couple, love story, wedding details, registry, guestbook |
| `/gallery` | Photo gallery with masonry grid + lightbox (23 photos) |
| `/rsvp` | RSVP form with honeypot + rate limiting |
| `/slideshow` | Fullscreen photo slideshow |
| `/seating` | Find Your Seat — search by name to find table assignment |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local` with:

```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SHEET_ID=your-spreadsheet-id
```

## Project Structure

```
app/
├── page.tsx                  # Homepage (server-rendered guestbook)
├── gallery/page.tsx          # Gallery with lightbox
├── rsvp/page.tsx             # RSVP form
├── slideshow/page.tsx        # Fullscreen slideshow
├── layout.tsx                # Root layout (fonts, metadata)
├── template.tsx              # Global nav, music toggle
└── api/submit-rsvp/route.ts  # RSVP → Google Sheets
components/                   # 18 React components
lib/
├── google-sheets.ts          # Google Sheets API client
└── utils.ts                  # cn() helper
public/images/                # 23 wedding photos
```

## Features

- Scroll-triggered Framer Motion animations
- Countdown timer to wedding day
- Google Maps embeds for ceremony & reception
- Background music toggle
- Responsive (mobile-first)
- Formula injection prevention on RSVP
- Rate limiting (5 req/min per IP)

## Wedding Details

- **Ceremony**: Holy Vietnamese Martyrs Catholic Church, Norcross GA — 3:00 PM
- **Reception**: Canton House, Duluth GA — 6:30 PM

## Deployment

Deployed on **Vercel**. Push to `master` triggers auto-deploy.

```bash
npm run build   # Production build
npm run start   # Start production server
```

## Status

- [x] Project setup & configuration
- [x] Layout & navigation
- [x] Hero & couple sections
- [x] Love story timeline
- [x] Wedding details & maps
- [x] Photo gallery & lightbox
- [x] RSVP form & Google Sheets integration
- [x] Guestbook display
- [x] Gift registry (red envelope)
- [x] Slideshow page
- [x] Theme: Dusty Blue → Dusty Rose
- [x] Content: real venues, dates, parents' names
- [x] Interactive venue floor plan with SVG avatars
- [ ] Video embed (YouTube/Vimeo)
- [ ] Custom domain
- [ ] Lighthouse audit (target ≥ 90)
