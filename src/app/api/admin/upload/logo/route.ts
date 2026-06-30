import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';

const ASSET_COLUMNS: Record<string, string> = {
  logo: 'logo_url',
  footer_logo: 'footer_logo_url',
  favicon: 'favicon_url',
};

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ('error' in auth && auth.error) return auth.error;

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const assetType = (formData.get('type') as string) || 'logo';
  const column = ASSET_COLUMNS[assetType];

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!column) {
    return NextResponse.json({ error: 'Invalid asset type' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'png';
  const fileName = `${assetType}-${Date.now()}.${ext}`;
  const supabase = createAdminClient();

  const { error: uploadError } = await supabase.storage
    .from('site-assets')
    .upload(fileName, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage.from('site-assets').getPublicUrl(fileName);

  const { data: existing } = await supabase.from('site_branding').select('*').eq('id', 1).maybeSingle();

  await supabase.from('site_branding').upsert({
    id: 1,
    ...(existing || {}),
    [column]: publicUrl.publicUrl,
  });

  return NextResponse.json({ url: publicUrl.publicUrl, type: assetType });
}
