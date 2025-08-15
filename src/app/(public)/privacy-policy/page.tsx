// src/app/(public)/privacy-policy/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <p className="text-muted-foreground mb-6">
              Pure Research Insights ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-background rounded-lg px-6 border shadow-sm">
                <AccordionTrigger className="text-left text-lg hover:no-underline">1. Information We Collect</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base space-y-2">
                  <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register for an event, submit a manuscript, or fill out a contact form.</li>
                    <li><strong>Manuscript Data:</strong> Information you provide when you submit a manuscript for publication, including the content of the manuscript itself and any associated metadata.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
               <AccordionItem value="item-2" className="bg-background rounded-lg px-6 border shadow-sm">
                <AccordionTrigger className="text-left text-lg hover:no-underline">2. How We Use Your Information</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base space-y-2">
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Manage the manuscript submission and peer-review process.</li>
                        <li>Communicate with you about your submissions, registrations, or inquiries.</li>
                        <li>Send you information about upcoming conferences, webinars, and other relevant opportunities.</li>
                        <li>Improve our website and services.</li>
                    </ul>
                </AccordionContent>
              </AccordionItem>
              
               <AccordionItem value="item-3" className="bg-background rounded-lg px-6 border shadow-sm">
                <AccordionTrigger className="text-left text-lg hover:no-underline">3. Disclosure of Your Information</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base space-y-2">
                    <p>We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with:</p>
                     <ul className="list-disc pl-6 space-y-1">
                        <li>Peer reviewers and editors for the purpose of evaluating your manuscript.</li>
                        <li>Service providers who perform services for us or on our behalf.</li>
                        <li>If required by law or to protect the rights and safety of our users or others.</li>
                    </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-background rounded-lg px-6 border shadow-sm">
                <AccordionTrigger className="text-left text-lg hover:no-underline">4. Security of Your Information</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base space-y-2">
                  <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-background rounded-lg px-6 border shadow-sm">
                <AccordionTrigger className="text-left text-lg hover:no-underline">5. Your Rights</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base space-y-2">
                  <p>You have the right to access, correct, or delete your personal information. You may also opt-out of receiving promotional communications from us by following the unsubscribe link in our emails. To exercise these rights, please contact us using the contact information provided below.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-background rounded-lg px-6 border shadow-sm">
                <AccordionTrigger className="text-left text-lg hover:no-underline">6. Changes to This Policy</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base space-y-2">
                  <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-background rounded-lg px-6 border shadow-sm">
                <AccordionTrigger className="text-left text-lg hover:no-underline">7. Contact Us</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base space-y-2">
                  <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                  <p><strong>Pure Research Insights</strong></p>
                  <p>Email: <a href="mailto:privacy@pureresearchinsights.com" className="text-primary hover:underline">privacy@pureresearchinsights.com</a></p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
