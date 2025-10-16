
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, ChevronRight, Edit, Search, Lightbulb, ArrowRight } from "lucide-react";
import {
  FileText,
  BookOpen,
  Microscope,
  BarChart3,
  FileEdit,
  Newspaper,
  Presentation,
  Handshake,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const services = [
  {
    title: "Topic Selection & Proposal Writing",
    description:
      "Guidance in identifying impactful research areas and drafting high-quality proposals.",
    icon: FileText,
  },
  {
    title: "Literature Review Support",
    description:
      "Comprehensive review of scholarly sources to build a strong research foundation.",
    icon: BookOpen,
  },
  {
    title: "Research Methodology & Design",
    description:
      "Assistance with qualitative, quantitative, or mixed-method approaches.",
    icon: Microscope,
  },
  {
    title: "Data Collection & Analysis",
    description:
      "Support with datasets, statistical tools (SPSS, R, Python, MATLAB), and interpretation.",
    icon: BarChart3,
  },
  {
    title: "Thesis Writing & Editing",
    description:
      "Structuring, drafting, proofreading, and plagiarism control to meet academic standards.",
    icon: FileEdit,
  },
  {
    title: "Journal Publications",
    description:
      "Manuscript preparation and submission in Scopus, Web of Science, and credible indexed journals.",
    icon: Newspaper,
  },
  {
    title: "Defense Preparation",
    description:
      "Mock viva sessions, presentation design, and answering strategies for a confident defense.",
    icon: Presentation,
  },
  {
    title: "End-to-End Mentorship",
    description:
      "Continuous guidance from proposal approval to thesis submission and publication.",
    icon: Handshake,
  },
];
  

export default function PhDServicePage() {
    return (
        <div className="bg-background">
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Person writing at a desk"
                    data-ai-hint="research writing"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">End-to-End PhD Services</h1>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container mx-auto px-4 md:px-6">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
      <Image
        alt="PhD Journey"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
        height="310"
        src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&auto=format&fit=crop"
        data-ai-hint="phd study"
        width="550"
      />
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
            Your Complete PhD Journey Support
          </h2>
          <p className="max-w-[600px] text-justify text-muted-foreground ">
          At Researcher Connect, we understand that a PhD is more than just a degree—it is a journey of research, discovery, and academic contribution. To support scholars at every stage, we provide end-to-end PhD services, ensuring that students, faculty, and researchers receive the right guidance from the very beginning of their doctoral program to the successful defense and publication of their work.
Our expert team assists in designing strong research proposals, developing methodologies, analyzing data, and preparing manuscripts for international journals. We also provide support for thesis writing, editing, formatting, plagiarism checks, and final submission. By integrating academic mentoring with publication consultancy, we make the doctoral journey smoother, more structured, and globally visible.
</p>
        </div>
      </div>
    </div>
  </div>
</section>


            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                     <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Our Core PhD Services</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            We offer tailored assistance to meet your specific needs at any point in your PhD program.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map(service => (
                            <Card key={service.title} className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                      <service.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-justify">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Button size="lg" asChild>
                            <Link href="/contact-us">Request Service <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
