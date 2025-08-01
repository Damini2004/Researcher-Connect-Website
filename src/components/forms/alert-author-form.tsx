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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Submission } from "@/services/submissionService";
import { sendEmail } from "@/services/emailService";
import { Send } from "lucide-react";

const formSchema = z.object({
  message: z.string().min(20, "Message must be at least 20 characters long."),
});

interface AlertAuthorFormProps {
  submission: Submission;
  onAlertSent: () => void;
}

export default function AlertAuthorForm({ submission, onAlertSent }: AlertAuthorFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const { email, fullName, title } = submission;
    
    const result = await sendEmail({
      to: email,
      subject: `Update on your submission: ${title}`,
      submissionTitle: title,
      authorName: fullName,
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message for {submission.fullName}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your message regarding the submission..."
                  className="min-h-[150px]"
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
