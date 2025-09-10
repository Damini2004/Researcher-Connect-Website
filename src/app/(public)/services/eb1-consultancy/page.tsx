
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ChevronRight, Award, BookOpen, UserCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const criteria = [
    {
        title: "Eligibility Assessment",
        description:
          "Identify the strongest path under EB-1A, EB-1B, or EB-1C categories.",
        icon: UserCheck,
      },
      {
        title: "Evidence Structuring",
        description:
          "Organize your achievements into persuasive, legally compliant packages.",
        icon: Star,
      },
      {
        title: "Recommendation Strategy",
        description:
          "Draft and refine impactful letters from respected experts.",
        icon: BookOpen,
      },
      {
        title: "Case Coordination",
        description:
          "Collaborate with legal teams to ensure complete, timely filing.",
        icon: Award,
      },
  ];
  

export default function EB1ConsultancyPage() {
    return (
        <div>
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Professional at a desk"
                    data-ai-hint="professional business"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">EB-1 Visa Consultancy</h1>
                </div>
            </section>

             <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center max-w-7xl mx-auto">
                        <Image
                            alt="Visa Application"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            height="310"
                            src="https://greencard.writewing.in/wp-content/uploads/2025/01/eb1-free-evaluation4.jpg"
                            data-ai-hint="visa documents"
                            width="550"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Navigate the Path to U.S. Residency</h2>
                                <p className="max-w-[600px] text-muted-foreground text-justify">
                                The EB-1 visa is a pathway for researchers, academics, and professionals recognized for extraordinary ability — but its application process is complex. Researcher Connect offers specialized EB-1 consultancy to help applicants navigate requirements, compile evidence, and present compelling cases to U.S. immigration authorities. From evaluating eligibility and building strong recommendation portfolios to organizing documentation and legal coordination, we ensure each case highlights the applicant’s achievements and international impact. Our support improves clarity, reduces stress, and enhances approval chances. With expert guidance, exceptional researchers can transition confidently into new opportunities abroad, advancing both their careers and the global scientific community.                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Achieve Your American Dream</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            The EB-1 visa is for individuals with extraordinary ability, outstanding professors and researchers, and certain multinational executives. We provide expert consultancy to help you navigate the complex application process.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {criteria.map(item => (
                            <Card key={item.title} className="text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                      <item.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button size="lg" asChild>
                            <Link href="/contact-us">Consult with an Expert <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
