import { fetchFaviconResponse } from '@/lib/cms/favicon';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  return fetchFaviconResponse();
}
