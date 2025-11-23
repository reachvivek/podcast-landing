'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    recentBookings: number;
    totalRevenue: number;
  };
  upcomingBookings: Array<{
    id: string;
    customerName: string;
    selectedDate: string;
    selectedTime: string;
    status: string;
    totalPrice: number;
  }>;
}

const statusColors = {
  PENDING: 'bg-yellow-500/10 text-yellow-500',
  CONFIRMED: 'bg-blue-500/10 text-blue-500',
  IN_PROGRESS: 'bg-purple-500/10 text-purple-500',
  COMPLETED: 'bg-green-500/10 text-green-500',
  CANCELLED: 'bg-red-500/10 text-red-500',
  NO_SHOW: 'bg-gray-500/10 text-gray-500',
};

const statusIcons = {
  PENDING: AlertCircle,
  CONFIRMED: CheckCircle,
  COMPLETED: CheckCircle,
  CANCELLED: XCircle,
};

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = analytics
    ? [
        {
          name: 'Total Bookings',
          value: analytics.overview.totalBookings,
          icon: Calendar,
          color: 'text-ecospace-green',
          bgColor: 'bg-ecospace-green/10',
        },
        {
          name: 'Pending',
          value: analytics.overview.pendingBookings,
          icon: Clock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
        },
        {
          name: 'Completed',
          value: analytics.overview.completedBookings,
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
        },
        {
          name: 'Total Revenue',
          value: `${analytics.overview.totalRevenue.toLocaleString()} AED`,
          icon: DollarSign,
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-ecospace-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-white font-light">
            Dashboard
          </h1>
          <p className="text-gray-400 font-light mt-1">
            Welcome back! Here's what's happening with your studio.
          </p>
        </div>
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ecospace-green text-black rounded-xl font-light hover:bg-ecospace-green/90 transition-colors"
        >
          View All Bookings
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-light">{stat.name}</p>
                <p className="text-white text-2xl font-light">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Status Breakdown */}
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <h3 className="text-white font-light mb-4">Booking Status</h3>
          <div className="space-y-3">
            {analytics && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-light">Confirmed</span>
                  <span className="text-blue-500">{analytics.overview.confirmedBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-light">Pending</span>
                  <span className="text-yellow-500">{analytics.overview.pendingBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-light">Completed</span>
                  <span className="text-green-500">{analytics.overview.completedBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-light">Cancelled</span>
                  <span className="text-red-500">{analytics.overview.cancelledBookings}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-light">Upcoming Bookings</h3>
            <Link
              href="/admin/bookings"
              className="text-ecospace-green text-sm font-light hover:underline"
            >
              View All
            </Link>
          </div>

          {analytics?.upcomingBookings && analytics.upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {analytics.upcomingBookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-ecospace-green/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-ecospace-green" />
                    </div>
                    <div>
                      <p className="text-white font-light">{booking.customerName}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(booking.selectedDate).toLocaleDateString('en-AE', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        at {booking.selectedTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs ${
                        statusColors[booking.status as keyof typeof statusColors]
                      }`}
                    >
                      {booking.status}
                    </span>
                    <p className="text-gray-400 text-sm mt-1">
                      {booking.totalPrice} AED
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-light">No upcoming bookings</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h3 className="text-white font-light mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/bookings?status=PENDING"
            className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 hover:border-yellow-500/50 transition-colors text-center"
          >
            <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-white font-light text-sm">Pending Bookings</p>
          </Link>
          <Link
            href="/admin/bookings?status=CONFIRMED"
            className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-colors text-center"
          >
            <CheckCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-white font-light text-sm">Confirmed Today</p>
          </Link>
          <Link
            href="/admin/analytics"
            className="p-4 rounded-xl bg-ecospace-green/10 border border-ecospace-green/20 hover:border-ecospace-green/50 transition-colors text-center"
          >
            <TrendingUp className="w-6 h-6 text-ecospace-green mx-auto mb-2" />
            <p className="text-white font-light text-sm">View Analytics</p>
          </Link>
          <Link
            href="/admin/messages"
            className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-colors text-center"
          >
            <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-white font-light text-sm">Messages</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
