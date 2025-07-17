
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
import { addInternship } from "@/services/internshipService";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(5, "Internship name must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  image: z
    .any()
    .refine((files) => files?.length > 0, "An image is required.")
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Only image files are allowed."
    ),
});

interface AddInternshipFormProps {
    onInternshipAdded: () => void;
}

export default function AddInternshipForm({ onInternshipAdded }: AddInternshipFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const fileRef = form.register("image");

  const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
      });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    let imageSrc = "";
    if (values.image && values.image.length > 0) {
        try {
            imageSrc = await convertFileToBase64(values.image[0]);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to read image file.",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }
    } else {
       toast({
        title: "Error",
        description: "Cover image is required.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const result = await addInternship({
        name: values.name,
        description: values.description,
        imageSrc: imageSrc,
    });

    if (result.success) {
      toast({
        title: "Internship Added Successfully!",
        description: `The internship "${values.name}" has been added.`,
      });
      form.reset();
      onInternshipAdded();
      router.refresh(); // This will refresh server components and tables
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Internship Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Editorial Assistant Intern" {...field} />
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
                  placeholder="A brief description of the internship role and responsibilities."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Display Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Internship"}
        </Button>
      </form>
    </Form>
  );
}
