// src/app/(public)/services/publications-patent/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, ChevronRight, ShieldCheck, Edit, Award, Search, BookOpen, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getWebinars, Webinar } from "@/services/webinarService";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getCurrentDateInIndia } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const services = [
    { title: "Patent Search & Analysis", description: "In-depth prior art searches to assess patentability.", icon: Search },
    { title: "Patent Drafting", description: "Expertly crafting patent applications to protect your inventions.", icon: Edit },
    { title: "Journal Publishing", description: "Assistance with manuscript preparation and submission to high-impact journals.", icon: BookOpen },
    { title: "IP Strategy", description: "Developing a comprehensive strategy to protect your intellectual assets.", icon: ShieldCheck },
];

export default function PublicationsPatentPage() {
    const [webinars, setWebinars] = React.useState<Webinar[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { toast } = useToast();
    const [currentDate, setCurrentDate] = React.useState<Date | null>(null);

    React.useEffect(() => {
        setCurrentDate(getCurrentDateInIndia());
    }, []);

    React.useEffect(() => {
        if (!currentDate) return;

        const fetchWebinars = async () => {
            setIsLoading(true);
            try {
                const allWebinars = await getWebinars();
                const upcoming = allWebinars
                    .filter(webinar => webinar.dateObject && webinar.dateObject.getTime() >= currentDate.getTime())
                    .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
                setWebinars(upcoming);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Could not fetch upcoming webinars.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchWebinars();
    }, [toast, currentDate]);

    return (
        <div className="bg-secondary/30">
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Team reviewing documents"
                    data-ai-hint="team review"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Publications & Patent Consultancy</h1>
                    <div className="flex items-center text-sm text-white/80 mt-2">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-semibold text-white">Publications & Patent</span>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Protect and Publish Your Innovations</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            We provide a dual-focused consultancy to help you both protect your intellectual property through patents and disseminate your research through high-impact publications.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <Card key={service.title}>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <service.icon className="h-6 w-6 text-primary" />
                                    <CardTitle className="text-lg">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight">Upcoming Webinars</h2>
                            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                                Join our expert-led online sessions to stay ahead of the curve.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                orientation="vertical"
                                className="w-full max-w-lg h-[450px]"
                            >
                                <CarouselContent className="h-[450px]">
                                    {isLoading ? (
                                        [...Array(3)].map((_, index) => (
                                            <CarouselItem key={index} className="pt-4 md:basis-1/2">
                                                <div className="p-1">
                                                    <Skeleton className="w-full h-[180px] rounded-lg"/>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    ) : webinars.length > 0 ? (
                                        webinars.map((webinar) => (
                                            <CarouselItem key={webinar.id} className="pt-4 md:basis-1/2">
                                                <div className="p-1">
                                                    <Card className="flex flex-row overflow-hidden hover:shadow-lg transition-shadow">
                                                        <div className="relative w-1/3">
                                                            <Image 
                                                                src={webinar.imageSrc} 
                                                                alt={webinar.title} 
                                                                fill
                                                                data-ai-hint="webinar event"
                                                                className="object-cover" 
                                                            />
                                                        </div>
                                                        <div className="w-2/3 flex flex-col p-4">
                                                            <CardHeader className="p-0">
                                                                <CardTitle className="text-base line-clamp-2">{webinar.title}</CardTitle>
                                                                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                                                                    <Calendar className="h-3 w-3" />
                                                                    <span>{webinar.date}</span>
                                                                </div>
                                                            </CardHeader>
                                                            <CardFooter className="p-0 pt-4 mt-auto">
                                                                <Button variant="link" size="sm" asChild className="p-0 h-auto">
                                                                    <Link href="/conference/upcoming-webinars">Register <ArrowRight className="ml-1 h-3 w-3" /></Link>
                                                                </Button>
                                                            </CardFooter>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <div className="text-center text-muted-foreground col-span-full py-10">
                                            No upcoming webinars. Please check back later.
                                        </div>
                                    )}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
