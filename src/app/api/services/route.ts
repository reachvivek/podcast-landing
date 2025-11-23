import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/services - Get all service packages
export async function GET() {
  try {
    const services = await prisma.servicePackage.findMany({
      where: { isActive: true },
      orderBy: [
        { isPopular: 'desc' },
        { sortOrder: 'asc' },
        { price: 'asc' },
      ],
    });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
