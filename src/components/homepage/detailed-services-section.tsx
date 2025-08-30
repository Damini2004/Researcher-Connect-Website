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
      "https://bmmagazine.co.uk/wp-content/uploads/2021/06/shutterstock_1229594236-scaled.jpg",
    imageHint: "team collaboration",
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
      "https://www.insidehighered.com/sites/default/files/styles/max_650x650/public/2025-01/GettyImages-1269698264.jpg?itok=iX7zOHDm",
    imageHint: "advisory meeting",
    link: "/services/phd-services",
  },
  {
    title: "EB-1 Consultancy",
    description:
      "Navigate the EB-1 visa process with confidence. Our specialists help showcase your extraordinary ability and prepare a strong application for U.S. immigration.",
    imageUrl:
      "https://cdn.prod.website-files.com/68209b7cca9ee8ebdd653f0c/6881cf401340fb408976a022_phd%20holder.jpg",
    imageHint: "professional career",
    link: "/services/eb1-consultancy",
  },
  {
    title: "Internship Services",
    description:
      "Connect with top research institutions and industry leaders to secure internships that build valuable skills and strengthen your academic profile.",
    imageUrl:
      "https://cdn.prod.website-files.com/663c844e64d28ad42770d8f9/66b49977106e7d1b0a6b5c72_internship-program-benefits.webp",
    imageHint: "professional career",
    link: "/services/internships",
  },
  {
    title: "PhD Services",
    description:
      "Get end-to-end PhD support — from identifying programs and preparing applications to proposal development, publication strategy, and career planning.",
    imageUrl:
      "https://digitalwheel.in/wp-content/uploads/2025/05/How-to-apply-for-PhD-without-NET.jpg",
    imageHint: "professional career",
    link: "/services/phd-services",
  },
  {
    title: "Publication & Patent Support",
    description:
      "Turn innovative ideas into impactful publications and secure intellectual property through guided patent application and journal submission processes.",
    imageUrl:
      "https://www.levinconsultinggroup.com/wp-content/uploads/2020/06/patent-licensing-a-definitive-guide.jpg",
    imageHint: "tax documents",
    link: "/services/publications-patent",
  },
];

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
              <h4 className="text-lg font-bold">Special financing</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Apply for special financial support and earn exclusive rewards.
              </p>
            </div>
          </div>
          <div className="flex items-start text-left p-4 gap-4">
            <div className="p-2 rounded-md bg-primary/10 mt-1">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Chat with team</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Have a question? Chat online with an expert.{" "}
                <a href="#" className="underline text-primary">
                  Start chatting
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start text-left p-4 gap-4">
            <div className="p-2 rounded-md bg-primary/10 mt-1">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Call a specialist</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Our 24/7 support team is ready for you at 1-800-MY-Elixir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
