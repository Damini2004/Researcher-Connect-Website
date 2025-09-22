// src/components/forms/edit-faq-form.tsx
"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { updateFaq, faqSchema, type Faq, type FaqData } from "@/services/faqService";

interface EditFaqFormProps {
    faq: Faq;
    onFaqUpdated: () => void;
}

export default function EditFaqForm({ faq, onFaqUpdated }: EditFaqFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FaqData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
    },
  });

  async function onSubmit(values: FaqData) {
    setIsSubmitting(true);
   
    const result = await updateFaq(faq.id, values);
    if (result.success) {
      onFaqUpdated();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField control={form.control} name="question" render={({ field }) => ( <FormItem> <FormLabel>Question</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="answer" render={({ field }) => ( <FormItem> <FormLabel>Answer</FormLabel> <FormControl><Textarea className="min-h-[120px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
        </div>
      </form>
    </Form>
  );
}