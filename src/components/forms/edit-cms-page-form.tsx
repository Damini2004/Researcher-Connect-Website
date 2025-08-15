// src/components/forms/edit-cms-page-form.tsx
"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updatePageContent, type CmsPage } from "@/services/cmsService";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const RichTextEditorDynamic = dynamic(() => import('../ui/rich-text-editor'), { 
    ssr: false,
    loading: () => <Skeleton className="h-[200px] w-full" />
});

const formSchema = z.object({
  content: z.string().min(10, "Page content cannot be empty."),
});

interface EditCmsPageFormProps {
  page: CmsPage;
  onPageUpdated: () => void;
}

export default function EditCmsPageForm({ page, onPageUpdated }: EditCmsPageFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: page.content || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await updatePageContent(page.id, values.content);

    if (result.success) {
      onPageUpdated();
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <RichTextEditorDynamic
                value={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Content"}
        </Button>
      </form>
    </Form>
  );
}
