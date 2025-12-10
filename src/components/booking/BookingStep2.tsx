'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Moon } from 'lucide-react';
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
    description: 'Bright and vibrant atmosphere for energetic content',
    features: [
      'Warm lighting setup',
      'Professional microphones',
      'Multi-camera options',
      'Perfect for upbeat content'
    ],
    image: '/images/studio/_DSC0567.jpg',
    icon: Sparkles,
    mood: 'Energetic & Bright'
  },
  {
    id: 'dark-theme',
    name: 'Dark Theme Studio',
    description: 'Moody and cinematic ambiance for professional productions',
    features: [
      'Dramatic lighting',
      'Professional microphones',
      'Multi-camera options',
      'Ideal for interviews & discussions'
    ],
    image: '/images/studio/_DSC8577.JPG',
    icon: Moon,
    mood: 'Cinematic & Professional'
  }
];

export function BookingStep2({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep2Props) {
  const handleSetupSelect = (setupId: string) => {
    updateBookingData({ selectedSetup: setupId });
  };

  const canProceed = !!bookingData.selectedSetup;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
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
          const Icon = theme.icon;
          const isSelected = bookingData.selectedSetup === theme.id;

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
              {/* Studio Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={theme.image}
                  alt={theme.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Icon Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`p-3 rounded-xl backdrop-blur-md transition-all ${
                    isSelected ? 'bg-ecospace-green' : 'bg-white/20'
                  }`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-black' : 'text-white'}`} />
                  </div>
                </div>

                {/* Mood Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20">
                    <span className="text-white text-xs font-medium">{theme.mood}</span>
                  </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{theme.name}</h3>
                  <p className="text-gray-200 text-sm mb-4">{theme.description}</p>

                  {/* Features Pills */}
                  <div className="flex flex-wrap gap-2">
                    {theme.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20"
                      >
                        <span className="text-gray-200 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              <div className={`py-4 text-center font-semibold transition-all ${
                isSelected
                  ? 'bg-ecospace-green text-black'
                  : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
              }`}>
                {isSelected ? '✓ Selected' : 'Select This Studio'}
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
