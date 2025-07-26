
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export default function ConferenceSidebarForm() {
  return (
    <Card>
      <CardHeader className="text-center bg-muted/50">
        <CardTitle>Get Know More Details About</CardTitle>
        <CardDescription>Conferences, Journal & Publication</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Enter your phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="journal">Journal</SelectItem>
                <SelectItem value="publication">Publication</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="captcha" />
            <Label htmlFor="captcha" className="text-sm">
              I'm not a robot
            </Label>
          </div>
          <Button className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
