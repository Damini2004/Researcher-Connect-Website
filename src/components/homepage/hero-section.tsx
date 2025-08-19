// src/components/homepage/hero-section.tsx
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {

    return (
        <section className="w-full min-h-[60vh] md:min-h-[80vh] relative flex items-center justify-center text-center overflow-hidden bg-secondary/30">
             <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-1/3 h-1/2 ">
                     <Image
                        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop"
                        alt="Researcher in a modern laboratory"
                        fill
                        className="object-cover opacity-10"
                        data-ai-hint="researcher lab"
                    />
                </div>
                 <div className="absolute bottom-0 right-0 w-1/2 h-2/3">
                    <Image
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop"
                        alt="Team collaborating on a project"
                        fill
                        className="object-cover opacity-10"
                        data-ai-hint="team collaboration"
                    />
                </div>
                <div className="absolute top-1/4 left-1/2 w-1/4 h-1/4 rounded-full bg-primary/5 blur-3xl" />
            </div>


            <div className="relative z-10 container px-4 md:px-6">
                 <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight xl:text-7xl !leading-tight text-foreground">
                    <span className="block">Streamline Your Research</span>
                    <span className="block text-primary">with Researcher Connect</span>
                    </h1>
                    <p className="max-w-xl mx-auto mt-6 text-lg text-foreground/80 md:text-xl">
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
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            Learn More
                        </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}