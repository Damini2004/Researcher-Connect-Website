
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How do I submit an abstract for a conference?",
        answer: "You can submit your abstract through the specific conference's page. Look for the 'Submit Paper' or 'Call for Papers' button."
    },
    {
        question: "What are the registration fees?",
        answer: "Registration fees vary depending on the conference and your category (e.g., student, academic, industry). Please check the individual conference page for details."
    },
    {
        question: "Will the conference proceedings be published?",
        answer: "Yes, all accepted and presented papers will be published in the official conference proceedings, which are typically indexed in major scientific databases."
    },
    {
        question: "Can I get a visa invitation letter?",
        answer: "Yes, we provide visa invitation letters to registered authors and attendees who require one. You can request it during the registration process."
    }
]

export default function FaqPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">Find answers to common questions about our conferences.</p>
      </div>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Conference FAQs</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
