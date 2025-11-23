'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Film, Palette, Clock, Music, Users } from 'lucide-react';
import type { BookingData } from '@/app/book/page';

interface BookingStep4Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const additionalServices = [
  {
    id: 'extra-camera',
    name: 'Extra Camera Angle',
    price: 200,
    description: 'Add a third camera for more dynamic shots',
    icon: Camera
  },
  {
    id: 'social-reels',
    name: 'Social Media Clips',
    price: 200,
    description: '5 short clips optimized for social media',
    icon: Film
  },
  {
    id: 'thumbnail-design',
    name: 'Thumbnail Design',
    price: 150,
    description: 'Professional cover art for your episode',
    icon: Palette
  },
  {
    id: 'extra-hour',
    name: 'Extra Studio Hour',
    price: 150,
    description: 'Extend your session by 1 hour',
    icon: Clock
  },
  {
    id: 'custom-intro',
    name: 'Custom Intro/Outro',
    price: 300,
    description: 'Branded intro and outro music',
    icon: Music
  },
  {
    id: 'extra-guest',
    name: 'Additional Guest Mic',
    price: 100,
    description: 'Extra microphone setup for more guests',
    icon: Users
  }
];

export function BookingStep4({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep4Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>(bookingData.additionalServices || []);

  const toggleService = (serviceId: string) => {
    const newServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];

    setSelectedServices(newServices);
    updateBookingData({ additionalServices: newServices });
  };

  const calculateTotal = () => {
    const basePrice = bookingData.selectedService?.price || 0;
    const addonsTotal = selectedServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            const isSelected = selectedServices.includes(service.id);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => toggleService(service.id)}
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
              {selectedServices.map(serviceId => {
                const service = additionalServices.find(s => s.id === serviceId);
                return (
                  <div key={serviceId} className="flex justify-between text-sm py-1">
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
