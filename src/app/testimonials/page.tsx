'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Star, Quote, Play } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  podcastName: string;
  avatar: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Anton Sokolov',
    role: 'Speaker & Event Host',
    podcastName: 'International Events',
    avatar: '/images/testimonials/Anton%20Sokolov%20-%20speaker%20in%20events.jpg',
    rating: 5,
    quote: 'EcoSpace Studio provides exceptional quality for recording my speaking events and podcast content. The professional setup and attention to detail make every session productive and seamless.',
  },
  {
    id: '2',
    name: 'Elmira Dini',
    role: 'Real Estate Manager',
    podcastName: '10+ Years in Real Estate',
    avatar: '/images/testimonials/Elmira%20Dini%20-%20more%2010%20year%20realstate%20manager.jpg',
    rating: 5,
    quote: 'As someone who has been in the real estate industry for over a decade, I appreciate quality and professionalism. EcoSpace delivers on both fronts with outstanding results for our property showcase videos.',
  },
  {
    id: '3',
    name: 'Igor Botnari',
    role: 'Co-founder',
    podcastName: 'X1ecochain & Profixone',
    avatar: '/images/testimonials/igor%20Botnari%20-%20cofounder%20x1ecochain%20%2C%20Profixone.jpg',
    rating: 5,
    quote: 'The best podcast studio in Dubai! As a tech entrepreneur, I need top-tier production quality to communicate complex ideas. EcoSpace consistently exceeds expectations with their state-of-the-art equipment and expertise.',
  },
  {
    id: '4',
    name: 'Malika Suleimenova',
    role: 'Event Agency & Ambassador',
    podcastName: 'Russian TV in Dubai',
    avatar: '/images/testimonials/Malika%20Suleimenova%20-%20event%20agency%20%2C%20ambassador%20-%20Russian%20Tv%20in%20Dubai.jpg',
    rating: 5,
    quote: 'Working in television and events, I have high standards for production quality. EcoSpace Studio has become my go-to choice for recording professional content. The team understands media production perfectly.',
  },
  {
    id: '5',
    name: 'Mihail Manoli',
    role: 'Crypto Investor',
    podcastName: '@mihaimanoli',
    avatar: '/images/testimonials/Mihail%20Manoli%20-%20crypto%20%2C%20investor%20%2C%20Instagram%20@mihaimanoli.jpg',
    rating: 5,
    quote: 'Perfect studio for creating high-quality content for my audience. The multi-camera setup and editing services help me produce professional videos that engage my community. Highly recommended!',
  },
  {
    id: '6',
    name: 'Rubis Khalitov',
    role: 'Media Producer',
    podcastName: 'Russian TV Company',
    avatar: '/images/testimonials/Rubis%20Khalitov%20-%20Russian%20tv%20company.jpeg',
    rating: 5,
    quote: 'From a professional TV production perspective, EcoSpace offers broadcast-quality equipment and expertise. The studio environment is inspiring, and the results speak for themselves. Exceptional service!',
  },
  {
    id: '7',
    name: 'Rut Moisei',
    role: 'Content Creator & Blogger',
    podcastName: 'Digital Content',
    avatar: '/images/testimonials/Rut%20Moisei%20-%20blogres%20-%20content%20creator.jpeg',
    rating: 5,
    quote: 'As a content creator, I need a studio that understands the demands of modern digital media. EcoSpace has everything I need - professional cameras, great lighting, and a team that makes the process effortless.',
  },
];

// Placeholder for video testimonials - will be populated with YouTube embeds later
const videoTestimonials: { id: string; youtubeId: string; title: string; author: string }[] = [
  // Example structure:
  // { id: '1', youtubeId: 'VIDEO_ID', title: 'Client Success Story', author: 'Client Name' },
];

export default function TestimonialsPage() {
  const [visibleCount, setVisibleCount] = React.useState(6);
  const TESTIMONIALS_PER_PAGE = 6;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const visibleTestimonials = testimonials.slice(0, visibleCount);
  const hasMore = visibleCount < testimonials.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + TESTIMONIALS_PER_PAGE, testimonials.length));
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-black relative overflow-hidden">
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
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-ecospace-green font-bold uppercase tracking-widest text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Client Reviews
            </motion.p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
              style={{ fontWeight: 250 }}
            >
              What Our <span className="text-ecospace-green">Clients Say</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Real reviews from creators and professionals who trust EcoSpace Studio
            </p>
          </motion.div>
        </div>
      </section>

      {/* Written Testimonials Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Testimonials Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {visibleTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-500 bg-white/5 border border-white/10 hover:border-ecospace-green/50 hover:bg-white/10 p-6 md:p-8">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Quote className="w-12 h-12 md:w-16 md:h-16 text-ecospace-green" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={`star-${testimonial.id}-${i}`}
                        className="w-4 h-4 fill-ecospace-green text-ecospace-green"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 font-light leading-relaxed mb-6 relative z-10">
                    "{testimonial.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 relative z-10">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 flex-shrink-0 border-2 border-ecospace-green/30 group-hover:border-ecospace-green/60 transition-colors duration-500">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name & Info */}
                    <div>
                      <h4 className="text-white font-light text-base md:text-lg" style={{ fontWeight: 250 }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm font-light">
                        {testimonial.role}
                      </p>
                      <p className="text-gray-500 text-xs font-light">
                        {testimonial.podcastName}
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ecospace-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              className="text-center mt-12 md:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-light text-lg rounded-full hover:border-ecospace-green hover:bg-ecospace-green/10 transition-all duration-500"
              >
                Load More Testimonials
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Testimonials Section - Placeholder for Future YouTube Videos */}
      {videoTestimonials.length > 0 ? (
        <section className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Section Header */}
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-white mb-4"
                style={{ fontWeight: 250 }}
              >
                Video <span className="text-ecospace-green">Testimonials</span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 font-light">
                Watch our clients share their experiences
              </p>
            </motion.div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {videoTestimonials.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative"
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-ecospace-green/50 transition-all duration-500">
                    {/* YouTube Embed - Replace with actual embed when video IDs are available */}
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-white font-light text-lg" style={{ fontWeight: 250 }}>
                      {video.title}
                    </h4>
                    <p className="text-gray-400 text-sm font-light">{video.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 md:p-12"
          >
            <h3 className="text-3xl md:text-4xl text-white mb-6" style={{ fontWeight: 250 }}>
              Ready to <span className="text-ecospace-green">Get Started</span>?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 bg-ecospace-green text-black font-medium text-lg rounded-full hover:bg-ecospace-green/90 transition-all duration-500 shadow-lg shadow-ecospace-green/20 hover:scale-105"
              >
                Book Your Session
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-light text-lg rounded-full hover:border-ecospace-green hover:bg-ecospace-green/10 transition-all duration-500"
              >
                View Pricing
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
