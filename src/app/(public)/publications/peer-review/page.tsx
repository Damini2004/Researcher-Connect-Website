import { FileUp, Search, UserCheck, MessageSquare, CheckCircle, ChevronRight } from "lucide-react";

const reviewSteps = [
    {
        icon: FileUp,
        title: "Submit Manuscript",
        description: "Authors submit their research papers for review."
    },
    {
        icon: Search,
        title: "Initial Evaluation",
        description: "Our editors check for scope, originality, and formatting."
    },
    {
        icon: UserCheck,
        title: "Reviewer Assignment",
        description: "Experts in the field are assigned to review the manuscript."
    },
    {
        icon: MessageSquare,
        title: "Feedback & Revisions",
        description: "Authors receive constructive feedback and submit revisions."
    },
    {
        icon: CheckCircle,
        title: "Final Approval",
        description: "Once approved, the paper moves forward for publication."
    }
];

export default function PeerReviewPage() {
    return (
        <div className="bg-background py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Our Review Process</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        A structured step-by-step process to ensure quality and integrity in peer review.
                    </p>
                </div>

                <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-8">
                    {reviewSteps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center text-center w-48">
                                <div className="relative mb-4">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                            <step.icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg text-foreground mb-1">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>

                            {index < reviewSteps.length - 1 && (
                                <div className="hidden lg:flex items-center justify-center text-muted-foreground">
                                    <ChevronRight className="h-10 w-10" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}