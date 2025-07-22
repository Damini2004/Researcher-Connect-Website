
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake, Lightbulb, Users, Zap } from "lucide-react";
import Link from "next/link";

const sponsorshipBenefits = [
    {
        icon: Zap,
        title: "Brand Visibility",
        description: "Showcase your brand to a targeted audience of academics, researchers, and industry leaders. Gain exposure through our website, marketing materials, and at the event itself."
    },
    {
        icon: Users,
        title: "Networking Opportunities",
        description: "Connect with key decision-makers, leading innovators, and the next generation of talent. Build valuable relationships in a professional and engaging environment."
    },
    {
        icon: Lightbulb,
        title: "Thought Leadership",
        description: "Position your organization as a leader in the field by associating your brand with cutting-edge research and innovation. Host a workshop or sponsor a keynote session."
    },
    {
        icon: Handshake,
        title: "Lead Generation",
        description: "Engage directly with attendees who are actively seeking new solutions, products, and collaborations. Generate qualified leads and drive business growth."
    }
]

export default function SponsorsPage() {
  return (
    <div className="bg-secondary/50">
        <div className="container py-16 md:py-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sponsors & Exhibitors</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Partner with IFERP to connect with a global network of innovators and leaders. Our conferences provide a unique platform to enhance your brand visibility and achieve your marketing goals.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {sponsorshipBenefits.map((benefit) => (
                    <Card key={benefit.title} className="text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <CardHeader className="items-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-3">
                                <benefit.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle>{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">{benefit.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <Card className="text-center p-8 md:p-12 shadow-lg border-primary/20">
                <CardTitle className="text-3xl">Become a Partner</CardTitle>
                <CardDescription className="mt-2 max-w-xl mx-auto">
                    We offer a variety of sponsorship and exhibition packages to suit your needs. Download our sponsorship prospectus to learn more or contact our team to create a custom package.
                </CardDescription>
                <div className="mt-6 flex justify-center gap-4">
                    <Button size="lg">Download Prospectus</Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/contact-us">
                            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    </div>
  );
}
