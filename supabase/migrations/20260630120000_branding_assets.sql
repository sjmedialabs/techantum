-- Footer logo and favicon for site branding

ALTER TABLE public.site_branding
ADD COLUMN IF NOT EXISTS footer_logo_url TEXT,
ADD COLUMN IF NOT EXISTS favicon_url TEXT;

-- Allow favicon mime types in site-assets bucket
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'image/x-icon',
    'image/vnd.microsoft.icon'
]
WHERE id = 'site-assets';
