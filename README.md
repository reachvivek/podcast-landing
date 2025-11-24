# Podcast EcoSpace - Dubai Booking Platform

A professional podcast studio booking platform built for EcoSpace Dubai, located at Dubai World Trade Center. This full-stack application enables customers to book recording sessions and allows administrators to manage bookings, analytics, and studio operations.

---

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Admin Panel](#admin-panel)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Known Issues & Gaps](#known-issues--gaps)
- [Contributing](#contributing)

---

## Overview

### Features

**Customer-Facing:**
- Browse service packages (Audio-only, Video 2-cam, Premium Video, Editing)
- Interactive multi-step booking flow with calendar selection
- Select add-on services (extra cameras, live streaming, editing)
- Real-time pricing calculation
- Booking confirmation and checkout
- Studio location with interactive map
- Portfolio and equipment showcase
- Contact form and newsletter subscription

**Admin Dashboard:**
- Secure authentication with login page
- Collapsible sidebar navigation
- Booking management (view, filter, update status)
- Real-time analytics and charts
- Revenue tracking and completion rates
- Customer messages management
- Studio settings configuration
- Dynamic service and add-on management

---

## Technology Stack

### Frontend
- **Framework:** Next.js 16.0.3 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4
- **UI Library:** Radix UI (slots, primitives)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form (to be implemented)
- **State Management:** React Context API
- **Maps:** Leaflet + React Leaflet
- **Carousels:** Swiper.js

### Backend
- **Runtime:** Node.js (via Next.js API Routes)
- **API:** RESTful endpoints (serverless functions)
- **Database ORM:** Prisma 6.19.0
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT-based (to be implemented)
- **Email:** Resend / SendGrid (to be configured)

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint 9
- **Type Checking:** TypeScript
- **Database Client:** MongoDB Compass (recommended)
- **Version Control:** Git

### Deployment
- **Hosting:** Vercel
- **CDN:** Vercel Edge Network
- **Database:** MongoDB Atlas (M0 Free Tier or higher)
- **Environment:** Production + Preview branches

---

## System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Browser     │────▶│  Vercel Edge    │────▶│   Next.js App   │
│   (React SPA)   │◀────│    Network      │◀────│  (App Router)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                                ┌───────────────┐
                                                │  API Routes   │
                                                │ (Serverless)  │
                                                └───────────────┘
                                                        │
                                                        ▼
                                                ┌───────────────┐
                                                │  Prisma ORM   │
                                                └───────────────┘
                                                        │
                                                        ▼
                                                ┌───────────────┐
                                                │ MongoDB Atlas │
                                                │   (Cloud DB)  │
                                                └───────────────┘
```

---

## Database Schema

### Models Overview

| Model | Description |
|-------|-------------|
| `Booking` | Customer booking records with session details |
| `ServicePackage` | Available recording packages (5 seeded) |
| `AddOnService` | Extra services like cameras, editing (8 seeded) |
| `BlockedSlot` | Unavailable dates/times |
| `AdminUser` | Admin accounts with role-based access |
| `ContactSubmission` | Contact form submissions |
| `NewsletterSubscriber` | Email newsletter list |
| `AnalyticsEvent` | User behavior tracking |

### Booking Statuses
- `PENDING` - New booking awaiting confirmation
- `CONFIRMED` - Admin confirmed the booking
- `IN_PROGRESS` - Recording session in progress
- `COMPLETED` - Session finished
- `CANCELLED` - Booking cancelled
- `NO_SHOW` - Customer didn't show up

---

## Project Structure

```
podcast-landing/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── public/images/         # Studio photos, logos
├── src/
│   ├── app/
│   │   ├── admin/         # Admin dashboard pages
│   │   │   ├── analytics/ # Analytics page
│   │   │   ├── bookings/  # Bookings management
│   │   │   ├── login/     # Admin login
│   │   │   ├── messages/  # Contact messages
│   │   │   └── settings/  # Studio settings
│   │   ├── api/           # API routes
│   │   │   ├── bookings/  # Booking CRUD
│   │   │   ├── services/  # Service packages
│   │   │   ├── addons/    # Add-on services
│   │   │   └── analytics/ # Dashboard metrics
│   │   ├── book/          # Booking flow page
│   │   ├── checkout/      # Checkout page
│   │   └── page.tsx       # Landing page
│   ├── components/
│   │   ├── booking/       # BookingStep1-4.tsx
│   │   ├── layout/        # Header, Footer
│   │   ├── sections/      # Landing sections
│   │   └── ui/            # Loader, etc.
│   ├── contexts/          # BookingContext
│   └── lib/               # prisma.ts, utils.ts
├── .env                   # Environment variables
├── next.config.ts         # Next.js config
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB Atlas account
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/reachvivek/podcast-landing.git
cd podcast-landing

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string

# Generate Prisma client
npx prisma generate

# Seed the database
npm run seed

# Start development server
npm run dev
```

---

## Environment Variables

Create a `.env` file with:

```env
# Database (Required)
DATABASE_URL="mongodb+srv://USER:PASSWORD@cluster.mongodb.net/podcast-bookings"

# Application
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (Optional - for notifications)
# SMTP_HOST="smtp.gmail.com"
# SMTP_PORT="587"
# SMTP_USER="your-email@gmail.com"
# SMTP_PASSWORD="your-app-password"
```

---

## Running the Application

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npm run seed         # Seed database with initial data
npx prisma studio    # Open Prisma database viewer
```

---

## Admin Panel

### Access
- URL: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `admin123`

**WARNING:** These are development credentials only. See Security section.

### Features
- **Dashboard:** Overview metrics and recent bookings
- **Bookings:** View, filter, update, delete bookings
- **Analytics:** Charts for revenue, bookings, popular services
- **Messages:** Contact form submissions (mock data)
- **Settings:** Studio configuration (client-side only)

---

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings (paginated) |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings/[id]` | Get single booking |
| PATCH | `/api/bookings/[id]` | Update booking |
| DELETE | `/api/bookings/[id]` | Delete/cancel booking |
| GET | `/api/services` | Get service packages |
| GET | `/api/addons` | Get add-on services |
| GET | `/api/analytics` | Get dashboard metrics |

### Query Parameters

**GET /api/bookings**
- `status`: Filter by status (PENDING, CONFIRMED, etc.)
- `date`: Filter by date (YYYY-MM-DD)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**GET /api/analytics**
- `period`: Time period in days (7, 30, 90)

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel settings
4. Deploy

### Environment Variables for Production
- `DATABASE_URL` - MongoDB connection string
- `NEXT_PUBLIC_APP_URL` - Your production URL
- `NODE_ENV` - Set to "production"

---

## Known Issues & Gaps

### Critical Security Issues

| Issue | Location | Status |
|-------|----------|--------|
| Hardcoded admin credentials | `src/app/admin/login/page.tsx` | TODO |
| localStorage authentication | `src/app/admin/layout.tsx` | TODO |
| No API authentication | All `/api/*` routes | TODO |
| MongoDB credentials in .env | `.env` file | Rotate credentials |

### Missing Features

| Feature | Priority | Status |
|---------|----------|--------|
| Email notifications | High | Not implemented |
| Form validation (Zod) | High | Not implemented |
| Contact form API | High | Mock only |
| Available slots API | Medium | Not implemented |
| Admin messages API | Medium | Mock data |
| WhatsApp integration | Low | Manual links only |
| Unit tests | Low | None |

### Performance Issues

| Issue | Impact | Solution |
|-------|--------|----------|
| Large images (10MB+) | Slow loads | Compress to <200KB |
| No caching | Slow API | Add revalidate |
| No lazy loading | Large bundle | Dynamic imports |

### Accessibility Issues

| Issue | WCAG Level | Fix |
|-------|------------|-----|
| Low color contrast (gray-400) | AA Fail | Use gray-300 |
| Missing ARIA labels | A Fail | Add aria-label |
| No skip links | A Fail | Add skip to content |

---

## Development Roadmap

### Phase 1: Security (Week 1-2)
- [ ] Replace hardcoded credentials with JWT auth
- [ ] Add API authentication middleware
- [ ] Rotate MongoDB credentials
- [ ] Add input validation with Zod

### Phase 2: Missing Features (Week 3-4)
- [ ] Email notifications (Resend)
- [ ] Contact form API endpoint
- [ ] Available slots validation
- [ ] Admin messages API

### Phase 3: Quality (Week 5-6)
- [ ] Compress images
- [ ] Fix accessibility issues
- [ ] Add error boundaries
- [ ] Improve mobile responsiveness

---

## Files Removed During Cleanup

- `nul` - Empty file
- `prisma.config.ts` - Not needed for Prisma 6
- `public/file.svg`, `globe.svg`, `window.svg`, `vercel.svg` - Unused Next.js defaults
- `src/components/audio/AudioPlayer.tsx` - Unused
- `src/components/sections/EpisodesCarousel.tsx` - Unused
- `src/components/sections/EpisodeCard.tsx` - Unused
- `src/components/sections/LatestEpisodes.tsx` - Unused
- `src/components/sections/FeaturedPodcasts.tsx` - Unused
- `src/components/sections/PodcastExplore.tsx` - Unused
- `src/components/sections/ServicesOverview.tsx` - Unused

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add: description"`
4. Push to branch: `git push origin feature/your-feature`
5. Open Pull Request

---

## Contact

**Podcast EcoSpace Dubai**
- Location: Dubai World Trade Center
- Phone: +971-502060674
- Instagram: [@podcast.ecospace](https://instagram.com/podcast.ecospace)

**Developer:** [Vivek Kumar Singh](https://github.com/reachvivek)

---

**Version:** 1.0.0 | **Last Updated:** November 23, 2024
