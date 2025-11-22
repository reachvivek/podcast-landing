import { SocialLink, PodcastPlatform } from '@/types/podcast';

export const siteConfig = {
  name: 'EcoSpace',
  tagline: 'PODCAST STUDIO',
  description: "Dubai's premier podcast studio at Dubai World Trade Center. Professional recording, video production & editing services.",
  url: 'https://ecospace.ae',
  email: 'info@ecospace.ae', // TODO: Update with actual email from client
  phone: '+971-502060674',
  whatsapp: '+971-502060674',
  address: 'Dubai World Trade Center, Dubai, UAE',
  googleMapsUrl: 'https://maps.app.goo.gl/oPW2rk1rMi5g2UHN7',
  hours: '7:00 AM - 10:00 PM',
  daysOpen: '7 days a week',
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/podcast.ecospace',
    icon: 'instagram',
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/ecospace', // TODO: Update with actual Facebook URL
    icon: 'facebook',
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/ecospace', // TODO: Update with actual Twitter URL
    icon: 'twitter',
  },
];

export const podcastPlatforms: PodcastPlatform[] = [
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/podover',
    icon: 'soundcloud',
  },
  {
    name: 'Spotify',
    url: 'https://spotify.com/podover',
    icon: 'spotify',
  },
  {
    name: 'Apple',
    url: 'https://podcasts.apple.com/podover',
    icon: 'apple',
  },
];

export const navigation = [
  {
    name: 'Home',
    href: '/',
    children: [
      { name: 'Home Default', href: '/' },
      { name: 'Home Modern', href: '/home-modern' },
    ],
  },
  {
    name: 'Pages',
    href: '/about',
    children: [
      { name: 'About Us', href: '/about' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    name: 'Podcast',
    href: '/podcast',
    children: [
      { name: 'All Episodes', href: '/podcast' },
      { name: 'Categories', href: '/podcast/categories' },
    ],
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Topics',
    href: '/topics',
    children: [
      { name: 'Technology', href: '/topics/technology' },
      { name: 'Culture', href: '/topics/culture' },
      { name: 'Science', href: '/topics/science' },
      { name: 'Politics', href: '/topics/politics' },
    ],
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export const footerLinks = {
  explore: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Events', href: '/events' },
    { name: 'Donate Us', href: '/donate' },
    { name: 'List Episode', href: '/podcast' },
  ],
};
