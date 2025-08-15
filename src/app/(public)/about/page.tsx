// src/app/(public)/about/page.tsx
import { getPageContent } from "@/services/cmsService";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="py-12 md:py-24 flex justify-center bg-secondary/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center mb-12">About Pure Research Insights</h1>
        <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-0">
                <div 
                    className="prose prose-lg max-w-none p-8 prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto bg-card text-card-foreground"
                    dangerouslySetInnerHTML={{ __html: content || "" }} 
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
