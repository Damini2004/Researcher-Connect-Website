// src/app/(public)/privacy-policy/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { getPageContent } from "@/services/cmsService";

async function getPolicyContent() {
    const result = await getPageContent("privacy-policy");
    if (result.success) {
        return result.content;
    }
    return "<p>Error loading content. Please try again later.</p>";
}

export default async function PrivacyPolicyPage() {
  const content = await getPolicyContent();
  
  return (
    <div className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-lg max-w-none prose-h3:font-semibold prose-h3:text-lg prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: content || "" }} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
