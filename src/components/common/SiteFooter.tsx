import { getBranding } from '@/lib/cms';
import Footer from './Footer';

export default async function SiteFooter() {
  const branding = await getBranding();
  return <Footer branding={branding} />;
}
