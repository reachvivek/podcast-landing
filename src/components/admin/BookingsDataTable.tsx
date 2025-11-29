'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

interface BookingsDataTableProps {
  bookings: Booking[];
  loading: boolean;
  onViewBooking: (booking: Booking) => void;
  onStatusChange: (bookingId: string, status: string) => void;
  onCancelBooking: (bookingId: string) => void;
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

export function BookingsDataTable({
  bookings,
  loading,
  onViewBooking,
  onStatusChange,
  onCancelBooking,
}: BookingsDataTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [timePeriod, setTimePeriod] = useState<'upcoming' | 'previous' | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    // Search filter
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerPhone.includes(searchQuery);

    // Status filter
    const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter;

    // Time period filter
    const bookingDate = new Date(booking.selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let matchesTimePeriod = true;
    if (timePeriod === 'upcoming') {
      matchesTimePeriod = bookingDate >= today;
    } else if (timePeriod === 'previous') {
      matchesTimePeriod = bookingDate < today;
    }

    return matchesSearch && matchesStatus && matchesTimePeriod;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-900 border border-gray-800 rounded-2xl">
        <div className="w-8 h-8 border-2 border-ecospace-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Time Period Tabs */}
      <div className="flex gap-2 bg-gray-900 border border-gray-800 rounded-xl p-1">
        <button
          onClick={() => {
            setTimePeriod('all');
            setCurrentPage(1);
          }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-light transition-colors ${
            timePeriod === 'all'
              ? 'bg-ecospace-green text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          All Bookings
        </button>
        <button
          onClick={() => {
            setTimePeriod('upcoming');
            setCurrentPage(1);
          }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-light transition-colors ${
            timePeriod === 'upcoming'
              ? 'bg-ecospace-green text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => {
            setTimePeriod('previous');
            setCurrentPage(1);
          }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-light transition-colors ${
            timePeriod === 'previous'
              ? 'bg-ecospace-green text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Previous
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green/50"
          />
        </div>

        {/* Status Filter */}
        <div className="relative min-w-[200px]">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none w-full px-4 py-3 pr-10 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50 cursor-pointer font-light"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No Show</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-400 font-light">
        <span>
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredBookings.length)}{' '}
          of {filteredBookings.length} bookings
        </span>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {paginatedBookings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400 font-light">Customer</TableHead>
                <TableHead className="text-gray-400 font-light">Date & Time</TableHead>
                <TableHead className="text-gray-400 font-light">Service</TableHead>
                <TableHead className="text-gray-400 font-light">Amount</TableHead>
                <TableHead className="text-gray-400 font-light">Status</TableHead>
                <TableHead className="text-gray-400 font-light">Payment</TableHead>
                <TableHead className="text-gray-400 font-light text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <TableCell>
                    <div>
                      <p className="text-white font-light">{booking.customerName}</p>
                      <p className="text-gray-500 text-sm">{booking.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white font-light">
                        {new Date(booking.selectedDate).toLocaleDateString('en-AE', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-gray-500 text-sm">{booking.selectedTime}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-white font-light">
                      {booking.selectedService?.name || 'N/A'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {booking.sessionDuration}h • {booking.peopleCount} people
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-white font-light">{booking.totalPrice} AED</p>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs border font-light ${
                        statusColors[booking.status as keyof typeof statusColors]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-light ${
                        paymentColors[booking.paymentStatus as keyof typeof paymentColors]
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewBooking(booking)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowActionMenu(showActionMenu === booking.id ? null : booking.id)
                          }
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                          title="More Actions"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {showActionMenu === booking.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setShowActionMenu(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden">
                              {booking.status === 'PENDING' && (
                                <button
                                  onClick={() => {
                                    onStatusChange(booking.id, 'CONFIRMED');
                                    setShowActionMenu(null);
                                  }}
                                  className="w-full px-4 py-3 text-left text-sm text-white hover:bg-gray-700 transition-colors font-light"
                                >
                                  Confirm Booking
                                </button>
                              )}
                              {booking.status === 'CONFIRMED' && (
                                <button
                                  onClick={() => {
                                    onStatusChange(booking.id, 'COMPLETED');
                                    setShowActionMenu(null);
                                  }}
                                  className="w-full px-4 py-3 text-left text-sm text-white hover:bg-gray-700 transition-colors font-light"
                                >
                                  Mark Completed
                                </button>
                              )}
                              {booking.status !== 'CANCELLED' &&
                                booking.status !== 'COMPLETED' && (
                                  <button
                                    onClick={() => {
                                      onCancelBooking(booking.id);
                                      setShowActionMenu(null);
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-gray-700 transition-colors font-light"
                                  >
                                    Cancel Booking
                                  </button>
                                )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16">
            <CalendarIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-white font-light mb-2">No bookings found</p>
            <p className="text-gray-500 text-sm">
              {searchQuery || statusFilter !== 'ALL'
                ? 'Try adjusting your filters'
                : 'Bookings will appear here'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors font-light"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-light transition-colors ${
                  page === currentPage
                    ? 'bg-ecospace-green text-black'
                    : 'bg-gray-900 text-white border border-gray-800 hover:bg-gray-800'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors font-light"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
