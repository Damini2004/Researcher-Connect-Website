
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake, Lightbulb, Users, Zap, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

const sponsorLogos = [
    { src: "https://logodix.com/logo/2038481.png", alt: "Sponsor Logo 1", hint: "logo company" },
    { src: "https://logodix.com/logo/1993463.png", alt: "Sponsor Logo 2", hint: "logo brand" },
    { src: "https://logodix.com/logo/1712867.png", alt: "Sponsor Logo 3", hint: "logo business" },
    { src: "https://logodix.com/logo/1101923.png", alt: "Sponsor Logo 4", hint: "logo tech" },
    { src: "https://logodix.com/logo/647339.png", alt: "Sponsor Logo 5", hint: "logo education" },
]


export default function SponsorsPage() {
  return (
    <div className="bg-secondary/50">
        <div className="container py-16 md:py-24 space-y-24">
            <section>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sponsors & Exhibitors</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Partner with IFERP to connect with a global network of innovators and leaders. Our conferences provide a unique platform to enhance your brand visibility and achieve your marketing goals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            </section>
            
            <section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Our Esteemed Sponsors</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        We are proud to partner with leading organizations from academia and industry.
                    </p>
                </div>
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="flex w-max animate-[scroll-x_30s_linear_infinite]">
                        {[...sponsorLogos, ...sponsorLogos].map((logo, index) => (
                             <Image 
                                key={index}
                                src={logo.src} 
                                width={150} 
                                height={60} 
                                alt={logo.alt} 
                                data-ai-hint={logo.hint}
                                className="mx-8 h-16 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" 
                            />
                        ))}
                    </div>
                </div>
            </section>
            
             <section>
                <Card className="grid md:grid-cols-2 items-center overflow-hidden shadow-lg">
                    <div className="p-8 md:p-12">
                        <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                            <Briefcase className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">Exhibitor Opportunities</h2>
                        <p className="mt-4 text-muted-foreground">
                           Showcase your products and services to a highly targeted audience. Our exhibition hall is the central hub of the conference, providing a vibrant space for networking and engagement.
                        </p>
                        <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
                            <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Prime booth locations with high foot traffic.</li>
                            <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Listing in the official conference program.</li>
                            <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Dedicated time slots for attendee interaction.</li>
                        </ul>
                         <Button className="mt-6" asChild>
                            <Link href="/contact-us">
                                Inquire About Exhibiting
                            </Link>
                        </Button>
                    </div>
                    <div className="relative h-full min-h-[300px] md:min-h-0">
                        <Image 
                            src="https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=600&h=500&auto=format&fit=crop"
                            alt="Conference exhibition"
                            data-ai-hint="conference exhibition"
                            fill
                            className="object-cover"
                        />
                    </div>
                </Card>
            </section>

            <section>
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
            </section>
        </div>
    </div>
  );
}
