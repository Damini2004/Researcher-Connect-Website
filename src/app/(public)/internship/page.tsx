
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getInternships, Internship } from "@/services/internshipService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContactForm from "@/components/forms/contact-form";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, ArrowRight } from "lucide-react";

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const data = await getInternships();
        setInternships(data);
      } catch (error) {
        console.error("Failed to fetch internships", error);
        toast({
            title: "Error",
            description: "Could not load internship opportunities. Please try again later.",
            variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInternships();
  }, [toast]); 

  const handleDownloadBrochure = (brochureUrl: string, internshipName: string) => {
    if (!brochureUrl) return;

    const link = document.createElement('a');
    link.href = brochureUrl;

    // Extract file type from data URI
    const mimeType = brochureUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    let fileExtension = 'file';
    if (mimeType && mimeType.length > 1) {
        if (mimeType[1] === 'application/pdf') fileExtension = 'pdf';
        else if (mimeType[1] === 'application/msword') fileExtension = 'doc';
        else if (mimeType[1] === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') fileExtension = 'docx';
    }

    link.download = `Brochure-${internshipName.replace(/\s/g, '_')}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="py-12 md:py-24">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Internship Opportunities</h1>
        <p className="mt-4 text-lg text-muted-foreground">Gain hands-on experience in the world of academic publishing and research.</p>
      </div>

      <section className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
              <Logo className="h-32 w-32" />
          </div>
        ) : internships.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {internships.map(internship => (
              <Card key={internship.id} className="flex flex-col w-full max-w-sm mx-auto overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-[250px] w-full">
                  <Image src={internship.imageSrc} alt={internship.name} fill className="object-cover" data-ai-hint="internship opportunity"/>
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>{internship.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <p className="text-muted-foreground line-clamp-4">{internship.description}</p>
                  </CardContent>
                  <CardFooter className="p-0 mt-6 flex flex-col items-start gap-3">
                    <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                              Register Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
                          <DialogHeader>
                            <DialogTitle>Apply for: {internship.name}</DialogTitle>
                            <DialogDescription>
                              Please fill out your details below to apply. We will get back to you shortly.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex-grow overflow-y-auto pr-6 -mr-2">
                              <ScrollArea className="h-full">
                                  <ContactForm 
                                    inquiryType="Internship Application"
                                    details={internship.name}
                                  />
                              </ScrollArea>
                          </div>
                        </DialogContent>
                    </Dialog>
                    <Button 
                        variant="outline" 
                        className="w-full"
                        disabled={!internship.brochureUrl}
                        onClick={() => handleDownloadBrochure(internship.brochureUrl!, internship.name)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Brochure
                      </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-center py-16 text-muted-foreground">
              <p>No internship opportunities are available at this time. Please check back later.</p>
          </div>
        )}
      </section>
    </div>
  );
}
