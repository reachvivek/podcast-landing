# TSUROV EcoSpace - Build Roadmap
## Step-by-Step Development Plan

**Project:** Podcast Studio EcoSpace Dubai Landing Page
**Status:** Ready for Component Development
**Next Action:** Awaiting Podover theme screenshots

---

## 📊 PROJECT STATUS OVERVIEW

### ✅ COMPLETED
- [x] Project requirements gathered
- [x] Business model clarified (studio booking, not podcast distribution)
- [x] Complete pricing received (6 services: 350-3900 AED)
- [x] Contact info received (phone, WhatsApp, hours, location)
- [x] FAQ content personalized (15 questions)
- [x] Logo and brand colors identified
- [x] Tech stack defined (Next.js 15, TypeScript, Tailwind CSS v4)
- [x] Database schema designed (MongoDB + Prisma)
- [x] Admin panel specifications defined
- [x] Booking system requirements documented
- [x] Landing page structure outlined (12 sections)
- [x] Folder structure created for screenshots
- [x] Documentation consolidated (MASTER_PROJECT_DOC.md)

### 🟡 IN PROGRESS
- [ ] Awaiting Podover theme screenshots (66 images)
- [ ] Awaiting email address from client
- [ ] Awaiting full street address text
- [ ] Awaiting portfolio files ("previews last podcast")

### 🔴 NOT STARTED
- [ ] Component development
- [ ] MongoDB + Prisma setup
- [ ] Booking system implementation
- [ ] Admin panel development
- [ ] Email confirmation system
- [ ] WhatsApp integration
- [ ] Analytics tracking
- [ ] Testing and QA

---

## 🏗️ BUILD PHASES

### PHASE 1: FOUNDATION (Week 1)
**Goal:** Set up project infrastructure and critical landing page sections

#### 1.1 Setup & Configuration (Day 1)
- [ ] Replace orange (#FF5722) with lime green (#A8D646) throughout
- [ ] Update logo in header/footer
- [ ] Set up MongoDB database (create cluster)
- [ ] Initialize Prisma schema
- [ ] Configure environment variables
- [ ] Set up NextAuth.js for admin

#### 1.2 Critical Landing Page Sections (Days 2-4)
**Build order based on conversion priority:**

1. **Header/Navigation**
   - Logo integration
   - Navigation menu (7 items)
   - Primary CTA button ("BOOK STUDIO")
   - Sticky header on scroll
   - Mobile hamburger menu

2. **Hero Section**
   - Full-screen background
   - Headline + subheadline
   - Dual CTA buttons (primary + secondary)
   - Scroll indicator
   - Responsive design

3. **Featured Package Section**
   - Large "Most Popular" card
   - Strikethrough pricing (750 AED, was 980 AED)
   - "SAVE 230 AED" badge
   - Feature list with checkmarks
   - Flanking smaller packages
   - Multiple "Book Now" CTAs

4. **CTA Section (Full-Width)**
   - Lime green background
   - White text
   - Headline + supporting text
   - Dual CTA buttons
   - Quick contact links
   - Social proof line

5. **Footer**
   - 4-column layout (desktop)
   - Logo + description
   - Quick links
   - Contact information
   - Social media icons
   - Newsletter signup (optional)
   - Copyright bar

**Deliverable:** Functional landing page skeleton with critical conversion elements

---

### PHASE 2: CORE BOOKING SYSTEM (Week 2)
**Goal:** Implement booking form and database integration

#### 2.1 Database Implementation (Days 1-2)
- [ ] Create MongoDB cluster on Atlas
- [ ] Connect Prisma to MongoDB
- [ ] Create Booking model (schema provided in MASTER_PROJECT_DOC)
- [ ] Create Admin model for authentication
- [ ] Create PageView model for analytics
- [ ] Run Prisma migrations
- [ ] Test database connection

#### 2.2 Booking Form (Days 3-4)
- [ ] Design booking form component
  - Full Name (required)
  - Phone Number (required, with +971 prefix)
  - Email (required)
  - Service dropdown (6 options)
  - Preferred Date (date picker)
  - Preferred Time (time slot picker, 7 AM - 10 PM)
  - Number of People (1-6+)
  - Brief Description (optional, max 200 chars)
- [ ] Form validation (client-side)
- [ ] Server-side validation
- [ ] Submit to database (API route)
- [ ] Generate unique booking number (ESC-2025-XXX)
- [ ] Success page/modal
- [ ] Error handling

#### 2.3 Booking Confirmations (Days 5)
- [ ] Set up Resend or SendGrid account
- [ ] Create email template for booking confirmation
- [ ] Implement email sending on booking submission
- [ ] Create WhatsApp confirmation message (wa.me link)
- [ ] Generate "Add to Calendar" link (.ics file)
- [ ] Test confirmation flow

**Deliverable:** Working booking system that saves to database and sends confirmations

---

### PHASE 3: ADMIN PANEL (Week 3)
**Goal:** Build admin dashboard for booking management

#### 3.1 Admin Authentication (Days 1)
- [ ] Set up NextAuth.js
- [ ] Create admin login page (/admin/login)
- [ ] Implement credential provider (username/password)
- [ ] Hash passwords with bcrypt
- [ ] Create initial admin user
- [ ] Protect admin routes with middleware
- [ ] Test login/logout flow

#### 3.2 Admin Dashboard (Days 2-3)
- [ ] Create dashboard layout
- [ ] Overview stats cards:
  - Today's bookings
  - This week's revenue
  - This month's bookings
  - Pending follow-ups
- [ ] Recent bookings table (last 10)
- [ ] Quick stats:
  - Total bookings (all time)
  - Conversion rate
  - Most popular service
  - Peak booking day
  - Average booking value
- [ ] Responsive design

#### 3.3 Bookings Management (Days 4-5)
- [ ] Bookings list page (/admin/bookings)
- [ ] Search functionality (name, phone, email)
- [ ] Filters (status, service, date range)
- [ ] Bookings table with sorting
- [ ] Booking detail view/modal:
  - Customer info with click-to-call/WhatsApp
  - Booking details
  - Payment status
  - Admin notes textarea
  - Action buttons (confirm, mark paid, reschedule, cancel)
  - Timeline of status changes
- [ ] Update booking status API
- [ ] Mark as paid functionality
- [ ] Add/edit notes
- [ ] Export to CSV

**Deliverable:** Complete admin panel for managing bookings and customers

---

### PHASE 4: REMAINING LANDING PAGE SECTIONS (Week 4)
**Goal:** Complete all landing page sections

#### 4.1 Services & Features Sections (Days 1-2)
6. **Services Overview (3 cards)**
   - Podcast Production (350 AED)
   - Video Content (750 AED)
   - Social Media Reels (250 AED)
   - Icon + title + description + price
   - "Learn More" links

7. **Pricing Preview (3 cards)**
   - Basic Recording (350 AED)
   - Full Production (750 AED) ⭐
   - Studio Rental (200 AED)
   - Strikethrough old prices
   - "SAVE X AED" badges
   - "View All Packages" link

8. **Why Choose Us (6 features)**
   - Professional Equipment
   - Prime Location
   - Fast Turnaround
   - Flexible Packages
   - Expert Team
   - Complete Service
   - Icon + title + description

#### 4.2 Content & Engagement Sections (Days 3-4)
9. **Process / How It Works (4 steps)**
   - Choose Your Package
   - Book Your Session
   - Record Your Content
   - Receive Your Files
   - Step numbers + icons + descriptions

10. **Location/Contact Preview**
    - Split layout (contact info + map)
    - Address, hours, phone, WhatsApp
    - Embedded Google Maps
    - Quick contact buttons
    - "Book a Tour" CTA

11. **Social Proof** (when client provides photos)
    - Option A: Client testimonial carousel
    - Option B: Statistics cards (500+ hours, 200+ clients)
    - Star ratings
    - Client logos (if permission granted)

12. **FAQ Preview (5-6 questions)**
    - Accordion component
    - Top questions from 15-question FAQ
    - Expand/collapse animation
    - Link to full FAQ page

#### 4.3 Polish & Animation (Day 5)
- [ ] Add Framer Motion animations (fade-in on scroll)
- [ ] Card hover effects (lift, scale)
- [ ] Button hover effects
- [ ] Smooth scrolling
- [ ] Loading states
- [ ] Optimize images (Next.js Image component)
- [ ] Test all CTAs
- [ ] Test all internal links

**Deliverable:** Complete landing page with all 12 sections

---

### PHASE 5: ADDITIONAL PAGES (Week 5)
**Goal:** Build supporting pages

#### 5.1 Pricing Page (Days 1-2)
- [ ] Page hero with pricing headline
- [ ] All 6 packages with full details:
  - Podcast Recording Only (350 AED)
  - Podcast + Editing (750 AED) ⭐
  - Professional Reels (250 AED)
  - 5 Reels Package (950 AED)
  - 10 Reels Package (3,900 AED)
  - Rent Studio Space (200 AED)
- [ ] Package comparison table
- [ ] Reels package comparison table
- [ ] Add-ons section (optional)
- [ ] FAQ mini-section (pricing-related)
- [ ] Multiple booking CTAs
- [ ] Trust badges/guarantees

#### 5.2 Services Page (Days 3)
- [ ] Page hero
- [ ] Detailed service descriptions:
  - Podcast Recording
  - Video Podcast Production
  - Social Media Content
  - Studio Rental
  - Editing & Post-Production
- [ ] Process section ("How It Works")
- [ ] Equipment & facilities grid
- [ ] Service comparison
- [ ] "Not sure?" CTA

#### 5.3 Contact Page (Day 4)
- [ ] Page hero
- [ ] Contact cards (location, phone, email, WhatsApp, hours)
- [ ] Contact form with validation
- [ ] Google Maps embed (full-width)
- [ ] Quick action buttons
- [ ] Link to FAQ

#### 5.4 FAQ Page (Day 5)
- [ ] Page hero
- [ ] Category tabs (Location & Hours, Pricing, Booking, Services)
- [ ] 15 accordion items with full Q&As
- [ ] Search functionality (optional)
- [ ] "Still have questions?" CTA section
- [ ] WhatsApp widget

**Deliverable:** Complete multi-page website (5 pages minimum)

---

### PHASE 6: ANALYTICS & OPTIMIZATION (Week 6)
**Goal:** Add tracking, analytics, and optimize performance

#### 6.1 Analytics Setup (Days 1-2)
- [ ] Set up Google Analytics 4
- [ ] Add GA4 tracking code
- [ ] Custom event tracking:
  - Booking form submission
  - CTA button clicks
  - Phone/WhatsApp clicks
  - Page views by section
  - Time on page
  - Scroll depth
- [ ] Create admin analytics page (/admin/analytics):
  - Website traffic stats
  - Booking conversion rate
  - Most popular services
  - Revenue by service
  - Peak booking times
  - Monthly trends charts
- [ ] Integrate Recharts for visualizations

#### 6.2 Performance Optimization (Days 3-4)
- [ ] Image optimization (next/image)
- [ ] Lazy loading for images
- [ ] Code splitting
- [ ] Minify CSS/JS
- [ ] Lighthouse audit (target 90+ all categories)
- [ ] PageSpeed Insights test
- [ ] Optimize fonts (preload Roboto Variable)
- [ ] Reduce bundle size
- [ ] Implement caching strategies

#### 6.3 SEO Optimization (Day 5)
- [ ] Meta tags (all pages)
- [ ] Open Graph tags (social sharing)
- [ ] Twitter cards
- [ ] Structured data (JSON-LD):
  - LocalBusiness schema
  - Service schema
  - Organization schema
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Alt text for all images
- [ ] Heading hierarchy (H1, H2, H3)
- [ ] Internal linking

**Deliverable:** Optimized, tracked, SEO-ready website

---

### PHASE 7: TESTING & QA (Week 7)
**Goal:** Comprehensive testing across devices and browsers

#### 7.1 Functional Testing (Days 1-2)
- [ ] All links work (no 404s)
- [ ] Forms submit successfully
- [ ] Form validation works
- [ ] Booking flow (end-to-end)
- [ ] Admin login works
- [ ] Admin dashboard loads
- [ ] Booking management works
- [ ] Email confirmations send
- [ ] WhatsApp links work
- [ ] Phone links work (click-to-call)
- [ ] Google Maps loads
- [ ] Animations trigger correctly
- [ ] Carousels work (if any)

#### 7.2 Cross-Browser Testing (Days 3)
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Test on actual devices (iPhone, Android)

#### 7.3 Responsive Testing (Day 4)
- [ ] Mobile (375px, 414px)
- [ ] Tablet (768px, 1024px)
- [ ] Desktop (1440px, 1920px)
- [ ] Ultra-wide (2560px+)
- [ ] Test touch gestures
- [ ] Test hamburger menu
- [ ] Test forms on mobile
- [ ] Test admin panel on tablet/mobile

#### 7.4 Accessibility Testing (Day 5)
- [ ] WAVE tool (0 errors)
- [ ] Keyboard navigation (tab through all elements)
- [ ] Screen reader test (NVDA/JAWS)
- [ ] Color contrast check (4.5:1 minimum)
- [ ] Alt text present on all images
- [ ] ARIA labels where needed
- [ ] Focus indicators visible
- [ ] Proper heading structure

**Deliverable:** Fully tested, bug-free website

---

### PHASE 8: LAUNCH PREPARATION (Week 8)
**Goal:** Final checks and deployment

#### 8.1 Final Content Review (Days 1-2)
- [ ] Proofread all text
- [ ] Check all prices are correct
- [ ] Verify contact information
- [ ] Check operating hours
- [ ] Verify WhatsApp number (+971-502060674)
- [ ] Confirm Google Maps location
- [ ] Review FAQ answers
- [ ] Check all CTAs link correctly

#### 8.2 Client Review & Revisions (Days 3-4)
- [ ] Walkthrough with client
- [ ] Gather feedback
- [ ] Prioritize revision requests
- [ ] Implement high-priority changes
- [ ] Re-test after changes
- [ ] Second client review
- [ ] Final approval

#### 8.3 Domain & Deployment (Day 5)
- [ ] Purchase/transfer domain (client to provide)
- [ ] Configure DNS settings
- [ ] Deploy to Vercel production
- [ ] Test live site thoroughly
- [ ] Set up SSL certificate (auto with Vercel)
- [ ] Configure environment variables
- [ ] Set up database connection (production)
- [ ] Test booking flow on live site
- [ ] Submit to Google Search Console
- [ ] Submit sitemap to Google

#### 8.4 Launch! (Day 5 - Evening)
- [ ] Announce on Instagram (@podcast.ecospace)
- [ ] Monitor for issues
- [ ] Check analytics setup
- [ ] Test booking confirmation emails
- [ ] Celebrate! 🎉

**Deliverable:** Live, production-ready website at custom domain

---

## 🎯 SUCCESS METRICS

### Technical Metrics
- ✅ Lighthouse score 90+ (all categories)
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Mobile-friendly (Google test)
- ✅ 0 accessibility errors (WAVE)
- ✅ Cross-browser compatible
- ✅ 100% uptime (Vercel)

### Business Metrics (3 months post-launch)
- 🎯 500+ monthly visitors
- 🎯 20+ booking inquiries/month
- 🎯 10+ actual bookings/month
- 🎯 5+ newsletter subscribers/week
- 🎯 Page 1 Google ranking for "podcast studio Dubai"
- 🎯 Strong Instagram → website traffic

---

## 📦 DELIVERABLES SUMMARY

| Phase | Deliverable | Estimated Completion |
|-------|-------------|---------------------|
| 1 | Landing page skeleton (5 critical sections) | Week 1 |
| 2 | Working booking system with confirmations | Week 2 |
| 3 | Admin panel for booking management | Week 3 |
| 4 | Complete landing page (all 12 sections) | Week 4 |
| 5 | Additional pages (Pricing, Services, Contact, FAQ) | Week 5 |
| 6 | Analytics, performance, SEO optimization | Week 6 |
| 7 | Comprehensive testing and QA | Week 7 |
| 8 | Launch on production domain | Week 8 |

---

## ⚡ CURRENT BLOCKER

**Waiting for:** Podover theme screenshots (66 images across 12 sections)

**What's ready:**
- ✅ Complete project requirements
- ✅ All content (pricing, services, FAQ, contact info)
- ✅ Folder structure for screenshots
- ✅ Detailed instructions for each section
- ✅ Tech stack configured
- ✅ Database schema designed

**Next action:** User to provide screenshots from Podover theme

Once screenshots are received, development can begin immediately following Phase 1.1 (Setup & Configuration).

---

## 📞 SUPPORT & QUESTIONS

**Developer:** Vivek Kumar Singh
- Email: rogerthatvivek@gmail.com
- Phone: +971-501480042

**Reference Documents:**
- `MASTER_PROJECT_DOC.md` - Complete project reference
- `LANDING_PAGE_OUTLINE.md` - Detailed section breakdown
- `SCREENSHOT_REQUEST_CHECKLIST.md` - Screenshot requirements
- `PROJECT_CHECKLIST_TSUROV.md` - Granular task tracking

---

**Ready to start building once screenshots are provided!** 🚀
