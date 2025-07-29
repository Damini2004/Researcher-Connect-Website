import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Pure Research Insights</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Pure Research Insights is dedicated to transforming the landscape of academic publishing. We believe in the power of technology to bridge the gap between brilliant research and global dissemination. Our platform is built by researchers, for researchers, with the goal of making the submission and review process as seamless and efficient as possible.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            By leveraging cutting-edge AI and a user-centric design, we empower authors to share their work with the world, and provide editors and reviewers with the tools they need to maintain the highest standards of academic integrity.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&h=500&auto=format&fit=crop"
            width={500}
            height={500}
            alt="Team"
            data-ai-hint="collaboration team"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
