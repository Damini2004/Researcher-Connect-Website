
// src/app/(public)/contact-us/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ChevronRight, Linkedin, Instagram, Facebook } from "lucide-react";
import ContactForm from "@/components/forms/contact-form";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Researcher Connect team. Find our office locations, contact details, and use our form to send us a message directly.',
};


const contactCards = [
    {
        title: "Nagpur Office",
        lines: ["202, Planet Apartment, Jaywant Nagar, Omkar Nagar, Nagpur, Maharashtra 440027"],
        icon: MapPin,
    },
    {
        title: "Pune Office",
        lines: ["702, Westport Baner Pune Maharashtra India."],
        icon: MapPin,
    },
];

const socialLinks = [
    { href: "https://www.linkedin.com/company/researcher-connect/", icon: Linkedin },
    { href: "https://www.instagram.com/researcher_connect?igsh=MTRhbjZ4dHczcHBrbw==", icon: Instagram },
    { href: "https://www.facebook.com/researcherconnect.net", icon: Facebook },
    { href: "mailto:contact@researcherconnect.com", icon: Mail },
];


export default function ContactUsPage() {
  return (
    <div className="bg-background">
      <section className="relative w-full h-[300px] bg-gray-800 text-white">
          <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&h=300&auto=format&fit=crop"
              alt="Team working together"
              data-ai-hint="team collaboration"
              fill
              className="object-cover opacity-20"
          />
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
              <h1 className="text-5xl font-extrabold tracking-tight">Contact</h1>
          </div>
      </section>
      
      <div className="py-12 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {contactCards.map((card) => (
                    <Card key={card.title} className="border-0 shadow-none">
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {card.lines.map((line, index) => (
                                    <span key={index}>{line}<br/></span>
                                ))}
                            </p>
                        </CardContent>
                    </Card>
                ))}
                 <Card className="border-0 shadow-none">
                    <CardHeader>
                        <CardTitle>Socials</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <Link key={index} href={social.href} className="text-muted-foreground hover:text-primary">
                                    <social.icon className="h-6 w-6"/>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Write to us</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
