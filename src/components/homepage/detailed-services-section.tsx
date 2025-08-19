// src/components/homepage/detailed-services-section.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";

export function DetailedServicesSection() {
    return (
        <section id="our-services-detailed" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl gap-y-16 mt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&h=600&auto=format&fit=crop" alt="Business Consulting" width={800} height={600} className="rounded-lg object-cover" data-ai-hint="team collaboration" />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Business Consulting</h3>
                  <p className="text-muted-foreground">As one of the world's largest accountancy networks, Elixir helps a diverse range of clients with a diverse range of needs. This is especially true of our Advisory Practice, which provides corporate finance and transaction services, business restructuring.</p>
                  <Button variant="link" className="p-0 h-auto">Learn More <ArrowRight className="ml-2" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4 lg:order-last">
                  <Image src="https://images.unsplash.com/photo-1556742044-53c85d8a9568?q=80&w=800&h=600&auto=format&fit=crop" alt="Tax Consulting" width={800} height={600} className="rounded-lg object-cover" data-ai-hint="tax documents" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Tax consulting</h3>
                  <p className="text-muted-foreground">Elixir serves clients across the country and around the world as they navigate an increasingly complex tax landscape. Our tax professionals draw on deep experience and industry-specific knowledge to deliver clients the insights and innovation they need.</p>
                  <Button variant="link" className="p-0 h-auto">Learn More <ArrowRight className="ml-2" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Image src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&h=600&auto=format&fit=crop" alt="Advisory" width={800} height={600} className="rounded-lg object-cover" data-ai-hint="advisory meeting" />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Advisory</h3>
                  <p className="text-muted-foreground">To help you understand what this road looks like, we surveyed 1,165 digital marketers across Europe and North America to explore current trends and priorities in digital marketing.</p>
                  <Button variant="link" className="p-0 h-auto">Learn More <ArrowRight className="ml-2" /></Button>
                </div>
              </div>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-12">
                <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Special financing</h4>
                        <p className="text-sm text-muted-foreground">Apply for special financial support and earn exclusive rewards.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Chat with team</h4>
                        <p className="text-sm text-muted-foreground">Have a question? Chat online with an expert. <a href="#" className="underline">Start chatting</a></p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold">Call a specialist</h4>
                        <p className="text-sm text-muted-foreground">Our 24/7 support team is ready for you at 1-800-MY-Elixir.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
    );
}
