// src/app/(public)/page.tsx
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookCheck, BrainCircuit, Microscope } from "lucide-react";
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
        imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&h=900&auto=format&fit=crop",
        imageHint: "research academic",
        alt: "Researcher at a desk"
    },
    {
        imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&h=900&auto=format&fit=crop",
        imageHint: "team collaboration",
        alt: "Team collaborating on a project"
    },
    {
        imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&h=900&auto=format&fit=crop",
        imageHint: "business meeting",
        alt: "Business meeting"
    }
];

export default function HomePage() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
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
                                />
                                <div className="absolute inset-0 bg-black/50" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
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
                      <p className="max-w-xl mx-auto mt-6 text-lg text-white/90 md:text-xl">
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
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-black">
                              Learn More
                            </Button>
                          </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Accelerate Your Publication Journey</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Researcher Connect provides a comprehensive suite of tools to support researchers, editors, and publishers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-transparent hover:border-primary/30">
                <CardHeader className="items-center text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit">
                    <BrainCircuit className="h-10 w-10 text-primary transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <CardTitle className="mt-4 text-xl">AI-Powered Tagging</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Our intelligent system automatically suggests relevant tags for your submissions, improving discoverability and matching with reviewers.</p>
                </CardContent>
              </Card>
              <Card className="group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-transparent hover:border-primary/30">
                <CardHeader className="items-center text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit">
                     <BookCheck className="h-10 w-10 text-primary transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <CardTitle className="mt-4 text-xl">Efficient Submission</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">A user-friendly form and dashboard for authors to submit and track their manuscripts with ease.</p>
                </CardContent>
              </Card>
              <Card className="group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-transparent hover:border-primary/30">
                <CardHeader className="items-center text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit">
                     <Microscope className="h-10 w-10 text-primary transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <CardTitle className="mt-4 text-xl">Robust Admin Tools</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Multi-level admin roles for verifying submissions, managing users, and overseeing the entire publication process.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section id="highlights" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-medium">Highlights</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Visuals from the Forefront of Research</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore stunning imagery and visualizations from papers published through Researcher Connect.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="relative group overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=400&h=600&auto=format&fit=crop"
                  alt="Highlight 1"
                  width={400}
                  height={600}
                  data-ai-hint="galaxy stars"
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-bold text-white">Cosmic Structures</h3>
                  <p className="text-sm text-white/80">Mapping the universe's web.</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&h=600&auto=format&fit=crop"
                  alt="Highlight 2"
                  width={400}
                  height={600}
                  data-ai-hint="dna strand"
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-bold text-white">Genetic Sequencing</h3>
                  <p className="text-sm text-white/80">Visualizing the code of life.</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1694833256053-53538407f354?q=80&w=400&h=600&auto=format&fit=crop"
                  alt="Highlight 3"
                  width={400}
                  height={600}
                  data-ai-hint="neural network"
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-bold text-white">Neural Pathways</h3>
                  <p className="text-sm text-white/80">The architecture of thought.</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1554474812-70c7c394865f?q=80&w=400&h=600&auto=format&fit=crop"
                  alt="Highlight 4"
                  width={400}
                  height={600}
                  data-ai-hint="nanotechnology material"
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-bold text-white">Nanomaterials</h3>
                  <p className="text-sm text-white/80">Engineering at the atomic scale.</p>
                </div>
              </div>
            </div>
             <div className="mt-12 text-center">
              <Button asChild>
                <Link href="/publications">
                  Explore All Publications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="partners" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Associations & Partners</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are proud to collaborate with leading institutions and organizations in the academic community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-items-center gap-y-12 gap-x-6 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <Image src="https://logodix.com/logo/2038481.png" width={150} height={60} alt="Partner Logo 1" data-ai-hint="logo company" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              <Image src="https://logodix.com/logo/1993463.png" width={150} height={60} alt="Partner Logo 2" data-ai-hint="logo brand" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              <Image src="https://logodix.com/logo/1712867.png" width={150} height={60} alt="Partner Logo 3" data-ai-hint="logo business" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              <Image src="https://logodix.com/logo/1101923.png" width={150} height={60} alt="Partner Logo 4" data-ai-hint="logo tech" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              <Image src="https://logodix.com/logo/647339.png" width={150} height={60} alt="Partner Logo 5" data-ai-hint="logo education" className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
