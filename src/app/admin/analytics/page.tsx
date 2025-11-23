'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Package,
  BarChart3,
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
  bookingsByDate: Array<{
    date: string;
    count: number;
  }>;
  popularServices: Array<{
    name: string;
    count: number;
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState('30');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?period=${period}`);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-800 border-t-ecospace-green animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-ecospace-green rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const stats = analytics
    ? [
        {
          name: 'Total Revenue',
          value: `${analytics.overview.totalRevenue.toLocaleString()} AED`,
          change: '+12.5%',
          trend: 'up',
          icon: DollarSign,
          color: 'text-ecospace-green',
          bgColor: 'bg-ecospace-green/10',
        },
        {
          name: 'Total Bookings',
          value: analytics.overview.totalBookings,
          change: '+8.2%',
          trend: 'up',
          icon: Calendar,
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
        },
        {
          name: 'Recent Bookings',
          value: analytics.overview.recentBookings,
          subtext: `Last ${period} days`,
          icon: TrendingUp,
          color: 'text-purple-500',
          bgColor: 'bg-purple-500/10',
        },
        {
          name: 'Completion Rate',
          value:
            analytics.overview.totalBookings > 0
              ? `${Math.round(
                  (analytics.overview.completedBookings /
                    analytics.overview.totalBookings) *
                    100
                )}%`
              : '0%',
          icon: Users,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
        },
      ]
    : [];

  // Calculate max for chart scaling
  const maxBookings = analytics
    ? Math.max(...analytics.bookingsByDate.map((d) => d.count), 1)
    : 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-white font-light">Analytics</h1>
          <p className="text-gray-400 font-light mt-1">
            Track your studio performance
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {['7', '30', '90'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-light transition-colors ${
                period === p
                  ? 'bg-ecospace-green text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {p} Days
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              {stat.trend && (
                <span
                  className={`flex items-center text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl text-white font-light">{stat.value}</p>
            <p className="text-gray-400 text-sm font-light mt-1">
              {stat.subtext || stat.name}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Over Time Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-light">Bookings Over Time</h3>
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>

          {analytics?.bookingsByDate && analytics.bookingsByDate.length > 0 ? (
            <div className="h-64 flex items-end gap-1">
              {analytics.bookingsByDate.slice(-14).map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-ecospace-green/20 rounded-t-lg transition-all hover:bg-ecospace-green/40 relative group"
                    style={{
                      height: `${(item.count / maxBookings) * 200}px`,
                      minHeight: item.count > 0 ? '20px' : '4px',
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.count} bookings
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {new Date(item.date).getDate()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">No booking data available</p>
            </div>
          )}
        </div>

        {/* Popular Services */}
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-light">Popular Services</h3>
            <Package className="w-5 h-5 text-gray-500" />
          </div>

          {analytics?.popularServices && analytics.popularServices.length > 0 ? (
            <div className="space-y-4">
              {analytics.popularServices.map((service, index) => (
                <div key={service.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-light text-sm">
                      {service.name}
                    </span>
                    <span className="text-gray-400 text-sm">{service.count}</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ecospace-green rounded-full transition-all"
                      style={{
                        width: `${
                          (service.count /
                            Math.max(...analytics.popularServices.map((s) => s.count))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No service data</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <h3 className="text-white font-light mb-6">Booking Status Distribution</h3>

          {analytics && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-yellow-500 text-3xl font-light">
                  {analytics.overview.pendingBookings}
                </p>
                <p className="text-gray-400 text-sm mt-1">Pending</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-500 text-3xl font-light">
                  {analytics.overview.confirmedBookings}
                </p>
                <p className="text-gray-400 text-sm mt-1">Confirmed</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-green-500 text-3xl font-light">
                  {analytics.overview.completedBookings}
                </p>
                <p className="text-gray-400 text-sm mt-1">Completed</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-500 text-3xl font-light">
                  {analytics.overview.cancelledBookings}
                </p>
                <p className="text-gray-400 text-sm mt-1">Cancelled</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Metrics */}
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <h3 className="text-white font-light mb-6">Quick Metrics</h3>

          {analytics && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
                <span className="text-gray-400">Average Booking Value</span>
                <span className="text-white font-light">
                  {analytics.overview.totalBookings > 0
                    ? Math.round(
                        analytics.overview.totalRevenue /
                          analytics.overview.totalBookings
                      )
                    : 0}{' '}
                  AED
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
                <span className="text-gray-400">Cancellation Rate</span>
                <span className="text-white font-light">
                  {analytics.overview.totalBookings > 0
                    ? Math.round(
                        (analytics.overview.cancelledBookings /
                          analytics.overview.totalBookings) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
                <span className="text-gray-400">Bookings This Period</span>
                <span className="text-ecospace-green font-light">
                  {analytics.overview.recentBookings}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
                <span className="text-gray-400">Pending Actions</span>
                <span className="text-yellow-500 font-light">
                  {analytics.overview.pendingBookings}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
