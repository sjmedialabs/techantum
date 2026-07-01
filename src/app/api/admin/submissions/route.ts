import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if ('error' in auth && auth.error) return auth.error;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const source = searchParams.get('source');

  const supabase = createAdminClient();
  let query = supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  if (source && source !== 'all') {
    query = query.eq('source', source);
  }

  const { data, error } = await query;

  if (error) {
    if (error.message.includes('source')) {
      const fallback = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      if (fallback.error) {
        return NextResponse.json({ error: fallback.error.message }, { status: 500 });
      }
      return NextResponse.json(
        (fallback.data ?? []).map((row) => ({ ...row, source: row.source || 'contact_page' }))
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
