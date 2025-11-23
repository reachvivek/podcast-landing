'use client';

import { useState } from 'react';
import {
  Save,
  Building,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Bell,
  Shield,
  User,
} from 'lucide-react';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Studio Information
    studioName: 'EcoSpace Podcast Studio',
    email: 'info@ecospace.ae',
    phone: '+971 50 206 0674',
    address: 'Dubai World Trade Center, Sheikh Rashid Tower',
    website: 'https://ecospace.ae',

    // Business Hours
    openTime: '07:00',
    closeTime: '22:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    // Booking Settings
    minAdvanceBooking: 24, // hours
    maxAdvanceBooking: 90, // days
    bookingTimeSlots: 60, // minutes
    cancellationPolicy: 24, // hours before

    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    bookingConfirmationEmail: true,
    bookingReminderEmail: true,

    // Currency & Pricing
    currency: 'AED',
    taxRate: 5, // percentage
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-white font-light">Settings</h1>
          <p className="text-gray-400 font-light mt-1">
            Manage your studio configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ecospace-green text-black rounded-xl font-light hover:bg-ecospace-green/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* Studio Information */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-ecospace-green/10 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-ecospace-green" />
            </div>
            <h2 className="text-xl text-white font-light">Studio Information</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Studio Name</label>
              <input
                type="text"
                value={settings.studioName}
                onChange={(e) => setSettings({...settings, studioName: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Website</label>
              <input
                type="url"
                value={settings.website}
                onChange={(e) => setSettings({...settings, website: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-xl text-white font-light">Business Hours</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Opening Time</label>
              <input
                type="time"
                value={settings.openTime}
                onChange={(e) => setSettings({...settings, openTime: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Closing Time</label>
              <input
                type="time"
                value={settings.closeTime}
                onChange={(e) => setSettings({...settings, closeTime: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl text-white font-light">Booking Configuration</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Minimum Advance Booking (hours)
              </label>
              <input
                type="number"
                value={settings.minAdvanceBooking}
                onChange={(e) => setSettings({...settings, minAdvanceBooking: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Maximum Advance Booking (days)
              </label>
              <input
                type="number"
                value={settings.maxAdvanceBooking}
                onChange={(e) => setSettings({...settings, maxAdvanceBooking: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Cancellation Policy (hours before)
              </label>
              <input
                type="number"
                value={settings.cancellationPolicy}
                onChange={(e) => setSettings({...settings, cancellationPolicy: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({...settings, taxRate: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-yellow-500" />
            </div>
            <h2 className="text-xl text-white font-light">Notifications</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
              <div>
                <p className="text-white font-light">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive booking notifications via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-ecospace-green focus:ring-ecospace-green"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
              <div>
                <p className="text-white font-light">Booking Confirmation Email</p>
                <p className="text-sm text-gray-400">Send email when booking is confirmed</p>
              </div>
              <input
                type="checkbox"
                checked={settings.bookingConfirmationEmail}
                onChange={(e) => setSettings({...settings, bookingConfirmationEmail: e.target.checked})}
                className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-ecospace-green focus:ring-ecospace-green"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
              <div>
                <p className="text-white font-light">Booking Reminder Email</p>
                <p className="text-sm text-gray-400">Send reminder 24h before booking</p>
              </div>
              <input
                type="checkbox"
                checked={settings.bookingReminderEmail}
                onChange={(e) => setSettings({...settings, bookingReminderEmail: e.target.checked})}
                className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-ecospace-green focus:ring-ecospace-green"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
