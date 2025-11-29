import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch audit trail for this booking
    const auditEntries = await prisma.bookingAudit.findMany({
      where: {
        bookingId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      audit: auditEntries,
    });
  } catch (error) {
    console.error('Error fetching audit log:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audit log' },
      { status: 500 }
    );
  }
}
