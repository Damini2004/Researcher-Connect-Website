import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Image from "next/image";

const plagiarismPolicies = [
    { text: "Plagiarized articles will be rejected (Must be 20% below including references).", icon: AlertTriangle, iconColor: "text-destructive" },
    { text: "Copying of contents from other articles is strictly prohibited.", icon: AlertTriangle, iconColor: "text-destructive" },
    { text: "Only articles with 80% original content should be submitted with the expectation of being accepted for our conferences and journals.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "IFERP keenly discourages plagiarism in research articles, proposals and thesis submitted to us.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "All articles submitted to IFERP Conferences and Publications first undergo a plagiarism check before being sent to our editorial board for review.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "Articles failing plagiarism check will be subjected to rejection.", icon: AlertTriangle, iconColor: "text-destructive" },
];

const termsAndConditions = [
    { text: "Note that plagiarized articles will be rejected (Must be 20% below including references).", icon: AlertTriangle, iconColor: "text-destructive" },
    { text: "Copying of contents from other articles is strictly prohibited.", icon: AlertTriangle, iconColor: "text-destructive" },
    { text: "Review reports have to be answered by the author accurately. Malpractice will not be tolerated.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "The Publisher reserves the right to require payment before publishing.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "Payment is due upon receipt of invoices.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "All bank charges are payable by the customer.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "Any Plagiarism, Poor Figures, Flawed Science, and Uneven quality may lead to the rejection of the paper.", icon: AlertTriangle, iconColor: "text-destructive" },
]

export default function PublicationsOverviewPage() {
  return (
    <div className="bg-secondary/20">
        <div className="container py-12 md:py-20">
            {/* Header Section */}
            <div className="text-center mb-16 bg-gradient-to-b from-background to-secondary/10 py-10 rounded-xl shadow-inner">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="text-primary">IFERP</span> Publications
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                    IFERP Journals are peer-reviewed and collaborative journals that strive to publish the most fascinating and dependable source of current information on Arts & Science, Management, Engineering, and Technology.
                </p>
            </div>

            {/* Main Content with Image */}
            <Card className="overflow-hidden mb-16 shadow-xl border-2 border-primary/10 transition-shadow duration-300 hover:shadow-primary/20">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">Expert Publishing Assistance</h2>
                        <p className="text-muted-foreground text-lg">
                            IFERP provides help, assistance, and direction in preparation for SCI and SCIE journal publishing. The SCI & SCIE Indexed Journal Search might be exhausting. Get help with SCI and SCIE Indexed journal publishing.
                        </p>
                    </div>
                    <div className="relative min-h-[300px] md:min-h-0">
                         <Image
                            src="https://placehold.co/600x400.png"
                            alt="Researchers collaborating"
                            data-ai-hint="research collaboration"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Card>

            {/* Policies Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
                    <CardHeader>
                        <CardTitle className="text-2xl">Plagiarism Policy & Publication Ethics</CardTitle>
                        <CardDescription>Maintaining the integrity of academic research.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {plagiarismPolicies.map((policy, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <policy.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${policy.iconColor}`} />
                                    <span className="text-muted-foreground">{policy.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
                    <CardHeader>
                        <CardTitle className="text-2xl">Publication Terms & Conditions</CardTitle>
                         <CardDescription>Guidelines for authors submitting their work.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            {termsAndConditions.map((term, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <term.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${term.iconColor}`} />
                                    <span className="text-muted-foreground">{term.text}</span>
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
