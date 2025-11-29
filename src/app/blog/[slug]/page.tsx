'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { blogPosts } from '@/data/blogPosts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Convert markdown-style content to HTML-like structure
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-light text-white mt-12 mb-6">
            {line.replace('## ', '')}
          </h2>
        );
      }

      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-4" />;
      }

      // Regular paragraphs
      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-6 text-lg font-light">
          {line}
        </p>
      );
    });
  };

  return (
    <MainLayout>
      <article className="min-h-screen bg-black pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-ecospace-green transition-colors font-light"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-12"
          >
            {/* Category Badge */}
            {post.category && (
              <div className="mb-6">
                <span
                  className="inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: post.category.color,
                    color: '#000',
                  }}
                >
                  {post.category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-light leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-400 mb-8 font-light leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-light">{formatDate(post.publishedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-light">{post.readingTime} min read</span>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          {post.featuredImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              {renderContent(post.content)}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="max-w-3xl mx-auto my-16">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Back to Blog CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-light text-lg rounded-full hover:border-ecospace-green hover:bg-ecospace-green/10 transition-all duration-500"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Read more articles</span>
            </Link>
          </motion.div>
        </div>
      </article>
    </MainLayout>
  );
}
