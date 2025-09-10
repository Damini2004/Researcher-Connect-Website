
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search, Edit, ShieldCheck, ArrowRight, Award } from "lucide-react";
import Link from "next/link";

const trademarkServices = [
    {
        icon: Search,
        title: "Clearance Search",
        description: "We conduct comprehensive searches to ensure your desired mark is available for use and registration."
    },
    {
        icon: Edit,
        title: "Application Filing",
        description: "Our experts prepare and file your trademark application with the appropriate national office to maximize success."
    },
    {
        icon: ShieldCheck,
        title: "Monitoring & Enforcement",
        description: "We offer services to monitor for infringing marks and can assist with enforcement actions to protect your brand."
    }
];

export default function TrademarkPage() {
    return (
        <div className="bg-background">
            <section className="relative h-[400px] bg-gray-800 text-white">
                <Image 
                    src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1600&h=400&auto=format&fit=crop"
                    alt="Brand logos"
                    data-ai-hint="brand logo"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-10">
                    <div className="p-4 bg-white/10 rounded-full w-fit mb-4 backdrop-blur-sm">
                        <Award className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Trademark Registration</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl">
                        Secure your brand identity. A trademark protects your brand names, logos, and slogans, distinguishing your goods and services from the competition.
                    </p>
                </div>
            </section>

             <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Brand is Your Asset</h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                   A strong brand is one of your most valuable business assets. Trademark registration provides the legal foundation to protect your brand's identity, prevent unauthorized use, and build customer trust and recognition.
                                </p>
                            </div>
                             <Button asChild size="lg" className="w-fit">
                                <Link href="/contact-us">
                                    Start Your Application <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <Image
                            alt="Branding"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            height="310"
                            src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800&auto=format&fit=crop"
                            data-ai-hint="branding identity"
                            width="550"
                        />
                    </div>
                </div>
            </section>


            <div className="container mx-auto px-4 py-12 md:py-20 bg-secondary/30">
                <Card className="grid md:grid-cols-2 items-center mb-16 shadow-lg border-primary/20">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-primary mb-4">Why Register a Trademark?</h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <span><span className="font-semibold text-foreground">Nationwide Priority:</span> Establishes your rights to use the mark nationwide for your specific goods or services.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <span><span className="font-semibold text-foreground">Legal Presumption of Ownership:</span> A registered trademark serves as legal evidence of your ownership and exclusive rights.</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <span><span className="font-semibold text-foreground">Deters Others:</span> Discourages others from using confusingly similar marks and makes it easier to stop them if they do.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-r-lg overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=600&h=400&auto=format&fit=crop" alt="Trademark" data-ai-hint="business meeting" layout="fill" objectFit="cover" />
                    </div>
                </Card>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Our Trademark Services</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {trademarkServices.map(service => (
                        <Card key={service.title}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><service.icon className="text-primary"/>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
