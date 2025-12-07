// src/components/forms/contact-form.tsx
"use client";

import * as React from "react";
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
import { addInquiry } from "@/services/inquiryService";
import { Send } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const generalInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(20, "Message must be at least 20 characters."),
  captcha: z.string().min(1, "Please answer the security question."),
  // Optional fields that are part of the other schemas
  phone: z.string().optional(),
  city: z.string().optional(),
  university: z.string().optional(),
  degree: z.string().optional(),
  resume: z.any().optional(),
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  howHeard: z.string().optional(),
  questionsForSpeaker: z.string().optional(),
  futureWebinarsInterest: z.boolean().optional(),
  consent: z.boolean().optional(),
  privacyConsent: z.boolean().optional(),
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
  captcha: z.string().min(1, "Please answer the security question."),
  consent: z.boolean().refine(val => val === true, {
    message: "You must confirm that the information provided is accurate.",
  }),
  // Optional field that is part of the other schema
  subject: z.string().optional(),
  privacyConsent: z.boolean().optional(),
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  howHeard: z.string().optional(),
  questionsForSpeaker: z.string().optional(),
  futureWebinarsInterest: z.boolean().optional(),
});

const webinarRegistrationSchema = z.object({
    // Personal Details
    name: z.string().min(2, "Full Name is required."),
    email: z.string().email("A valid email address is required for sending the link."),
    phone: z.string().optional(),
    // Professional Details
    organization: z.string().optional(),
    jobTitle: z.string().optional(),
    industry: z.string().optional(),
    // Webinar-Specific
    howHeard: z.string().optional(),
    questionsForSpeaker: z.string().optional(),
    captcha: z.string().min(1, "Please answer the security question."),
    // Preferences & Consent
    futureWebinarsInterest: z.boolean().default(false).optional(),
    consent: z.boolean().refine(val => val === true, {
        message: "You must agree to receive communications for this webinar.",
    }),
    privacyConsent: z.boolean().refine(val => val === true, {
        message: "You must agree to the privacy policy.",
    }),
    // Fields not applicable to webinar but part of the union type
    subject: z.string().optional(),
    message: z.string().optional(),
    city: z.string().optional(),
    university: z.string().optional(),
    degree: z.string().optional(),
    resume: z.any().optional(),
});


interface ContactFormProps {
  inquiryType?: string;
  details?: string;
}

const industryOptions = ["Academia/Education", "Information Technology", "Healthcare", "Engineering", "Finance", "Government", "Non-Profit", "Other"];
const howHeardOptions = ["Email", "Social Media", "Friend/Colleague", "Website", "Other"];

export default function ContactForm({ inquiryType, details }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [num1, setNum1] = React.useState(0);
  const [num2, setNum2] = React.useState(0);
  
  const isInternshipApplication = inquiryType === "Internship Application";
  const isWebinarRegistration = inquiryType === "Webinar Registration";

  React.useEffect(() => {
    // Generate captcha numbers when component mounts
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);
  
  const getValidationSchema = () => {
    if (isInternshipApplication) return internshipApplicationSchema;
    if (isWebinarRegistration) return webinarRegistrationSchema;
    return generalInquirySchema;
  }

  const form = useForm<z.infer<typeof webinarRegistrationSchema | typeof internshipApplicationSchema | typeof generalInquirySchema>>({
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
      organization: "",
      jobTitle: "",
      industry: "",
      howHeard: "",
      questionsForSpeaker: "",
      futureWebinarsInterest: false,
      consent: false,
      privacyConsent: false,
      captcha: "",
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


  async function onSubmit(values: z.infer<typeof webinarRegistrationSchema | typeof internshipApplicationSchema | typeof generalInquirySchema>) {
    setIsSubmitting(true);

    if (parseInt(values.captcha || '0') !== num1 + num2) {
      toast({
        title: "Invalid Security Answer",
        description: "Please solve the math question correctly.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      // Generate new numbers
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      form.setValue('captcha', '');
      return;
    }

    try {
      let resumeData: string | undefined = undefined;
      if (isInternshipApplication && 'resume' in values && values.resume && values.resume.length > 0) {
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
        // Regenerate captcha
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
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

  const renderGeneralForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
          <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
      </div>
      <FormField control={form.control} name="subject" render={({ field }) => ( <FormItem> <FormLabel>Subject</FormLabel> <FormControl><Input placeholder="Regarding my submission..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
      <FormField control={form.control} name="message" render={({ field }) => ( <FormItem> <FormLabel>Your Message</FormLabel> <FormControl><Textarea placeholder="Please type your message here." className="min-h-[120px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
      <FormField control={form.control} name="captcha" render={({ field }) => ( <FormItem> <FormLabel>Security Question: What is {num1} + {num2}?</FormLabel> <FormControl><Input type="number" placeholder="Your answer" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
    </>
  );

  const renderInternshipForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="city" render={({ field }) => ( <FormItem> <FormLabel>Current City</FormLabel> <FormControl><Input placeholder="e.g., Mumbai" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.control} name="university" render={({ field }) => ( <FormItem> <FormLabel>College/University Name</FormLabel> <FormControl><Input placeholder="e.g., University of Technology" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="degree" render={({ field }) => ( <FormItem> <FormLabel>Degree & Branch</FormLabel> <FormControl><Input placeholder="e.g., B.Tech in Computer Science" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
      </div>
      <FormField control={form.control} name="resume" render={() => ( <FormItem> <FormLabel>Resume (PDF, DOC, DOCX)</FormLabel> <FormControl><Input type="file" accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" {...resumeFileRef} /></FormControl> <FormMessage /> </FormItem> )} />
      <FormField control={form.control} name="message" render={({ field }) => ( <FormItem> <FormLabel>Why do you want this internship?</FormLabel> <FormControl><Textarea placeholder="Briefly explain your interest and qualifications..." className="min-h-[120px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
      <FormField control={form.control} name="captcha" render={({ field }) => ( <FormItem> <FormLabel>Security Question: What is {num1} + {num2}?</FormLabel> <FormControl><Input type="number" placeholder="Your answer" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
      <FormField control={form.control} name="consent" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <div className="space-y-1 leading-none"><FormLabel>I confirm that the information provided is accurate.</FormLabel><FormMessage /></div></FormItem> )} />
    </>
  );

  const renderWebinarForm = () => (
    <>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
            <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input placeholder="you@example.com" {...field} /></FormControl> <FormDescription className="text-xs">The webinar link will be sent here.</FormDescription> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number (Optional)</FormLabel> <FormControl><Input placeholder="For reminders" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Professional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
            <FormField control={form.control} name="organization" render={({ field }) => ( <FormItem> <FormLabel>Organization (Optional)</FormLabel> <FormControl><Input placeholder="e.g., University of Science" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="jobTitle" render={({ field }) => ( <FormItem> <FormLabel>Job Title (Optional)</FormLabel> <FormControl><Input placeholder="e.g., Research Scholar" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="industry" render={({ field }) => (
                <FormItem>
                    <FormLabel>Industry / Field (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select your industry" /></SelectTrigger></FormControl>
                        <SelectContent>{industryOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
      </div>
       <div className="space-y-2">
        <h3 className="font-semibold text-lg">Additional Information</h3>
        <div className="grid grid-cols-1 gap-6 border p-4 rounded-md">
             <FormField control={form.control} name="howHeard" render={({ field }) => (
                <FormItem>
                    <FormLabel>How did you hear about us? (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                        <SelectContent>{howHeardOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="questionsForSpeaker" render={({ field }) => ( <FormItem> <FormLabel>Questions for the Speaker (Optional)</FormLabel> <FormControl><Textarea placeholder="Have a question you'd like answered during the webinar?" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="captcha" render={({ field }) => ( <FormItem> <FormLabel>Security Question: What is {num1} + {num2}?</FormLabel> <FormControl><Input type="number" placeholder="Your answer" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="futureWebinarsInterest" render={({ field }) => (<FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel className="font-normal">I am interested in receiving information about future webinars.</FormLabel></FormItem>)} />
        </div>
      </div>
      <div className="space-y-4">
        <FormField control={form.control} name="consent" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <div className="space-y-1 leading-none"><FormLabel>I agree to receive communications regarding this webinar.</FormLabel><FormMessage /></div></FormItem> )} />
        <FormField control={form.control} name="privacyConsent" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <div className="space-y-1 leading-none"><FormLabel>I agree to the <a href="/privacy-policy" target="_blank" className="text-primary underline">Privacy Policy</a>.</FormLabel><FormMessage /></div></FormItem> )} />
      </div>
    </>
  );


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {isInternshipApplication && renderInternshipForm()}
        {isWebinarRegistration && renderWebinarForm()}
        {!isInternshipApplication && !isWebinarRegistration && renderGeneralForm()}
        
        <div className="text-center pt-4">
            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : (isInternshipApplication ? "Submit Application" : (isWebinarRegistration ? "Register for Webinar" : "Send Message"))}
                <Send className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </form>
    </Form>
  );
}

    