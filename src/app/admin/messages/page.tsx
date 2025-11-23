'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Mail,
  MailOpen,
  Trash2,
  Archive,
  Star,
  Clock,
  User,
  Phone,
  MessageSquare,
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: 'contact' | 'newsletter';
  status: 'unread' | 'read' | 'archived';
  isStarred: boolean;
  createdAt: string;
}

const statusColors = {
  unread: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  read: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  archived: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    // Fetch messages from API (ContactSubmission & NewsletterSubscriber)
    fetchMessages();
  }, [statusFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // For now, using mock data since we need to create the API endpoint
      const mockMessages: Message[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+971-50-1234567',
          subject: 'Question about studio booking',
          message: 'Hi, I would like to know more about your 3-camera setup and availability for next week.',
          type: 'contact',
          status: 'unread',
          isStarred: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Sarah Smith',
          email: 'sarah@example.com',
          subject: 'Newsletter Subscription',
          message: 'Subscribed to newsletter',
          type: 'newsletter',
          status: 'read',
          isStarred: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, status: 'read' as const } : msg
      )
    );
  };

  const toggleStar = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );
  };

  const archiveMessage = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, status: 'archived' as const } : msg
      )
    );
  };

  const deleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      (message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter ? message.status === statusFilter : true)
  );

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-white font-light">Messages</h1>
          <p className="text-gray-400 font-light mt-1">
            Contact submissions and newsletter subscribers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-blue-500 text-sm font-light">
              {unreadCount} Unread
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
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
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
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
              <div className="w-8 h-8 border-2 border-ecospace-green border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  if (message.status === 'unread') {
                    markAsRead(message.id);
                  }
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMessage?.id === message.id
                    ? 'bg-ecospace-green/10 border-ecospace-green/50'
                    : message.status === 'unread'
                    ? 'bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10'
                    : 'bg-gray-900 border-gray-800 hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {message.status === 'unread' ? (
                      <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    ) : (
                      <MailOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                    <span className="text-white font-light truncate">
                      {message.name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(message.id);
                    }}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        message.isStarred
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-500'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-400 truncate mb-1">
                  {message.subject}
                </p>
                <p className="text-xs text-gray-500 truncate mb-2">
                  {message.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {new Date(message.createdAt).toLocaleDateString('en-AE', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      statusColors[message.status]
                    }`}
                  >
                    {message.type}
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
                  : 'Messages will appear here'}
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
                  <h2 className="text-xl text-white font-light mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {selectedMessage.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(selectedMessage.createdAt).toLocaleString('en-AE')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStar(selectedMessage.id)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        selectedMessage.isStarred
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-500'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => archiveMessage(selectedMessage.id)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Archive className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
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
              <div>
                <h3 className="text-gray-400 text-sm mb-3">Message</h3>
                <p className="text-white leading-relaxed">{selectedMessage.message}</p>
              </div>

              {/* Actions */}
              {selectedMessage.type === 'contact' && (
                <div className="mt-6 pt-6 border-t border-gray-800 flex gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="flex-1 px-4 py-3 bg-ecospace-green text-black rounded-xl font-light hover:bg-ecospace-green/90 transition-colors text-center"
                  >
                    Reply via Email
                  </a>
                  <a
                    href={`https://wa.me/${selectedMessage.phone?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-xl font-light hover:bg-gray-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 flex flex-col items-center justify-center h-full">
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
