
// src/app/(public)/conference/[id]/page.tsx
import * as React from "react";
import { Suspense } from "react";
import { getConferenceById } from "@/services/conferenceService";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function ConferenceDetailPage({ params }: ConferenceDetailPageProps) {
  const LoadingSkeleton = () => (
    <div className="container py-12 md:py-24">
      <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="md:col-span-2 space-y-6">
                  <Skeleton className="h-8 w-1/4" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-8 w-1/4" />
                  <Skeleton className="h-20 w-full" />
              </div>
              <div className="space-y-6">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-40 w-full" />
              </div>
          </div>
      </div>
    </div>
  );
  
  // This is a server component, so we can pass the ID directly.
  const conferenceId = params.id;

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ConferenceDetailClient conferenceId={conferenceId} />
    </Suspense>
  );
}
