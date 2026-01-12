/**
 * @deprecated This Vercel Blob client is no longer used.
 * The application now uses the Rails API backend with Active Storage.
 * See lib/api/properties.ts for the uploadPropertyImage function.
 */

// This file is kept for reference but is not used in the application.
// Image uploads are now handled through the Rails API with Active Storage.

export async function uploadPropertyImage(file: File, propertyId: string): Promise<string> {
  console.warn(
    'Warning: Vercel Blob client is deprecated. ' +
    'Image uploads are now handled through the Rails API with Active Storage. ' +
    'See lib/api/properties.ts for the uploadPropertyImage function.'
  );
  throw new Error('This function is deprecated. Use lib/api/properties.ts instead.');
}

export async function deletePropertyImage(blobUrl: string): Promise<void> {
  console.warn(
    'Warning: Vercel Blob client is deprecated. ' +
    'Image deletion is now handled through the Rails API. ' +
    'See lib/api/properties.ts for the deletePropertyImage function.'
  );
  throw new Error('This function is deprecated. Use lib/api/properties.ts instead.');
}

export async function listPropertyImages(propertyId: string) {
  console.warn(
    'Warning: Vercel Blob client is deprecated. ' +
    'Property images are now fetched through the Rails API. ' +
    'See lib/api/properties.ts for the getProperty function.'
  );
  throw new Error('This function is deprecated. Use lib/api/properties.ts instead.');
}
