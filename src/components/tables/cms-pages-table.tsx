// src/components/tables/cms-pages-table.tsx
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
import { Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CmsPage } from "@/services/cmsService";

interface CmsPagesTableProps {
  pages: CmsPage[];
  isLoading: boolean;
  onEdit: (page: CmsPage) => void;
}

export default function CmsPagesTable({ pages, isLoading, onEdit }: CmsPagesTableProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Title</TableHead>
              <TableHead>URL Path</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading pages...
                </TableCell>
              </TableRow>
            ) : pages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No pages found. This might be an initialization error.
                </TableCell>
              </TableRow>
            ) : (
              pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>
                    <a href={page.path} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {page.path}
                    </a>
                  </TableCell>
                  <TableCell>
                    {page.updatedAt ? new Date(page.updatedAt).toLocaleString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(page)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Content
                    </Button>
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
