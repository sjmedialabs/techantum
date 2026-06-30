import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { defaultCmsEntries } from '@/lib/cms/default-content';

export async function GET() {
  const auth = await requireAdmin();
  if ('error' in auth && auth.error) return auth.error;

  const supabase = createAdminClient();
  const { data } = await supabase
    .from('cms_content')
    .select('entry_key, entry_group, label, content, updated_at')
    .order('entry_group')
    .order('entry_key');

  if (!data?.length) {
    return NextResponse.json(defaultCmsEntries);
  }

  return NextResponse.json(data);
}
