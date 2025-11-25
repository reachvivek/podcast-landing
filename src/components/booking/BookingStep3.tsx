'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Star, Loader2 } from 'lucide-react';
import type { BookingData } from '@/contexts/BookingContext';

interface BookingStep3Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  notIncluded: string[];
  isPopular: boolean;
  category: string;
}

export function BookingStep3({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep3Props) {
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();

        if (data.success) {
          setServicePackages(data.data);
        } else {
          setError('Failed to load service packages');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load service packages');
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []);

  const handleServiceSelect = (service: ServicePackage) => {
    updateBookingData({
      selectedService: {
        id: service.slug,
        name: service.name,
        price: service.price
      }
    });
  };

  const canProceed = !!bookingData.selectedService;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-ecospace-green animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-ecospace-green text-black hover:bg-ecospace-green/90 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

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
          const isSelected = bookingData.selectedService?.id === service.slug;
          const savings = service.originalPrice ? service.originalPrice - service.price : 0;

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
                  : service.isPopular
                  ? 'border-ecospace-green/50'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Badge */}
              {service.isPopular && (
                <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold bg-ecospace-green text-black">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`p-6 bg-white/5 ${service.isPopular ? 'pt-12' : ''}`}>
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
