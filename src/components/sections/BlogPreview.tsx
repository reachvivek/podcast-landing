'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';

export function BlogPreview() {
  // Show only first 3 posts as featured
  const featuredPosts = blogPosts.slice(0, 3);
  const loading = false;
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
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-ecospace-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : featuredPosts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            {featuredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                className="group relative"
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Card */}
                  <div className="relative h-full backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-500 bg-white/5 border border-white/10 hover:border-ecospace-green/50 hover:bg-white/10">
                    {/* Cover Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-900">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-ecospace-green/20 to-gray-900 flex items-center justify-center">
                          <Tag className="w-12 h-12 text-ecospace-green/40" />
                        </div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        {post.publishedAt && (
                          <>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-light">
                                {formatDate(post.publishedAt)}
                              </span>
                            </div>
                            <span>•</span>
                          </>
                        )}
                        <span className="font-light">{post.readingTime} min read</span>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-xl text-white mb-3 font-light line-clamp-2 group-hover:text-ecospace-green transition-colors duration-300"
                        style={{ fontWeight: 250 }}
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-400 font-light leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

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
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="font-light">No blog posts available yet. Check back soon!</p>
          </div>
        )}

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
