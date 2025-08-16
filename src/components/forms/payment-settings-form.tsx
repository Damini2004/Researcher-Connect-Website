
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
import { Save } from "lucide-react";
import * as React from "react";
import { updatePaymentUrl } from "@/services/settingsService";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  paymentUrl: z.string().url("Please enter a valid URL (e.g., https://example.com/pay)."),
});

interface PaymentSettingsFormProps {
    currentUrl: string;
}

export default function PaymentSettingsForm({ currentUrl }: PaymentSettingsFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentUrl: currentUrl || "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const result = await updatePaymentUrl(values.paymentUrl);
    
    if (result.success) {
        toast({
            title: "Settings Saved!",
            description: "The payment URL has been updated successfully.",
        });
        router.refresh();
    } else {
        toast({
            title: "Error Saving Settings",
            description: result.message,
            variant: "destructive"
        });
    }

    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="paymentUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment URL</FormLabel>
              <FormControl>
                <Input placeholder="https://your-payment-provider.com/link" {...field} />
              </FormControl>
              <FormDescription>
                This link will be included in the approval email sent to authors.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </Form>
  );
}
