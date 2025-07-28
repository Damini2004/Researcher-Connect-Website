
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Download,
  FileText,
  Ticket,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentDateInIndia } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import ConferenceCountdown from "@/components/ui/conference-countdown";

export default function UpcomingConferencesPage() {
  const [upcomingConference, setUpcomingConference] = useState<Conference | null>(null);
  const [otherConferences, setOtherConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(getCurrentDateInIndia());
  }, []);

  useEffect(() => {
    if (!currentDate) return;

    const fetchAndFilterConferences = async () => {
      setIsLoading(true);
      try {
        const data = await getConferences();
        const upcoming = data
          .filter(
            (conf) =>
              conf.dateObject && conf.dateObject.getTime() >= currentDate.getTime()
          )
          .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
        
        if (upcoming.length > 0) {
          setUpcomingConference(upcoming[0]);
          setOtherConferences(upcoming.slice(1, 4)); // Get next 3 for the list
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
    };
    fetchAndFilterConferences();
  }, [toast, currentDate]);


  if (isLoading) {
    return (
        <div className="container py-12 md:py-24 space-y-8">
            <Skeleton className="h-[250px] w-full" />
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        </div>
    );
  }

  if (!upcomingConference) {
    return (
      <div className="container py-12 md:py-24 text-center">
        <h1 className="text-3xl font-bold">No Upcoming Conferences</h1>
        <p className="mt-4 text-muted-foreground">Please check back later for future events.</p>
      </div>
    );
  }

  return (
    <div>
      {/* --- Hero Section --- */}
      <section className="relative h-[450px] md:h-[500px] w-full bg-slate-800 text-white">
        <Image
          src={upcomingConference.imageSrc || "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1600&h=500&auto=format&fit=crop"}
          alt={upcomingConference.title}
          data-ai-hint="academic conference"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 container h-full flex flex-col justify-end pb-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <Image src="https://logodix.com/logo/796417.png" alt="ICLTL Logo" width={120} height={120} data-ai-hint="logo brand" className="bg-white/90 p-2 rounded-lg shadow-lg"/>
                <div className="flex-1">
                    <h1 className="text-4xl font-extrabold tracking-tight">{upcomingConference.title} ({upcomingConference.shortTitle})</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 mt-2 text-white/90">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/><span>{upcomingConference.date}</span></div>
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{upcomingConference.location}</span></div>
                    </div>
                    <ConferenceCountdown targetDate={upcomingConference.startDate} />
                </div>
            </div>
            <div className="absolute bottom-12 right-12 flex items-center gap-4">
                <Button variant="secondary"><FileText className="mr-2"/>Abstract Submission</Button>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black"><Download className="mr-2"/>Download Brochure</Button>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black"><Ticket className="mr-2"/>Registration</Button>
            </div>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="container py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* --- Left Column: Conference Details --- */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle>About Conference</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{upcomingConference.aboutConference}</p>
                 <Button asChild variant="link" className="p-0 h-auto mt-2">
                  <Link href={`/conference/${upcomingConference.id}`}>
                    View More <ChevronRight className="h-4 w-4 ml-1"/>
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Conference Benefits</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Certificates will be provided to all the participants.</span></li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Opportunity to connect with professionals across the globe.</span></li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Great way of networking and knowledge upskilling.</span></li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Research assistance will be provided in all fields.</span></li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Learning from industry experts.</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* --- Right Column: Sidebar --- */}
          <aside className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Important Dates</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 border rounded-md"><span>Abstract Submission Deadline</span><span className="font-semibold">{format(new Date(upcomingConference.submissionEndDate), "PPP")}</span></div>
                    <div className="flex justify-between items-center p-2 border rounded-md"><span>Full Paper Submission Deadline</span><span className="font-semibold">{format(new Date(upcomingConference.submissionEndDate), "PPP")}</span></div>
                    <div className="flex justify-between items-center p-2 border rounded-md"><span>Registration Deadline</span><span className="font-semibold">{format(new Date(upcomingConference.endDate), "PPP")}</span></div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Indexed By</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="border p-2 rounded-md flex justify-center items-center"><Image src="https://logodix.com/logo/2038481.png" alt="DOAJ" width={100} height={40} data-ai-hint="logo company" className="object-contain"/></div>
                    <div className="border p-2 rounded-md flex justify-center items-center"><Image src="https://logodix.com/logo/1993463.png" alt="Scopus" width={100} height={40} data-ai-hint="logo brand" className="object-contain"/></div>
                    <div className="border p-2 rounded-md flex justify-center items-center"><Image src="https://logodix.com/logo/1712867.png" alt="EBSCO" width={100} height={40} data-ai-hint="logo business" className="object-contain"/></div>
                    <div className="border p-2 rounded-md flex justify-center items-center"><Image src="https://logodix.com/logo/1101923.png" alt="Crossref" width={100} height={40} data-ai-hint="logo tech" className="object-contain"/></div>
                </CardContent>
            </Card>

            {otherConferences.length > 0 && (
                 <Card>
                    <CardHeader><CardTitle>Other Upcoming Conferences</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        {otherConferences.map(conf => (
                            <div key={conf.id} className="p-2 border rounded-md">
                                <Link href={`/conference/${conf.id}`} className="font-semibold text-sm hover:text-primary">{conf.title}</Link>
                                <p className="text-xs text-muted-foreground mt-1">{conf.date} | {conf.location}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
