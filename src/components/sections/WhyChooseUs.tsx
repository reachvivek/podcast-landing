'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mic2,
  Camera,
  Lightbulb,
  Sparkles,
  Zap,
  Share2,
  Clock,
  Users,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const features = [
  {
    icon: Mic2,
    title: 'Professional Audio',
    description: 'Studio-grade microphones and acoustically treated space for crystal-clear recordings.',
  },
  {
    icon: Camera,
    title: '4K Video Production',
    description: 'Professional 4K cameras with cinema lenses for stunning visual quality.',
  },
  {
    icon: Lightbulb,
    title: 'Studio Lighting',
    description: 'Cinema-grade LED lighting system for perfect illumination and ambiance.',
  },
  {
    icon: Sparkles,
    title: 'Full Post-Production',
    description: 'Expert editing, color grading, and audio mastering included in packages.',
  },
  {
    icon: Zap,
    title: 'Quick Turnaround',
    description: 'Fast delivery times without compromising quality. Get your content ready to publish.',
  },
  {
    icon: Share2,
    title: 'Social Media Ready',
    description: 'Optimized clips and formats for all platforms including Instagram, YouTube, and TikTok.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Open 7 days a week, 7AM - 10PM. Book sessions that fit your schedule.',
  },
  {
    icon: Award,
    title: 'Prime Location',
    description: 'Located at Dubai World Trade Center. Easy access, professional environment.',
  },
];

export function WhyChooseUs() {
  const [showAll, setShowAll] = useState(false);

  // On mobile, show only 4 cards initially
  const displayedFeatures = showAll ? features : features.slice(0, 4);

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <p className="text-ecospace-green uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 font-light">
            Why Creators Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4 md:mb-6" style={{ fontWeight: 250 }}>
            Everything You Need to{' '}
            <span className="text-ecospace-green">Create</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-base sm:text-lg">
            From recording to final edit, we provide the complete podcast production experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-5 sm:p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ecospace-green/50 transition-all duration-500 hover:bg-white/10 ${
                index >= 4 && !showAll ? 'hidden sm:block' : ''
              }`}
            >
              {/* Horizontal Layout: Icon + Content */}
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-ecospace-green" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl text-white mb-2 font-light">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ecospace-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View More Button - Mobile Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-6 sm:hidden"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-ecospace-green/50 text-white hover:text-ecospace-green transition-all duration-300"
          >
            <span className="text-sm font-light uppercase tracking-wider">
              {showAll ? 'View Less' : 'View More'}
            </span>
            {showAll ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
