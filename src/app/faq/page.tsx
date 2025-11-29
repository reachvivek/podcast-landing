'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, MessageCircle, Calendar, DollarSign, Settings, Clock, FileText } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      category: 'Booking & Pricing',
      question: 'How do I book a recording session?',
      answer: 'You can book directly through our website by clicking "Book Studio" and selecting your preferred date, time, and package. You\'ll receive instant confirmation via email and WhatsApp.',
    },
    {
      category: 'Booking & Pricing',
      question: 'What are your pricing packages?',
      answer: 'We offer flexible packages starting from 350 AED. Our packages include Audio Only (350 AED), Video Podcast (650 AED), and Premium Production (950 AED) with varying levels of editing, camera setups, and turnaround times. Check our pricing page for detailed breakdowns.',
    },
    {
      category: 'Booking & Pricing',
      question: 'Can I reschedule or cancel my booking?',
      answer: 'Yes! You can reschedule up to 24 hours before your session at no charge. Cancellations made less than 24 hours in advance may incur a 50% fee. Please contact us as soon as possible if you need to make changes.',
    },
    {
      category: 'Booking & Pricing',
      question: 'Do you offer discounts for multiple sessions?',
      answer: 'Absolutely! We offer package deals for creators booking multiple sessions. Contact us to discuss custom pricing for regular bookings or bulk session purchases.',
    },
    {
      category: 'Studio & Equipment',
      question: 'What equipment is included in the studio?',
      answer: 'Our studio features professional Shure SM7B microphones, Focusrite audio interfaces, Sony A7S III cameras, professional lighting, acoustic treatment, and a comfortable recording space designed for 2-4 people.',
    },
    {
      category: 'Studio & Equipment',
      question: 'Can I bring my own equipment?',
      answer: 'Yes, you\'re welcome to bring your own microphones, headphones, or other equipment if you prefer. Our team can help integrate your gear with our setup.',
    },
    {
      category: 'Studio & Equipment',
      question: 'Is the studio soundproof?',
      answer: 'Yes, our studio is professionally treated with acoustic panels and soundproofing to ensure clean, professional audio with minimal external noise.',
    },
    {
      category: 'Production & Editing',
      question: 'What\'s included in the editing service?',
      answer: 'Our editing includes removing ums/ahs, long pauses, background noise, balancing audio levels, adding intro/outro music, and basic color correction for video. Premium packages include advanced editing like motion graphics and multi-camera switching.',
    },
    {
      category: 'Production & Editing',
      question: 'How long does editing take?',
      answer: 'Standard turnaround is 2-7 business days depending on your package. Rush editing (24-48 hours) is available for an additional fee. You\'ll receive your files via a secure download link.',
    },
    {
      category: 'Production & Editing',
      question: 'What file formats do you deliver?',
      answer: 'We deliver audio in WAV and MP3 formats, and video in MP4 (1080p or 4K). We can also provide files optimized for specific platforms like YouTube, Spotify, or social media upon request.',
    },
    {
      category: 'Production & Editing',
      question: 'Can I get raw footage/audio files?',
      answer: 'Yes! Raw files are available with all packages. You\'ll receive both the edited and raw files, giving you full flexibility for your content.',
    },
    {
      category: 'Session Details',
      question: 'How long is a typical recording session?',
      answer: 'Most sessions are 1-2 hours for recording. We recommend booking extra time if you\'re recording longer episodes or need setup time for multiple guests.',
    },
    {
      category: 'Session Details',
      question: 'Can I bring guests to my recording?',
      answer: 'Absolutely! Our studio comfortably accommodates 2-4 people. We have multiple microphones and camera setups for multi-host or interview-style podcasts.',
    },
    {
      category: 'Session Details',
      question: 'Do you provide a producer or engineer?',
      answer: 'Yes, all sessions include a professional audio engineer who handles the technical aspects, monitors audio levels, and ensures everything runs smoothly so you can focus on content.',
    },
    {
      category: 'Session Details',
      question: 'Can I do remote interviews from your studio?',
      answer: 'Yes! We support remote recording via Zoom, Skype, or other platforms. Our setup ensures high-quality audio for both in-studio hosts and remote guests.',
    },
    {
      category: 'Technical',
      question: 'What if I have technical difficulties during recording?',
      answer: 'Our engineer is present throughout your session to handle any technical issues immediately. We also test all equipment before each session to minimize problems.',
    },
    {
      category: 'Technical',
      question: 'Do you offer live streaming services?',
      answer: 'Yes, we can set up live streaming to YouTube, Facebook, LinkedIn, or custom RTMP destinations. This is available as an add-on service.',
    },
    {
      category: 'Payment & Policies',
      question: 'When do I need to pay?',
      answer: 'Payment is due at the studio before or after your session. We accept cash, credit cards, and bank transfers. Full payment is required before receiving edited files.',
    },
    {
      category: 'Payment & Policies',
      question: 'What\'s your refund policy?',
      answer: 'We offer full refunds for cancellations made 48+ hours in advance. Cancellations within 24-48 hours receive a 50% refund. Same-day cancellations are non-refundable but can be rescheduled.',
    },
    {
      category: 'Location & Access',
      question: 'Where are you located?',
      answer: 'We\'re located in Dubai World Trade Center, easily accessible from Sheikh Zayed Road with metro station nearby and ample parking available.',
    },
    {
      category: 'Location & Access',
      question: 'Is parking available?',
      answer: 'Yes, there\'s ample paid parking at Dubai World Trade Center. Parking validation may be available for certain packages.',
    },
  ];

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const categoryIcons: { [key: string]: any } = {
    'Booking & Pricing': DollarSign,
    'Studio & Equipment': Settings,
    'Production & Editing': FileText,
    'Session Details': Clock,
    'Technical': Settings,
    'Payment & Policies': DollarSign,
    'Location & Access': Calendar,
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl text-white mb-6" style={{ fontWeight: 250 }}>
              Frequently Asked <span className="text-ecospace-green">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about booking and recording at EcoSpace
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {categories.map((category, categoryIndex) => {
              const Icon = categoryIcons[category] || MessageCircle;
              const categoryFAQs = faqs.filter((faq) => faq.category === category);

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="mb-12"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="w-6 h-6 text-ecospace-green" />
                    <h2 className="text-2xl text-white" style={{ fontWeight: 250 }}>{category}</h2>
                  </div>

                  {/* FAQs in Category */}
                  <div className="space-y-4">
                    {categoryFAQs.map((faq, faqIndex) => {
                      const globalIndex = faqs.indexOf(faq);
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div
                          key={globalIndex}
                          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-ecospace-green/50 overflow-hidden transition-all duration-500"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                          >
                            <span className="text-lg text-white font-light pr-4">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-ecospace-green flex-shrink-0 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <motion.div
                            initial={false}
                            animate={{
                              height: isOpen ? 'auto' : 0,
                              opacity: isOpen ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 pt-2">
                              <p className="text-gray-300 font-light leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <MessageCircle className="w-16 h-16 text-ecospace-green mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontWeight: 250 }}>Still Have Questions?</h2>
            <p className="text-xl text-gray-300 font-light mb-8">
              Can't find the answer you're looking for? Our team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ecospace-green text-black font-light rounded-full hover:bg-ecospace-green/90 transition-all duration-500"
              >
                Contact Us
              </a>
              <a
                href="https://wa.me/971502060674"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-light rounded-full hover:border-ecospace-green hover:text-ecospace-green transition-all duration-500"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
