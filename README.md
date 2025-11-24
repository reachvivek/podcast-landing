# Podcast EcoSpace Dubai

> Professional podcast studio booking platform with integrated CRM and analytics

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)

A full-stack booking platform for podcast studio management, built with Next.js 16, featuring a customer-facing booking system, admin dashboard, email automation, and comprehensive analytics.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Admin Dashboard](#admin-dashboard)
- [Email System](#email-system)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Features

### Customer Experience
- Multi-step booking flow with real-time pricing
- Interactive calendar with time slot selection
- Service package selection (Audio, Video, Reels)
- Add-on services (extra cameras, live streaming, editing)
- Mobile-responsive design with smooth animations
- Email and WhatsApp confirmations
- Google Maps integration for studio location

### Admin Dashboard
- Real-time booking management
- Analytics dashboard with charts
- Revenue tracking and conversion metrics
- Customer management with notes
- Status workflow (Pending → Confirmed → In Progress → Completed)
- Payment tracking (Cash, Card, Apple Pay)
- Export functionality (CSV)

### Email Automation
- Intelligent queue system with rate limiting
- MongoDB audit trail for all emails
- 7 professional templates (booking, status updates, contact forms)
- Automatic retry logic (up to 3 attempts)
- Priority queue management

### Analytics & Tracking
- Page view tracking
- Booking funnel analysis
- Conversion rate monitoring
- Revenue insights by service type
- Peak booking time analysis

---

## Tech Stack

### Frontend
```
Next.js 16.0.3          App Router with Server Components
TypeScript 5.x          Full type safety
Tailwind CSS v4         Utility-first styling
Framer Motion           Smooth animations
Radix UI                Accessible primitives
Lucide React            Icon library
React Leaflet           Map integration
Swiper.js               Touch-enabled carousels
```

### Backend
```
Next.js API Routes      Serverless functions
Prisma 6.19.0          Type-safe ORM
MongoDB Atlas           Cloud database
Nodemailer             SMTP email delivery
JWT                    Authentication tokens
```

### DevOps
```
Vercel                 Hosting & CI/CD
GitHub                 Version control
ESLint                 Code quality
TypeScript             Type checking
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Landing     │  │  Booking     │  │  Admin Panel    │  │
│  │  Page        │  │  Flow        │  │  /admin/*       │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                       │
│                   (CDN + Load Balancer)                      │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   NEXT.JS SERVER (App Router)                │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Server      │  │  API Routes  │  │  Middleware     │  │
│  │  Components  │  │  /api/*      │  │  (Auth/CORS)    │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      PRISMA ORM                              │
│                   (Query Builder + Types)                    │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB ATLAS                             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Bookings    │  │  EmailQueue  │  │  Analytics      │  │
│  │  Collection  │  │  Collection  │  │  Collection     │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Core Collections

#### Booking
Primary collection for all studio bookings with customer information, session details, and pricing.

| Field | Type | Description |
|-------|------|-------------|
| `id` | ObjectId | Unique identifier |
| `customerName` | String | Full name |
| `customerEmail` | String | Email address |
| `customerPhone` | String | Phone number |
| `selectedDate` | DateTime | Booking date |
| `selectedTime` | String | Time slot (e.g., "10:00 AM") |
| `sessionDuration` | Int | Session length in hours |
| `peopleCount` | Int | Number of guests |
| `selectedSetup` | String | Setup type (standard/video-2cam/premium) |
| `selectedService` | JSON | Service package details |
| `additionalServices` | String[] | Add-on service IDs |
| `basePrice` | Float | Base package price (AED) |
| `addonsTotal` | Float | Total add-ons cost (AED) |
| `totalPrice` | Float | Final total (AED) |
| `status` | Enum | PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW |
| `paymentStatus` | Enum | UNPAID, PAID, REFUNDED, PARTIAL |
| `paymentMethod` | String | cash, card, apple_pay |
| `specialRequests` | String | Customer notes |
| `adminNotes` | String | Internal admin notes |
| `createdAt` | DateTime | Booking creation timestamp |
| `confirmedAt` | DateTime | Admin confirmation timestamp |
| `completedAt` | DateTime | Session completion timestamp |

**Indexes:** `customerEmail`, `selectedDate`, `status`, `createdAt`

---

#### EmailQueue
Queue management for outbound emails with automatic retry and priority handling.

| Field | Type | Description |
|-------|------|-------------|
| `to` | String | Recipient email |
| `subject` | String | Email subject line |
| `templateType` | String | booking_confirmation, admin_booking, contact_admin, status_update |
| `templateData` | JSON | Dynamic template data |
| `status` | Enum | PENDING, PROCESSING, SENT, FAILED, CANCELLED |
| `priority` | Int | Queue priority (0-10, higher = urgent) |
| `attempts` | Int | Send attempt counter |
| `maxAttempts` | Int | Retry limit (default: 3) |
| `sentAt` | DateTime | Successful send timestamp |
| `scheduledFor` | DateTime | Scheduled send time |
| `errorMessage` | String | Failure reason |

**Indexes:** `status`, `scheduledFor`, `createdAt`

---

#### EmailLog
Permanent audit trail for all sent emails (compliance and debugging).

| Field | Type | Description |
|-------|------|-------------|
| `to` | String | Recipient email |
| `subject` | String | Email subject |
| `templateType` | String | Template identifier |
| `status` | String | sent, failed |
| `messageId` | String | SMTP response ID |
| `metadata` | JSON | Context (booking ID, contact ID) |
| `createdAt` | DateTime | Log entry timestamp |

**Indexes:** `to`, `templateType`, `status`, `createdAt`

---

### Supporting Collections

**ServicePackage** - Available studio packages (Audio-only, Video, Reels)
**AddOnService** - Optional extras (cameras, editing, live streaming)
**BlockedSlot** - Unavailable dates/times
**AdminUser** - Admin accounts with role-based access
**ContactSubmission** - Contact form inquiries
**AnalyticsEvent** - User behavior tracking

Full schema: [`prisma/schema.prisma`](./prisma/schema.prisma)

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB Atlas account (free tier available)
- Gmail account for SMTP (or SendGrid/Resend)

### Installation

```bash
# Clone repository
git clone https://github.com/reachvivek/podcast-landing.git
cd podcast-landing

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
npx prisma generate

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Admin Access
- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Credentials: Set via environment variables (ADMIN_USERNAME, ADMIN_PASSWORD)

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/podcast-bookings?retryWrites=true&w=majority"

# Application
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (Gmail SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-gmail-app-password"
FROM_EMAIL="your-email@gmail.com"
ADMIN_EMAIL="your-email@gmail.com"

# Admin Credentials
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-secure-password"
JWT_SECRET="your-secret-key-min-32-chars"

# Studio Contact
STUDIO_PHONE="+971-XX-XXX-XXXX"
STUDIO_WHATSAPP="https://wa.me/971XXXXXXXXX"
```

**Security Note:**
- Never commit real credentials to Git
- Use `.env.local` for local development (gitignored by default)
- Set environment variables directly in Vercel dashboard for production
- Rotate all secrets before deployment

---

## API Reference

### Bookings

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+971501234567",
  "selectedDate": "2025-11-25T00:00:00.000Z",
  "selectedTime": "10:00 AM",
  "sessionDuration": 2,
  "peopleCount": 2,
  "selectedSetup": "video-2cam",
  "selectedService": { "id": "pkg-2", "name": "Video Podcast", "price": 750 },
  "additionalServices": ["addon-live-streaming"],
  "basePrice": 750,
  "addonsTotal": 200,
  "totalPrice": 950,
  "specialRequests": "Need parking space"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "6748a5b2c3d4e5f6a7b8c9d0",
    "status": "PENDING",
    "totalPrice": 950,
    "createdAt": "2025-11-24T12:00:00.000Z"
  }
}
```

---

#### List Bookings (Admin)
```http
GET /api/bookings?status=PENDING&date=2025-11-25&page=1&limit=20
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `status` - Filter by booking status
- `date` - Filter by date (YYYY-MM-DD)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "customerName": "John Doe",
      "selectedDate": "2025-11-25",
      "selectedTime": "10:00 AM",
      "totalPrice": 950,
      "status": "PENDING"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "pages": 3
  }
}
```

---

#### Update Booking Status
```http
PATCH /api/bookings/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "CONFIRMED",
  "paymentStatus": "PAID",
  "paymentMethod": "card",
  "adminNotes": "Customer arrived on time"
}
```

---

### Analytics

#### Get Dashboard Metrics
```http
GET /api/analytics?period=30
Authorization: Bearer <JWT_TOKEN>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalBookings": 156,
    "totalRevenue": 98500,
    "conversionRate": 0.65,
    "avgBookingValue": 631,
    "popularServices": [
      { "name": "Video Podcast", "count": 78, "revenue": 58500 }
    ],
    "bookingsByStatus": {
      "PENDING": 12,
      "CONFIRMED": 23,
      "COMPLETED": 98,
      "CANCELLED": 23
    },
    "revenueByMonth": [
      { "month": "2025-10", "revenue": 32500 },
      { "month": "2025-11", "revenue": 45000 }
    ]
  }
}
```

---

### Email Testing

#### Send Test Email
```http
POST /api/test-email
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "to": "test@example.com",
  "templateType": "booking_confirmation"
}
```

Full API documentation: [`swagger.yaml`](./swagger.yaml) (OpenAPI 3.0)

---

## Admin Dashboard

### Features

**Dashboard** (`/admin`)
- Today's bookings count
- Weekly revenue (AED)
- Monthly bookings total
- Pending follow-ups
- Recent bookings table (last 10)
- Quick stats (conversion rate, popular service, peak day)

**Bookings Management** (`/admin/bookings`)
- Filterable table (status, service, date range)
- Search by name, phone, email
- Status update workflow
- Payment tracking
- Customer notes section
- Export to CSV

**Analytics** (`/admin/analytics`)
- Revenue trends (7/30/90 days)
- Booking funnel analysis
- Service popularity charts
- Peak booking times
- Conversion metrics

### Access Control
- JWT-based authentication
- Session management
- Role-based permissions (SUPER_ADMIN, ADMIN, STAFF)
- Protected routes with middleware

---

## Email System

### Templates

| Template | Trigger | Recipient |
|----------|---------|-----------|
| `booking_confirmation` | New booking created | Customer |
| `admin_booking` | New booking created | Admin |
| `contact_admin` | Contact form submission | Admin |
| `contact_ack` | Contact form submission | Customer |
| `status_confirmed` | Booking confirmed | Customer |
| `status_in_progress` | Session started | Customer |
| `status_completed` | Session finished | Customer |

### Queue System

**Architecture:**
```
Booking Created → Add to EmailQueue (PENDING)
                    ↓
Queue Processor (1s interval) → Pick PENDING emails
                    ↓
Send via Nodemailer → Update status (SENT/FAILED)
                    ↓
Log to EmailLog (audit trail)
```

**Features:**
- Rate limiting (1 email/second to avoid spam filters)
- Priority queue (high-priority emails sent first)
- Automatic retry (3 attempts for failed emails)
- MongoDB audit trail (compliance-ready)
- Detailed error logging

### Configuration
SMTP settings in `.env`:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="app-specific-password"
```

**Gmail Setup:**
1. Enable 2FA in Google Account
2. Generate App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use generated password in `SMTP_PASSWORD`

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin master
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - Add all variables from `.env`
   - Update `NEXT_PUBLIC_APP_URL` to your domain
   - Set `NODE_ENV=production`

4. **Deploy**
   - Vercel auto-deploys on push to `master`
   - Preview deployments for PRs

### Database Migration
```bash
npx prisma generate
npx prisma db push
npm run seed
```

### Post-Deployment
- [ ] Update MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Vercel)
- [ ] Configure custom domain
- [ ] Enable SSL (automatic with Vercel)
- [ ] Test booking flow end-to-end
- [ ] Verify email deliverability
- [ ] Set up Google Analytics

---

## Project Structure

```
podcast-landing/
├── prisma/
│   ├── schema.prisma              # Database models & enums
│   └── seed.ts                    # Initial data seeding
│
├── public/
│   └── images/                    # Studio photos, logos
│
├── src/
│   ├── app/
│   │   ├── page.tsx               # Landing page
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Tailwind base styles
│   │   │
│   │   ├── book/                  # Booking flow
│   │   │   └── page.tsx           # Multi-step wizard
│   │   │
│   │   ├── checkout/              # Checkout page
│   │   │   └── page.tsx           # Payment & confirmation
│   │   │
│   │   ├── admin/                 # Admin dashboard
│   │   │   ├── login/             # Auth page
│   │   │   ├── page.tsx           # Dashboard overview
│   │   │   ├── bookings/          # Booking management
│   │   │   ├── analytics/         # Analytics & charts
│   │   │   ├── messages/          # Contact inquiries
│   │   │   └── settings/          # Studio settings
│   │   │
│   │   └── api/                   # API routes
│   │       ├── bookings/          # Booking CRUD
│   │       ├── services/          # Service packages
│   │       ├── addons/            # Add-on services
│   │       ├── analytics/         # Dashboard metrics
│   │       ├── contact/           # Contact form
│   │       └── auth/              # Authentication
│   │           └── login/
│   │
│   ├── components/
│   │   ├── booking/               # Booking step components
│   │   │   ├── BookingStep1.tsx   # Date & time selection
│   │   │   ├── BookingStep2.tsx   # Setup type
│   │   │   ├── BookingStep3.tsx   # Service package
│   │   │   └── BookingStep4.tsx   # Add-ons
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx         # Site header
│   │   │   └── Footer.tsx         # Site footer
│   │   │
│   │   ├── sections/              # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   └── ui/                    # Reusable UI components
│   │       └── Loader.tsx
│   │
│   ├── contexts/
│   │   └── BookingContext.tsx     # Global booking state
│   │
│   └── lib/
│       ├── prisma.ts              # Prisma client singleton
│       ├── email.ts               # Email system & queue
│       └── utils.ts               # Helper functions
│
├── .env                           # Environment variables (gitignored)
├── .env.example                   # Example env file
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS config
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies
├── swagger.yaml                   # OpenAPI 3.0 spec
└── README.md                      # This file
```

---

## Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm start                # Start production server

# Database
npm run seed             # Seed database with sample data
npx prisma studio        # Open Prisma GUI (localhost:5555)
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema changes to MongoDB

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript checking
```

---

## Contact & Support

**Podcast EcoSpace Dubai**
📍 Dubai World Trade Center (DWTC), Dubai, United Arab Emirates
📞 Phone: +971 50 206 0674
📱 WhatsApp: [Chat Now](https://wa.me/971502060674)
✉️ Email: podcastecospace@gmail.com
📸 Instagram: [@podcast.ecospace](https://instagram.com/podcast.ecospace)

**Developer**
Vivek Kumar Singh
📧 rogerthatvivek@gmail.com

---

## License

Proprietary - All rights reserved © 2024 Podcast EcoSpace Dubai

---

**Built with** ❤️ **in Dubai** | **Powered by** Next.js, MongoDB & Vercel
