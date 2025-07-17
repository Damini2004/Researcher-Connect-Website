
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2 } from "lucide-react";
import { getJournals, Journal } from "@/services/journalService";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const statusColors: { [key: string]: string } = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Inactive: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Archived: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function AllJournalsTable() {
  const { toast } = useToast();
  const [journals, setJournals] = React.useState<Journal[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    async function fetchJournals() {
      setIsLoading(true);
      try {
        const fetchedJournals = await getJournals();
        setJournals(fetchedJournals);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch journals.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchJournals();
  }, [toast]);

  const filteredJournals = journals.filter(
    (journal) =>
      journal.journalName.toLowerCase().includes(filter.toLowerCase()) ||
      journal.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Journals</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by name or description..."
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
              <TableHead>Cover</TableHead>
              <TableHead>Journal Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Loading journals...
                </TableCell>
              </TableRow>
            ) : filteredJournals.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                        No journals found.
                    </TableCell>
                </TableRow>
            ) : (
              filteredJournals.map((journal) => (
                <TableRow key={journal.id}>
                  <TableCell>
                    <Image
                      src={journal.imageSrc}
                      alt={journal.journalName}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{journal.journalName}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-sm truncate">
                    {journal.description}
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={journal.status}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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
  );
}
