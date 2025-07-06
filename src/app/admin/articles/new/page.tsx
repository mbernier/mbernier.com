import React from 'react';
import { requireAdminAuth } from '@/lib/auth';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ContentEditor } from '@/components/admin/ContentEditor';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { logAdminAction } from '@/lib/auth';

interface ContentMetadata {
  title: string;
  excerpt: string;
  tags: string[];
  categories: string[];
  focusKeyword?: string;
  secondaryKeywords?: string[];
  image?: string;
  relatedContent?: Array<{
    id: string;
    title: string;
    slug: string;
    type: 'article' | 'project' | 'offer';
    relevanceScore?: number;
    manual?: boolean;
  }>;
}

async function createArticle(content: string, metadata: ContentMetadata) {
  'use server';
  
  const user = await requireAdminAuth();
  
  try {
    const article = await prisma.article.create({
      data: {
        slug: generateSlug(metadata.title),
        title: metadata.title,
        content,
        excerpt: metadata.excerpt,
        tags: metadata.tags,
        categories: metadata.categories,
        focusKeyword: metadata.focusKeyword,
        secondaryKeywords: metadata.secondaryKeywords || [],
        image: metadata.image,
        status: 'draft',
        featured: false,
      },
    });

    // Log admin action
    await logAdminAction('create', 'article', article.id);

    // Redirect to edit page
    redirect(`/admin/articles/${article.id}/edit`);
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function NewArticlePage() {
  await requireAdminAuth();

  const handleSave = async (content: string, metadata: ContentMetadata) => {
    await createArticle(content, metadata);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-graphite">Create New Article</h1>
            <p className="text-gray-600">
              Use the AI-powered editor to create and enhance your content
            </p>
          </div>
        </div>

        <ContentEditor
          contentType="article"
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}