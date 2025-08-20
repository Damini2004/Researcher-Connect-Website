
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselImages = [
    { src: "/header-6.jpg", alt: "Business team meeting", hint: "business meeting" },
    { src: "/header-5.jpg", alt: "Man presenting in a meeting", hint: "business presentation" },
    { src: "/header-1.jpg", alt: "Team collaboration", hint: "team collaboration" }
];


export function HeroSection() {

    return (
        <section className="w-full min-h-[60vh] md:min-h-[80vh] relative flex items-center justify-start text-left overflow-hidden bg-white">
            <Carousel
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
                    {carouselImages.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="w-full h-full min-h-[60vh] md:min-h-[80vh] relative">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    data-ai-hint={image.hint}
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


            <div className="relative z-10 container mx-auto px-4 ml-12 md:ml-24">
                 <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight xl:text-7xl !leading-tight text-white">
                    <span className="block"></span>
                    <span className="text-[#3D4C6F]">
                        <span className="block">Researcher</span>
                        <span className="block">Connect</span>
                    </span>
                    </h1>
                    <p className="max-w-xl mt-6 text-lg md:text-xl drop-shadow-md">
                        We look forward to help you in taking <br /> your company to new height.
                    </p>
                    <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-start"
                    >
                        <Link href="/contact-us">
                        <Button size="lg" className="w-full sm:w-auto">
                            Contact Us
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        </Link>
                        <Link href="/about">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/90 text-[#3D4C6F] border-gray-200 hover:bg-white">
                            Learn More
                        </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
