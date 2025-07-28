
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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { getSubAdmins, SubAdmin } from "@/services/subAdminService";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

interface AddConferenceFormProps {
    onConferenceAdded: () => void;
}

const conferenceModes = [
  { id: "physical", label: "Physical" },
  { id: "virtual", label: "Virtual" },
  { id: "hybrid", label: "Hybrid" },
] as const;

const paperCategories = [
    { id: "full_paper", label: "Full Paper" },
    { id: "abstract", label: "Abstract" },
    { id: "poster", label: "Poster" },
    { id: "case_study", label: "Case Study" },
] as const;


export default function AddConferenceForm({ onConferenceAdded }: AddConferenceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [subAdmins, setSubAdmins] = React.useState<SubAdmin[]>([]);
  const [openCombobox, setOpenCombobox] = React.useState(false);

  const form = useForm<AddConferenceData>({
    resolver: zodResolver(conferenceSchema),
    defaultValues: {
      modeOfConference: [],
      paperCategories: [],
      editorChoice: "none",
    },
  });

  React.useEffect(() => {
    async function fetchAdmins() {
        try {
            const admins = await getSubAdmins();
            setSubAdmins(admins.filter(admin => admin.status === 'approved'));
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not fetch sub-admins for editor selection.",
                variant: "destructive",
            });
        }
    }
    fetchAdmins();
  }, [toast]);


  const logoFileRef = form.register("conferenceLogo");
  const templateFileRef = form.register("paperTemplate");

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
    
    let logoBase64 = "";
    if (values.conferenceLogo && values.conferenceLogo.length > 0) {
        if(values.conferenceLogo[0].size > 500 * 1024) {
             toast({ title: "Error", description: "Logo/Banner size cannot exceed 500 KB.", variant: "destructive" });
             setIsSubmitting(false);
             return;
        }
        try {
            logoBase64 = await convertFileToBase64(values.conferenceLogo[0]);
        } catch (error) {
            toast({ title: "Error", description: "Failed to read logo file.", variant: "destructive" });
            setIsSubmitting(false);
            return;
        }
    } else {
        toast({ title: "Error", description: "Conference Logo / Banner is required.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }
    
    let templateBase64;
    if (values.paperTemplate && values.paperTemplate.length > 0) {
         if(values.paperTemplate[0].size > 4 * 1024 * 1024) {
             toast({ title: "Error", description: "Paper template size cannot exceed 4 MB.", variant: "destructive" });
             setIsSubmitting(false);
             return;
        }
        try {
            templateBase64 = await convertFileToBase64(values.paperTemplate[0]);
        } catch (error) {
            toast({ title: "Error", description: "Failed to read template file.", variant: "destructive" });
            setIsSubmitting(false);
            return;
        }
    }

    const payload = {
        ...values,
        conferenceLogo: logoBase64,
        paperTemplateUrl: templateBase64,
        editorChoice: values.editorChoice === "none" ? undefined : values.editorChoice,
    };

    const result = await addConference(payload);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Conference Title</FormLabel> <FormControl><Input placeholder="e.g., International Conference on Machine Learning" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="shortTitle" render={({ field }) => ( <FormItem> <FormLabel>Short Title / Acronym</FormLabel> <FormControl><Input placeholder="e.g., ICML2025" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField control={form.control} name="tagline" render={({ field }) => ( <FormItem> <FormLabel>Conference Theme / Tagline</FormLabel> <FormControl><Input placeholder="e.g., Shaping the Future of Intelligence" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="startDate" render={({ field }) => ( <FormItem> <FormLabel>Start Date</FormLabel> <Popover> <FormControl><PopoverTrigger asChild><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></PopoverTrigger></FormControl> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="endDate" render={({ field }) => ( <FormItem> <FormLabel>End Date</FormLabel> <Popover> <FormControl><PopoverTrigger asChild><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></PopoverTrigger></FormControl> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="venueName" render={({ field }) => ( <FormItem> <FormLabel>Venue Name</FormLabel> <FormControl><Input placeholder="e.g., Grand Convention Center" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="venueAddress" render={({ field }) => ( <FormItem> <FormLabel>Venue Address</FormLabel> <FormControl><Input placeholder="123 Innovation Drive, Tech City" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField control={form.control} name="modeOfConference" render={() => ( <FormItem> <FormLabel>Mode of Conference</FormLabel> <div className="flex items-center space-x-4"> {conferenceModes.map((item) => ( <FormField key={item.id} control={form.control} name="modeOfConference" render={({ field }) => { return ( <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0"> <FormControl> <Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => { return checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((value) => value !== item.id)) }} /> </FormControl> <FormLabel className="font-normal">{item.label}</FormLabel> </FormItem> ); }} /> ))} </div> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="aboutConference" render={({ field }) => ( <FormItem> <FormLabel>About Conference</FormLabel> <FormControl><Textarea className="min-h-32" placeholder="Provide a detailed description of the conference..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="conferenceWebsite" render={({ field }) => ( <FormItem> <FormLabel>Conference Website URL</FormLabel> <FormControl><Input placeholder="https://example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="conferenceEmail" render={({ field }) => ( <FormItem> <FormLabel>Conference Email / Contact</FormLabel> <FormControl><Input placeholder="contact@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField control={form.control} name="conferenceLogo" render={() => ( <FormItem> <FormLabel>Conference Logo / Banner</FormLabel> <FormControl><Input type="file" accept="image/*" {...logoFileRef} /></FormControl> <FormDescription>Max file size: 500 KB</FormDescription> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="organizingCommittee" render={({ field }) => ( <FormItem> <FormLabel>Organizing Committee / Team</FormLabel> <FormControl><Textarea placeholder="List members..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="keynoteSpeakers" render={({ field }) => ( <FormItem> <FormLabel>Guest / Keynote Speakers</FormLabel> <FormControl><Textarea placeholder="List speakers..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="editorialBoard" render={({ field }) => ( <FormItem> <FormLabel>Editorial Board Members / Track Chairs</FormLabel> <FormControl><Textarea placeholder="List members..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="teamBios" render={({ field }) => ( <FormItem> <FormLabel>Team Bios / Photos (Optional)</FormLabel> <FormControl><Textarea placeholder="Add bios..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="tracks" render={({ field }) => ( <FormItem> <FormLabel>List of Tracks / Themes</FormLabel> <FormControl><Textarea placeholder="e.g., AI in Healthcare, NLP Advances..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="keywords" render={({ field }) => ( <FormItem> <FormLabel>Keywords or SDG Tags</FormLabel> <FormControl><Input placeholder="AI, Machine Learning, SDG 9, ..." {...field} /></FormControl> <FormDescription>Comma-separated values.</FormDescription> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="submissionInstructions" render={({ field }) => ( <FormItem> <FormLabel>Submission Instructions</FormLabel> <FormControl><Textarea placeholder="Detail the submission guidelines..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="paperTemplate" render={() => ( <FormItem> <FormLabel>Paper Template Upload (DOC/PDF)</FormLabel> <FormControl><Input type="file" accept=".doc,.docx,.pdf" {...templateFileRef} /></FormControl> <FormDescription>Max file size: 4 MB</FormDescription> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField control={form.control} name="submissionStartDate" render={({ field }) => ( <FormItem> <FormLabel>Submission Start Date</FormLabel> <Popover> <FormControl><PopoverTrigger asChild><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></PopoverTrigger></FormControl> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
             <FormField control={form.control} name="submissionEndDate" render={({ field }) => ( <FormItem> <FormLabel>Submission End Date</FormLabel> <Popover> <FormControl><PopoverTrigger asChild><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></PopoverTrigger></FormControl> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
        </div>
        <FormField control={form.control} name="paperCategories" render={() => ( <FormItem> <FormLabel>Paper Categories</FormLabel> <div className="flex flex-wrap items-center gap-x-4 gap-y-2"> {paperCategories.map((item) => ( <FormField key={item.id} control={form.control} name="paperCategories" render={({ field }) => { return ( <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0"> <FormControl> <Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => { return checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((value) => value !== item.id)) }} /> </FormControl> <FormLabel className="font-normal">{item.label}</FormLabel> </FormItem> ); }} /> ))} </div> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="peerReviewMethod" render={({ field }) => ( <FormItem> <FormLabel>Peer Review Method</FormLabel> <FormControl><Textarea placeholder="e.g., Single-Blind, Double-Blind, Open..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="registrationFees" render={({ field }) => ( <FormItem> <FormLabel>Registration & Fees</FormLabel> <FormControl><Textarea placeholder="Detail the fee structure..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="accommodationDetails" render={({ field }) => ( <FormItem> <FormLabel>Accommodation Details</FormLabel> <FormControl><Textarea placeholder="List nearby hotels or arrangements..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="faqs" render={({ field }) => ( <FormItem> <FormLabel>FAQs</FormLabel> <FormControl><Textarea placeholder="Provide answers to frequently asked questions..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="editorChoice" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Editor Choice (Assign Sub-Admin)</FormLabel> <Popover open={openCombobox} onOpenChange={setOpenCombobox}> <PopoverTrigger asChild> <FormControl> <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")} > {field.value && field.value !== "none" ? subAdmins.find((admin) => admin.id === field.value)?.name : "Select Sub-Admin"} <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> </Button> </FormControl> </PopoverTrigger> <PopoverContent className="w-[--radix-popover-trigger-width] p-0"> <Command> <CommandInput placeholder="Search sub-admins..." /> <CommandList> <CommandEmpty>No sub-admin found.</CommandEmpty> <CommandGroup> <CommandItem value={"none"} onSelect={() => { form.setValue("editorChoice", "none"); setOpenCombobox(false); }}> None </CommandItem> {subAdmins.map((admin) => ( <CommandItem value={admin.name} key={admin.id} onSelect={() => { form.setValue("editorChoice", admin.id); setOpenCombobox(false); }} > <Check className={cn( "mr-2 h-4 w-4", admin.id === field.value ? "opacity-100" : "opacity-0" )} /> {admin.name} </CommandItem> ))} </CommandGroup> </CommandList> </Command> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving Conference..." : "Add Conference"}
        </Button>
      </form>
    </Form>
  );
}
