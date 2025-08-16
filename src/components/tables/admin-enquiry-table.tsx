
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
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Enquiry, getEnquiries, processEnquiry } from "@/services/enquiryService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function AdminEnquiryTable() {
  const [enquiryRequests, setEnquiryRequests] = React.useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isProcessing, setIsProcessing] = React.useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const fetchEnquiries = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiryRequests(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch enquiry requests.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);
  
  const handleAction = async (enquiryId: string, action: 'approve' | 'deny') => {
    setIsProcessing(enquiryId);
    const result = await processEnquiry(enquiryId, action);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
      fetchEnquiries(); // Re-fetch data to update the table
      router.refresh(); // Re-fetches layout data like sidebar count
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsProcessing(null);
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Update Requests</CardTitle>
        <CardDescription>Approve or deny requests from sub-admins to change their profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sub Admin</TableHead>
              <TableHead>Requested Change (Name)</TableHead>
              <TableHead>Requested Change (Email)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading requests...
                </TableCell>
              </TableRow>
            ) : enquiryRequests.length > 0 ? (
              enquiryRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="font-medium">{request.subAdminName}</div>
                  </TableCell>
                   <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">{request.requestedName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{request.currentEmail}</span>
                        <ArrowRight className="h-4 w-4"/>
                        <span className="font-semibold">{request.requestedEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'Pending' ? 'destructive' : 'secondary'}>{request.status}</Badge>
                  </TableCell>
                  <TableCell>
                     {request.status === 'Pending' && (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleAction(request.id, 'approve')} disabled={isProcessing === request.id}>
                                {isProcessing === request.id ? <RefreshCw className="mr-2 h-4 w-4 animate-spin"/> : <Check className="mr-2 h-4 w-4 text-green-500"/>} 
                                Approve
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAction(request.id, 'deny')} disabled={isProcessing === request.id}>
                                {isProcessing === request.id ? <RefreshCw className="mr-2 h-4 w-4 animate-spin"/> : <X className="mr-2 h-4 w-4 text-red-500"/>} 
                                Deny
                            </Button>
                        </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No pending enquiries.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
