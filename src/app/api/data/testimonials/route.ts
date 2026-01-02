// API Route: Testimonials CRUD
import { NextRequest, NextResponse } from 'next/server';
import { testimonialsService } from '@/lib/firebase-service';
import { getCurrentUser } from '@/lib/auth';
import { deleteFromR2, extractKeyFromUrl } from '@/lib/cloudflare-r2';

// GET /api/data/testimonials - Get all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    const testimonials = await testimonialsService.getAll(activeOnly);
    return NextResponse.json({ data: testimonials });
  } catch (error) {
    console.error('Get testimonials error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/data/testimonials - Create testimonial
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      index,
      ownerName,
      ownerImageUrl,
      companyLogoUrl,
      backgroundImageUrl,
      activityImageUrl,
      testimonialText,
      boldPhrases = [],
      isActive = true,
      position = "",
    } = body;

    // Validate required fields
    const requiredFields = [
      'index', 'ownerName', 'position', 'ownerImageUrl',
      'companyLogoUrl', 'backgroundImageUrl', 'activityImageUrl', 'testimonialText'
    ];
    
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === '') {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const id = await testimonialsService.create({
      index: Number(index),
      ownerName,
      position,
      ownerImageUrl,
      companyLogoUrl,
      backgroundImageUrl,
      activityImageUrl,
      testimonialText,
      boldPhrases,
      isActive,
    });

    if (!id) {
      return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/data/testimonials - Update testimonial
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

    // Convert numeric fields
    if (updateData.index !== undefined) {
      updateData.index = Number(updateData.index);
    }

    const success = await testimonialsService.update(id, updateData);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/data/testimonials - Delete testimonial with all images
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const imageUrlsParam = searchParams.get('imageUrls');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Try to get image URLs from query params first
    let imagesToDelete: string[] = [];
    
    if (imageUrlsParam) {
      try {
        imagesToDelete = JSON.parse(imageUrlsParam);
      } catch {
        // Ignore parse errors
      }
    }
    
    // If no URLs provided, get testimonial to collect all images
    if (imagesToDelete.length === 0) {
      const testimonial = await testimonialsService.getById(id);
      if (testimonial) {
        imagesToDelete = [
          testimonial.ownerImageUrl,
          testimonial.companyLogoUrl,
          testimonial.backgroundImageUrl,
          testimonial.activityImageUrl,
        ].filter(Boolean);
      }
    }

    // Delete all images from R2
    for (const url of imagesToDelete) {
      const key = extractKeyFromUrl(url);
      if (key) {
        await deleteFromR2(key);
      }
    }

    const success = await testimonialsService.delete(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
