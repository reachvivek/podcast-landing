'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Video, Mic, Camera, Monitor } from 'lucide-react';
import Image from 'next/image';
import type { BookingData } from '@/app/book/page';

interface BookingStep2Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const setupOptions = [
  {
    id: 'standard',
    name: 'Standard Setup',
    description: 'Perfect for solo podcasts and simple interviews',
    features: [
      '1 Professional Microphone',
      'Studio Lighting',
      'Audio Recording',
      'Soundproofed Room'
    ],
    image: '/images/studio-hero-10.jpg',
    icon: Mic,
    popular: false
  },
  {
    id: 'video-2cam',
    name: '2-Camera Video Setup',
    description: 'Full video podcast production with multi-angle coverage',
    features: [
      '2x 4K Cameras',
      '2 Professional Microphones',
      'Studio Lighting Setup',
      'Video + Audio Recording',
      'Multiple Angles'
    ],
    image: '/images/studio-hero-11.jpg',
    icon: Video,
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Production',
    description: 'Complete studio experience with all equipment',
    features: [
      '3+ Camera Setup',
      'Professional Teleprompter',
      'Multiple Mic Options',
      'Advanced Lighting',
      'Live Monitoring',
      'Green Screen Available'
    ],
    image: '/images/studio-hero-12.jpg',
    icon: Camera,
    popular: false
  }
];

export function BookingStep2({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep2Props) {
  const handleSetupSelect = (setupId: string) => {
    updateBookingData({ selectedSetup: setupId });
  };

  const canProceed = !!bookingData.selectedSetup;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Setup</h2>
        <p className="text-gray-400">Select the equipment configuration for your session</p>
      </motion.div>

      {/* Setup Options Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {setupOptions.map((setup, index) => {
          const Icon = setup.icon;
          const isSelected = bookingData.selectedSetup === setup.id;

          return (
            <motion.div
              key={setup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => handleSetupSelect(setup.id)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                isSelected
                  ? 'border-ecospace-green shadow-lg shadow-ecospace-green/20'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Popular Badge */}
              {setup.popular && (
                <div className="absolute top-4 right-4 z-10 bg-ecospace-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              {/* Setup Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={setup.image}
                  alt={setup.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Icon Overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-ecospace-green' : 'bg-white/20 backdrop-blur-sm'}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-white'}`} />
                  </div>
                </div>
              </div>

              {/* Setup Details */}
              <div className="p-6 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">{setup.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{setup.description}</p>

                {/* Features List */}
                <ul className="space-y-2">
                  {setup.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-ecospace-green' : 'bg-gray-500'}`} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Selection Indicator */}
                <div className={`mt-4 py-2 rounded-lg text-center font-semibold text-sm transition-all ${
                  isSelected
                    ? 'bg-ecospace-green/20 text-ecospace-green'
                    : 'bg-white/5 text-gray-400'
                }`}>
                  {isSelected ? '✓ Selected' : 'Select This Setup'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Equipment Highlight Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4">All setups include:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ecospace-green/20">
              <Monitor className="w-5 h-5 text-ecospace-green" />
            </div>
            <span className="text-gray-300 text-sm">Live Monitoring</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ecospace-green/20">
              <Mic className="w-5 h-5 text-ecospace-green" />
            </div>
            <span className="text-gray-300 text-sm">Pro Audio</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ecospace-green/20">
              <Video className="w-5 h-5 text-ecospace-green" />
            </div>
            <span className="text-gray-300 text-sm">4K Recording</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ecospace-green/20">
              <Camera className="w-5 h-5 text-ecospace-green" />
            </div>
            <span className="text-gray-300 text-sm">Studio Lighting</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-between"
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
