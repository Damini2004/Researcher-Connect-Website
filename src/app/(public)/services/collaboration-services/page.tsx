
// src/app/(public)/services/collaboration-services/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, ArrowRight, Book, Building2, Briefcase, Globe2, Microscope, Speaker, Handshake, Users, Zap, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collaboration Services',
  description: 'Enable seamless faculty exchange, student mobility, joint research, and institutional collaborations with Researcher Connect.',
};

const partnershipServices = [
    { 
        icon: Users,
        title: "Faculty Exchange & Visiting Fellowships",
        description: "We coordinate MoUs, visiting-faculty placements, joint supervision, and short-term/long-term teaching & research assignments."
    },
    { 
        icon: Handshake,
        title: "Student Exchange & Mobility Programs",
        description: "Facilitate semester/year exchange, summer-school placements, joint supervision, and cross-institution mentorship."
    },
    { 
        icon: Microscope,
        title: "Joint Research & Co-Authored Publications",
        description: "Assist in forming research consortia, identifying funding, co-author matching, and collaborative manuscript development."
    },
    { 
        icon: Book,
        title: "Publication & Editorial Support",
        description: "Guidance on journal selection, manuscript structuring, formatting, and compliance for Scopus & WoS indexing."
    },
    { 
        icon: Zap,
        title: "Grant Writing & Funding Collaboration",
        description: "Help draft proposals for national/international grants and coordinate multi-institution submissions."
    },
    { 
        icon: Speaker,
        title: "Conference & Workshop Collaboration",
        description: "Organize inter-university conferences, workshops, webinars, and joint academic events to foster collaboration."
    },
    { 
        icon: Building2,
        title: "Institutional Partnership & MoU Facilitation",
        description: "Help universities set up formal agreements (MoUs), define scope, and handle legal/administrative formalities."
    }
];

const whyPartnerPoints = [
    "One-Stop Solution: From concept to publication, we handle all aspects end-to-end.",
    "Global Network: Use our established network to connect institutions across regions and disciplines.",
    "Publication Expertise: Deep experience with Scopus/Web of Science indexing and journal standards.",
    "Customizable Models: Short-term, long-term, bilateral, multilateral — tailored to institutional needs.",
    "Compliance & Ethics: Guidance on publication ethics, grant rules, and inter-institution agreements.",
    "Full Lifecycle Support: From MoU drafting to post-collaboration reporting and future planning."
];

const workflowSteps = [
    { number: "01", title: "Consultation & Needs Assessment", description: "Understand university/researcher goals (faculty/student exchange, research collaboration, etc.)." },
    { number: "02", title: "Partner Matching & MoU Drafting", description: "Identify potential partner institutions; draft and finalize Memoranda of Understanding (MoUs)." },
    { number: "03", title: "Coordination & Logistics", description: "Handle administrative tasks, documentation, exchange scheduling, and supervision assignment." },
    { number: "04", title: "Research & Collaboration Execution", description: "Support planning and execution of joint research, co-supervised theses, and exchanges." },
    { number: "05", title: "Manuscript & Publication Support", description: "Assist with writing, editing, journal selection, submission, and peer-review responses." },
    { number: "06", title: "Reporting & Future Planning", description: "Provide summary reports, evaluate outcomes, and plan further collaborations." }
];

const portfolioData = [
    {
        category: "Faculty & Student Exchange",
        offerings: "Visiting fellowships, semester/year exchange, guest lectures, joint supervision"
    },
    {
        category: "Joint Research & Publications",
        offerings: "Co-authored papers, multi-centre research projects, grant consortium support"
    },
    {
        category: "Editorial & Publication Support",
        offerings: "Journal selection, manuscript prep, formatting, peer-review support, indexing consultancy"
    },
    {
        category: "Events & Workshops",
        offerings: "Inter-university conferences, seminars, webinars, summer schools, guest lectures"
    },
    {
        category: "Institutional Partnerships",
        offerings: "MoU drafting, legal-administrative support, collaboration agreement facilitation"
    },
    {
        category: "Funding & Grant Support",
        offerings: "Proposal writing, multi-institution grant coordination, budget & compliance support"
    }
];


export default function CollaborationServicesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] bg-primary/10 flex items-center justify-center text-center px-4">
                <Image
                    src="/Collaboration.jpg"
                    alt="International students collaborating"
                    data-ai-hint="collaboration students"
                    fill
                    className="object-cover opacity-30"
                />
                <div className="relative z-10 text-white">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                       Inter-University Collaboration
                    </h1>
                    <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
                        From Connection to Collaboration
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="w-full py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/centralcollab.jpg"
                                alt="Team working together"
                                data-ai-hint="teamwork project"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">A Central Hub for Global Partnerships</h2>
                            <p className="text-lg text-muted-foreground text-justify">
                               At Researcher Connect, we act as a central hub to enable seamless faculty exchange, student mobility, joint research, and institutional collaborations across universities worldwide. Our services ensure that every collaboration meets global academic standards — from partnership facilitation to execution, research publication support, and long-term monitoring.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/contact-us">
                                    Initiate a Collaboration <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="w-full py-16 md:py-24 bg-secondary/50">
                 <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Our Collaboration & Partnership Services</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                           We provide end-to-end consultancy to help institutions and researchers build productive collaborations across universities, enabling knowledge exchange, global exposure, and impactful research outcomes.
                        </p>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {partnershipServices.map((service) => (
                            <Card key={service.title} className="bg-background flex flex-col">
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-full mt-1">
                                            <service.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>{service.title}</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                 </div>
            </section>

            {/* Why Partner Section */}
            <section className="w-full py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight">Why Partner With Us?</h2>
                            <ul className="space-y-4">
                                {whyPartnerPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                                        <span className="text-muted-foreground text-lg">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                             <Image
                                src="/partnerwithus.png"
                                alt="Team planning"
                                data-ai-hint="team planning"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Workflow Section */}
            <section className="w-full py-16 md:py-24 bg-secondary/50">
                 <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Typical Workflow: How It Works</h2>
                    </div>
                    <div className="relative">
                        {/* Desktop view: connecting line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
                        
                        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {workflowSteps.slice(0, 3).map((step, index) => (
                                <Card key={index} className="bg-background shadow-lg text-center p-6">
                                    <h3 className="text-5xl font-extrabold text-primary/20 mb-2">{step.number}</h3>
                                    <p className="font-bold text-lg mb-2">{step.title}</p>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </Card>
                            ))}
                        </div>
                        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                             {workflowSteps.slice(3, 6).map((step, index) => (
                                <Card key={index} className="bg-background shadow-lg text-center p-6">
                                    <h3 className="text-5xl font-extrabold text-primary/20 mb-2">{step.number}</h3>
                                    <p className="font-bold text-lg mb-2">{step.title}</p>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                 </div>
            </section>
            
            {/* New Portfolio Table Section */}
            <section className="w-full py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Our Services Portfolio</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                           A summary of our comprehensive collaboration services.
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-bold w-[30%]">Service Category</TableHead>
                                        <TableHead className="font-bold">What We Offer</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {portfolioData.map((item, index) => (
                                        <TableRow key={index} className={index % 2 === 0 ? '' : 'bg-muted/50'}>
                                            <TableCell className="font-semibold">{item.category}</TableCell>
                                            <TableCell>{item.offerings}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
