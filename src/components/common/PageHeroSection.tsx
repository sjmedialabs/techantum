import CmsRichText from '@/components/cms/CmsRichText';

interface PageHeroSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  variant?: 'default' | 'portfolio';
}

export default function PageHeroSection({
  eyebrow,
  title,
  description,
  variant = 'default',
}: PageHeroSectionProps) {
  const sectionClass =
    variant === 'portfolio'
      ? 'bg-gradient-to-b from-primary/5 via-background to-background grid-bg page-hero reveal'
      : 'bg-gradient-to-b from-muted to-background page-hero reveal';

  return (
    <section className={sectionClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <span className="font-inter text-xs sm:text-sm uppercase tracking-wider text-primary font-medium mb-3 sm:mb-4 block">
          {eyebrow}
        </span>
        <h1 className="font-bricolage text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
          {title}
        </h1>
        {description && (
          <CmsRichText
            html={description}
            className="font-inter text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2"
          />
        )}
      </div>
    </section>
  );
}
