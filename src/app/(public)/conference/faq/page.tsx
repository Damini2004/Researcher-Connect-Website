// src/app/(public)/conference/faq/page.tsx
'use client'

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle, Mail, Phone, LifeBuoy } from "lucide-react"
import { getFaqs, type Faq } from '@/services/faqService';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function FaqPage() {
  const [faqs, setFaqs] = React.useState<Faq[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchFaqs = async () => {
      setIsLoading(true);
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch FAQs.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaqs();
  }, [toast]);

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
                    {isLoading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <Card key={index} className="p-6">
                           <Skeleton className="h-6 w-full" />
                        </Card>
                      ))
                    ) : faqs.length > 0 ? (
                      faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6 border shadow-sm hover:shadow-md transition-shadow">
                              <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                              <AccordionContent className="text-muted-foreground text-base">{faq.answer}</AccordionContent>
                          </AccordionItem>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">No FAQs found.</p>
                    )}
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
                                <a href="mailto:contact@researcherconnect.com" className="text-sm text-primary hover:underline">
                                contact@researcherconnect.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <Phone className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Call Us</h4>
                                <a href="tel:+919890917528" className="text-sm text-primary hover:underline">
                                    +91 9890917528 | 9960266198 | 7887755544
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
