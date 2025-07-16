import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ThumbsUp, X, MessageSquareQuote } from "lucide-react";
import Image from "next/image";

const dos = [
    "Thank the reviewers and editors for their time and comments.",
    "Address all points raised by the reviewers, one by one.",
    "Be polite and respectful, even when you disagree.",
    "Provide clear, evidence-based rebuttals for points you disagree with.",
    "Clearly indicate where changes have been made in the revised manuscript."
];

const donts = [
    "Ignore any of the reviewers' comments or suggestions.",
    "Be defensive or aggressive in your responses.",
    "Make claims that are not supported by your data.",
    "Submit a revised manuscript without a point-by-point response.",
    "Criticize the reviewers' expertise or competence."
];

export default function ResponseToReviewersPage() {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="text-center mb-16">
                    <MessageSquareQuote className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Responding to Reviewer Comments</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Crafting a thoughtful and comprehensive response to reviewer feedback is crucial for getting your manuscript accepted.
                    </p>
                </div>

                <Card className="mb-16 overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-8 md:p-10">
                            <h2 className="text-2xl font-bold text-primary mb-3">A Constructive Dialogue</h2>
                            <p className="text-muted-foreground">
                                View the peer review process as a constructive dialogue aimed at improving the quality of your research. A well-structured response demonstrates your professionalism and commitment to your work. Address each point methodically to show editors and reviewers that you have taken their feedback seriously.
                            </p>
                        </div>
                        <div className="relative min-h-[250px] md:min-h-0 md:h-full">
                            <Image
                                src="https://placehold.co/600x400.png"
                                alt="Collaborative discussion"
                                data-ai-hint="discussion feedback"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border-green-500/50 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-green-600">
                                <ThumbsUp className="h-8 w-8" />
                                Best Practices: Do's
                            </CardTitle>
                            <CardDescription>Follow these best practices for an effective response.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {dos.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card className="border-destructive/50 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-destructive">
                                <X className="h-8 w-8" />
                                Common Mistakes: Don'ts
                            </CardTitle>
                            <CardDescription>Avoid these common pitfalls in your rebuttal letter.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ul className="space-y-3">
                                {donts.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <X className="h-5 w-5 mt-0.5 text-destructive flex-shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
