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
                    <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
                         <Image
                            src="https://placehold.co/600x400.png"
                            width="600"
                            height="400"
                            alt="Copyright Symbol"
                            data-ai-hint="copyright symbol"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover order-last lg:order-first"
                        />
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
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button asChild size="lg">
                                    <a href="/contact-us">
                                        Register Your Copyright <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
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
