'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  FileText,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: string;
  isFeatured: boolean;
  viewCount: number;
  readingTime: number;
  createdAt: string;
  publishedAt: string | null;
  category: {
    id: string;
    name: string;
    color: string;
  } | null;
}

const statusColors = {
  DRAFT: 'bg-gray-500/10 text-gray-500',
  PUBLISHED: 'bg-green-500/10 text-green-500',
  ARCHIVED: 'bg-red-500/10 text-red-500',
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/blog/posts?${params}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-white font-light">Blog Posts</h1>
          <p className="text-gray-400 font-light mt-1">
            Manage blog content and articles
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-6 py-3 bg-ecospace-green text-black rounded-xl font-light hover:bg-ecospace-green/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-ecospace-green/50 font-light"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-ecospace-green/50 cursor-pointer font-light"
        >
          <option value="">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Posts Grid */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-ecospace-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="divide-y divide-gray-800">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-white font-light truncate">
                        {post.title}
                      </h3>
                      {post.isFeatured && (
                        <span className="px-2 py-1 bg-ecospace-green/10 text-ecospace-green text-xs rounded-full font-light">
                          Featured
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-light ${
                          statusColors[post.status as keyof typeof statusColors]
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>

                    {post.excerpt && (
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2 font-light">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {post.category && (
                        <span
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: `${post.category.color}20`,
                            color: post.category.color,
                          }}
                        >
                          {post.category.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString('en-AE')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.viewCount} views
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blog/edit/${post.slug}`}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deletePost(post.slug)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-white font-light mb-2">No posts found</p>
            <p className="text-gray-500 text-sm">
              {searchQuery || statusFilter
                ? 'Try adjusting your filters'
                : 'Create your first blog post to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
