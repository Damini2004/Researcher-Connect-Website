
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateJournal, type Journal } from "@/services/journalService";
import { getSubAdmins, SubAdmin } from "@/services/subAdminService";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

const formSchema = z.object({
  journalName: z.string().min(5, "Journal name must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  image: z.any().optional(),
  status: z.enum(["Active", "Inactive", "Archived"], {
    required_error: "Please select a status for the journal.",
  }),
  editorChoice: z.string().optional(),
});

interface EditJournalFormProps {
    journal: Journal;
    onJournalUpdated: (updatedJournal: Journal) => void;
    onClose: () => void;
}

export default function EditJournalForm({ journal, onJournalUpdated, onClose }: EditJournalFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [subAdmins, setSubAdmins] = React.useState<SubAdmin[]>([]);
  const [openCombobox, setOpenCombobox] = React.useState(false);

  React.useEffect(() => {
    async function fetchAdmins() {
        try {
            const admins = await getSubAdmins({ approvedOnly: true });
            setSubAdmins(admins);
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      journalName: journal.journalName,
      description: journal.description,
      status: journal.status,
      editorChoice: journal.editorChoice || "none",
    },
  });

  const fileRef = form.register("image");

  const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
      });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const updateData: Partial<Journal> & { id: string } = {
        id: journal.id,
        journalName: values.journalName,
        description: values.description,
        status: values.status,
        editorChoice: values.editorChoice === "none" ? undefined : values.editorChoice,
    };

    if (values.image && values.image.length > 0) {
        try {
            updateData.imageSrc = await convertFileToBase64(values.image[0]);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to read image file.",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }
    }

    const result = await updateJournal(journal.id, updateData);

    if (result.success && result.updatedJournal) {
      toast({
        title: "Journal Updated!",
        description: `The journal "${values.journalName}" has been updated.`,
      });
      onJournalUpdated(result.updatedJournal);
      onClose();
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
        <FormField
          control={form.control}
          name="journalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Journal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Journal of Advanced AI Research" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of the journal's scope and aims."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>New Cover Image (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField control={form.control} name="editorChoice" render={({ field }) => ( 
            <FormItem className="flex flex-col">
                <FormLabel>Assign Editor</FormLabel>
                <FormControl>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")} >
                                {field.value && field.value !== "none" ? subAdmins.find( (admin) => admin.id === field.value )?.name : "Select Sub-Admin"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandInput placeholder="Search sub-admins..." />
                                <CommandList>
                                    <CommandEmpty>No sub-admin found.</CommandEmpty>
                                    <CommandGroup>
                                        <CommandItem value={"none"} onSelect={() => { form.setValue("editorChoice", "none"); setOpenCombobox(false); }} >
                                            None
                                        </CommandItem>
                                        {subAdmins.map((admin) => (
                                            <CommandItem value={admin.name} key={admin.id} onSelect={() => { form.setValue("editorChoice", admin.id); setOpenCombobox(false); }} >
                                                <Check className={cn("mr-2 h-4 w-4", admin.id === field.value ? "opacity-100" : "opacity-0" )}/>
                                                {admin.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
