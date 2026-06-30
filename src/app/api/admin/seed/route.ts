import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { seedCmsDatabase } from '@/lib/cms';

export async function POST() {
  const auth = await requireAdmin();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const result = await seedCmsDatabase();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
