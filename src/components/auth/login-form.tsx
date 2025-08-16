
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { verifySubAdminCredentials } from "@/services/subAdminService";
import * as React from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(1, "Password is required."),
  role: z.enum(["super-admin", "sub-admin"], {
    required_error: "You need to select a role.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (values.role === 'super-admin') {
      // This is a mock login for super-admin. 
      // In a real app, you'd have a separate verification.
      if (values.email === 'superadmin@pureresearchinsights.com' && values.password === 'password') {
          toast({
            title: "Login Successful",
            description: "Redirecting to super-admin dashboard...",
          });
          router.push(`/${values.role}`);
      } else {
           toast({
            title: "Login Failed",
            description: "Invalid credentials for super admin.",
            variant: "destructive",
          });
      }
    } else if (values.role === 'sub-admin') {
      const result = await verifySubAdminCredentials(values.email, values.password);
      if (result.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUserEmail', values.email);
        }
        toast({
          title: "Login Successful",
          description: "Redirecting to sub-admin dashboard...",
        });
        router.push(`/${values.role}`);
      } else {
        toast({
          title: "Login Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    }

    setIsSubmitting(false);
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="admin@pureresearchinsights.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role to sign in as" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="sub-admin">Sub Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
            <Button variant="link" size="sm" asChild>
                <Link href="/">Back to Home</Link>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
