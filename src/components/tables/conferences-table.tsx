
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { deleteConference, updateConferenceStatus } from "@/services/conferenceService";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import type { Conference } from "@/lib/types";
import { Badge } from "../ui/badge";

interface ConferencesTableProps {
  conferences: Conference[];
  isLoading: boolean;
  onEdit: (conference: Conference) => void;
  onConferenceDeleted: () => void;
}

export default function ConferencesTable({ conferences, isLoading, onEdit, onConferenceDeleted }: ConferencesTableProps) {
  const { toast } = useToast();
  const [filter, setFilter] = React.useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedConference, setSelectedConference] = React.useState<Conference | null>(null);
  
  const handleDeleteClick = (conference: Conference) => {
    setSelectedConference(conference);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedConference) return;

    const result = await deleteConference(selectedConference.id);
    if (result.success) {
      onConferenceDeleted();
    } else {
       toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedConference(null);
  }

  const handleStatusToggle = async (conference: Conference) => {
    const newStatus = conference.status === 'active' ? 'inactive' : 'active';
    const result = await updateConferenceStatus(conference.id, newStatus);
    if (result.success) {
      toast({
        title: "Status Updated",
        description: `Conference "${conference.title}" is now ${newStatus}.`,
      });
      onConferenceDeleted(); // This re-fetches data
    } else {
       toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  const filteredConferences = conferences.filter(
    (conference) =>
      conference.title.toLowerCase().includes(filter.toLowerCase()) ||
      conference.description.toLowerCase().includes(filter.toLowerCase()) ||
      conference.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Conferences</CardTitle>
          <CardDescription>View, manage, and delete conference listings.</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by title, description, or location..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    Loading conferences...
                  </TableCell>
                </TableRow>
              ) : filteredConferences.length === 0 ? (
                  <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                          No conferences found.
                      </TableCell>
                  </TableRow>
              ) : (
                filteredConferences.map((conference) => (
                  <TableRow key={conference.id}>
                    <TableCell>
                      <Image
                        src={conference.imageSrc || "https://placehold.co/100x64.png"}
                        alt={conference.title}
                        width={100}
                        height={64}
                        data-ai-hint="conference"
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{conference.title}</TableCell>
                    <TableCell>{conference.date}</TableCell>
                    <TableCell>
                      <Badge variant={conference.status === 'active' ? 'default' : 'secondary'} className={conference.status === 'active' ? 'bg-green-500' : ''}>
                        {conference.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{conference.location}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
                           <DropdownMenuItem onSelect={() => onEdit(conference)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                           <DropdownMenuItem onSelect={() => handleStatusToggle(conference)}>
                            {conference.status === 'active' ? (
                                <XCircle className="mr-2 h-4 w-4" />
                            ) : (
                                <CheckCircle className="mr-2 h-4 w-4" />
                            )}
                            Set to {conference.status === 'active' ? 'Inactive' : 'Active'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onSelect={() => handleDeleteClick(conference)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              conference "{selectedConference?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
