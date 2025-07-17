
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getInternships, Internship } from "@/services/internshipService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContactForm from "@/components/forms/contact-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      setIsLoading(true);
      try {
        const data = await getInternships();
        setInternships(data);
      } catch (error) {
        console.error("Failed to fetch internships", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInternships();
  }, []);

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Internship Opportunities</h1>
        <p className="mt-4 text-lg text-muted-foreground">Gain hands-on experience in the world of academic publishing and research.</p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
             <Card key={i}>
                <Skeleton className="h-[250px] w-full" />
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                   <Skeleton className="h-4 w-full mb-2" />
                   <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
          ))}
        </div>
      ) : internships.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map(internship => (
            <Card key={internship.id} className="flex flex-col">
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image src={internship.imageSrc} alt={internship.name} fill className="object-cover"/>
              </div>
              <div className="flex flex-col flex-grow p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle>{internship.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <p className="text-muted-foreground line-clamp-4">{internship.description}</p>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                   <Dialog>
                      <DialogTrigger asChild>
                         <Button>Register Now</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Register for: {internship.name}</DialogTitle>
                          <DialogDescription>
                            Please fill out your details below to apply. We will get back to you shortly.
                          </DialogDescription>
                        </DialogHeader>
                        <ContactForm />
                      </DialogContent>
                   </Dialog>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
            <p>No internship opportunities are available at this time. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
