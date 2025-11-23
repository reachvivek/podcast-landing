# EcoSpace Podcast Studio - Setup Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)
- Git (optional)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy your connection string
5. Replace `<password>` with your database user password

#### Option B: Local MongoDB

If you have MongoDB installed locally:
```
mongodb://localhost:27017/podcast-bookings
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `DATABASE_URL` in `.env` with your MongoDB connection string:
   ```
   DATABASE_URL="mongodb+srv://your-username:your-password@cluster.mongodb.net/podcast-bookings?retryWrites=true&w=majority"
   ```

### 4. Initialize Database

Generate Prisma client:
```bash
npx prisma generate
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                      # Next.js 15 App Router
│   ├── page.tsx             # Landing page
│   ├── book/                # Booking flow (4 steps)
│   ├── checkout/            # Checkout & payment
│   ├── admin/               # Admin dashboard
│   │   ├── page.tsx         # Dashboard overview
│   │   ├── bookings/        # Booking management
│   │   └── analytics/       # Analytics & reports
│   └── api/                 # API routes
│       ├── bookings/        # Booking CRUD
│       └── analytics/       # Analytics data
├── components/
│   ├── booking/             # Booking step components
│   ├── sections/            # Landing page sections
│   └── layout/              # Header, Footer
├── contexts/
│   └── BookingContext.tsx   # Booking state management
├── lib/
│   └── prisma.ts           # Prisma client singleton
└── prisma/
    └── schema.prisma        # Database schema
```

## Features

### Frontend (User-Facing)
- ✅ Responsive landing page with studio showcase
- ✅ 4-step booking flow (Date/Time → Setup → Service → Extras)
- ✅ Real-time price calculation
- ✅ Booking confirmation with details
- ✅ Mobile-optimized design

### Backend & API
- ✅ MongoDB database with Prisma ORM
- ✅ RESTful API for bookings
- ✅ Booking status management (Pending, Confirmed, Completed, Cancelled)
- ✅ Analytics & reporting API

### Admin Dashboard
- ✅ Dashboard overview with key metrics
- ✅ Booking management (view, confirm, cancel)
- ✅ Analytics with charts and trends
- ✅ Search and filter bookings
- ✅ Responsive admin interface

Access admin at: [http://localhost:3000/admin](http://localhost:3000/admin)

## API Endpoints

### Bookings
- `GET /api/bookings` - List all bookings (with filters)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get booking details
- `PATCH /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Cancel booking

### Analytics
- `GET /api/analytics?period=30` - Get analytics data

## Database Models

### Booking
- Customer information (name, email, phone)
- Session details (date, time, duration, people count)
- Service & add-ons
- Pricing (base, add-ons, total)
- Status tracking (booking status, payment status)
- Timestamps (created, confirmed, cancelled, completed)

### Other Models
- ServicePackage
- AddOnService
- BlockedSlot
- AdminUser
- AnalyticsEvent
- ContactSubmission
- NewsletterSubscriber

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Required:
- `DATABASE_URL` - MongoDB connection string

Optional (for future features):
- Email notifications (SMTP settings)
- WhatsApp integration
- Payment gateway

## Next Steps

1. **Add MongoDB Connection**: Update `.env` with your MongoDB Atlas URL
2. **Test Booking Flow**: Go to `/book` and create a test booking
3. **Check Admin Panel**: Visit `/admin` to see the booking in the dashboard
4. **Customize Content**: Update text, images, and pricing in the components
5. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

## Support

For issues or questions:
- Email: info@ecospace.ae
- WhatsApp: +971 50 206 0674
- Location: Dubai World Trade Center, Sheikh Rashid Tower

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB + Prisma ORM
- **Styling**: Tailwind CSS v4
- **UI**: Framer Motion animations
- **Icons**: Lucide React
- **TypeScript**: Full type safety
