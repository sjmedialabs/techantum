'use client';

import { useState } from 'react';
import TestimonialFilters from './components/TestimonialFilters';
import TestimonialGrid from './components/TestimonialGrid';
import type { TestimonialItem } from '@/lib/testimonials-data';

export default function TestimonialsPageClient({
  testimonials,
}: {
  testimonials: TestimonialItem[];
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

  return (
    <>
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
    </>
  );
}
