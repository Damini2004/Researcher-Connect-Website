
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
import { updateConference } from "@/services/conferenceService";
import { conferenceSchema, type Conference, type AddConferenceData } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { countries } from "@/lib/countries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import dynamic from 'next/dynamic';
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";

const RichTextEditorDynamic = dynamic(() => import('../ui/rich-text-editor'), { ssr: false });

interface EditConferenceFormProps {
    conference: Conference;
    onConferenceUpdated: () => void;
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

const totalSteps = 3;

const parseDate = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? undefined : date;
};


export default function EditConferenceForm({ conference, onConferenceUpdated }: EditConferenceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);
  

  const form = useForm<AddConferenceData>({
    resolver: zodResolver(conferenceSchema),
    defaultValues: {
      title: conference.title || "",
      shortTitle: conference.shortTitle || "",
      tagline: conference.tagline || "",
      status: conference.status || 'active',
      startDate: parseDate(conference.startDate),
      endDate: parseDate(conference.endDate),
      venueName: conference.venueName || "",
      country: conference.country || "",
      modeOfConference: conference.modeOfConference || [],
      aboutConference: conference.aboutConference || "",
      conferenceWebsite: conference.conferenceWebsite || "",
      conferenceEmail: conference.conferenceEmail || "",
      organizingCommittee: conference.organizingCommittee || "",
      keynoteSpeakers: conference.keynoteSpeakers || "",
      editorialBoard: conference.editorialBoard || "",
      teamBios: conference.teamBios || "",
      tracks: conference.tracks || "",
      keywords: conference.keywords || "",
      submissionInstructions: conference.submissionInstructions || "",
      peerReviewMethod: conference.peerReviewMethod || "",
      submissionStartDate: parseDate(conference.submissionStartDate),
      submissionEndDate: parseDate(conference.submissionEndDate),
      fullPaperSubmissionDeadline: parseDate(conference.fullPaperSubmissionDeadline),
      registrationDeadline: parseDate(conference.registrationDeadline),
      paperCategories: conference.paperCategories || [],
    },
  });

  const logoFileRef = form.register("conferenceLogo");
  const brochureFileRef = form.register("paperTemplateUrl");

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
    
    const payload: Partial<AddConferenceData> & { imageSrc?: string, paperTemplateUrl?: string } = { ...values };

    if (values.conferenceLogo && values.conferenceLogo.length > 0) {
        if(values.conferenceLogo[0].size > 500 * 1024) {
             toast({ title: "Error", description: "Logo/Banner size cannot exceed 500 KB.", variant: "destructive" });
             setIsSubmitting(false);
             return;
        }
        try {
            payload.imageSrc = await convertFileToBase64(values.conferenceLogo[0]);
        } catch (error) {
            toast({ title: "Error", description: "Failed to read logo file.", variant: "destructive" });
            setIsSubmitting(false);
            return;
        }
    }
    
    if (values.paperTemplateUrl && values.paperTemplateUrl.length > 0) {
      try {
        payload.paperTemplateUrl = await convertFileToBase64(values.paperTemplateUrl[0]);
      } catch (error) {
        toast({ title: "Error", description: "Failed to read brochure file.", variant: "destructive" });
        setIsSubmitting(false);
        return;
      }
    }

    delete (payload as any).conferenceLogo;

    const result = await updateConference(conference.id, payload);

    if (result.success) {
      onConferenceUpdated();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="flex-shrink-0">
            <div className="space-y-2 mb-4">
                <Progress value={(currentStep / totalSteps) * 100} />
                <p className="text-sm text-muted-foreground text-center">Step {currentStep} of {totalSteps}</p>
            </div>
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
                                            render={({ field }) => (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...(field.value || []), item.id])
                                                            : field.onChange(
                                                                (field.value || []).filter(
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
                                            )}
                                        />
                                    ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Conference Status</FormLabel>
                                        <FormDescription>
                                            Inactive conferences will not be shown on the public site.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value === 'active'}
                                            onCheckedChange={(checked) => field.onChange(checked ? 'active' : 'inactive')}
                                        />
                                    </FormControl>
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
                            <FormField
                                control={form.control}
                                name="aboutConference"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About Conference</FormLabel>
                                        <RichTextEditorDynamic
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            placeholder="Provide a detailed description of the conference..."
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="conferenceWebsite" render={({ field }) => ( <FormItem> <FormLabel>Conference Website URL</FormLabel> <FormControl><Input placeholder="https://example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name="conferenceEmail" render={({ field }) => ( <FormItem> <FormLabel>Conference Email / Contact</FormLabel> <FormControl><Input placeholder="contact@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            </div>
                            <FormField control={form.control} name="conferenceLogo" render={() => ( <FormItem> <FormLabel>New Conference Logo / Banner (Optional)</FormLabel> <FormControl><Input type="file" accept="image/*" {...logoFileRef} /></FormControl> <FormDescription>Max file size: 500 KB. Leave blank to keep the current one.</FormDescription> <FormMessage /> </FormItem> )} />
                            <FormField
                                control={form.control}
                                name="organizingCommittee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Organizing Committee / Team (Optional)</FormLabel>
                                        <RichTextEditorDynamic
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            placeholder="List members..."
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="keynoteSpeakers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Guest / Keynote Speakers (Optional)</FormLabel>
                                        <RichTextEditorDynamic
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            placeholder="List speakers..."
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="editorialBoard" render={({ field }) => ( <FormItem> <FormLabel>Editorial Board Members / Track Chairs (Optional)</FormLabel> <FormControl><Textarea placeholder="List members..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                        </div>
                    </section>
                )}

                {currentStep === 3 && (
                    <section>
                        <h3 className="text-lg font-medium mb-4">Submission Details</h3>
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="tracks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>List of Tracks / Themes (Optional)</FormLabel>
                                        <RichTextEditorDynamic
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            placeholder="e.g., AI in Healthcare, NLP Advances..."
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="paperTemplateUrl" render={() => ( <FormItem> <FormLabel>New Brochure / Paper Template (Optional)</FormLabel> <FormControl><Input type="file" accept=".pdf,.doc,.docx" {...brochureFileRef} /></FormControl> <FormDescription>Upload a brochure or paper template (PDF/DOC/DOCX). Leave blank to keep the current one.</FormDescription> <FormMessage /> </FormItem> )} />
                            <FormField control={form.control} name="keywords" render={({ field }) => ( <FormItem> <FormLabel>Keywords or SDG Tags (Optional)</FormLabel> <FormControl><Input placeholder="AI, Machine Learning, SDG 9, ..." {...field} /></FormControl> <FormDescription>Comma-separated values.</FormDescription> <FormMessage /> </FormItem> )} />
                            <FormField control={form.control} name="submissionInstructions" render={({ field }) => ( <FormItem> <FormLabel>Submission Instructions (Optional)</FormLabel> <FormControl><Textarea placeholder="Detail the submission guidelines..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
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
                                            render={({ field }) => (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...(field.value || []), item.id])
                                                            : field.onChange(
                                                                (field.value || []).filter(
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
                                            )}
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
            </div>
            </ScrollArea>
        </div>

        <div className="flex-shrink-0 flex justify-between pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Saving Changes..." : "Save Changes"}
                </Button>
            )}
        </div>
      </form>
    </Form>
  );
}
