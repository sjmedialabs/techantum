import Link from 'next/link';
import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import PageHeroSection from '@/components/common/PageHeroSection';
import Icon from '@/components/ui/AppIcon';
import { getCmsContent } from '@/lib/cms';
import { mergeCmsContent } from '@/lib/cms/default-content';
import type { ServiceCategory, ServiceSection as ServiceSectionData } from '@/lib/services-data';
import ServiceSection from './components/ServiceSection';

export default async function ServicesPage() {
  const [heroContent, pageContent] = await Promise.all([
    getCmsContent('services.hero'),
    getCmsContent('services.page'),
  ]);

  const hero = mergeCmsContent('services.hero', heroContent);
  const page = mergeCmsContent('services.page', pageContent);
  const categories = (page.categories as ServiceCategory[]) ?? [];
  const sections = (page.sections as ServiceSectionData[]) ?? [];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-20">
        <PageHeroSection
          eyebrow={String(hero.eyebrow)}
          title={String(hero.title)}
          description={String(hero.description)}
        />

        <section className="py-12 bg-muted/50 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-bricolage text-3xl font-bold text-foreground mb-8 text-center reveal-fade">
              {String(page.exploreTitle || 'Explore Our Services')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal reveal-stagger">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary transition-all duration-300 hover-lift"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${category.bgClass}`}
                    >
                      <Icon
                        name={category.icon as any}
                        size={28}
                        className={category.iconClass}
                      />
                    </div>
                    <h3 className="font-bricolage text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {sections.map((section) => (
          <ServiceSection key={section.id} section={section} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
