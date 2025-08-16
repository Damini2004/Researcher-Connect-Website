import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Globe, ShieldCheck, ArrowRight, Waypoints } from "lucide-react";

const globalServices = [
    {
        title: "International Patent Filing (PCT)",
        description: "Utilize the Patent Cooperation Treaty to seek patent protection for an invention simultaneously in a large number of countries by filing a single 'international' patent application.",
        icon: Globe
    },
    {
        title: "Madrid System for Trademarks",
        description: "Register and manage your trademark worldwide through a single application and a centralized system, covering up to 130 countries.",
        icon: Waypoints
    },
    {
        title: "Hague System for Designs",
        description: "A practical business solution for registering up to 100 industrial designs in over 90 countries through a single international application.",
        icon: PaletteIcon
    }
]

function PaletteIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
    )
}

export default function GlobalIpPage() {
    return (
        <div>
            <section className="relative h-[500px] bg-gray-800 text-white">
                <Image 
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1600&h=500&auto=format&fit=crop"
                    alt="Global map"
                    data-ai-hint="world map"
                    fill
                    className="object-cover opacity-30"
                />
                <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Global IP Protection</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl">
                        Extend your intellectual property rights beyond national borders. We provide strategic advice and filing services for international protection of your patents, trademarks, and designs.
                    </p>
                    <Button size="lg" className="mt-8">
                        Request a Consultation <ArrowRight className="ml-2" />
                    </Button>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">International Filing Systems</h2>
                        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                           Leverage international treaties to efficiently protect your IP in multiple jurisdictions.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {globalServices.map(service => (
                            <Card key={service.title} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-md">
                                            <service.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle>{service.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
