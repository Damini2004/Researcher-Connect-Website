
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getJournals, Journal } from "@/services/journalService";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DigitalLibraryPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchJournals = async () => {
      setIsLoading(true);
      try {
        const data = await getJournals();
        setJournals(data);
      } catch (error) {
        console.error("Failed to fetch journals", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const filteredJournals = journals.filter(journal =>
    journal.journalName.toLowerCase().includes(filter.toLowerCase()) ||
    journal.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container py-12 md:py-24 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Journal Listing</h1>
        <p className="mt-4 text-lg text-muted-foreground">Browse through our extensive collection of journals published with Pure Research Insights.</p>
        <div className="relative mt-6 max-w-lg mx-auto">
          <Input 
            placeholder="Search by title, or description..." 
            className="pl-10 h-12"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <Card key={i}>
                    <Skeleton className="w-full h-[300px]" />
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-1/4" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-10 w-full" />
                    </CardFooter>
                </Card>
            ))}
         </div>
      ) : (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJournals.map(journal => (
                <Card key={journal.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
                    <Image 
                        src={journal.imageSrc}
                        alt={`Cover for ${journal.journalName}`}
                        width={400}
                        height={300}
                        data-ai-hint="journal cover"
                        className="w-full object-cover"
                    />
                    <div className="flex flex-col flex-grow">
                        <CardHeader>
                            <CardTitle className="text-xl leading-snug">{journal.journalName}</CardTitle>
                            <CardDescription className="pt-1 line-clamp-2">{journal.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2">
                            <p className="text-sm text-muted-foreground">Status: {journal.status}</p>
                            <Link href="#" className="text-sm text-primary hover:underline">
                                Read more...
                            </Link>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="secondary" className="w-full">
                                <Link href="#">
                                    View Full Text <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </div>
                </Card>
                ))}
            </div>
            {filteredJournals.length > 0 && (
                <div className="mt-12 text-center">
                    <Button size="lg">Load More Publications</Button>
                </div>
            )}
            {filteredJournals.length === 0 && (
                 <div className="text-center py-16 text-muted-foreground">
                    <p>No journals found matching your search criteria.</p>
                </div>
            )}
        </>
      )}
    </div>
  );
}
