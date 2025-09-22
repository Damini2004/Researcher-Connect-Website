
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  MonitorSmartphone,
  Cloud,
  Building2,
  Palette,
  LineChart,
  ShieldCheck,
  Globe2,ArrowRight,
  Bug,
  Headset,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    name: "Custom Research Software Development",
    description: [
      "Tailored digital platforms for universities, publishers, and institutions.",
      "End-to-end design, development, and deployment."
    ],
    icon: Code,
  },
  {
    name: "Web & Mobile Applications",
    description: [
      "Academic websites, portals, and knowledge repositories.",
      "Mobile apps for research collaboration, publishing, and events."
    ],
    icon: MonitorSmartphone,
  },
  {
    name: "Cloud-Based Solutions",
    description: [
        "Secure cloud hosting for journals, conferences, and data.",
        "Scalable infrastructure to support global access and collaboration."
    ],
    icon: Cloud,
  },
  {
    name: "Enterprise Academic Solutions",
    description: [
      "Digital systems for publication management, peer review, and author services.",
      "Workflow automation for universities, publishers, and research bodies."
    ],
    icon: Building2,
  },
  {
    name: "UI/UX & Product Engineering",
    description: [
      "User-friendly design focused on scholars, editors, and administrators.",
      "Complete product lifecycle from prototyping to deployment."
    ],
    icon: Palette,
  },
  {
    name: "AI & Data Analytics",
    description: [
      "Research data insights, citation tracking, and predictive trends.",
      "Smart automation to support decision-making and academic reporting."
    ],
    icon: LineChart,
  },
  {
    name: "Cybersecurity & Compliance",
    description: [
      "Protection of sensitive research data and intellectual property.",
      "Adherence to global publishing, academic, and data standards."
    ],
    icon: ShieldCheck,
  },
  {
    name: "Academic Branding & Digital Visibility",
    description: [
      "Enhancing institutional and researcher profiles online.",
      "Strategies for global reach through web, social, and digital presence."
    ],
    icon: Globe2,
  },
  {
    name: "Quality Assurance & Testing",
    description: [
      "Rigorous testing for reliability, security, and usability.",
      "Continuous improvements for error-free and smooth operations."
    ],
    icon: Bug,
  },
  {
    name: "Consulting & Global Support",
    description: [
      "Strategic advisory for publishing, indexing, and institutional growth.",
      "24×7 technical and academic support across regions."
    ],
    icon: Headset,
  },
];
  

export default function SoftwareSolutionsPage() {
    return (
        <div>
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Data analytics dashboard"
                    data-ai-hint="data dashboard"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Software Solutions</h1>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container max-w-7xl mx-auto px-4 md:px-6">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
      <Image
        alt="Software Interface"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
        height="310"
        src="https://cdn.intuji.com/2023/08/Custom-software-development.jpg"
        data-ai-hint="software development"
        width="550"
      />
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
            Software Solutions
          </h2>
          <p className=" text-justify text-muted-foreground ">
          At Researcher Connect, we are a research technology and consulting company committed to transforming the way knowledge is created, published, and shared. We work with universities, researchers, publishers, and institutions to break silos and build integrated ecosystems for research growth, visibility, and global collaboration.
We go beyond being just a service provider—we act as a partner in progress, addressing challenges in research publication, analytics, institutional rankings, and digital transformation. Our approach combines consultancy, technology, innovation, and collaboration to deliver measurable results.
 </p>
 <p className=" text-justify text-muted-foreground " >
 “How do we do it?” By aligning ideas with execution, ensuring that every research output—whether a manuscript, patent, or dataset—translates into impactful contributions for academia and society.
 Core Features of Researcher Connect.
 </p>
        </div>
      </div>
    </div>
  </div>
</section>


            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Core Software Features</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Powerful tools to drive your projects forward.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
                        {features.map(feature => (
                            <Card key={feature.name} className="text-center">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                        <feature.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{feature.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {Array.isArray(feature.description) ? (
                                        <ul className="list-outside text-left text-muted-foreground space-y-1 pl-4">
                                            {feature.description.map((item, index) => <li key={index}>{item}</li>)}
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Button asChild size="lg">
                            <Link href="/contact-us">Schedule a Call <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
