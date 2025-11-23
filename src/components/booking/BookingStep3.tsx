'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Star, Sparkles } from 'lucide-react';
import type { BookingData } from '@/contexts/BookingContext';

interface BookingStep3Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const servicePackages = [
  {
    id: 'recording-only',
    name: 'Recording Only',
    price: 350,
    originalPrice: 550,
    description: 'Perfect for self-editors who want raw files',
    features: [
      'Studio recording (1 hour)',
      'Professional sound setup',
      'Studio lighting',
      'Raw files delivered via link'
    ],
    notIncluded: [
      'Video recording',
      'Editing services',
      'Color correction'
    ],
    badge: null,
    popular: false
  },
  {
    id: 'podcast-editing',
    name: 'Podcast + Editing',
    price: 750,
    originalPrice: 980,
    description: 'Complete video podcast production',
    features: [
      'One-hour video recording',
      '2-camera setup',
      'Professional sound & lights',
      'Full professional editing',
      'Color correction',
      'Ready-to-publish video'
    ],
    notIncluded: [],
    badge: 'MOST POPULAR',
    popular: true
  },
  {
    id: 'studio-rental',
    name: 'Studio Rental',
    price: 200,
    originalPrice: 300,
    description: 'Bring your own equipment',
    features: [
      'Full studio access',
      'Use your own equipment',
      'Flexible booking hours',
      'Air-conditioned space'
    ],
    notIncluded: [
      'Equipment rental',
      'Editing services',
      'Engineer assistance'
    ],
    badge: 'BEST VALUE',
    popular: false
  }
];

export function BookingStep3({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep3Props) {
  const handleServiceSelect = (service: typeof servicePackages[0]) => {
    updateBookingData({
      selectedService: {
        id: service.id,
        name: service.name,
        price: service.price
      }
    });
  };

  const canProceed = !!bookingData.selectedService;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Package</h2>
        <p className="text-gray-400">Select the service that best fits your needs</p>
      </motion.div>

      {/* Service Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {servicePackages.map((service, index) => {
          const isSelected = bookingData.selectedService?.id === service.id;
          const savings = service.originalPrice - service.price;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => handleServiceSelect(service)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                isSelected
                  ? 'border-ecospace-green shadow-lg shadow-ecospace-green/20'
                  : service.popular
                  ? 'border-ecospace-green/50'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <div className={`absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold ${
                  service.popular
                    ? 'bg-ecospace-green text-black'
                    : 'bg-white/10 text-ecospace-green'
                }`}>
                  <div className="flex items-center justify-center gap-1">
                    {service.popular ? <Star className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                    {service.badge}
                  </div>
                </div>
              )}

              <div className={`p-6 bg-white/5 ${service.badge ? 'pt-12' : ''}`}>
                {/* Service Name */}
                <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{service.price}</span>
                    <span className="text-lg text-gray-400">AED</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 line-through text-sm">{service.originalPrice} AED</span>
                    <span className="text-ecospace-green text-sm font-semibold">Save {savings} AED</span>
                  </div>
                </div>

                {/* Included Features */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">What's included:</p>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-ecospace-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Not Included (if any) */}
                {service.notIncluded.length > 0 && (
                  <div className="space-y-2 mb-4 opacity-60">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Not included:</p>
                    {service.notIncluded.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-600">✕</span>
                        <span className="text-gray-500 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selection Button */}
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    isSelected
                      ? 'bg-ecospace-green text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {isSelected ? '✓ Selected' : 'Select Package'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Reels Packages Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Social Media Reels Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'Single Reel', price: 250, description: 'Quick promo video' },
            { name: '5 Reels Package', price: 950, description: 'Save 300 AED', perReel: 190 },
            { name: '10 Reels Package', price: 3900, description: 'Best Value!', perReel: 390 }
          ].map((reelPackage, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-ecospace-green/50 transition-all cursor-pointer"
            >
              <h4 className="font-semibold text-white">{reelPackage.name}</h4>
              <p className="text-2xl font-bold text-ecospace-green">{reelPackage.price} AED</p>
              {reelPackage.perReel && (
                <p className="text-xs text-gray-400">{reelPackage.perReel} AED per reel</p>
              )}
              <p className="text-sm text-gray-400 mt-1">{reelPackage.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* What You Get Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-ecospace-green/10 to-transparent rounded-2xl p-6 border border-ecospace-green/20"
      >
        <h3 className="text-lg font-semibold text-white mb-3">What you get after your session:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-ecospace-green flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Professional Quality Files</p>
              <p className="text-gray-400 text-sm">High-resolution video and audio ready for any platform</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-ecospace-green flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Fast Delivery</p>
              <p className="text-gray-400 text-sm">Edited content delivered within 2-7 business days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-ecospace-green flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Cloud Download Link</p>
              <p className="text-gray-400 text-sm">Easy access to all your files via secure link</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-ecospace-green flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Multiple Formats</p>
              <p className="text-gray-400 text-sm">Optimized for YouTube, Spotify, social media & more</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
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
          Continue to Add-ons
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
