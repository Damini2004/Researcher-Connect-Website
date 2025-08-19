// src/components/forms/edit-blog-post-form.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateBlogPost } from "@/services/blogService";
import { blogPostSchema, type BlogPost, type AddBlogPostData } from '@/lib/types';
import dynamic from 'next/dynamic';
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

const RichTextEditorDynamic = dynamic(() => import('../ui/rich-text-editor'), { ssr: false });

interface EditBlogPostFormProps {
    post: BlogPost;
    onPostUpdated: () => void;
}

export default function EditBlogPostForm({ post, onPostUpdated }: EditBlogPostFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // We make `image` optional for the edit form validation schema
  const editSchema = blogPostSchema.extend({
      image: blogPostSchema.shape.image.optional(),
  });

  const form = useForm<AddBlogPostData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: post.title || "",
      category: post.category || "",
      author: post.author || "",
      content: post.content || "",
      excerpt: post.excerpt || "",
      isFeatured: post.isFeatured || false,
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

  async function onSubmit(values: AddBlogPostData) {
    setIsSubmitting(true);
    
    const payload: Partial<AddBlogPostData> & { imageSrc?: string; imageHint?: string } = { ...values };

    if (values.image && values.image.length > 0) {
        if(values.image[0].size > 1024 * 1024) { // 1MB
             toast({ title: "Error", description: "Image size cannot exceed 1 MB.", variant: "destructive" });
             setIsSubmitting(false);
             return;
        }
        try {
            payload.imageSrc = await convertFileToBase64(values.image[0]);
            payload.imageHint = "blog post";
        } catch (error) {
            toast({ title: "Error", description: "Failed to read image file.", variant: "destructive" });
            setIsSubmitting(false);
            return;
        }
    }
    
    delete payload.image;

    const result = await updateBlogPost(post.id, payload);

    if (result.success) {
      onPostUpdated();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
                <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Post Title</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="category" render={({ field }) => ( <FormItem> <FormLabel>Category</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="author" render={({ field }) => ( <FormItem> <FormLabel>Author</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                </div>
                <FormField control={form.control} name="excerpt" render={({ field }) => ( <FormItem> <FormLabel>Excerpt</FormLabel> <FormControl><Textarea {...field} /></FormControl> <FormDescription>Max 200 characters.</FormDescription> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="content" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Content</FormLabel>
                        <RichTextEditorDynamic
                            value={field.value || ''}
                            onChange={field.onChange}
                        />
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="image" render={() => ( <FormItem> <FormLabel>New Featured Image (Optional)</FormLabel> <FormControl><Input type="file" accept="image/*" {...imageFileRef} /></FormControl> <FormDescription>Max file size: 1 MB. Leave blank to keep the current one.</FormDescription> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="isFeatured" render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Mark as Featured Post</FormLabel>
                            <FormDescription>A featured post may be displayed more prominently.</FormDescription>
                        </div>
                    </FormItem>
                )} />
            </div>
            </ScrollArea>
        </div>

        <div className="flex-shrink-0 flex justify-end pt-4 border-t p-6">
            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
