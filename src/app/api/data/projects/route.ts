// API Route: Projects CRUD
import { NextRequest, NextResponse } from 'next/server';
import { projectsService } from '@/lib/firebase-service';
import { getCurrentUser } from '@/lib/auth';
import { deleteFromR2, extractKeyFromUrl } from '@/lib/cloudflare-r2';

// GET /api/data/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    const projects = await projectsService.getAll(activeOnly);
    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/data/projects - Create project
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { index, layoutType, description, isActive = true, ...rest } = body;

    if (index === undefined || !layoutType || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: index, layoutType, description' },
        { status: 400 }
      );
    }

    const id = await projectsService.create({
      index: Number(index),
      layoutType,
      description,
      isActive,
      ...rest,
    });

    if (!id) {
      return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/data/projects - Update project
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

    const success = await projectsService.update(id, updateData);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/data/projects - Delete project with all images
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
    
    // If no URLs provided, get project to collect all images
    if (imagesToDelete.length === 0) {
      const project = await projectsService.getById(id);
      if (project) {
        if (project.titleImageUrl) imagesToDelete.push(project.titleImageUrl);
        if (project.clientLogoUrl) imagesToDelete.push(project.clientLogoUrl);
        // Main image is part of galleryImages array
        
        if (project.partnerLogos) {
          project.partnerLogos.forEach((logo: string | { imageUrl: string }) => {
            if (typeof logo === 'string') {
              imagesToDelete.push(logo);
            } else if (logo.imageUrl) {
              imagesToDelete.push(logo.imageUrl);
            }
          });
        }
        
        if (project.galleryImages) {
          project.galleryImages.forEach((img: string | { imageUrl: string }) => {
            if (typeof img === 'string') {
              imagesToDelete.push(img);
            } else if (img.imageUrl) {
              imagesToDelete.push(img.imageUrl);
            }
          });
        }
      }
    }
    
    // Delete all images from R2
    for (const url of imagesToDelete) {
      const key = extractKeyFromUrl(url);
      if (key) {
        await deleteFromR2(key);
      }
    }

    const success = await projectsService.delete(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
