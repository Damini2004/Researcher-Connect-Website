
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
import { addConference } from "@/services/conferenceService";
import { conferenceSchema, type AddConferenceData } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Info } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { format } from "date-fns";

interface AddConferenceFormProps {
    onConferenceAdded: () => void;
}

export default function AddConferenceForm({ onConferenceAdded }: AddConferenceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<AddConferenceData>({
    resolver: zodResolver(conferenceSchema),
    defaultValues: {
      title: "",
      description: "",
      fullDescription: "",
      organizerName: "",
      organizerEmail: "",
      organizerPhone: "",
      locationType: "Offline",
      venueAddress: "",
      onlinePlatform: "",
      expectedAttendees: 100,
      audienceType: "Academics, Professionals",
      callForPapers: true,
      enableAbstractSubmission: true,
      enableFullPaperSubmission: false,
    },
  });

  const locationType = form.watch("locationType");
  const fileRef = form.register("bannerImage");

  const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
      });
  };

  async function onSubmit(values: AddConferenceData) {
    setIsSubmitting(true);

    let bannerImageSrc = "";
    if (values.bannerImage && values.bannerImage.length > 0) {
        try {
            bannerImageSrc = await convertFileToBase64(values.bannerImage[0]);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to read image file.",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }
    } else {
       toast({
        title: "Error",
        description: "Banner image is required.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const result = await addConference({
        ...values,
        bannerImage: bannerImageSrc,
    });

    if (result.success) {
      form.reset();
      onConferenceAdded();
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
        <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="participation">Participation</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Basic Details Tab */}
            <TabsContent value="basic" className="space-y-6 pt-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Conference Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Annual Conference on AI Ethics" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A brief overview of the event." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullDescription"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Detailed description of agenda, purpose, etc." className="min-h-[150px]" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="conferenceType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Conference Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a conference type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="National">National</SelectItem>
                                <SelectItem value="International">International</SelectItem>
                                <SelectItem value="Workshop">Workshop</SelectItem>
                                <SelectItem value="Seminar">Seminar</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="organizerName" render={({ field }) => ( <FormItem> <FormLabel>Organizer Name</FormLabel> <FormControl><Input placeholder="e.g., IFERP" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="organizerEmail" render={({ field }) => ( <FormItem> <FormLabel>Organizer Email</FormLabel> <FormControl><Input placeholder="contact@iferp.org" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                </div>
                 <FormField control={form.control} name="organizerPhone" render={({ field }) => ( <FormItem> <FormLabel>Organizer Phone</FormLabel> <FormControl><Input placeholder="+91-1234567890" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            </TabsContent>

            {/* Schedule & Location Tab */}
            <TabsContent value="schedule" className="space-y-6 pt-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="startDate" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Start Date</FormLabel> <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="endDate" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>End Date</FormLabel> <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="submissionDeadline" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Submission Deadline</FormLabel> <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="registrationDeadline" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Registration Deadline</FormLabel> <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover> <FormMessage /> </FormItem> )}/>
                 </div>
                 <FormField
                    control={form.control}
                    name="locationType"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Location Type</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Offline" /></FormControl><FormLabel className="font-normal">Offline</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Online" /></FormControl><FormLabel className="font-normal">Online</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Hybrid" /></FormControl><FormLabel className="font-normal">Hybrid</FormLabel></FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                {(locationType === 'Offline' || locationType === 'Hybrid') && (
                    <FormField control={form.control} name="venueAddress" render={({ field }) => ( <FormItem> <FormLabel>Venue Address</FormLabel> <FormControl><Textarea placeholder="123 Main St, Anytown, USA" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                )}
                {(locationType === 'Online' || locationType === 'Hybrid') && (
                    <FormField control={form.control} name="onlinePlatform" render={({ field }) => ( <FormItem> <FormLabel>Online Platform Details</FormLabel> <FormControl><Input placeholder="e.g., Zoom, Google Meet Link" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                )}
            </TabsContent>

            {/* Participation Details Tab */}
            <TabsContent value="participation" className="space-y-6 pt-4">
                <FormField control={form.control} name="expectedAttendees" render={({ field }) => ( <FormItem> <FormLabel>Expected Attendees</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="audienceType" render={({ field }) => ( <FormItem> <FormLabel>Audience Type</FormLabel> <FormControl><Input placeholder="e.g., Students, Academics, Professionals" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField
                    control={form.control}
                    name="callForPapers"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Call for Papers</FormLabel>
                            <FormDescription>Enable paper submissions for this conference.</FormDescription>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )}
                />
            </TabsContent>

            {/* Settings & Media Tab */}
            <TabsContent value="settings" className="space-y-6 pt-4">
                 <FormField
                    control={form.control}
                    name="bannerImage"
                    render={() => (
                        <FormItem>
                        <FormLabel>Banner Image</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/*" {...fileRef} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="enableAbstractSubmission"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel>Enable Abstract Submission</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="enableFullPaperSubmission"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel>Enable Full Paper Submission</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )}
                />
            </TabsContent>
        </Tabs>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Conference"}
        </Button>
      </form>
    </Form>
  );
}
