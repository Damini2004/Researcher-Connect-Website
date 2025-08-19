// src/components/homepage/why-choose-us-section.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function WhyChooseUsSection() {
    return (
        <section id="why-choose-us" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px]">
                        <Image 
                            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&h=600&auto=format&fit=crop" 
                            alt="Helping Leaders" 
                            fill
                            className="rounded-lg object-cover" 
                            data-ai-hint="business meeting" 
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Helping Leaders</h2>
                            <p className="text-muted-foreground max-w-prose">
                                We look forward to helping you take your company to new heights.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg">
                                <Link href="/contact-us">Contact Us</Link>
                            </Button>
                             <Button asChild variant="outline" size="lg">
                                <Link href="/about">
                                    Read More <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
