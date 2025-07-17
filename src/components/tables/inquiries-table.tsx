
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Archive, MailOpen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getInquiries, type Inquiry } from "@/services/inquiryService";
import { useToast } from "@/hooks/use-toast";

export default function InquiriesTable() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchInquiries() {
      setIsLoading(true);
      try {
        const fetchedInquiries = await getInquiries();
        setInquiries(fetchedInquiries);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch inquiries.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchInquiries();
  }, [toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inbox</CardTitle>
        <CardDescription>Review and manage user inquiries from the contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead className="hidden md:table-cell">Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading inquiries...
                </TableCell>
              </TableRow>
            ) : inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id} data-state={inquiry.status === 'New' ? 'selected' : ''} className="data-[state=selected]:bg-muted/50">
                  <TableCell>
                      <div className="font-medium">{inquiry.name}</div>
                      <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-sm truncate">{inquiry.subject}</TableCell>
                  <TableCell>
                    <Badge variant={inquiry.status === 'New' ? 'default' : 'secondary'}>{inquiry.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(inquiry.date).toLocaleDateString()}</TableCell>
                  <TableCell>
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
                          <MailOpen className="mr-2 h-4 w-4" /> Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" /> Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No inquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
