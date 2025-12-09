'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Mail, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

interface QuickReply {
  label: string;
  response: string;
  action?: 'contact-form' | 'booking';
}

const quickReplies: QuickReply[] = [
  {
    label: 'Studio Packages',
    response: 'We offer various studio packages starting from 200 AED! Our most popular is the Podcast + Editing package at 750 AED. Would you like to see all our pricing?',
    action: 'booking',
  },
  {
    label: 'Book a Session',
    response: 'Great! I can help you book a studio session. Please click the "Book Studio" button above or share your preferred date and time.',
    action: 'booking',
  },
  {
    label: 'Equipment Info',
    response: 'We have professional 4K cameras, studio lighting, soundproof recording space, and professional editing services. Want to know more details?',
  },
  {
    label: 'Contact Us',
    response: 'I\'d be happy to connect you with our team! Please fill in your details below and we\'ll get back to you within 1-2 hours during business hours.',
    action: 'contact-form',
  },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hi! 👋 Welcome to Podcast EcoSpace. How can we help you today?',
      timestamp: new Date(),
    },
  ]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showContactForm]);

  const handleQuickReply = (reply: QuickReply) => {
    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: reply.label,
      timestamp: new Date(),
    };

    // Add bot response
    const botMessage: Message = {
      type: 'bot',
      content: reply.response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);

    // Handle actions
    if (reply.action === 'contact-form') {
      setTimeout(() => setShowContactForm(true), 500);
    } else if (reply.action === 'booking') {
      setTimeout(() => {
        window.location.href = '/book';
      }, 1000);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        const successMessage: Message = {
          type: 'bot',
          content: '✅ Thank you! Your message has been sent. We\'ll get back to you within 1-2 hours during business hours (9 AM - 6 PM GST).',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, successMessage]);
        setShowContactForm(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-ecospace-green text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform ${
          isOpen ? 'hidden' : ''
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-ecospace-green text-black p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Podcast EcoSpace</h3>
                  <p className="text-xs text-black/70">Usually replies within an hour</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-black/10 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-ecospace-green text-black'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {msg.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies or Contact Form */}
            <div className="border-t border-gray-800 p-4 bg-gray-900">
              {showContactForm ? (
                <form onSubmit={handleSubmitForm} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-ecospace-green"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-ecospace-green"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-ecospace-green"
                  />
                  <textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-ecospace-green resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-ecospace-green text-black rounded-lg hover:bg-ecospace-green/90 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-400 text-xs mb-3">Quick replies:</p>
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors text-left border border-gray-700 hover:border-ecospace-green/50"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Powered by footer */}
            <div className="px-4 py-2 bg-gray-900 border-t border-gray-800">
              <p className="text-xs text-gray-600 text-center">
                Powered by Podcast EcoSpace
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
