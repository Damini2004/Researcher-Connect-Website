

// src/app/(public)/publications/page.tsx

import PublicationsPageContent from '@/components/publications/publications-page-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications and Webinars',
  description: 'Explore our collection of academic journals and stay updated with our upcoming expert-led webinars. Search for publications and register for events.',
};

export default function PublicationsPage() {
  return <PublicationsPageContent />;
}
