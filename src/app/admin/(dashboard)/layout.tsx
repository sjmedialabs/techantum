import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!adminUser) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
