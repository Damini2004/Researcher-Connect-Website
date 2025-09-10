
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, ChevronRight, Edit, Search, Lightbulb, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
    {
        title: "Proposal Development",
        description:
          "Define research questions aligned with current academic trends.",
        icon: BookMarked,
      },
      {
        title: "Thesis Structuring",
        description:
          "Organize chapters, references, and data with clarity and precision.",
        icon: ChevronRight,
      },
      {
        title: "Defense Preparation",
        description:
          "Get coached to present and defend confidently during viva voce.",
        icon: Search,
      },
      {
        title: "Publication Guidance",
        description:
          "Turn your findings into publishable papers in reputable journals.",
        icon: Edit,
      },
  ];
  

export default function PhDServicePage() {
    return (
        <div className="bg-background">
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Person writing at a desk"
                    data-ai-hint="research writing"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">End-to-End PhD Services</h1>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container max-w-7xl mx-auto px-4 md:px-6">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
      <Image
        alt="PhD Journey"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
        height="310"
        src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&auto=format&fit=crop"
        data-ai-hint="phd study"
        width="550"
      />
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
            Your Complete PhD Journey Support
          </h2>
          <p className="max-w-[600px] text-justify text-muted-foreground ">
            Pursuing a PhD is a demanding journey that requires strategic planning,
            academic precision, and consistent guidance. Researcher Connect offers
            comprehensive PhD support — from topic selection, proposal development,
            and literature reviews to publication assistance, thesis structuring, and
            defense preparation. We ensure research stays focused, methodologically
            sound, and aligned with institutional expectations. Our services reduce
            stress, save time, and improve academic outcomes while fostering confidence
            throughout the doctoral process. Whether students are just beginning or
            approaching submission, we provide personalized mentoring and technical
            expertise, enabling scholars to complete their PhDs successfully and make
            meaningful contributions to their respective fields.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                     <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Our Core PhD Services</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            We offer tailored assistance to meet your specific needs at any point in your PhD program.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map(service => (
                            <Card key={service.title} className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                      <service.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Button size="lg" asChild>
                            <Link href="/contact-us">Get PhD Support <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
