import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const publications = [
  { id: 1, title: "The Future of AI in Academic Research", authors: "Dr. Eva Rostova, Dr. Kenji Tanaka", journal: "Journal of Innovative Technology", year: 2023 },
  { id: 2, title: "Quantum Computing's Impact on Cryptography", authors: "Dr. Samuel Greene", journal: "Annals of Computer Science", year: 2023 },
  { id: 3, title: "A Meta-Analysis of Climate Change Models", authors: "Dr. Chloe Bennette, Dr. Omar Al-Jamil", journal: "Global Environmental Studies", year: 2022 },
  { id: 4, title: "Advances in Gene-Editing with CRISPR-Cas9", authors: "Dr. Maria Rodriguez", journal: "Genetics & Molecular Biology Review", year: 2022 },
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

      <div className="grid gap-8">
        {publications.map(pub => (
          <Card key={pub.id} className="hover:bg-secondary/50 transition-colors">
            <CardHeader>
              <CardTitle>{pub.title}</CardTitle>
              <CardDescription>{pub.authors}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{pub.journal}, {pub.year}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
