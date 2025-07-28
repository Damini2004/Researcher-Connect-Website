
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useCallback } from "react";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ChevronRight,
  Download,
  FileText,
  PlayCircle,
  Award,
} from "lucide-react";
import ConferenceCountdown from "@/components/ui/conference-countdown";

export default function UpcomingConferencesPage() {
  const [allConferences, setAllConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [upcomingConference, setUpcomingConference] =
    useState<Conference | null>(null);

  const fetchAndFilterConferences = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getConferences();
      const upcoming = data
        .filter(
          (conf) => conf.dateObject && conf.dateObject.getTime() >= new Date().getTime()
        )
        .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());

      setAllConferences(upcoming);
      if (upcoming.length > 0) {
        setUpcomingConference(upcoming[0]);
      }
    } catch (error) {
      console.error("Error fetching conferences:", error);
      toast({
        title: "Error",
        description: "Could not fetch conferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAndFilterConferences();
  }, [fetchAndFilterConferences]);

  const renderParagraphs = (text: string | undefined, truncate = false) => {
    if (!text) return null;
    let content = text;
    if (truncate && text.length > 400) {
        content = text.substring(0, 400) + "...";
    }

    return (
      <div className="text-muted-foreground space-y-2">
        <p>
            {content}
            {truncate && text.length > 400 && upcomingConference && (
                <Link href={`/conference/${upcomingConference.id}`} className="text-primary font-semibold hover:underline ml-1">
                    View More...
                </Link>
            )}
        </p>
      </div>
    );
  };
  
  const renderListFromString = (text?: string) => {
    if (!text) return <p className="text-muted-foreground">Not available.</p>;
    return (
      <ul className="list-disc list-inside text-muted-foreground space-y-1">
        {text.split('\n').map((item, index) => item.trim() && <li key={index}>{item.trim()}</li>)}
      </ul>
    );
  };

  if (isLoading) {
    return (
      <div className="container py-12 md:py-24">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="w-full h-[400px] rounded-lg" />
        </div>
      </div>
    );
  }

  if (!upcomingConference) {
    return (
      <div className="container py-12 md:py-24 text-center">
        <h1 className="text-2xl font-bold">No Upcoming Conferences</h1>
        <p className="text-muted-foreground mt-2">
          Please check back later for new events.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary/30">
      {/* --- Hero Section --- */}
      <section className="relative w-full h-[500px] bg-gray-800 text-white">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&h=500&auto=format&fit=crop"
          alt="Conference background"
          fill
          className="object-cover opacity-20"
          data-ai-hint="conference audience"
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-between py-8">
            {/* Breadcrumbs */}
            <div>
              <div className="flex items-center text-sm text-white/80">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span className="font-semibold text-white">Upcoming International Conference</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
                    {/* Left: Logo */}
                    <div className="md:col-span-4 flex justify-center md:justify-start">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <Image src={upcomingConference.imageSrc} alt={`${upcomingConference.shortTitle} logo`} width={200} height={200} data-ai-hint="logo brand" className="w-40 h-40 object-contain"/>
                        </div>
                    </div>
                    {/* Right: Details */}
                    <div className="md:col-span-8 text-center md:text-left space-y-4">
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-amber-400">{upcomingConference.title}</h1>
                        <div className="inline-flex items-center gap-4 bg-white/90 text-black px-4 py-2 rounded-full font-semibold text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary"/>
                                <span>{upcomingConference.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary"/>
                                <span>{upcomingConference.location}</span>
                            </div>
                        </div>
                         <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2">
                            <Button variant="outline" className="bg-white/90 text-black hover:bg-white"><FileText /> Abstract Submission</Button>
                            <Button variant="outline" className="bg-white/90 text-black hover:bg-white"><Download /> Download Brochure</Button>
                            <Button variant="outline" className="bg-white/90 text-black hover:bg-white"><Award /> Registration</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Countdown */}
            <div className="flex justify-end">
                <ConferenceCountdown targetDate={upcomingConference.startDate} />
            </div>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">About Conference</h2>
              <hr className="border-dotted border-border mb-4" />
              {renderParagraphs(upcomingConference.aboutConference, true)}
            </section>
            <Card>
                <CardHeader><CardTitle>Keynote Speakers</CardTitle></CardHeader>
                <CardContent>
                    {renderListFromString(upcomingConference.keynoteSpeakers)}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Conference Tracks</CardTitle></CardHeader>
                <CardContent>
                    {renderListFromString(upcomingConference.tracks)}
                </CardContent>
            </Card>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <span>Abstract Submission Deadline</span>
                  <span className="font-semibold">
                    {upcomingConference.submissionEndDate}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <span>Full Paper Submission Deadline</span>
                  <span className="font-semibold">
                    {upcomingConference.submissionEndDate}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <span>Registration Deadline</span>
                  <span className="font-semibold">
                    {upcomingConference.endDate}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Other Upcoming Conferences</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {allConferences.filter(c => c.id !== upcomingConference.id).slice(0, 4).map(conf => (
                            <li key={conf.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                                <Link href={`/conference/${conf.id}`} className="font-semibold hover:text-primary transition-colors">{conf.title}</Link>
                                <p className="text-xs text-muted-foreground mt-1">{conf.date} &bull; {conf.location}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

    
