'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage: string;
  readTime: string;
}

// Placeholder blog posts (will be replaced with real data from database later)
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-start-podcast-dubai',
    title: 'How to Start a Podcast in Dubai: Complete Guide for 2024',
    excerpt: 'Everything you need to know about launching your podcast in Dubai, from equipment to marketing strategies and legal requirements.',
    category: 'Getting Started',
    publishedAt: '2024-01-15',
    coverImage: '/images/studio-hero-1.jpg',
    readTime: '8 min read',
  },
  {
    id: '2',
    slug: 'podcast-editing-tips',
    title: '10 Pro Podcast Editing Tips to Make Your Show Sound Amazing',
    excerpt: 'Learn professional editing techniques that will transform your podcast audio quality and keep listeners engaged from start to finish.',
    category: 'Production Tips',
    publishedAt: '2024-01-10',
    coverImage: '/images/studio-portfolio-1.jpg',
    readTime: '6 min read',
  },
  {
    id: '3',
    slug: 'grow-podcast-audience',
    title: 'How to Grow Your Podcast Audience in the Middle East',
    excerpt: 'Proven strategies for promoting your podcast and building a loyal audience in Dubai, UAE, and across the Middle East region.',
    category: 'Marketing',
    publishedAt: '2024-01-05',
    coverImage: '/images/studio-portfolio-2.jpg',
    readTime: '10 min read',
  },
];

export function BlogPreview() {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
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
            Blog & Resources
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            style={{ fontWeight: 250 }}
          >
            Latest{' '}
            <span className="text-ecospace-green">Insights</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-400 font-light max-w-2xl mx-auto"
          >
            Tips, guides, and industry insights to help you create better podcasts
          </motion.p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              className="group relative"
            >
              <Link href={`/blog/${post.slug}`}>
                {/* Card */}
                <div className="relative h-full backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-500 bg-white/5 border border-white/10 hover:border-ecospace-green/50 hover:bg-white/10">
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ecospace-green/90 backdrop-blur-sm">
                        <Tag className="w-3 h-3 text-black" />
                        <span className="text-xs font-semibold text-black uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-light">{formatDate(post.publishedAt)}</span>
                      </div>
                      <span>•</span>
                      <span className="font-light">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl text-white mb-3 font-light line-clamp-2 group-hover:text-ecospace-green transition-colors duration-300" style={{ fontWeight: 250 }}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 font-light leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-ecospace-green font-light group-hover:gap-3 transition-all duration-300">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ecospace-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-light text-lg rounded-full hover:border-ecospace-green hover:bg-ecospace-green/10 transition-all duration-500 group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
