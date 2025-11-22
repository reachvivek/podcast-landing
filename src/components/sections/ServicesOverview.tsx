'use client';

import { motion } from 'framer-motion';
import { Video, Mic, Smartphone, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaHref: string;
}

const services: Service[] = [
  {
    id: 'podcast-production',
    icon: Mic,
    title: 'Podcast Production',
    description: 'Professional podcast recording with editing, color correction, and multi-camera setup.',
    price: '750 AED',
    originalPrice: '980 AED',
    popular: true,
    features: [
      '2-Camera 4K Recording',
      'Professional Audio',
      'Expert Editing',
      'Color Correction',
      '1 Hour Session',
    ],
    ctaText: 'Book Session',
    ctaHref: '/book',
  },
  {
    id: 'video-content',
    icon: Video,
    title: 'Video Content',
    description: 'High-quality video recording for content creators, perfect for YouTube and social platforms.',
    price: '350 AED',
    originalPrice: '550 AED',
    features: [
      'Studio Recording',
      'Professional Lighting',
      'Premium Audio',
      'Raw Files Delivery',
      '1 Hour Session',
    ],
    ctaText: 'Get Started',
    ctaHref: '/book',
  },
  {
    id: 'social-media-reels',
    icon: Smartphone,
    title: 'Social Media Reels',
    description: 'Engaging short-form content with professional editing, titles, and color grading.',
    price: '950 AED',
    features: [
      '5 Edited Reels',
      'Professional Editing',
      'Custom Titles',
      'Color Correction',
      'Save 300 AED',
    ],
    ctaText: 'Create Reels',
    ctaHref: '/book',
  },
];

export function ServicesOverview() {
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

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
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
            Our Services
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6"
          >
            Professional Studio
            <br />
            <span className="text-ecospace-green">Services & Packages</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From recording to final delivery, we provide everything you need to create
            exceptional content that resonates with your audience.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="relative group"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-ecospace-green text-black font-black text-xs uppercase tracking-wider px-6 py-2 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`relative h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 ${
                    service.popular
                      ? 'border-2 border-ecospace-green shadow-2xl shadow-ecospace-green/20 scale-105'
                      : 'border border-gray-200 shadow-lg hover:shadow-2xl hover:border-ecospace-green/50'
                  }`}
                >
                  {/* Card Background Gradient */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      service.popular ? 'opacity-5' : ''
                    }`}
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(168, 214, 70, 0.05) 0%, rgba(10, 61, 71, 0.05) 100%)',
                    }}
                  />

                  <div className="relative p-8">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                        service.popular
                          ? 'bg-ecospace-green text-black'
                          : 'bg-gray-100 text-ecospace-green group-hover:bg-ecospace-green group-hover:text-black'
                      }`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-black mb-3 group-hover:text-ecospace-green transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl font-black text-black">
                          {service.price}
                        </span>
                        {service.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            {service.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">per session</p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-ecospace-green flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`w-full relative overflow-hidden font-bold rounded-full py-6 shadow-lg transition-all duration-500 group/btn border ${
                        service.popular
                          ? 'bg-ecospace-green hover:bg-ecospace-green-dark text-black border-ecospace-green hover:shadow-ecospace-green/50'
                          : 'bg-white hover:bg-ecospace-green text-black border-gray-300 hover:border-ecospace-green hover:shadow-ecospace-green/30'
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <Link
                        href={service.ctaHref}
                        className="flex items-center justify-center gap-2 relative z-10"
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          const centerX = rect.width / 2;
                          const centerY = rect.height / 2;
                          const rotateX = ((y - centerY) / centerY) * -3;
                          const rotateY = ((x - centerX) / centerX) * 3;
                          e.currentTarget.parentElement!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.parentElement!.style.transform =
                            'rotateX(0deg) rotateY(0deg)';
                        }}
                      >
                        {/* Shimmer Effect */}
                        <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                        <span className="uppercase tracking-wider text-sm font-medium relative z-10">
                          {service.ctaText}
                        </span>
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
                      </Link>
                    </Button>
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
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-6">
            Need a custom package or have questions?
          </p>
          <Button
            asChild
            size="lg"
            className="relative overflow-hidden bg-white/90 hover:bg-ecospace-green text-black font-bold rounded-full px-10 py-7 shadow-xl hover:shadow-ecospace-green/50 transition-all duration-500 group border-2 border-gray-300 hover:border-ecospace-green"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-3 relative z-10"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                e.currentTarget.parentElement!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.parentElement!.style.transform =
                  'rotateX(0deg) rotateY(0deg)';
              }}
            >
              {/* Shimmer Effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

              <span className="uppercase tracking-widest font-medium relative z-10">
                View All Pricing
              </span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
