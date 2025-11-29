import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST create category (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, icon, color, sortOrder } = body;

    const category = await prisma.blogCategory.create({
      data: {
        name,
        slug,
        description,
        icon,
        color,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
