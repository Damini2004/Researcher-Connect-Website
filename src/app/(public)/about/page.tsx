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
    return "";
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
            
             <Card className="max-w-4xl mx-auto shadow-lg">
              <div className="grid md:grid-cols-2 items-center">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&auto=format=fit=crop"
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

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Company Overview</h2>
                    <div className="mt-2 w-24 h-1 bg-primary mx-auto" />
                </div>
                <div className="space-y-8 text-muted-foreground">
                    <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-3">Earning the right</h3>
                        <p>
                            As a first-order business consulting firm, we help companies, foundations and individuals make a difference. Our work gets to the heart of the matter. We break silos because it takes more than any one check or policy or letter to tackle big issues like economic security, human rights or climate sustainability. We prescribe a custom formula of advocacy, collaboration, investment, philanthropy, policy and new ways of doing business in order to help you make progress.
                        </p>
                    </div>

                    <div className="relative border-l-4 border-primary pl-10 py-4 bg-background rounded-r-lg">
                        <svg className="absolute left-2 top-4 h-8 w-8 text-muted" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                            <path d="M9.981 3c-2.9 0-5.58 1.9-5.58 4.7 0 1.9 1.1 3.5 2.7 4.1.1.1.2.1.2.2v.1l-.1.1c-1.3.4-2.8 1.5-2.8 3.5 0 2.2 1.9 3.6 4.1 3.6h.1V22h-3v3h3v2h3v-2h5v-3h-5v-5.2c0-2.4-1.6-4.1-4-4.5.3-.3.5-.7.5-1.1 0-1-1-1.9-2.1-1.9zM23.981 3c-2.9 0-5.58 1.9-5.58 4.7 0 1.9 1.1 3.5 2.7 4.1.1.1.2.1.2.2v.1l-.1.1c-1.3.4-2.8 1.5-2.8 3.5 0 2.2 1.9 3.6 4.1 3.6h.1V22h-3v3h3v2h3v-2h5v-3h-5v-5.2c0-2.4-1.6-4.1-4-4.5.3-.3.5-.7.5-1.1 0-1-1-1.9-2.1-1.9z"></path>
                        </svg>
                        <blockquote className="text-xl italic text-foreground font-semibold">
                            But how do we do it? We like to call it earning the right, walking the talk and playing the game...
                        </blockquote>
                    </div>

                    <div className="grid grid-cols-1">
                        <p className="md:columns-2 gap-8">
                            <span className="float-left text-7xl font-bold text-primary mr-3 -mt-2 leading-none">E</span>lixir serves to help people with creative ideas succeed. Our platform empowers millions of people — from individuals and local artists to entrepreneurs shaping the world’s most iconic businesses — to share their stories and create an impactful, stylish, and easy-to-manage online presence. The Cambridge office is the home of the Risk management practice. We work to assure the safe performance of complex critical systems; develop safety leadership and culture; manage safety and risk in high-hazard industries; understand complex project risks, measure and report risk performance. We work across a wide range of industries and public sector organizations that include upstream and downstream oil and gas; rail and road transportation; construction; and gas utilities and distribution. We work worldwide in Europe, Middle East and Asia, Africa and South America based out of our offices in Cambridge, UK and Milan, Italy.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
}
