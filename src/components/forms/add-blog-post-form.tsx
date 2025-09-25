// src/components/forms/add-blog-post-form.tsx
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
import { addBlogPost } from "@/services/blogService";
import { blogPostSchema, type AddBlogPostData } from '@/lib/types';
import dynamic from 'next/dynamic';
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { getCategories, type BlogCategory } from "@/services/categoryService";
import { KeywordInput } from "../ui/keyword-input";
import { getKeywords } from "@/services/keywordService";

const RichTextEditorDynamic = dynamic(() => import('../ui/rich-text-editor'), { ssr: false });

interface AddBlogPostFormProps {
    onPostAdded: () => void;
}

export default function AddBlogPostForm({ onPostAdded }: AddBlogPostFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [categories, setCategories] = React.useState<BlogCategory[]>([]);
  const [keywordSuggestions, setKeywordSuggestions] = React.useState<string[]>([]);
  const [categoryInputValue, setCategoryInputValue] = React.useState("");
  const [keywordInputValue, setKeywordInputValue] = React.useState("");

  React.useEffect(() => {
    const fetchInitialData = async () => {
        try {
            const [categoriesData, keywordsData] = await Promise.all([
                getCategories(),
                getKeywords()
            ]);
            setCategories(categoriesData);
            setKeywordSuggestions(keywordsData);
        } catch (error) {
            toast({ title: "Error", description: "Could not fetch initial form data." });
        }
    };
    fetchInitialData();
  }, [toast]);

  const form = useForm<AddBlogPostData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      category: [],
      author: "",
      content: "",
      excerpt: "",
      isFeatured: false,
      keywords: [],
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
   
    let imageSrc = "";
    if (values.image && values.image.length > 0) {
        if(values.image[0].size > 1024 * 1024) { // 1MB limit
             toast({ title: "Error", description: "Image size cannot exceed 1 MB.", variant: "destructive" });
             setIsSubmitting(false);
             return;
        }
        try {
            imageSrc = await convertFileToBase64(values.image[0]);
        } catch (error) {
            toast({ title: "Error", description: "Failed to read image file.", variant: "destructive" });
            setIsSubmitting(false);
            return;
        }
    } else {
        toast({ title: "Error", description: "Featured Image is required.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }

    const payload = {
        ...values,
        imageSrc: imageSrc,
        imageHint: "blog post",
    };

    const result = await addBlogPost(payload);
    if (result.success) {
      form.reset();
      setCategoryInputValue("");
      setKeywordInputValue("");
      onPostAdded();
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
        <div className="flex-grow min-h-0 overflow-hidden">
            <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                    <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Post Title</FormLabel> <FormControl><Input placeholder="e.g., The Future of AI in Academic Publishing" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                        <KeywordInput
                                            placeholder="Add categories..."
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            suggestions={categories.map(c => c.name)}
                                            inputValue={categoryInputValue}
                                            onInputChange={setCategoryInputValue}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="author" render={({ field }) => ( <FormItem> <FormLabel>Author</FormLabel> <FormControl><Input placeholder="e.g., Dr. Jane Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                    </div>
                    <FormField control={form.control} name="excerpt" render={({ field }) => ( <FormItem> <FormLabel>Excerpt</FormLabel> <FormControl><Textarea placeholder="A short summary of the post..." {...field} /></FormControl> <FormDescription>This will be shown on the blog listing page. Max 200 characters.</FormDescription> <FormMessage /> </FormItem> )} />
                     <FormField
                        control={form.control}
                        name="keywords"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Keywords</FormLabel>
                                <FormControl>
                                    <KeywordInput
                                        placeholder="Add keywords and press Enter"
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        suggestions={keywordSuggestions}
                                        inputValue={keywordInputValue}
                                        onInputChange={setKeywordInputValue}
                                    />
                                </FormControl>
                                <FormDescription>
                                    These keywords help with search engine optimization.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField control={form.control} name="content" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Content</FormLabel>
                            <RichTextEditorDynamic
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Write the full blog post here..."
                            />
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="image" render={() => ( <FormItem> <FormLabel>Featured Image</FormLabel> <FormControl><Input type="file" accept="image/*" {...imageFileRef} /></FormControl> <FormDescription>Max file size: 1 MB</FormDescription> <FormMessage /> </FormItem> )} />
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
                {isSubmitting ? "Saving Post..." : "Add Blog Post"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
