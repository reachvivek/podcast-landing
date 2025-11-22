'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Headphones, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Episode } from '@/types/podcast';

interface EpisodeCardProps {
  episode: Episode;
  index?: number;
}

export function EpisodeCard({ episode, index = 0 }: EpisodeCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-200">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: episode.imageUrl
                ? `url(${episode.imageUrl})`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />

          {/* Guest Image Badge */}
          {episode.guestImage && (
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${episode.guestImage})` }}
              />
            </div>
          )}

          {/* Overlay with Play Button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Headphones className="w-5 h-5 text-ecospace-green" />
            <span className="text-ecospace-green font-bold uppercase tracking-wide" style={{ fontSize: '15px', fontWeight: 700 }}>
              {episode.category}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600" style={{ fontSize: '14px' }}>Episode {episode.episodeNumber}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-black mb-4 line-clamp-2 transition-colors" style={{ fontSize: '22px', lineHeight: '1.4', fontWeight: 700 }}>
            {episode.title}
          </h3>

          {/* View Episode Link */}
          <Link
            href={`/podcast/${episode.id}`}
            className="inline-flex items-center font-semibold text-black hover:text-ecospace-green transition-colors uppercase tracking-wide"
            style={{ fontSize: '13px', letterSpacing: '0.05em' }}
          >
            View Episode
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
