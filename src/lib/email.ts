/**
 * Email Notification Service
 *
 * This module handles sending email notifications for:
 * - New booking confirmations (to customers)
 * - New booking alerts (to admin)
 * - Contact form submissions (to admin)
 * - Booking status updates (to customers)
 *
 * SETUP INSTRUCTIONS:
 * 1. Add these environment variables to .env:
 *    - SMTP_HOST (e.g., smtp.gmail.com, smtp.resend.com)
 *    - SMTP_PORT (e.g., 587 or 465)
 *    - SMTP_USER (your email or API key)
 *    - SMTP_PASSWORD (your password or API key)
 *    - ADMIN_EMAIL (where to send admin notifications)
 *    - FROM_EMAIL (sender email address)
 *
 * 2. For Gmail:
 *    - Enable 2FA on your Google account
 *    - Generate an App Password: https://myaccount.google.com/apppasswords
 *    - Use the App Password as SMTP_PASSWORD
 *
 * 3. For Resend (recommended for production):
 *    - Sign up at https://resend.com
 *    - Get your API key
 *    - Use api.resend.com as host, API key as password
 */

// Email configuration from environment
const emailConfig = {
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  user: process.env.SMTP_USER || '',
  password: process.env.SMTP_PASSWORD || '',
  fromEmail: process.env.FROM_EMAIL || 'noreply@ecospace.ae',
  adminEmail: process.env.ADMIN_EMAIL || '',
};

// Check if email is configured
export function isEmailConfigured(): boolean {
  return !!(emailConfig.host && emailConfig.user && emailConfig.password);
}

// Booking interface for email templates
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

// Contact submission interface
interface ContactEmailData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}

/**
 * Send booking confirmation email to customer
 */
export async function sendBookingConfirmationEmail(booking: BookingEmailData): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.log('[Email] Skipping - Email not configured');
    return false;
  }

  const date = new Date(booking.selectedDate);
  const formattedDate = date.toLocaleDateString('en-AE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const emailContent = {
    to: booking.customerEmail,
    subject: `Booking Confirmation - ${formattedDate} at ${booking.selectedTime}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #111; padding: 30px; border-radius: 16px;">
          <h1 style="color: #A3E635; margin: 0 0 20px;">Booking Confirmed!</h1>

          <p style="color: #fff; font-size: 16px;">
            Dear ${booking.customerName},
          </p>

          <p style="color: #9CA3AF; font-size: 14px;">
            Thank you for booking with Podcast EcoSpace. Your session has been received and is pending confirmation.
          </p>

          <div style="background: #1F2937; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h2 style="color: #fff; font-size: 18px; margin: 0 0 15px;">Booking Details</h2>

            <table style="width: 100%; color: #9CA3AF; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0;">Date:</td>
                <td style="color: #fff; text-align: right;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">Time:</td>
                <td style="color: #fff; text-align: right;">${booking.selectedTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">Duration:</td>
                <td style="color: #fff; text-align: right;">${booking.sessionDuration} hour(s)</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">Service:</td>
                <td style="color: #fff; text-align: right;">${booking.selectedService?.name || 'Standard'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-top: 1px solid #374151;">Total:</td>
                <td style="color: #A3E635; text-align: right; font-size: 18px; border-top: 1px solid #374151;">
                  ${booking.totalPrice} AED
                </td>
              </tr>
            </table>
          </div>

          <div style="background: #1F2937; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #fff; font-size: 16px; margin: 0 0 10px;">Studio Location</h3>
            <p style="color: #9CA3AF; margin: 0; font-size: 14px;">
              Dubai World Trade Center<br>
              Sheikh Zayed Road, Dubai, UAE
            </p>
          </div>

          <p style="color: #9CA3AF; font-size: 14px;">
            We will contact you shortly to confirm your booking. If you have any questions,
            feel free to reach out via WhatsApp at +971-502060674.
          </p>

          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            Booking Reference: #${booking.id.slice(-8).toUpperCase()}
          </p>
        </div>
      </div>
    `,
  };

  return await sendEmail(emailContent);
}

/**
 * Send new booking notification to admin
 */
export async function sendAdminBookingNotification(booking: BookingEmailData): Promise<boolean> {
  if (!isEmailConfigured() || !emailConfig.adminEmail) {
    console.log('[Email] Skipping admin notification - not configured');
    return false;
  }

  const date = new Date(booking.selectedDate);
  const formattedDate = date.toLocaleDateString('en-AE', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const emailContent = {
    to: emailConfig.adminEmail,
    subject: `New Booking: ${booking.customerName} - ${formattedDate} ${booking.selectedTime}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #A3E635;">New Booking Received</h2>

        <table style="width: 100%; max-width: 500px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Customer</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="mailto:${booking.customerEmail}">${booking.customerEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="tel:${booking.customerPhone}">${booking.customerPhone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Date</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Time</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.selectedTime}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Duration</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.sessionDuration} hour(s)</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.selectedService?.name || 'Standard'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Total</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #A3E635; font-weight: bold;">
              ${booking.totalPrice} AED
            </td>
          </tr>
          ${booking.specialRequests ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Special Requests</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.specialRequests}</td>
          </tr>
          ` : ''}
        </table>

        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/bookings"
             style="background: #A3E635; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            View in Admin Panel
          </a>
        </p>

        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Booking ID: ${booking.id}
        </p>
      </div>
    `,
  };

  return await sendEmail(emailContent);
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(contact: ContactEmailData): Promise<boolean> {
  if (!isEmailConfigured() || !emailConfig.adminEmail) {
    console.log('[Email] Skipping contact notification - not configured');
    return false;
  }

  const emailContent = {
    to: emailConfig.adminEmail,
    subject: `New Contact Form: ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #A3E635;">New Contact Form Submission</h2>

        <table style="width: 100%; max-width: 500px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="mailto:${contact.email}">${contact.email}</a>
            </td>
          </tr>
          ${contact.phone ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="tel:${contact.phone}">${contact.phone}</a>
            </td>
          </tr>
          ` : ''}
        </table>

        <div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h3 style="margin: 0 0 10px;">Message:</h3>
          <p style="margin: 0; white-space: pre-wrap;">${contact.message}</p>
        </div>

        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/messages"
             style="background: #A3E635; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            View in Admin Panel
          </a>
        </p>
      </div>
    `,
  };

  return await sendEmail(emailContent);
}

/**
 * Send booking status update to customer
 */
export async function sendBookingStatusUpdate(
  booking: BookingEmailData,
  newStatus: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.log('[Email] Skipping status update - not configured');
    return false;
  }

  const statusMessages = {
    CONFIRMED: {
      subject: 'Your Booking is Confirmed!',
      heading: 'Booking Confirmed',
      message: 'Great news! Your booking has been confirmed. We look forward to seeing you!',
      color: '#22C55E',
    },
    CANCELLED: {
      subject: 'Booking Cancelled',
      heading: 'Booking Cancelled',
      message: 'Your booking has been cancelled. If you have any questions, please contact us.',
      color: '#EF4444',
    },
    COMPLETED: {
      subject: 'Thank You for Your Session!',
      heading: 'Session Completed',
      message: 'Thank you for choosing Podcast EcoSpace! We hope you had a great experience.',
      color: '#A3E635',
    },
  };

  const status = statusMessages[newStatus];
  const date = new Date(booking.selectedDate);
  const formattedDate = date.toLocaleDateString('en-AE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const emailContent = {
    to: booking.customerEmail,
    subject: `${status.subject} - ${formattedDate}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #111; padding: 30px; border-radius: 16px;">
          <h1 style="color: ${status.color}; margin: 0 0 20px;">${status.heading}</h1>

          <p style="color: #fff; font-size: 16px;">
            Dear ${booking.customerName},
          </p>

          <p style="color: #9CA3AF; font-size: 14px;">
            ${status.message}
          </p>

          <div style="background: #1F2937; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <table style="width: 100%; color: #9CA3AF; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0;">Date:</td>
                <td style="color: #fff; text-align: right;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">Time:</td>
                <td style="color: #fff; text-align: right;">${booking.selectedTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">Service:</td>
                <td style="color: #fff; text-align: right;">${booking.selectedService?.name || 'Standard'}</td>
              </tr>
            </table>
          </div>

          <p style="color: #9CA3AF; font-size: 14px;">
            Questions? Contact us via WhatsApp at +971-502060674
          </p>

          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            Booking Reference: #${booking.id.slice(-8).toUpperCase()}
          </p>
        </div>
      </div>
    `,
  };

  return await sendEmail(emailContent);
}

/**
 * Core email sending function
 * Uses nodemailer-compatible SMTP or can be swapped for Resend/SendGrid
 */
async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  try {
    // For now, log that email would be sent
    // Replace with actual implementation when SMTP is configured
    console.log('[Email] Would send email:', {
      to: options.to,
      subject: options.subject,
    });

    // TODO: Implement actual email sending
    // Option 1: Using nodemailer
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({
    //   host: emailConfig.host,
    //   port: emailConfig.port,
    //   secure: emailConfig.port === 465,
    //   auth: {
    //     user: emailConfig.user,
    //     pass: emailConfig.password,
    //   },
    // });
    // await transporter.sendMail({
    //   from: emailConfig.fromEmail,
    //   ...options,
    // });

    // Option 2: Using Resend API
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${emailConfig.password}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: emailConfig.fromEmail,
    //     to: options.to,
    //     subject: options.subject,
    //     html: options.html,
    //   }),
    // });

    return true;
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    return false;
  }
}
