import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { defaultBranding } from '@/lib/cms/default-content';
import { saveUploadedFile } from '@/lib/storage/local';

const ASSET_COLUMNS: Record<string, string> = {
  logo: 'logo_url',
  footer_logo: 'footer_logo_url',
  favicon: 'favicon_url',
};

const MIGRATION_HINT =
  'Run supabase/migrations/20260630120000_branding_assets.sql in the Supabase SQL Editor to enable footer logo and favicon uploads.';

function isMissingColumnError(message: string, column: string) {
  return message.includes(column) || message.includes('schema cache');
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ('error' in auth && auth.error) return auth.error;

  try {
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

    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const fileName = `${assetType}-${Date.now()}.${ext}`;

    const { url } = await saveUploadedFile('branding', fileName, file);

    const supabase = createAdminClient();
    const { data: existing } = await supabase.from('site_branding').select('id').eq('id', 1).maybeSingle();

    let dbError;
    if (existing) {
      ({ error: dbError } = await supabase
        .from('site_branding')
        .update({ [column]: url })
        .eq('id', 1));
    } else {
      ({ error: dbError } = await supabase.from('site_branding').insert({
        id: 1,
        ...defaultBranding,
        [column]: url,
      }));
    }

    if (dbError) {
      if (isMissingColumnError(dbError.message, column)) {
        return NextResponse.json(
          {
            error: `Database is missing the "${column}" column. ${MIGRATION_HINT}`,
            migrationRequired: true,
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ url, type: assetType });
  } catch (err) {
    console.error('Logo upload error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
