# Project Overview & Product Development Requirements

## Wedding Website for Tu Nguyen & Nhan Tu

A modern, elegant wedding website showcasing the couple's love story, event details, and guest interactions.

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript with React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion for interactive elements
- **Backend Integration**: Google Sheets API for RSVP data
- **Deployment**: Vercel

## Project Specifications

### Design Theme
- **Color Scheme**: Dusty Blue Elegance (#7B9CB8) as primary accent
- **Language**: English
- **Aesthetic**: Modern, romantic wedding website with smooth animations

### Core Pages & Features

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Landing page with full wedding showcase |
| Gallery | `/gallery` | Photo gallery with lightbox |
| RSVP | `/rsvp` | Guest registration form |
| Seating | `/seating` | Interactive venue floor plan with guest search |

### Homepage Sections
- Hero Section — Couple names, wedding date, call-to-action
- Couple Section — About the couple/engagement story
- Love Story Section — Timeline of milestones
- Wedding Details — Date, time, location, map
- Gift Registry — Registry links and information
- Guestbook Section — Recent guest messages

### Seating Feature
- 12-table venue floor plan with top-down SVG visualization
- Search guests by name with Vietnamese diacritics support (normalization via NFD)
- Auto-highlighting of guest avatar on matched search result
- Auto-scroll to matched table with smooth centering
- 8 guest role avatars (groom, bride, male, female, elder-male, elder-female, boy, girl)
- Decorative elements: dance floor, stage, trees, flowers with subtle animations
- Mobile-responsive horizontal scroll with gradient hints

### Data Flow
- RSVP Form → Google Sheets (append-only)
- Guestbook Display → Google Sheets (read-only, displays recent 12 entries)
- Guest Data: Timestamp, Name, Phone, Guest Count, Message

## Non-Functional Requirements

### Security
- Input sanitization (formula injection prevention)
- Rate limiting (5 requests/minute per IP)
- Honeypot field for spam bot detection
- Phone validation (Vietnamese format: 10-11 digits, starts with 0)

### Performance
- Server-side data fetching for guestbook
- Client-side interactivity with Framer Motion
- Image optimization via Next.js Image component
- Graceful error handling for missing Google Sheets config

### Scalability
- Serverless deployment on Vercel
- Google Sheets for unlimited guest data storage
- In-memory rate limiting per deployment instance

## Deployment Target

- **Platform**: Vercel
- **Environment**: Production
- **Domain**: Custom domain (to be configured)
- **SSL**: Automatic via Vercel
