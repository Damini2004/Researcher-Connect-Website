
// src/app/(public)/about/page.tsx
import { getPageContent } from "@/services/cmsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ChevronRight, Eye, Goal, Heart, CheckCircle, Linkedin, } from "lucide-react";
import Link from "next/link";
import { RenderHtmlContent } from "@/components/ui/render-html-content";


async function getAboutContent() {
    const result = await getPageContent("about");
    if (result.success) {
        return result.content;
    }
    return "";
}

const leadershipTeam = [
    {
        name: "Vinit Khetani",
        title: "Chief Technology Officer",
        description: "Driving technology innovation and building scalable research-focused platforms.",
        imageSrc: "/Vinit.jpeg",
        imageHint: "cto portrait",
        linkedinUrl: "https://www.linkedin.com/in/vinit-khetani"
    },
    {
        name: "Yogesh Nagargoje",
        title: "Chief Marketing Officer",
        description: "Leading marketing strategies to expand global visibility and engagement.",
        imageSrc: "/yogesh.jpeg",
        imageHint: "cmo portrait",
        linkedinUrl: "https://www.linkedin.com/in/yogesh-nagargoje"
    },
    {
        name: "Sharyu Ikhar",
        title: "Chief Operating Officer",
        description: "Overseeing operations to ensure seamless delivery and organizational excellence.",
        imageSrc: "/sharyu.jpeg",
        imageHint: "ceo portrait",
        linkedinUrl: "https://www.linkedin.com/in/sharayu-ikhar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
];

const coreValues = [
    "Integrity",
    "Excellence",
    "Collaboration",
    "Innovation",
    "Inclusivity"
];


export default async function AboutPage() {
  const content = await getAboutContent();
  
  return (
    <div>
        <section className="relative w-full h-[300px] bg-gray-800 text-white">
            <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&h=300&auto=format&fit=crop"
                alt="Team working together"
                data-ai-hint="team collaboration"
                fill
                className="object-cover opacity-20"
            />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <h1 className="text-5xl font-extrabold tracking-tight">About Us</h1>
            </div>
        </section>

        <div className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6 space-y-24">
            
            <section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Meet Our Leadership</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">The driving force behind our mission to revolutionize academic publishing.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leadershipTeam.map(member => (
                        <Card key={member.name} className="group overflow-hidden text-center transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20">
                           <div className="relative h-56 w-full">
                                <Image
                                    src={member.imageSrc}
                                    alt={member.name}
                                    data-ai-hint={member.imageHint}
                                    fill
                                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-4 left-4 text-left">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{member.name}</h3>
                                    <p className="text-primary-foreground/90 font-medium">{member.title}</p>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <p className="text-muted-foreground mb-4 text-sm">{member.description}</p>
                                <div className="flex justify-center gap-4">
                                    <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
             
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Company Overview</h2>
                    <div className="mt-2 w-24 h-1 bg-primary mx-auto animate-width-pulse" />
                </div>
                <RenderHtmlContent htmlContent={content} />
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <Card className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <CardHeader className="text-center">
                        <Goal className="h-12 w-12 mx-auto text-primary" />
                        <CardTitle className="mt-4 text-3xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground text-lg">
                        <p> To empower global research visibility and innovation through technology and collaboration.                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <CardHeader className="text-center">
                        <Eye className="h-12 w-12 mx-auto text-primary" />
                        <CardTitle className="mt-4 text-3xl">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground text-lg">
                        <p>To be the most trusted partner for research, publishing, and academic software worldwide.
                        </p>
                    </CardContent>
                </Card>
            </div>
            
             <div className="max-w-4xl mx-auto">
                 <div className="text-center mb-12">
                    <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">The principles that guide our work and our community.</p>
                 </div>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {coreValues.map(value => (
                        <div key={value} className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                           <CheckCircle className="h-5 w-5 text-green-500" />
                           <span className="font-semibold">{value}</span>
                        </div>
                    ))}
                 </div>
            </div>

          </div>
        </div>
    </div>
  );
};
