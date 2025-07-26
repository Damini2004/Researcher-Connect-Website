
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentDateInIndia } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ConferenceSidebarForm from "@/components/forms/conference-sidebar-form";

const ITEMS_PER_PAGE = 5;

export default function UpcomingConferencesPage() {
  const [allConferences, setAllConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
        setAllConferences(upcoming);
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

  const paginatedConferences = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allConferences.slice(startIndex, endIndex);
  }, [allConferences, currentPage]);

  const totalPages = Math.ceil(allConferences.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const featuredConferences = useMemo(() => {
    return allConferences.slice(0, 5);
  }, [allConferences]);

  return (
    <div className="bg-secondary/30">
      {/* --- Carousel Header --- */}
      <section className="py-12 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            Upcoming International Conference 2025
          </h2>
          {isLoading ? (
            <div className="flex justify-center">
              <Skeleton className="h-[250px] w-full max-w-4xl" />
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {featuredConferences.map((conf) => (
                  <CarouselItem key={conf.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden h-full">
                        <CardContent className="flex flex-col items-center text-center p-6">
                           <Image
                            src={conf.imageSrc || "https://placehold.co/80x80.png"}
                            alt={`${conf.title} logo`}
                            width={80}
                            height={80}
                            className="mb-4 rounded-md object-contain"
                            data-ai-hint="logo"
                          />
                          <p className="text-sm font-semibold text-primary">{conf.conferenceType}</p>
                          <p className="font-bold text-base leading-tight my-2">{conf.title}</p>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p className="flex items-center justify-center gap-2"><Calendar className="h-4 w-4" /> {conf.date}</p>
                            <p className="flex items-center justify-center gap-2"><MapPin className="h-4 w-4" /> {conf.location}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
            </Carousel>
          )}
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* --- Left Column: Conference List --- */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  CPD Accredited IFERP Conferences listed in CPD directory
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center gap-6">
                <Image
                  src="https://placehold.co/100x100.png"
                  alt="CPD Standards Office"
                  width={100}
                  height={100}
                  data-ai-hint="logo award"
                />
                <div className="flex-1">
                  <p className="font-bold">The CPD Standards Office</p>
                  <p className="text-sm text-muted-foreground">CPD Provider: 21182 | 2024-2026</p>
                  <p className="text-xs text-muted-foreground mt-1">www.cpdstandards.com</p>
                </div>
                <Button>Get CPD Directory - Listed IFERP Conferences</Button>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold">
                List of Upcoming Scopus International Conference 2025-2026
              </h2>
              <p className="text-muted-foreground mt-2">
                Engineering and technology are exceptionally dynamic sectors.
                They are constantly evolving and expanding. Experts,
                professionals, and academics in the field have to try and keep
                up with the latest developments...
              </p>
            </div>

            <Card className="overflow-hidden">
                <CardHeader className="bg-muted/50 border-b p-4">
                     <h3 className="font-semibold text-center">Find International Conferences</h3>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="grid md:grid-cols-4 gap-4">
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select Topic" /></SelectTrigger>
                            <SelectContent><SelectItem value="any">Any Topic</SelectItem></SelectContent>
                        </Select>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger>
                            <SelectContent><SelectItem value="any">Any Country</SelectItem></SelectContent>
                        </Select>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Select Month" /></SelectTrigger>
                            <SelectContent><SelectItem value="any">Any Month</SelectItem></SelectContent>
                        </Select>
                        <Button>Search Event</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {isLoading ? (
                    [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                        <Card key={i}><CardContent className="p-4"><Skeleton className="h-24 w-full" /></CardContent></Card>
                    ))
                ) : paginatedConferences.length > 0 ? (
                    paginatedConferences.map((conf) => (
                        <Card key={conf.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
                                <Image src={conf.imageSrc || "https://placehold.co/80x80.png"} alt={`${conf.title} logo`} width={80} height={80} className="rounded-md object-contain" data-ai-hint="logo"/>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="font-semibold">{conf.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{conf.description}</p>
                                    <p className="text-sm text-primary font-medium flex items-center justify-center md:justify-start gap-2 mt-1"><Calendar className="h-4 w-4"/>{conf.date}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/>{conf.location}</p>
                                    <Button variant="link" asChild className="h-auto p-0 mt-1">
                                        <Link href={`/conference/${conf.id}`}><Eye className="h-4 w-4 mr-1"/> View Details</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">No upcoming conferences found.</p>
                )}
            </div>
            
            {totalPages > 1 && (
                 <div className="flex justify-center items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4"/></Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} size="icon" onClick={() => handlePageChange(i + 1)}>{i + 1}</Button>
                    ))}
                    <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><ChevronRight className="h-4 w-4"/></Button>
                </div>
            )}
          </div>

          {/* --- Right Column: Sidebar --- */}
          <aside className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Indexed By</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="border p-2 rounded-md flex justify-center items-center"><Image src="https://logodix.com/logo/2038481.png" alt="DOAJ" width={100} height={40} data-ai-hint="logo company" className="object-contain"/></div>
                    <div className="border p-2 rounded-md flex justify-center items-center"><Image src="https://logodix.com/logo/1993463.png" alt="Scopus" width={100} height={40} data-ai-hint="logo brand" className="object-contain"/></div>
                    <div className="border p-2 rounded-md flex justify-center items-center"><Image src="https://logodix.com/logo/1712867.png" alt="EBSCO" width={100} height={40} data-ai-hint="logo business" className="object-contain"/></div>
                    <div className="border p-2 rounded-md flex justify-center items-center"><Image src="https://logodix.com/logo/1101923.png" alt="Crossref" width={100} height={40} data-ai-hint="logo tech" className="object-contain"/></div>
                </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground text-center">
                <CardHeader>
                    <CardTitle>Life Science Conferences</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="secondary" asChild><Link href="#">Visit Now</Link></Button>
                </CardContent>
            </Card>
            <ConferenceSidebarForm />
            <Card>
                <CardHeader><CardTitle>Conference By Country</CardTitle></CardHeader>
                <CardContent>
                    <RadioGroup defaultValue="canada">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="canada" id="canada" /><Label htmlFor="canada">Canada</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="india" id="india" /><Label htmlFor="india">India</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="indonesia" id="indonesia" /><Label htmlFor="indonesia">Indonesia</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="malaysia" id="malaysia" /><Label htmlFor="malaysia">Malaysia</Label></div>
                    </RadioGroup>
                </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
