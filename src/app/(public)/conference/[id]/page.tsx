// src/app/(public)/conference/[id]/page.tsx
"use client";

import * as React from "react";
import { getConferenceById } from "@/services/conferenceService";
import ConferenceDetailClient from "@/components/conference/conference-detail-client";
import type { Conference } from "@/lib/types";
import { Logo } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

// The page is now a Client Component to handle data fetching and state
export default function ConferenceDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const [conference, setConference] = React.useState<Conference | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchConference = async () => {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      if (!id) {
        setError("No conference ID provided.");
        setIsLoading(false);
        return;
      }
      
      try {
        const result = await getConferenceById(id);
        if (result.success && result.conference) {
          setConference(result.conference);
        } else {
          setError(result.message);
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (e: any) {
        setError("An unexpected error occurred while fetching the conference.");
        toast({
            title: "Error",
            description: e.message || "Could not fetch conference details.",
            variant: "destructive",
          });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConference();
  }, [params.id, toast]);

  if (isLoading) {
    return (
      <div className="container py-12 md:py-24 text-center">
        <Logo className="h-32 w-32 mx-auto animate-pulse" />
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
        <p className="text-muted-foreground mt-2">The requested conference could not be loaded.</p>
      </div>
    );
  }

  // We pass the fetched data directly to the client component
  return <ConferenceDetailClient conference={conference} />;
}
