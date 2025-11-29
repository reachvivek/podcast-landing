'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { blogPosts } from '@/data/blogPosts';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category?.name).filter(Boolean))
  );

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-ecospace-green font-bold uppercase tracking-widest text-sm mb-4">
              Blog & Resources
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-light">
              Latest <span className="text-ecospace-green">Insights</span>
            </h1>
            <p className="text-lg text-gray-400 font-light">
              Tips, guides, and industry insights to help you create better podcasts
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green/50 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-full text-sm font-light transition-all ${
                  selectedCategory === null
                    ? 'bg-ecospace-green text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as string)}
                  className={`px-6 py-2 rounded-full text-sm font-light transition-all ${
                    selectedCategory === category
                      ? 'bg-ecospace-green text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
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
                        <h3 className="text-xl text-white mb-3 font-light line-clamp-2 group-hover:text-ecospace-green transition-colors duration-300">
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
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-light">
                No articles found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
