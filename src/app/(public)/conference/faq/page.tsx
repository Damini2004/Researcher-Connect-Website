
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle, Mail, Phone, LifeBuoy } from "lucide-react"

const faqs = [
    {
        question: "How do I submit an abstract for a conference?",
        answer: "You can submit your abstract through the specific conference's page. Look for the 'Submit Paper' or 'Call for Papers' button. The process is entirely online."
    },
    {
        question: "What are the registration fees?",
        answer: "Registration fees vary depending on the conference and your category (e.g., student, academic, industry). Please check the individual conference page for detailed fee structures."
    },
    {
        question: "Will the conference proceedings be published?",
        answer: "Yes, all accepted and presented papers will be published in the official conference proceedings, which are typically indexed in major scientific databases like Scopus and Web of Science."
    },
    {
        question: "Can I get a visa invitation letter?",
        answer: "Yes, we provide visa invitation letters to registered authors and attendees who require one. You can request it during the registration process or by contacting the conference organizers."
    },
    {
        question: "What is the format for presentations?",
        answer: "Presentation formats (e.g., oral, poster) and guidelines are provided on each conference's page. Typically, oral presentations are 15 minutes including Q&A, and poster dimensions are specified."
    },
    {
        question: "How can I become a reviewer?",
        answer: "We welcome experts to join our review committees. Please visit the 'Peer Review' section on our website or contact us with your CV and areas of expertise."
    }
]

export default function FaqPage() {
  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Find answers to common questions about our conferences.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6 border shadow-sm hover:shadow-md transition-shadow">
                            <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="space-y-6">
                <Card className="bg-background shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <LifeBuoy className="h-6 w-6 text-primary" />
                            Can't find your answer?
                        </CardTitle>
                        <CardDescription>
                            Our support team is here to help.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                           <Mail className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Email Us</h4>
                                <a href="mailto:support@researcherconnect.com" className="text-sm text-primary hover:underline">
                                    support@researcherconnect.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <Phone className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Call Us</h4>
                                <a href="tel:+919890917528" className="text-sm text-primary hover:underline">
                                    +91 9890917528 | 9960266198
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
