import nodemailer from 'nodemailer';
import prisma from './prisma';

/**
 * Email Queue Service for Podcast EcoSpace
 * Features: Queue system, rate limiting, MongoDB audit, logo support
 */

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  user: process.env.SMTP_USER || '',
  password: process.env.SMTP_PASSWORD || '',
  fromEmail: process.env.FROM_EMAIL || process.env.SMTP_USER || '',
  adminEmail: process.env.ADMIN_EMAIL || '',
  lambdaUrl: process.env.EMAIL_SERVICE_URL || '', // AWS Lambda email service URL
};

// Constants
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://podspace.vercel.app';
const LOGO_URL = `${APP_URL}/images/IMG_20251121_085355_649.png`;
const RATE_LIMIT_DELAY = 1000; // 1 second between emails
const USE_LAMBDA = !!emailConfig.lambdaUrl; // Use Lambda if URL is configured

// Logo as text fallback (works in all email clients)
const LOGO_TEXT = 'PODCAST ECOSPACE';

// Studio Location Details
const STUDIO_LOCATION = {
  name: 'Podcast EcoSpace Dubai',
  address: 'Dubai World Trade Centre (DWTC)',
  city: 'Dubai, United Arab Emirates',
  lat: 25.226111,
  lng: 55.2838106,
  phone: '+971 50 206 0674',
  whatsapp: 'https://wa.me/971502060674',
  googleMapsUrl: 'https://www.google.com/maps/place/DEXNET+Technologies.+DEXNode/@25.226111,55.2863855,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f434fb87cd29d:0x3760eeb213084725!8m2!3d25.226111!4d55.2838106!16s%2Fg%2F11vj9bcnwc?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D',
};

// Log configuration for debugging (VERBOSE for Vercel diagnosis)
console.log('[Email Config] ===== DETAILED CONFIGURATION =====');
console.log('[Email Config] Environment:', process.env.NODE_ENV);
console.log('[Email Config] APP_URL:', APP_URL);
console.log('[Email Config] Email Service:', USE_LAMBDA ? 'AWS Lambda' : 'Direct SMTP');
if (USE_LAMBDA) {
  console.log('[Email Config] Lambda URL:', emailConfig.lambdaUrl ? `${emailConfig.lambdaUrl.substring(0, 40)}...` : 'NOT SET');
} else {
  console.log('[Email Config] SMTP_HOST:', emailConfig.host || 'NOT SET');
  console.log('[Email Config] SMTP_PORT:', emailConfig.port);
  console.log('[Email Config] SMTP_USER:', emailConfig.user ? `${emailConfig.user.substring(0, 5)}...` : 'NOT SET');
  console.log('[Email Config] SMTP_PASSWORD:', emailConfig.password ? `***${emailConfig.password.length} chars***` : 'NOT SET');
}
console.log('[Email Config] FROM_EMAIL:', emailConfig.fromEmail || 'NOT SET');
console.log('[Email Config] ADMIN_EMAIL:', emailConfig.adminEmail || 'NOT SET');
console.log('[Email Config] Is Configured:', USE_LAMBDA ? !!emailConfig.lambdaUrl : !!(emailConfig.host && emailConfig.user && emailConfig.password));
console.log('[Email Config] ========================================');

// Transporter (lazy init)
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  console.log('[Email] getTransporter() called');

  if (!isEmailConfigured()) {
    console.error('[Email] Email NOT configured - missing SMTP credentials');
    return null;
  }

  if (!transporter) {
    console.log('[Email] Creating new transporter with config:', {
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465,
      user: emailConfig.user?.substring(0, 5) + '...',
    });

    transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465,
      auth: { user: emailConfig.user, pass: emailConfig.password },
      // Add connection logging
      logger: true,
      debug: true,
    });

    console.log('[Email] Transporter created successfully');
  }

  return transporter;
}

export function isEmailConfigured(): boolean {
  const configured = USE_LAMBDA ? !!emailConfig.lambdaUrl : !!(emailConfig.host && emailConfig.user && emailConfig.password);
  console.log('[Email] isEmailConfigured():', configured);
  return configured;
}

// Types
interface BookingEmailData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedDate: Date | string;
  selectedTime: string;
  sessionDuration: number;
  selectedService: { name?: string; price?: number };
  totalPrice: number;
  specialRequests?: string | null;
}

interface ContactEmailData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}

type TemplateType = 'booking_confirmation' | 'admin_booking' | 'contact_admin' | 'contact_ack' | 'status_update' | 'test';

// ============================================
// QUEUE SYSTEM
// ============================================

/**
 * Add email to queue (main entry point for all emails)
 */
export async function queueEmail(
  templateType: TemplateType,
  to: string,
  subject: string,
  templateData: Record<string, unknown>,
  priority: number = 0,
  _metadata?: Record<string, unknown>
): Promise<string | null> {
  try {
    console.log('[Email Queue] Adding email to queue:', { to, subject, templateType });

    const email = await prisma.emailQueue.create({
      data: {
        to,
        subject,
        templateType,
        templateData: JSON.parse(JSON.stringify(templateData)),
        priority,
        status: 'PENDING',
        scheduledFor: new Date(),
      },
    });

    console.log('[Email Queue] Email queued with ID:', email.id);

    // IMPORTANT: On Vercel, we MUST await this or the function terminates before sending
    // Process immediately and WAIT for it to complete
    console.log('[Email Queue] Processing queue immediately (synchronous for Vercel)...');
    await processEmailQueue();
    console.log('[Email Queue] Queue processing completed');

    return email.id;
  } catch (error) {
    console.error('[Email Queue] Failed to queue email:', error);
    return null;
  }
}

/**
 * Process pending emails from queue
 */
export async function processEmailQueue(): Promise<void> {
  console.log('[Email Queue] Starting queue processor...');

  const pendingEmails = await prisma.emailQueue.findMany({
    where: {
      status: 'PENDING',
      scheduledFor: { lte: new Date() },
      attempts: { lt: 3 },
    },
    orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
    take: 10,
  });

  console.log(`[Email Queue] Found ${pendingEmails.length} pending emails to process`);

  if (pendingEmails.length === 0) {
    console.log('[Email Queue] No pending emails, exiting');
    return;
  }

  for (const email of pendingEmails) {
    console.log(`[Email Queue] Processing email ${email.id} to ${email.to}`);

    // Mark as processing
    await prisma.emailQueue.update({
      where: { id: email.id },
      data: { status: 'PROCESSING', attempts: { increment: 1 } },
    });
    console.log(`[Email Queue] Marked as PROCESSING (attempt ${email.attempts + 1})`);

    try {
      console.log('[Email Queue] Generating HTML template...');
      // Generate HTML from template
      const html = generateEmailHtml(email.templateType, email.templateData as Record<string, unknown>);
      console.log(`[Email Queue] HTML generated (${html.length} chars)`);

      console.log('[Email Queue] Sending email via SMTP...');
      // Send email
      const result = await sendEmailDirect({ to: email.to, subject: email.subject, html });
      console.log(`[Email Queue] Email sent successfully! Message ID: ${result.messageId}`);

      // Update queue status
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
          processedAt: new Date(),
        },
      });
      console.log('[Email Queue] Updated queue status to SENT');

      // Log to audit
      await prisma.emailLog.create({
        data: {
          to: email.to,
          subject: email.subject,
          templateType: email.templateType,
          status: 'sent',
          messageId: result.messageId || null,
          metadata: email.templateData as object,
        },
      });
      console.log('[Email Queue] Logged to email audit trail');

      // Rate limiting delay
      console.log('[Email Queue] Waiting 1 second (rate limit)...');
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // Update queue with error
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: email.attempts >= 2 ? 'FAILED' : 'PENDING',
          errorMessage,
          processedAt: new Date(),
        },
      });

      // Log failure
      await prisma.emailLog.create({
        data: {
          to: email.to,
          subject: email.subject,
          templateType: email.templateType,
          status: 'failed',
          errorMessage,
          metadata: email.templateData as object,
        },
      });
    }
  }
}

// ============================================
// PUBLIC EMAIL FUNCTIONS
// ============================================

export async function sendBookingConfirmationEmail(booking: BookingEmailData): Promise<boolean> {
  if (!isEmailConfigured()) return false;
  const id = await queueEmail(
    'booking_confirmation',
    booking.customerEmail,
    'Booking Request Received - Podcast EcoSpace',
    { booking },
    1,
    { bookingId: booking.id }
  );
  return !!id;
}

export async function sendAdminBookingNotification(booking: BookingEmailData): Promise<boolean> {
  if (!isEmailConfigured() || !emailConfig.adminEmail) return false;
  const date = new Date(booking.selectedDate);
  const formattedDate = date.toLocaleDateString('en-AE', { weekday: 'short', month: 'short', day: 'numeric' });
  const id = await queueEmail(
    'admin_booking',
    emailConfig.adminEmail,
    `New Booking: ${booking.customerName} - ${formattedDate} at ${booking.selectedTime}`,
    { booking },
    2,
    { bookingId: booking.id }
  );
  return !!id;
}

export async function sendContactNotification(contact: ContactEmailData): Promise<boolean> {
  if (!isEmailConfigured() || !emailConfig.adminEmail) return false;
  const id = await queueEmail(
    'contact_admin',
    emailConfig.adminEmail,
    `New Inquiry from ${contact.name}`,
    { contact },
    1,
    { contactId: contact.id }
  );
  return !!id;
}

export async function sendContactAcknowledgement(contact: ContactEmailData): Promise<boolean> {
  if (!isEmailConfigured()) return false;
  const id = await queueEmail(
    'contact_ack',
    contact.email,
    'We Received Your Message - Podcast EcoSpace',
    { contact },
    1,
    { contactId: contact.id }
  );
  return !!id;
}

export async function sendBookingStatusUpdate(
  booking: BookingEmailData,
  newStatus: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
): Promise<boolean> {
  if (!isEmailConfigured()) return false;
  const statusSubjects = {
    CONFIRMED: 'Your Booking is Confirmed',
    CANCELLED: 'Booking Cancelled',
    COMPLETED: 'Thank You for Your Session',
  };
  const id = await queueEmail(
    'status_update',
    booking.customerEmail,
    `${statusSubjects[newStatus]} - Podcast EcoSpace`,
    { booking, status: newStatus },
    2,
    { bookingId: booking.id, status: newStatus }
  );
  return !!id;
}

export async function sendTestEmail(toEmail: string): Promise<boolean> {
  if (!isEmailConfigured()) return false;
  const id = await queueEmail(
    'test',
    toEmail,
    'Email Configuration Test - Podcast EcoSpace',
    { config: { host: emailConfig.host, from: emailConfig.fromEmail, admin: emailConfig.adminEmail } },
    3
  );
  return !!id;
}

// ============================================
// TEMPLATE GENERATION
// ============================================

function generateEmailHtml(templateType: string, data: Record<string, unknown>): string {
  switch (templateType) {
    case 'booking_confirmation':
      return generateBookingConfirmationHtml(data.booking as BookingEmailData);
    case 'admin_booking':
      return generateAdminBookingHtml(data.booking as BookingEmailData);
    case 'contact_admin':
      return generateContactAdminHtml(data.contact as ContactEmailData);
    case 'contact_ack':
      return generateContactAckHtml(data.contact as ContactEmailData);
    case 'status_update':
      return generateStatusUpdateHtml(data.booking as BookingEmailData, data.status as string);
    case 'test':
      return generateTestHtml(data.config as Record<string, string>);
    default:
      return '<p>Email template not found</p>';
  }
}

// Header with logo
function getHeader(showTagline = true): string {
  // Use production logo URL if deployed, otherwise use text
  const isLocalhost = APP_URL.includes('localhost');
  const useImage = isLocalhost === false;

  return `
    <tr>
      <td style="background-color: #0a0a0a; padding: 32px 40px; text-align: center;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align: center; padding-bottom: ${showTagline ? '12px' : '0'};">
              ${useImage ? `
              <img src="${LOGO_URL}" alt="${LOGO_TEXT}" style="height: 60px; width: auto; max-width: 100%; display: block; margin: 0 auto;" />
              ` : `
              <h1 style="margin: 0; color: #a3e635; font-size: 28px; font-weight: 700; letter-spacing: 2px; font-family: Arial, sans-serif;">${LOGO_TEXT}</h1>
              `}
            </td>
          </tr>
          ${showTagline ? `<tr><td style="text-align: center;"><p style="margin: 0; color: #71717a; font-size: 14px;">Premium Podcast Studio | Dubai</p></td></tr>` : ''}
        </table>
      </td>
    </tr>
  `;
}

// Admin header with badge
function getAdminHeader(badge: string, badgeColor = '#a3e635'): string {
  const textColor = badgeColor === '#a3e635' ? '#0a0a0a' : '#ffffff';
  const isLocalhost = APP_URL.includes('localhost');
  const useImage = isLocalhost === false;

  return `
    <tr>
      <td style="background-color: #0a0a0a; padding: 24px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align: middle;">
              ${useImage ? `
              <img src="${LOGO_URL}" alt="${LOGO_TEXT}" style="height: 40px; width: auto; max-width: 200px; display: block;" />
              ` : `
              <span style="color: #a3e635; font-size: 18px; font-weight: 700; letter-spacing: 1px; font-family: Arial, sans-serif;">${LOGO_TEXT}</span>
              `}
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <span style="background-color: ${badgeColor}; color: ${textColor}; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${badge}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

// Footer
function getFooter(): string {
  return `
    <tr>
      <td style="background-color: #fafafa; padding: 24px 40px; border-top: 1px solid #e4e4e7;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align: center;">
              <p style="margin: 0 0 8px; color: #52525b; font-size: 14px;">Questions? Contact us</p>
              <a href="https://wa.me/971502060674" style="color: #18181b; font-size: 16px; font-weight: 600; text-decoration: none;">+971 50 206 0674</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 40px; text-align: center;">
        <p style="margin: 0; color: #a1a1aa; font-size: 12px;">Podcast EcoSpace Dubai | Dubai World Trade Center</p>
      </td>
    </tr>
  `;
}

// Email wrapper
function wrapEmail(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Booking confirmation for customer
function generateBookingConfirmationHtml(booking: BookingEmailData): string {
  const date = new Date(booking.selectedDate);
  const formattedDate = date.toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return wrapEmail(`
    ${getHeader()}
    <tr>
      <td style="padding: 40px;">
        <h2 style="margin: 0 0 16px; color: #18181b; font-size: 22px; font-weight: 600;">Booking Request Received</h2>
        <p style="margin: 0 0 24px; color: #3f3f46; font-size: 15px;">Dear ${booking.customerName},</p>
        <p style="margin: 0 0 32px; color: #52525b; font-size: 15px; line-height: 1.7;">Thank you for choosing Podcast EcoSpace. We have received your booking request and our team will review it shortly. You will receive a confirmation once your session is approved.</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 32px;">
          <tr><td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;"><p style="margin: 0; color: #a3e635; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Booking Details</p></td></tr>
          <tr><td style="padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #71717a; font-size: 14px;">Date</td><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #18181b; font-size: 14px; text-align: right; font-weight: 500;">${formattedDate}</td></tr>
              <tr><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #71717a; font-size: 14px;">Time</td><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #18181b; font-size: 14px; text-align: right; font-weight: 500;">${booking.selectedTime}</td></tr>
              <tr><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #71717a; font-size: 14px;">Duration</td><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #18181b; font-size: 14px; text-align: right; font-weight: 500;">${booking.sessionDuration} hour${booking.sessionDuration > 1 ? 's' : ''}</td></tr>
              <tr><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #71717a; font-size: 14px;">Service</td><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #18181b; font-size: 14px; text-align: right; font-weight: 500;">${booking.selectedService?.name || 'Standard Package'}</td></tr>
              <tr><td style="padding: 16px 24px; color: #18181b; font-size: 14px; font-weight: 600;">Total Amount</td><td style="padding: 16px 24px; color: #a3e635; font-size: 18px; text-align: right; font-weight: 700;">${booking.totalPrice} AED</td></tr>
            </table>
          </td></tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 32px;">
          <tr><td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;"><p style="margin: 0; color: #a3e635; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Studio Location</p></td></tr>
          <tr><td style="padding: 20px 24px;">
            <p style="margin: 0 0 4px; color: #18181b; font-size: 15px; font-weight: 600;">${STUDIO_LOCATION.name}</p>
            <p style="margin: 0 0 20px; color: #71717a; font-size: 14px; line-height: 1.6;">${STUDIO_LOCATION.address}<br>${STUDIO_LOCATION.city}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right: 8px; width: 50%;">
                  <a href="${STUDIO_LOCATION.googleMapsUrl}" style="display: block; background-color: #a3e635; color: #0a0a0a; padding: 12px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; text-align: center;">Get Directions</a>
                </td>
                <td style="padding-left: 8px; width: 50%;">
                  <a href="${STUDIO_LOCATION.whatsapp}" style="display: block; background-color: #16a34a; color: #ffffff; padding: 12px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; text-align: center;">WhatsApp</a>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>

        <p style="margin: 0; color: #a1a1aa; font-size: 13px; text-align: center;">Booking Reference: <strong style="color: #71717a;">#${booking.id.slice(-8).toUpperCase()}</strong></p>
      </td>
    </tr>
    ${getFooter()}
  `);
}

// Admin booking notification
function generateAdminBookingHtml(booking: BookingEmailData): string {
  const date = new Date(booking.selectedDate);
  const formattedDate = date.toLocaleDateString('en-AE', { weekday: 'short', month: 'short', day: 'numeric' });
  const phoneClean = booking.customerPhone.replace(/[^0-9]/g, '');

  return wrapEmail(`
    ${getAdminHeader('New Booking')}
    <tr>
      <td style="padding: 32px 40px;">
        <h2 style="margin: 0 0 4px; color: #18181b; font-size: 20px; font-weight: 600;">${booking.customerName}</h2>
        <p style="margin: 0 0 24px; color: #71717a; font-size: 14px;">
          <a href="mailto:${booking.customerEmail}" style="color: #2563eb; text-decoration: none;">${booking.customerEmail}</a>
          <span style="color: #d4d4d8; margin: 0 8px;">|</span>
          <a href="tel:${booking.customerPhone}" style="color: #2563eb; text-decoration: none;">${booking.customerPhone}</a>
          <span style="color: #d4d4d8; margin: 0 8px;">|</span>
          <a href="https://wa.me/${phoneClean}" style="color: #22c55e; text-decoration: none;">WhatsApp</a>
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #e4e4e7;"><p style="margin: 0; color: #71717a; font-size: 13px;">Date</p><p style="margin: 4px 0 0; color: #18181b; font-size: 15px; font-weight: 500;">${formattedDate}</p></td>
            <td style="padding: 16px 20px; border-bottom: 1px solid #e4e4e7; border-left: 1px solid #e4e4e7;"><p style="margin: 0; color: #71717a; font-size: 13px;">Time</p><p style="margin: 4px 0 0; color: #18181b; font-size: 15px; font-weight: 500;">${booking.selectedTime}</p></td>
            <td style="padding: 16px 20px; border-bottom: 1px solid #e4e4e7; border-left: 1px solid #e4e4e7;"><p style="margin: 0; color: #71717a; font-size: 13px;">Duration</p><p style="margin: 4px 0 0; color: #18181b; font-size: 15px; font-weight: 500;">${booking.sessionDuration}h</p></td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 16px 20px;"><p style="margin: 0; color: #71717a; font-size: 13px;">Service</p><p style="margin: 4px 0 0; color: #18181b; font-size: 15px; font-weight: 500;">${booking.selectedService?.name || 'Standard Package'}</p></td>
            <td style="padding: 16px 20px; border-left: 1px solid #e4e4e7; text-align: right;"><p style="margin: 0; color: #71717a; font-size: 13px;">Total</p><p style="margin: 4px 0 0; color: #16a34a; font-size: 18px; font-weight: 700;">${booking.totalPrice} AED</p></td>
          </tr>
        </table>

        ${booking.specialRequests ? `
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fefce8; border-radius: 8px; border: 1px solid #fef08a; margin-bottom: 24px;">
          <tr><td style="padding: 16px 20px;"><p style="margin: 0 0 8px; color: #a16207; font-size: 13px; font-weight: 600; text-transform: uppercase;">Special Requests</p><p style="margin: 0; color: #713f12; font-size: 14px; line-height: 1.6;">${booking.specialRequests}</p></td></tr>
        </table>
        ` : ''}

        <a href="${APP_URL}/admin/bookings" style="display: inline-block; background-color: #a3e635; color: #0a0a0a; padding: 14px 28px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none;">View in Admin Panel</a>
      </td>
    </tr>
    <tr><td style="padding: 20px 40px; border-top: 1px solid #e4e4e7;"><p style="margin: 0; color: #a1a1aa; font-size: 12px;">Booking ID: ${booking.id}</p></td></tr>
  `);
}

// Contact notification for admin
function generateContactAdminHtml(contact: ContactEmailData): string {
  const phoneClean = contact.phone?.replace(/[^0-9]/g, '') || '';

  return wrapEmail(`
    ${getAdminHeader('New Inquiry', '#3b82f6')}
    <tr>
      <td style="padding: 32px 40px;">
        <h2 style="margin: 0 0 4px; color: #18181b; font-size: 20px; font-weight: 600;">${contact.name}</h2>
        <p style="margin: 0 0 24px; color: #71717a; font-size: 14px;">
          <a href="mailto:${contact.email}" style="color: #2563eb; text-decoration: none;">${contact.email}</a>
          ${contact.phone ? `<span style="color: #d4d4d8; margin: 0 8px;">|</span><a href="tel:${contact.phone}" style="color: #2563eb; text-decoration: none;">${contact.phone}</a><span style="color: #d4d4d8; margin: 0 8px;">|</span><a href="https://wa.me/${phoneClean}" style="color: #22c55e; text-decoration: none;">WhatsApp</a>` : ''}
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 24px;">
          <tr><td style="padding: 20px 24px;">
            <p style="margin: 0 0 12px; color: #1e40af; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
            <p style="margin: 0; color: #1e3a5f; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${contact.message}</p>
          </td></tr>
        </table>

        <a href="${APP_URL}/admin/messages" style="display: inline-block; background-color: #a3e635; color: #0a0a0a; padding: 14px 28px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; margin-right: 12px;">View in Admin</a>
        <a href="mailto:${contact.email}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none;">Reply via Email</a>
      </td>
    </tr>
    <tr><td style="padding: 20px 40px; border-top: 1px solid #e4e4e7;"><p style="margin: 0; color: #a1a1aa; font-size: 12px;">Inquiry ID: ${contact.id}</p></td></tr>
  `);
}

// Contact acknowledgement for customer
function generateContactAckHtml(contact: ContactEmailData): string {
  return wrapEmail(`
    ${getHeader()}
    <tr>
      <td style="padding: 40px;">
        <h2 style="margin: 0 0 16px; color: #18181b; font-size: 22px; font-weight: 600;">Thank You for Reaching Out</h2>
        <p style="margin: 0 0 24px; color: #3f3f46; font-size: 15px;">Dear ${contact.name},</p>
        <p style="margin: 0 0 32px; color: #52525b; font-size: 15px; line-height: 1.7;">We have received your message and appreciate you contacting Podcast EcoSpace. Our team will review your inquiry and get back to you as soon as possible, typically within 24 hours.</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 32px;">
          <tr><td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;"><p style="margin: 0; color: #a3e635; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</p></td></tr>
          <tr><td style="padding: 20px 24px;"><p style="margin: 0; color: #52525b; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${contact.message}</p></td></tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 32px;">
          <tr><td style="padding: 20px 24px;">
            <p style="margin: 0 0 12px; color: #166534; font-size: 14px; font-weight: 600;">What happens next?</p>
            <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px; line-height: 1.8;">
              <li>Our team will review your inquiry</li>
              <li>We will respond within 24 hours</li>
              <li>For urgent matters, call us directly</li>
            </ul>
          </td></tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="text-align: center;">
          <tr><td><a href="${APP_URL}/book" style="display: inline-block; background-color: #a3e635; color: #0a0a0a; padding: 14px 32px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none;">Book a Session</a></td></tr>
        </table>

        <p style="margin: 32px 0 0; color: #a1a1aa; font-size: 13px; text-align: center;">Reference: <strong style="color: #71717a;">#${contact.id.slice(-8).toUpperCase()}</strong></p>
      </td>
    </tr>
    ${getFooter()}
  `);
}

// Status update email
function generateStatusUpdateHtml(booking: BookingEmailData, status: string): string {
  const statusConfig: Record<string, { heading: string; message: string; color: string; bgColor: string; borderColor: string }> = {
    CONFIRMED: { heading: 'Booking Confirmed', message: 'Great news! Your booking has been confirmed. We look forward to seeing you at the studio.', color: '#22c55e', bgColor: '#f0fdf4', borderColor: '#86efac' },
    CANCELLED: { heading: 'Booking Cancelled', message: 'Your booking has been cancelled. If you have any questions or would like to reschedule, please contact us.', color: '#ef4444', bgColor: '#fef2f2', borderColor: '#fecaca' },
    COMPLETED: { heading: 'Session Completed', message: 'Thank you for choosing Podcast EcoSpace! We hope you had a great recording experience. We would love to have you back.', color: '#a3e635', bgColor: '#f7fee7', borderColor: '#bef264' },
  };

  const config = statusConfig[status] || statusConfig.CONFIRMED;
  const date = new Date(booking.selectedDate);
  const formattedDate = date.toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return wrapEmail(`
    ${getHeader()}
    <tr><td style="background-color: ${config.bgColor}; border-bottom: 3px solid ${config.borderColor}; padding: 20px 40px; text-align: center;"><h2 style="margin: 0; color: ${config.color}; font-size: 22px; font-weight: 600;">${config.heading}</h2></td></tr>
    <tr>
      <td style="padding: 40px;">
        <p style="margin: 0 0 24px; color: #3f3f46; font-size: 15px;">Dear ${booking.customerName},</p>
        <p style="margin: 0 0 32px; color: #52525b; font-size: 15px; line-height: 1.7;">${config.message}</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 32px;">
          <tr><td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;"><p style="margin: 0; color: #71717a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Session Details</p></td></tr>
          <tr><td style="padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #71717a; font-size: 14px;">Date</td><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #18181b; font-size: 14px; text-align: right; font-weight: 500;">${formattedDate}</td></tr>
              <tr><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #71717a; font-size: 14px;">Time</td><td style="padding: 16px 24px; border-bottom: 1px solid #e4e4e7; color: #18181b; font-size: 14px; text-align: right; font-weight: 500;">${booking.selectedTime}</td></tr>
              <tr><td style="padding: 16px 24px; color: #71717a; font-size: 14px;">Service</td><td style="padding: 16px 24px; color: #18181b; font-size: 14px; text-align: right; font-weight: 500;">${booking.selectedService?.name || 'Standard Package'}</td></tr>
            </table>
          </td></tr>
        </table>

        ${status === 'CONFIRMED' ? `
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 32px;">
          <tr><td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;"><p style="margin: 0; color: #a3e635; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Studio Location</p></td></tr>
          <tr><td style="padding: 20px 24px;">
            <p style="margin: 0 0 4px; color: #18181b; font-size: 15px; font-weight: 600;">${STUDIO_LOCATION.name}</p>
            <p style="margin: 0 0 20px; color: #71717a; font-size: 14px; line-height: 1.6;">${STUDIO_LOCATION.address}<br>${STUDIO_LOCATION.city}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right: 8px; width: 50%;">
                  <a href="${STUDIO_LOCATION.googleMapsUrl}" style="display: block; background-color: #a3e635; color: #0a0a0a; padding: 12px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; text-align: center;">Get Directions</a>
                </td>
                <td style="padding-left: 8px; width: 50%;">
                  <a href="${STUDIO_LOCATION.whatsapp}" style="display: block; background-color: #16a34a; color: #ffffff; padding: 12px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; text-align: center;">WhatsApp</a>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
        ` : ''}

        <p style="margin: 0; color: #a1a1aa; font-size: 13px; text-align: center;">Booking Reference: <strong style="color: #71717a;">#${booking.id.slice(-8).toUpperCase()}</strong></p>
      </td>
    </tr>
    ${getFooter()}
  `);
}

// Test email
function generateTestHtml(config: Record<string, string>): string {
  return wrapEmail(`
    ${getHeader()}
    <tr>
      <td style="padding: 40px; text-align: center;">
        <div style="width: 64px; height: 64px; background-color: #f0fdf4; border-radius: 50%; margin: 0 auto 24px; line-height: 64px;"><span style="color: #22c55e; font-size: 32px;">&#10003;</span></div>
        <h2 style="margin: 0 0 16px; color: #18181b; font-size: 22px; font-weight: 600;">Email Configuration Successful</h2>
        <p style="margin: 0 0 32px; color: #52525b; font-size: 15px; line-height: 1.7;">Your email notifications are now configured correctly. The booking system will automatically send emails for new bookings, confirmations, and contact form submissions.</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e4e4e7;">
          <tr><td style="padding: 20px 24px; text-align: left;">
            <p style="margin: 0 0 8px; color: #71717a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Configuration Details</p>
            <p style="margin: 0; color: #18181b; font-size: 14px; line-height: 1.8;">SMTP Host: ${config.host}<br>From: ${config.from}<br>Admin: ${config.admin}</p>
          </td></tr>
        </table>
      </td>
    </tr>
    <tr><td style="padding: 20px 40px; border-top: 1px solid #e4e4e7; text-align: center;"><p style="margin: 0; color: #a1a1aa; font-size: 12px;">Podcast EcoSpace Dubai | Dubai World Trade Center</p></td></tr>
  `);
}

// ============================================
// DIRECT EMAIL SENDING (used by queue processor)
// ============================================

async function sendEmailDirect(options: { to: string; subject: string; html: string }): Promise<{ messageId?: string }> {
  console.log('[Email] ===== SENDING EMAIL =====');
  console.log('[Email] To:', options.to);
  console.log('[Email] Subject:', options.subject);
  console.log('[Email] HTML length:', options.html.length, 'chars');
  console.log('[Email] Method:', USE_LAMBDA ? 'AWS Lambda' : 'Direct SMTP');

  // Use Lambda if configured
  if (USE_LAMBDA) {
    return sendViaLambda(options);
  }

  // Otherwise use direct SMTP
  return sendViaSMTP(options);
}

// Send via AWS Lambda HTTP endpoint
async function sendViaLambda(options: { to: string; subject: string; html: string }): Promise<{ messageId?: string }> {
  console.log('[Email Lambda] Sending via AWS Lambda...');
  console.log('[Email Lambda] Lambda URL:', emailConfig.lambdaUrl);

  try {
    const startTime = Date.now();
    const response = await fetch(emailConfig.lambdaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Email Lambda] ❌ HTTP Error:', response.status, response.statusText);
      console.error('[Email Lambda] Response:', errorText);
      throw new Error(`Lambda returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    if (!result.success) {
      console.error('[Email Lambda] ❌ Lambda Error:', result.error);
      throw new Error(`Lambda error: ${result.error}`);
    }

    console.log('[Email Lambda] ✅ SUCCESS! Email sent in', duration, 'ms');
    console.log('[Email Lambda] Message ID:', result.messageId);
    console.log('[Email Lambda] Response:', result.response);
    console.log('[Email Lambda] ============================');

    return { messageId: result.messageId };
  } catch (error) {
    console.error('[Email Lambda] ❌ FAILED TO SEND EMAIL');
    console.error('[Email Lambda] Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('[Email Lambda] Error message:', error instanceof Error ? error.message : String(error));
    console.error('[Email Lambda] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('[Email Lambda] ============================');
    throw error;
  }
}

// Send via direct SMTP (localhost/development)
async function sendViaSMTP(options: { to: string; subject: string; html: string }): Promise<{ messageId?: string }> {
  const transport = getTransporter();
  if (!transport) {
    const error = 'Email not configured - transporter is null';
    console.error('[Email] ERROR:', error);
    throw new Error(error);
  }

  console.log('[Email SMTP] Transporter ready, attempting to send...');

  try {
    const mailOptions = {
      from: `"Podcast EcoSpace" <${emailConfig.fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    console.log('[Email SMTP] Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const startTime = Date.now();
    const result = await transport.sendMail(mailOptions);
    const duration = Date.now() - startTime;

    console.log('[Email SMTP] ✅ SUCCESS! Email sent in', duration, 'ms');
    console.log('[Email SMTP] Message ID:', result.messageId);
    console.log('[Email SMTP] Response:', result.response);
    console.log('[Email SMTP] ============================');

    return { messageId: result.messageId };
  } catch (error) {
    console.error('[Email SMTP] ❌ FAILED TO SEND EMAIL');
    console.error('[Email SMTP] Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('[Email SMTP] Error message:', error instanceof Error ? error.message : String(error));
    console.error('[Email SMTP] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('[Email SMTP] Full error object:', JSON.stringify(error, null, 2));
    console.error('[Email SMTP] ============================');
    throw error;
  }
}
