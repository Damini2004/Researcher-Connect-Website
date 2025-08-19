
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {

    return (
        <section className="w-full min-h-[60vh] md:min-h-[80vh] relative flex items-center justify-center text-center overflow-hidden bg-gray-900">
             <div className="absolute inset-0 z-0">
                <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzO_v7V8m6u55Dy33R0J_TutIjJcLO8km9Q&s"
                    alt="Abstract background"
                    data-ai-hint="abstract background"
                    fill
                    className="object-cover opacity-30"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
            </div>


            <div className="relative z-10 container px-4 md:px-6">
                 <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight xl:text-7xl !leading-tight text-white">
                    <span className="block"></span>
                    <span className="block text-primary-foreground/90">Researcher Connect</span>
                    </h1>
                    <p className="max-w-xl mx-auto mt-6 text-lg text-white/80 md:text-xl">
                We look forward to help you in taking your company to new height.
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
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10 hover:text-white">
                            Learn More
                        </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
