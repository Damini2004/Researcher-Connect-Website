// src/components/forms/alert-author-form.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Submission } from "@/services/submissionService";
import { sendEmail } from "@/services/emailService";
import { Send } from "lucide-react";

const formSchema = z.object({
  subject: z.string().min(10, "Subject must be at least 10 characters long."),
  message: z.string().min(20, "Message must be at least 20 characters long."),
});

interface AlertAuthorFormProps {
  submission: Submission;
  onAlertSent: () => void;
}

const defaultMessageTemplate = `I hope this message finds you in good health and high spirits.

We are reaching out to faculty members, research supervisors, and postgraduate coordinators from leading institutions to offer a collaborative opportunity for publishing research articles in Scopus-indexed journals — without the complexities of identifying suitable journals or managing the publishing process alone.

At Researcher Connect, we provide complete assistance for:

- Publishing student research, PhD-level articles, and postgraduate project outcomes
- Collaborative authorship on pre-reviewed articles to enable faster publication in indexed journals
- Guided support for PhD and Postdoctoral research, including topic design, data analysis, manuscript drafting, and submission

Our Key Offerings:
✅ Scopus-Indexed Publication Support – across disciplines including AI, Engineering, Law, Management, Medicine, and Multidisciplinary domains
✅ Faster-track options – through structured contribution to pre-reviewed article pools curated by our editorial collaborators
✅ Consultancy for PhD/PostDoc Projects – covering every stage from research proposal to journal publication
✅ Institutional Collaboration Models – available for departments expecting multiple submissions from students and scholars

Our process ensures:
- Ethical compliance with international publishing standards
- Personalized guidance and editorial support
- Zero compromise on academic rigor and institutional recognition
- Transparent, outcome-driven approach

If your department or institution is looking to increase research output or support young researchers with timely publications, we would be glad to partner with you in this endeavor.

Looking forward to your response.`;


export default function AlertAuthorForm({ submission, onAlertSent }: AlertAuthorFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: `Update on your submission: ${submission.title}`,
      message: `Dear Professor ${submission.fullName},\n\n${defaultMessageTemplate}`,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const { email, fullName, title } = submission;
    
    const result = await sendEmail({
      to: email,
      subject: values.subject,
      customMessage: values.message,
    });
    
    if (result.success) {
      toast({
        title: "Alert Sent Successfully!",
        description: `An email has been sent to ${email}.`,
      });
      form.reset();
      onAlertSent(); // This will close the dialog
    } else {
      toast({
        title: "Failed to Send Alert",
        description: result.message,
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter the email subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message for {submission.fullName}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your message regarding the submission..."
                  className="min-h-[250px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
            <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
