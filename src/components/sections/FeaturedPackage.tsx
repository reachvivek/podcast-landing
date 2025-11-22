'use client';

import { motion } from 'framer-motion';
import { Check, Star, Sparkles } from 'lucide-react';

interface PackageFeature {
  text: string;
}

interface PackageCard {
  name: string;
  price: number;
  originalPrice: number;
  savings: number;
  features: PackageFeature[];
  isPopular?: boolean;
  ctaText: string;
}

const packages: PackageCard[] = [
  {
    name: 'Basic Recording',
    price: 350,
    originalPrice: 550,
    savings: 200,
    features: [
      { text: '1-hour studio time' },
      { text: 'Professional sound' },
      { text: 'Studio lighting' },
      { text: 'Raw audio files' },
    ],
    ctaText: 'Book Now',
  },
  {
    name: 'Podcast + Editing',
    price: 750,
    originalPrice: 980,
    savings: 230,
    isPopular: true,
    features: [
      { text: '1-hour video recording' },
      { text: '2-camera setup' },
      { text: 'Professional sound & lights' },
      { text: 'Full editing & color correction' },
      { text: 'Ready-to-publish content' },
    ],
    ctaText: 'Book This Package',
  },
  {
    name: 'Studio Rental',
    price: 200,
    originalPrice: 300,
    savings: 100,
    features: [
      { text: 'Personal production' },
      { text: 'Bring your equipment' },
      { text: 'Full studio access' },
      { text: 'Flexible hours' },
    ],
    ctaText: 'Get Quote',
  },
];

export function FeaturedPackage() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Studio Packages
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package for your content
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl overflow-hidden ${
                pkg.isPopular
                  ? 'bg-[#0A3D47] text-white shadow-2xl md:scale-105 md:-my-4 z-10'
                  : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
              } transition-all duration-300`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-[#A8D646] text-[#0A3D47] font-bold text-sm py-2 px-4 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    MOST POPULAR
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className={`flex flex-col flex-grow p-6 lg:p-8 ${pkg.isPopular ? 'pt-14' : ''}`}>
                {/* Package Name */}
                <h3 className={`text-xl lg:text-2xl font-bold mb-4 ${
                  pkg.isPopular ? 'text-white' : 'text-gray-900'
                }`}>
                  {pkg.name}
                </h3>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-4xl lg:text-5xl font-bold ${
                      pkg.isPopular ? 'text-[#A8D646]' : 'text-[#0A3D47]'
                    }`}>
                      {pkg.price}
                    </span>
                    <span className={`text-lg ${
                      pkg.isPopular ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      AED
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`line-through text-sm ${
                      pkg.isPopular ? 'text-gray-400' : 'text-gray-400'
                    }`}>
                      {pkg.originalPrice} AED
                    </span>
                    <span className="bg-[#A8D646] text-[#0A3D47] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      SAVE {pkg.savings} AED
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-grow">
                  <p className={`text-sm font-semibold mb-3 ${
                    pkg.isPopular ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    What&apos;s Included:
                  </p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          pkg.isPopular ? 'bg-[#A8D646]' : 'bg-[#A8D646]/20'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            pkg.isPopular ? 'text-[#0A3D47]' : 'text-[#0A3D47]'
                          }`} />
                        </div>
                        <span className={`text-sm lg:text-base ${
                          pkg.isPopular ? 'text-gray-200' : 'text-gray-600'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full mt-8 py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 ${
                    pkg.isPopular
                      ? 'bg-[#A8D646] text-[#0A3D47] hover:bg-[#9BC53D] shadow-lg'
                      : 'bg-[#0A3D47] text-white hover:bg-[#0A3D47]/90'
                  }`}
                >
                  {pkg.ctaText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Pricing Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-[#0A3D47] hover:text-[#A8D646] font-semibold text-lg transition-colors duration-300 group"
          >
            View All Packages
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
