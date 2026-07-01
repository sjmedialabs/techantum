import { fetchFaviconResponse } from '@/lib/cms/favicon';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  return fetchFaviconResponse();
}
