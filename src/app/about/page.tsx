import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import AboutHero from './components/AboutHero';
import MissionSection from './components/MissionSection';
import TimelineSection from './components/TimelineSection';
import ValuesSection from './components/ValuesSection';
import PartnerCountriesGrid from './components/PartnerCountriesGrid';
import CertificationsSection from './components/CertificationsSection';

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-20">
        <AboutHero />
        <MissionSection />
        <TimelineSection />
        <ValuesSection />
        <PartnerCountriesGrid />
        <CertificationsSection />
      </main>
      <SiteFooter />
    </>
  );
}
