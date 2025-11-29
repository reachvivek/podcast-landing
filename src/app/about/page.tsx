'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Award, Users, Mic, Video, Headphones, Zap, CheckCircle, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Episodes Recorded' },
    { number: '200+', label: 'Happy Creators' },
    { number: '4.9/5', label: 'Client Rating' },
    { number: '24/7', label: 'Support Available' },
  ];

  const features = [
    {
      icon: Mic,
      title: 'Professional Equipment',
      description: 'Industry-leading microphones, audio interfaces, and recording gear for crystal-clear sound quality.',
    },
    {
      icon: Video,
      title: 'Multi-Camera Setup',
      description: 'Professional video recording with multiple camera angles for engaging visual content.',
    },
    {
      icon: Headphones,
      title: 'Expert Production',
      description: 'Experienced audio engineers and editors to ensure broadcast-quality output.',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Quick editing and delivery within 2-7 business days, ready for publishing.',
    },
  ];

  const values = [
    'Quality first - We never compromise on production standards',
    'Creator-focused - Your vision and comfort are our priorities',
    'Innovation - Latest technology and techniques in podcasting',
    'Accessibility - Professional studio experience at fair prices',
    'Community - Building Dubai\'s podcasting ecosystem',
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              About <span className="text-ecospace-green">EcoSpace</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dubai's premier podcast studio at the heart of Dubai World Trade Center,
              empowering creators to share their stories with the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-ecospace-green mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2023, EcoSpace was born from a simple observation: Dubai needed a
                  professional podcast studio that combined world-class equipment with an
                  approachable, creator-first mentality.
                </p>
                <p>
                  Located in the prestigious Dubai World Trade Center, we've created a space
                  where entrepreneurs, influencers, business leaders, and storytellers can
                  produce broadcast-quality content without the traditional barriers of entry.
                </p>
                <p>
                  Today, we're proud to be the go-to destination for podcast recording in Dubai,
                  having helped hundreds of creators launch and grow their shows with professional
                  production quality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/studio-hero-1.jpg"
                alt="EcoSpace Studio"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need for professional podcast production under one roof
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-white/10 hover:border-ecospace-green/50 transition-all"
                >
                  <Icon className="w-12 h-12 text-ecospace-green mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at EcoSpace
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 mb-6"
              >
                <CheckCircle className="w-6 h-6 text-ecospace-green flex-shrink-0 mt-1" />
                <p className="text-gray-300 text-lg">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8 text-ecospace-green" />
                <h2 className="text-4xl font-bold text-white">Prime Location</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">Dubai World Trade Center</strong> is the
                  perfect location for your podcast studio needs - at the heart of Dubai's
                  business district.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    Easy access from Sheikh Zayed Road
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    Walking distance from metro station
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    Ample parking available
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-ecospace-green flex-shrink-0" />
                    Surrounded by cafes and amenities
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.3859434086537!2d55.28214431501205!3d25.22943798388708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433d4c0abf15%3A0x8c7d8e8e8e8e8e8e!2sDubai%20World%20Trade%20Centre!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-ecospace-green/10 via-black to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Podcast?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of creators who trust EcoSpace for their podcast production needs.
            </p>
            <a
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ecospace-green text-black font-semibold rounded-full hover:bg-ecospace-green/90 transition-all text-lg"
            >
              Book Your Session
            </a>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
