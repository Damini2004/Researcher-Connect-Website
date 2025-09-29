
// src/app/(public)/services/patent-consultancy/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {  Edit, Search, ArrowRight,
  FileText,
  FileEdit,
  ShieldCheck,
  Clipboard,
  Archive,
  DollarSign, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const patentServices = [
  {
    title: "Patentability Assessment",
    description:
      "Evaluating novelty and eligibility through prior-art searches.",
    icon: Search,
  },
  {
    title: "Drafting Patent Applications",
    description:
      "Preparing detailed specifications, claims, and technical drawings.",
    icon: FileEdit,
  },
  {
    title: "Provisional & Complete Patents",
    description:
      "Drafting applications for both provisional and full filings.",
    icon: FileText,
  },
  {
    title: "Filing Support",
    description:
      "Guidance on national, international (PCT), and jurisdiction-specific filings.",
    icon: Clipboard,
  },
  {
    title: "Office Action & Response Support",
    description:
      "Preparing responses to examiner objections or queries.",
    icon: Archive,
  },
  {
    title: "Patent Portfolio Management",
    description:
      "Helping institutions and companies manage multiple patent applications.",
    icon: ShieldCheck,
  },
  {
    title: "Tech Transfer & Commercialization Guidance",
    description:
      "Advising on licensing and monetizing intellectual property.",
    icon: DollarSign,
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
                    <h1 className="text-5xl font-extrabold tracking-tight">Patent Drafting Services                    </h1>
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
                      Protecting intellectual property is critical to ensuring that research and innovation create long-term impact. At Researcher Connect, we provide Patent Drafting Services to help researchers, inventors, and institutions secure their ideas through clear, precise, and enforceable patent applications. Our team of experts ensures that every application is aligned with global patent office standards, enhancing the chances of approval and protection.
                      </p>
                    </div>
                    <Button asChild size="lg" className="w-fit">
                      <Link href="/contact-us">
                        Schedule a Call <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  <Image
                    alt="Patent illustration"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="310"
                    src="/Patent-Drafting-Services-1.jpg"
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
                                <CardHeader className="items-center">
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
