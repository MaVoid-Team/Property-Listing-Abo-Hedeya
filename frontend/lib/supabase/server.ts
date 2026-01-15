/**
 * @deprecated This Supabase server client is no longer used.
 * The application now uses the Rails API backend.
 * See lib/api/ for the new API client.
 */

// This file is kept for reference but is not used in the application.
// All data operations are now handled through the Rails API.

export async function createClient() {
  console.warn(
    'Warning: Supabase server client is deprecated. ' +
    'The application now uses the Rails API backend. ' +
    'See lib/api/ for the new API client.'
  );
  return null;
}
