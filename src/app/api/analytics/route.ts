import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = parseInt(searchParams.get('period') || '30');

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    // Fetch bookings within the period
    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Calculate overview statistics
    const overview = {
      totalBookings: await prisma.booking.count(),
      pendingBookings: await prisma.booking.count({
        where: { status: 'PENDING' },
      }),
      confirmedBookings: await prisma.booking.count({
        where: { status: 'CONFIRMED' },
      }),
      completedBookings: await prisma.booking.count({
        where: { status: 'COMPLETED' },
      }),
      cancelledBookings: await prisma.booking.count({
        where: { status: 'CANCELLED' },
      }),
      recentBookings: bookings.length,
      totalRevenue: bookings.reduce((sum: number, booking: any) => {
        if (booking.status === 'CANCELLED') return sum;
        return sum + booking.totalPrice;
      }, 0),
    };

    // Group bookings by date
    const bookingsByDate: { [key: string]: number } = {};
    bookings.forEach((booking) => {
      const date = booking.createdAt.toISOString().split('T')[0];
      bookingsByDate[date] = (bookingsByDate[date] || 0) + 1;
    });

    // Fill in missing dates with 0 bookings
    const bookingsByDateArray = [];
    for (let i = 0; i < period; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (period - 1 - i));
      const dateStr = date.toISOString().split('T')[0];
      bookingsByDateArray.push({
        date: dateStr,
        count: bookingsByDate[dateStr] || 0,
      });
    }

    // Get popular services from JSON field
    const serviceCount: { [key: string]: number } = {};
    bookings.forEach((booking) => {
      if (booking.selectedService && booking.status !== 'CANCELLED') {
        const service = booking.selectedService as { name?: string; price?: number };
        const serviceName = service.name || 'Unknown';
        serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1;
      }
    });

    const popularServices = Object.entries(serviceCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        overview,
        bookingsByDate: bookingsByDateArray,
        popularServices,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch analytics data',
      },
      { status: 500 }
    );
  }
}
