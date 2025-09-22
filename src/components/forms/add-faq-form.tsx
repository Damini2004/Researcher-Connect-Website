// src/components/forms/add-faq-form.tsx
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
import { addFaq, faqSchema, type FaqData } from "@/services/faqService";

interface AddFaqFormProps {
    onFaqAdded: () => void;
}

export default function AddFaqForm({ onFaqAdded }: AddFaqFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FaqData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  async function onSubmit(values: FaqData) {
    setIsSubmitting(true);
   
    const result = await addFaq(values);
    if (result.success) {
      form.reset();
      onFaqAdded();
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
        <FormField control={form.control} name="question" render={({ field }) => ( <FormItem> <FormLabel>Question</FormLabel> <FormControl><Input placeholder="e.g., How do I submit an abstract?" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="answer" render={({ field }) => ( <FormItem> <FormLabel>Answer</FormLabel> <FormControl><Textarea placeholder="Provide a clear and concise answer..." className="min-h-[120px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add FAQ"}
            </Button>
        </div>
      </form>
    </Form>
  );
}