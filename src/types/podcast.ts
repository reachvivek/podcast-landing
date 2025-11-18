export interface Episode {
  id: string;
  title: string;
  description: string;
  episodeNumber: number;
  category: string;
  host: string;
  guest?: string;
  guestImage?: string;
  duration: string;
  publishedDate: string;
  audioUrl: string;
  imageUrl: string;
  featured?: boolean;
}

export interface PodcastCategory {
  id: string;
  name: string;
  slug: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PodcastPlatform {
  name: string;
  url: string;
  icon: string;
}
