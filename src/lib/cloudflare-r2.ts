// Cloudflare R2 configuration using AWS S3 SDK (S3-compatible API)
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 Client for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'wiseco-images';
const PUBLIC_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL || '';

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

/**
 * Upload a file to Cloudflare R2
 * @param file - The file buffer to upload
 * @param key - The key (path) for the file in the bucket
 * @param contentType - The MIME type of the file
 * @returns Upload result with public URL
 */
export async function uploadToR2(
  file: Buffer,
  key: string,
  contentType: string
): Promise<UploadResult> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
    });

    await s3Client.send(command);

    // Return the public URL
    const url = `${PUBLIC_URL}/${key}`;
    
    return {
      success: true,
      url,
      key,
    };
  } catch (error) {
    console.error('Error uploading to R2:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete a file from Cloudflare R2
 * @param key - The key (path) of the file to delete
 * @returns Delete result
 */
export async function deleteFromR2(key: string): Promise<{ success: boolean; error?: string }> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting from R2:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get a file from Cloudflare R2
 * @param key - The key (path) of the file to get
 * @returns The file as a buffer
 */
export async function getFromR2(key: string): Promise<Buffer | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);
    
    if (response.Body) {
      const chunks: Uint8Array[] = [];
      // @ts-expect-error - Body is a readable stream
      for await (const chunk of response.Body) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    }
    
    return null;
  } catch (error) {
    console.error('Error getting from R2:', error);
    return null;
  }
}

/**
 * Extract the key from a full R2 URL
 * @param url - The full public URL of the file
 * @returns The key (path) of the file
 */
export function extractKeyFromUrl(url: string): string | null {
  if (!url || !PUBLIC_URL) return null;
  
  if (url.startsWith(PUBLIC_URL)) {
    return url.replace(`${PUBLIC_URL}/`, '');
  }
  
  return null;
}

/**
 * Generate a unique filename with timestamp
 * @param originalName - The original filename
 * @param folder - The folder to place the file in
 * @returns A unique key for the file
 */
export function generateUniqueKey(originalName: string, folder: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop() || 'png';
  const safeName = originalName
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[^a-zA-Z0-9]/g, '-') // Replace special chars with dash
    .substring(0, 50); // Limit length
  
  return `${folder}/${safeName}-${timestamp}-${randomString}.${extension}`;
}

export { s3Client, BUCKET_NAME, PUBLIC_URL };
