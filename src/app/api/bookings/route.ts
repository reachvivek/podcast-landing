import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/bookings - Get all bookings (with filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      where.selectedDate = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      selectedDate,
      selectedTime,
      sessionDuration,
      peopleCount,
      selectedSetup,
      selectedService,
      additionalServices,
      basePrice,
      addonsTotal,
      totalPrice,
      specialRequests,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !selectedDate || !selectedTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for conflicting bookings
    const bookingDate = new Date(selectedDate);
    const existingBooking = await prisma.booking.findFirst({
      where: {
        selectedDate: bookingDate,
        selectedTime: selectedTime,
        status: {
          in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'],
        },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { success: false, error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        selectedDate: bookingDate,
        selectedTime,
        sessionDuration: sessionDuration || 2,
        peopleCount: peopleCount || 1,
        selectedSetup: selectedSetup || 'standard',
        selectedService: selectedService || {},
        additionalServices: additionalServices || [],
        basePrice: basePrice || 0,
        addonsTotal: addonsTotal || 0,
        totalPrice: totalPrice || 0,
        specialRequests,
        status: 'PENDING',
        paymentStatus: 'UNPAID',
      },
    });

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
