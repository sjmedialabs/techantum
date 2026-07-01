import { fetchFaviconResponse } from '@/lib/cms/favicon';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return fetchFaviconResponse();
}
