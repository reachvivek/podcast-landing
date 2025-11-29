'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  LayoutGrid,
  List,
} from 'lucide-react';
import { BookingCalendarView } from '@/components/admin/BookingCalendarView';
import { BookingsDataTable } from '@/components/admin/BookingsDataTable';
import { BookingDetailsModal } from '@/components/admin/BookingDetailsModal';

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedDate: string;
  selectedTime: string;
  sessionDuration: number;
  peopleCount: number;
  selectedSetup: string;
  selectedService: { name?: string; price?: number };
  additionalServices: string[];
  totalPrice: number;
  status: string;
  paymentStatus: string;
  specialRequests?: string;
  createdAt: string;
}

export default function BookingsPage() {
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings');
      const data = await response.json();

      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const modifyBooking = async (bookingId: string, data: Partial<Booking>) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Failed to modify booking:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-white font-light">Bookings</h1>
          <p className="text-gray-400 font-light mt-1">
            Manage all studio bookings
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-gray-900 border border-gray-800 rounded-xl p-1">
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'calendar'
                ? 'bg-ecospace-green text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-sm font-light">Calendar</span>
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'list'
                ? 'bg-ecospace-green text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm font-light">List</span>
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'calendar' ? (
        <BookingCalendarView />
      ) : (
        <BookingsDataTable
          bookings={bookings}
          loading={loading}
          onViewBooking={setSelectedBooking}
          onStatusChange={updateBookingStatus}
          onCancelBooking={cancelBooking}
        />
      )}

      {/* Booking Detail Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onStatusChange={updateBookingStatus}
        onCancel={cancelBooking}
        onModify={modifyBooking}
      />
    </div>
  );
}
