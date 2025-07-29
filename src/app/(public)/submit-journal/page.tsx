import JournalSubmissionForm from "@/components/forms/journal-submission-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { FileUp, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const submissionBenefits = [
    {
        icon: FileUp,
        title: "Streamlined Process",
        description: "Our submission form is simple, intuitive, and designed to get your research into our system quickly."
    },
    {
        icon: Sparkles,
        title: "AI-Powered Insights",
        description: "Get intelligent keyword and tag suggestions to improve the discoverability of your work."
    },
    {
        icon: CheckCircle,
        title: "Rigorous Peer-Review",
        description: "Your submission will be evaluated by experts in your field to ensure the highest academic standards."
    }
]

export default function SubmitJournalPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] bg-primary/10 flex items-center justify-center text-center px-4">
          <Image
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&h=400&auto=format&fit=crop"
              alt="Researcher writing"
              data-ai-hint="research writing"
              fill
              className="object-cover opacity-10"
          />
          <div className="relative z-10">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  Submit Your Manuscript
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join a global community of researchers. Share your work, get valuable feedback, and make an impact on your field.
              </p>
              <Button size="lg" className="mt-8" asChild>
                  <a href="#submission-form">
                      Start Your Submission <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
              </Button>
          </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tighter">Why Submit with Pure Research Insights?</h2>
                  <p className="max-w-[700px] mx-auto text-muted-foreground mt-2">
                      We provide the tools and support you need to publish successfully.
                  </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {submissionBenefits.map((benefit, index) => (
                      <Card key={index} className="text-center bg-background transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                          <CardHeader className="items-center">
                              <div className="p-4 bg-primary/10 rounded-full w-fit">
                                  <benefit.icon className="h-8 w-8 text-primary" />
                              </div>
                              <CardTitle className="mt-4">{benefit.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-muted-foreground">{benefit.description}</p>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>

      {/* Form Section */}
      <section id="submission-form" className="w-full py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
              <Card className="max-w-4xl mx-auto shadow-xl border-primary/10">
                  <CardHeader className="text-center p-8 md:p-10">
                      <CardTitle className="text-3xl">Submission Details</CardTitle>
                      <CardDescription>
                          Fill out the form below to submit your manuscript for review.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 md:p-10 pt-0">
                      <JournalSubmissionForm />
                  </CardContent>
              </Card>
          </div>
      </section>
    </div>
  );
}
