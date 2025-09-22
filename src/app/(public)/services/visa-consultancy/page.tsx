
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ChevronRight, Award, BookOpen, UserCheck, ArrowRight,Trophy,
    Users,
    Book,
    Building2,
    Briefcase,
    Globe2,Microscope,Speaker, Check, AlertTriangle, } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  
const comparisonData = [
    { criteria: "Awards", usa: "Major/field awards", uk: "Prestigious prizes", australia: "International recognition", canada: "Significant recognition", france: "National/Int’l awards", uae: "Exceptional talent awards", singapore: "Global track record" },
    { criteria: "Publications", usa: "High-impact outputs", uk: "Peer-reviewed research", australia: "Recognized outputs", canada: "Notable publications", france: "Recognized research", uae: "Recognized work", singapore: "Academic publications" },
    { criteria: "Judging (Review/Editorial)", usa: "Reviewer / Editor", uk: "Endorsed review work", australia: "Review roles", canada: "Limited weight", france: "Review activity", uae: "Indirect", singapore: "Indirect" },
    { criteria: "Original Contributions", usa: "Major significance", uk: "Innovation impact", australia: "Global contributions", canada: "Contribution to field", france: "Original research", uae: "Innovation", singapore: "Innovation" },
    { criteria: "Presentations / Keynotes", usa: "Intl. conferences", uk: "Invited/keynote talks", australia: "Speaking roles", canada: "Limited", france: "Recognized venues", uae: "Recognition events", singapore: "Conferences" },
    { criteria: "Authorship (Books/Chapters)", usa: "Books/chapters", uk: "Monographs", australia: "Published work", canada: "Limited", france: "Books", uae: "Limited", singapore: "Publications" },
    { criteria: "Prestigious Memberships", usa: "Selective bodies", uk: "Endorsements", australia: "Recognized body", canada: "Limited", france: "Prestigious bodies", uae: "Recognized orgs", singapore: "Top networks" },
    { criteria: "Critical Roles / Leadership", usa: "PI / Lab head", uk: "Leadership proof", australia: "Critical talent", canada: "Key roles", france: "Senior researcher", uae: "Senior expert", singapore: "Senior leader" },
    { criteria: "International Recognition", usa: "Media / global impact", uk: "Endorsement letters", australia: "Global recognition", canada: "Contribution proof", france: "International proof", uae: "Global reputation", singapore: "International track record" },
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

             <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Comparative Criteria by Country (Researcher-Focused)</h2>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="font-bold">Criteria</TableHead>
                                            <TableHead>USA (EB-1A)</TableHead>
                                            <TableHead>UK (Global Talent)</TableHead>
                                            <TableHead>Australia (GTI)</TableHead>
                                            <TableHead>Canada (Self-Employed/PNP)</TableHead>
                                            <TableHead>France (Passeport Talent)</TableHead>
                                            <TableHead>UAE (Golden Visa)</TableHead>
                                            <TableHead>Singapore (ONE Pass)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {comparisonData.map((row) => (
                                            <TableRow key={row.criteria}>
                                                <TableCell className="font-semibold">{row.criteria}</TableCell>
                                                <TableCell>{row.usa}</TableCell>
                                                <TableCell>{row.uk}</TableCell>
                                                <TableCell>{row.australia}</TableCell>
                                                <TableCell>{row.canada}</TableCell>
                                                <TableCell>{row.france}</TableCell>
                                                <TableCell>{row.uae}</TableCell>
                                                <TableCell>{row.singapore}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                    <p className="mt-4 text-sm text-center text-muted-foreground">
                        Note: This table is an at-a-glance guide for researcher-focused evidence. Requirements change; always consult official government pages for current criteria. Researcher Connect offers documentation support—not legal representation.
                    </p>
                </div>
            </section>
        </div>
    );
}
