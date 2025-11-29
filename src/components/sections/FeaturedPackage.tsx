'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Mic, Video, Smartphone, Home, Loader2 } from 'lucide-react';
import { glassButtonPrimaryClass, glassButtonClass, glassButtonStyles } from '@/lib/utils';

interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  isPopular: boolean;
  category: string;
}

// Icon mapping based on category
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'studio-rental': Home,
  'recording-only': Mic,
  'podcast-editing': Video,
  'reels': Smartphone,
};

export function FeaturedPackage() {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        if (data.success) {
          setPackages(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  if (loading) {
    return (
      <section id="pricing" className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-ecospace-green animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
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
            Pricing
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Studio Packages
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Choose the perfect package for your content. All packages include our premium studio space and professional equipment.
          </motion.p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-16 pt-4 sm:pt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {packages.map((pkg) => {
            const IconComponent = categoryIcons[pkg.category] || Mic;
            const savings = pkg.originalPrice ? pkg.originalPrice - pkg.price : 0;

            return (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                className="relative group"
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-ecospace-green text-black text-xs font-bold rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      POPULAR
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className="relative h-full backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500 bg-white/5 border border-white/20 shadow-lg hover:shadow-2xl hover:border-ecospace-green/50 hover:bg-white/10">
                  {/* Shimmer Effect on Card */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  <div className="relative p-6 lg:p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 bg-white/10 text-ecospace-green group-hover:bg-ecospace-green group-hover:text-black">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-ecospace-green transition-colors">
                      {pkg.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-black text-white">
                          {pkg.price}
                        </span>
                        <span className="text-lg text-gray-500">AED</span>
                      </div>
                      {pkg.originalPrice && savings > 0 && (
                        <div className="flex items-center gap-3">
                          <span className="line-through text-sm text-gray-600">
                            {pkg.originalPrice} AED
                          </span>
                          <span className="bg-ecospace-green/20 text-ecospace-green text-xs font-bold px-2 py-1 rounded-full border border-ecospace-green/30">
                            SAVE {savings} AED
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="flex-grow mb-8">
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">
                        What&apos;s Included:
                      </p>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={`${pkg.id}-feature-${idx}`} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-white/10">
                              <Check className="w-3 h-3 text-ecospace-green" />
                            </div>
                            <span className="text-gray-300 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <a
                      href="/book"
                      className={`${glassButtonClass} inline-flex items-center justify-center gap-2 w-full text-center`}
                      style={glassButtonStyles.tilt3d}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = ((y - centerY) / centerY) * -3;
                        const rotateY = ((x - centerX) / centerX) * 3;
                        e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
                      }}
                    >
                      <span className={glassButtonStyles.depthLayer} />
                      <span className={glassButtonStyles.shimmer} />
                      <span className="uppercase tracking-widest relative z-10">Book Now</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-6 text-lg">
            Need a custom package or have questions?
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-ecospace-green hover:text-white font-semibold text-lg transition-colors duration-300 group"
          >
            View All Pricing Options
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
