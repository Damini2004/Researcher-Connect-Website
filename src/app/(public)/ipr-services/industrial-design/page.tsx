
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Gem, Palette, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function IndustrialDesignPage() {
    return (
        <div className="bg-secondary/20">
             <section className="relative h-[400px] bg-gray-800 text-white">
                <Image 
                    src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1600&h=400&auto=format&fit=crop"
                    alt="Abstract design"
                    data-ai-hint="abstract design"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-10">
                    <div className="p-4 bg-white/10 rounded-full w-fit mb-4 backdrop-blur-sm">
                        <Gem className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Industrial Design Rights</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl">
                       Protect the unique visual appearance of your products. An industrial design constitutes the ornamental or aesthetic aspect of an article.
                    </p>
                </div>
            </section>

             <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <Image
                            alt="Product Design"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            height="310"
                            src="https://images.unsplash.com/photo-1525972776854-3ed3413337a7?q=80&w=800&auto=format&fit=crop"
                            data-ai-hint="product design"
                            width="550"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Define Your Product's Identity</h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                   Your product's design is its signature. It's what sets it apart on the shelf and in the minds of consumers. We help you protect this vital asset through industrial design registration, safeguarding your unique aesthetic from imitation.
                                </p>
                            </div>
                             <Button asChild size="lg" className="w-fit">
                                <Link href="/contact-us">
                                    File Your Design Application <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Key Aspects of Design Protection</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Palette className="text-primary" />
                                    What is Protected?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                A design can consist of three-dimensional features, such as the shape of an article, or two-dimensional features, such as patterns, lines or color. It protects the visual appeal, not the functional aspects.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <ShieldCheck className="text-primary" />
                                    Why Register Your Design?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                Registration provides you with the exclusive right to prevent others from making, selling, or importing articles bearing a design which is a copy, or substantially a copy, of the protected design.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <Image 
                            src="https://images.unsplash.com/photo-1608499996688-2d2a4a755c46?q=80&w=500&h=500&auto=format&fit=crop"
                            alt="Stylish product design"
                            data-ai-hint="product aesthetic"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
