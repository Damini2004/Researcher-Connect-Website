
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldError } from "react-hook-form";
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
import { CalendarIcon, Check, ChevronsUpDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { getSubAdmins, SubAdmin } from "@/services/subAdminService";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Progress } from "../ui/progress";
import { countries } from "@/lib/countries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import dynamic from 'next/dynamic';
import { ScrollArea } from "../ui/scroll-area";

const RichTextEditor = dynamic(() => import('../ui/rich-text-editor'), { ssr: false });

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

const totalSteps = 4;

export default function AddConferenceForm({ onConferenceAdded }: AddConferenceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [subAdmins, setSubAdmins] = React.useState<SubAdmin[]>([]);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);
  
  const form = useForm<AddConferenceData>({
    resolver: zodResolver(conferenceSchema),
    defaultValues: {
      title: "",
      shortTitle: "",
      tagline: "",
      venueName: "",
      country: "",
      aboutConference: "",
      conferenceWebsite: "",
      conferenceEmail: "",
      organizingCommittee: "",
      keynoteSpeakers: "",
      editorialBoard: "",
      teamBios: "",
      tracks: "",
      keywords: "",
      submissionInstructions: "",
      peerReviewMethod: "",
      registrationFees: "",
      accommodationDetails: "",
      faqs: "",
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

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    let fieldsToValidate: (keyof AddConferenceData)[] = [];
    if (currentStep === 1) {
        fieldsToValidate = ['title', 'shortTitle', 'startDate', 'endDate', 'venueName', 'country', 'modeOfConference'];
    } else if (currentStep === 2) {
        fieldsToValidate = ['aboutConference', 'conferenceEmail'];
    } else if (currentStep === 3) {
        fieldsToValidate = ['submissionStartDate', 'submissionEndDate', 'paperCategories'];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
        setCurrentStep(step => step + 1);
    } else {
        const errors = form.formState.errors;
        const firstErrorField = fieldsToValidate.find(field => errors[field]);
        if (firstErrorField) {
            const error = errors[firstErrorField] as FieldError | undefined;
            toast({
                title: "Incomplete Step",
                description: error?.message || `Please fill out all required fields in this step.`,
                variant: "destructive",
            });
        }
    }
  };

  const handleBack = () => {
    setCurrentStep(step => step - 1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col h-full">
        <div className="space-y-2">
            <Progress value={(currentStep / totalSteps) * 100} />
            <p className="text-sm text-muted-foreground text-center">Step {currentStep} of {totalSteps}</p>
        </div>

        <div className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
                <div className="p-4 space-y-6">
                    {currentStep === 1 && (
                        <section>
                            <h3 className="text-lg font-medium mb-4">Basic Details</h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Conference Title</FormLabel> <FormControl><Input placeholder="e.g., International Conference on Machine Learning" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="shortTitle" render={({ field }) => ( <FormItem> <FormLabel>Short Title / Acronym</FormLabel> <FormControl><Input placeholder="e.g., ICML2025" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                </div>
                                <FormField control={form.control} name="tagline" render={({ field }) => ( <FormItem> <FormLabel>Conference Theme / Tagline</FormLabel> <FormControl><Input placeholder="e.g., Shaping the Future of Intelligence" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="startDate" render={({ field }) => ( <FormItem> <FormLabel>Start Date</FormLabel> <Popover> <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></FormControl></PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="endDate" render={({ field }) => ( <FormItem> <FormLabel>End Date</FormLabel> <Popover> <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></FormControl></PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="venueName" render={({ field }) => ( <FormItem> <FormLabel>Venue Name</FormLabel> <FormControl><Input placeholder="e.g., Grand Convention Center" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="country" render={({ field }) => ( <FormItem> <FormLabel>Country</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl><SelectContent>{countries.map(c => <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select> <FormMessage /> </FormItem> )} />
                                </div>
                                <FormField
                                  control={form.control}
                                  name="modeOfConference"
                                  render={() => (
                                    <FormItem>
                                      <FormLabel>Mode of Conference</FormLabel>
                                      <div className="flex items-center space-x-4 pt-2">
                                        {conferenceModes.map((item) => (
                                          <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="modeOfConference"
                                            render={({ field }) => {
                                              return (
                                                <FormItem
                                                  key={item.id}
                                                  className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                  <FormControl>
                                                    <Checkbox
                                                      checked={field.value?.includes(item.id)}
                                                      onCheckedChange={(checked) => {
                                                        return checked
                                                          ? field.onChange([...field.value, item.id])
                                                          : field.onChange(
                                                              field.value?.filter(
                                                                (value) => value !== item.id
                                                              )
                                                            )
                                                      }}
                                                    />
                                                  </FormControl>
                                                  <FormLabel className="font-normal">
                                                    {item.label}
                                                  </FormLabel>
                                                </FormItem>
                                              )
                                            }}
                                          />
                                        ))}
                                      </div>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                            </div>
                        </section>
                    )}

                    {currentStep === 2 && (
                        <section>
                            <h3 className="text-lg font-medium mb-4">Content & People</h3>
                            <div className="space-y-6">
                                <FormField control={form.control} name="aboutConference" render={({ field }) => ( <FormItem> <FormLabel>About Conference</FormLabel> <FormControl><RichTextEditor value={field.value} onChange={field.onChange} placeholder="Provide a detailed description of the conference..."/>
                                      </FormControl> <FormMessage /> </FormItem> )} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="conferenceWebsite" render={({ field }) => ( <FormItem> <FormLabel>Conference Website URL</FormLabel> <FormControl><Input placeholder="https://example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="conferenceEmail" render={({ field }) => ( <FormItem> <FormLabel>Conference Email / Contact</FormLabel> <FormControl><Input placeholder="contact@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                </div>
                                <FormField control={form.control} name="conferenceLogo" render={() => ( <FormItem> <FormLabel>Conference Logo / Banner</FormLabel> <FormControl><Input type="file" accept="image/*" {...logoFileRef} /></FormControl> <FormDescription>Max file size: 500 KB</FormDescription> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="organizingCommittee" render={({ field }) => ( <FormItem> <FormLabel>Organizing Committee / Team (Optional)</FormLabel> <FormControl><Textarea placeholder="List members..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="keynoteSpeakers" render={({ field }) => ( <FormItem> <FormLabel>Guest / Keynote Speakers (Optional)</FormLabel> <FormControl><Textarea placeholder="List speakers..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="editorialBoard" render={({ field }) => ( <FormItem> <FormLabel>Editorial Board Members / Track Chairs (Optional)</FormLabel> <FormControl><Textarea placeholder="List members..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            </div>
                        </section>
                    )}

                    {currentStep === 3 && (
                        <section>
                            <h3 className="text-lg font-medium mb-4">Submission Details</h3>
                            <div className="space-y-6">
                                <FormField control={form.control} name="tracks" render={({ field }) => ( <FormItem> <FormLabel>List of Tracks / Themes (Optional)</FormLabel> <FormControl><Textarea placeholder="e.g., AI in Healthcare, NLP Advances..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="keywords" render={({ field }) => ( <FormItem> <FormLabel>Keywords or SDG Tags (Optional)</FormLabel> <FormControl><Input placeholder="AI, Machine Learning, SDG 9, ..." {...field} /></FormControl> <FormDescription>Comma-separated values.</FormDescription> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="submissionInstructions" render={({ field }) => ( <FormItem> <FormLabel>Submission Instructions (Optional)</FormLabel> <FormControl><Textarea placeholder="Detail the submission guidelines..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="paperTemplate" render={() => ( <FormItem> <FormLabel>Paper Template Upload (DOC/PDF) (Optional)</FormLabel> <FormControl><Input type="file" accept=".doc,.docx,.pdf" {...templateFileRef} /></FormControl> <FormDescription>Max file size: 4 MB</FormDescription> <FormMessage /> </FormItem> )} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="submissionStartDate" render={({ field }) => ( <FormItem> <FormLabel>Submission Start Date</FormLabel> <Popover> <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></FormControl></PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="submissionEndDate" render={({ field }) => ( <FormItem> <FormLabel>Abstract Submission Deadline</FormLabel> <Popover> <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></FormControl></PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="fullPaperSubmissionDeadline" render={({ field }) => ( <FormItem> <FormLabel>Full Paper Deadline (Optional)</FormLabel> <Popover> <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></FormControl></PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="registrationDeadline" render={({ field }) => ( <FormItem> <FormLabel>Registration Deadline (Optional)</FormLabel> <Popover> <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground")}> {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button></FormControl></PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
                                </div>
                                <FormField
                                  control={form.control}
                                  name="paperCategories"
                                  render={() => (
                                    <FormItem>
                                      <FormLabel>Paper Categories</FormLabel>
                                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                                        {paperCategories.map((item) => (
                                          <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="paperCategories"
                                            render={({ field }) => {
                                              return (
                                                <FormItem
                                                  key={item.id}
                                                  className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                  <FormControl>
                                                    <Checkbox
                                                      checked={field.value?.includes(item.id)}
                                                      onCheckedChange={(checked) => {
                                                        return checked
                                                          ? field.onChange([...field.value, item.id])
                                                          : field.onChange(
                                                              field.value?.filter(
                                                                (value) => value !== item.id
                                                              )
                                                            )
                                                      }}
                                                    />
                                                  </FormControl>
                                                  <FormLabel className="font-normal">
                                                    {item.label}
                                                  </FormLabel>
                                                </FormItem>
                                              )
                                            }}
                                          />
                                        ))}
                                      </div>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField control={form.control} name="peerReviewMethod" render={({ field }) => ( <FormItem> <FormLabel>Peer Review Method (Optional)</FormLabel> <FormControl><Textarea placeholder="e.g., Single-Blind, Double-Blind, Open..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            </div>
                        </section>
                    )}

                    {currentStep === 4 && (
                        <section>
                            <h3 className="text-lg font-medium mb-4">Final Details</h3>
                            <div className="space-y-6">
                                <FormField control={form.control} name="registrationFees" render={({ field }) => ( <FormItem> <FormLabel>Registration & Fees (Optional)</FormLabel> <FormControl><Textarea placeholder="Detail the fee structure..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="accommodationDetails" render={({ field }) => ( <FormItem> <FormLabel>Accommodation Details (Optional)</FormLabel> <FormControl><Textarea placeholder="List nearby hotels or arrangements..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="faqs" render={({ field }) => ( <FormItem> <FormLabel>FAQs (Optional)</FormLabel> <FormControl><Textarea placeholder="Provide answers to frequently asked questions..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="editorChoice" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Editor Choice (Assign Sub-Admin)</FormLabel> <Popover open={openCombobox} onOpenChange={setOpenCombobox}> <PopoverTrigger asChild> <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")} {...field} > {field.value && field.value !== "none" ? subAdmins.find( (admin) => admin.id === field.value )?.name : "Select Sub-Admin"} <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> </Button> </PopoverTrigger> <PopoverContent className="w-[--radix-popover-trigger-width] p-0"> <Command> <CommandInput placeholder="Search sub-admins..." /> <CommandList> <CommandEmpty>No sub-admin found.</CommandEmpty> <CommandGroup> <CommandItem value={"none"} onSelect={() => { form.setValue("editorChoice", "none"); setOpenCombobox(false); }} > None </CommandItem> {subAdmins.map((admin) => ( <CommandItem value={admin.name} key={admin.id} onSelect={() => { form.setValue("editorChoice", admin.id); setOpenCombobox(false); }} > <Check className={cn("mr-2 h-4 w-4", admin.id === field.value ? "opacity-100" : "opacity-0" )}/> {admin.name} </CommandItem> ))} </CommandGroup> </CommandList> </Command> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
                            </div>
                        </section>
                    )}
                </div>
            </ScrollArea>
        </div>

        <div className="flex justify-between pt-4 border-t mt-auto">
            <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Saving Conference..." : "Add Conference"}
                </Button>
            )}
        </div>
      </form>
    </Form>
  );
}
