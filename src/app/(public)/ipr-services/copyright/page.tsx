
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BookCopy, Edit, Shield, FileText, ArrowRight } from "lucide-react";

const copyrightInfo = [
    {
        icon: BookCopy,
        title: "What Can Be Copyrighted?",
        description: "Copyright protects original works of authorship including literary, dramatic, musical, and artistic works, such as poetry, novels, movies, songs, computer software, and architecture."
    },
    {
        icon: Shield,
        title: "Protection & Rights",
        description: "Registration provides a public record of your ownership and is required before you can file an infringement suit in court. It grants you exclusive rights to reproduce, distribute, and display your work."
    },
    {
        icon: FileText,
        title: "Our Filing Service",
        description: "We handle the entire application process, from preparing the forms and submitting the deposit materials to corresponding with the Copyright Office, making the process seamless for you."
    }
];

export default function CopyrightPage() {
    return (
        <div>
            <section className="w-full py-20 md:py-32 bg-primary/5">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                 <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Copyright Services</div>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Protect Your Creative Works
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Safeguard your literary, artistic, and musical creations with formal copyright registration. We provide expert assistance to ensure your original works are legally protected from unauthorized use.
                                </p>
                            </div>
                        </div>
                         <Image
                            src="https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600&h=400&auto=format&fit=crop"
                            width="600"
                            height="400"
                            alt="Copyright Symbol"
                            data-ai-hint="copyright symbol"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                        />
                    </div>
                </div>
            </section>

             <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <Image
                            alt="Creative Works"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            height="310"
                            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop"
                            data-ai-hint="books art"
                            width="550"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Secure Your Original Works</h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                   Copyright is a legal right that grants creators exclusive control over their original works. From manuscripts and music to software and architectural designs, we help you secure the legal protection your creative endeavors deserve.
                                </p>
                            </div>
                             <Button asChild size="lg" className="w-fit">
                                <a href="/contact-us">
                                    Register Your Copyright <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
                <div className="container px-4 md:px-6">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Our Copyright Services</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            We provide comprehensive support for copyright registration and management.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12">
                        {copyrightInfo.map((item) => (
                            <Card key={item.title} className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full">
                                      <item.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="mt-2">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
