'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Episode } from '@/types/podcast';

interface FeaturedPodcastsProps {
  episodes: Episode[];
}

export function FeaturedPodcasts({ episodes }: FeaturedPodcastsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-ecospace-green font-semibold uppercase tracking-wider mb-3" style={{ fontSize: '15px', letterSpacing: '0.1em' }}>
            Premium Options
          </p>
          <h2 className="text-black font-bold" style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Featured Packages
          </h2>
        </motion.div>

        {/* Featured Episodes */}
        <div className="space-y-16">
          {episodes.slice(0, 2).map((episode, index) => (
            <motion.div
              key={episode.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={containerVariants}
            >
              {/* Image - Alternating sides */}
              <motion.div
                variants={imageVariants}
                className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                  {/* Decorative Border */}
                  <div className="absolute -top-4 -left-4 w-full h-full border-4 border-primary rounded-lg -z-10" />

                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: episode.imageUrl
                        ? `url(${episode.imageUrl})`
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  />

                  {/* Guest Badge */}
                  {episode.guestImage && (
                    <div className="absolute top-6 right-6 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${episode.guestImage})` }}
                      />
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center group cursor-pointer">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
                      <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div>
                  <p className="text-ecospace-green font-bold uppercase tracking-wide mb-2" style={{ fontSize: '15px', fontWeight: 700 }}>
                    {episode.category} . Episode {episode.episodeNumber}
                  </p>
                  <h3 className="text-black font-bold mb-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: '1.3' }}>
                    {episode.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                    {episode.description}
                  </p>
                </div>

                <Link
                  href={`/podcast/${episode.id}`}
                  className="inline-block bg-white hover:bg-primary text-gray-900 hover:text-white px-8 py-4 rounded-md font-semibold uppercase tracking-wide border-2 border-gray-900 hover:border-primary transition-all"
                >
                  Episode Page
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
