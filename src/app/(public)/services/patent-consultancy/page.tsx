// src/app/(public)/services/patent-consultancy/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, ShieldCheck, Edit, Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const patentServices = [
    {
        title: "Prior-Art Searches",
        description:
          "Ensure originality and minimize risk by evaluating existing technologies.",
        icon: Search,
      },
      {
        title: "Drafting & Filing",
        description:
          "Prepare strong, compliant applications for local and global filings.",
        icon: Edit,
      },
      {
        title: "Jurisdictional Strategy",
        description:
          "Plan protection across multiple countries efficiently.",
        icon: ShieldCheck,
      },
      {
        title: "Tech Transfer Support",
        description:
          "Facilitate commercialization and licensing of research innovations.",
        icon: FileText,
      },
  ];
  

export default function PatentConsultancyPage() {
    return (
        <div className="bg-secondary/30">
            <section className="relative w-full h-[500px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&h=500&auto=format&fit=crop"
                    alt="Patent documents"
                    data-ai-hint="legal documents"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Patent Consultancy</h1>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
              <div className="container max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
                        From Lab to Legacy
                      </h2>
                      <p className="max-w-[600px] text-justify text-muted-foreground">
                        Protecting intellectual property is crucial for safeguarding innovation and securing commercial or academic advantages. Researcher Connect provides specialized patent consultancy, assisting researchers and institutions with prior-art searches, drafting, filing strategies, and jurisdictional guidance. We simplify complex legal frameworks, ensuring innovations are adequately protected while meeting regulatory timelines. Our team coordinates with legal experts to strengthen patent claims, improve approval success, and support technology transfer initiatives. Whether securing local or international rights, we help innovators navigate the process with clarity and confidence, ensuring that their intellectual contributions are preserved, valued, and positioned for future development or commercialization.
                      </p>
                    </div>
                    <Button asChild size="lg" className="w-fit">
                      <Link href="/contact-us">
                        Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  <Image
                    alt="Patent illustration"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="310"
                    src="https://images.unsplash.com/photo-1614064548237-02f9d3421475?q=80&w=800&auto=format&fit=crop"
                    data-ai-hint="patent idea"
                    width="550"
                  />
                </div>
              </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Our Patent Services</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           We provide end-to-end consultancy to protect your valuable intellectual property.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {patentServices.map((service) => (
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
                </div>
            </section>
        </div>
    );
}
