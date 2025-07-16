"use client"

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

const approvedPapers = [
    { id: 'S001', title: "The Future of AI in Academic Research", author: "Dr. Eva Rostova", date: "2023-10-26" },
    { id: 'S003', title: "A Meta-Analysis of Climate Change Models", author: "Dr. Chloe Bennette", date: "2023-11-15" },
];

export default function ApprovedPapersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvedPapers.map((paper) => (
              <TableRow key={paper.id}>
                <TableCell className="font-mono text-xs">{paper.id}</TableCell>
                <TableCell className="font-medium">{paper.title}</TableCell>
                <TableCell>{paper.author}</TableCell>
                <TableCell>{paper.date}</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Done</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
