// API Route: Media Reviews CRUD
import { NextRequest, NextResponse } from 'next/server';
import { mediaReviewsService } from '@/lib/firebase-service';
import { getCurrentUser } from '@/lib/auth';
import { deleteFromR2, extractKeyFromUrl } from '@/lib/cloudflare-r2';

// GET /api/data/media-reviews - Get all media reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    const reviews = await mediaReviewsService.getAll(activeOnly);
    return NextResponse.json({ data: reviews });
  } catch (error) {
    console.error('Get media reviews error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/data/media-reviews - Create media review
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

    const id = await mediaReviewsService.create({
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
    console.error('Create media review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/data/media-reviews - Update media review
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

    const success = await mediaReviewsService.update(id, updateData);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update media review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/data/media-reviews - Delete media review
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

    const success = await mediaReviewsService.delete(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete media review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
