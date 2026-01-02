// API Route: File Upload to Cloudflare R2
import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2, deleteFromR2, generateUniqueKey, extractKeyFromUrl } from '@/lib/cloudflare-r2';
import { getCurrentUser } from '@/lib/auth';
import { R2_FOLDERS } from '@/lib/db-types';

// Valid folders for uploads
const VALID_FOLDERS = Object.values(R2_FOLDERS);

// POST /api/upload - Upload file to R2
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;
    const oldUrl = formData.get('oldUrl') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!folder || !VALID_FOLDERS.includes(folder as typeof VALID_FOLDERS[number])) {
      return NextResponse.json(
        { error: 'Invalid folder. Valid folders: ' + VALID_FOLDERS.join(', ') },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: jpeg, png, gif, webp, avif' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // Delete old image if provided (for updates)
    if (oldUrl) {
      const oldKey = extractKeyFromUrl(oldUrl);
      if (oldKey) {
        await deleteFromR2(oldKey);
      }
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique key and upload
    const key = generateUniqueKey(file.name, folder);
    const result = await uploadToR2(buffer, key, file.type);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Upload failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      key: result.key,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/upload - Delete file from R2
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    const key = extractKeyFromUrl(url);
    if (!key) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const result = await deleteFromR2(key);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Delete failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
