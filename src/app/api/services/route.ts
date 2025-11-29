import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/services - Get all service packages
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const services = await prisma.servicePackage.findMany({
      where: includeInactive ? {} : { isActive: true },
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

// POST /api/services - Create new service package
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const service = await prisma.servicePackage.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: parseFloat(body.price),
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
        features: body.features || [],
        notIncluded: body.notIncluded || [],
        duration: parseInt(body.duration),
        maxPeople: body.maxPeople ? parseInt(body.maxPeople) : 5,
        isPopular: body.isPopular || false,
        isActive: body.isActive !== undefined ? body.isActive : true,
        sortOrder: body.sortOrder || 0,
        category: body.category,
      },
    });

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

// PATCH /api/services - Update service package
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = parseFloat(data.price);
    if (data.originalPrice !== undefined) updateData.originalPrice = data.originalPrice ? parseFloat(data.originalPrice) : null;
    if (data.features !== undefined) updateData.features = data.features;
    if (data.notIncluded !== undefined) updateData.notIncluded = data.notIncluded;
    if (data.duration !== undefined) updateData.duration = parseInt(data.duration);
    if (data.maxPeople !== undefined) updateData.maxPeople = parseInt(data.maxPeople);
    if (data.isPopular !== undefined) updateData.isPopular = data.isPopular;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;
    if (data.category !== undefined) updateData.category = data.category;

    const service = await prisma.servicePackage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE /api/services - Delete service package
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      );
    }

    await prisma.servicePackage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
