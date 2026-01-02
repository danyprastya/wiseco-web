// API Route: Portfolio Logos CRUD
import { NextRequest, NextResponse } from 'next/server';
import { portfolioLogosService } from '@/lib/firebase-service';
import { getCurrentUser } from '@/lib/auth';
import { deleteFromR2, extractKeyFromUrl } from '@/lib/cloudflare-r2';

// GET /api/data/portfolio-logos - Get all portfolio logos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    console.log('Fetching portfolio logos, activeOnly:', activeOnly);
    const logos = await portfolioLogosService.getAll(activeOnly);
    console.log('Portfolio logos count:', logos.length);
    
    return NextResponse.json({ data: logos });
  } catch (error) {
    console.error('Get portfolio logos error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/data/portfolio-logos - Create portfolio logo
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, imageUrl, index, isActive = true } = body;

    if (!name || !imageUrl || index === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, imageUrl, index' },
        { status: 400 }
      );
    }

    const id = await portfolioLogosService.create({
      name,
      imageUrl,
      index: Number(index),
      isActive,
    });

    if (!id) {
      return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create portfolio logo error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/data/portfolio-logos - Update portfolio logo
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

    const success = await portfolioLogosService.update(id, updateData);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update portfolio logo error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/data/portfolio-logos - Delete portfolio logo
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

    const success = await portfolioLogosService.delete(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete portfolio logo error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
