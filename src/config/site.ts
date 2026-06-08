/**
 * Single source of truth for business facts (NAP, hours, license, socials).
 * Every component/page reads from here so values never drift and placeholders
 * are filled in ONE place before launch.
 *
 * ⚠️  LAUNCH BLOCKERS — replace every value marked `TODO` with real data and
 *     make sure phone / address / hours / license match the Google Business
 *     Profile character-for-character before pointing the domain.
 */

export const site = {
  name: 'Twinkling Hearts In Home Care',
  legalName: 'Twinkling Hearts In Home Care LLC',
  shortName: 'Twinkling Hearts',
  tagline: 'Care You Can Trust, Hearts That Understand.',
  miniTagline: 'Compassion is at the heart of our care.',
  description:
    'Twinkling Hearts In Home Care provides compassionate, dependable non-medical in-home senior care — personal care, companionship, medication reminders, light housekeeping, and respite for families.',

  url: 'https://twinklingheart.org',

  // --- Contact (NAP) -------------------------------------------------------
  email: 'thihc2227@gmail.com', // TODO: consider a branded address (care@twinklingheart.org)
  phone: '(555) 555-5555', // TODO: real business phone
  phoneHref: 'tel:+15555555555', // TODO: match real phone (E.164)

  address: {
    // TODO: confirm — leave street blank if service-area business with no public office
    street: '',
    city: 'Your City', // TODO
    region: 'ST', // TODO: state abbreviation
    regionName: 'Your State', // TODO: full state name
    postalCode: '00000', // TODO
    country: 'US',
  },

  // Cities / counties served (also drives the Service Areas pages). TODO: confirm.
  serviceArea: 'Your City and surrounding communities', // TODO short phrase used in copy

  // --- Hours ---------------------------------------------------------------
  // TODO: confirm. Care is often 24/7; office/phone hours may differ.
  hours: {
    display: 'Available 24 hours a day, 7 days a week',
    office: 'Phone answered Mon–Fri, 8am–6pm',
    // Schema.org opening hours specification (24/7 example)
    schema: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  },

  // --- Credentials ---------------------------------------------------------
  license: 'License #TODO', // TODO: state license / registration number (omit line if none)
  insured: true,
  bonded: true,

  // --- Social --------------------------------------------------------------
  social: {
    facebook: 'https://www.facebook.com/', // TODO: real page URL
    instagram: 'https://www.instagram.com/', // TODO
    x: 'https://x.com/', // TODO
  },

  // --- Lead form -----------------------------------------------------------
  // TODO: create a free key at https://web3forms.com and paste it here.
  web3formsKey: 'YOUR-WEB3FORMS-ACCESS-KEY',

  // --- Map embed (Contact / Service Area pages) ----------------------------
  // TODO: replace q= with the real city/region.
  mapEmbedSrc:
    'https://www.google.com/maps?q=United+States&output=embed',
} as const;

/** Convenience: array of social links present (filters out unset). */
export const socialLinks = [
  { label: 'Facebook', href: site.social.facebook, key: 'facebook' },
  { label: 'Instagram', href: site.social.instagram, key: 'instagram' },
  { label: 'X', href: site.social.x, key: 'x' },
] as const;

/** Primary navigation used by header + footer. */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;
