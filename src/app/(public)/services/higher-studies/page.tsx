import { redirect } from 'next/navigation';

export default function HigherStudiesPage() {
    // This function will redirect to a non-existent page,
    // which will in turn trigger the custom not-found.tsx component.
    redirect('/404-page-not-found');

    /*
    // Original Page Code - Preserved for future use

    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
    import {  ArrowRight,
      Users,
      Microscope,
      FileText,
      GraduationCap,
      FileEdit,
      BadgeDollarSign,
      Plane,
      Globe2,
      Handshake, } from "lucide-react";
    import Image from "next/image";
    import Link from "next/link";

    const supportAreas = [
      {
        title: "University & Program Selection",
        description:
          "Tailored guidance to match your research interests with leading global universities. Insights into top-ranked programs, supervisors, and labs in your field.",
        icon: GraduationCap,
      },
      {
        title: "Application Assistance",
        description:
          "Support in drafting SOPs, research proposals, and academic CVs. Step-by-step guidance for online applications and document preparation.",
        icon: FileEdit,
      },
      {
        title: "Scholarships & Funding Guidance",
        description:
          "Information on fully-funded scholarships, research fellowships, and grants. Assistance with applications for scholarships like DAAD, Erasmus+, Fulbright, and more.",
        icon: BadgeDollarSign,
      },
      {
        title: "Visa & Pre-Departure Support",
        description:
          "Guidance on visa documentation and interview preparation. Pre-departure orientation covering travel, accommodation, and cultural adaptation.",
        icon: Plane,
      },
      {
        title: "Research Collaboration Opportunities",
        description:
          "Connect with international supervisors and labs. Explore exchange programs, internships, and joint research initiatives.",
        icon: Globe2,
      },
      {
        title: "End-to-End Mentorship",
        description:
          "Dedicated mentors for continuous support until admission. Post-admission support for settling into your academic journey abroad.",
        icon: Handshake,
      },
      ];
      

    export default function HigherStudiesPage() {
        return (
            <div>
                <section className="relative w-full h-[300px] bg-gray-800 text-white">
                    <Image
                        src="/Temp.jpg"
                        alt="Graduation caps in the air"
                        data-ai-hint="graduation ceremony"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                        <h1 className="text-5xl font-extrabold tracking-tight">Higher Studies Proposals</h1>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <Image
            alt="Research Planning"
            className="mx-auto h-[510px] w-full overflow-hidden rounded-xl object-cover object-center"
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
            data-ai-hint="research planning"
            width="550"
            height="610"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
                Unlock Your Academic Future
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-justify">
                At Researcher Connect, we believe that every researcher deserves
                the opportunity to pursue their academic dreams on a global stage.
                We guide scholars, PhD aspirants, and postdoctoral researchers
                through the process of studying and researching abroad, ensuring
                they find the right programs, universities, and funding
                opportunities. From selecting the ideal university to preparing
                strong applications, we provide end-to-end support that makes the
                journey smoother, transparent, and achievable.
              </p>
              <section className="max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">
                  Why Choose Researcher Connect?
                </h2>

                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-justify">
                  <li>
                    Personalized approach tailored to your research domain
                  </li>
                  <li>
                    Global network of universities, researchers, and funding bodies
                  </li>
                  <li>
                    Proven expertise in helping scholars publish, patent, and pursue
                    international opportunities
                  </li>
                </ul>
              </section>
              <p className="max-w-[600px] text-muted-foreground text-justify mt-5">
                Your dream university abroad is closer than you think — and
                Researcher Connect is here to guide every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>




                <section className="py-16 md:py-24 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tight">Your Partner in Academic Advancement</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                            We provide end-to-end support to ensure your proposal is compelling, rigorous, and ready for submission.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
      {supportAreas.map(area => (
        <Card
          key={area.title}
          className="text-left transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <CardHeader className="items-center">
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
              <area.icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{area.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-outside text-muted-foreground space-y-1 pl-4">
              {area.description
                .split(".")
                .filter(Boolean)
                .map((sentence, i) => (
                  <li key={i}>{sentence.trim()}</li>
                ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>

                         <div className="text-center mt-12">
                            <Button size="lg" asChild>
                                <Link href="/contact-us">Get Proposal Support <ArrowRight className="ml-2 h-4 w-4"/></Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
    */
}
