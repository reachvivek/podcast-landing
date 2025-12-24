'use client';

import { motion } from 'framer-motion';
import { Play, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getFeaturedEpisodes } from '@/data/episodes';
import { useState } from 'react';

export function FeaturedPodcasts() {
  const featuredEpisodes = getFeaturedEpisodes();
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

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

  const cardVariants = {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
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
            Featured Podcasts
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            style={{ fontWeight: 250 }}
          >
            Watch Our Latest{' '}
            <span className="text-ecospace-green">Episodes</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-400 font-light max-w-2xl mx-auto"
          >
            Engaging conversations with industry leaders, innovators, and creatives from Dubai and beyond
          </motion.p>
        </motion.div>

        {/* Podcast Videos Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {featuredEpisodes.map((episode) => (
            <motion.div
              key={episode.id}
              variants={cardVariants}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-500 bg-white/5 border border-white/10 hover:border-ecospace-green/50 hover:bg-white/10">
                {/* Video Embed */}
                <div className="relative aspect-video bg-gray-900">
                  {playingVideo === episode.id ? (
                    <iframe
                      src={`${getYouTubeEmbedUrl(episode.youtubeUrl!)}?autoplay=1`}
                      title={episode.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={episode.imageUrl}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 flex items-center justify-center transition-all duration-300">
                        <button
                          onClick={() => setPlayingVideo(episode.id)}
                          className="relative w-16 h-16 rounded-full backdrop-blur-sm bg-white/5 border border-ecospace-green/40 hover:border-ecospace-green/80 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 shadow-[0_0_20px_rgba(168,214,70,0.2)] hover:shadow-[0_0_40px_rgba(168,214,70,0.5)]"
                        >
                          <div className="absolute inset-0 rounded-full bg-ecospace-green/10"></div>
                          <Play className="w-7 h-7 text-ecospace-green ml-0.5 relative z-10" fill="currentColor" />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-light">
                        {formatDate(episode.publishedDate)}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-light">{episode.duration}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-ecospace-green/10 border border-ecospace-green/20 mb-3">
                    <span className="text-xs text-ecospace-green uppercase tracking-wider font-light">
                      {episode.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl text-white mb-3 font-light group-hover:text-ecospace-green transition-colors duration-300"
                    style={{ fontWeight: 250 }}
                  >
                    {episode.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 font-light leading-relaxed line-clamp-2">
                    {episode.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ecospace-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/podcasts"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-light text-lg rounded-full hover:border-ecospace-green hover:bg-ecospace-green/10 transition-all duration-500 group"
          >
            <span>View All Podcasts</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
