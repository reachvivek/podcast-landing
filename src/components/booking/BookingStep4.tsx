'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Film, Palette, Clock, Music, Users, Loader2 } from 'lucide-react';
import type { BookingData } from '@/contexts/BookingContext';

interface BookingStep4Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

interface AddOnService {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Film,
  Palette,
  Clock,
  Music,
  Users
};

export function BookingStep4({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep4Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>(bookingData.additionalServices || []);
  const [additionalServices, setAdditionalServices] = useState<AddOnService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAddons() {
      try {
        const response = await fetch('/api/addons');
        const data = await response.json();

        if (data.success) {
          setAdditionalServices(data.data);
        }
      } catch (err) {
        console.error('Error fetching add-ons:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAddons();
  }, []);

  const toggleService = (serviceSlug: string) => {
    const newServices = selectedServices.includes(serviceSlug)
      ? selectedServices.filter(id => id !== serviceSlug)
      : [...selectedServices, serviceSlug];

    setSelectedServices(newServices);
    updateBookingData({ additionalServices: newServices });
  };

  const calculateTotal = () => {
    const basePrice = bookingData.selectedService?.price || 0;
    const addonsTotal = selectedServices.reduce((total, serviceSlug) => {
      const service = additionalServices.find(s => s.slug === serviceSlug);
      return total + (service?.price || 0);
    }, 0);
    return basePrice + addonsTotal;
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Not selected';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Left Column - Additional Services */}
      <div className="lg:col-span-2 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Additional Services</h2>
          <p className="text-gray-400 text-sm sm:text-base">Enhance your session with optional add-ons</p>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-ecospace-green animate-spin" />
          </div>
        ) : (
          <>
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {additionalServices.map((service, index) => {
                const Icon = iconMap[service.icon] || Camera;
                const isSelected = selectedServices.includes(service.slug);

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    onClick={() => toggleService(service.slug)}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                  isSelected
                    ? 'border-ecospace-green bg-ecospace-green/10'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      isSelected ? 'bg-ecospace-green' : 'bg-white/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-white'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{service.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-ecospace-green font-bold">+{service.price} AED</p>
                    {/* Checkbox */}
                    <div className={`mt-2 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-ecospace-green border-ecospace-green'
                        : 'border-white/30'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
                );
              })}
            </div>

            {/* Skip Add-ons Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-sm text-center"
            >
              Add-ons are optional. You can continue without selecting any.
            </motion.p>
          </>
        )}
      </div>

      {/* Right Column - Booking Summary */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-1"
      >
        <div className="sticky top-24 bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>

          {/* Session Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Date</span>
              <span className="text-white">{formatDate(bookingData.selectedDate)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Time</span>
              <span className="text-white">{bookingData.selectedTime || 'Not selected'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Duration</span>
              <span className="text-white">{bookingData.sessionDuration} hour(s)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">People</span>
              <span className="text-white">{bookingData.peopleCount}</span>
            </div>
          </div>

          <div className="border-t border-white/10 my-4" />

          {/* Package */}
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Package</span>
              <span className="text-ecospace-green font-semibold">
                {bookingData.selectedService?.price} AED
              </span>
            </div>
            <p className="text-white font-medium">{bookingData.selectedService?.name}</p>
          </div>

          {/* Add-ons */}
          {selectedServices.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Add-ons</p>
              {selectedServices.map(serviceSlug => {
                const service = additionalServices.find(s => s.slug === serviceSlug);
                return (
                  <div key={serviceSlug} className="flex justify-between text-sm py-1">
                    <span className="text-gray-300">{service?.name}</span>
                    <span className="text-white">+{service?.price} AED</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="border-t border-white/10 my-4" />

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-white">Total</span>
            <span className="text-2xl font-bold text-ecospace-green">{calculateTotal()} AED</span>
          </div>

          {/* Payment Note */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-gray-400 text-sm">
              💳 <span className="text-white">Pay at studio</span> — Cash or card accepted. No online payment required.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <button
              onClick={nextStep}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-ecospace-green text-black hover:bg-ecospace-green/90 transition-all flex items-center justify-center gap-2"
            >
              Continue to Checkout
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={prevStep}
              className="w-full py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
