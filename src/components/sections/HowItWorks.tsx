'use client';

import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Mic2, Video } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Book Your Session',
    description: 'Choose your package and pick a time slot that works for you. We\'re open 7 days a week.',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Quick Consultation',
    description: 'We\'ll connect via WhatsApp to understand your vision and prepare everything in advance.',
  },
  {
    number: '03',
    icon: Mic2,
    title: 'Record Your Content',
    description: 'Arrive at the studio, relax, and focus on your content. We handle all the technical setup.',
  },
  {
    number: '04',
    icon: Video,
    title: 'Receive Your Files',
    description: 'Get professionally edited content ready for upload. Quick turnaround on all packages.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-ecospace-green uppercase tracking-widest text-sm mb-4 font-light">
            Simple Process
          </p>
          <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontWeight: 250 }}>
            From Booking to{' '}
            <span className="text-ecospace-green">Broadcast</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
            We've streamlined the entire process so you can focus on what matters - your content.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ecospace-green/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ecospace-green/30 transition-all duration-500 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-ecospace-green text-black text-sm font-medium rounded-full">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-ecospace-green/10 flex items-center justify-center mb-6 group-hover:bg-ecospace-green/20 transition-colors duration-300 mt-4">
                    <step.icon className="w-8 h-8 text-ecospace-green" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl text-white mb-3 font-light">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop (between cards) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 -translate-y-1/2 z-10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-full h-full text-ecospace-green/50"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="/book"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ecospace-green text-black font-light hover:bg-ecospace-green/90 transition-all duration-300 uppercase tracking-widest text-sm"
          >
            <Calendar className="w-5 h-5" />
            Start Your Booking
          </a>
        </motion.div>
      </div>
    </section>
  );
}
