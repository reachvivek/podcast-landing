import { NextRequest, NextResponse } from 'next/server';
import { sendTestEmail } from '@/lib/email';

// POST /api/test-email - Send test email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required' },
        { status: 400 }
      );
    }

    const result = await sendTestEmail(email);

    if (result) {
      return NextResponse.json({
        success: true,
        message: `Test email sent successfully to ${email}`,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Check SMTP configuration.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}
