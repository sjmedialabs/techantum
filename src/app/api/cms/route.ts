import { NextResponse } from 'next/server';
import { getCmsSnapshot } from '@/lib/cms';

export async function GET() {
  const snapshot = await getCmsSnapshot();
  return NextResponse.json(snapshot, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
