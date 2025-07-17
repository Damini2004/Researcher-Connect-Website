
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
import { SubAdmin } from "@/services/subAdminService";

const statusConfig = {
    approved: { label: "Approved", icon: CheckCircle, color: "text-green-500" },
    pending: { label: "Pending", icon: Clock, color: "text-yellow-500" },
    denied: { label: "Denied", icon: XCircle, color: "text-red-500" },
};

interface SubAdminTableProps {
  subAdmins: SubAdmin[];
  isLoading: boolean;
}

export default function SubAdminTable({ subAdmins, isLoading }: SubAdminTableProps) {
  const [filter, setFilter] = useState("");

  const filteredAdmins = subAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(filter.toLowerCase()) ||
      admin.email.toLowerCase().includes(filter.toLowerCase()) ||
      admin.phone.toLowerCase().includes(filter.toLowerCase()) ||
      admin.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Sub Admins</CardTitle>
        <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Filter by name, email, phone..." 
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
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">Loading...</TableCell>
              </TableRow>
            ) : filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => {
                const statusInfo = statusConfig[admin.status as keyof typeof statusConfig];
                return (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">{admin.address}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center w-fit gap-2">
                          <statusInfo.icon className={`h-3 w-3 ${statusInfo.color}`} />
                          {statusInfo.label}
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
              })
            ) : (
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        No sub-admins found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
