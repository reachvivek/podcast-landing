'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { glassButtonStyles, glassButtonClass, glassButtonPrimaryClass } from '@/lib/utils';

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
        <div className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left">
          {/* Main Headline - Simple & Powerful with Rotating Word */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-wide"
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
            <div className="text-ecospace-green" style={{ fontWeight: 300 }}>Come to Life</div>
          </motion.h1>

          {/* Subtitle - Experience-Focused */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            Dubai's premier podcast studio. Professional recording, expert production, and an experience that transforms your vision into reality.
          </motion.p>

          {/* CTA Buttons - Premium Glassmorphism with 3D Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            style={{ perspective: '1000px' }}
          >
            {/* Primary CTA - Glassmorphism with 3D Tilt (Main Character) */}
            <a
              href="/book"
              className={`${glassButtonPrimaryClass} inline-flex items-center justify-center gap-3`}
              style={glassButtonStyles.tilt3d}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
              }}
            >
              {/* 3D Depth Layer */}
              <span className={glassButtonStyles.primaryDepthLayer} style={{ transform: 'translateZ(-10px)' }} />
              {/* Shimmer Effect */}
              <span className={glassButtonStyles.primaryShimmer} />
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-all duration-300 relative z-10" />
              <span className="uppercase tracking-widest relative z-10">{primaryCTA}</span>
            </a>

            {/* Secondary CTA - Glassmorphism with 3D Tilt */}
            <a
              href="#studio"
              className={`${glassButtonClass} inline-flex items-center justify-center gap-2`}
              style={glassButtonStyles.tilt3d}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
              }}
            >
              {/* 3D Depth Layer */}
              <span className={glassButtonStyles.depthLayer} style={{ transform: 'translateZ(-10px)' }} />
              {/* Shimmer Effect */}
              <span className={glassButtonStyles.shimmer} />
              <span className="uppercase tracking-widest relative z-10">{secondaryCTA}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </a>
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
