import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import HeroVideoBackground from '@/components/common/HeroVideoBackground';
import CmsRichText from '@/components/cms/CmsRichText';
import { getDefaultContent } from '@/lib/cms/default-content';

interface HeroFeature {
  icon: string;
  title: string;
  description: string;
}

export default function HeroSection({ content }: { content?: Record<string, unknown> }) {
  const data = { ...getDefaultContent('homepage.hero'), ...content };
  const features = (data.features as HeroFeature[]) || [];

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20 pb-28 md:pb-20">
      <HeroVideoBackground />

      <div className="hidden sm:block absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none animate-float" />
      <div className="hidden sm:block absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none animate-float-delayed" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="inline-flex items-center gap-2 glass-effect px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6 animate-hero-in animate-hero-in-delay-1">
          <span className="w-2 h-2 rounded-full bg-accent pulse-glow shrink-0" />
          <span className="font-inter text-xs font-medium text-foreground">{String(data.badge)}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 animate-hero-in animate-hero-in-delay-1">
              <span className="h-px w-8 sm:w-12 bg-primary shrink-0" />
              <span className="font-inter text-xs sm:text-sm uppercase tracking-wider text-primary font-medium">
                {String(data.eyebrow)}
              </span>
            </div>

            <h1 className="font-bricolage font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.15] mb-4 sm:mb-6 hero-headline animate-hero-in animate-hero-in-delay-2">
              {String(data.titleLine1)}
              <br />
              <span className="gradient-text">{String(data.titleLine2)}</span>
            </h1>

            <CmsRichText
              html={String(data.description)}
              as="p"
              className="font-inter text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl hero-subtext animate-hero-in animate-hero-in-delay-3"
            />

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-hero-in animate-hero-in-delay-4">
              <Link
                href={String(data.primaryCtaHref)}
                className="w-full sm:w-auto text-center bg-primary text-primary-foreground px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-inter font-semibold text-sm sm:text-base hover:bg-primary/90 transition-all hover-lift btn-shine inline-flex items-center justify-center gap-2"
              >
                {String(data.primaryCta)}
                <Icon name="ArrowRightIcon" size={20} />
              </Link>
              <Link
                href={String(data.secondaryCtaHref)}
                className="w-full sm:w-auto text-center bg-card/90 backdrop-blur text-foreground border border-border px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-inter font-semibold text-sm sm:text-base hover:bg-muted transition-all hover-lift"
              >
                {String(data.secondaryCta)}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 animate-hero-in animate-hero-in-delay-5">
            <div className="glass-effect p-5 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <div className="relative z-10">
                <h3 className="font-bricolage font-semibold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                  {String(data.cardTitle)}
                </h3>
                <div className="space-y-4 mb-6">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon name={feature.icon as any} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-inter font-semibold text-sm text-foreground mb-1">{feature.title}</h4>
                        <p className="font-inter text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div>
                    <p className="font-inter text-xs text-muted-foreground mb-1">{String(data.stat1Label)}</p>
                    <p className="font-bricolage text-xl sm:text-2xl font-bold text-foreground">{String(data.stat1Value)}</p>
                  </div>
                  <div>
                    <p className="font-inter text-xs text-muted-foreground mb-1">{String(data.stat2Label)}</p>
                    <p className="font-bricolage text-xl sm:text-2xl font-bold text-foreground">{String(data.stat2Value)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce z-10">
        <span className="font-inter text-xs uppercase tracking-wider text-muted-foreground">Scroll</span>
        <Icon name="ChevronDownIcon" size={20} className="text-muted-foreground" />
      </div>
    </section>
  );
}
