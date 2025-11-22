# TSUROV Podcast Studio EcoSpace - Website Project

**Professional podcast studio booking website for Dubai's premier recording facility**

## Project Overview

**Client:** Podcast Studio EcoSpace
**Location:** Dubai World Trade Center, Sheikh Rashid Tower
**Instagram:** [@podcast.ecospace](https://www.instagram.com/podcast.ecospace)
**Primary Goal:** Generate studio bookings and capture leads
**Type:** Multi-page website with booking system

---

## Current Status

**Phase:** Landing Page & Booking System Complete
**Progress:** 85% complete

### Completed Features
- [x] Landing page with all sections
  - [x] Hero section with animated background
  - [x] Services overview (Recording, Editing, Reels)
  - [x] Featured package highlight
  - [x] Why Choose Us section
  - [x] How It Works (4-step process)
  - [x] Portfolio showcase
  - [x] Location map with Google Maps integration
  - [x] Contact section with form
  - [x] Sticky header with navigation
  - [x] Support widget (WhatsApp/Phone)
- [x] Complete booking flow (/book)
  - [x] Step 1: Date, time, people, duration selection
  - [x] Step 2: Studio setup selection
  - [x] Step 3: Service package selection
  - [x] Step 4: Additional services (add-ons)
- [x] Checkout page (/checkout)
  - [x] Customer details form
  - [x] Booking summary
  - [x] Pay at studio option (Card/Cash/Apple Pay)
  - [x] Booking confirmation

### Pending
- [ ] Admin panel for booking management
- [ ] Email notifications (Resend/SendGrid)
- [ ] Database integration (MongoDB + Prisma)
- [ ] Portfolio page with actual client work
- [ ] SEO optimization

---

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Maps:** Leaflet with OpenStreetMap

### Deployment
- **Hosting:** Vercel
- **GitHub:** https://github.com/reachvivek/podcast-landing

---

## Design & Branding

### Brand Colors
- **Primary:** Lime Green `#A8D646` (ecospace-green)
- **Secondary:** Dark backgrounds with white/gray text
- **Accent:** White `#FFFFFF`

### Logo Files
Located in `public/images/`:
- Logo icon (for favicon)
- Full logo with microphone (for header)

---

## Services & Pricing

| Service | Price | Savings |
|---------|-------|---------|
| Recording Only | 350 AED | ~~550 AED~~ Save 200 AED |
| Podcast + Editing | 750 AED | ~~980 AED~~ Save 230 AED |
| Studio Rental | 200 AED | ~~300 AED~~ Save 100 AED |
| Single Reel | 250 AED | - |
| 5 Reels Package | 950 AED | Save 300 AED |
| 10 Reels Package | 3,900 AED | Best Value! |

---

## Contact Information

- **Location:** Dubai World Trade Center, Sheikh Rashid Tower
- **Phone/WhatsApp:** +971-502060674
- **Hours:** 7:00 AM - 10:00 PM (7 days a week)
- **Google Maps:** https://maps.app.goo.gl/oPW2rk1rMi5g2UHN7

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── book/             # Booking flow
│   └── checkout/         # Checkout page
├── components/
│   ├── booking/          # Booking step components
│   ├── layout/           # Header, MainLayout
│   ├── sections/         # Landing page sections
│   └── ui/               # UI components
└── lib/                  # Utilities
```

---

## Developer

**Vivek Kumar Singh**
- Email: rogerthatvivek@gmail.com
- GitHub: [@reachvivek](https://github.com/reachvivek)

---

**Note:** This is a studio booking website. Payment is collected on arrival at the studio (no online payment gateway required).
