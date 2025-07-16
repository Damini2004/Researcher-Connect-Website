import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const allSubmissions = [
  { id: 'S001', title: "The Future of AI in Academic Research", author: "Dr. Eva Rostova", status: "Done", subAdmin: "Dr. Alisha Gupta", date: "2023-10-26", imageSrc: "https://placehold.co/400x300.png", imageHint: "abstract shapes" },
  { id: 'S002', title: "Quantum Computing's Impact on Cryptography", author: "Dr. Samuel Greene", status: "In Progress", subAdmin: "Dr. Alisha Gupta", date: "2023-11-05", imageSrc: "https://placehold.co/400x300.png", imageHint: "quantum computer" },
  { id: 'S003', title: "A Meta-Analysis of Climate Change Models", author: "Dr. Chloe Bennette", status: "Done", subAdmin: "Dr. Chloe Davis", date: "2023-11-15", imageSrc: "https://placehold.co/400x300.png", imageHint: "earth climate" },
  { id: 'S004', title: "Advances in Gene-Editing with CRISPR-Cas9", author: "Dr. Maria Rodriguez", status: "Canceled", subAdmin: "Dr. Chloe Davis", date: "2023-11-20", imageSrc: "https://placehold.co/400x300.png", imageHint: "dna helix" },
  { id: 'S005', title: "New Economic Theories for a Digital World", author: "Dr. John Smith", status: "Verification Pending", subAdmin: "Unassigned", date: "2023-12-01", imageSrc: "https://placehold.co/400x300.png", imageHint: "digital world" },
  { id: 'S006', title: "The Philosophy of Consciousness", author: "Dr. Alistair Finch", status: "Done", subAdmin: "Dr. Alisha Gupta", date: "2023-09-10", imageSrc: "https://placehold.co/400x300.png", imageHint: "brain neurons" },
];

const statusColors: { [key: string]: string } = {
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Verification Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default function ViewJournalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Journal Submissions</h1>
        <p className="text-muted-foreground">A complete list of all journal submissions in the system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allSubmissions.map(submission => (
          <Card key={submission.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
            <Image 
                src={submission.imageSrc}
                alt={`Cover for ${submission.title}`}
                width={400}
                height={300}
                data-ai-hint={submission.imageHint}
                className="w-full object-cover"
            />
            <div className="flex flex-col flex-grow">
                <CardHeader>
                    <CardTitle className="text-xl leading-snug">{submission.title}</CardTitle>
                    <CardDescription className="pt-1">{submission.author}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <p className="text-sm text-muted-foreground">Submitted on: {submission.date}</p>
                    <p className="text-sm text-muted-foreground">Assigned to: {submission.subAdmin}</p>
                    <p className="text-sm text-muted-foreground">ID: <span className="font-mono">{submission.id}</span></p>
                </CardContent>
                <CardFooter>
                  <Badge className={`${statusColors[submission.status]} w-full justify-center`}>{submission.status}</Badge>
                </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
