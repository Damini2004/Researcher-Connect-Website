"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const allSubmissions = [
  { id: 'S001', title: "The Future of AI", author: "Dr. Eva Rostova", status: "Done", subAdmin: "Dr. Alisha Gupta", date: "2023-10-26" },
  { id: 'S002', title: "Quantum Impact", author: "Dr. Samuel Greene", status: "In Progress", subAdmin: "Dr. Alisha Gupta", date: "2023-11-05" },
  { id: 'S003', title: "Climate Change Models", author: "Dr. Chloe Bennette", status: "Done", subAdmin: "Dr. Chloe Davis", date: "2023-11-15" },
  { id: 'S004', title: "Advances in Gene-Editing", author: "Dr. Maria Rodriguez", status: "Canceled", subAdmin: "Dr. Chloe Davis", date: "2023-11-20" },
  { id: 'S005', title: "New Economic Theories", author: "Dr. John Smith", status: "Verification Pending", subAdmin: null, date: "2023-12-01" },
];

const statusColors: { [key: string]: string } = {
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Verification Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default function AllJournalsTable() {
  const [filter, setFilter] = useState("");
  const filteredSubmissions = allSubmissions.filter(
    (submission) =>
      submission.title.toLowerCase().includes(filter.toLowerCase()) ||
      submission.author.toLowerCase().includes(filter.toLowerCase()) ||
      submission.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
        <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Filter by ID, title, or author..." 
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
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-mono text-xs">{submission.id}</TableCell>
                <TableCell className="font-medium">{submission.title}</TableCell>
                <TableCell>{submission.author}</TableCell>
                <TableCell>{submission.subAdmin || "Unassigned"}</TableCell>
                <TableCell>
                  <Badge className={`${statusColors[submission.status]}`}>{submission.status}</Badge>
                </TableCell>
                <TableCell>{submission.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
