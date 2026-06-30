'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getDefaultContent } from '@/lib/cms/default-content';
import CmsRichText from '@/components/cms/CmsRichText';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({ content }: { content?: Record<string, unknown> }) {
  const data = { ...getDefaultContent('homepage.faq'), ...content };
  const faqs = (data.faqs as FAQItem[]) || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50 reveal">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{String(data.title)}</h2>
          <CmsRichText html={String(data.description)} as="p" className="text-lg text-muted-foreground max-w-2xl mx-auto" />
        </div>

        <div className="space-y-4 reveal reveal-stagger">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-inter font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-primary shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <CmsRichText html={faq.answer} as="p" className="font-inter text-muted-foreground leading-relaxed" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
