import { site, socialLinks } from '@/config/site';

const LOGO_URL = `${site.url}/og-default.png`;

/** Sitewide LocalBusiness node. Non-medical care → LocalBusiness (not HomeHealthCareService). */
export function localBusiness() {
  // Only include real social URLs (placeholders end in a bare ".com/").
  const sameAs = socialLinks
    .map((s) => s.href)
    .filter((h) => h && !h.endsWith('.com/'));

  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  };
  if (site.address.street) address.streetAddress = site.address.street;
  if (site.address.postalCode) address.postalCode = site.address.postalCode;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#business`,
    name: site.legalName,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: LOGO_URL,
    logo: LOGO_URL,
    priceRange: '$$',
    address,
    areaServed: site.serviceArea,
    openingHoursSpecification: site.hours.schema,
    slogan: site.miniTagline,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Service node referencing the business as provider. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.name,
    category: 'Home care',
    areaServed: site.serviceArea,
    provider: { '@id': `${site.url}/#business` },
  };
}

/** FAQPage node. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}

/** BreadcrumbList node from an ordered list of {name, href}. */
export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}
