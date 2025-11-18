'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Episode } from '@/types/podcast';
import Link from 'next/link';

interface PodcastExploreProps {
  episodes: Episode[];
  category?: string;
  title?: string;
  subtitle?: string;
}

export function PodcastExplore({
  episodes,
  category = 'Fashion Life',
  title = 'Explore podcast in',
  subtitle = 'Marketing Show',
}: PodcastExploreProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const filteredEpisodes = episodes.filter((ep) => ep.category === category);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Title and Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col justify-center"
          >
            <motion.p
              variants={itemVariants}
              className="text-[#FF5722] font-semibold uppercase tracking-wider mb-4"
              style={{ fontSize: '15px', letterSpacing: '0.1em' }}
            >
              {subtitle}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-black font-bold mb-6"
              style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2' }}
            >
              {title}
              <br />
              <span className="text-[#FF5722]">{category}</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg mb-6 leading-relaxed"
            >
              Nam ultrices odio a felis lobortis convallis. In ex nunc, ornare non
              condimentum et, egestas vel massa. Nullam hendrerit felis quis
              pellentesque porttitor.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              Aenean lobortis bibendum turpis et auctor. Nam iaculis, lectus
              vulputate cursus interdum, lacus odio commodo ipsum, nec condimentum
              purus tellus eu metus. Vivamus volutpat vitae dolor non suscipit.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="/podcast"
                className="inline-block bg-[#FF5722] hover:bg-[#f4511e] text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 uppercase tracking-wide"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                View All Episodes
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Episode List */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-6"
          >
            {filteredEpisodes.slice(0, 5).map((episode) => (
              <motion.div
                key={episode.id}
                variants={itemVariants}
                className="group"
              >
                <Link
                  href={`/podcast/${episode.id}`}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {/* Play Button */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#FF5722] hover:bg-[#f4511e] flex items-center justify-center transition-all duration-300 shadow-md">
                      <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Episode Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#FF5722] font-bold mb-1" style={{ fontSize: '14px', fontWeight: 700 }}>
                      Episode {episode.episodeNumber} . {episode.category}
                    </p>
                    <h3 className="text-black font-bold mb-1 line-clamp-2 group-hover:text-[#FF5722] transition-colors" style={{ fontSize: '19px', fontWeight: 700, lineHeight: '1.4' }}>
                      {episode.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
