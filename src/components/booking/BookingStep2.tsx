'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { BookingData } from '@/contexts/BookingContext';

interface BookingStep2Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const studioThemes = [
  {
    id: 'light-theme',
    name: 'Light Theme Studio',
    label: 'Energetic & Bright',
    description: 'Bright and vibrant atmosphere for energetic content',
    features: [
      'Light neutral walls',
      'Conference setup',
      'Professional monitors',
      'Perfect for business content'
    ],
    images: [
      '/images/studio/_DSC8631.JPG',
      '/images/studio/_DSC0719.JPG',
      '/images/studio/_DSC0725.JPG',
      '/images/studio/_DSC0710.JPG',
    ]
  },
  {
    id: 'dark-theme',
    name: 'Dark Theme Studio',
    label: 'Cinematic & Professional',
    description: 'Moody and cinematic ambiance for professional productions',
    features: [
      'Dramatic black walls',
      'Green moss accents',
      'Cozy seating setup',
      'Ideal for interviews & discussions'
    ],
    images: [
      '/images/studio/_DSC8622.JPG',
      '/images/studio/_DSC0567.jpg',
      '/images/studio/_DSC8577.JPG',
      '/images/studio/_DSC8846.JPG',
      '/images/studio/_DSC0174.JPG',
    ]
  }
];

export function BookingStep2({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep2Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({
    'light-theme': 0,
    'dark-theme': 0
  });
  const [isHovering, setIsHovering] = useState<{ [key: string]: boolean }>({
    'light-theme': false,
    'dark-theme': false
  });

  // Auto-scroll carousel every 3 seconds
  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};

    studioThemes.forEach((theme) => {
      if (!isHovering[theme.id]) {
        intervals[theme.id] = setInterval(() => {
          setCurrentImageIndex(prev => ({
            ...prev,
            [theme.id]: (prev[theme.id] + 1) % theme.images.length
          }));
        }, 3000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [isHovering]);

  const handleSetupSelect = (setupId: string) => {
    updateBookingData({ selectedSetup: setupId });
  };

  const nextImage = (themeId: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [themeId]: (prev[themeId] + 1) % totalImages
    }));
  };

  const prevImage = (themeId: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [themeId]: prev[themeId] === 0 ? totalImages - 1 : prev[themeId] - 1
    }));
  };

  const canProceed = !!bookingData.selectedSetup;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Choose Your Studio</h2>
        <p className="text-gray-400">Select the atmosphere that matches your content style</p>
      </motion.div>

      {/* Studio Theme Options - 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studioThemes.map((theme, index) => {
          const isSelected = bookingData.selectedSetup === theme.id;
          const currentImage = currentImageIndex[theme.id] || 0;

          return (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => handleSetupSelect(theme.id)}
              className={`relative cursor-pointer rounded-3xl overflow-hidden border-2 transition-all group ${
                isSelected
                  ? 'border-ecospace-green shadow-lg shadow-ecospace-green/20 scale-[1.02]'
                  : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'
              }`}
            >
              {/* Image Carousel */}
              <div
                className="relative h-48 md:h-56 overflow-hidden bg-gray-900"
                onMouseEnter={() => setIsHovering(prev => ({ ...prev, [theme.id]: true }))}
                onMouseLeave={() => setIsHovering(prev => ({ ...prev, [theme.id]: false }))}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={theme.images[currentImage]}
                      alt={`${theme.name} - Image ${currentImage + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => prevImage(theme.id, theme.images.length, e)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={(e) => nextImage(theme.id, theme.images.length, e)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Image Counter Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {theme.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImage
                          ? 'bg-ecospace-green w-6'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                {/* Label Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                    <span className="text-white text-xs font-medium">{theme.label}</span>
                  </div>
                </div>
              </div>

              {/* Text Content Below Image */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-4 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-1">{theme.name}</h3>
                <p className="text-gray-400 text-xs mb-2">{theme.description}</p>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {theme.features.slice(0, 3).map((feature, idx) => (
                    <div
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                    >
                      <span className="text-gray-300 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Button */}
                <div className={`py-2.5 text-center font-semibold text-sm rounded-xl transition-all ${
                  isSelected
                    ? 'bg-ecospace-green text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}>
                  {isSelected ? '✓ Selected' : 'Select This Studio'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center"
      >
        <p className="text-gray-300 text-sm">
          Both studios are fully equipped with professional microphones, multi-camera setups, 4K recording, and studio lighting.
          Choose based on the atmosphere you want to create.
        </p>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-between pt-4"
      >
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!canProceed}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center gap-2 ${
            canProceed
              ? 'bg-ecospace-green text-black hover:bg-ecospace-green/90'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Services
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
