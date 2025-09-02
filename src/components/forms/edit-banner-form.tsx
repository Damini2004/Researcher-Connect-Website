
// src/components/forms/edit-banner-form.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldError } from "react-hook-form";
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
import { updateBanner, type Banner, type UpdateBannerData } from "@/services/bannerService";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

// Schema for the form values. The image is optional on edit.
const formSchema = z.object({
  titleLine1: z.string().min(1, "First title line is required."),
  titleLine2: z.string().min(1, "Second title line is required."),
  subtitle: z.string().min(1, "Subtitle is required."),
  button1Text: z.string().min(1, "Button 1 text is required."),
  button1Link: z.string().min(1, "Please enter a link for Button 1."),
  button2Text: z.string().min(1, "Button 2 text is required."),
  button2Link: z.string().min(1, "Please enter a link for Button 2."),
  order: z.coerce.number().min(0, "Order must be a positive number."),
  image: z
    .any()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files?.[0]?.size <= 5 * 1024 * 1024, // 5MB limit
      "Image size cannot exceed 5MB."
    )
    .refine(
      (files) => !files || files.length === 0 || files?.[0]?.type.startsWith("image/"),
      "Only image files are allowed."
    ),
});

type FormValues = z.infer<typeof formSchema>;

const stepFields: (keyof FormValues)[][] = [
    ['titleLine1', 'titleLine2', 'subtitle', 'button1Text', 'button1Link', 'button2Text', 'button2Link'],
    ['order', 'image'],
];

const totalSteps = stepFields.length;

interface EditBannerFormProps {
    banner: Banner;
    onBannerUpdated: () => void;
}

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7)); 
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function EditBannerForm({ banner, onBannerUpdated }: EditBannerFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleLine1: banner.titleLine1,
      titleLine2: banner.titleLine2,
      subtitle: banner.subtitle,
      button1Text: banner.button1Text,
      button1Link: banner.button1Link,
      button2Text: banner.button2Text,
      button2Link: banner.button2Link,
      order: banner.order,
      image: undefined,
    },
  });

  const imageFileRef = form.register("image");

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      const payload: UpdateBannerData = { ...values };

      // If a new image was selected, compress it and add to payload
      if (values.image && values.image.length > 0) {
        payload.imageSrc = await compressImage(values.image[0]);
      }
      
      const result = await updateBanner(banner.id, payload);

      if (result.success) {
        onBannerUpdated();
      } else {
        toast({
          title: "Error Updating Banner",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({ title: "Image Processing Error", description: "Failed to compress the image. Please try another file.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleNext = async () => {
    const fieldsToValidate = stepFields[currentStep - 1] || [];
    const isValid = await form.trigger(fieldsToValidate as (keyof FormValues)[]);
    if (isValid) {
        setCurrentStep(step => step + 1);
    } else {
        const errors = form.formState.errors;
        const firstErrorField = fieldsToValidate.find(field => errors[field]);
        if (firstErrorField) {
            const error = errors[firstErrorField] as FieldError | undefined;
            toast({
                title: "Incomplete Step",
                description: error?.message || `Please fill out all required fields in this step.`,
                variant: "destructive",
            });
        }
    }
  };

  const handleBack = () => {
    setCurrentStep(step => step - 1);
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="flex-shrink-0 px-6 pt-2">
            <div className="space-y-2 mb-4">
                <Progress value={(currentStep / totalSteps) * 100} />
                <p className="text-sm text-muted-foreground text-center">Step {currentStep} of {totalSteps}</p>
            </div>
        </div>
        <div className="flex-grow min-h-0 overflow-hidden">
            <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                    {currentStep === 1 && (
                        <section className="space-y-6">
                            <FormField control={form.control} name="titleLine1" render={({ field }) => ( <FormItem> <FormLabel>Title Line 1</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            <FormField control={form.control} name="titleLine2" render={({ field }) => ( <FormItem> <FormLabel>Title Line 2</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            <FormField control={form.control} name="subtitle" render={({ field }) => ( <FormItem> <FormLabel>Subtitle</FormLabel> <FormControl><Textarea {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            
                            <div className="grid grid-cols-2 gap-6">
                            <FormField control={form.control} name="button1Text" render={({ field }) => ( <FormItem> <FormLabel>Button 1 Text</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            <FormField control={form.control} name="button1Link" render={({ field }) => ( <FormItem> <FormLabel>Button 1 Link</FormLabel> <FormControl><Input placeholder="/example-path" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <FormField control={form.control} name="button2Text" render={({ field }) => ( <FormItem> <FormLabel>Button 2 Text</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="button2Link" render={({ field }) => ( <FormItem> <FormLabel>Button 2 Link</FormLabel> <FormControl><Input placeholder="/example-path" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            </div>
                        </section>
                    )}

                    {currentStep === 2 && (
                         <section className="space-y-6">
                             <div className="grid grid-cols-2 gap-6">
                                <FormField control={form.control} name="order" render={({ field }) => ( <FormItem> <FormLabel>Display Order</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormDescription>Lower numbers appear first.</FormDescription> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="image" render={() => ( <FormItem> <FormLabel>New Background Image (Optional)</FormLabel> <FormControl><Input type="file" accept="image/*" {...imageFileRef} /></FormControl> <FormDescription>Leave blank to keep the current image. Max 5MB.</FormDescription> <FormMessage /> </FormItem> )} />
                            </div>
                         </section>
                    )}
                </div>
            </ScrollArea>
        </div>
        
        <div className="flex-shrink-0 flex justify-between pt-4 border-t p-6">
            <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Saving Banner..." : "Save Changes"}
                </Button>
            )}
        </div>
      </form>
    </Form>
  );
}
