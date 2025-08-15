
"use client";

import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addInquiry } from "@/services/inquiryService";
import { Send } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const generalInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(20, "Message must be at least 20 characters."),
  // Optional fields that are part of the other schema
  phone: z.string().optional(),
  city: z.string().optional(),
  university: z.string().optional(),
  degree: z.string().optional(),
  resume: z.any().optional(),
  consent: z.boolean().optional(),
});

const internshipApplicationSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "A valid phone number is required."),
  city: z.string().min(2, "Current city is required."),
  university: z.string().min(3, "College/University name is required."),
  degree: z.string().min(2, "Degree & Branch is required."),
  resume: z.any()
    .refine((files) => files?.length > 0, "A resume is required.")
    .refine((files) => {
        const file = files?.[0];
        if (!file) return false;
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        return allowedTypes.includes(file.type);
      },
      "Only PDF, DOC, or DOCX files are allowed."
    ),
  message: z.string().min(20, "Please tell us why you want this internship (min 20 characters)."),
  consent: z.boolean().refine(val => val === true, {
    message: "You must confirm that the information provided is accurate.",
  }),
  // Optional field that is part of the other schema
  subject: z.string().optional(),
});

const webinarRegistrationSchema = z.object({
    name: z.string().min(2, "Name is required."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().optional(),
    message: z.string().optional(),
    // Fields not applicable to webinar but part of the union type
    subject: z.string().optional(),
    city: z.string().optional(),
    university: z.string().optional(),
    degree: z.string().optional(),
    resume: z.any().optional(),
    consent: z.boolean().optional(),
});


interface ContactFormProps {
  inquiryType?: string;
  details?: string;
}

export default function ContactForm({ inquiryType, details }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const isInternshipApplication = inquiryType === "Internship Application";
  const isWebinarRegistration = inquiryType === "Webinar Registration";
  
  const getValidationSchema = () => {
    if (isInternshipApplication) return internshipApplicationSchema;
    if (isWebinarRegistration) return webinarRegistrationSchema;
    return generalInquirySchema;
  }

  const form = useForm<z.infer<typeof internshipApplicationSchema>>({
    resolver: zodResolver(getValidationSchema()),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      university: "",
      degree: "",
      subject: isInternshipApplication ? `Internship Application: ${details}` : (isWebinarRegistration ? `Webinar Registration: ${details}`: ""),
      message: "",
      consent: false,
    },
  });

  const resumeFileRef = form.register("resume");
  
  const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
      });
  };


  async function onSubmit(values: z.infer<typeof internshipApplicationSchema | typeof generalInquirySchema>) {
    setIsSubmitting(true);
    try {
      let resumeData: string | undefined = undefined;
      if (isInternshipApplication && values.resume && values.resume.length > 0) {
        resumeData = await convertFileToBase64(values.resume[0]);
      }

      const result = await addInquiry({
        ...values,
        type: inquiryType || 'General Inquiry',
        details: details,
        resumeData: resumeData,
      });

      if (result.success) {
        toast({
          title: isInternshipApplication ? "Application Sent!" : (isWebinarRegistration ? "Registration Successful!" : "Message Sent!"),
          description: isInternshipApplication ? "Thank you for applying. We will review your application and get back to you shortly." : (isWebinarRegistration ? "Thank you for registering. We will send you the details shortly." : "Thank you for contacting us. We will get back to you shortly."),
        });
        form.reset();
        // Close dialog if possible
        const closeButton = document.querySelector('[data-radix-dialog-close]') as HTMLElement;
        if (closeButton) {
            closeButton.click();
        }

      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
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
        
        {isInternshipApplication && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current City</FormLabel>
                            <FormControl><Input placeholder="e.g., Mumbai" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="university" render={({ field }) => (
                        <FormItem>
                            <FormLabel>College/University Name</FormLabel>
                            <FormControl><Input placeholder="e.g., University of Technology" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="degree" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Degree & Branch</FormLabel>
                            <FormControl><Input placeholder="e.g., B.Tech in Computer Science" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <FormField control={form.control} name="resume" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Resume (PDF, DOC, DOCX)</FormLabel>
                        <FormControl>
                            <Input 
                                type="file" 
                                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                {...resumeFileRef}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
            </>
        )}
        
        {!isInternshipApplication && !isWebinarRegistration && (
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Regarding my submission..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        )}

        {!isWebinarRegistration && (
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isInternshipApplication ? "Why do you want this internship?" : "Your Message"}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={isInternshipApplication ? "Briefly explain your interest and qualifications..." : "Please type your message here."}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        )}
        
        {isInternshipApplication && (
             <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        I confirm that the information provided is accurate.
                        </FormLabel>
                        <FormMessage />
                    </div>
                    </FormItem>
                )}
            />
        )}
        
        <div className="text-center">
            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : (isInternshipApplication ? "Submit Application" : (isWebinarRegistration ? "Register for Webinar" : "Send Message"))}
                <Send className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </form>
    </Form>
  );
}
