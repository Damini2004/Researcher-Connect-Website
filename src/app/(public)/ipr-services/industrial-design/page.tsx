import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Gem, Palette, ShieldCheck, ArrowRight } from "lucide-react";

export default function IndustrialDesignPage() {
    return (
        <div className="bg-secondary/20">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center mb-16">
                    <Gem className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Industrial Design Rights</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Protect the unique visual appearance of your products. An industrial design constitutes the ornamental or aesthetic aspect of an article.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <Image 
                            src="https://placehold.co/500x500.png"
                            alt="Stylish product design"
                            data-ai-hint="product design"
                            fill
                            className="object-cover"
                        />
                    </div>
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
                         <Button size="lg">
                            File Your Design Application <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
