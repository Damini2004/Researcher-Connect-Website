
// src/app/(public)/blogs/page.tsx
import BlogPageContent from "@/components/blog/blog-page-content";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore the latest articles, insights, and news from the Researcher Connect team on academic publishing, research trends, and more.',
};

export default function BlogsPage() {
    return <BlogPageContent />;
}
