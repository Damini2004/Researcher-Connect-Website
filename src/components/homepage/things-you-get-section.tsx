// src/components/homepage/things-you-get-section.tsx
import { Orbit, Mail, Target, Globe, Wallet, BarChart } from "lucide-react";

const thingsYouGet = [
    {
        icon: Orbit,
        title: "Creative Support",
        description: "We transform brands, grow businesses, and tell brand and product stories in a most creative way."
    },
    {
        icon: Mail,
        title: "Creating Experiences",
        description: "We cover a large range of creative platforms and digital projects with one purpose: to create experiences."
    },
    {
        icon: Target,
        title: "Product Consulting",
        description: "We guide you through the pipelines that generate new products with higher potential and lower risk."
    },
    {
        icon: Globe,
        title: "Business Boosting",
        description: "We provide energy-efficient and environmentally conservative solutions to our clients to boost their business."
    },
    {
        icon: Wallet,
        title: "Strategic Approach",
        description: "Based on solid strategic framework and real, relevant research, we create prototypes, not presentations."
    },
    {
        icon: BarChart,
        title: "Logistic Consulting",
        description: "We work buy side and sell side to give our clients hard hitting answers and focus hard on best opportunities."
    }
];

export function ThingsYouGetSection() {
    return (
        <section id="things-you-get" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Things You Get</h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl items-start gap-y-12 gap-x-8 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3 mt-16">
                {thingsYouGet.map((item) => (
                    <div key={item.title} className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg transition-all duration-300 hover:bg-secondary/50 hover:shadow-lg">
                        <div className="p-3 rounded-full border border-gray-200 w-fit">
                            <item.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
          </div>
        </section>
    );
}
