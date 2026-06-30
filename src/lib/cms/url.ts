export function resolveSiteUrl(raw?: string | null): string {
  const fallback = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4028';
  const value = raw?.trim() || fallback;

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `https://${value}`;
}

export function getMetadataBase(raw?: string | null): URL {
  try {
    return new URL(resolveSiteUrl(raw));
  } catch {
    return new URL('http://localhost:4028');
  }
}
