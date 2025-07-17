

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, PlusCircle } from "lucide-react";
import AddJournalForm from "@/components/forms/add-journal-form";
import { getJournals, Journal } from "@/services/journalService";

const statusColors: { [key: string]: string } = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Inactive: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Archived: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Verification Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default async function ViewJournalsPage() {
  const journals = await getJournals();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">All Journals</h1>
            <p className="text-muted-foreground">A complete list of all journals in the system.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Journal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Journal</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new journal to the system.
              </DialogDescription>
            </DialogHeader>
            <AddJournalForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {journals.map(journal => (
          <Card key={journal.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
            <Image 
                src={journal.imageSrc}
                alt={`Cover for ${journal.journalName}`}
                width={400}
                height={300}
                data-ai-hint="journal cover"
                className="w-full object-cover"
            />
            <div className="flex flex-col flex-grow">
                <CardHeader className="flex-row items-start justify-between">
                    <div>
                        <CardTitle className="text-xl leading-snug">{journal.journalName}</CardTitle>
                        <CardDescription className="pt-1 line-clamp-2">{journal.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <p className="text-sm text-muted-foreground">ID: <span className="font-mono">{journal.id}</span></p>
                </CardContent>
                <CardFooter>
                  <Badge className={`${statusColors[journal.status]} w-full justify-center`}>{journal.status}</Badge>
                </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
