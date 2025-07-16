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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, CheckCircle, XCircle, Edit, Trash2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const subAdmins = [
  { id: 1, name: "Dr. Alisha Gupta", email: "alisha.g@example.com", status: "approved", joinDate: "2023-01-15" },
  { id: 2, name: "Dr. Ben Carter", email: "ben.c@example.com", status: "pending", joinDate: "2023-03-22" },
  { id: 3, name: "Dr. Chloe Davis", email: "chloe.d@example.com", status: "approved", joinDate: "2022-11-30" },
  { id: 4, name: "Dr. David Rodriguez", email: "david.r@example.com", status: "denied", joinDate: "2023-05-10" },
];

const statusConfig = {
    approved: { label: "Approved", icon: CheckCircle, color: "bg-green-500" },
    pending: { label: "Pending", icon: Clock, color: "bg-yellow-500" },
    denied: { label: "Denied", icon: XCircle, color: "bg-red-500" },
};

export default function SubAdminTable() {
  const [filter, setFilter] = useState("");
  const filteredAdmins = subAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(filter.toLowerCase()) ||
      admin.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Sub Admins</CardTitle>
        <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Filter by name or email..." 
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.map((admin) => {
              const status = statusConfig[admin.status as keyof typeof statusConfig];
              return (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center w-fit">
                        <status.icon className={`mr-2 h-3 w-3 ${status.color.replace('bg-', 'text-')}`} />
                        {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{admin.joinDate}</TableCell>
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
                        {admin.status === "pending" && (
                            <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4"/>
                                Approve
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4"/>
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
