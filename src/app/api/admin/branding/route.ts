import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { defaultBranding } from '@/lib/cms/default-content';

export async function GET() {
  const auth = await requireAdmin();
  if ('error' in auth && auth.error) return auth.error;

  const supabase = createAdminClient();
  const { data } = await supabase.from('site_branding').select('*').eq('id', 1).maybeSingle();
  return NextResponse.json(data || defaultBranding);
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if ('error' in auth && auth.error) return auth.error;

  const body = await request.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('site_branding')
    .upsert({ id: 1, ...body })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
