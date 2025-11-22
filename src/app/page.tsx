'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { FeaturedPackage } from '@/components/sections/FeaturedPackage';
import { FeaturedPodcasts } from '@/components/sections/FeaturedPodcasts';
import { EpisodesCarousel } from '@/components/sections/EpisodesCarousel';
import { PodcastExplore } from '@/components/sections/PodcastExplore';
import { MainLayout } from '@/components/layout/MainLayout';
import { episodes, getFeaturedEpisodes } from '@/data/episodes';

export default function Home() {
  const featuredEpisodes = getFeaturedEpisodes();

  return (
    <MainLayout>
      {/* Hero Section - Studio Booking */}
      <HeroSection
        title="Dubai World Trade Center's Premier Podcast Studio"
        subtitle="Professional Recording | Expert Production | Flexible Packages From 350 AED"
        backgroundImage="/images/hero section image.jpg"
        primaryCTA="BOOK STUDIOS & SERVICES"
        secondaryCTA="View Pricing"
      />

      {/* Services Overview Section */}
      <ServicesOverview />
      {/* Featured Package Section */}
      <FeaturedPackage />

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
