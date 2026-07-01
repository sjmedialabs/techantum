import { getBranding, getCmsContent } from '@/lib/cms';
import { mergeCmsContent } from '@/lib/cms/default-content';
import type { SiteBranding } from '@/lib/cms/types';
import ContactPageClient from './ContactPageClient';

export default async function ContactPage() {
  const [heroContent, pageContent, branding] = await Promise.all([
    getCmsContent('contact.hero'),
    getCmsContent('contact.page'),
    getBranding(),
  ]);

  const hero = mergeCmsContent('contact.hero', heroContent);
  const page = mergeCmsContent('contact.page', pageContent);

  return (
    <ContactPageClient
      hero={{
        eyebrow: String(hero.eyebrow),
        title: String(hero.title),
        description: String(hero.description),
      }}
      page={page}
      branding={branding as SiteBranding}
    />
  );
}
