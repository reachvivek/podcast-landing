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

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative flex-shrink-0 w-[400px]">
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
        <p className="text-gray-300 font-light leading-relaxed mb-6 relative z-10 line-clamp-4">
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
    </div>
  );
}

export function Testimonials() {
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

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
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

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            variants={titleVariants}
            className="text-ecospace-green font-bold uppercase tracking-widest text-sm mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl lg:text-5xl text-white mb-6"
            style={{ fontWeight: 250 }}
          >
            What Our Clients{' '}
            <span className="text-ecospace-green">Say</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto"
          >
            Join hundreds of satisfied creators who trust EcoSpace for their podcast production
          </motion.p>
        </motion.div>

        {/* Infinite Scrolling Carousel */}
        <div className="relative">
          <div className="carousel-container group">
            {/* First set of testimonials */}
            <div className="carousel-track">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            {/* Duplicate set for infinite scroll */}
            <div className="carousel-track" aria-hidden="true">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={`duplicate-${testimonial.id}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 font-light mb-6 text-base md:text-lg">
            Ready to create your own success story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/book"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-ecospace-green text-black font-medium text-base md:text-lg rounded-full hover:bg-ecospace-green/90 transition-all duration-500 shadow-lg shadow-ecospace-green/20 hover:scale-105"
            >
              Book Your Session
            </a>
            <a
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/5 border-2 border-white/20 text-white font-light text-base md:text-lg rounded-full hover:border-ecospace-green hover:bg-ecospace-green/10 transition-all duration-500"
            >
              View All Testimonials
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .carousel-container {
          display: flex;
          overflow: hidden;
          user-select: none;
          gap: 20px;
        }

        .carousel-track {
          display: flex;
          gap: 20px;
          padding-left: 20px;
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        /* Pause on hover */
        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-400px * ${testimonials.length} - 20px * ${testimonials.length}));
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .carousel-track {
            animation: scroll 30s linear infinite;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-350px * ${testimonials.length} - 20px * ${testimonials.length}));
            }
          }
        }
      `}</style>
    </section>
  );
}
