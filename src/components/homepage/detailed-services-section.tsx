// src/components/homepage/detailed-services-section.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Software Solutions (RAMS & SDGMapper)",
    description: "State-of-the-art tools for reliability engineering and sustainable development goal tracking, empowering organizations to achieve excellence and impact.",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&h=600&auto=format&fit=crop",
    imageHint: "team collaboration",
    link: "/services/software-solutions"
  },
  {
      title: "Conference Management",
      description: "From initial planning and budgeting to on-site execution and post-conference analysis, we handle every detail to ensure your academic event is a success.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&h=600&auto=format&fit=crop",
      imageHint: "conference audience",
      link: "/conference",
      imageLeft: true
  },
  {
      title: "Publication & Patent Support",
      description: "We bridge the gap between innovation and impact, guiding you through securing patents and publishing in high-impact journals.",
      imageUrl: "https://images.unsplash.com/photo-1556742044-53c85d8a9568?q=80&w=800&h=600&auto=format&fit=crop",
      imageHint: "tax documents",
      link: "/services/publications-patent",
  },
  {
      title: "PhD & Higher Studies Guidance",
      description: "Navigating the path to a PhD or Postdoctoral position requires a meticulously crafted research proposal. We offer specialized guidance to help aspiring academics succeed.",
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&h=600&auto=format&fit=crop",
      imageHint: "advisory meeting",
      link: "/services/phd-services",
      imageLeft: true
  },
  {
      title: "EB-1 Visa & Career Consultancy",
      description: "The EB-1 visa is for individuals with extraordinary ability. We provide expert consultancy to help you navigate the complex application process and advance your career.",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&h=600&auto=format&fit=crop",
      imageHint: "professional career",
      link: "/services/eb1-consultancy",
  },
];

export function DetailedServicesSection() {
    return (
        <section id="our-services-detailed" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl gap-y-16 mt-16">
              {services.map(service => (
                 <div key={service.title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={service.imageLeft ? 'lg:order-last' : ''}>
                      <Image src={service.imageUrl} alt={service.title} width={800} height={600} className="rounded-lg object-cover" data-ai-hint={service.imageHint} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                      <Button variant="link" className="p-0 h-auto" asChild>
                        <Link href={service.link}>Learn More <ArrowRight className="ml-2" /></Link>
                      </Button>
                    </div>
                  </div>
              ))}
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-12">
                <div className="flex items-start text-left p-4 gap-4">
                    <div className="p-2 rounded-md bg-primary/10 mt-1">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold">Special financing</h4>
                        <p className="text-sm text-muted-foreground mt-1">Apply for special financial support and earn exclusive rewards.</p>
                    </div>
                </div>
                 <div className="flex items-start text-left p-4 gap-4">
                    <div className="p-2 rounded-md bg-primary/10 mt-1">
                        <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold">Chat with team</h4>
                        <p className="text-sm text-muted-foreground mt-1">Have a question? Chat online with an expert. <a href="#" className="underline text-primary">Start chatting</a></p>
                    </div>
                </div>
                 <div className="flex items-start text-left p-4 gap-4">
                    <div className="p-2 rounded-md bg-primary/10 mt-1">
                        <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold">Call a specialist</h4>
                        <p className="text-sm text-muted-foreground mt-1">Our 24/7 support team is ready for you at 1-800-MY-Elixir.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
    );
}
