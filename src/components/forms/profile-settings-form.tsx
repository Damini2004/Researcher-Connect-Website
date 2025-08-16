
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
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import * as React from "react";
import { getSubAdminByEmail, SubAdmin } from "@/services/subAdminService";
import { Skeleton } from "../ui/skeleton";
import { createEnquiry } from "@/services/enquiryService";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
});


export default function ProfileSettingsForm() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = React.useState<SubAdmin | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });
  
  React.useEffect(() => {
    async function fetchCurrentUser() {
      setIsLoading(true);
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('currentUserEmail');
        if (email) {
          const result = await getSubAdminByEmail(email);
          if (result.success && result.subAdmin) {
            setCurrentUser(result.subAdmin);
            form.reset({
              fullName: result.subAdmin.name,
              email: result.subAdmin.email,
            });
          } else {
             toast({ title: "Error", description: "Could not fetch user data.", variant: "destructive" });
          }
        } else {
            toast({ title: "Not logged in", description: "Could not find user credentials.", variant: "destructive" });
        }
        setIsLoading(false);
      }
    }
    fetchCurrentUser();
  }, [form, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!currentUser) {
        toast({ title: "Error", description: "No user data found to submit request.", variant: "destructive" });
        return;
    }
    setIsSubmitting(true);
    
    const result = await createEnquiry({
        subAdminId: currentUser.id,
        subAdminName: currentUser.name,
        currentEmail: currentUser.email,
        requestedName: values.fullName,
        requestedEmail: values.email,
    });
    
    if (result.success) {
        toast({
            title: "Request Sent!",
            description: "Your profile update request has been sent to the super admin for approval.",
        });
    } else {
        toast({
            title: "Error Sending Request",
            description: result.message,
            variant: "destructive"
        });
    }

    setIsSubmitting(false);
  }

  if (isLoading) {
    return (
        <div className="space-y-8 max-w-2xl">
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-48" />
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
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
                <Input placeholder="Your email address" {...field} />
              </FormControl>
              <FormDescription>
                Changing your email will require re-verification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Update Request"}
        </Button>
      </form>
    </Form>
  );
}
