import { SocialLink, PodcastPlatform } from '@/types/podcast';

export const siteConfig = {
  name: 'PODOVER',
  tagline: 'PODCAST',
  description: 'Our pick of the best podcasts on Spotify, Apple Podcasts and more covering all trends.',
  url: 'https://podover.com',
  email: 'needhelp@company.com',
  phone: '+23 425 4466 80',
  address: '88 Brooklyn Golden Street, New York, United States of America',
  hours: 'Mon - Sun: 8AM - 8PM',
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'Twitter',
    url: 'https://twitter.com/podover',
    icon: 'twitter',
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/podover',
    icon: 'facebook',
  },
  {
    platform: 'Pinterest',
    url: 'https://pinterest.com/podover',
    icon: 'pinterest',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/podover',
    icon: 'instagram',
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
