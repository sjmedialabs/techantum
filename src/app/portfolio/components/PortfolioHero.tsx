import PageHeroSection from '@/components/common/PageHeroSection';

interface PortfolioHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PortfolioHero({ eyebrow, title, description }: PortfolioHeroProps) {
  return (
    <PageHeroSection
      eyebrow={eyebrow}
      title={title}
      description={description}
      variant="portfolio"
    />
  );
}
