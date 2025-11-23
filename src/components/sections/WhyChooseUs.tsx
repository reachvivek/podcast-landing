'use client';

import { motion } from 'framer-motion';
import {
  Mic2,
  Video,
  Sparkles,
  Clock,
  Users,
  Award
} from 'lucide-react';

const features = [
  {
    icon: Mic2,
    title: 'Professional Audio',
    description: 'Studio-grade microphones and acoustically treated space for crystal-clear recordings.',
  },
  {
    icon: Video,
    title: '4K Multi-Camera',
    description: '2-camera setup with professional lighting for cinematic video podcasts.',
  },
  {
    icon: Sparkles,
    title: 'Full Post-Production',
    description: 'Expert editing, color grading, and audio mastering included in packages.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Open 7 days a week, 7AM - 10PM. Book sessions that fit your schedule.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Our team handles all technical setup so you can focus on your content.',
  },
  {
    icon: Award,
    title: 'Prime Location',
    description: 'Located at Dubai World Trade Center. Easy access, professional environment.',
  },
];

export function WhyChooseUs() {
  return (
    <section id="services" className="py-24 bg-black">
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
            Why Creators Choose Us
          </p>
          <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontWeight: 250 }}>
            Everything You Need to{' '}
            <span className="text-ecospace-green">Create</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
            From recording to final edit, we provide the complete podcast production experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ecospace-green/50 transition-all duration-500 hover:bg-white/10"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-ecospace-green/10 flex items-center justify-center mb-6 group-hover:bg-ecospace-green/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-ecospace-green" />
              </div>

              {/* Content */}
              <h3 className="text-xl text-white mb-3 font-light">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ecospace-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
