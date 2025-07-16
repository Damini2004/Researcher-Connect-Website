import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const publications = [
  { id: 1, title: "The Future of AI in Academic Research", authors: "Dr. Eva Rostova, Dr. Kenji Tanaka", journal: "Journal of Innovative Technology", year: 2023, imageSrc: "https://placehold.co/400x300.png", imageHint: "abstract shapes" },
  { id: 2, title: "Quantum Computing's Impact on Cryptography", authors: "Dr. Samuel Greene", journal: "Annals of Computer Science", year: 2023, imageSrc: "https://placehold.co/400x300.png", imageHint: "quantum computer" },
  { id: 3, title: "A Meta-Analysis of Climate Change Models", authors: "Dr. Chloe Bennette, Dr. Omar Al-Jamil", journal: "Global Environmental Studies", year: 2022, imageSrc: "https://placehold.co/400x300.png", imageHint: "earth climate" },
  { id: 4, title: "Advances in Gene-Editing with CRISPR-Cas9", authors: "Dr. Maria Rodriguez", journal: "Genetics & Molecular Biology Review", year: 2022, imageSrc: "https://placehold.co/400x300.png", imageHint: "dna helix" },
  { id: 5, title: "Nanotechnology in Modern Medicine", authors: "Dr. Kenji Tanaka", journal: "Journal of Nanomedicine", year: 2023, imageSrc: "https://placehold.co/400x300.png", imageHint: "nanotechnology medical" },
  { id: 6, title: "The Philosophy of Consciousness", authors: "Dr. Alistair Finch", journal: "Mind & Philosophy", year: 2021, imageSrc: "https://placehold.co/400x300.png", imageHint: "brain neurons" },
]

export default function PublicationsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Publications</h1>
        <p className="mt-4 text-lg text-muted-foreground">Browse through the latest research published with JournalEdge.</p>
        <div className="relative mt-6 max-w-lg mx-auto">
          <Input placeholder="Search publications..." className="pl-10 h-12" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publications.map(pub => (
          <Card key={pub.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
            <Image 
                src={pub.imageSrc}
                alt={`Cover for ${pub.title}`}
                width={400}
                height={300}
                data-ai-hint={pub.imageHint}
                className="w-full object-cover"
            />
            <div className="flex flex-col flex-grow">
                <CardHeader>
                    <CardTitle className="text-xl leading-snug">{pub.title}</CardTitle>
                    <CardDescription className="pt-1">{pub.authors}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <p className="text-sm text-muted-foreground">{pub.journal}, {pub.year}</p>
                    <Link href="#" className="text-sm text-primary hover:underline">
                        Read more...
                    </Link>
                </CardContent>
                <CardFooter>
                     <Button asChild variant="secondary" className="w-full">
                        <Link href="#">
                            View Journal <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
