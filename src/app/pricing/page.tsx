'use client';

import { FeaturedPackage } from '@/components/sections/FeaturedPackage';
import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';

export default function PricingPage() {
  return (
    <MainLayout>
      {/* All Pricing Packages */}
      <FeaturedPackage showViewAllButton={false} />

      {/* Custom Package CTA */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 md:p-12"
          >
            <h3 className="text-3xl md:text-4xl text-white mb-4" style={{ fontWeight: 250 }}>
              Need a <span className="text-ecospace-green">Custom Package</span>?
            </h3>
            <p className="text-gray-400 text-lg mb-8 font-light">
              Every creator is unique. Let&apos;s build a package tailored to your specific needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-ecospace-green text-black font-medium hover:bg-ecospace-green/90 transition-all duration-300 uppercase tracking-widest text-sm hover:scale-105"
              >
                Book a Consultation
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-ecospace-green/50 text-white hover:text-ecospace-green transition-all duration-300 uppercase tracking-widest text-sm font-light"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
