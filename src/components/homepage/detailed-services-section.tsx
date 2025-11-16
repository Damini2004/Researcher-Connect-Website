// src/components/homepage/detailed-services-section.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Software Solutions",
    description:
      "Unlock powerful data-driven tools with RAMS (Reliability, Availability, Maintainability, Safety) and SDGMapper—designed to optimize system performance and align research initiatives with the UN Sustainable Development Goals. These integrated platforms help you analyze risks, ensure compliance, track SDG impact, and present clear visual insights. Streamline workflows, elevate institutional credibility, and support both technical excellence and global responsibility.",
    imageUrl:
      "/software.png",
    imageHint: "data dashboard",
    link: "/services/software-solutions",
  },
  {
    title: "Conference Management",
    description:
      "Organizing an academic conference is a chance to highlight research leadership, attract talent, and spark collaboration. Researcher Connect offers complete conference management, ensuring every phase runs smoothly and professionally. We assist with theme development, calls for papers, and clear submission guidelines. Our team builds modern, user-friendly websites for registration, updates, and participant engagement. Abstracts, peer reviews, and schedules are handled through secure, efficient systems.",
    imageUrl:
      "/conference.png",
    imageHint: "conference audience",
    link: "/conference",
  },
  {
    title: "Higher Studies Proposals",
    description:
      "We guide aspiring researchers through every stage of crafting competitive PhD and postdoctoral proposals. Our team helps refine broad ideas into well-defined topics, synthesize existing literature to establish research context, and design robust methodologies aligned with academic expectations. We ensure funding alignment by tailoring proposals to specific grants, universities, or research councils, while articulating societal and academic impact to enhance visibility and approval rates.",
    imageUrl:
      "/phd.png",
    imageHint: "advisory meeting",
    link: "/services/higher-studies",
  },
  {
    title: "Foreign Visa Services",
    description:
      "We simplify the EB-1 visa process for researchers of extraordinary ability by providing comprehensive, tailored guidance. Our services begin with a thorough eligibility assessment to identify the strongest qualification categories, followed by strategic planning to present achievements effectively. We assist in assembling key evidence, crafting compelling recommendation letters, and structuring portfolios that highlight international recognition, publications, awards, patents, and contributions to the field.",
    imageUrl:
      "/visa.png",
    imageHint: "professional career",
    link: "/services/visa-consultancy",
  },
  {
    title: "Internship Services",
    description:
      "We connect students and early-career researchers with prestigious, career-shaping internships across academic, industrial, and international environments. Our process begins with understanding the individual’s academic focus, research interests, and long-term career objectives. We then match candidates with institutions, labs, or companies offering meaningful roles that complement both technical and scholarly development. Our team assists with application materials, including CVs, statements, and recommendation letters, ensuring candidates stand out competitively.",
    imageUrl:
      "/internship.png",
    imageHint: "professional career",
    link: "/internship",
  },
  // {
  //   title: "PhD Services",
  //   description:
  //     "We provide comprehensive, end-to-end support for the entire PhD journey, enabling scholars to progress with confidence, clarity, and academic excellence. Our services include research topic selection, proposal development, literature reviews, and methodology guidance to establish a strong foundation. We assist with thesis structuring, data analysis planning, academic writing refinement, and publication preparation, ensuring compliance with institutional and international standards. For the final stages, we offer defense preparation, presentation coaching, and editing for professional polish.",
  //   imageUrl:
  //     "/postdoc.png",
  //   imageHint: "professional career",
  //   link: "/services/phd-services",
  // },
  {
    title: "Author Services",
    description:
      "We help researchers amplify their impact by guiding them through the academic publishing landscape. Our publication services cover journal selection, manuscript structuring, reference formatting, and compliance with editorial standards to improve acceptance in high-impact journals. We provide critical reviews, language polishing, and support for responding to peer feedback, ensuring clarity without altering technical precision.",
    imageUrl:
      "/patent.png", // Consider a more relevant image if available
    imageHint: "research paper",
    link: "/services/author-services",
  },
  {
    title: "Patent Drafting Services",
    description:
      "Protect your innovations with our expert guidance. For patents, we conduct prior-art searches, draft and refine applications, and develop jurisdictional strategies for local and international protection. We help you navigate the complex legal requirements to secure your intellectual property.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&h=600&auto=format&fit=crop",
    imageHint: "patent documents",
    link: "/services/patent-consultancy",
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
      className="w-full bg-background"
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
                  loading="lazy"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground text-justify">{service.description}</p>
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
                    <h3 className="text-lg font-bold">Email Us</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Get in touch via email.{" "}
                        <a href="mailto:contact@researcherconnect.com" className="underline text-primary">
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
                    <h3 className="text-lg font-bold">Call a Specialist</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Our support team is ready for you at <a href="tel:+919890917528" className="underline text-primary">+91 9890917528 | 9960266198 | 7887755544</a>.
                    </p>
                </div>
            </div>
             <div className="flex items-start text-left p-4 gap-4">
                <div className="p-2 rounded-md bg-primary/10 mt-1">
                    <WhatsAppIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">Chat on WhatsApp</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Connect with us instantly on WhatsApp.{" "}
                        <a href="https://wa.me/919890917528" target="_blank" rel="noopener noreferrer" className="underline text-primary">
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
