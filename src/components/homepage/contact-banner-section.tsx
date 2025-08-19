// src/components/homepage/contact-banner-section.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ContactBannerSection() {
    return (
        <section id="contact-banner" className="w-full py-12 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <h3 className="text-2xl font-bold text-center md:text-left">If you have any query related investment... we are available 24/7</h3>
                    <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                        <Link href="/contact-us">Contact Us</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
