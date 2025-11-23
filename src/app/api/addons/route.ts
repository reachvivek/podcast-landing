import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/addons - Get all add-on services
export async function GET() {
  try {
    const addons = await prisma.addOnService.findMany({
      where: { isActive: true },
      orderBy: [
        { sortOrder: 'asc' },
        { price: 'asc' },
      ],
    });

    return NextResponse.json({
      success: true,
      data: addons,
    });
  } catch (error) {
    console.error('Error fetching add-ons:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch add-ons' },
      { status: 500 }
    );
  }
}
