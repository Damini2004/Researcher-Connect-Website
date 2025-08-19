
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, Eye, Goal, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const coreValues = [
    "Integrity",
    "Excellence",
    "Collaboration",
    "Innovation",
    "Inclusivity"
];

export default function MissionVisionPage() {
  return (
    <div>
        <section className="relative w-full h-[300px] bg-gray-800 text-white">
            <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&h=300&auto=format&fit=crop"
                alt="Team looking at a bright future"
                data-ai-hint="team future"
                fill
                className="object-cover opacity-20"
            />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <h1 className="text-5xl font-extrabold tracking-tight">Mission & Vision</h1>
                <div className="flex items-center text-sm text-white/80 mt-2">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="font-semibold text-white">Mission & Vision</span>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
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
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
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
        </section>
    </div>
  );
}
