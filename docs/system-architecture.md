# System Architecture

## High-Level Overview

The wedding website is a hybrid Next.js application combining server-side data fetching with client-side interactivity, deployed on Vercel.

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│  (Hero, Couple, Story, Details, Gallery, Guestbook)    │
└────────────────────────┬────────────────────────────────┘
                         │
                    HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────┐
│              Next.js App Router (Vercel)                │
│  ┌─────────────────────────────────────────────────────┤
│  │ Pages:                                              │
│  │  • / (homepage, server-rendered)                   │
│  │  • /gallery (client-side lightbox)                 │
│  │  • /rsvp (RSVP form, client-side)                  │
│  │  • /api/submit-rsvp (POST endpoint)                │
│  └─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┤
│  │ Middleware:                                         │
│  │  • Rate limiting (per IP)                          │
│  │  • Input sanitization                              │
│  │  • Honeypot spam detection                         │
│  └─────────────────────────────────────────────────────┘
└────────────────┬────────────────────────┬───────────────┘
                 │                        │
           Google Sheets                CDN
           API (OAuth)              (static assets)
                 │
        ┌────────▼─────────┐
        │  Google Sheets   │
        │  (RSVP Data)     │
        └──────────────────┘
```

## Rendering Strategy

### Server-Side Rendering (SSR)
- **Homepage** (`app/page.tsx`)
  - Fetches guestbook entries from Google Sheets at build/request time
  - Displays recent 12 entries (most recent first)
  - Graceful fallback if Google Sheets API unavailable
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

- **Global Features**
  - Music toggle (client-side state)
  - Scroll indicator animation
  - Countdown timer

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
| hero-section | Server/Client | Landing message, CTA |
| couple-section | Client | About the couple |
| love-story-section | Client | Timeline with timeline-card |
| wedding-details-section | Client | Date, time, location, map |
| gift-registry-section | Client | Registry links |
| guestbook-section | Server | Recent guest messages |
| rsvp-form | Client | RSVP submission form |
| gallery-grid | Client | Image grid layout |
| gallery-lightbox | Client | Lightbox viewer |
| countdown-timer | Client | Days/hours/minutes to wedding |

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

## Environment Configuration

**Required Variables:**
- `GOOGLE_SHEETS_CLIENT_EMAIL` — Service account email
- `GOOGLE_SHEETS_PRIVATE_KEY` — Private key (newlines escaped as `\\n`)
- `GOOGLE_SHEET_ID` — Spreadsheet ID

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
- **SSL/TLS**: Automatic via Vercel
- **Monitoring**: Vercel Analytics (optional)

## Performance Considerations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic per-route bundling
- **Rate Limiting**: In-memory per instance (scales across Vercel functions)
- **Error Boundaries**: Graceful fallbacks for missing Google Sheets data
- **Animations**: Framer Motion with GPU acceleration
