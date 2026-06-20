'use client';
import { useState, useEffect } from 'react';
 import Link from 'next/link';
import { usePathname } from 'next/navigation';
 import Icon from '@/components/ui/AppIcon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'nav_home', label: 'Home', href: '/' },
    { id: 'nav_about', label: 'About Us', href: '/about' },
    { id: 'nav_services', label: 'Services', href: '/services' },
    { id: 'nav_portfolio', label: 'Portfolio', href: '/portfolio' },
    { id: 'nav_testimonials', label: 'Testimonials', href: '/testimonials' },
    { id: 'nav_blog', label: 'Blog', href: '/blog' },
    { id: 'nav_contact', label: 'Contact', href: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-glass-scrolled' : 'navbar-glass'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-lg shrink-0">
              <span className="font-bricolage font-bold text-base sm:text-lg text-primary-foreground">T</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bricolage font-bold text-sm sm:text-base text-foreground leading-tight truncate">
                TechAntum
              </span>
              <span className="font-inter text-[10px] sm:text-xs text-muted-foreground leading-tight hidden sm:block">
                Digital Solutions
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks?.map((link) => (
              <Link
                key={link?.id}
                href={link?.href}
                className={`font-inter text-sm font-medium transition-colors ${
                  pathname === link?.href
                    ? 'text-primary' :'text-foreground hover:text-primary'
                }`}
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col text-right">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+914040268570"
                  className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Icon name="PhoneIcon" size={16} />
                  +91 40 40268570
                </a>
                <a
                  href="https://wa.me/917032923474"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  title="WhatsApp +91 70329 23474"
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={16} />
                </a>
              </div>
              <a
                href="mailto:info@techantum.com"
                className="font-inter text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                info@techantum.com
              </a>
            </div>
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-inter font-medium text-sm hover:bg-primary/90 transition-colors btn-shine"
            >
              Get a Quote
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-foreground"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 sm:py-6 border-t border-white/40 bg-white/90 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="flex flex-col gap-1 sm:gap-2">
              {navLinks?.map((link) => (
                <Link
                  key={link?.id}
                  href={link?.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-inter text-base font-medium py-2 transition-colors ${
                    pathname === link?.href
                      ? 'text-primary' :'text-foreground hover:text-primary'
                  }`}
                >
                  {link?.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+914040268570"
                    className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Icon name="PhoneIcon" size={16} />
                    +91 40 40268570
                  </a>
                  <a
                    href="https://wa.me/917032923474"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                    title="WhatsApp +91 70329 23474"
                  >
                    <Icon name="ChatBubbleLeftRightIcon" size={16} />
                  </a>
                </div>
                <a
                  href="mailto:info@techantum.com"
                  className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors block"
                >
                  info@techantum.com
                </a>
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-inter font-medium text-sm hover:bg-primary/90 transition-colors inline-block mt-2"
                >
                  Get a Quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
