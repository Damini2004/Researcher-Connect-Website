"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Eye, MailWarning } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const submissions = [
  { id: 'S001', title: "The Future of AI in Academic Research", author: "Dr. Eva Rostova", status: "Done", date: "2023-10-26" },
  { id: 'S002', title: "Quantum Computing's Impact on Cryptography", author: "Dr. Samuel Greene", status: "In Progress", date: "2023-11-05" },
  { id: 'S003', title: "A Meta-Analysis of Climate Change Models", author: "Dr. Chloe Bennette", status: "Done", date: "2023-11-15" },
  { id: 'S004', title: "Advances in Gene-Editing with CRISPR-Cas9", author: "Dr. Maria Rodriguez", status: "Canceled", date: "2023-11-20" },
  { id: 'S005', title: "New Economic Theories for a Digital World", author: "Dr. John Smith", status: "Verification Pending", date: "2023-12-01" },
];

const statusColors: { [key: string]: string } = {
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Verification Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default function JournalSubmissionsTable() {
  const { toast } = useToast();

  const handleAlert = (authorEmail: string, title: string) => {
    toast({
      title: "Alert Sent",
      description: `An email has been sent to ${authorEmail} regarding "${title}".`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions for Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-mono text-xs">{submission.id}</TableCell>
                <TableCell className="font-medium max-w-xs truncate">{submission.title}</TableCell>
                <TableCell>{submission.author}</TableCell>
                <TableCell>
                  <Select defaultValue={submission.status}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Verification Pending">Verification Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{submission.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleAlert(`${submission.author.split(' ').pop()?.toLowerCase()}@example.com`, submission.title)}>
                      <MailWarning className="h-4 w-4 mr-2" />
                      Alert
                    </Button>
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
