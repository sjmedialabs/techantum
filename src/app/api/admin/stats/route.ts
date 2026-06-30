import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { count } = await supabase.from('cms_content').select('*', { count: 'exact', head: true });
  const { count: submissionCount } = await supabase
    .from('form_submissions')
    .select('*', { count: 'exact', head: true });

  return NextResponse.json({
    contentEntries: count ?? 0,
    formSubmissions: submissionCount ?? 0,
  });
}
