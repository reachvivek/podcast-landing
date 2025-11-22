'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Instagram, ExternalLink } from 'lucide-react';

// Portfolio items - past podcasts recorded at the studio
const portfolioItems = [
  {
    id: 1,
    title: 'Tech Talk Dubai',
    host: 'Ahmed Al-Rashid',
    category: 'Technology',
    image: '/images/studio-hero-10.jpg',
    description: 'Weekly discussions on Dubai\'s tech ecosystem and startups.',
  },
  {
    id: 2,
    title: 'Wellness Journey',
    host: 'Sara Mahmoud',
    category: 'Health & Wellness',
    image: '/images/studio-hero-11.jpg',
    description: 'Conversations about mental health and holistic living.',
  },
  {
    id: 3,
    title: 'Business Minds',
    host: 'Omar Hassan',
    category: 'Business',
    image: '/images/studio-hero-12.jpg',
    description: 'Interviews with successful entrepreneurs in the UAE.',
  },
  {
    id: 4,
    title: 'Creative Corner',
    host: 'Layla Farouk',
    category: 'Arts & Culture',
    image: '/images/studio-hero-13.jpg',
    description: 'Spotlight on artists and creatives across the region.',
  },
];

export function PortfolioShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
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
            Recorded at Our Studio
          </p>
          <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontWeight: 250 }}>
            Creators Who{' '}
            <span className="text-ecospace-green">Trust Us</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
            Join the growing community of podcasters and content creators who choose Podcast EcoSpace.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Category Tag */}
                <span className="inline-block w-fit px-3 py-1 rounded-full bg-ecospace-green/20 text-ecospace-green text-xs uppercase tracking-wider mb-4 backdrop-blur-sm border border-ecospace-green/30">
                  {item.category}
                </span>

                {/* Title & Host */}
                <h3 className="text-2xl text-white mb-2 font-light">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Hosted by {item.host}
                </p>

                {/* Description - appears on hover */}
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-gray-400 font-light text-sm mb-4"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Play Button - appears on hover */}
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex gap-3"
                    >
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-ecospace-green text-black text-sm font-light hover:bg-ecospace-green/90 transition-colors">
                        <Play className="w-4 h-4" />
                        Watch Episode
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/podcast.ecospace"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white hover:border-ecospace-green hover:text-ecospace-green transition-all duration-300 font-light group"
          >
            <Instagram className="w-5 h-5" />
            See More on Instagram
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
