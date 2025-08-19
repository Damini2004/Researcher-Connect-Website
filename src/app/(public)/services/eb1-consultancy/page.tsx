
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ChevronRight, Award, BookOpen, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const criteria = [
    { title: "Extraordinary Ability", description: "Demonstrate sustained national or international acclaim in your field." },
    { title: "Outstanding Professor/Researcher", description: "Show international recognition for your outstanding academic achievements." },
    { title: "Multinational Manager/Executive", description: "For executives transferring to a U.S. affiliate of their company." },
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

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Achieve Your American Dream</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            The EB-1 visa is for individuals with extraordinary ability, outstanding professors and researchers, and certain multinational executives. We provide expert consultancy to help you navigate the complex application process.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {criteria.map(item => (
                            <Card key={item.title}>
                                <CardHeader>
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
                            <Link href="/contact-us">Consult with an Expert</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
