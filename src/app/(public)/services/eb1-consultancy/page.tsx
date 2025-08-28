
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ChevronRight, Award, BookOpen, UserCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const criteria = [
    { title: "Extraordinary Ability", description: "Demonstrate sustained national or international acclaim in your field.", icon: Award },
    { title: "Outstanding Professor/Researcher", description: "Show international recognition for your outstanding academic achievements.", icon: BookOpen },
    { title: "Multinational Manager/Executive", description: "For executives transferring to a U.S. affiliate of their company.", icon: UserCheck },
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
                    <div className="flex items-center text-sm text-white/80 mt-2">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-semibold text-white">EB-1 Consultancy</span>
                    </div>
                </div>
            </section>

             <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
                        <Image
                            alt="Visa Application"
                            className="aspect-video overflow-hidden rounded-xl object-cover object-center w-full max-w-2xl"
                            height="310"
                            src="https://greencard.writewing.in/wp-content/uploads/2025/01/eb1-free-evaluation4.jpg"
                            data-ai-hint="visa documents"
                            width="550"
                        />
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Navigate the Path to U.S. Residency</h2>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                The EB-1 visa category is designed for foreign nationals who demonstrate extraordinary ability in their field. We provide expert consultancy to help you navigate the complex application process, ensuring your petition is strong, comprehensive, and well-documented.
                            </p>
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
                    <div className="grid md:grid-cols-3 gap-8">
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
