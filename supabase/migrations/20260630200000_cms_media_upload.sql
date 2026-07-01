-- Allow video uploads and larger files for CMS media

UPDATE storage.buckets
SET
    file_size_limit = 52428800,
    allowed_mime_types = ARRAY[
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
