
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
import { useToast } from "@/hooks/use-toast";
import { updateSubmission, type Submission } from "@/services/submissionService";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  status: z.enum(["Verification Pending", "Re-Verification Pending", "In Progress", "Done", "Canceled"], {
    required_error: "Please select a status for the submission.",
  }),
});

interface EditSubmissionFormProps {
    submission: Submission;
    onSubmissionUpdated: (updatedSubmission: Submission) => void;
    onClose: () => void;
}

export default function EditSubmissionForm({ submission, onSubmissionUpdated, onClose }: EditSubmissionFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: submission.title,
      status: submission.status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const result = await updateSubmission(submission, values);

    if (result.success && result.updatedSubmission) {
      toast({
        title: "Submission Updated!",
        description: `The submission "${values.title}" has been updated.`,
      });
      onSubmissionUpdated(result.updatedSubmission);
      onClose();
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Verification Pending">Verification Pending</SelectItem>
                  <SelectItem value="Re-Verification Pending">Re-Verification Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
