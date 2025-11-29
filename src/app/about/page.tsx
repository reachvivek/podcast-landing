'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Mic, Video, Headphones, Zap, CheckCircle, MapPin, TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import map to avoid SSR issues
const StudioMap = dynamic(() => import('@/components/sections/Map'), { ssr: false });

// Studio location - same as landing page
const STUDIO_LOCATION = {
  lat: 25.226111,
  lng: 55.2838106,
  address: 'Dubai World Trade Center, Sheikh Rashid Tower',
  city: 'Dubai, UAE',
};

interface Stat {
  number: string;
  label: string;
  icon: typeof Video;
}

interface Feature {
  icon: typeof Mic;
  title: string;
  description: string;
}

interface Value {
  text: string;
  icon: typeof CheckCircle;
}

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stats: Stat[] = [
    { number: '500+', label: 'Episodes Recorded', icon: Video },
    { number: '200+', label: 'Happy Creators', icon: Star },
    { number: '4.9/5', label: 'Client Rating', icon: Star },
    { number: '24/7', label: 'Support Available', icon: CheckCircle },
  ];

  const features: Feature[] = [
    {
      icon: Mic,
      title: 'Professional Equipment',
      description: 'Industry-leading microphones, audio interfaces, and recording gear for crystal-clear sound quality.',
    },
    {
      icon: Video,
      title: 'Multi-Camera Setup',
      description: 'Professional video recording with multiple camera angles for engaging visual content.',
    },
    {
      icon: Headphones,
      title: 'Expert Production',
      description: 'Experienced audio engineers and editors to ensure broadcast-quality output.',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Quick editing and delivery within 2-7 business days, ready for publishing.',
    },
  ];

  const values: Value[] = [
    { text: 'Quality first - We never compromise on production standards', icon: CheckCircle },
    { text: 'Creator-focused - Your vision and comfort are our priorities', icon: Star },
    { text: 'Innovation - Latest technology and techniques in podcasting', icon: TrendingUp },
    { text: 'Accessibility - Professional studio experience at fair prices', icon: CheckCircle },
    { text: 'Community - Building Dubai\'s podcasting ecosystem', icon: MapPin },
  ];

  const locationBenefits = [
    'Easy access from Sheikh Zayed Road',
    'Walking distance from metro station',
    'Ample parking available',
    'Surrounded by cafes and amenities',
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black z-0" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-ecospace-green uppercase tracking-widest text-sm mb-6 font-light">
              About EcoSpace
            </p>
            <h1 className="text-5xl md:text-7xl text-white mb-6" style={{ fontWeight: 250 }}>
              Dubai's Premier{' '}
              <span className="text-ecospace-green">Podcast Studio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              Empowering creators to share their stories with the world from the heart of Dubai World Trade Center
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-ecospace-green uppercase tracking-widest text-sm mb-4 font-light">
                Our Story
              </p>
              <h2 className="text-4xl md:text-5xl text-white mb-8" style={{ fontWeight: 250 }}>
                Building the Future of{' '}
                <span className="text-ecospace-green">Podcasting in Dubai</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
                <p>
                  Founded in 2023, EcoSpace was born from a simple observation: Dubai needed a
                  professional podcast studio that combined world-class equipment with an
                  approachable, creator-first mentality.
                </p>
                <p>
                  Located in the prestigious Dubai World Trade Center, we've created a space
                  where entrepreneurs, influencers, business leaders, and storytellers can
                  produce broadcast-quality content without the traditional barriers of entry.
                </p>
                <p>
                  Today, we're proud to be the go-to destination for podcast recording in Dubai,
                  having helped hundreds of creators launch and grow their shows with professional
                  production quality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-3xl overflow-hidden group"
            >
              <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-ecospace-green/50 transition-colors duration-500 z-10" />
              <Image
                src="/images/studio-hero-1.jpg"
                alt="EcoSpace Studio"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ecospace-green/50 transition-all duration-500 text-center"
                >
                  <Icon className="w-8 h-8 text-ecospace-green mx-auto mb-4" />
                  <div className="text-4xl md:text-5xl text-white mb-2" style={{ fontWeight: 250 }}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-light tracking-wide">{stat.label}</div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ecospace-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-ecospace-green uppercase tracking-widest text-sm mb-4 font-light">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontWeight: 250 }}>
              Everything You Need Under{' '}
              <span className="text-ecospace-green">One Roof</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
              Professional podcast production from recording to final delivery
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ecospace-green/50 transition-all duration-500 hover:bg-white/10"
                >
                  <div className="w-14 h-14 rounded-2xl bg-ecospace-green/10 flex items-center justify-center mb-6 group-hover:bg-ecospace-green/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-ecospace-green" />
                  </div>
                  <h3 className="text-2xl text-white mb-4 font-light">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ecospace-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-ecospace-green uppercase tracking-widest text-sm mb-4 font-light">
              Our Values
            </p>
            <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontWeight: 250 }}>
              Principles That{' '}
              <span className="text-ecospace-green">Guide Us</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
              The core beliefs that shape everything we do at EcoSpace
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ecospace-green/50 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-ecospace-green" />
                    </div>
                    <p className="text-gray-300 text-lg font-light leading-relaxed">{value.text}</p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ecospace-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-ecospace-green uppercase tracking-widest text-sm mb-4 font-light">
              Visit Us
            </p>
            <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontWeight: 250 }}>
              Prime Location at{' '}
              <span className="text-ecospace-green">DWTC</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
              Located at the heart of Dubai's business district for your convenience
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Location Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Address Card */}
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ecospace-green/50 transition-all duration-500 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green/20 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-ecospace-green" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl mb-2 font-light">Studio Address</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      {STUDIO_LOCATION.address}<br />
                      {STUDIO_LOCATION.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                {locationBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ecospace-green/50 transition-all duration-500"
                  >
                    <CheckCircle className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    <p className="text-gray-300 font-light text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>

              {/* Get Directions Button */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${STUDIO_LOCATION.lat},${STUDIO_LOCATION.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-ecospace-green text-black font-light text-lg rounded-full hover:bg-ecospace-green/90 transition-all"
              >
                Get Directions
              </a>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border-2 border-white/10 hover:border-ecospace-green/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gray-100">
                {isMounted ? (
                  <StudioMap location={STUDIO_LOCATION} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ecospace-green mx-auto mb-4"></div>
                      <p className="text-gray-600 font-light">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ecospace-green/20 via-ecospace-green/10 to-transparent backdrop-blur-sm" />
            <div className="absolute inset-0 border border-ecospace-green/30 rounded-3xl" />

            <div className="relative z-10 text-center py-20 px-8">
              <h2 className="text-4xl md:text-6xl text-white mb-6" style={{ fontWeight: 250 }}>
                Ready to Start Your{' '}
                <span className="text-ecospace-green">Podcast?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Join hundreds of creators who trust EcoSpace for their podcast production needs
              </p>
              <motion.a
                href="/book"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-5 bg-ecospace-green text-black font-light text-lg rounded-full hover:bg-ecospace-green/90 transition-all shadow-lg shadow-ecospace-green/20"
              >
                Book Your Session
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
