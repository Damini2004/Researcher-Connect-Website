// src/app/(public)/about/page.tsx
import { getPageContent } from "@/services/cmsService";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

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
    <div className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Researcher Connect</h1>
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
      </div>
    </div>
  );
}
