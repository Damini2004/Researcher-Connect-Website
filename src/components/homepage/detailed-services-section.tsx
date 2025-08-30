// src/components/homepage/detailed-services-section.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Software Solutions (RAMS & SDGMapper)",
    description:
      "Leverage advanced reliability analysis and sustainable development tracking with our custom-built tools, helping organizations make informed, impactful decisions.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    imageHint: "data dashboard",
    link: "/services/software-solutions",
  },
  {
    title: "Conference Management",
    description:
      "Plan, organize, and execute academic conferences seamlessly — from budgeting and logistics to on-site coordination and post-event reporting.",
    imageUrl:
      "https://kmeducationhub.de/wp-content/uploads/2014/08/wc-knowledgemanagement-conferences.jpg",
    imageHint: "conference audience",
    link: "/conference",
  },
  {
    title: "Higher Studies (PhD & PostDoc) Proposals",
    description:
      "Receive expert guidance to craft competitive PhD and Postdoctoral research proposals, improving your chances of acceptance and funding.",
    imageUrl:
      "https://bmmagazine.co.uk/wp-content/uploads/2021/06/shutterstock_1229594236-scaled.jpg",
    imageHint: "advisory meeting",
    link: "/services/phd-services",
  },
  {
    title: "EB-1 Consultancy",
    description:
      "Navigate the EB-1 visa process with confidence. Our specialists help showcase your extraordinary ability and prepare a strong application for U.S. immigration.",
    imageUrl:
      "https://greencard.writewing.in/wp-content/uploads/2025/01/eb1-free-evaluation4.jpg",
    imageHint: "professional career",
    link: "/services/eb1-consultancy",
  },
  {
    title: "Internship Services",
    description:
      "Connect with top research institutions and industry leaders to secure internships that build valuable skills and strengthen your academic profile.",
    imageUrl:
      "https://img.freepik.com/free-photo/group-people-working-out-business-plan-office_1303-15773.jpg?w=800&t=st=1716368965~exp=1716369565~hmac=2a65751d8d21a8d052a920235d254b7d15919799468902f4104c35b44a034876",
    imageHint: "professional career",
    link: "/internship",
  },
  {
    title: "PhD Services",
    description:
      "Get end-to-end PhD support — from identifying programs and preparing applications to proposal development, publication strategy, and career planning.",
    imageUrl:
      "https://bmmagazine.co.uk/wp-content/uploads/2021/06/shutterstock_1229594236-scaled.jpg",
    imageHint: "professional career",
    link: "/services/phd-services",
  },
  {
    title: "Publication & Patent Support",
    description:
      "Turn innovative ideas into impactful publications and secure intellectual property through guided patent application and journal submission processes.",
    imageUrl:
      "https://images.unsplash.com/photo-1554497103-93ba3e71d222?q=80&w=800&auto=format&fit=crop",
    imageHint: "tax documents",
    link: "/services/publications-patent",
  },
];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);


export function DetailedServicesSection() {
  return (
    <section
      id="our-services-detailed"
      className="w-full py-12 md:py-24 lg:py-32 bg-background"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-y-16 mt-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className={index % 2 !== 0 ? "lg:order-last" : ""}>
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  width={800}
                  height={600}
                  className="rounded-lg object-cover"
                  data-ai-hint={service.imageHint}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href={service.link}>
                    Learn More <ArrowRight className="ml-2" />
                  </Link>
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
                    <h4 className="text-lg font-bold">Email Us</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        Get in touch via email.{" "}
                        <a href="mailto:support@researcherconnect.com" className="underline text-primary">
                            Send an email
                        </a>
                    </p>
                </div>
            </div>
            <div className="flex items-start text-left p-4 gap-4">
                <div className="p-2 rounded-md bg-primary/10 mt-1">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="text-lg font-bold">Call a Specialist</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        Our support team is ready for you at <a href="tel:+919970294396" className="underline text-primary">+91-9970294396</a>.
                    </p>
                </div>
            </div>
             <div className="flex items-start text-left p-4 gap-4">
                <div className="p-2 rounded-md bg-primary/10 mt-1">
                    <WhatsAppIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="text-lg font-bold">Chat on WhatsApp</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        Connect with us instantly on WhatsApp.{" "}
                        <a href="https://wa.me/919970294396" target="_blank" rel="noopener noreferrer" className="underline text-primary">
                            Start chatting
                        </a>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
