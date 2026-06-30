export type FieldType = 'text' | 'textarea' | 'richtext' | 'number' | 'url';

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
}

export interface ArrayFieldSchema {
  key: string;
  label: string;
  itemLabel?: string;
  fields: FieldSchema[];
}

export interface StringListSchema {
  key: string;
  label: string;
  itemLabel?: string;
}

export interface ContentSchema {
  fields?: FieldSchema[];
  arrays?: ArrayFieldSchema[];
  stringLists?: StringListSchema[];
  /** Complex entries use raw JSON editor */
  useJsonEditor?: boolean;
}

export const contentSchemas: Record<string, ContentSchema> = {
  'homepage.hero': {
    fields: [
      { key: 'badge', label: 'Badge', type: 'text' },
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'titleLine1', label: 'Title line 1', type: 'text' },
      { key: 'titleLine2', label: 'Title line 2', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
      { key: 'primaryCta', label: 'Primary button text', type: 'text' },
      { key: 'primaryCtaHref', label: 'Primary button link', type: 'text' },
      { key: 'secondaryCta', label: 'Secondary button text', type: 'text' },
      { key: 'secondaryCtaHref', label: 'Secondary button link', type: 'text' },
      { key: 'cardTitle', label: 'Card title', type: 'text' },
      { key: 'stat1Label', label: 'Stat 1 label', type: 'text' },
      { key: 'stat1Value', label: 'Stat 1 value', type: 'text' },
      { key: 'stat2Label', label: 'Stat 2 label', type: 'text' },
      { key: 'stat2Value', label: 'Stat 2 value', type: 'text' },
    ],
    arrays: [
      {
        key: 'features',
        label: 'Feature cards',
        itemLabel: 'Feature',
        fields: [
          { key: 'icon', label: 'Icon name (Heroicon)', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
    ],
  },
  'homepage.stats': {
    arrays: [
      {
        key: 'stats',
        label: 'Statistics',
        itemLabel: 'Stat',
        fields: [
          { key: 'id', label: 'ID', type: 'text' },
          { key: 'icon', label: 'Icon name', type: 'text' },
          { key: 'value', label: 'Value', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
    ],
  },
  'homepage.services': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
    arrays: [
      {
        key: 'services',
        label: 'Services',
        itemLabel: 'Service',
        fields: [
          { key: 'id', label: 'ID', type: 'text' },
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Image URL', type: 'url' },
          { key: 'imageAlt', label: 'Image alt text', type: 'text' },
          { key: 'href', label: 'Link', type: 'text' },
          { key: 'icon', label: 'Icon name', type: 'text' },
        ],
      },
    ],
  },
  'homepage.tech_stack': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
    arrays: [
      {
        key: 'technologies',
        label: 'Technologies',
        itemLabel: 'Technology',
        fields: [
          { key: 'id', label: 'ID', type: 'text' },
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'icon', label: 'Icon / emoji', type: 'text' },
        ],
      },
    ],
  },
  'homepage.testimonials': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
    arrays: [
      {
        key: 'testimonials',
        label: 'Testimonials',
        itemLabel: 'Testimonial',
        fields: [
          { key: 'id', label: 'ID', type: 'text' },
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'country', label: 'Country', type: 'text' },
          { key: 'company', label: 'Company', type: 'text' },
          { key: 'rating', label: 'Rating (1–5)', type: 'number' },
          { key: 'text', label: 'Quote', type: 'textarea' },
          { key: 'service', label: 'Service', type: 'text' },
        ],
      },
    ],
  },
  'homepage.faq': {
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
    arrays: [
      {
        key: 'faqs',
        label: 'FAQ items',
        itemLabel: 'FAQ',
        fields: [
          { key: 'question', label: 'Question', type: 'text' },
          { key: 'answer', label: 'Answer', type: 'richtext' },
        ],
      },
    ],
  },
  'homepage.cta': {
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
      { key: 'primaryCta', label: 'Button text', type: 'text' },
      { key: 'primaryCtaHref', label: 'Button link', type: 'text' },
      { key: 'phoneLabel', label: 'Phone label', type: 'text' },
    ],
    stringLists: [{ key: 'bullets', label: 'Bullet points', itemLabel: 'Bullet' }],
  },
  'services.hero': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
  },
  'about.hero': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
      { key: 'image', label: 'Image URL', type: 'url' },
      { key: 'imageAlt', label: 'Image alt text', type: 'text' },
    ],
  },
  'portfolio.hero': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
  },
  'portfolio.data': { useJsonEditor: true },
  'contact.hero': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
  },
  'blog.hero': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
  },
  'testimonials.hero': {
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'richtext' },
    ],
  },
};

export function getContentSchema(key: string): ContentSchema | undefined {
  return contentSchemas[key];
}
