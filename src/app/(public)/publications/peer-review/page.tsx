import { FileUp, Search, UserCheck, MessageSquare, CheckCircle } from "lucide-react";

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
                    <h1 className="text-4xl font-bold tracking-tight text-[#800020] sm:text-5xl">Our Review Process</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        A structured step-by-step process to ensure quality and integrity in peer review.
                    </p>
                </div>

                <div className="relative">
                    {/* The timeline line */}
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200" style={{ transform: 'translateY(-50%)' }}></div>
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-[#800020]" style={{ transform: 'translateY(-50%)', zIndex: 1 }}></div>
                    
                    {/* The timeline items */}
                    <div className="relative flex justify-between">
                        {reviewSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-48 z-10">
                                <div className="relative mb-4">
                                    <div className="w-16 h-16 rounded-full bg-background border-4 border-[#800020] flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-[#800020] text-white flex items-center justify-center">
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}