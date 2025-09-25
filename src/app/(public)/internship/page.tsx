
// src/app/(public)/internship/page.tsx

import InternshipPageContent from "@/components/internship/internship-page-content";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internship Program',
  description: 'Explore internship opportunities at Researcher Connect. Gain hands-on experience, expert mentorship, and career development in fields like AI, marketing, and editorial services.',
};

export default function InternshipPage() {
    return <InternshipPageContent />;
}
