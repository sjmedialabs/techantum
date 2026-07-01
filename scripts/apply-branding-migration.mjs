/**
 * Adds footer_logo_url and favicon_url columns to site_branding.
 * Usage: node scripts/apply-branding-migration.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const text = readFileSync(envPath, 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (!m) continue;
      const key = m[1].trim();
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* optional */
  }
}

loadEnv();

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !secret) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env');
  process.exit(1);
}

const supabase = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Verify columns by attempting a harmless read
const { error: faviconColError } = await supabase
  .from('site_branding')
  .select('favicon_url')
  .limit(1);

if (!faviconColError) {
  console.log('Branding asset columns already exist (favicon_url, footer_logo_url).');
  process.exit(0);
}

console.log(`
The branding asset columns are not in your database yet.

Please run this SQL in Supabase Dashboard → SQL Editor:

----------------------------------------------------------------------
ALTER TABLE public.site_branding
ADD COLUMN IF NOT EXISTS footer_logo_url TEXT,
ADD COLUMN IF NOT EXISTS favicon_url TEXT;

UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'image/x-icon',
    'image/vnd.microsoft.icon',
    'video/mp4',
    'video/webm',
    'video/quicktime'
]
WHERE id = 'site-assets';

UPDATE storage.buckets
SET file_size_limit = 52428800
WHERE id = 'site-assets';
----------------------------------------------------------------------

Also run (for video/image CMS uploads):
File: supabase/migrations/20260630200000_cms_media_upload.sql

After running the SQL, re-upload your images in Admin → Branding.
`);

process.exit(1);
