// src/app/(public)/page.tsx
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookCheck, BrainCircuit, Microscope, BarChart, Bell, Lightbulb, Headphones, Users, Shield, Zap, Mail, Phone, MessageSquare } from "lucide-react";
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
        imageSrc: "https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg",
        imageHint: "researcher in lab",
        alt: "Researcher in a modern laboratory"
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

const services = [
    {
        icon: BarChart,
        title: "Business Consulting",
        description: "Solution for every business related problems, readily and skillfully."
    },
    {
        icon: Bell,
        title: "Risk Management",
        description: "Calculate every possible risk in your business, take control over them."
    },
    {
        icon: Lightbulb,
        title: "Market Research",
        description: "Know the market before taking any step, reduce risks before you go."
    },
    {
        icon: Headphones,
        title: "Quality Services",
        description: "Experience unparalleled service, from beginning to final construction."
    }
];

const subServices = [
    {
        icon: Users,
        title: "Awesome Team",
        description: "Before talking destination, we shine a spotlight across your organization to fully understand it."
    },
    {
        icon: Shield,
        title: "Excellent Support",
        description: "If you face any trouble, you can always let our dedicated support team help you. They are ready for you 24/7."
    },
    {
        icon: Zap,
        title: "Faster Performance",
        description: "We develop a systematic well-ordered process of analysis, from concept through implementation."
    }
]

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
                                <div className="absolute inset-0 bg-white/50" />
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
                            <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-gray-800">
                              Submit Your Paper
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                          <Link href="/about">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background">
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

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Key Services</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Get expert consultancy and support with our advisory firm that stands by your side always.
                        </p>
                         <div className="w-24 h-1 bg-primary mx-auto" />
                    </div>
                </div>
                 <div className="mx-auto grid max-w-5xl items-center gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:max-w-none mt-12">
                    {services.map((service) => (
                        <div key={service.title} className="flex flex-col items-center text-center space-y-3">
                            <div className="p-4 rounded-full border-2 border-gray-200 w-fit">
                                <service.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{service.title}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                        <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&h=675&auto=format&fit=crop" alt="Business Meeting" fill className="object-cover" data-ai-hint="business meeting" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                                <Button variant="outline" size="icon" className="h-20 w-20 rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        {subServices.map((service) => (
                           <div key={service.title} className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-md">
                                    <service.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">{service.title}</h4>
                                    <p className="text-muted-foreground mt-1">{service.description}</p>
                                </div>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section id="our-services-detailed" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl gap-y-16 mt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&h=600&auto=format&fit=crop" alt="Business Consulting" width={800} height={600} className="rounded-lg object-cover" data-ai-hint="team collaboration" />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Business Consulting</h3>
                  <p className="text-muted-foreground">As one of the world's largest accountancy networks, Elixir helps a diverse range of clients with a diverse range of needs. This is especially true of our Advisory Practice, which provides corporate finance and transaction services, business restructuring.</p>
                  <Button variant="link" className="p-0 h-auto">Learn More <ArrowRight className="ml-2" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4 lg:order-last">
                  <Image src="https://images.unsplash.com/photo-1556742044-53c85d8a9568?q=80&w=800&h=600&auto=format&fit=crop" alt="Tax Consulting" width={800} height={600} className="rounded-lg object-cover" data-ai-hint="tax documents" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Tax consulting</h3>
                  <p className="text-muted-foreground">Elixir serves clients across the country and around the world as they navigate an increasingly complex tax landscape. Our tax professionals draw on deep experience and industry-specific knowledge to deliver clients the insights and innovation they need.</p>
                  <Button variant="link" className="p-0 h-auto">Learn More <ArrowRight className="ml-2" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Image src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&h=600&auto=format&fit=crop" alt="Advisory" width={800} height={600} className="rounded-lg object-cover" data-ai-hint="advisory meeting" />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Advisory</h3>
                  <p className="text-muted-foreground">To help you understand what this road looks like, we surveyed 1,165 digital marketers across Europe and North America to explore current trends and priorities in digital marketing.</p>
                  <Button variant="link" className="p-0 h-auto">Learn More <ArrowRight className="ml-2" /></Button>
                </div>
              </div>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-12">
                <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Special financing</h4>
                        <p className="text-sm text-muted-foreground">Apply for special financial support and earn exclusive rewards.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Chat with team</h4>
                        <p className="text-sm text-muted-foreground">Have a question? Chat online with an expert. <a href="#" className="underline">Start chatting</a></p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Call a specialist</h4>
                        <p className="text-sm text-muted-foreground">Our 24/7 support team is ready for you at 1-800-MY-Elixir.</p>
                    </div>
                </div>
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
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=400&h=300&auto=format&fit=crop"
                  alt="Cosmic Structures"
                  width={400}
                  height={300}
                  data-ai-hint="galaxy stars"
                  className="h-auto w-full object-cover"
                />
                <CardContent className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold">Cosmic Structures</h3>
                  <p className="text-sm text-muted-foreground mt-1">By Dr. Evelyn Reed</p>
                  <p className="mt-4 text-muted-foreground flex-1">
                    A deep dive into the large-scale web of the universe, mapping out galaxies and dark matter.
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-primary inline-flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&h=300&auto=format&fit=crop"
                  alt="Genetic Sequencing"
                  width={400}
                  height={300}
                  data-ai-hint="dna strand"
                  className="h-auto w-full object-cover"
                />
                <CardContent className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold">Genetic Sequencing</h3>
                   <p className="text-sm text-muted-foreground mt-1">By Dr. Kenji Tanaka</p>
                  <p className="mt-4 text-muted-foreground flex-1">
                    Visualizing the code of life through advanced sequencing techniques and computational biology.
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-primary inline-flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="https://images.unsplash.com/photo-1694833256053-53538407f354?q=80&w=400&h=300&auto=format&fit=crop"
                  alt="Neural Pathways"
                  width={400}
                  height={300}
                  data-ai-hint="neural network"
                  className="h-auto w-full object-cover"
                />
                <CardContent className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold">Neural Pathways</h3>
                   <p className="text-sm text-muted-foreground mt-1">By Dr. Fatima Al-Jamil</p>
                  <p className="mt-4 text-muted-foreground flex-1">
                   Exploring the intricate architecture of thought and consciousness through brain mapping.
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-primary inline-flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Associations &amp; Partners</h2>
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
