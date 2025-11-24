import nodemailer from 'nodemailer';

/**
 * Email Notification Service for Podcast EcoSpace
 */

// Email configuration from environment
const emailConfig = {
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  user: process.env.SMTP_USER || '',
  password: process.env.SMTP_PASSWORD || '',
  fromEmail: process.env.FROM_EMAIL || process.env.SMTP_USER || '',
  adminEmail: process.env.ADMIN_EMAIL || '',
};

// Create transporter (lazy initialization)
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!isEmailConfigured()) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
    });
  }
  return transporter;
}

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
    subject: `Booking Received - ${formattedDate} at ${booking.selectedTime} | Podcast EcoSpace`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: #111; padding: 30px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #A3E635; margin: 0; font-size: 24px;">Podcast EcoSpace</h1>
            <p style="color: #9CA3AF; margin: 5px 0 0;">Dubai World Trade Center</p>
          </div>

          <h2 style="color: #fff; margin: 20px 0; font-size: 20px;">Booking Received!</h2>

          <p style="color: #fff; font-size: 16px;">
            Dear ${booking.customerName},
          </p>

          <p style="color: #9CA3AF; font-size: 14px; line-height: 1.6;">
            Thank you for booking with Podcast EcoSpace. Your session request has been received and is pending confirmation. We will contact you shortly to confirm your booking.
          </p>

          <div style="background: #1F2937; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #A3E635; font-size: 16px; margin: 0 0 15px;">Booking Details</h3>

            <table style="width: 100%; color: #9CA3AF; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #374151;">Date:</td>
                <td style="color: #fff; text-align: right; padding: 10px 0; border-bottom: 1px solid #374151;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #374151;">Time:</td>
                <td style="color: #fff; text-align: right; padding: 10px 0; border-bottom: 1px solid #374151;">${booking.selectedTime}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #374151;">Duration:</td>
                <td style="color: #fff; text-align: right; padding: 10px 0; border-bottom: 1px solid #374151;">${booking.sessionDuration} hour(s)</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #374151;">Service:</td>
                <td style="color: #fff; text-align: right; padding: 10px 0; border-bottom: 1px solid #374151;">${booking.selectedService?.name || 'Standard'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold;">Total:</td>
                <td style="color: #A3E635; text-align: right; font-size: 18px; font-weight: bold; padding: 10px 0;">
                  ${booking.totalPrice} AED
                </td>
              </tr>
            </table>
          </div>

          <div style="background: #1F2937; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #fff; font-size: 14px; margin: 0 0 10px;">Studio Location</h3>
            <p style="color: #9CA3AF; margin: 0; font-size: 14px;">
              Dubai World Trade Center<br>
              Sheikh Zayed Road, Dubai, UAE
            </p>
          </div>

          <div style="background: #A3E635; padding: 15px; border-radius: 12px; margin: 20px 0; text-align: center;">
            <p style="color: #000; margin: 0; font-size: 14px; font-weight: bold;">
              Questions? Contact us on WhatsApp
            </p>
            <a href="https://wa.me/971502060674" style="color: #000; font-size: 16px; text-decoration: none;">
              +971-502060674
            </a>
          </div>

          <p style="color: #6B7280; font-size: 12px; text-align: center; margin-top: 30px;">
            Booking Reference: #${booking.id.slice(-8).toUpperCase()}
          </p>
        </div>

        <p style="color: #666; font-size: 11px; text-align: center; margin-top: 20px;">
          Podcast EcoSpace Dubai | Dubai World Trade Center
        </p>
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
    subject: `🎙️ New Booking: ${booking.customerName} - ${formattedDate} ${booking.selectedTime}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #A3E635; margin-bottom: 20px;">New Booking Received</h2>

        <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 8px;">
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Customer</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${booking.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">
              <a href="mailto:${booking.customerEmail}" style="color: #2563EB;">${booking.customerEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">
              <a href="tel:${booking.customerPhone}" style="color: #2563EB;">${booking.customerPhone}</a>
              &nbsp;|&nbsp;
              <a href="https://wa.me/${booking.customerPhone.replace(/[^0-9]/g, '')}" style="color: #22C55E;">WhatsApp</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold;">Date</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold;">Time</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${booking.selectedTime}</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold;">Duration</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${booking.sessionDuration} hour(s)</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold;">Service</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${booking.selectedService?.name || 'Standard'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; font-weight: bold;">Total</td>
            <td style="padding: 12px 15px; color: #16A34A; font-weight: bold; font-size: 18px;">
              ${booking.totalPrice} AED
            </td>
          </tr>
          ${booking.specialRequests ? `
          <tr>
            <td style="padding: 12px 15px; font-weight: bold; vertical-align: top;">Special Requests</td>
            <td style="padding: 12px 15px; background: #FEF3C7;">${booking.specialRequests}</td>
          </tr>
          ` : ''}
        </table>

        <div style="margin-top: 25px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://podspace.vercel.app'}/admin/bookings"
             style="background: #A3E635; color: #000; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
            View in Admin Panel
          </a>
        </div>

        <p style="color: #666; font-size: 12px; margin-top: 25px;">
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
    subject: `📩 New Contact Form: ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #A3E635; margin-bottom: 20px;">New Contact Form Submission</h2>

        <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 8px;">
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">Name</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">
              <a href="mailto:${contact.email}" style="color: #2563EB;">${contact.email}</a>
            </td>
          </tr>
          ${contact.phone ? `
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">
              <a href="tel:${contact.phone}" style="color: #2563EB;">${contact.phone}</a>
              &nbsp;|&nbsp;
              <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}" style="color: #22C55E;">WhatsApp</a>
            </td>
          </tr>
          ` : ''}
        </table>

        <div style="margin-top: 20px; padding: 20px; background: #f0f9ff; border-left: 4px solid #2563EB; border-radius: 4px;">
          <h3 style="margin: 0 0 10px; color: #1e40af; font-size: 14px;">Message:</h3>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${contact.message}</p>
        </div>

        <div style="margin-top: 25px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://podspace.vercel.app'}/admin/messages"
             style="background: #A3E635; color: #000; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
            View in Admin Panel
          </a>
          &nbsp;&nbsp;
          <a href="mailto:${contact.email}"
             style="background: #2563EB; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
            Reply via Email
          </a>
        </div>
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
      emoji: '✅',
      subject: 'Your Booking is Confirmed!',
      heading: 'Booking Confirmed!',
      message: 'Great news! Your booking has been confirmed. We look forward to seeing you at the studio!',
      color: '#22C55E',
    },
    CANCELLED: {
      emoji: '❌',
      subject: 'Booking Cancelled',
      heading: 'Booking Cancelled',
      message: 'Your booking has been cancelled. If you have any questions or would like to reschedule, please contact us.',
      color: '#EF4444',
    },
    COMPLETED: {
      emoji: '🎉',
      subject: 'Thank You for Your Session!',
      heading: 'Session Completed!',
      message: 'Thank you for choosing Podcast EcoSpace! We hope you had a great recording experience. We would love to have you back!',
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
    subject: `${status.emoji} ${status.subject} | Podcast EcoSpace`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: #111; padding: 30px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #A3E635; margin: 0; font-size: 24px;">Podcast EcoSpace</h1>
          </div>

          <h2 style="color: ${status.color}; margin: 20px 0; font-size: 22px; text-align: center;">${status.heading}</h2>

          <p style="color: #fff; font-size: 16px;">
            Dear ${booking.customerName},
          </p>

          <p style="color: #9CA3AF; font-size: 14px; line-height: 1.6;">
            ${status.message}
          </p>

          <div style="background: #1F2937; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <table style="width: 100%; color: #9CA3AF; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #374151;">Date:</td>
                <td style="color: #fff; text-align: right; padding: 10px 0; border-bottom: 1px solid #374151;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #374151;">Time:</td>
                <td style="color: #fff; text-align: right; padding: 10px 0; border-bottom: 1px solid #374151;">${booking.selectedTime}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">Service:</td>
                <td style="color: #fff; text-align: right; padding: 10px 0;">${booking.selectedService?.name || 'Standard'}</td>
              </tr>
            </table>
          </div>

          ${newStatus === 'CONFIRMED' ? `
          <div style="background: #1F2937; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #fff; font-size: 14px; margin: 0 0 10px;">Studio Location</h3>
            <p style="color: #9CA3AF; margin: 0; font-size: 14px;">
              Dubai World Trade Center<br>
              Sheikh Zayed Road, Dubai, UAE
            </p>
          </div>
          ` : ''}

          <div style="background: #A3E635; padding: 15px; border-radius: 12px; margin: 20px 0; text-align: center;">
            <p style="color: #000; margin: 0; font-size: 14px;">
              Questions? WhatsApp us at <strong>+971-502060674</strong>
            </p>
          </div>

          <p style="color: #6B7280; font-size: 12px; text-align: center; margin-top: 30px;">
            Booking Reference: #${booking.id.slice(-8).toUpperCase()}
          </p>
        </div>
      </div>
    `,
  };

  return await sendEmail(emailContent);
}

/**
 * Core email sending function using Nodemailer
 */
async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const transport = getTransporter();

  if (!transport) {
    console.log('[Email] Transporter not configured, skipping email');
    return false;
  }

  try {
    const result = await transport.sendMail({
      from: `"Podcast EcoSpace" <${emailConfig.fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    console.log('[Email] Sent successfully:', {
      to: options.to,
      subject: options.subject,
      messageId: result.messageId,
    });

    return true;
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    return false;
  }
}
