
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, Cpu, Map, GanttChartSquare, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        name: "Reliability Analysis (RAMS)",
        description:
          "Predict system performance, identify risks, and optimize lifecycle costs to ensure safety and compliance.",
        icon: CheckCircle,
      },
      {
        name: "SDG Mapping (SDGMapper)",
        description:
          "Align projects with UN Sustainable Development Goals, track contributions, and visualize global impact.",
        icon: ChevronRight,
      },
      {
        name: "Scalability",
        description:
          "Built to support individual teams or global research collaborations with equal efficiency.",
        icon: Map,
      },
  ];
  

export default function SoftwareSolutionsPage() {
    return (
        <div>
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Data analytics dashboard"
                    data-ai-hint="data dashboard"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Software Solutions</h1>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container max-w-7xl mx-auto px-4 md:px-6">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
      <Image
        alt="Software Interface"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
        height="310"
        src="https://cdn.intuji.com/2023/08/Custom-software-development.jpg"
        data-ai-hint="software development"
        width="550"
      />
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
            Software Solutions
          </h2>
          <p className=" text-justify text-muted-foreground ">
            Researcher Connect provides advanced digital tools to accelerate impactful research.
            RAMS (Reliability, Availability, Maintainability, and Safety) helps teams assess risk,
            enhance system performance, and meet regulatory standards across complex projects.
            SDGMapper aligns research with the UN Sustainable Development Goals, simplifying
            progress tracking, gap analysis, and impact reporting. Together, these platforms deliver
            data-driven insights, streamlined workflows, and measurable results. Whether optimizing
            designs or demonstrating societal relevance, our software solutions turn complex research
            challenges into opportunities for innovation and meaningful progress in today’s
            fast-moving academic and industrial environments.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Core Software Features</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Powerful tools to drive your projects forward.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map(feature => (
                            <Card key={feature.name} className="text-center">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                        <feature.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{feature.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Button asChild size="lg">
                            <Link href="/contact-us">Request a Demo <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
