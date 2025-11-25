# Podcast EcoSpace Dubai

> Professional podcast studio booking platform with AWS Lambda email service, CRM, and analytics

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange?style=flat&logo=amazonaws)](https://aws.amazon.com/lambda/)

A full-stack booking platform for podcast studio management featuring customer booking flow, admin dashboard, AWS Lambda email service, and comprehensive analytics.

**Live Site:** [podspace.vercel.app](https://podspace.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Email System Architecture](#email-system-architecture)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Admin Dashboard](#admin-dashboard)
- [AWS Lambda Email Service](#aws-lambda-email-service)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Features

### Customer Experience
- Multi-step booking flow with real-time pricing calculator
- Interactive calendar with time slot availability
- Service package selection (Audio Recording, Video Podcast, Reels Production)
- Add-on services (cameras, live streaming, editing packages)
- Mobile-responsive design with smooth animations
- Professional email confirmations with studio location
- WhatsApp integration for instant contact

### Admin Dashboard
- Real-time booking management with status workflow
- Analytics dashboard with revenue charts and conversion metrics
- Customer relationship management with notes
- Payment tracking (Cash, Card, Apple Pay)
- Contact inquiry management
- Export functionality (CSV)
- Session filtering and search

### Email Automation
- AWS Lambda email service (bypasses Vercel SMTP restrictions)
- Intelligent queue system with automatic retry (3 attempts)
- MongoDB audit trail for compliance
- Mobile-responsive email templates
- Rate limiting to avoid spam filters
- Priority queue management
- Dual-mode: Lambda (production) / SMTP (local development)

### Analytics & Tracking
- Page view tracking and conversion funnels
- Revenue insights by service type
- Peak booking time analysis
- Booking status distribution
- Monthly revenue trends

---

## Tech Stack

### Frontend
```
Next.js 16.0.3          App Router with Server Components
TypeScript 5.x          Full type safety
Tailwind CSS v4         Utility-first styling
Framer Motion           Smooth animations
Radix UI                Accessible components
Lucide React            Modern icon library
React Leaflet           Interactive maps
Swiper.js               Touch carousels
```

### Backend
```
Next.js API Routes      Serverless functions
Prisma 6.19.0          Type-safe ORM
MongoDB Atlas           Cloud database
AWS Lambda              Email service
Nodemailer             SMTP delivery
JWT                    Authentication
```

### Infrastructure
```
Vercel                 Frontend hosting & CI/CD
AWS Lambda             Email service (Node.js 18.x)
AWS API Gateway        HTTP endpoint for Lambda
MongoDB Atlas          Database hosting
GitHub                 Version control
```

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                            │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐    │
│  │  Landing    │  │  Booking    │  │  Admin Dashboard     │    │
│  │  Page       │  │  Flow       │  │  /admin/*            │    │
│  └─────────────┘  └─────────────┘  └──────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                           │
│                   (CDN + Load Balancer)                          │
└──────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│              NEXT.JS SERVER (Vercel Serverless)                  │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐    │
│  │  Server     │  │  API Routes │  │  Middleware          │    │
│  │  Components │  │  /api/*     │  │  (Auth/CORS)         │    │
│  └─────────────┘  └─────────────┘  └──────────────────────┘    │
│                             │                                     │
│                             │ (Email Service URL)                │
│                             ├────────────────────────┐           │
│                             │                        │           │
│                             ▼                        ▼           │
│                    ┌─────────────────┐    ┌──────────────────┐  │
│                    │  Prisma ORM     │    │  AWS Lambda      │  │
│                    │  (MongoDB)      │    │  Email Service   │  │
│                    └─────────────────┘    └──────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                             │                        │
                             ▼                        ▼
┌──────────────────────────────────┐    ┌──────────────────────────┐
│        MONGODB ATLAS             │    │    GMAIL SMTP            │
│                                   │    │    smtp.gmail.com:587    │
│  ┌────────────────────────────┐  │    │                          │
│  │  Bookings Collection       │  │    │  ✅ No Port Blocking     │
│  │  EmailQueue Collection     │  │    │  ✅ Full SMTP Access     │
│  │  EmailLog (Audit Trail)    │  │    │  ✅ Reliable Delivery    │
│  │  Analytics Collection      │  │    │                          │
│  └────────────────────────────┘  │    └──────────────────────────┘
└──────────────────────────────────┘
```

---

## Email System Architecture

### Why AWS Lambda?

**Problem:** Vercel blocks outbound SMTP connections on ports 587/465, preventing direct email delivery.

**Solution:** AWS Lambda HTTP endpoint that bypasses Vercel's restrictions:

```
┌─────────────────────────────────────────────────────────────────┐
│  BOOKING CREATED (Vercel Serverless Function)                  │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  Email Queue System (src/lib/email.ts)                          │
│                                                                  │
│  • Detects EMAIL_SERVICE_URL env variable                       │
│  • Routes to Lambda if configured, else direct SMTP             │
│  • Synchronous processing (await) to prevent timeout            │
└─────────────────────────────────────────────────────────────────┘
                          │
           ┌──────────────┴──────────────┐
           ▼                             ▼
┌─────────────────────┐      ┌─────────────────────────┐
│  LOCAL DEVELOPMENT  │      │  PRODUCTION (Vercel)    │
│  Direct SMTP        │      │  AWS Lambda             │
│                     │      │                         │
│  smtp.gmail.com:587 │      │  HTTP POST to Lambda    │
│  ✅ Works fine      │      │  API Gateway Endpoint   │
└─────────────────────┘      └─────────────────────────┘
                                          │
                                          ▼
                            ┌──────────────────────────────────┐
                            │  AWS Lambda Function             │
                            │  (podcast-email-service)         │
                            │                                  │
                            │  • Receives JSON payload         │
                            │  • Uses Nodemailer internally    │
                            │  • Sends via Gmail SMTP          │
                            │  • Returns success/failure       │
                            │                                  │
                            │  Runtime: Node.js 18.x           │
                            │  Memory: 256 MB                  │
                            │  Timeout: 30 seconds             │
                            │  Cost: FREE (1M req/month)       │
                            └──────────────────────────────────┘
                                          │
                                          ▼
                            ┌──────────────────────────────────┐
                            │  Gmail SMTP Server               │
                            │  ✉️  Email Delivered             │
                            └──────────────────────────────────┘
```

### Email Templates

All templates are mobile-responsive with consistent styling:

| Template | Trigger | Recipient | Purpose |
|----------|---------|-----------|---------|
| `booking_confirmation` | New booking | Customer | Booking details with studio location |
| `admin_booking` | New booking | Admin | New booking notification with customer info |
| `contact_admin` | Contact form | Admin | Inquiry notification |
| `contact_ack` | Contact form | Customer | Acknowledgment with response time |
| `status_update` | Status change | Customer | Confirmed/Cancelled/Completed notifications |
| `test` | Manual trigger | Admin | Configuration test |

### Queue Processing Flow

```javascript
1. Booking Created
   ↓
2. queueEmail() → Add to EmailQueue (status: PENDING)
   ↓
3. await processEmailQueue() → MUST WAIT (Vercel requirement)
   ↓
4. sendViaLambda() or sendViaSMTP()
   ↓
   ├─ Lambda: HTTP POST to API Gateway endpoint
   │  ↓
   │  Lambda sends via Gmail SMTP
   │  ↓
   │  Returns { success: true, messageId: "..." }
   │
   └─ SMTP: Direct connection (localhost only)
      ↓
      Nodemailer.sendMail()
   ↓
5. Update EmailQueue (status: SENT/FAILED)
   ↓
6. Log to EmailLog (permanent audit trail)
```

**Key Features:**
- **Synchronous processing** - `await` ensures Vercel waits for completion
- **Automatic retry** - 3 attempts for failed emails
- **Rate limiting** - 1 email/second to avoid spam filters
- **Priority queue** - High-priority emails sent first
- **Audit trail** - All emails logged to MongoDB

---

## Database Schema

### Core Collections

#### Booking
Primary collection for all studio bookings.

| Field | Type | Description |
|-------|------|-------------|
| `id` | ObjectId | Unique identifier |
| `customerName` | String | Full name |
| `customerEmail` | String | Email address |
| `customerPhone` | String | Phone number |
| `selectedDate` | DateTime | Booking date |
| `selectedTime` | String | Time slot (e.g., "10:00 AM") |
| `sessionDuration` | Int | Hours (1-8) |
| `peopleCount` | Int | Number of guests |
| `selectedSetup` | String | Setup type (standard/video/premium) |
| `selectedService` | JSON | Service package { id, name, price } |
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
Intelligent queue for outbound emails with retry logic.

| Field | Type | Description |
|-------|------|-------------|
| `id` | ObjectId | Queue entry ID |
| `to` | String | Recipient email |
| `subject` | String | Email subject |
| `templateType` | String | Template identifier |
| `templateData` | JSON | Dynamic data for template |
| `status` | Enum | PENDING, PROCESSING, SENT, FAILED, CANCELLED |
| `priority` | Int | Queue priority (0-10, higher = first) |
| `attempts` | Int | Send attempt counter |
| `maxAttempts` | Int | Retry limit (default: 3) |
| `sentAt` | DateTime | Successful send timestamp |
| `scheduledFor` | DateTime | Scheduled send time |
| `errorMessage` | String | Failure reason |
| `createdAt` | DateTime | Queue entry timestamp |
| `processedAt` | DateTime | Last processing timestamp |

**Indexes:** `status`, `scheduledFor`, `priority`, `createdAt`

---

#### EmailLog
Permanent audit trail for compliance and debugging.

| Field | Type | Description |
|-------|------|-------------|
| `id` | ObjectId | Log entry ID |
| `to` | String | Recipient email |
| `subject` | String | Email subject |
| `templateType` | String | Template used |
| `status` | String | sent, failed |
| `messageId` | String | SMTP message ID |
| `errorMessage` | String | Error details (if failed) |
| `metadata` | JSON | Context (bookingId, contactId) |
| `createdAt` | DateTime | Log timestamp |

**Indexes:** `to`, `templateType`, `status`, `createdAt`

---

### Supporting Collections

- **ServicePackage** - Available studio packages (Audio-only, Video, Reels)
- **AddOnService** - Optional extras (cameras, editing, live streaming)
- **BlockedSlot** - Unavailable dates/times
- **AdminUser** - Admin accounts with JWT authentication
- **ContactSubmission** - Contact form inquiries
- **AnalyticsEvent** - User behavior tracking

Full schema: [prisma/schema.prisma](./prisma/schema.prisma)

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB Atlas account (free tier)
- AWS account (for Lambda email service)
- Gmail account with app password

### Local Development

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

# Seed database
npm run seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Admin Access
- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Credentials: Set via `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`

---

## Environment Variables

### Required Variables

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/podcast-bookings"

# Application
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://podspace.vercel.app"

# Email Service (Choose One)
# Option 1: AWS Lambda (Production - Recommended)
EMAIL_SERVICE_URL="https://your-api-id.execute-api.us-east-1.amazonaws.com/"

# Option 2: Direct SMTP (Local Development Only)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-gmail-app-password"
FROM_EMAIL="your-email@gmail.com"
ADMIN_EMAIL="admin@example.com"

# Admin Authentication
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-secure-password"
JWT_SECRET="your-secret-key-minimum-32-characters"
```

### Email Service Configuration

**For Production (Vercel):**
Set `EMAIL_SERVICE_URL` to your AWS Lambda endpoint. Direct SMTP won't work due to Vercel port restrictions.

**For Local Development:**
Use SMTP credentials. Lambda endpoint is optional.

**Security Notes:**
- Never commit `.env` to Git
- Use Vercel dashboard to set production env vars
- Rotate secrets before deployment
- Use app-specific passwords for Gmail

---

## AWS Lambda Email Service

### Architecture

The email service runs on AWS Lambda to bypass Vercel's SMTP port blocking.

**Lambda Function Details:**
- **Name:** `podcast-email-service`
- **Runtime:** Node.js 18.x
- **Memory:** 256 MB
- **Timeout:** 30 seconds
- **Region:** us-east-1
- **Cost:** $0 (within 1M requests/month free tier)

**API Gateway Endpoint:**
```
POST https://your-api-id.execute-api.us-east-1.amazonaws.com/
Content-Type: application/json

{
  "to": "customer@example.com",
  "subject": "Booking Confirmation",
  "html": "<html>...</html>"
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "<abc123@gmail.com>",
  "response": "250 2.0.0 OK"
}
```

### Lambda Function Code

Located in `../email-lambda/`:
- `index.js` - Lambda handler with Nodemailer
- `package.json` - Dependencies (nodemailer@6.9.8)

### Deployment

The Lambda function is already deployed. To redeploy:

```bash
cd ../email-lambda
npm install
zip -r function.zip index.js node_modules package.json
aws lambda update-function-code \
  --function-name podcast-email-service \
  --zip-file fileb://function.zip
```

### Monitoring

**CloudWatch Logs:**
```
https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Fpodcast-email-service
```

**Metrics:**
- Invocations count
- Error rate
- Duration (avg ~2 seconds)
- Throttles (should be 0)

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
  "selectedService": {
    "id": "pkg-2",
    "name": "Video Podcast",
    "price": 750
  },
  "additionalServices": ["addon-live"],
  "basePrice": 750,
  "addonsTotal": 200,
  "totalPrice": 950,
  "specialRequests": "Need parking"
}
```

**Response:** `201 Created`

---

#### List Bookings (Admin)
```http
GET /api/bookings?status=PENDING&date=2025-11-25&page=1&limit=20
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `status` - Filter by status (PENDING, CONFIRMED, etc.)
- `date` - Filter by date (YYYY-MM-DD)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

---

#### Update Booking
```http
PATCH /api/bookings/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "CONFIRMED",
  "paymentStatus": "PAID",
  "paymentMethod": "card",
  "adminNotes": "Customer confirmed via WhatsApp"
}
```

---

### Analytics

```http
GET /api/analytics?period=30
Authorization: Bearer <JWT_TOKEN>
```

Returns:
- Total bookings, revenue, conversion rate
- Popular services, revenue by month
- Booking distribution by status

---

## Admin Dashboard

### Pages

**Dashboard** (`/admin`)
- Today's bookings count
- Weekly revenue (AED)
- Monthly bookings total
- Pending follow-ups
- Recent bookings table
- Quick stats (conversion, popular service)

**Bookings** (`/admin/bookings`)
- Filterable table (status, service, date)
- Search (name, phone, email)
- Status workflow management
- Payment tracking
- Export to CSV

**Analytics** (`/admin/analytics`)
- Revenue trends (7/30/90 days)
- Booking funnel analysis
- Service popularity charts
- Peak booking times

**Messages** (`/admin/messages`)
- Contact form submissions
- Inquiry management
- Response tracking

### Security

- JWT-based authentication
- HttpOnly cookies
- Role-based access control
- Protected API routes with middleware
- Session timeout (24 hours)

---

## Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to production"
git push origin master
```

2. **Configure Vercel**
   - Import GitHub repository
   - Set environment variables (see `.env` section)
   - Add `EMAIL_SERVICE_URL` from Lambda deployment

3. **Database Setup**
```bash
npx prisma generate
npx prisma db push
npm run seed
```

4. **Post-Deployment Checklist**
- [ ] Update MongoDB Atlas IP whitelist (0.0.0.0/0 for Vercel)
- [ ] Test booking flow end-to-end
- [ ] Verify email delivery (check inbox)
- [ ] Confirm Lambda is being used (check Vercel logs)
- [ ] Set up custom domain
- [ ] Enable Vercel analytics

### MongoDB Atlas Setup

1. Create cluster (M0 free tier)
2. Create database user
3. Allow access from anywhere (0.0.0.0/0)
4. Copy connection string to `DATABASE_URL`

### Gmail SMTP Setup

1. Enable 2FA in Google Account
2. Generate App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use app password in Lambda environment variables

---

## Project Structure

```
podcast-landing/
├── prisma/
│   ├── schema.prisma              # Database models
│   └── seed.ts                    # Initial data
│
├── src/
│   ├── app/
│   │   ├── page.tsx               # Landing page
│   │   ├── book/page.tsx          # Booking flow
│   │   ├── checkout/page.tsx      # Confirmation
│   │   ├── admin/                 # Admin dashboard
│   │   │   ├── login/page.tsx     # Auth
│   │   │   ├── page.tsx           # Dashboard
│   │   │   ├── bookings/          # Management
│   │   │   ├── analytics/         # Charts
│   │   │   └── messages/          # Inquiries
│   │   └── api/                   # API routes
│   │       ├── bookings/          # CRUD
│   │       ├── analytics/         # Metrics
│   │       ├── contact/           # Forms
│   │       └── auth/              # JWT
│   │
│   ├── components/
│   │   ├── booking/               # Booking steps
│   │   ├── sections/              # Landing sections
│   │   └── ui/                    # Reusable UI
│   │
│   ├── contexts/
│   │   └── BookingContext.tsx     # Global state
│   │
│   └── lib/
│       ├── prisma.ts              # DB client
│       ├── email.ts               # Email system (Lambda/SMTP)
│       ├── validations.ts         # Zod schemas
│       └── utils.ts               # Helpers
│
├── public/images/                 # Studio photos
├── .env                           # Environment vars (gitignored)
├── package.json                   # Dependencies
└── README.md                      # This file
```

---

## Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm start                # Start production server

# Database
npm run seed             # Seed initial data
npx prisma studio        # Open Prisma GUI (localhost:5555)
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to MongoDB

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript validation
```

---

## Contact & Support

**Podcast EcoSpace Dubai**
- 📍 Dubai World Trade Center (DWTC), Dubai, UAE
- 📞 +971 50 206 0674
- 📱 [WhatsApp](https://wa.me/971502060674)
- ✉️ podcastecospace@gmail.com
- 📸 [@podcast.ecospace](https://instagram.com/podcast.ecospace)

**Developer**
- Vivek Kumar Singh
- 📧 rogerthatvivek@gmail.com

---

## License

Proprietary - All rights reserved © 2024 Podcast EcoSpace Dubai

---

**Built with ❤️ in Dubai** | **Powered by** Next.js, AWS Lambda, MongoDB & Vercel
