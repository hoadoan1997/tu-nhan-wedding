# System Architecture

## High-Level Overview

The wedding website is a hybrid Next.js application combining server-side data fetching with client-side interactivity, deployed on Vercel. Integration with MiniMax MCP enables AI-powered video and audio generation.

```
┌──────────────────────────────────────────────────────────┐
│                    Client Browser                         │
│ (Hero w/ Video, Couple, Story, Details, Gallery, RSVP,  │
│  Seating Name Search, Printable QR Sign)                 │
└────────────────────────┬─────────────────────────────────┘
                         │
                    HTTP/HTTPS
                         │
┌────────────────────────▼──────────────────────────────────┐
│              Next.js App Router (Vercel)                  │
│  ┌──────────────────────────────────────────────────────┤
│  │ Pages:                                               │
│  │  • / (homepage, server-rendered, video-ready)      │
│  │  • /gallery (client-side lightbox)                  │
│  │  • /rsvp (RSVP form, client-side)                   │
│  │  • /seating (name search → table card, CSR)        │
│  │  • /seating/qr-sign (printable A4 QR sign, noindex) │
│  │  • /api/submit-rsvp (POST endpoint)                 │
│  └──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┤
│  │ Middleware:                                          │
│  │  • Rate limiting (per IP)                           │
│  │  • Input sanitization & formula injection prevention│
│  │  • Honeypot spam detection                          │
│  └──────────────────────────────────────────────────────┘
└────────────────┬────────────────────┬───────────────────┘
                 │                    │
           Google Sheets          Vercel CDN
           API (OAuth)          (static assets)
                 │              (images, video, audio)
        ┌────────▼─────────┐
        │  Google Sheets   │
        │  (RSVP Data)     │
        └──────────────────┘

┌─ Optional Integration ─┐
│   MiniMax MCP          │
│ (AI Video/Audio Gen)   │
└────────────────────────┘
```

## Rendering Strategy

### Server-Side Rendering (SSR)
- **Homepage** (`app/page.tsx`)
  - Fetches guestbook entries from Google Sheets at build/request time
  - Displays recent 12 entries (most recent first)
  - Graceful fallback if Google Sheets API unavailable
  - Video-ready structure with `HAS_VIDEO` feature flag
  - Data flow: Sheet rows → filtered (with messages) → mapped → reversed → sliced

### Client-Side Rendering (CSR)
- **Gallery** (`app/gallery/page.tsx`)
  - Interactive lightbox with yet-another-react-lightbox
  - Masonry layout via react-masonry-css
  - Framer Motion animations

- **RSVP** (`app/rsvp/page.tsx`)
  - Form with honeypot field
  - Client-side validation before submission
  - Spinner feedback during submission

- **Seating** (`app/seating/page.tsx`)
  - Loads 12-table guest list from `public/data/seating.json`
  - Whole-word Vietnamese diacritic-insensitive search (no floor plan visualization — removed 2026-07-07, was unclear on mobile)
  - Result: name/table-number/table-name card only
  - `?src=qr` query param autofocuses the search input (arrival via printed QR)

- **QR Sign** (`app/seating/qr-sign/page.tsx`)
  - Server component, `robots: noindex`
  - Printable A4 sign: couple photo, cursive heading, static QR SVG (`public/images/qr-seating.svg`), 3-step instructions
  - Print CSS hides global nav/footer/music-toggle via `@media print` in `globals.css`

- **Global Features**
  - Music toggle (client-side state)
  - Scroll indicator animation
  - Countdown timer
  - Reduced-motion support via useSyncExternalStore

## Component Architecture

### Layout Structure
```
layout.tsx (root)
├── template.tsx (global features)
│   ├── navigation-bar
│   ├── music-toggle
│   └── scroll-indicator
└── page.tsx or nested route
    └── route-specific components
```

### Component Responsibilities

| Component | Type | Purpose |
|-----------|------|---------|
| hero-section | Server/Client | Landing message, CTA, video-ready |
| couple-section | Client | About the couple |
| love-story-section | Client | Timeline with timeline-card |
| wedding-details-section | Client | Date, time, location, map |
| gift-registry-section | Client | Registry links |
| guestbook-section | Server | Recent guest messages |
| rsvp-form | Client | RSVP submission form |
| gallery-grid | Client | Image grid layout |
| gallery-lightbox | Client | Lightbox viewer |
| countdown-timer | Client | Days/hours/minutes to wedding |
| seating-search | Client | Guest name search, whole-word Vietnamese diacritic-insensitive matching |

## Data Flow

### RSVP Submission Flow
```
User fills form (browser)
  ↓
Client validation
  ↓
POST /api/submit-rsvp
  ↓
Server validates (format, rate limit, honeypot)
  ↓
Sanitize inputs (formula injection prevention)
  ↓
Append to Google Sheets
  ↓
Return success/error to client
```

### Guestbook Display Flow
```
Homepage load (app/page.tsx)
  ↓
Server: Call getSheetRows()
  ↓
Google Sheets API (OAuth JWT)
  ↓
Parse rows, filter (only with messages), map
  ↓
Reverse (newest first), slice (max 12)
  ↓
Pass to GuestbookSection component
  ↓
Render in browser
```

### Seating Lookup Flow
```
Seating page load (app/seating/page.tsx)
  ↓
Client: Fetch /data/seating.json
  ↓
Parse tables array (12 tables with guests)
  ↓
User searches (2+ chars, diacritics stripped via NFD)
  ↓
Slide query words across each guest's name words — whole-word match only
(no substring/prefix, avoids false positives like "Yến" matching "Nguyễn")
  ↓
Display matching result card(s): guest name + table number + table name
```

### QR Scan Flow
```
Guest scans printed sign at Canton House entrance
  ↓
Opens /seating?src=qr
  ↓
Page reads src=qr from window.location.search (lazy useState, no SSR mismatch)
  ↓
Search input autofocuses (organic /seating visits do not autofocus)
  ↓
Guest types name → Seating Lookup Flow above
```

## API Layer

### POST `/api/submit-rsvp`

**Request Body:**
```json
{
  "name": "Guest Name",
  "phone": "0912345678",
  "guests": 2,
  "message": "Optional message",
  "honeypot": ""
}
```

**Security Measures:**
1. **Rate Limiting** — 5 requests per minute per IP address
2. **Honeypot** — Hidden form field; if filled → assume bot, return success silently
3. **Input Validation:**
   - Required: name, phone, guests
   - Phone format: Vietnamese (0 + 9-10 digits)
   - Guest count: integer 1-10
4. **Formula Injection Prevention** — Sanitize inputs; prefix with `'` if starts with `=`, `+`, `-`, `@`, tab, or carriage return

**Response:**
- `200` — Success: `{ success: true }`
- `400` — Validation error: `{ error: "message" }`
- `429` — Rate limited: `{ error: "Too many requests..." }`
- `500` — Server error: `{ error: "Failed to submit RSVP..." }`

**Data Written to Google Sheets:**
```
[timestamp_ISO8601, sanitized_name, sanitized_phone, guest_count, sanitized_message]
```

## Environment Configuration

**Required Variables:**
- `GOOGLE_SHEETS_CLIENT_EMAIL` — Service account email
- `GOOGLE_SHEETS_PRIVATE_KEY` — Private key (newlines escaped as `\\n`)
- `GOOGLE_SHEET_ID` — Spreadsheet ID

**Optional Variables:**
- `NEXT_PUBLIC_SITE_URL` — For metadata base. Set on Vercel Production to `https://weddingwebsite-zeta-two.vercel.app` (the QR sign encodes this exact URL — do not change without regenerating `public/images/qr-seating.svg` and reprinting)

**Sheet Structure:**
```
Col A: Timestamp (ISO8601)
Col B: Name
Col C: Phone
Col D: Guest Count
Col E: Message
```

## Deployment Architecture

- **Hosting**: Vercel (serverless functions for API routes)
- **Database**: Google Sheets (append-only RSVP log)
- **CDN**: Vercel Edge Network (static assets)
- **Static Assets**: Images, video, audio in `public/` directories
- **SSL/TLS**: Automatic via Vercel
- **Monitoring**: Vercel Analytics (optional)

## Performance Considerations

- **Image Optimization**: Next.js Image component with lazy loading
- **Video Loading**: Native `<video>` element with preload control
- **Code Splitting**: Automatic per-route bundling
- **Animation Performance**: Framer Motion with GPU acceleration, respects prefers-reduced-motion
- **Rate Limiting**: In-memory per instance (scales across Vercel functions)
- **Error Boundaries**: Graceful fallbacks for missing Google Sheets data

## Accessibility & Reduced Motion

- **prefers-reduced-motion Support**:
  - Scroll animations disabled
  - Video playback can be controlled via native controls
- **Subscription Model**: useSyncExternalStore for efficient motion preference tracking

## Future Enhancements (MiniMax Integration)

- **Video Generation**: MiniMax MCP ready in `.mcp.json`
- **Audio Generation**: Music or audio narration capabilities
- **Asset Directories**: Ready structure in `public/video/`, `public/audio/`, `public/images/ai/`, `public/minimax-output/`
- **Opt-in Deployment**: Hero section video feature via `HAS_VIDEO` flag
