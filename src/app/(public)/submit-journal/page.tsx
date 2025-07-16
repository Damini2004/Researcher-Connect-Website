import JournalSubmissionForm from "@/components/forms/journal-submission-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { FileUp, Sparkles, CheckCircle } from "lucide-react";

const submissionBenefits = [
    {
        icon: FileUp,
        text: "Simple and streamlined submission process."
    },
    {
        icon: Sparkles,
        text: "AI-powered keyword suggestions to improve discoverability."
    },
    {
        icon: CheckCircle,
        text: "Rigorous peer-review by experts in your field."
    }
]

export default function SubmitJournalPage() {
  return (
    <div className="bg-muted/40">
        <div className="container py-12 md:py-24">
            <Card className="grid lg:grid-cols-2 overflow-hidden shadow-2xl border-primary/10">
                <div className="relative flex-col items-start justify-between p-8 md:p-12 text-white bg-primary hidden lg:flex">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70"></div>
                     <Image 
                        src="https://placehold.co/800x1200.png"
                        alt="Research"
                        data-ai-hint="research abstract"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold">Share Your Discovery with the World</h2>
                        <p className="mt-2 text-primary-foreground/80">
                            Join thousands of researchers who have successfully published their work with JournalEdge. We provide the tools and support you need to make an impact.
                        </p>
                    </div>
                    <div className="relative z-10 mt-8 space-y-4">
                        {submissionBenefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <benefit.icon className="h-5 w-5 text-yellow-300" />
                                <span className="text-primary-foreground/90">{benefit.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-8 md:p-12">
                    <CardHeader className="text-center p-0 mb-8">
                        <CardTitle className="text-3xl">Submit Your Manuscript</CardTitle>
                        <CardDescription>
                        Fill out the form below. Our AI will help suggest relevant tags.
                        </CardDescription>
                    </CardHeader>
                    <JournalSubmissionForm />
                </div>
            </Card>
        </div>
    </div>
  );
}
