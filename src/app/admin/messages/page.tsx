'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  ChevronDown,
  Mail,
  MailOpen,
  Trash2,
  Archive,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: 'NEW' | 'READ' | 'RESPONDED' | 'ARCHIVED';
  adminNotes?: string | null;
  createdAt: string;
  respondedAt?: string | null;
}

const statusColors = {
  NEW: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  READ: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  RESPONDED: 'bg-green-500/10 text-green-500 border-green-500/20',
  ARCHIVED: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

const statusLabels = {
  NEW: 'New',
  READ: 'Read',
  RESPONDED: 'Responded',
  ARCHIVED: 'Archived',
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/contact?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, status: status as Message['status'] } : msg
          )
        );
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(prev => prev ? { ...prev, status: status as Message['status'] } : null);
        }
      }
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  const saveAdminNotes = async () => {
    if (!selectedMessage) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/contact/${selectedMessage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes }),
      });

      if (response.ok) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === selectedMessage.id ? { ...msg, adminNotes } : msg
          )
        );
        setSelectedMessage(prev => prev ? { ...prev, adminNotes } : null);
      }
    } catch (error) {
      console.error('Failed to save notes:', error);
    } finally {
      setSaving(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    setAdminNotes(message.adminNotes || '');

    // Mark as read if new
    if (message.status === 'NEW') {
      updateMessageStatus(message.id, 'READ');
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newCount = messages.filter(m => m.status === 'NEW').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-white font-light">Messages</h1>
          <p className="text-gray-400 font-light mt-1">
            Contact form submissions from customers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchMessages}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {newCount > 0 && (
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-blue-500 text-sm font-light">
                {newCount} New
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or message..."
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
            <option value="">All Messages</option>
            <option value="NEW">New</option>
            <option value="READ">Read</option>
            <option value="RESPONDED">Responded</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-gray-800 border-t-ecospace-green animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-ecospace-green rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleSelectMessage(message)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMessage?.id === message.id
                    ? 'bg-ecospace-green/10 border-ecospace-green/50'
                    : message.status === 'NEW'
                    ? 'bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10'
                    : 'bg-gray-900 border-gray-800 hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {message.status === 'NEW' ? (
                      <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    ) : (
                      <MailOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                    <span className="text-white font-light truncate">
                      {message.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[message.status]}`}
                  >
                    {statusLabels[message.status]}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate mb-1">
                  {message.email}
                </p>
                <p className="text-xs text-gray-500 truncate mb-2">
                  {message.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {new Date(message.createdAt).toLocaleDateString('en-AE', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-white font-light mb-2">No messages found</p>
              <p className="text-gray-500 text-sm">
                {searchQuery || statusFilter
                  ? 'Try adjusting your filters'
                  : 'Contact form submissions will appear here'}
              </p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-800">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl text-white font-light">
                      Message from {selectedMessage.name}
                    </h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[selectedMessage.status]}`}>
                      {statusLabels[selectedMessage.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(selectedMessage.createdAt).toLocaleString('en-AE')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'RESPONDED')}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Mark as Responded"
                  >
                    <CheckCircle className={`w-5 h-5 ${selectedMessage.status === 'RESPONDED' ? 'text-green-500' : 'text-gray-500'}`} />
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'ARCHIVED')}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Archive"
                  >
                    <Archive className={`w-5 h-5 ${selectedMessage.status === 'ARCHIVED' ? 'text-purple-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-xl">
                <h3 className="text-gray-400 text-sm mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <User className="w-4 h-4 text-ecospace-green" />
                    {selectedMessage.name}
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Mail className="w-4 h-4 text-ecospace-green" />
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="hover:text-ecospace-green transition-colors"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2 text-white">
                      <Phone className="w-4 h-4 text-ecospace-green" />
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="hover:text-ecospace-green transition-colors"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Body */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-3">Message</h3>
                <p className="text-white leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Admin Notes */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-3">Admin Notes</h3>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this message..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green/50 resize-none"
                  rows={3}
                />
                <button
                  onClick={saveAdminNotes}
                  disabled={saving || adminNotes === (selectedMessage.adminNotes || '')}
                  className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {saving ? 'Saving...' : 'Save Notes'}
                </button>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-gray-800 flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex-1 px-4 py-3 bg-ecospace-green text-black rounded-xl font-light hover:bg-ecospace-green/90 transition-colors text-center"
                >
                  Reply via Email
                </a>
                {selectedMessage.phone && (
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-xl font-light hover:bg-gray-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 flex flex-col items-center justify-center h-full min-h-[400px]">
              <Mail className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-400 font-light">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
