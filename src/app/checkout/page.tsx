'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Check,
  Loader2,
  MessageCircle,
  CreditCard,
  Banknote,
  Smartphone
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock booking data - in real app, this would come from context/state management
const mockBookingData = {
  selectedDate: new Date(2025, 11, 25),
  selectedTime: '10:00',
  sessionDuration: 2,
  peopleCount: 2,
  selectedSetup: 'video-2cam',
  selectedService: {
    id: 'podcast-editing',
    name: 'Podcast + Editing',
    price: 750
  },
  additionalServices: ['extra-camera', 'thumbnail-design']
};

const additionalServicesData = [
  { id: 'extra-camera', name: 'Extra Camera Angle', price: 200 },
  { id: 'social-reels', name: 'Social Media Clips', price: 200 },
  { id: 'thumbnail-design', name: 'Thumbnail Design', price: 150 },
  { id: 'extra-hour', name: 'Extra Studio Hour', price: 150 },
  { id: 'custom-intro', name: 'Custom Intro/Outro', price: 300 },
  { id: 'extra-guest', name: 'Additional Guest Mic', price: 100 }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    agreeTerms: false
  });

  const bookingData = mockBookingData;

  const calculateAddonsTotal = () => {
    return bookingData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServicesData.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const calculateTotal = () => {
    return bookingData.selectedService.price + calculateAddonsTotal();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-ecospace-green rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h1>
          <p className="text-gray-400 mb-8">
            Thank you for your booking! We've sent a confirmation email to {formData.email}.
            You'll also receive a WhatsApp message with your booking details.
          </p>

          <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left border border-white/10">
            <h2 className="font-semibold text-white mb-4">Booking Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Booking ID</span>
                <span className="text-white font-mono">ESC-2025-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span className="text-white">{formatDate(bookingData.selectedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time</span>
                <span className="text-white">{bookingData.selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Package</span>
                <span className="text-white">{bookingData.selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-ecospace-green font-bold">{calculateTotal()} AED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment</span>
                <span className="text-white">Pay at Studio</span>
              </div>
            </div>
          </div>

          <div className="bg-ecospace-green/10 rounded-xl p-4 mb-8 border border-ecospace-green/20">
            <p className="text-ecospace-green text-sm">
              📍 <strong>Location:</strong> Dubai World Trade Center, Sheikh Rashid Tower
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/')}
              className="w-full py-4 rounded-xl font-semibold bg-ecospace-green text-black hover:bg-ecospace-green/90 transition-all"
            >
              Back to Home
            </button>
            <a
              href="https://wa.me/971502060674"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Message Us on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/95 backdrop-blur-md flex-shrink-0">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white hover:text-ecospace-green transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-white font-bold text-lg">Checkout</h1>
            <div className="w-16" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Your Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-xl font-bold text-white mb-5">Your Details</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-ecospace-green focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-ecospace-green focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-ecospace-green focus:outline-none transition-colors"
                        placeholder="+971-50-1234567"
                      />
                    </div>
                  </div>
                </form>
              </motion.div>

              {/* Payment Info & Location - Combined Row */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Pay at Studio */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white/5 rounded-2xl p-5 border border-white/10"
                >
                  <h3 className="text-base font-semibold text-white mb-3">Pay at Studio</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-1">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-ecospace-green" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Banknote className="w-5 h-5 text-ecospace-green" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-ecospace-green" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">Card, Cash, or Apple Pay</p>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 rounded-2xl p-5 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-ecospace-green/20 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-ecospace-green" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-white">EcoSpace Studio</p>
                      <p className="text-gray-400 text-sm truncate">Dubai WTC, Sheikh Rashid Tower</p>
                      <a
                        href="https://maps.app.goo.gl/oPW2rk1rMi5g2UHN7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ecospace-green text-sm hover:underline"
                      >
                        View Map →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Terms & Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="flex items-start gap-3 cursor-pointer mb-5">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded border-white/30 bg-white/5 text-ecospace-green focus:ring-ecospace-green focus:ring-offset-0"
                  />
                  <span className="text-gray-400 text-sm leading-relaxed">
                    I agree to the <a href="#" className="text-ecospace-green hover:underline">Terms</a> and{' '}
                    <a href="#" className="text-ecospace-green hover:underline">Privacy Policy</a>. Payment due at studio.
                  </span>
                </label>

                <button
                  onClick={handleSubmit}
                  disabled={!formData.fullName || !formData.email || !formData.phone || !formData.agreeTerms || isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                    formData.fullName && formData.email && formData.phone && formData.agreeTerms && !isSubmitting
                      ? 'bg-ecospace-green text-black hover:bg-ecospace-green/90'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Booking
                      <Check className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            </div>

            {/* Right Column - Booking Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-5">Booking Summary</h3>

                {/* Session Details */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    <span className="text-white">{formatDate(bookingData.selectedDate)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    <span className="text-white">{bookingData.selectedTime} • {bookingData.sessionDuration}h session</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    <span className="text-white">{bookingData.peopleCount} people</span>
                  </div>
                </div>

                <div className="border-t border-white/10 my-4" />

                {/* Package */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Package</span>
                    <span className="text-white">{bookingData.selectedService.price} AED</span>
                  </div>
                  <p className="text-white font-medium">{bookingData.selectedService.name}</p>
                </div>

                {/* Add-ons */}
                {bookingData.additionalServices.length > 0 && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Add-ons</p>
                    {bookingData.additionalServices.map(serviceId => {
                      const service = additionalServicesData.find(s => s.id === serviceId);
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
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-ecospace-green">{calculateTotal()} AED</span>
                </div>

                <p className="text-gray-500 text-sm">
                  Pay at studio • No online payment
                </p>

                {/* Need Help */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-sm mb-3">Need help?</p>
                  <div className="flex gap-3">
                    <a
                      href="tel:+971502060674"
                      className="flex-1 py-2.5 rounded-xl bg-white/5 text-center text-sm text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                    <a
                      href="https://wa.me/971502060674"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-white/5 text-center text-sm text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
