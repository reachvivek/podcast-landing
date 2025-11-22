'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import the entire map component to avoid SSR issues
const StudioMap = dynamic(() => import('./Map'), { ssr: false });

// Studio location coordinates from Google Maps
const STUDIO_LOCATION = {
  lat: 25.226111,
  lng: 55.2838106,
  address: 'Dubai World Trade Center, Sheikh Rashid Tower',
  city: 'Dubai, UAE',
};

export function LocationMap() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
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
            Visit Us
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Find Our Studio
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Located in the heart of Dubai at the iconic World Trade Center. Easy access, professional environment.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Address */}
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-ecospace-green/50 transition-all duration-500 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green group-hover:scale-110 transition-all duration-500">
                  <MapPin className="w-6 h-6 text-ecospace-green group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Address</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {STUDIO_LOCATION.address}
                    <br />
                    {STUDIO_LOCATION.city}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-ecospace-green/50 transition-all duration-500 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green group-hover:scale-110 transition-all duration-500">
                  <Phone className="w-6 h-6 text-ecospace-green group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Phone</h3>
                  <a
                    href="tel:+971XXXXXXXXX"
                    className="text-gray-400 hover:text-ecospace-green transition-colors"
                  >
                    +971 XX XXX XXXX
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-ecospace-green/50 transition-all duration-500 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green group-hover:scale-110 transition-all duration-500">
                  <Mail className="w-6 h-6 text-ecospace-green group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Email</h3>
                  <a
                    href="mailto:info@podcastecospace.ae"
                    className="text-gray-400 hover:text-ecospace-green transition-colors"
                  >
                    info@podcastecospace.ae
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-ecospace-green/50 transition-all duration-500 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green group-hover:scale-110 transition-all duration-500">
                  <Clock className="w-6 h-6 text-ecospace-green group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Operating Hours</h3>
                  <div className="text-gray-400 space-y-1">
                    <p>Sunday - Thursday: 9:00 AM - 9:00 PM</p>
                    <p>Friday - Saturday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border-2 border-white/20 hover:border-ecospace-green/50 transition-all duration-500 shadow-2xl"
          >
            {/* Map Container */}
            <div className="absolute inset-0 bg-gray-100">
              {isMounted ? (
                <StudioMap location={STUDIO_LOCATION} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ecospace-green mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Overlay gradient for branding */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${STUDIO_LOCATION.lat},${STUDIO_LOCATION.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ecospace-green hover:text-white font-semibold text-lg transition-colors duration-300 group"
          >
            Get Directions
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
