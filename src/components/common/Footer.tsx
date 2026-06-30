import Link from 'next/link';
 import Icon from '@/components/ui/AppIcon';
import { defaultBranding } from '@/lib/cms/default-content';
import type { SiteBranding } from '@/lib/cms/types';

export default function Footer({ branding = defaultBranding }: { branding?: SiteBranding }) {
  const serviceLinks = [
    { id: 'svc_websites', label: 'Websites', href: '/services#websites' },
    { id: 'svc_webapps', label: 'Web Applications', href: '/services#web-applications' },
    { id: 'svc_mobile', label: 'Mobile Applications', href: '/services#mobile-applications' },
  ]

  const companyLinks = [
    { id: 'comp_about', label: 'About Us', href: '/about' },
    { id: 'comp_portfolio', label: 'Portfolio', href: '/portfolio' },
    { id: 'comp_test', label: 'Testimonials', href: '/testimonials' },
    { id: 'comp_blog', label: 'Blog', href: '/blog' },
    { id: 'comp_contact', label: 'Contact', href: '/contact' },
  ]

  const legalLinks = [
    { id: 'legal_privacy', label: 'Privacy Policy', href: '/privacy-policy' },
    { id: 'legal_terms', label: 'Terms of Service', href: '/terms-of-service' },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-4">
            {branding.footer_logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={branding.footer_logo_url}
                alt={branding.company_name}
                className="h-10 w-auto max-w-[200px] object-contain mb-4"
              />
            ) : (
              <h3 className="font-bricolage font-bold text-xl text-foreground mb-4">
                {branding.company_name}
              </h3>
            )}
            <p className="font-inter text-sm text-muted-foreground mb-4">
              {branding.footer_description}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <Icon name="MapPinIcon" size={16} className="mt-0.5 shrink-0" />
                <span>{branding.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="PhoneIcon" size={16} className="shrink-0" />
                <a href={`tel:${branding.phone_href}`} className="hover:text-primary transition-colors">
                  {branding.phone}
                </a>
                <a
                  href={`https://wa.me/${branding.whatsapp_href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors ml-1"
                  title={`WhatsApp ${branding.whatsapp}`}
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={16} className="shrink-0" />
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="EnvelopeIcon" size={16} className="shrink-0" />
                <a href={`mailto:${branding.email}`} className="hover:text-primary transition-colors">
                  {branding.email}
                </a>
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bricolage font-semibold text-base text-foreground mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks?.map((link) => (
                <li key={link?.id}>
                  <Link
                    href={link?.href}
                    className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bricolage font-semibold text-base text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks?.map((link) => (
                <li key={link?.id}>
                  <Link
                    href={link?.href}
                    className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bricolage font-semibold text-base text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks?.map((link) => (
                <li key={link?.id}>
                  <Link
                    href={link?.href}
                    className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-sm text-muted-foreground">
            {branding.copyright_text}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              href="/terms-of-service"
              className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
