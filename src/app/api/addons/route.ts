import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/addons - Get all add-on services
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const addons = await prisma.addOnService.findMany({
      where: includeInactive ? {} : { isActive: true },
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

// POST /api/addons - Create new add-on service
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const addon = await prisma.addOnService.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: parseFloat(body.price),
        icon: body.icon || 'Camera',
        isActive: body.isActive !== undefined ? body.isActive : true,
        sortOrder: body.sortOrder || 0,
      },
    });

    return NextResponse.json({
      success: true,
      data: addon,
    });
  } catch (error) {
    console.error('Error creating add-on:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create add-on' },
      { status: 500 }
    );
  }
}

// PATCH /api/addons - Update add-on service
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Add-on ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = parseFloat(data.price);
    if (data.icon !== undefined) updateData.icon = data.icon;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

    const addon = await prisma.addOnService.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: addon,
    });
  } catch (error) {
    console.error('Error updating add-on:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update add-on' },
      { status: 500 }
    );
  }
}

// DELETE /api/addons - Delete add-on service
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Add-on ID is required' },
        { status: 400 }
      );
    }

    await prisma.addOnService.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Add-on deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting add-on:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete add-on' },
      { status: 500 }
    );
  }
}
