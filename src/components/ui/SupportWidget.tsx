'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, HelpCircle, Loader2, Check } from 'lucide-react';

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'support' | 'booking_question' | 'general';
}

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'contact'>('chat');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - in production, this would send to /api/inquiries
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        type: 'general'
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-ecospace-green text-black shadow-lg shadow-ecospace-green/30 flex items-center justify-center hover:scale-110 transition-transform ${
          isOpen ? 'hidden' : ''
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
        {/* Notification Badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
          1
        </span>
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-black rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-ecospace-green p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-black">How can we help?</h3>
                  <p className="text-black/70 text-sm">Usually replies within an hour</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'text-ecospace-green border-b-2 border-ecospace-green'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Send Message
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'text-ecospace-green border-b-2 border-ecospace-green'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Quick Contact
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {activeTab === 'chat' ? (
                isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-ecospace-green rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Message Sent!</h4>
                    <p className="text-gray-400 text-sm">
                      We'll get back to you within 1-2 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">What can we help with?</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-ecospace-green focus:outline-none transition-colors"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="booking_question">Booking Question</option>
                        <option value="support">Technical Support</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-ecospace-green focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-ecospace-green focus:outline-none transition-colors"
                        placeholder="john@email.com"
                      />
                    </div>

                    {/* Phone (Optional) */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-ecospace-green focus:outline-none transition-colors"
                        placeholder="+971-50-1234567"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-ecospace-green focus:outline-none transition-colors resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl font-semibold bg-ecospace-green text-black hover:bg-ecospace-green/90 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )
              ) : (
                <div className="space-y-4">
                  {/* Quick Contact Options */}
                  <p className="text-gray-400 text-sm mb-4">
                    Get in touch with us directly:
                  </p>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/971502060674"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-ecospace-green/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">WhatsApp</p>
                      <p className="text-gray-400 text-sm">+971-502060674</p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+971502060674"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-ecospace-green/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Call Us</p>
                      <p className="text-gray-400 text-sm">+971-502060674</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@podcastecospace.ae"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-ecospace-green/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-gray-400 text-sm">info@podcastecospace.ae</p>
                    </div>
                  </a>

                  {/* Operating Hours */}
                  <div className="p-4 rounded-xl bg-ecospace-green/10 border border-ecospace-green/20">
                    <p className="text-ecospace-green text-sm font-medium">Operating Hours</p>
                    <p className="text-white">7:00 AM - 10:00 PM</p>
                    <p className="text-gray-400 text-xs">7 days a week</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <p className="text-center text-gray-500 text-xs">
                Powered by Podcast EcoSpace
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
