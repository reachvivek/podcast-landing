'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { StudioGallery } from '@/components/sections/StudioGallery';
import { PortfolioShowcase } from '@/components/sections/PortfolioShowcase';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeaturedPackage } from '@/components/sections/FeaturedPackage';
import { Testimonials } from '@/components/sections/Testimonials';
import { LocationMap } from '@/components/sections/LocationMap';
import { ContactSection } from '@/components/sections/ContactSection';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      {/* 1. Hero Section - Hook with visuals */}
      <HeroSection
        title="Dubai World Trade Center's Premier Podcast Studio"
        subtitle="Professional Recording | Expert Production | Flexible Packages From 350 AED"
        backgroundImage="/images/og-image.jpg"
        primaryCTA="BOOK STUDIOS & SERVICES"
        secondaryCTA="Explore Our Studio"
      />

      {/* 2. Why Choose Us - Build trust with features */}
      <WhyChooseUs />

      {/* 3. Studio Gallery - Explore the space */}
      <StudioGallery />

      {/* 4. Portfolio - Social proof of past creators */}
      <PortfolioShowcase />

      {/* 4. How It Works - Easy booking process */}
      <HowItWorks />

      {/* 5. Pricing - Only after they see the value */}
      <FeaturedPackage />

      {/* 6. Testimonials - Social proof after pricing */}
      <Testimonials />

      {/* 7. Location - Studio location with map */}
      <LocationMap />

      {/* 8. Contact Form - Lead capture */}
      <ContactSection />
    </MainLayout>
  );
}
