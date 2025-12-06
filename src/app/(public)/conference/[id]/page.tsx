// src/app/(public)/conference/[id]/page.tsx
"use client";

import * as React from "react";
import { getConferenceById } from "@/services/conferenceService";
import ConferenceDetailClient from "@/components/conference/conference-detail-client";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/icons";

interface ConferenceDetailPageProps {
  params: { id: string };
}

export default function ConferenceDetailPage({ params }: ConferenceDetailPageProps) {
  const [conference, setConference] = React.useState<Conference | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchConference = async () => {
      if (!params.id) {
        setError("No conference ID provided.");
        setIsLoading(false);
        return;
      }
      
      try {
        const result = await getConferenceById(params.id);
        if (result.success && result.conference) {
          setConference(result.conference);
        } else {
          setError(result.message);
          toast({
            title: 'Error',
            description: result.message,
            variant: 'destructive',
          });
        }
      } catch (e: any) {
        setError("An unexpected error occurred while fetching conference data.");
        toast({
            title: 'Error',
            description: e.message || "Could not load conference.",
            variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConference();
  }, [params.id, toast]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Logo className="h-32 w-32 animate-pulse" />
      </div>
    );
  }

  if (error) {
     return (
      <div className="container py-12 md:py-24 text-center">
        <h1 className="text-2xl font-bold">Conference Not Found</h1>
        <p className="text-muted-foreground mt-2">{error}</p>
      </div>
    );
  }

  if (!conference) {
    return (
        <div className="container py-12 md:py-24 text-center">
            <h1 className="text-2xl font-bold">Conference Not Found</h1>
            <p className="text-muted-foreground mt-2">The conference you are looking for does not exist or could not be loaded.</p>
        </div>
    );
  }

  return <ConferenceDetailClient conference={conference} />;
}
