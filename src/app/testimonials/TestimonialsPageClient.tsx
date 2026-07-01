'use client';

import { useState } from 'react';
import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import PageHeroSection from '@/components/common/PageHeroSection';
import TestimonialFilters from './components/TestimonialFilters';
import TestimonialGrid from './components/TestimonialGrid';
import type { TestimonialItem } from '@/lib/testimonials-data';

interface TestimonialsPageClientProps {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  testimonials: TestimonialItem[];
}

export default function TestimonialsPageClient({ hero, testimonials }: TestimonialsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-20">
        <PageHeroSection
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
        />
        <TestimonialFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <TestimonialGrid
          testimonials={testimonials}
          selectedCategory={selectedCategory}
          selectedCountry={selectedCountry}
        />
      </main>
      <SiteFooter />
    </>
  );
}
