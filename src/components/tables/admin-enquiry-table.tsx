
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Mock data for profile update requests.
// In a real app, this would be fetched from a database.
const enquiryRequests = [
  {
    id: 'REQ001',
    subAdminName: 'Dr. Alisha Gupta',
    requestDate: '2023-06-10',
    currentEmail: 'alisha.g@example.com',
    requestedEmail: 'alisha.gupta.updates@example.com',
    status: 'Pending',
  },
  {
    id: 'REQ002',
    subAdminName: 'Dr. Ben Carter',
    requestDate: '2023-06-12',
    currentEmail: 'ben.c@example.com',
    requestedEmail: 'ben.carter.new@example.com',
    status: 'Pending',
  },
];

export default function AdminEnquiryTable() {
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
              <TableHead>Requested Change</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiryRequests.length > 0 ? (
              enquiryRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="font-medium">{request.subAdminName}</div>
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
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Check className="mr-2 h-4 w-4 text-green-500"/> Approve
                        </Button>
                        <Button variant="outline" size="sm">
                             <X className="mr-2 h-4 w-4 text-red-500"/> Deny
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
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
