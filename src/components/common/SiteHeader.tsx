import { getBranding } from '@/lib/cms';
import Header from './Header';

export default async function SiteHeader() {
  const branding = await getBranding();
  return <Header branding={branding} />;
}
