'use client';

import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import PageHeroSection from '@/components/common/PageHeroSection';
import ContactForm from './components/ContactForm';
import CompanyInfo from './components/CompanyInfo';
import type { SiteBranding } from '@/lib/cms/types';

interface ContactPageClientProps {
  hero: { eyebrow: string; title: string; description: string };
  page: Record<string, unknown>;
  branding: SiteBranding;
}

export default function ContactPageClient({ hero, page, branding }: ContactPageClientProps) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-20">
        <PageHeroSection
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
        />
        <div className="py-16 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal reveal-stagger">
              <div className="lg:col-span-2">
                <ContactForm page={page} />
              </div>
              <div className="lg:col-span-1">
                <CompanyInfo page={page} branding={branding} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
