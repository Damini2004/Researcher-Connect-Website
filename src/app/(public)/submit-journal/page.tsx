import JournalSubmissionForm from "@/components/forms/journal-submission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitJournalPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Submit Your Journal</CardTitle>
            <CardDescription>
              Fill out the form below to submit your manuscript for review. Our AI will help suggest relevant tags.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JournalSubmissionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
