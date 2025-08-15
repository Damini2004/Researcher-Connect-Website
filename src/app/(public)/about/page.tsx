// src/app/(public)/about/page.tsx
import { getPageContent } from "@/services/cmsService";
import { Card } from "@/components/ui/card";

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
    <div className="py-12 md:py-24 flex justify-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center mb-12">About Pure Research Insights</h1>
        <Card>
            <div 
                className="prose prose-lg max-w-none p-8"
                dangerouslySetInnerHTML={{ __html: content || "" }} 
            />
        </Card>
      </div>
    </div>
  );
}
