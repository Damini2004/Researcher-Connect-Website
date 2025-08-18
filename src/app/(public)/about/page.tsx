// src/app/(public)/about/page.tsx
import { getPageContent } from "@/services/cmsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

async function getAboutContent() {
    const result = await getPageContent("about");
    if (result.success) {
        return result.content;
    }
    return "<p>Error loading content. Please try again later.</p>";
}

export default async function AboutPage() {
  const content = await getAboutContent();
  
  return (
    <div>
        <section className="relative w-full h-[300px] bg-gray-800 text-white">
            <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&h=300&auto=format&fit=crop"
                alt="Team working together"
                data-ai-hint="team collaboration"
                fill
                className="object-cover opacity-20"
            />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <h1 className="text-5xl font-extrabold tracking-tight">About Us</h1>
                <div className="flex items-center text-sm text-white/80 mt-2">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="font-semibold text-white">About</span>
                </div>
            </div>
        </section>

        <div className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container px-4 md:px-6 space-y-16">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">About Researcher Connect</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our mission to advance knowledge and foster innovation by connecting the brightest minds from around the globe.
              </p>
            </div>
            <Card className="shadow-xl overflow-hidden border-primary/10">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12 order-2 md:order-1">
                   <div 
                      className="prose prose-lg max-w-none prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto text-card-foreground"
                      dangerouslySetInnerHTML={{ __html: content || "" }} 
                    />
                </div>
                <div className="relative order-1 md:order-2 h-64 md:h-full min-h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&h=600&auto=format&fit=crop"
                    alt="About Us Image"
                    data-ai-hint="team collaboration"
                    fill
                    className="object-cover"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </Card>

             <Card className="max-w-4xl mx-auto shadow-lg">
              <div className="grid md:grid-cols-2 items-center">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&auto=format&fit=crop"
                    alt="CEO Portrait"
                    data-ai-hint="ceo portrait"
                    fill
                    className="object-cover rounded-l-lg"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <h3 className="text-xl font-bold text-primary mb-4">Message From CEO</h3>
                  <p className="text-muted-foreground mb-6">
                    Elixir co-operates with clients in solving the hardest problems they face in their businesses—and the world. We do this by channeling the diversity of our people and their thinking.
                  </p>
                  <div className="flex flex-col items-start">
                    <div className="relative w-24 h-12 mb-2">
                        <Image src="https://logodix.com/logo/10131.png" alt="Signature" data-ai-hint="signature text" fill className="object-contain" />
                    </div>
                    <p className="font-bold text-lg text-foreground">RENAL SCOTT</p>
                    <p className="text-sm text-muted-foreground">UK office</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
    </div>
  );
}
