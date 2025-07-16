import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookCheck, BrainCircuit, Microscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-background z-0"></div>
          <div className="container px-4 md:px-6 z-10 relative">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl">
                    <span className="block">Streamline Your Research</span>
                    <span className="block text-primary">with JournalEdge</span>
                  </h1>
                  <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                    The ultimate platform for seamless journal submission, intelligent review, and publication management. Powered by AI.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/submit-journal">
                    <Button size="lg" className="w-full sm:w-auto">
                      Submit Your Paper
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <Image
                  src="https://placehold.co/600x400.png"
                  width="600"
                  height="400"
                  alt="Hero"
                  data-ai-hint="research academic"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last relative"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Accelerate Your Publication Journey</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  JournalEdge provides a comprehensive suite of tools to support researchers, editors, and publishers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-transparent hover:border-primary/30">
                <CardHeader className="items-center text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit">
                    <BrainCircuit className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="mt-4 text-xl">AI-Powered Tagging</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Our intelligent system automatically suggests relevant tags for your submissions, improving discoverability and matching with reviewers.</p>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-transparent hover:border-primary/30">
                <CardHeader className="items-center text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit">
                     <BookCheck className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="mt-4 text-xl">Efficient Submission</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">A user-friendly form and dashboard for authors to submit and track their manuscripts with ease.</p>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-transparent hover:border-primary/30">
                <CardHeader className="items-center text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit">
                     <Microscope className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="mt-4 text-xl">Robust Admin Tools</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Multi-level admin roles for verifying submissions, managing users, and overseeing the entire publication process.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 JournalEdge. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-xs hover:underline underline-offset-4">Admin Login</Link>
          <Link href="/contact-us" className="text-xs hover:underline underline-offset-4">Contact</Link>
        </nav>
      </footer>
    </div>
  );
}
