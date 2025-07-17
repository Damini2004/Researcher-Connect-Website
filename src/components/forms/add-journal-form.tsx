
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
import { addJournal } from "@/services/journalService";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  journalName: z.string().min(5, "Journal name must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "A cover image is required.")
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Only image files are allowed."
    ),
  status: z.enum(["Active", "Inactive", "Archived"], {
    required_error: "Please select a status for the journal.",
  }),
});

export default function AddJournalForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      journalName: "",
      description: "",
      status: "Active",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('journalName', values.journalName);
    formData.append('description', values.description);
    formData.append('status', values.status);
    
    // Correctly get the File object from the FileList
    if (values.image && values.image.length > 0) {
      formData.append('image', values.image[0]);
    }

    const result = await addJournal(formData);

    if (result.success) {
      toast({
        title: "Journal Added Successfully!",
        description: `The journal "${values.journalName}" has been added.`,
      });
      form.reset();
      // A simple way to refresh the journal list page
      router.refresh();
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
          name="journalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Journal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Journal of Advanced AI Research" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of the journal's scope and aims."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" {...form.register("image")} />
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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Journal"}
        </Button>
      </form>
    </Form>
  );
}
