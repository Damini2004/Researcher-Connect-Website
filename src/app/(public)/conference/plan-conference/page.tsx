
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const planningSteps = [
    "Initial Consultation: Reach out to us with your conference idea, including the theme, expected audience, and potential dates.",
    "Proposal & Budgeting: We'll work with you to develop a detailed proposal and a comprehensive budget.",
    "Venue & Logistics: Our team will handle venue selection, and all logistical arrangements.",
    "Marketing & Promotion: We'll launch a targeted marketing campaign to attract speakers and attendees.",
    "Execution & Management: On-site management to ensure everything runs smoothly from start to finish.",
    "Post-Conference Support: Assistance with publishing proceedings and gathering feedback."
];

export default function PlanConferencePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Plan a Scientific Conference</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">Collaborate with us to organize your next scientific event. We provide end-to-end support to ensure your conference is a resounding success.</p>
      </div>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Our Partnership Process</CardTitle>
          <CardDescription>
            We follow a structured process to bring your vision to life.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {planningSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
           <div className="mt-8 text-center">
                <Button asChild size="lg">
                    <Link href="/contact-us">
                        Start Planning Today
                    </Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
