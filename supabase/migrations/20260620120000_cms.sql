-- CMS: branding, SEO, and page content

CREATE TABLE IF NOT EXISTS public.site_branding (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    company_name TEXT NOT NULL DEFAULT 'TechAntum',
    tagline TEXT DEFAULT 'Digital Solutions',
    logo_url TEXT,
    logo_letter TEXT DEFAULT 'T',
    phone TEXT,
    phone_href TEXT,
    whatsapp TEXT,
    whatsapp_href TEXT,
    email TEXT,
    address TEXT,
    footer_description TEXT,
    copyright_text TEXT DEFAULT '© 2026 TechAntum. All rights reserved.',
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.site_seo (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    site_title TEXT,
    title_template TEXT DEFAULT '%s | TechAntum',
    description TEXT,
    keywords TEXT[] DEFAULT '{}',
    site_url TEXT,
    og_image_url TEXT,
    twitter_handle TEXT DEFAULT '@techantum',
    google_verification TEXT,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.cms_content (
    entry_key TEXT PRIMARY KEY,
    entry_group TEXT NOT NULL,
    label TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cms_content_group ON public.cms_content(entry_group);

-- updated_at triggers
CREATE OR REPLACE FUNCTION public.update_cms_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS site_branding_updated_at ON public.site_branding;
CREATE TRIGGER site_branding_updated_at
BEFORE UPDATE ON public.site_branding
FOR EACH ROW EXECUTE FUNCTION public.update_cms_timestamp();

DROP TRIGGER IF EXISTS site_seo_updated_at ON public.site_seo;
CREATE TRIGGER site_seo_updated_at
BEFORE UPDATE ON public.site_seo
FOR EACH ROW EXECUTE FUNCTION public.update_cms_timestamp();

DROP TRIGGER IF EXISTS cms_content_updated_at ON public.cms_content;
CREATE TRIGGER cms_content_updated_at
BEFORE UPDATE ON public.cms_content
FOR EACH ROW EXECUTE FUNCTION public.update_cms_timestamp();

-- RLS
ALTER TABLE public.site_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_branding" ON public.site_branding;
CREATE POLICY "public_read_site_branding"
ON public.site_branding FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "public_read_site_seo" ON public.site_seo;
CREATE POLICY "public_read_site_seo"
ON public.site_seo FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "public_read_cms_content" ON public.cms_content;
CREATE POLICY "public_read_cms_content"
ON public.cms_content FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "admin_manage_site_branding" ON public.site_branding;
CREATE POLICY "admin_manage_site_branding"
ON public.site_branding FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_manage_site_seo" ON public.site_seo;
CREATE POLICY "admin_manage_site_seo"
ON public.site_seo FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_manage_cms_content" ON public.cms_content;
CREATE POLICY "admin_manage_cms_content"
ON public.cms_content FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_read_admin_users" ON public.admin_users;
CREATE POLICY "admin_read_admin_users"
ON public.admin_users FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Storage bucket for logo and assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'site-assets',
    'site-assets',
    true,
    5242880,
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_site_assets" ON storage.objects;
CREATE POLICY "public_read_site_assets"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'site-assets');

DROP POLICY IF EXISTS "admin_upload_site_assets" ON storage.objects;
CREATE POLICY "admin_upload_site_assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'site-assets'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "admin_update_site_assets" ON storage.objects;
CREATE POLICY "admin_update_site_assets"
ON storage.objects FOR UPDATE TO authenticated
USING (
    bucket_id = 'site-assets'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "admin_delete_site_assets" ON storage.objects;
CREATE POLICY "admin_delete_site_assets"
ON storage.objects FOR DELETE TO authenticated
USING (
    bucket_id = 'site-assets'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
