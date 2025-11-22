'use client';

import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';
import { glassButtonPrimaryClass, glassButtonStyles } from '@/lib/utils';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission logic
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #A8D646 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Accent Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ecospace-green/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.p
            variants={titleVariants}
            className="text-ecospace-green font-bold uppercase tracking-widest text-sm mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Let&apos;s Create Together
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Have questions about our studio packages? Ready to book your session? Drop us a message and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green focus:bg-white/10 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green focus:bg-white/10 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>

              {/* Phone Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green focus:bg-white/10 transition-all duration-300"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-500">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green focus:bg-white/10 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, preferred dates, or any questions you have..."
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${glassButtonPrimaryClass} inline-flex items-center justify-center gap-3 w-full md:w-auto md:min-w-[280px] disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={glassButtonStyles.tilt3d}
                  onMouseMove={(e) => {
                    if (isSubmitting) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -3;
                    const rotateY = ((x - centerX) / centerX) * 3;
                    e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
                  }}
                >
                  <span className={glassButtonStyles.primaryDepthLayer} />
                  <span className={glassButtonStyles.primaryShimmer} />
                  <Send className="w-5 h-5 relative z-10" />
                  <span className="uppercase tracking-widest relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                </button>
              </motion.div>
            </form>
          </div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-gray-500 text-sm">
              By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-ecospace-green hover:text-white transition-colors">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
