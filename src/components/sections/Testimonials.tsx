'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
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
    name: 'Ahmed Al Maktoum',
    role: 'Entrepreneur',
    podcastName: 'Dubai Business Talks',
    avatar: '/images/testimonials/ahmed.jpg',
    rating: 5,
    quote: 'EcoSpace transformed our podcast production quality. The team is professional, the equipment is top-notch, and the final product exceeded our expectations. Highly recommended!',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Content Creator',
    podcastName: 'The Wellness Journey',
    avatar: '/images/testimonials/sarah.jpg',
    rating: 5,
    quote: 'As a first-time podcaster, I was nervous about the technical aspects. The EcoSpace team made everything so easy. The studio is beautiful and the results are incredible!',
  },
  {
    id: '3',
    name: 'Mohammed Hassan',
    role: 'Tech Entrepreneur',
    podcastName: 'Innovation Hub',
    avatar: '/images/testimonials/mohammed.jpg',
    rating: 5,
    quote: 'Best podcast studio in Dubai! The location at DWTC is perfect, the equipment is professional-grade, and the editing service is exceptional. Worth every dirham.',
  },
  {
    id: '4',
    name: 'Lisa Chen',
    role: 'Marketing Consultant',
    podcastName: 'Marketing Matters',
    avatar: '/images/testimonials/lisa.jpg',
    rating: 5,
    quote: 'The team at EcoSpace understands content creation. They helped us produce 10 episodes that look and sound amazing. Our audience loves the quality upgrade!',
  },
  {
    id: '5',
    name: 'Khalid Rahman',
    role: 'Fitness Coach',
    podcastName: 'Fit Life Dubai',
    avatar: '/images/testimonials/khalid.jpg',
    rating: 5,
    quote: 'From booking to final delivery, everything was seamless. The studio space is inspiring, and the multi-camera setup makes our videos look professionally produced.',
  },
  {
    id: '6',
    name: 'Emma Williams',
    role: 'Life Coach',
    podcastName: 'Empowered Living',
    avatar: '/images/testimonials/emma.jpg',
    rating: 5,
    quote: 'I have recorded at several studios in Dubai, and EcoSpace is by far the best. The attention to detail, the comfort of the space, and the quality of output are unmatched.',
  },
];

export function Testimonials() {
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
            Testimonials
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            style={{ fontWeight: 250 }}
          >
            What Our Clients{' '}
            <span className="text-ecospace-green">Say</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-400 font-light max-w-2xl mx-auto"
          >
            Join hundreds of satisfied creators who trust EcoSpace for their podcast production
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-500 bg-white/5 border border-white/10 hover:border-ecospace-green/50 hover:bg-white/10 p-8">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <Quote className="w-16 h-16 text-ecospace-green" />
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
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0 border-2 border-ecospace-green/30 group-hover:border-ecospace-green/60 transition-colors duration-500">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Podcast */}
                  <div>
                    <h4 className="text-white font-light text-base" style={{ fontWeight: 250 }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm font-light">
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

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 font-light mb-6 text-lg">
            Ready to create your own success story?
          </p>
          <a
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ecospace-green text-black font-light text-lg rounded-full hover:bg-ecospace-green/90 transition-all duration-500 shadow-lg shadow-ecospace-green/20"
          >
            Book Your Session
          </a>
        </motion.div>
      </div>
    </section>
  );
}
