
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
import { getJournals, type Journal } from "@/services/journalService";
import { addSubmission } from "@/services/submissionService";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  title: z.string().min(5, "Title must be at least 5 characters."),
  journalId: z.string({ required_error: "Please select a journal to submit to." }),
  manuscriptFile: z
    .any()
    .refine((files) => files?.length > 0, "A manuscript file is required.")
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Only PDF files are allowed."
    ),
  content: z.string().min(100, "Content must be at least 100 characters."),
});

export default function JournalSubmissionForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [journals, setJournals] = React.useState<Journal[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    async function fetchJournals() {
      try {
        const fetchedJournals = await getJournals();
        setJournals(fetchedJournals.filter(j => j.status === 'Active'));
      } catch (error) {
        console.error("Failed to fetch journals:", error);
        toast({
          title: "Error",
          description: "Could not load journals. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchJournals();
  }, [toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      title: "",
      content: "",
    },
  });
  
  const fileRef = form.register("manuscriptFile");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    formData.append('title', values.title);
    formData.append('journalId', values.journalId);
    formData.append('content', values.content);
    
    if (values.manuscriptFile && values.manuscriptFile.length > 0) {
        formData.append('manuscriptFile', values.manuscriptFile[0]);
    } else {
        toast({
            title: "Submission Failed",
            description: "Manuscript file is missing.",
            variant: "destructive",
        });
        setIsSubmitting(false);
        return;
    }

    const result = await addSubmission(formData);

    if (result.success) {
        toast({
            title: "Submission Successful!",
            description: "Your journal has been submitted for review.",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manuscript Title</FormLabel>
              <FormControl>
                <Input placeholder="A Study on..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="journalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoading ? "Loading journals..." : "Select a journal"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {journals.map((journal) => (
                        <SelectItem key={journal.id} value={journal.id}>{journal.journalName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manuscriptFile"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Manuscript File (PDF)</FormLabel>
                    <FormControl>
                        <Input 
                            type="file" 
                            accept=".pdf"
                            {...fileRef}
                        />
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
              <FormLabel>Abstract / Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste the abstract or a summary of your work here..."
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
