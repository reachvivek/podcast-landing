'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { LatestEpisodes } from '@/components/sections/LatestEpisodes';
import { FeaturedPodcasts } from '@/components/sections/FeaturedPodcasts';
import { EpisodesCarousel } from '@/components/sections/EpisodesCarousel';
import { PodcastExplore } from '@/components/sections/PodcastExplore';
import { MainLayout } from '@/components/layout/MainLayout';
import { episodes, getFeaturedEpisodes } from '@/data/episodes';

export default function Home() {
  const featuredEpisode = episodes[2];
  const featuredEpisodes = getFeaturedEpisodes();

  return (
    <MainLayout>
      {/* Static Hero Section */}
      <HeroSection
        title="Listen TO US DAILY"
        subtitle="Our daily podcast"
        backgroundImage="/images/hero-background.jpg"
      />

      {/* Audio Player - NOT sticky */}
      <AudioPlayer episode={featuredEpisode} />

      {/* Latest Episodes Section */}
      <LatestEpisodes episodes={episodes} />

      {/* Podcast Explore Section */}
      <PodcastExplore
        episodes={episodes}
        category="Fashion Life"
        title="Explore podcast in"
        subtitle="Marketing Show"
      />

      {/* Featured Podcasts Section */}
      <FeaturedPodcasts episodes={featuredEpisodes} />

      {/* Episodes Carousel - Just above footer/newsletter */}
      <EpisodesCarousel
        episodes={episodes}
        title="Trending Now"
        subtitle="Most Popular Episodes"
      />
    </MainLayout>
  );
}
