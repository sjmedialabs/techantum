import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import CompanyInfo from './components/CompanyInfo';

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-20">
        <ContactHero />
        <div className="py-16 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal reveal-stagger">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div className="lg:col-span-1">
                <CompanyInfo />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
