'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  readonly title: string;
  readonly subtitle: string;
  readonly backgroundImage?: string;
  readonly primaryCTA?: string;
  readonly secondaryCTA?: string;
}

// Priority images - Your best shots
const allStudioImages = [
  '/images/studio-hero-10.jpg',    // _DSC7221 - PRIORITY
  '/images/studio-hero-11.jpg',    // _DSC8577 - PRIORITY
  '/images/studio-hero-12.jpg',    // _DSC8858 - PRIORITY
  '/images/studio-hero-13.jpg',    // _DSC8872 - PRIORITY
  '/images/studio-hero-14.jpg',    // _DSC8920 - PRIORITY
  '/images/studio-hero-15.jpg',    // _DSC8601 - PRIORITY
  '/images/studio-hero-16.jpg',    // _DSC7241 - PRIORITY
  '/images/studio-hero-17.jpg',    // _DSC7222 - PRIORITY
  '/images/studio-hero-8.jpg',     // Female guest
  '/images/studio-hero-7.jpg',     // People recording
];

// Shuffle array function - Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Rotating words for headline
const rotatingWords = ['Stories', 'Ideas', 'Voices', 'Brands', 'Visions', 'Conversations'];

export function HeroSection({
  primaryCTA = "BOOK STUDIOS & SERVICES",
  secondaryCTA = "Explore Our Space"
}: Readonly<HeroSectionProps>) {
  // Use unshuffled images initially, shuffle after hydration
  const [studioImages, setStudioImages] = useState(allStudioImages);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Shuffle images after component mounts (client-side only)
  useEffect(() => {
    setStudioImages(shuffleArray(allStudioImages));
  }, []);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % studioImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [studioImages.length]);

  // Auto-rotate headline words every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Fullscreen Image Carousel with Parallax Effect */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={studioImages[currentImage]}
              alt="Podcast Studio EcoSpace"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Gradient Overlay - Darker for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {studioImages.map((img, index) => (
            <button
              key={`hero-image-${index}-${img}`}
              onClick={() => setCurrentImage(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentImage
                  ? 'w-12 bg-ecospace-green'
                  : 'w-6 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Minimal Text Content - Bottom Aligned */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-24 mt-20">
        <div className="max-w-4xl">
          {/* Main Headline - Simple & Powerful with Rotating Word */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-none tracking-wide"
            style={{ fontWeight: 270 }}
          >
            <div>
              Where{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[currentWordIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="text-ecospace-green" style={{ fontWeight: 180 }}>Come to Life</div>
          </motion.h1>

          {/* Subtitle - Experience-Focused */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed font-light"
          >
            Dubai's premier podcast studio. Professional recording, expert production, and an experience that transforms your vision into reality.
          </motion.p>

          {/* CTA Buttons - Premium Glassmorphism with 3D Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
            style={{ perspective: '1000px' }}
          >
            {/* Primary CTA - White/Silver Glassmorphism with 3D Tilt */}
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden bg-white/10 hover:bg-ecospace-green/80 text-white hover:text-black font-light backdrop-blur-md text-base px-10 py-7 rounded-full shadow-2xl hover:shadow-ecospace-green/50 transition-all duration-500 group border border-white/30"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(0deg) rotateY(0deg)',
              }}
            >
              <a
                href="#contact"
                className="flex items-center justify-center gap-3 relative z-10"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = ((y - centerY) / centerY) * -5;
                  const rotateY = ((x - centerX) / centerX) * 5;
                  e.currentTarget.parentElement!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.parentElement!.style.transform = 'rotateX(0deg) rotateY(0deg)';
                }}
              >
                {/* 3D Depth Layer */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" style={{ transform: 'translateZ(-10px)' }} />

                {/* Shimmer Effect - Enhanced */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                <span className="uppercase tracking-widest relative z-10">{primaryCTA}</span>
              </a>
            </Button>

            {/* Secondary CTA - Outlined Glass with 3D Tilt */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="relative overflow-hidden border-2 border-white/60 bg-white/5 backdrop-blur-xl text-white hover:text-white hover:bg-white/15 hover:border-white font-light text-sm px-10 py-7 rounded-full transition-all duration-500 group shadow-lg hover:shadow-white/30"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(0deg) rotateY(0deg)',
              }}
            >
              <a
                href="#portfolio"
                className="flex items-center justify-center gap-2 relative z-10"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = ((y - centerY) / centerY) * -5;
                  const rotateY = ((x - centerX) / centerX) * 5;
                  e.currentTarget.parentElement!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.parentElement!.style.transform = 'rotateX(0deg) rotateY(0deg)';
                }}
              >
                {/* 3D Depth Layer */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" style={{ transform: 'translateZ(-10px)' }} />

                {/* Shimmer Effect - Enhanced */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <span className="uppercase tracking-widest relative z-10">{secondaryCTA}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Floating Feature Tags - Minimal & Elegant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-1/3 right-8 hidden xl:flex flex-col gap-4 z-20"
      >
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 hover:bg-black/60 transition-all">
          <p className="text-white font-bold text-lg">2-Camera</p>
          <p className="text-gray-400 text-sm">4K Setup</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 hover:bg-black/60 transition-all">
          <p className="text-white font-bold text-lg">Pro Audio</p>
          <p className="text-gray-400 text-sm">Studio Quality</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 hover:bg-black/60 transition-all">
          <p className="text-white font-bold text-lg">Full Service</p>
          <p className="text-gray-400 text-sm">Record to Edit</p>
        </div>
      </motion.div>
    </section>
  );
}
