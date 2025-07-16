import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { allSubmissions } from "@/lib/mock-data";

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
