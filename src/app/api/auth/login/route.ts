import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials, generateToken } from '@/lib/auth';
import { loginSchema, validateData } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateData(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.errors },
        { status: 400 }
      );
    }

    const { username, password } = validation.data;

    // Validate credentials against environment variables
    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@ecospace.ae',
      role: 'ADMIN',
    });

    // Create response with token in both body and cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
    });

    // Set HTTP-only cookie for security
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
