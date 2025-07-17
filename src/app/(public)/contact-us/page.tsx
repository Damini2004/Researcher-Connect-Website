import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/forms/contact-form";

export default function ContactUsPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">We'd love to hear from you. Whether you have a question, feedback, or need support, our team is ready to help.</p>
        </div>

        <Card className="max-w-3xl mx-auto mb-16 shadow-xl border-primary/10">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Send us a Message</CardTitle>
            <CardDescription className="text-center">Fill out the form and we'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Other Ways to Connect</h2>
            <p className="mt-3 text-muted-foreground">Find us through our other channels.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">General: <a href="mailto:contact@journaledge.com" className="text-primary hover:underline">contact@journaledge.com</a></p>
                <p className="text-muted-foreground">Support: <a href="mailto:support@journaledge.com" className="text-primary hover:underline">support@journaledge.com</a></p>
            </Card>
             <Card className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
            </Card>
            <Card className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <p className="text-muted-foreground">123 Research Parkway</p>
                <p className="text-muted-foreground">Cambridge, MA 02139, USA</p>
            </Card>
        </div>
      </div>
    </div>
  );
}
