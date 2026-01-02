// API Route: Wisevisory Gallery CRUD
import { NextRequest, NextResponse } from 'next/server';
import { wisevisoryGalleryService } from '@/lib/firebase-service';
import { getCurrentUser } from '@/lib/auth';
import { deleteFromR2, extractKeyFromUrl } from '@/lib/cloudflare-r2';

// GET /api/data/wisevisory-gallery - Get all wisevisory gallery items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    const items = await wisevisoryGalleryService.getAll(activeOnly);
    return NextResponse.json({ data: items });
  } catch (error) {
    console.error('Get wisevisory gallery error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/data/wisevisory-gallery - Create wisevisory gallery item
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { imageUrl, alt, index, isActive = true } = body;

    if (!imageUrl || !alt || index === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: imageUrl, alt, index' },
        { status: 400 }
      );
    }

    const id = await wisevisoryGalleryService.create({
      imageUrl,
      alt,
      index: Number(index),
      isActive,
    });

    if (!id) {
      return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create wisevisory gallery error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/data/wisevisory-gallery - Update wisevisory gallery item
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

    const success = await wisevisoryGalleryService.update(id, updateData);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update wisevisory gallery error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/data/wisevisory-gallery - Delete wisevisory gallery item
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const imageUrl = searchParams.get('imageUrl');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Delete image from R2 if URL provided
    if (imageUrl) {
      const key = extractKeyFromUrl(imageUrl);
      if (key) {
        await deleteFromR2(key);
      }
    }

    const success = await wisevisoryGalleryService.delete(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete wisevisory gallery error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
