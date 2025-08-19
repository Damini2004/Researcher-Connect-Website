
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addSubmission } from "@/services/submissionService";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  title: z.string().min(5, "Title must be at least 5 characters."),
  submissionType: z.string({ required_error: "Please select a submission type." }),
  content: z.string().min(100, "Content must be at least 100 characters."),
});

type SubmissionItem = { id: string; name: string };

export default function JournalSubmissionForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      title: "",
      content: "",
      submissionType: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Since manuscript file is removed, we'll pass a placeholder
    const result = await addSubmission({
      fullName: values.fullName,
      email: values.email,
      title: values.title,
      targetId: values.submissionType, // Using submissionType as targetId now
      submissionType: values.submissionType,
      content: values.content,
      manuscriptData: 'N/A', // No file submitted
    });

    if (result.success) {
        toast({
            title: "Query Submitted Successfully!",
            description: "Your message has been received. We will get back to you shortly.",
        });
        form.reset();
        router.refresh();
    } else {
        toast({
            title: "Submission Failed",
            description: result.message,
            variant: "destructive",
        });
    }

    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="submissionType"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Query type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a query type" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                        <Input placeholder="Regarding..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe your query here..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </Button>
      </form>
    </Form>
  );
}
