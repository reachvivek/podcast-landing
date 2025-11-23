'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface BookingData {
  sessionDuration: number;
  peopleCount: number;
  selectedDate?: Date;
  selectedTime?: string;
  selectedSetup?: string;
  selectedService?: {
    id: string;
    name: string;
    price: number;
  };
  additionalServices: string[];
}

export type { BookingData as BookingFormData };

export interface BookingContextType {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  resetBookingData: () => void;
  calculateAddonsTotal: () => number;
  calculateTotal: () => number;
}

const initialBookingData: BookingData = {
  sessionDuration: 1,
  peopleCount: 2,
  additionalServices: [],
};

const additionalServicesData = [
  { id: 'extra-camera', name: 'Extra Camera Angle', price: 200 },
  { id: 'social-reels', name: 'Social Media Clips', price: 200 },
  { id: 'thumbnail-design', name: 'Thumbnail Design', price: 150 },
  { id: 'extra-hour', name: 'Extra Studio Hour', price: 150 },
  { id: 'custom-intro', name: 'Custom Intro/Outro', price: 300 },
  { id: 'extra-guest', name: 'Additional Guest Mic', price: 100 },
];

export const additionalServicesConfig = additionalServicesData;

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const resetBookingData = () => {
    setBookingData(initialBookingData);
  };

  const calculateAddonsTotal = () => {
    return bookingData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServicesData.find((s) => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const calculateTotal = () => {
    const basePrice = bookingData.selectedService?.price || 0;
    return basePrice + calculateAddonsTotal();
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBookingData,
        resetBookingData,
        calculateAddonsTotal,
        calculateTotal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
