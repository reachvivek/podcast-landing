'use client';

import { useState, useEffect } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Users,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  Edit2,
  History,
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

interface AuditEntry {
  id: string;
  action: string;
  userName: string;
  userType: string;
  reason?: string;
  createdAt: string;
  changes?: any;
}

interface BookingDetailsModalProps {
  booking: Booking | null;
  onClose: () => void;
  onStatusChange: (bookingId: string, status: string) => void;
  onCancel: (bookingId: string) => void;
  onModify: (bookingId: string, data: Partial<Booking>) => void;
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

export function BookingDetailsModal({
  booking,
  onClose,
  onStatusChange,
  onCancel,
  onModify,
}: BookingDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'audit'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [editData, setEditData] = useState<Partial<Booking>>({});

  useEffect(() => {
    if (booking && activeTab === 'audit') {
      fetchAuditLog();
    }
  }, [booking, activeTab]);

  const fetchAuditLog = async () => {
    if (!booking) return;

    setLoadingAudit(true);
    try {
      const response = await fetch(`/api/bookings/${booking.id}/audit`);
      if (response.ok) {
        const data = await response.json();
        setAuditLog(data.audit || []);
      }
    } catch (error) {
      console.error('Failed to fetch audit log:', error);
    } finally {
      setLoadingAudit(false);
    }
  };

  const handleSaveEdit = () => {
    if (!booking) return;
    onModify(booking.id, editData);
    setIsEditing(false);
    setEditData({});
  };

  if (!booking) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h3 className="text-xl text-white font-light">Booking Details</h3>
            <p className="text-gray-400 text-sm font-light mt-1">ID: {booking.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-6 pt-4 border-b border-gray-800/50">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-1 text-sm font-light transition-colors border-b-2 ${
              activeTab === 'details'
                ? 'text-ecospace-green border-ecospace-green'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 px-1 text-sm font-light transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'text-ecospace-green border-ecospace-green'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            Audit Trail
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-gray-400 text-sm">Customer Information</h4>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-ecospace-green hover:text-ecospace-green/80 transition-colors text-sm font-light flex items-center gap-2"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.customerName ?? booking.customerName}
                        onChange={(e) =>
                          setEditData({ ...editData, customerName: e.target.value })
                        }
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-ecospace-green/50"
                      />
                    ) : (
                      <span className="text-white">{booking.customerName}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.customerEmail ?? booking.customerEmail}
                        onChange={(e) =>
                          setEditData({ ...editData, customerEmail: e.target.value })
                        }
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-ecospace-green/50"
                      />
                    ) : (
                      <span className="text-white">{booking.customerEmail}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.customerPhone ?? booking.customerPhone}
                        onChange={(e) =>
                          setEditData({ ...editData, customerPhone: e.target.value })
                        }
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-ecospace-green/50"
                      />
                    ) : (
                      <span className="text-white">{booking.customerPhone}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div>
                <h4 className="text-gray-400 text-sm mb-3">Session Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </p>
                    <p className="text-white font-light">
                      {new Date(booking.selectedDate).toLocaleDateString('en-AE', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4" />
                      Time
                    </p>
                    <p className="text-white font-light">{booking.selectedTime}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4" />
                      Duration
                    </p>
                    <p className="text-white font-light">{booking.sessionDuration} hours</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4" />
                      People
                    </p>
                    <p className="text-white font-light">{booking.peopleCount}</p>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h4 className="text-gray-400 text-sm mb-3">Service</h4>
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-light">
                        {booking.selectedService?.name || 'N/A'}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Setup: {booking.selectedSetup}
                      </p>
                    </div>
                    <p className="text-ecospace-green font-light flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {booking.totalPrice} AED
                    </p>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {booking.specialRequests && (
                <div>
                  <h4 className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Special Requests
                  </h4>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <p className="text-white font-light">{booking.specialRequests}</p>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm border font-light ${
                    statusColors[booking.status as keyof typeof statusColors]
                  }`}
                >
                  {booking.status}
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-light ${
                    paymentColors[booking.paymentStatus as keyof typeof paymentColors]
                  }`}
                >
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {loadingAudit ? (
                <div className="flex items-center justify-center h-32">
                  <div className="w-6 h-6 border-2 border-ecospace-green border-t-transparent rounded-full animate-spin" />
                </div>
              ) : auditLog.length > 0 ? (
                <div className="space-y-3">
                  {auditLog.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-light capitalize">
                            {entry.action.replace(/_/g, ' ')}
                          </p>
                          <p className="text-gray-400 text-sm">
                            by {entry.userName} ({entry.userType})
                          </p>
                        </div>
                        <span className="text-gray-500 text-xs">
                          {new Date(entry.createdAt).toLocaleString('en-AE')}
                        </span>
                      </div>
                      {entry.reason && (
                        <p className="text-gray-400 text-sm mt-2">Reason: {entry.reason}</p>
                      )}
                      {entry.changes && (
                        <pre className="text-gray-500 text-xs mt-2 p-2 bg-gray-900/50 rounded overflow-auto">
                          {JSON.stringify(entry.changes, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 font-light">No audit entries yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        {activeTab === 'details' && (
          <div className="flex gap-3 p-6 border-t border-gray-800">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({});
                  }}
                  className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-xl font-light hover:bg-gray-700 transition-colors"
                >
                  Cancel Edit
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-3 bg-ecospace-green text-black rounded-xl font-light hover:bg-ecospace-green/90 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <>
                {booking.status === 'PENDING' && (
                  <button
                    onClick={() => {
                      onStatusChange(booking.id, 'CONFIRMED');
                      onClose();
                    }}
                    className="flex-1 px-4 py-3 bg-ecospace-green text-black rounded-xl font-light hover:bg-ecospace-green/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm Booking
                  </button>
                )}
                {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                  <button
                    onClick={() => {
                      onCancel(booking.id);
                      onClose();
                    }}
                    className="flex-1 px-4 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-light hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel Booking
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
