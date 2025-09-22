
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ChevronRight, Award, BookOpen, UserCheck, ArrowRight,Trophy,
    Users,
    Book,
    Building2,
    Briefcase,
    Globe2,Microscope,Speaker, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const criteria = [
    {
      title: "Awards & Honors",
      description:
        "National or international prizes, competitive fellowships, or discipline-level distinctions evidencing excellence.\nEvidence: certificates, press, selection criteria",
      icon: Trophy,
    },
    {
      title: "Publications",
      description:
        "Peer-reviewed journal articles, high-impact conference papers, and citation metrics demonstrating scholarly impact.\nEvidence: PDFs, indexing (Scopus/WoS), h-index",
      icon: BookOpen,
    },
    {
      title: "Judging the Work of Others",
      description:
        "Peer-review invitations, editorial board roles, thesis examinations, or jury service at conferences/competitions.\nEvidence: reviewer dashboards, letters, editorial listings",
      icon: Users,
    },
    {
      title: "Original Contributions",
      description:
        "Patents, methods, datasets, or breakthroughs of major significance adopted by labs, industry, or policy.\nEvidence: patents, tech transfer, independent use",
      icon: Microscope,
    },
    {
      title: "Presentations & Conferences",
      description:
        "Keynotes, invited talks, symposium leadership, or organizer roles at recognized international venues.\nEvidence: programs, invites, recordings",
      icon: Speaker,
    },
    {
      title: "Authorship of Books/Chapters",
      description:
        "Monographs, edited volumes, or widely cited chapters from reputable academic publishers.\nEvidence: ISBN pages, publisher contracts",
      icon: Book,
    },
    {
      title: "Prestigious Memberships",
      description:
        "Selective memberships/grades requiring achievement (e.g., senior/fellow status), not open to the general public.\nEvidence: bylaws, eligibility rules, membership letters",
      icon: Building2,
    },
    {
      title: "Critical Roles",
      description:
        "Senior academic, PI, lab head, or leadership on major funded projects demonstrating significant responsibility.\nEvidence: appointment letters, grant summaries",
      icon: Briefcase,
    },
    {
      title: "International Recognition",
      description:
        "Global influence shown via standards, policy inputs, media coverage, rankings, or international collaborations.\nEvidence: media links, policy citations",
      icon: Globe2,
    },
  ];
  

export default function VisaConsultancyPage() {
    return (
        <div>
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Professional at a desk"
                    data-ai-hint="professional business"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Visa Consultancy</h1>
                </div>
            </section>

             <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center max-w-7xl mx-auto">
                        <Image
                            alt="Visa Application"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            height="310"
                            src="https://greencard.writewing.in/wp-content/uploads/2025/01/eb1-free-evaluation4.jpg"
                            data-ai-hint="visa documents"
                            width="550"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Visa Support for Global Talent Programs</h2>
                                <p className="max-w-[600px] text-muted-foreground text-justify">
                                At <b>Researcher Connect</b> , we guide researchers, academics, and innovators to secure extraordinary ability and global talent visas in countries such as the USA (EB-1A), UK (Global Talent), Australia (Global Talent Independent), Canada, France, UAE, and Singapore. We curate and present your evidence—publications, citations, awards, peer-review service, patents, international impact, and leadership—so it maps cleanly to each country’s criteria. From research-focused statements of impact to referee letters, we structure every document for clarity, credibility, and relevance. Our team combines academic insight with precise documentation strategy to position you as a leader in your field and strengthen your case for long-term residency or work pathways. (Information provided is general support content and not legal advice; country criteria evolve—always review official guidance alongside our documentation playbooks.)                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Achieve Your American Dream</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            The EB-1 visa is for individuals with extraordinary ability, outstanding professors and researchers, and certain multinational executives. We provide expert consultancy to help you navigate the complex application process.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {criteria.map(item => (
                            <Card key={item.title} className="text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                      <item.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button size="lg" asChild>
                            <Link href="/contact-us">Consult with an Expert <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
