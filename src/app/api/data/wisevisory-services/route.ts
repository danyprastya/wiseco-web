// API Route: Wisevisory Services CRUD
import { NextRequest, NextResponse } from 'next/server';
import { wisevisoryServicesService } from '@/lib/firebase-service';
import { getCurrentUser } from '@/lib/auth';

// GET /api/data/wisevisory-services - Get all wisevisory services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    const services = await wisevisoryServicesService.getAll(activeOnly);
    return NextResponse.json({ data: services });
  } catch (error) {
    console.error('Get wisevisory services error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/data/wisevisory-services - Create wisevisory service
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, index, isActive = true } = body;

    if (!title || !description || index === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, index' },
        { status: 400 }
      );
    }

    const id = await wisevisoryServicesService.create({
      title,
      description,
      index: Number(index),
      isActive,
    });

    if (!id) {
      return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create wisevisory service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/data/wisevisory-services - Update wisevisory service
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    if (updateData.index !== undefined) {
      updateData.index = Number(updateData.index);
    }

    const success = await wisevisoryServicesService.update(id, updateData);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update wisevisory service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/data/wisevisory-services - Delete wisevisory service
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const success = await wisevisoryServicesService.delete(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete wisevisory service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
