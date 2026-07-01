import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const auth = await requireAdmin();
  if ('error' in auth && auth.error) return auth.error;

  const supabase = createAdminClient();
  const { count } = await supabase.from('cms_content').select('*', { count: 'exact', head: true });
  const { count: submissionCount } = await supabase
    .from('form_submissions')
    .select('*', { count: 'exact', head: true });

  return NextResponse.json({
    contentEntries: count ?? 0,
    formSubmissions: submissionCount ?? 0,
  });
}
