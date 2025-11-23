'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Search,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  X,
  Phone,
  Mail,
  User,
  CreditCard,
  FileText,
} from 'lucide-react';

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

const statusColors = {
  PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  CONFIRMED: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  IN_PROGRESS: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  COMPLETED: 'bg-green-500/10 text-green-500 border-green-500/20',
  CANCELLED: 'bg-red-500/10 text-red-500 border-red-500/20',
  NO_SHOW: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

const paymentColors = {
  UNPAID: 'bg-red-500/10 text-red-500',
  PAID: 'bg-green-500/10 text-green-500',
  REFUNDED: 'bg-gray-500/10 text-gray-500',
  PARTIAL: 'bg-yellow-500/10 text-yellow-500',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showStatusMenu, setShowStatusMenu] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/bookings?${params}`);
      const data = await response.json();

      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

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
        setShowStatusMenu(null);
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

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerPhone.includes(searchQuery)
  );

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
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green/50"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none px-4 py-3 pr-10 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50 cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-ecospace-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-light text-sm">
                    Customer
                  </th>
                  <th className="text-left p-4 text-gray-400 font-light text-sm">
                    Date & Time
                  </th>
                  <th className="text-left p-4 text-gray-400 font-light text-sm">
                    Service
                  </th>
                  <th className="text-left p-4 text-gray-400 font-light text-sm">
                    Amount
                  </th>
                  <th className="text-left p-4 text-gray-400 font-light text-sm">
                    Status
                  </th>
                  <th className="text-left p-4 text-gray-400 font-light text-sm">
                    Payment
                  </th>
                  <th className="text-right p-4 text-gray-400 font-light text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="text-white font-light">
                          {booking.customerName}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {booking.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white font-light">
                          {new Date(booking.selectedDate).toLocaleDateString(
                            'en-AE',
                            {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {booking.selectedTime}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white font-light">
                        {booking.selectedService?.name || 'N/A'}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {booking.sessionDuration}h • {booking.peopleCount} people
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-white font-light">
                        {booking.totalPrice} AED
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs border ${
                          statusColors[booking.status as keyof typeof statusColors]
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs ${
                          paymentColors[booking.paymentStatus as keyof typeof paymentColors]
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowStatusMenu(
                                showStatusMenu === booking.id ? null : booking.id
                              )
                            }
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {showStatusMenu === booking.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-10 overflow-hidden">
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, 'CONFIRMED')
                                }
                                className="w-full px-4 py-3 text-left text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, 'COMPLETED')
                                }
                                className="w-full px-4 py-3 text-left text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Mark Completed
                              </button>
                              <button
                                onClick={() => cancelBooking(booking.id)}
                                className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Cancel Booking
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-white font-light mb-2">No bookings found</p>
            <p className="text-gray-500 text-sm">
              {searchQuery || statusFilter
                ? 'Try adjusting your filters'
                : 'Bookings will appear here'}
            </p>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-xl text-white font-light">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-gray-400 text-sm mb-3">Customer Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-ecospace-green" />
                    <span className="text-white">{selectedBooking.customerName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-ecospace-green" />
                    <span className="text-white">{selectedBooking.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-ecospace-green" />
                    <span className="text-white">{selectedBooking.customerPhone}</span>
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div>
                <h4 className="text-gray-400 text-sm mb-3">Session Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white">
                      {new Date(selectedBooking.selectedDate).toLocaleDateString(
                        'en-AE',
                        {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="text-white">{selectedBooking.selectedTime}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white">{selectedBooking.sessionDuration} hours</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm">People</p>
                    <p className="text-white">{selectedBooking.peopleCount}</p>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h4 className="text-gray-400 text-sm mb-3">Service</h4>
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">
                        {selectedBooking.selectedService?.name || 'N/A'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Setup: {selectedBooking.selectedSetup}
                      </p>
                    </div>
                    <p className="text-ecospace-green font-light">
                      {selectedBooking.totalPrice} AED
                    </p>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div>
                  <h4 className="text-gray-400 text-sm mb-3">Special Requests</h4>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-white">{selectedBooking.specialRequests}</p>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm border ${
                    statusColors[selectedBooking.status as keyof typeof statusColors]
                  }`}
                >
                  {selectedBooking.status}
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    paymentColors[selectedBooking.paymentStatus as keyof typeof paymentColors]
                  }`}
                >
                  {selectedBooking.paymentStatus}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                {selectedBooking.status === 'PENDING' && (
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'CONFIRMED');
                      setSelectedBooking(null);
                    }}
                    className="flex-1 px-4 py-3 bg-ecospace-green text-black rounded-xl font-light hover:bg-ecospace-green/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm Booking
                  </button>
                )}
                {selectedBooking.status !== 'CANCELLED' &&
                  selectedBooking.status !== 'COMPLETED' && (
                    <button
                      onClick={() => {
                        cancelBooking(selectedBooking.id);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-light hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel Booking
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
