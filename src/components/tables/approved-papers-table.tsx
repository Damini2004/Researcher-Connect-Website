
"use client"

import * as React from "react";
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
import { getSubmissions, type Submission } from "@/services/submissionService";
import { useToast } from "@/hooks/use-toast";

export default function ApprovedPapersTable() {
  const { toast } = useToast();
  const [approvedPapers, setApprovedPapers] = React.useState<Submission[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchApprovedPapers = async () => {
      setIsLoading(true);
      try {
        const allSubmissions = await getSubmissions();
        const doneSubmissions = allSubmissions.filter(s => s.status === 'Done');
        setApprovedPapers(doneSubmissions);
      } catch (error) {
        toast({
          title: "Error fetching papers",
          description: "Could not retrieve the list of approved papers.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchApprovedPapers();
  }, [toast]);

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Loading approved papers...</TableCell>
              </TableRow>
            ) : approvedPapers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No approved papers found.</TableCell>
              </TableRow>
            ) : (
              approvedPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell className="font-mono text-xs">{paper.id.substring(0, 6)}...</TableCell>
                  <TableCell className="font-medium">{paper.title}</TableCell>
                  <TableCell>{paper.fullName}</TableCell>
                  <TableCell>{new Date(paper.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Done</Badge>
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
