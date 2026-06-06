import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Find trusted businesses and services',
      description: 'Search business listings, compare providers, and connect with local services through a clean directory experience.',
      openGraphTitle: 'Find trusted businesses and services',
      openGraphDescription: 'Browse service providers, local businesses, locations, and verified listing details in one directory.',
      keywords: ['business directory', 'business listings', 'local services', 'service providers'],
    },
    hero: {
      badge: 'Business directory',
      title: ['Hire trusted local providers', 'and get work done.'],
      description: 'Discover nearby businesses, compare service details, and contact reliable providers for cleaning, repairs, wellness, food, transport, and more.',
      primaryCta: { label: 'Find a provider', href: '/listing' },
      secondaryCta: { label: 'Add a listing', href: '/create' },
      searchPlaceholder: 'Search services, categories, city, or business name',
      focusLabel: 'Directory focus',
      featureCardBadge: 'verified providers',
      featureCardTitle: 'A cleaner way to discover businesses that are ready to help.',
      featureCardDescription: 'Listings keep category, location, service details, and contact actions easy to scan.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for comparing local businesses without the clutter.',
      paragraphs: [
        'The directory keeps service categories, provider names, locations, and short descriptions in one steady browsing flow.',
        'Visitors can start with a keyword, category, or location and quickly narrow the field to businesses that match their needs.',
        'Each listing is designed around action: compare, read details, contact the provider, and move forward confidently.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Directory-first homepage with strong search and category cues.',
        'Provider cards that show service type, location, and quick actions.',
        'Compact page widths so listings are easy to scan on every screen.',
        'Business-focused copy across auth, contact, archive, and detail pages.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Ready to make your business easier to find?',
      description: 'Create a listing, share your service details, and give visitors a direct path to contact your team.',
      primaryCta: { label: 'Add Listing', href: '/create' },
      secondaryCta: { label: 'Contact Support', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A focused directory for useful local business discovery.',
    description: `${slot4BrandConfig.siteName} helps visitors find service providers, compare business details, and connect with the right team faster.`,
    paragraphs: [
      'We organize listings around the things people actually check first: category, location, credibility, service summary, and clear contact paths.',
      'For business owners, the goal is simple visibility. For visitors, the goal is faster comparison without noisy layouts or vague listing pages.',
      'Every page has been shaped to keep the experience calm, compact, and practical for a business listing website.',
    ],
    values: [
      {
        title: 'Search that feels direct',
        description: 'Visitors can move from keyword to category to provider without fighting a stretched or overbuilt layout.',
      },
      {
        title: 'Listings with context',
        description: 'Business cards and detail pages surface descriptions, locations, contact options, and useful trust cues.',
      },
      {
        title: 'Built for providers',
        description: 'The create flow is designed for adding business information clearly, then keeping the listing readable for customers.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help with a business listing?',
    description: 'Send listing updates, verification questions, category requests, or partnership notes. We will help route the request to the right place.',
    formTitle: 'Send a directory request',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Search businesses, services, and locations faster.',
      description: 'Use a keyword, category, location, or provider name to browse the active directory.',
      placeholder: 'Search plumbers, cleaners, cafes, salons, transport...',
    },
    resultsTitle: 'Latest business directory results',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to add or manage listings.',
      description: 'Use your account to open the business listing workspace and prepare provider details for the directory.',
    },
    hero: {
      badge: 'Listing workspace',
      title: 'Create a clear business listing.',
      description: 'Add the provider name, category, location, website, images, and a service description that customers can quickly understand.',
    },
    formTitle: 'Listing details',
    submitLabel: 'Submit listing',
    successTitle: 'Listing submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login to manage business listings.',
      badge: 'Directory access',
      title: 'Welcome back to your listing account.',
      description: 'Login to add provider details, manage saved directory information, and continue building useful business listings.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create an account to add business listings.',
      badge: 'Provider access',
      title: 'Create an account for your business listing.',
      description: 'Set up access to submit provider details, save contact information, and prepare listings for customers to discover.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
