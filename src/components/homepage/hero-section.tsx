
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getBanners, type Banner } from '@/services/bannerService';
import { Skeleton } from '../ui/skeleton';

async function getBannersData(): Promise<Banner[]> {
    try {
        const banners = await getBanners();
        return banners;
    } catch (error) {
        console.error("Failed to fetch banners for hero section:", error);
        return [];
    }
}

export function HeroSection() {
    const [banners, setBanners] = React.useState<Banner[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getBannersData();
            setBanners(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        if (!api) {
          return
        }
    
        setCurrent(api.selectedScrollSnap())
    
        const onSelect = () => {
          setCurrent(api.selectedScrollSnap())
        }
    
        api.on("select", onSelect)
    
        return () => {
          api.off("select", onSelect)
        }
      }, [api])

    if (isLoading) {
        return (
            <section className="w-full h-[500px] relative flex items-center justify-start text-left overflow-hidden bg-white">
                <Skeleton className='w-full h-full' />
            </section>
        );
    }
    
    if (banners.length === 0) {
        return (
             <section className="w-full h-[500px] relative flex items-center justify-center text-center overflow-hidden bg-muted">
                <p className="text-muted-foreground">No banners configured. Please add banners in the admin dashboard.</p>
            </section>
        )
    }

    const currentBanner = banners[current];

    return (
        <section className="w-full h-[500px] relative flex items-center justify-start text-left overflow-hidden bg-white">
            <Carousel
                setApi={setApi}
                plugins={[
                    Autoplay({
                      delay: 5000,
                      stopOnInteraction: true,
                    }),
                ]}
                className="absolute inset-0 z-0 w-full h-full"
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {banners.map((banner, index) => (
                        <CarouselItem key={banner.id}>
                            <div className="w-full h-[500px] relative">
                                <Image
                                    src={banner.imageSrc}
                                    alt={banner.titleLine1}
                                    data-ai-hint="banner image"
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
            </Carousel>
            
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-0" />

            {currentBanner && (
                <div className="relative z-10 container mx-auto px-4 ml-12 md:ml-24">
                    <motion.div
                        key={currentBanner.id} // Re-trigger animation on slide change
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight xl:text-7xl !leading-tight text-gray-900">
                            <span className="block text-[#3D4C6F]">{currentBanner.titleLine1}</span>
                            <span className="text-[#3D4C6F]">{currentBanner.titleLine2}</span>
                        </h1>
                        <p className="max-w-xl mt-6 text-lg md:text-xl text-gray-700 drop-shadow-md">
                        {currentBanner.subtitle.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                        </p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-start"
                        >
                            <Link href={currentBanner.button1Link}>
                                <Button size="lg" className="w-full sm:w-auto">
                                    {currentBanner.button1Text}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href={currentBanner.button2Link}>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/90 text-[#3D4C6F] border-gray-200 hover:bg-white">
                                    {currentBanner.button2Text}
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
