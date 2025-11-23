import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { BookingStatus, PaymentStatus } from '@prisma/client';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/bookings/[id] - Get a single booking
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PATCH /api/bookings/[id] - Update a booking
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Handle status updates with timestamps
    const updateData: Record<string, unknown> = { ...body };

    if (body.status === BookingStatus.CONFIRMED && existingBooking.status !== BookingStatus.CONFIRMED) {
      updateData.confirmedAt = new Date();
    }

    if (body.status === BookingStatus.CANCELLED && existingBooking.status !== BookingStatus.CANCELLED) {
      updateData.cancelledAt = new Date();
    }

    if (body.status === BookingStatus.COMPLETED && existingBooking.status !== BookingStatus.COMPLETED) {
      updateData.completedAt = new Date();
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Delete a booking (soft delete by cancelling)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get('hard') === 'true';

    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (hardDelete) {
      // Permanent delete
      await prisma.booking.delete({
        where: { id },
      });

      return NextResponse.json({
        success: true,
        message: 'Booking deleted permanently',
      });
    } else {
      // Soft delete - just cancel
      const booking = await prisma.booking.update({
        where: { id },
        data: {
          status: BookingStatus.CANCELLED,
          cancelledAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        data: booking,
        message: 'Booking cancelled successfully',
      });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}
