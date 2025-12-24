import { Episode } from '@/types/podcast';

export const episodes: Episode[] = [
  {
    id: '1',
    title: 'Virtual Security of the Future',
    description: 'An in-depth discussion about the future of virtual security, cybersecurity trends, and how technology is evolving to protect our digital world.',
    episodeNumber: 1,
    category: 'Technology & Security',
    host: 'Ecospace Podcast',
    duration: '45:30',
    publishedDate: '2024-12-15',
    youtubeUrl: 'https://www.youtube.com/watch?v=m0J6s8o44y4',
    imageUrl: 'https://img.youtube.com/vi/m0J6s8o44y4/maxresdefault.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Fashion Modeling in Dubai',
    description: 'Exploring the glamorous world of fashion modeling in Dubai. Insights into the industry, career opportunities, and what it takes to succeed in the Dubai fashion scene.',
    episodeNumber: 2,
    category: 'Fashion & Lifestyle',
    host: 'Ecospace Podcast',
    duration: '38:20',
    publishedDate: '2024-12-10',
    youtubeUrl: 'https://www.youtube.com/watch?v=HfNbc4ELcC4',
    imageUrl: 'https://img.youtube.com/vi/HfNbc4ELcC4/maxresdefault.jpg',
    featured: true,
  },
];

export const getFeaturedEpisodes = () => episodes.filter(ep => ep.featured);
export const getLatestEpisodes = (limit?: number) =>
  limit ? episodes.slice(0, limit) : episodes;
export const getEpisodeById = (id: string) =>
  episodes.find(ep => ep.id === id);
