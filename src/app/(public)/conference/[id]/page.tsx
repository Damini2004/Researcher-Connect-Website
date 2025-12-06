// src/app/(public)/conference/[id]/page.tsx
import * as React from "react";
import { getConferenceById } from "@/services/conferenceService";
import ConferenceDetailClient from "@/components/conference/conference-detail-client";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const { conference } = await getConferenceById(id);

  if (!conference) {
    return {
      title: 'Conference Not Found',
    };
  }

  return {
    title: conference.title,
    description: conference.tagline || `Join the ${conference.title} on ${conference.date} in ${conference.location}.`,
  };
}

interface ConferenceDetailPageProps {
  params: { id: string };
}

export default async function ConferenceDetailPage({ params }: ConferenceDetailPageProps) {
  const { conference, message } = await getConferenceById(params.id);

  if (!conference) {
    return (
      <div className="container py-12 md:py-24 text-center">
        <h1 className="text-2xl font-bold">Conference Not Found</h1>
        <p className="text-muted-foreground mt-2">{message || "The conference you are looking for does not exist or could not be loaded."}</p>
      </div>
    );
  }

  return <ConferenceDetailClient conference={conference} />;
}
