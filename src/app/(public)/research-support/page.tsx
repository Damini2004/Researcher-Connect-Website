import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const supportServices = [
  "Manuscript Editing & Formatting",
  "Statistical Analysis & Consultation",
  "Plagiarism Checking",
  "Graphical Abstract Design",
  "Journal Selection Assistance",
];

export default function ResearchSupportPage() {
  return (
    <div className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Research Support Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">From manuscript preparation to post-publication, we're here to help.</p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Our Support Services</CardTitle>
          <CardDescription>We offer a range of services to help you produce high-quality research and increase your chances of publication.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {supportServices.map((service, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
