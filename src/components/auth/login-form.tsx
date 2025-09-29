
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import * as React from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Logo } from "../icons";
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { app } from "@/lib/firebase";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const auth = getAuth(app);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        if (user && user.email === 'superadmin@researcherconnect.com') {
            toast({
              title: "Login Successful",
              description: "Redirecting to super-admin dashboard...",
            });
            router.push(`/super-admin`);
        } else {
            // This case might be for other approved users, like sub-admins in the future.
            // For now, we deny access if not super-admin.
             toast({
              title: "Access Denied",
              description: "You do not have permission to access this dashboard.",
              variant: "destructive",
            });
             await auth.signOut();
        }
    } catch (error: any) {
        let description = "An unexpected error occurred. Please try again.";
        if (error.code) {
            switch(error.code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                case AuthErrorCodes.USER_DELETED:
                case 'auth/invalid-credential':
                    description = "Invalid email or password.";
                    break;
                case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
                    description = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
                    break;
                default:
                    description = error.message;
            }
        }
        toast({
          title: "Login Failed",
          description: description,
          variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
            <Logo className="h-10 w-10 mx-auto mb-4" />
            <CardTitle className="text-xl font-bold">Login to Researcher Connect</CardTitle>
        </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                        <Input type="email" placeholder="Email or username" className="pl-10" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                            <Input type={showPassword ? "text" : "password"} placeholder="Password" className="pl-10 pr-10" {...field} />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-between">
             <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                            <Checkbox id="remember-me" checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <Label htmlFor="remember-me" className="text-sm font-normal text-muted-foreground">
                            Remember Me
                        </Label>
                    </FormItem>
                )}
                />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging In...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
