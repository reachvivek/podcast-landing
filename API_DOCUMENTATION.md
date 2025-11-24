# API Documentation

## Overview

This document provides information about the Podcast EcoSpace Dubai API documentation and email system.

## Swagger Documentation

A comprehensive Swagger/OpenAPI 3.0 specification has been created: [`swagger.yaml`](./swagger.yaml)

### Viewing the Documentation

You can view the Swagger documentation using:

1. **Swagger Editor Online**
   - Go to https://editor.swagger.io/
   - Copy and paste the contents of `swagger.yaml`

2. **Swagger UI (Recommended for Production)**
   - Install: `npm install swagger-ui-express`
   - Add to your Next.js app or create a dedicated documentation page

3. **VS Code Extension**
   - Install "Swagger Viewer" or "OpenAPI (Swagger) Editor" extension
   - Right-click on `swagger.yaml` and select "Preview Swagger"

### API Endpoints Summary

#### Services & Addons
- `GET /api/services` - Get all service packages
- `GET /api/addons` - Get all add-on services

#### Bookings
- `GET /api/bookings` - List all bookings (with filters)
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get single booking
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete/cancel booking

#### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List contact submissions (admin)
- `PATCH /api/contact/:id` - Update contact submission (admin)

#### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify JWT token

#### Analytics
- `GET /api/analytics` - Get analytics data

#### Email Testing
- `POST /api/test-email` - Send test email

## Email System

### Email Templates

The platform includes 7 professional email templates:

1. **Booking Confirmation** (Customer)
   - Sent when a booking is created
   - Includes booking details, services, pricing
   - Text-based logo (works on localhost and production)

2. **Admin Booking Notification**
   - Sent to admin when new booking is created
   - Includes customer info, revenue details
   - Special requests highlighted

3. **Contact Form Admin Notification**
   - Sent to admin when contact form is submitted
   - Includes inquiry details and direct response link

4. **Contact Form Acknowledgement** (Customer)
   - Sent to customer after contact form submission
   - Professional acknowledgement with WhatsApp link

5. **Booking Status Update**
   - Sent when booking status changes
   - Dynamic templates for: CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

### Email Testing

All email templates have been tested and verified. To test emails manually:

```javascript
// Create a test file and run:
const nodemailer = require('nodemailer');

// Use the email.ts functions:
import { sendTestEmail } from '@/lib/email';

await sendTestEmail('your-email@example.com');
```

### Email Queue System

The platform uses an intelligent email queue system with:

- **Rate Limiting**: 1 second delay between emails (prevents Gmail rate limits)
- **MongoDB Audit Trail**: All emails logged in `EmailLog` collection
- **Automatic Retry**: Up to 3 attempts for failed emails
- **Priority Queue**: High-priority emails sent first
- **Status Tracking**: PENDING → PROCESSING → SENT/FAILED

### Logo Display

The email system intelligently handles logo display:

- **Localhost**: Uses elegant text-based logo "PODCAST ECOSPACE" (green #a3e635)
- **Production**: Automatically switches to image logo when deployed
- **Fallback**: Text always works across all email clients

### Email Configuration

Required environment variables:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="podcastecospace@gmail.com"
SMTP_PASSWORD="your-app-password"
FROM_EMAIL="podcastecospace@gmail.com"
ADMIN_EMAIL="podcastecospace@gmail.com"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## Testing Results

### Swagger Documentation
✅ **Generated**: Comprehensive OpenAPI 3.0 specification covering all endpoints
✅ **Complete**: Includes request/response schemas, authentication, examples

### Email Templates
✅ **7 templates tested**: All sent successfully
✅ **Logo fixed**: Text-based logo displays correctly on localhost
✅ **Professional design**: Clean, modern, mobile-responsive
✅ **No emojis**: Professional business communication style

### Test Summary
```
Total Email Tests: 7
✓ Successful: 7
✗ Failed: 0

Test emails sent to: rogerthatvivek@gmail.com
```

## Next Steps

1. **Deploy to Vercel**
   - Add environment variables to Vercel
   - Email logos will automatically use images

2. **View Swagger Docs**
   - Use Swagger Editor to view API documentation
   - Consider adding Swagger UI to the app

3. **Review Emails**
   - Check your inbox at rogerthatvivek@gmail.com
   - Review all 7 email templates
   - Provide feedback for any improvements

4. **Production Ready**
   - All email templates are production-ready
   - Queue system prevents rate limiting
   - MongoDB audit trail for compliance

## Support

For questions or issues:
- WhatsApp: +971 50 206 0674
- Email: podcastecospace@gmail.com
