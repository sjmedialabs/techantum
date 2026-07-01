/** Ordered page groups for admin sidebar dropdowns. */
export const CMS_PAGE_GROUPS: { id: string; label: string }[] = [
  { id: 'homepage', label: 'Homepage' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'blog', label: 'Blog' },
];

export function getPageGroupLabel(groupId: string): string {
  return CMS_PAGE_GROUPS.find((g) => g.id === groupId)?.label ?? groupId;
}
