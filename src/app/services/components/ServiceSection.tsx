import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { ServiceSection as ServiceSectionData } from '@/lib/services-data';

const ctaByAnchor: Record<string, { text: string; className: string }> = {
  websites: { text: 'Get a website quote', className: 'text-primary' },
  'web-applications': { text: 'Discuss your web app project', className: 'text-secondary' },
  'mobile-applications': { text: 'Start your mobile app project', className: 'text-accent' },
};

export default function ServiceSection({ section }: { section: ServiceSectionData }) {
  const cta = ctaByAnchor[section.anchor] ?? { text: 'Get in touch', className: 'text-primary' };

  return (
    <section id={section.anchor} className="py-16 reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.bgClass}`}
            >
              <Icon name={section.icon as any} size={24} className={section.iconClass} />
            </div>
            <h2 className="font-bricolage text-4xl md:text-5xl font-bold text-foreground">
              {section.title}
            </h2>
          </div>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl">{section.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal reveal-stagger">
          {section.offerings.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover-lift group"
            >
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={item.image}
                  alt={item.imageAlt}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bricolage text-xl font-semibold text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="font-inter text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <span
                      key={feature}
                      className="font-inter text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 font-inter text-base font-medium hover:underline ${cta.className}`}
          >
            {cta.text}
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
