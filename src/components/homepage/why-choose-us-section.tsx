// src/components/homepage/why-choose-us-section.tsx
import Image from "next/image";
import { Briefcase, CheckCircle, LifeBuoy } from "lucide-react";

const whyChooseUsPoints = [
    {
        icon: Briefcase,
        title: "We Are Professional",
        description: "We resource, train, speak, mentor and encourage marketplace leaders, business owners and career professionals to be effective in the workplace."
    },
    {
        icon: CheckCircle,
        title: "We Are Creative",
        description: "With so many factors to consider when deciding how to characterize your company, wouldn't it be great to have a group of forward-thinking, well-informed individuals on board who know what they're doing?"
    },
    {
        icon: LifeBuoy,
        title: "24/7 Great Support",
        description: "Design clever and compelling marketing strategies, improve product positioning and drive conversion rates. We are available to guide you."
    }
];

export function WhyChooseUsSection() {
    return (
        <section id="why-choose-us" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Us</h2>
                        <div className="w-24 h-1 bg-primary mx-auto" />
                    </div>
                </div>
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&h=600&auto=format&fit=crop" alt="Why Choose Us" width={800} height={600} className="rounded-lg object-cover" data-ai-hint="business meeting" />
                    <div className="space-y-8">
                        {whyChooseUsPoints.map((point) => (
                             <div key={point.title} className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-md">
                                    <point.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">{point.title}</h4>
                                    <p className="text-muted-foreground mt-1">{point.description}</p>
                                </div>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
