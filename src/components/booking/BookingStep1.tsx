'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ChevronLeft, ChevronRight, Calendar, Check } from 'lucide-react';
import type { BookingData } from '@/contexts/BookingContext';

interface BookingStep1Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
}

const timeSlots = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00'
];

const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const days: (number | null)[] = [];
  for (let i = 0; i < startingDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
};

const isPastDate = (year: number, month: number, day: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
};

// Returns available time slots, filtering out past times for today
const getAvailableTimeSlots = (selectedDate: Date | undefined) => {
  if (!selectedDate) return timeSlots;

  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(selectedDate);
  selected.setHours(0, 0, 0, 0);

  // If selected date is today, filter out past times and add 2-3 hour buffer
  if (selected.getTime() === today.getTime()) {
    const bufferHours = 2; // Minimum 2 hour buffer for today
    const minTime = new Date(now.getTime() + bufferHours * 60 * 60 * 1000);
    const minHour = minTime.getHours();

    return timeSlots.filter(slot => {
      const slotHour = Number.parseInt(slot.split(':')[0]);
      return slotHour >= minHour;
    });
  }

  return timeSlots;
};

type Step = 'people' | 'duration' | 'date' | 'time';

export function BookingStep1({ bookingData, updateBookingData, nextStep }: BookingStep1Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentStep, setCurrentStep] = useState<Step>('people');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = generateCalendarDays(currentYear, currentMonth);
  const availableTimeSlots = getAvailableTimeSlots(bookingData.selectedDate);

  const handlePeopleSelect = (count: number) => {
    updateBookingData({ peopleCount: count });
    setTimeout(() => setCurrentStep('duration'), 300);
  };

  const handleDurationSelect = (duration: number) => {
    updateBookingData({ sessionDuration: duration });
    setTimeout(() => setCurrentStep('date'), 300);
  };

  const handleDateSelect = (day: number) => {
    if (isPastDate(currentYear, currentMonth, day)) return;
    updateBookingData({ selectedDate: new Date(currentYear, currentMonth, day) });
    setTimeout(() => setCurrentStep('time'), 300);
  };

  const handleTimeSelect = (time: string) => {
    updateBookingData({ selectedTime: time });
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Completed items component
  const CompletedItem = ({ icon: Icon, text, onClick }: { icon: React.ComponentType<{ className?: string }>; text: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-left w-full p-3 rounded-xl bg-ecospace-green/10 border border-ecospace-green/30 hover:bg-ecospace-green/20 transition-all mb-4 group"
    >
      <div className="w-6 h-6 rounded-full bg-ecospace-green flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 text-black" />
      </div>
      <div className="flex items-center gap-2 flex-1">
        <Icon className="w-4 h-4 text-ecospace-green" />
        <span className="text-white">{text}</span>
      </div>
      <span className="text-gray-500 text-sm group-hover:text-ecospace-green transition-colors">Edit</span>
    </button>
  );

  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {/* Step 1: Number of People */}
        {currentStep === 'people' && (
          <motion.div
            key="people"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-1 text-center">Book Your Session</h2>
            <p className="text-gray-400 text-sm mb-6 text-center">Let's start with the basics</p>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-ecospace-green" />
                <h3 className="text-lg font-semibold text-white">How many people?</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Select the number of guests</p>

              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    onClick={() => handlePeopleSelect(count)}
                    className="py-4 rounded-xl font-bold text-xl bg-white/10 text-white hover:bg-ecospace-green hover:text-black border border-white/10 transition-all hover:scale-105"
                  >
                    {count}{count === 5 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Duration */}
        {currentStep === 'duration' && (
          <motion.div
            key="duration"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CompletedItem
              icon={Users}
              text={`${bookingData.peopleCount} ${bookingData.peopleCount === 1 ? 'person' : 'people'}`}
              onClick={() => setCurrentStep('people')}
            />

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-ecospace-green" />
                <h3 className="text-lg font-semibold text-white">Session Duration</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">How long do you need the studio?</p>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => handleDurationSelect(hours)}
                    className="py-4 rounded-xl font-bold text-lg bg-white/10 text-white hover:bg-ecospace-green hover:text-black border border-white/10 transition-all hover:scale-105"
                  >
                    {hours}h{hours === 4 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Date */}
        {currentStep === 'date' && (
          <motion.div
            key="date"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CompletedItem
              icon={Users}
              text={`${bookingData.peopleCount} ${bookingData.peopleCount === 1 ? 'person' : 'people'}`}
              onClick={() => setCurrentStep('people')}
            />
            <CompletedItem
              icon={Clock}
              text={`${bookingData.sessionDuration}h session`}
              onClick={() => setCurrentStep('duration')}
            />

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3">
                <button onClick={goToPrevMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="text-base font-semibold text-white">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button onClick={goToNextMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={`weekday-${day}-${i}`} className="text-center text-gray-500 text-xs py-1">{day}</div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0.5">
                {days.map((day, index) => {
                  if (day === null) return <div key={`empty-${index}`} className="aspect-square" />;

                  const isPast = isPastDate(currentYear, currentMonth, day);
                  const isDisabled = isPast;
                  const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-all ${
                        isDisabled
                          ? 'text-gray-600 cursor-not-allowed'
                          : isToday
                          ? 'bg-white/20 text-white hover:bg-ecospace-green hover:text-black'
                          : 'text-white hover:bg-ecospace-green hover:text-black'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Time */}
        {currentStep === 'time' && (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CompletedItem
              icon={Users}
              text={`${bookingData.peopleCount} ${bookingData.peopleCount === 1 ? 'person' : 'people'}`}
              onClick={() => setCurrentStep('people')}
            />
            <CompletedItem
              icon={Clock}
              text={`${bookingData.sessionDuration}h session`}
              onClick={() => setCurrentStep('duration')}
            />
            <CompletedItem
              icon={Calendar}
              text={bookingData.selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) || ''}
              onClick={() => setCurrentStep('date')}
            />

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-ecospace-green" />
                <h3 className="text-base font-semibold text-white">Select a time</h3>
              </div>

              {availableTimeSlots.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  No available time slots for today. Please select a future date.
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-1.5">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        bookingData.selectedTime === time
                          ? 'bg-ecospace-green text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}

              {bookingData.selectedTime && availableTimeSlots.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextStep}
                  className="w-full mt-4 py-3 rounded-xl font-semibold bg-ecospace-green text-black hover:bg-ecospace-green/90 transition-all flex items-center justify-center gap-2"
                >
                  Continue to Setup
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
