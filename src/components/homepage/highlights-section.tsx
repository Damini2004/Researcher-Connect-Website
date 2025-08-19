// src/components/homepage/highlights-section.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HighlightsSection() {
    return (
        <section id="highlights" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">Highlights</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Visuals from the Forefront of Research</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore stunning imagery and visualizations from papers published through Researcher Connect.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=400&h=300&auto=format&fit=crop"
                  alt="Cosmic Structures"
                  width={400}
                  height={300}
                  data-ai-hint="galaxy stars"
                  className="h-auto w-full object-cover"
                />
                <CardContent className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold">Cosmic Structures</h3>
                  <p className="text-sm text-muted-foreground mt-1">By Dr. Evelyn Reed</p>
                  <p className="mt-4 text-muted-foreground flex-1">
                    A deep dive into the large-scale web of the universe, mapping out galaxies and dark matter.
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-primary inline-flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&h=300&auto=format&fit=crop"
                  alt="Genetic Sequencing"
                  width={400}
                  height={300}
                  data-ai-hint="dna strand"
                  className="h-auto w-full object-cover"
                />
                <CardContent className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold">Genetic Sequencing</h3>
                   <p className="text-sm text-muted-foreground mt-1">By Dr. Kenji Tanaka</p>
                  <p className="mt-4 text-muted-foreground flex-1">
                    Visualizing the code of life through advanced sequencing techniques and computational biology.
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-primary inline-flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="https://images.unsplash.com/photo-1694833256053-53538407f354?q=80&w=400&h=300&auto=format&fit=crop"
                  alt="Neural Pathways"
                  width={400}
                  height={300}
                  data-ai-hint="neural network"
                  className="h-auto w-full object-cover"
                />
                <CardContent className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold">Neural Pathways</h3>
                   <p className="text-sm text-muted-foreground mt-1">By Dr. Fatima Al-Jamil</p>
                  <p className="mt-4 text-muted-foreground flex-1">
                   Exploring the intricate architecture of thought and consciousness through brain mapping.
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-primary inline-flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
             <div className="mt-12 text-center">
              <Button asChild>
                <Link href="/publications">
                  Explore All Publications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
    );
}
