"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { suggestSubmissionTags } from "@/ai/flows/suggest-submission-tags";
import { useState, useTransition } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(100, "Content must be at least 100 characters."),
  tags: z.array(z.string()).min(1, "Please add at least one tag."),
});

export default function JournalSubmissionForm() {
  const { toast } = useToast();
  const [isSuggesting, startSuggestionTransition] = useTransition();
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleSuggestTags = () => {
    const content = form.getValues("content");
    if (content.length < 50) {
      toast({
        variant: "destructive",
        title: "Content too short",
        description: "Please enter at least 50 characters to get tag suggestions.",
      });
      return;
    }

    startSuggestionTransition(async () => {
      const result = await suggestSubmissionTags({ submissionContent: content });
      setSuggestedTags(result.suggestedTags);
    });
  };
  
  const addTag = (tag: string) => {
    if (!currentTags.includes(tag)) {
        const newTags = [...currentTags, tag];
        setCurrentTags(newTags);
        form.setValue("tags", newTags, { shouldValidate: true });
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = currentTags.filter(tag => tag !== tagToRemove);
    setCurrentTags(newTags);
    form.setValue("tags", newTags, { shouldValidate: true });
  };


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Submission Successful!",
      description: "Your journal has been submitted for review.",
    });
    form.reset();
    setCurrentTags([]);
    setSuggestedTags([]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abstract / Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste the abstract or a summary of your work here..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide enough content for our AI to suggest relevant tags.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium">Keywords / Tags</h3>
                    <p className="text-sm text-muted-foreground">Add tags that describe your work.</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleSuggestTags} disabled={isSuggesting}>
                    {isSuggesting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Suggest Tags
                </Button>
            </div>
            
            <FormField
                control={form.control}
                name="tags"
                render={() => (
                    <FormItem>
                         <FormControl>
                            <div className="flex flex-wrap gap-2 min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2">
                                {currentTags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-sm">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                            <X className="h-3 w-3" />
                                            <span className="sr-only">Remove {tag}</span>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            {suggestedTags.length > 0 && (
                <div>
                    <p className="text-sm font-medium mb-2">Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestedTags.map(tag => (
                            <Button type="button" key={tag} variant="outline" size="sm" onClick={() => addTag(tag)}>
                                {tag}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>


        <Button type="submit" size="lg" className="w-full">
          Submit for Review
        </Button>
      </form>
    </Form>
  );
}
