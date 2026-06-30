import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import PortfolioHero from './components/PortfolioHero';
import IndustriesSection from './components/IndustriesSection';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import IndustryProjectsSection from './components/IndustryProjectsSection';
import PortfolioCTA from './components/PortfolioCTA';

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-20">
        <PortfolioHero />
        <IndustriesSection />
        <FeaturedProjectsSection />
        <IndustryProjectsSection />
        <PortfolioCTA />
      </main>
      <SiteFooter />
    </>
  );
}
