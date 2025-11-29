import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to count words
function countWords(content: string): number {
  return content.trim().split(/\s+/).length;
}

// GET all posts or filter by status/category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      categoryId,
      tags,
      authorName,
      authorEmail,
      metaTitle,
      metaDescription,
      keywords,
      status,
      isFeatured,
    } = body;

    // Calculate reading time and word count
    const readingTime = calculateReadingTime(content);
    const wordCount = countWords(content);

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        categoryId,
        tags: tags || [],
        authorName,
        authorEmail,
        readingTime,
        wordCount,
        metaTitle,
        metaDescription,
        keywords: keywords || [],
        status: status || 'DRAFT',
        isFeatured: isFeatured || false,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
      include: {
        category: true,
      },
    });

    // Update category post count
    if (categoryId && status === 'PUBLISHED') {
      await prisma.blogCategory.update({
        where: { id: categoryId },
        data: {
          postCount: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
