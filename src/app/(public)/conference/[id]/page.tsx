// src/app/(public)/conference/[id]/page.tsx
import * as React from "react";
import { getConferenceById } from "@/services/conferenceService";
import ConferenceDetailClient from "@/components/conference/conference-detail-client";
import type { Conference } from "@/lib/types";
import { Logo } from "@/components/icons";
import type { Metadata } from 'next';

interface ConferenceDetailPageProps {
  params: { id: string };
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }: ConferenceDetailPageProps): Promise<Metadata> {
  const result = await getConferenceById(params.id);

  if (!result.success || !result.conference) {
    return {
      title: 'Conference Not Found',
    };
  }

  return {
    title: result.conference.title,
    description: result.conference.aboutConference.substring(0, 160), // Use the 'about' section for description
  };
}


// The page is now an async Server Component
export default async function ConferenceDetailPage({ params }: ConferenceDetailPageProps) {
  
  const result = await getConferenceById(params.id);

  if (!result.success || !result.conference) {
    return (
      <div className="container py-12 md:py-24 text-center">
        <h1 className="text-2xl font-bold">Conference Not Found</h1>
        <p className="text-muted-foreground mt-2">{result.message}</p>
      </div>
    );
  }

  // We pass the fetched data directly to the client component
  return <ConferenceDetailClient conference={result.conference} />;
}
