
// src/app/(public)/about/page.tsx
import { getPageContent } from "@/services/cmsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ChevronRight, Eye, Goal, Heart, CheckCircle, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

async function getAboutContent() {
    const result = await getPageContent("about");
    if (result.success) {
        return result.content;
    }
    return "";
}

const leadershipTeam = [
    {
        name: "Renal Scott",
        title: "Chief Executive Officer",
        description: "Elixir co-operates with clients in solving the hardest problems they face in their businesses—and the world. We do this by channeling the diversity of our people and their thinking.",
        imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format=fit=crop",
        imageHint: "ceo portrait"
    },
    {
        name: "Alexia Jordan",
        title: "Chief Marketing Officer",
        description: "Alexia leads our global marketing efforts, shaping the Researcher Connect brand and driving growth through innovative strategies and a deep understanding of the academic community.",
        imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
        imageHint: "cmo portrait"
    },
    {
        name: "Ben Carter",
        title: "Chief Technology Officer",
        description: "Ben oversees our technology stack, ensuring our platform is robust, scalable, and at the forefront of innovation to best serve the needs of researchers worldwide.",
        imageSrc: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400&h=400&auto=format&fit=crop",
        imageHint: "cto portrait"
    }
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-left">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{member.name}</h3>
                                    <p className="text-primary-foreground/80 font-medium">{member.title}</p>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <p className="text-muted-foreground mb-4 text-sm">{member.description}</p>
                                <div className="flex justify-center gap-4">
                                    <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                                    <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
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
                <div className="space-y-8 text-muted-foreground">
                    <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-3">Earning the right</h3>
                        <p className="text-justify">
                            As a first-order business consulting firm, we help companies, foundations and individuals make a difference. Our work gets to the heart of the matter. We break silos because it takes more than any one check or policy or letter to tackle big issues like economic security, human rights or climate sustainability. We prescribe a custom formula of advocacy, collaboration, investment, philanthropy, policy and new ways of doing business in order to help you make progress.
                        </p>
                    </div>

                    <div className="relative border-l-4 border-primary pl-10 py-4 bg-background rounded-r-lg">
                        <svg className="absolute left-2 top-4 h-8 w-8 text-muted" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                            <path d="M9.981 3c-2.9 0-5.58 1.9-5.58 4.7 0 1.9 1.1 3.5 2.7 4.1.1.1.2.1.2.2v.1l-.1.1c-1.3.4-2.8 1.5-2.8 3.5 0 2.2 1.9 3.6 4.1 3.6h.1V22h-3v3h3v2h3v-2h5v-3h-5v-5.2c0-2.4-1.6-4.1-4-4.5.3-.3.5-.7.5-1.1 0-1-1-1.9-2.1-1.9zM23.981 3c-2.9 0-5.58 1.9-5.58 4.7 0 1.9 1.1 3.5 2.7 4.1.1.1.2.1.2.2v.1l-.1.1c-1.3.4-2.8 1.5-2.8 3.5 0 2.2 1.9 3.6 4.1 3.6h.1V22h-3v3h3v2h3v-2h5v-3h-5v-5.2c0-2.4-1.6-4.1-4-4.5.3-.3.5-.7.5-1.1 0-1-1-1.9-2.1-1.9z"></path>
                        </svg>
                        <blockquote className="text-xl italic text-foreground font-semibold text-center">
                            "But how do we do it? We like to call it earning the right, walking the talk and playing the game..."
                        </blockquote>
                    </div>

                    <div className="grid grid-cols-1">
                        <p className="md:columns-2 gap-8 text-justify">
                            <span className="float-left text-7xl font-bold text-primary mr-3 -mt-2 leading-none">E</span>lixir serves to help people with creative ideas succeed. Our platform empowers millions of people — from individuals and local artists to entrepreneurs shaping the world’s most iconic businesses — to share their stories and create an impactful, stylish, and easy-to-manage online presence. The Cambridge office is the home of the Risk management practice. We work to assure the safe performance of complex critical systems; develop safety leadership and culture; manage safety and risk in high-hazard industries; understand complex project risks, measure and report risk performance. We work across a wide range of industries and public sector organizations that include upstream and downstream oil and gas; rail and road transportation; construction; and gas utilities and distribution. We work worldwide in Europe, Middle East and Asia, Africa and South America based out of our offices in Cambridge, UK and Milan, Italy.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <Card className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <CardHeader className="text-center">
                        <Goal className="h-12 w-12 mx-auto text-primary" />
                        <CardTitle className="mt-4 text-3xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground text-lg">
                        <p>To empower researchers and innovators by providing a seamless, transparent, and supportive ecosystem for publishing and protecting their work, fostering global collaboration and accelerating scientific progress.</p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <CardHeader className="text-center">
                        <Eye className="h-12 w-12 mx-auto text-primary" />
                        <CardTitle className="mt-4 text-3xl">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground text-lg">
                        <p>To be the world's most trusted and innovative platform for the dissemination and protection of academic research, creating a future where knowledge knows no boundaries.</p>
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
