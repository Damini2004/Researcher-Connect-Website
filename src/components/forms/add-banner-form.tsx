
// src/components/forms/add-banner-form.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addBanner } from "@/services/bannerService";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  titleLine1: z.string().min(1, "First title line is required."),
  titleLine2: z.string().min(1, "Second title line is required."),
  subtitle: z.string().min(1, "Subtitle is required."),
  button1Text: z.string().min(1, "Button 1 text is required."),
  button1Link: z.string().url("Please enter a valid URL for Button 1."),
  button2Text: z.string().min(1, "Button 2 text is required."),
  button2Link: z.string().url("Please enter a valid URL for Button 2."),
  order: z.coerce.number().min(0, "Order must be a positive number."),
  image: z
    .any()
    .refine((files) => files?.length > 0, "An image is required.")
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Only image files are allowed."
    )
    .refine(
        (files) => files?.[0]?.size <= 2 * 1024 * 1024,
        "Image size must be less than 2MB."
    ),
});

type BannerFormData = z.infer<typeof formSchema>;

interface AddBannerFormProps {
    onBannerAdded: () => void;
}

export default function AddBannerForm({ onBannerAdded }: AddBannerFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<BannerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleLine1: "Researcher",
      titleLine2: "Connect",
      subtitle: "We look forward to help you in taking your company to new height.",
      button1Text: "Contact Us",
      button1Link: "/contact-us",
      button2Text: "Learn More",
      button2Link: "/about",
      order: 0,
    },
  });

  const imageFileRef = form.register("image");

  const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
      });
  };

  async function onSubmit(values: BannerFormData) {
    setIsSubmitting(true);
    
    let imageSrc = "";
    if (values.image && values.image.length > 0) {
        try {
            imageSrc = await convertFileToBase64(values.image[0]);
        } catch (error) {
             toast({ title: "Error", description: "Failed to read image file.", variant: "destructive" });
             setIsSubmitting(false);
             return;
        }
    }

    const payload = { ...values, imageSrc: imageSrc };
    const result = await addBanner(payload);

    if (result.success) {
      form.reset();
      onBannerAdded();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="titleLine1" render={({ field }) => ( <FormItem> <FormLabel>Title Line 1</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="titleLine2" render={({ field }) => ( <FormItem> <FormLabel>Title Line 2</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="subtitle" render={({ field }) => ( <FormItem> <FormLabel>Subtitle</FormLabel> <FormControl><Textarea {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <div className="grid grid-cols-2 gap-6">
          <FormField control={form.control} name="button1Text" render={({ field }) => ( <FormItem> <FormLabel>Button 1 Text</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
          <FormField control={form.control} name="button1Link" render={({ field }) => ( <FormItem> <FormLabel>Button 1 Link</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <div className="grid grid-cols-2 gap-6">
            <FormField control={form.control} name="button2Text" render={({ field }) => ( <FormItem> <FormLabel>Button 2 Text</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="button2Link" render={({ field }) => ( <FormItem> <FormLabel>Button 2 Link</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
            <FormField control={form.control} name="order" render={({ field }) => ( <FormItem> <FormLabel>Display Order</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormDescription>Lower numbers appear first.</FormDescription> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="image" render={() => ( <FormItem> <FormLabel>Background Image</FormLabel> <FormControl><Input type="file" accept="image/*" {...imageFileRef} /></FormControl> <FormDescription>Recommended size: 1600x500px. Max 2MB.</FormDescription> <FormMessage /> </FormItem> )} />
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Adding Banner..." : "Add Banner"}
        </Button>
      </form>
    </Form>
  );
}
