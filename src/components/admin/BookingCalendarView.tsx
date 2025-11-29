'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, DollarSign } from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  selectedTime: string;
  sessionDuration: number;
  totalPrice: number;
  status: string;
  selectedService: { name?: string };
}

interface TimeSlot {
  time: string;
  booking?: Booking;
  isAvailable: boolean;
}

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
];

const STATUS_COLORS = {
  PENDING: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
  CONFIRMED: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
  IN_PROGRESS: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
  COMPLETED: 'bg-green-500/20 border-green-500/40 text-green-400',
  CANCELLED: 'bg-red-500/20 border-red-500/40 text-red-400',
};

export function BookingCalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingsForDate(selectedDate);
  }, [selectedDate]);

  const fetchBookingsForDate = async (date: Date) => {
    try {
      setLoading(true);
      const dateStr = date.toISOString().split('T')[0];
      const response = await fetch(`/api/bookings?date=${dateStr}`);
      const data = await response.json();

      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const getBookingForSlot = (time: string): Booking | undefined => {
    return bookings.find(booking => {
      const bookingTime = booking.selectedTime;
      return bookingTime === time || bookingTime.startsWith(time);
    });
  };

  const generateTimeSlots = (): TimeSlot[] => {
    return TIME_SLOTS.map(time => {
      const booking = getBookingForSlot(time);
      return {
        time,
        booking,
        isAvailable: !booking || booking.status === 'CANCELLED'
      };
    });
  };

  const timeSlots = generateTimeSlots();
  const bookedCount = timeSlots.filter(slot => !slot.isAvailable).length;
  const availableCount = TIME_SLOTS.length - bookedCount;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => changeDate(-1)}
            className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col">
            <h2 className="text-xl text-white font-light">
              {formatDate(selectedDate)}
            </h2>
            <p className="text-sm text-gray-400">
              {bookedCount} booked • {availableCount} available
            </p>
          </div>

          <button
            onClick={() => changeDate(1)}
            className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {!isToday && (
          <button
            onClick={goToToday}
            className="px-4 py-2 rounded-xl bg-ecospace-green text-black hover:bg-ecospace-green/90 transition-colors font-light text-sm"
          >
            Today
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-ecospace-green/10 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-ecospace-green" />
            </div>
            <div>
              <p className="text-2xl text-white font-light">{TIME_SLOTS.length}</p>
              <p className="text-gray-400 text-sm">Total Slots</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl text-white font-light">{bookedCount}</p>
              <p className="text-gray-400 text-sm">Booked</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <User className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl text-white font-light">{availableCount}</p>
              <p className="text-gray-400 text-sm">Available</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl text-white font-light">
                {bookings.reduce((sum, b) => sum + b.totalPrice, 0)}
              </p>
              <p className="text-gray-400 text-sm">Revenue (AED)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-ecospace-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {timeSlots.map((slot) => (
            <div
              key={slot.time}
              className={`p-4 rounded-xl border-2 transition-all ${
                slot.isAvailable
                  ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  : STATUS_COLORS[slot.booking!.status as keyof typeof STATUS_COLORS] || 'bg-gray-800 border-gray-700'
              }`}
            >
              {/* Time Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-medium">{slot.time}</span>
                </div>
                {slot.isAvailable ? (
                  <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                    Available
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                    Booked
                  </span>
                )}
              </div>

              {/* Booking Details */}
              {slot.booking && !slot.isAvailable ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{slot.booking.customerName}</p>
                      <p className="text-gray-400 text-xs truncate">{slot.booking.selectedService?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <span className="text-gray-400 text-xs">
                      {slot.booking.sessionDuration}h session
                    </span>
                    <span className="text-ecospace-green text-sm font-medium">
                      {slot.booking.totalPrice} AED
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      STATUS_COLORS[slot.booking.status as keyof typeof STATUS_COLORS]
                    }`}>
                      {slot.booking.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-6 text-gray-500 text-sm">
                  No booking
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500/20 border-2 border-green-500/40" />
          <span className="text-gray-400 text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500/20 border-2 border-yellow-500/40" />
          <span className="text-gray-400 text-sm">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500/20 border-2 border-blue-500/40" />
          <span className="text-gray-400 text-sm">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500/20 border-2 border-purple-500/40" />
          <span className="text-gray-400 text-sm">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500/20 border-2 border-green-500/40" />
          <span className="text-gray-400 text-sm">Completed</span>
        </div>
      </div>
    </div>
  );
}
