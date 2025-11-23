'use client';

import { useState } from 'react';
import { BookingStep1 } from '@/components/booking/BookingStep1';
import { BookingStep2 } from '@/components/booking/BookingStep2';
import { BookingStep3 } from '@/components/booking/BookingStep3';
import { BookingStep4 } from '@/components/booking/BookingStep4';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBooking, type BookingData } from '@/contexts/BookingContext';

export default function BookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { bookingData, updateBookingData } = useBooking();

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Navigate to checkout
      router.push('/checkout');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep || step === 1) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Progress Header */}
      <div className="border-b border-white/10 bg-black/95 backdrop-blur-md flex-shrink-0">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Logo/Brand - Hidden on mobile, show on md+ */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-ecospace-green flex items-center justify-center">
                <span className="text-black font-bold text-sm">ES</span>
              </div>
              <h1 className="text-white font-bold text-lg">Book a Session</h1>
            </div>

            {/* Mobile: Close button on left */}
            <button
              onClick={() => router.push('/')}
              className="md:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Progress Steps - Responsive */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
              <StepIndicator
                number={1}
                label="Date & time"
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
                onClick={() => goToStep(1)}
              />
              <StepIndicator
                number={2}
                label="Setup"
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
                onClick={() => goToStep(2)}
              />
              <StepIndicator
                number={3}
                label="Service"
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
                onClick={() => goToStep(3)}
              />
              <StepIndicator
                number={4}
                label="Extras"
                isActive={currentStep === 4}
                isCompleted={false}
                onClick={() => goToStep(4)}
              />
            </div>

            {/* Close Button - Desktop only */}
            <button
              onClick={() => router.push('/')}
              className="hidden md:flex w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="container mx-auto px-4 lg:px-8 py-6 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <BookingStep1
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
              />
            )}
            {currentStep === 2 && (
              <BookingStep2
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {currentStep === 3 && (
              <BookingStep3
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {currentStep === 4 && (
              <BookingStep4
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  number: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

function StepIndicator({
  number,
  label,
  isActive,
  isCompleted,
  onClick,
}: StepIndicatorProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 sm:gap-2 transition-all ${
        isActive || isCompleted ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
      }`}
      disabled={!isActive && !isCompleted}
    >
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
          isCompleted
            ? 'bg-ecospace-green text-black'
            : isActive
            ? 'bg-ecospace-green text-black'
            : 'bg-white/10 text-gray-500'
        }`}
      >
        {isCompleted ? '✓' : number}
      </div>
      <span
        className={`hidden sm:block font-medium text-xs sm:text-sm ${
          isActive ? 'text-ecospace-green' : isCompleted ? 'text-white' : 'text-gray-500'
        }`}
      >
        {label}
      </span>
    </button>
  );
}
