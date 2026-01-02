// API Route: Strategic Partners CRUD
import { NextRequest, NextResponse } from 'next/server';
import { strategicPartnersService } from '@/lib/firebase-service';
import { getCurrentUser } from '@/lib/auth';
import { deleteFromR2, extractKeyFromUrl } from '@/lib/cloudflare-r2';

// GET /api/data/strategic-partners - Get all strategic partners
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    const partners = await strategicPartnersService.getAll(activeOnly);
    return NextResponse.json({ data: partners });
  } catch (error) {
    console.error('Get strategic partners error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/data/strategic-partners - Create strategic partner
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, logoUrl, index, isActive = true } = body;

    if (!name || !logoUrl || index === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, logoUrl, index' },
        { status: 400 }
      );
    }

    const id = await strategicPartnersService.create({
      name,
      logoUrl,
      index: Number(index),
      isActive,
    });

    if (!id) {
      return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create strategic partner error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/data/strategic-partners - Update strategic partner
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

    const success = await strategicPartnersService.update(id, updateData);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update strategic partner error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/data/strategic-partners - Delete strategic partner
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const logoUrl = searchParams.get('logoUrl');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Delete image from R2 if URL provided
    if (logoUrl) {
      const key = extractKeyFromUrl(logoUrl);
      if (key) {
        await deleteFromR2(key);
      }
    }

    const success = await strategicPartnersService.delete(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete strategic partner error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
