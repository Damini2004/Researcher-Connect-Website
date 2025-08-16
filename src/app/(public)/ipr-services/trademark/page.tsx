import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search, Edit, ShieldCheck, ArrowRight } from "lucide-react";

export default function TrademarkPage() {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Trademark Registration</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Secure your brand identity. A trademark protects your brand names, logos, and slogans, distinguishing your goods and services from the competition.
                    </p>
                </div>
                
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
                        <Button className="mt-6">
                            Start Your Application <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-r-lg overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=600&h=400&auto=format&fit=crop" alt="Trademark" data-ai-hint="brand logo" layout="fill" objectFit="cover" />
                    </div>
                </Card>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Our Trademark Services</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Search className="text-primary"/>Clearance Search</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">We conduct comprehensive searches to ensure your desired mark is available for use and registration.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Edit className="text-primary"/>Application Filing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Our experts prepare and file your trademark application with the appropriate national office to maximize success.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary"/>Monitoring & Enforcement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">We offer services to monitor for infringing marks and can assist with enforcement actions to protect your brand.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
