export interface ServiceOffering {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  iconClass: string;
  bgClass: string;
}

export interface ServiceSection {
  id: string;
  anchor: string;
  title: string;
  description: string;
  icon: string;
  iconClass: string;
  bgClass: string;
  offerings: ServiceOffering[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'cat_websites',
    name: 'Websites',
    description: '6 offerings',
    href: '/services#websites',
    icon: 'ComputerDesktopIcon',
    iconClass: 'text-primary',
    bgClass: 'bg-primary/10 group-hover:bg-primary/20',
  },
  {
    id: 'cat_webapps',
    name: 'Web Applications',
    description: '6 offerings',
    href: '/services#web-applications',
    icon: 'CodeBracketIcon',
    iconClass: 'text-secondary',
    bgClass: 'bg-secondary/10 group-hover:bg-secondary/20',
  },
  {
    id: 'cat_mobile',
    name: 'Mobile Applications',
    description: '6 offerings',
    href: '/services#mobile-applications',
    icon: 'DevicePhoneMobileIcon',
    iconClass: 'text-accent',
    bgClass: 'bg-accent/10 group-hover:bg-accent/20',
  },
];

export const websiteOfferings: ServiceOffering[] = [
  {
    id: 'web_corporate',
    name: 'Corporate Websites',
    description: 'Professional, brand-aligned websites that establish credibility and convert visitors into customers.',
    features: ['Responsive Design', 'Brand Identity', 'Multi-language', 'Analytics Setup'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    imageAlt: 'Modern corporate website displayed on laptop and mobile devices',
  },
  {
    id: 'web_landing',
    name: 'Landing Pages',
    description: 'High-converting landing pages optimized for campaigns, lead generation, and product launches.',
    features: ['A/B Testing Ready', 'Fast Load Times', 'Lead Capture Forms', 'SEO Optimized'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    imageAlt: 'Clean landing page design with call-to-action elements',
  },
  {
    id: 'web_ecommerce',
    name: 'E-commerce Stores',
    description: 'Full-featured online stores with secure payments, inventory management, and order tracking.',
    features: ['Payment Integration', 'Product Catalog', 'Cart & Checkout', 'Order Management'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    imageAlt: 'E-commerce website with product listings and shopping cart',
  },
  {
    id: 'web_portfolio',
    name: 'Portfolio & Brochure Sites',
    description: 'Showcase your work, services, or brand story with elegant, content-focused designs.',
    features: ['Gallery Layouts', 'CMS Integration', 'Contact Forms', 'Social Links'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    imageAlt: 'Developer workspace with code editor showing website project',
  },
  {
    id: 'web_cms',
    name: 'CMS-Powered Sites',
    description: 'Content-managed websites that let your team update pages, blogs, and media without code.',
    features: ['Easy Content Editing', 'Role-based Access', 'Media Library', 'Scheduled Publishing'],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
    imageAlt: 'Content management dashboard for website editing',
  },
  {
    id: 'web_seo',
    name: 'SEO & Performance',
    description: 'Technical SEO, Core Web Vitals optimization, and structured data to rank higher and load faster.',
    features: ['Technical SEO', 'Core Web Vitals', 'Schema Markup', 'Performance Audits'],
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9ef8eb70a',
    imageAlt: 'Analytics dashboard showing website traffic and performance metrics',
  },
];

export const webappOfferings: ServiceOffering[] = [
  {
    id: 'app_custom',
    name: 'Custom Web Applications',
    description: 'Tailor-made web apps designed around your unique workflows, users, and business logic.',
    features: ['Custom Workflows', 'User Roles', 'Real-time Data', 'Scalable Architecture'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    imageAlt: 'Developer coding a custom web application on multiple monitors',
  },
  {
    id: 'app_saas',
    name: 'SaaS Platforms',
    description: 'Multi-tenant software-as-a-service products with subscriptions, billing, and user management.',
    features: ['Multi-tenancy', 'Subscription Billing', 'User Onboarding', 'Usage Analytics'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    imageAlt: 'SaaS dashboard with charts and user management interface',
  },
  {
    id: 'app_dashboard',
    name: 'Admin Dashboards',
    description: 'Data-rich admin panels and internal tools for managing operations, users, and content.',
    features: ['Data Visualization', 'CRUD Operations', 'Export & Reports', 'Access Control'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
    imageAlt: 'Team collaborating around admin dashboard on large screen',
  },
  {
    id: 'app_api',
    name: 'API Development',
    description: 'Robust REST and GraphQL APIs that power your applications and integrate with third-party services.',
    features: ['REST & GraphQL', 'Authentication', 'Documentation', 'Rate Limiting'],
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
    imageAlt: 'API architecture diagram on developer screen',
  },
  {
    id: 'app_cloud',
    name: 'Cloud Integration',
    description: 'Deploy and scale on AWS, Google Cloud, or Azure with CI/CD pipelines and infrastructure as code.',
    features: ['Cloud Deployment', 'CI/CD Pipelines', 'Auto-scaling', 'Monitoring & Alerts'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    imageAlt: 'Cloud infrastructure visualization with connected nodes',
  },
  {
    id: 'app_legacy',
    name: 'Legacy Modernization',
    description: 'Migrate outdated systems to modern stacks without disrupting your business operations.',
    features: ['System Audit', 'Gradual Migration', 'Data Preservation', 'Zero Downtime'],
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
    imageAlt: 'Software modernization process with old and new system comparison',
  },
];

export const mobileOfferings: ServiceOffering[] = [
  {
    id: 'mobile_native',
    name: 'Native iOS & Android',
    description: 'Platform-native apps that deliver the best performance and user experience on each device.',
    features: ['Swift / Kotlin', 'Native UI', 'Device APIs', 'App Store Ready'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    imageAlt: 'Mobile phones displaying native iOS and Android applications',
  },
  {
    id: 'mobile_cross',
    name: 'Cross-Platform Apps',
    description: 'Build once, deploy everywhere with React Native or Flutter for faster time-to-market.',
    features: ['React Native', 'Flutter', 'Shared Codebase', 'Faster Delivery'],
    image: 'https://images.unsplash.com/photo-1555774698-0c77d0d5c11d',
    imageAlt: 'Cross-platform mobile app running on multiple device types',
  },
  {
    id: 'mobile_uiux',
    name: 'UI/UX Design',
    description: 'User-centered mobile designs with intuitive navigation, accessibility, and polished interactions.',
    features: ['Wireframing', 'Prototyping', 'User Testing', 'Design Systems'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c',
    imageAlt: 'Mobile UI/UX design mockups and wireframes on tablet',
  },
  {
    id: 'mobile_backend',
    name: 'Backend Integration',
    description: 'Connect your mobile app to APIs, databases, authentication, and real-time services.',
    features: ['REST / GraphQL', 'Push Notifications', 'Offline Sync', 'Secure Auth'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    imageAlt: 'Mobile app connected to backend server infrastructure',
  },
  {
    id: 'mobile_deploy',
    name: 'App Store Deployment',
    description: 'End-to-end publishing support for Apple App Store and Google Play Store.',
    features: ['Store Submission', 'Compliance Review', 'Release Management', 'Version Updates'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e939e113',
    imageAlt: 'App store listing pages for mobile application launch',
  },
  {
    id: 'mobile_maintenance',
    name: 'Maintenance & Support',
    description: 'Ongoing updates, bug fixes, OS compatibility, and performance monitoring for your app.',
    features: ['Bug Fixes', 'OS Updates', 'Performance Tuning', 'Feature Additions'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    imageAlt: 'Development team providing ongoing mobile app support',
  },
];

export const defaultServicesPageContent = {
  exploreTitle: 'Explore Our Services',
  categories: serviceCategories,
  sections: [
    {
      id: 'websites',
      anchor: 'websites',
      title: 'Websites',
      description:
        'Beautiful, fast, and search-engine-friendly websites built with modern frameworks like Next.js and React.',
      icon: 'ComputerDesktopIcon',
      iconClass: 'text-primary',
      bgClass: 'bg-primary/10',
      offerings: websiteOfferings,
    },
    {
      id: 'web-applications',
      anchor: 'web-applications',
      title: 'Web Applications',
      description:
        'Scalable, secure web applications and SaaS platforms engineered for performance and growth.',
      icon: 'CodeBracketIcon',
      iconClass: 'text-secondary',
      bgClass: 'bg-secondary/10',
      offerings: webappOfferings,
    },
    {
      id: 'mobile-applications',
      anchor: 'mobile-applications',
      title: 'Mobile Applications',
      description:
        'Native and cross-platform mobile apps with polished UX, from concept to App Store launch.',
      icon: 'DevicePhoneMobileIcon',
      iconClass: 'text-accent',
      bgClass: 'bg-accent/10',
      offerings: mobileOfferings,
    },
  ] satisfies ServiceSection[],
};
