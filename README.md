# TSUROV Podcast Studio EcoSpace - Website Project

**Professional podcast studio booking website for Dubai's premier recording facility**

## 🎙️ Project Overview

**Client:** Podcast Studio EcoSpace
**Location:** Dubai World Trade Center
**Instagram:** [@podcast.ecospace](https://www.instagram.com/podcast.ecospace)
**Primary Goal:** Generate studio bookings and capture leads
**Type:** Multi-page website with booking system and admin panel

---

## 🚀 Quick Start

### Current Status
**Phase:** Ready for component development
**Blocker:** Awaiting Podover theme screenshots for visual reference
**Progress:** 35% complete (requirements, planning, documentation)

### What's Ready
✅ Complete project requirements gathered
✅ All pricing and service information (6 packages: 350-3900 AED)
✅ Contact information (phone, WhatsApp, hours, location)
✅ FAQ content (15 personalized questions)
✅ Logo and brand colors (lime green #A8D646 + dark teal #0A3D47)
✅ Tech stack configured (Next.js 15, TypeScript, Tailwind CSS v4)
✅ Database schema designed (MongoDB + Prisma)
✅ Landing page structure outlined (12 sections)
✅ Folder structure for screenshots created

### What's Needed
🔴 Podover theme screenshots (see [SCREENSHOT_REQUEST_CHECKLIST.md](SCREENSHOT_REQUEST_CHECKLIST.md))
🔴 Email address from client (for booking confirmations)
🔴 Full street address text
🔴 Portfolio files ("previews last podcast")

---

## 📁 Project Documentation

### Core Documents (Read These First)

| Document | Purpose | Read When |
|----------|---------|-----------|
| [MASTER_PROJECT_DOC.md](MASTER_PROJECT_DOC.md) | Complete project reference - single source of truth | Anytime you need project details |
| [LANDING_PAGE_OUTLINE.md](LANDING_PAGE_OUTLINE.md) | Detailed breakdown of all 12 landing page sections | Before building components |
| [SCREENSHOT_REQUEST_CHECKLIST.md](SCREENSHOT_REQUEST_CHECKLIST.md) | Comprehensive list of required screenshots (66 images) | When capturing Podover theme screenshots |
| [BUILD_ROADMAP.md](BUILD_ROADMAP.md) | 8-week development plan with phases and deliverables | To understand overall timeline |

### Supporting Documents

| Document | Purpose |
|----------|---------|
| [PROJECT_CHECKLIST_TSUROV.md](PROJECT_CHECKLIST_TSUROV.md) | Granular task tracking for every component |
| [PRD.md](PRD.md) | Product Requirements Document |
| [public/sections/README.md](public/sections/README.md) | Screenshot folder structure guide |

---

## 🎨 Design & Branding

### Brand Identity
- **Primary Color:** Lime Green `#A8D646` (from logo)
- **Secondary Color:** Dark Teal `#0A3D47` (from logo)
- **Accent Color:** White `#FFFFFF`
- **Typography:** Roboto Variable Font (local)

### Logo Files
Located in `public/images/`:
- `IMG_20251121_085355_574.png` - Icon only (for favicon)
- `IMG_20251121_085355_595.png` - Full logo with microphone (for header/footer)
- `IMG_20251121_085355_649.png` - Icon in circle (for social media)

### Visual Reference
**Theme:** Podover WordPress Theme (visual inspiration only)
**URL:** https://preview.themeforest.net/item/podover-podcast-wordpress-theme/full_screen_preview/38430718

**Important:** Use Podover for visual design only. Content and goal are completely different:
- ❌ Podover: Podcast listening/distribution platform
- ✅ EcoSpace: Studio BOOKING website (like booking a hotel)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (@theme directive)
- **Animations:** Framer Motion
- **Carousels:** Swiper.js
- **Icons:** Lucide React
- **UI Components:** shadcn/ui

### Backend
- **Database:** MongoDB Atlas
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Email:** Resend or SendGrid
- **API:** Next.js API Routes

### Deployment
- **Hosting:** Vercel
- **Current:** https://podspace.vercel.app (template)
- **GitHub:** https://github.com/reachvivek/podcast-landing

---

## 📄 Pages Structure

### Landing Page (12 Sections)
1. Header/Navigation (sticky)
2. Hero Section (full-screen)
3. Services Overview (3 cards)
4. Featured Package (conversion driver)
5. Social Proof (testimonials/stats)
6. Why Choose Us (6 features)
7. Pricing Preview (3 packages)
8. Process/How It Works (4 steps)
9. Location/Contact Preview
10. Call-to-Action (full-width, lime green)
11. FAQ Preview (5-6 questions)
12. Footer (4 columns)

### Additional Pages
- Pricing (full 6-package breakdown)
- Services (detailed service descriptions)
- Contact (form + map)
- FAQ (15 questions with categories)
- About Us (when client provides content)
- Portfolio (when client provides photos)

### Admin Panel
- Dashboard (/admin)
- Bookings Management (/admin/bookings)
- Analytics (/admin/analytics)
- Calendar View (/admin/calendar)

---

## 💼 Services & Pricing

| Service | Price | Savings | Details |
|---------|-------|---------|---------|
| Podcast Recording Only | 350 AED | ~~550 AED~~ (Save 200 AED) | 1hr studio, sound, lights, raw files |
| Podcast + Editing ⭐ | 750 AED | ~~980 AED~~ (Save 230 AED) | 1hr, 2 cameras, editing, color correction |
| Professional Reels | 250 AED | - | Video recording, editing, titles |
| 5 Reels Package | 950 AED | Save 300 AED (190/reel) | 1hr recording, studio + lights, editing |
| 10 Reels Package | 3,900 AED | Best Value! (390/reel) | 1hr recording, editing, titles |
| Rent Studio Space | 200 AED | ~~300 AED~~ (Save 100 AED) | Personal production, your equipment |

---

## 📞 Contact Information

**Studio:** Podcast Studio EcoSpace
**Location:** Dubai World Trade Center
**Phone/WhatsApp:** +971-502060674
**Hours:** 7:00 AM - 10:00 PM (All days - 7 days a week)
**Email:** [TBD - awaiting from client]
**Google Maps:** https://maps.app.goo.gl/oPW2rk1rMi5g2UHN7

---

## 🗂️ Project Structure

```
podcast-landing/
├── public/
│   ├── sections/              # Screenshot folders (12 sections)
│   │   ├── header/
│   │   ├── hero/
│   │   ├── services-overview/
│   │   ├── featured-package/
│   │   └── ... (see public/sections/README.md)
│   └── images/                # Logo files
│
├── src/
│   ├── app/                   # Next.js 15 App Router
│   ├── components/            # Reusable components
│   └── lib/                   # Utilities
│
├── prisma/
│   └── schema.prisma          # Database schema
│
├── MASTER_PROJECT_DOC.md      # 📖 Complete project reference
├── LANDING_PAGE_OUTLINE.md    # 🎨 Section-by-section breakdown
├── SCREENSHOT_REQUEST_CHECKLIST.md  # 📸 Screenshot requirements
├── BUILD_ROADMAP.md           # 🗺️ 8-week development plan
├── PROJECT_CHECKLIST_TSUROV.md      # ✅ Granular task tracking
└── README.md                  # 👈 You are here
```

---

## 🎯 Primary Conversion Goal

**Main CTA:** "BOOK STUDIOS & SERVICES"

**Key Focus:**
- ✅ Studio BOOKING (like Airbnb for podcast studios)
- ✅ Capture leads and inquiries
- ✅ Showcase services and pricing
- ✅ Display social proof (clients who used studio)
- ❌ NOT podcast listening/distribution
- ❌ NO Spotify, Apple Podcasts links

**Target Audience:** Podcast CREATORS (not listeners)

---

## 📸 Next Steps

### For Client/User:
1. **Capture Podover theme screenshots** (see [SCREENSHOT_REQUEST_CHECKLIST.md](SCREENSHOT_REQUEST_CHECKLIST.md))
   - 66 images across 12 sections
   - Save in appropriate folders (`public/sections/[section-name]/`)
   - Priority: Hero, Featured Package, Header, CTA, Footer

2. **Provide missing information:**
   - Email address (for booking confirmations)
   - Full street address text
   - Portfolio files ("previews last podcast")
   - About Us content (studio story)

### For Developer:
Once screenshots are received:
1. Analyze design patterns and extract visual elements
2. Build components matching Podover aesthetic
3. Adapt content to EcoSpace's booking-focused goals
4. Implement booking system and admin panel
5. Follow [BUILD_ROADMAP.md](BUILD_ROADMAP.md) phases

---

## 🚦 Development Phases

| Phase | Timeline | Deliverable |
|-------|----------|-------------|
| Phase 1 | Week 1 | Landing page skeleton (5 critical sections) |
| Phase 2 | Week 2 | Working booking system with confirmations |
| Phase 3 | Week 3 | Admin panel for booking management |
| Phase 4 | Week 4 | Complete landing page (all 12 sections) |
| Phase 5 | Week 5 | Additional pages (Pricing, Services, Contact, FAQ) |
| Phase 6 | Week 6 | Analytics, performance, SEO optimization |
| Phase 7 | Week 7 | Comprehensive testing and QA |
| Phase 8 | Week 8 | Launch on production domain |

**Estimated Launch:** 8 weeks from screenshot receipt

---

## 🏃‍♂️ Getting Started (Development)

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/reachvivek/podcast-landing.git
cd podcast-landing

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## ✅ Success Criteria

### Technical
- Lighthouse score 90+ (all categories)
- Mobile-friendly (Google test)
- Cross-browser compatible
- WCAG 2.1 Level AA accessible
- Sub-3s page load time

### Business (3 months post-launch)
- 500+ monthly visitors
- 20+ booking inquiries/month
- 10+ actual bookings/month
- Page 1 Google ranking for "podcast studio Dubai"
- Strong Instagram → website traffic

---

## 👨‍💻 Developer

**Vivek Kumar Singh**
Email: rogerthatvivek@gmail.com
Phone: +971-501480042
GitHub: [@reachvivek](https://github.com/reachvivek)

---

## 📝 Notes

- This is a **studio booking website**, not a podcast distribution platform
- All content has been personalized for EcoSpace (no generic template text)
- Payment is collected **on arrival** at studio (no online payment gateway)
- Admin panel for lead management and follow-ups
- Focus on **conversion optimization** and **lead capture**

---

**Ready to start building once screenshots are provided!** 🚀

For questions or clarifications, refer to [MASTER_PROJECT_DOC.md](MASTER_PROJECT_DOC.md) or contact the developer.
