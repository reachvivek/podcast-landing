export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  startingPrice: number;
  originalPrice?: number;
  savings?: number;
  category: string;
  features: string[];
  link: string;
  badge?: string;
  isFeatured?: boolean;
}

export const services: Service[] = [
  {
    id: "podcast-production",
    icon: "Mic",
    title: "Podcast Production",
    description: "Professional podcast recording with studio-quality sound and lighting. Perfect for audio-only content creators.",
    startingPrice: 350,
    originalPrice: 550,
    savings: 200,
    category: "Audio Recording",
    features: [
      "1 hour studio time",
      "Professional sound equipment",
      "Studio lighting",
      "Raw audio files delivered"
    ],
    link: "/services#podcast-production"
  },
  {
    id: "video-podcast",
    icon: "Video",
    title: "Video Podcast Production",
    description: "Complete video podcast package with multi-camera setup, professional editing, and color correction.",
    startingPrice: 750,
    originalPrice: 980,
    savings: 230,
    category: "Video Production",
    features: [
      "1 hour recording",
      "2 camera setup",
      "Professional editing",
      "Color correction",
      "Final video files"
    ],
    link: "/services#video-podcast",
    badge: "Most Popular",
    isFeatured: true
  },
  {
    id: "social-media-reels",
    icon: "Smartphone",
    title: "Social Media Reels",
    description: "Short-form video content creation perfect for Instagram, TikTok, and YouTube Shorts.",
    startingPrice: 250,
    category: "Social Media",
    features: [
      "Video recording",
      "Professional editing",
      "Titles & graphics",
      "Platform-optimized format"
    ],
    link: "/services#social-media-reels"
  },
  {
    id: "reels-package-5",
    icon: "Package",
    title: "5 Reels Package",
    description: "Bulk package for consistent content creation. Save 300 AED compared to individual reels.",
    startingPrice: 950,
    originalPrice: 1250,
    savings: 300,
    category: "Package Deals",
    features: [
      "1 hour recording session",
      "Studio & professional lighting",
      "5 edited reels (190 AED each)",
      "Titles & graphics included"
    ],
    link: "/pricing#reels-5",
    badge: "Save 300 AED"
  },
  {
    id: "reels-package-10",
    icon: "PackageCheck",
    title: "10 Reels Package",
    description: "Best value for serious content creators. Maximum savings at just 390 AED per reel.",
    startingPrice: 3900,
    savings: 600,
    category: "Package Deals",
    features: [
      "1 hour recording session",
      "Professional studio setup",
      "10 edited reels (390 AED each)",
      "Titles & graphics included"
    ],
    link: "/pricing#reels-10",
    badge: "Best Value"
  },
  {
    id: "studio-rental",
    icon: "Building",
    title: "Studio Space Rental",
    description: "Rent our professional studio for your own production. Bring your equipment and team.",
    startingPrice: 200,
    originalPrice: 300,
    savings: 100,
    category: "Studio Rental",
    features: [
      "Hourly rental",
      "Professional space",
      "Use your own equipment",
      "Flexible scheduling"
    ],
    link: "/services#studio-rental"
  }
];

// Featured service for hero/highlight sections
export const getFeaturedService = (): Service => {
  return services.find(s => s.isFeatured) || services[1];
};

// Get services by category
export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(s => s.category === category);
};

// Get top 3 services for preview sections
export const getTopServices = (): Service[] => {
  return [
    services[0], // Podcast Production
    services[1], // Video Podcast (Featured)
    services[2]  // Social Media Reels
  ];
};

// Get package deals
export const getPackageDeals = (): Service[] => {
  return services.filter(s => s.category === "Package Deals");
};
