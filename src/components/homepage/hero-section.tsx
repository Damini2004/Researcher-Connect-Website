// src/components/homepage/hero-section.tsx
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const carouselItems = [
    {
        imageSrc: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1600&auto=format&fit=crop",
        imageHint: "researcher in lab",
        alt: "Researcher in a modern laboratory"
    },
    {
        imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
        imageHint: "team collaboration",
        alt: "Team collaborating on a project"
    },
    {
        imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
        imageHint: "business meeting",
        alt: "Business meeting"
    }
];

export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="h-full">
                    {carouselItems.map((item, index) => (
                        <CarouselItem key={index} className="h-full">
                            <div className="w-full h-full relative">
                                <Image
                                    src={item.imageSrc}
                                    alt={item.alt}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={item.imageHint}
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-background/50" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="absolute inset-0 flex items-center justify-center text-center text-foreground z-10">
                 <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl mx-auto"
                    >
                      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight xl:text-7xl !leading-tight">
                        <span className="block">Streamline Your Research</span>
                        <span className="block text-primary">with Researcher Connect</span>
                      </h1>
                      <p className="max-w-xl mx-auto mt-6 text-lg text-foreground/90 md:text-xl">
                        The ultimate platform for seamless journal submission, intelligent review, and publication management. Powered by AI.
                      </p>
                       <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
                       >
                          <Link href="/submit-journal">
                            <Button size="lg" className="w-full sm:w-auto">
                              Submit Your Paper
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                          <Link href="/about">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/50 hover:bg-background/80">
                              Learn More
                            </Button>
                          </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
