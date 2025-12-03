
import Link from "next/link";
import { Logo } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, Facebook, Mail } from "lucide-react";

const quickLinks = [
    { href: "/contact-us", label: "Contact Us" },
    { href: "/conference/faq", label: "FAQ" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/#", label: "Terms of Use" },
]

const servicesLinks = [
    { href: "/services/software-solutions", label: "Software Solutions" },
    { href: "/conference", label: "Conference Management" },
    { href: "/services/collaboration-services", label: "Collaboration Services" },
    { href: "/internship", label: "Internship Services" },
    { href: "/services/author-services", label: "Author Services" },
    { href: "/services/patent-consultancy", label: "Patent Drafting Services" },
];

const socialLinks = [
    { href: "https://www.linkedin.com/company/researcherconnect/", icon: Linkedin, label: "Linkedin" },
    { href: "https://www.instagram.com/researcher_connect?igsh=MTRhbjZ4dHczcHBrbw==", icon: Instagram, label: "Instagram" },
    { href: "https://www.facebook.com/profile.php?id=61583580994300", icon: Facebook, label: "Facebook" },
    { href: "mailto:contact@researcherconnect.com", icon: Mail, label: "Mail" },
]

const Footer = () => {
    return (
        <footer className="bg-[#3D4C6F] text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                    {/* Column 1: Logo & About */}
                    <div className="md:col-span-4 flex flex-col items-center text-center">
                        <Link href="/" className="inline-block mb-4">
                            <Logo className="h-40 w-40" />
                        </Link>
                        <p className="text-gray-300 text-sm max-w-xs text-justify">
                            We look forward to helping you take your profile to new heights with our expert consultancy and services.
                        </p>
                    </div>

                    {/* Column 2: Services */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold text-lg mb-4">Our Services</h4>
                         <ul className="space-y-3 text-gray-300">
                            {servicesLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors text-sm">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                         <ul className="space-y-3 text-gray-300">
                            {quickLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors text-sm">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Social Links */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
                        <ul className="space-y-3 text-gray-300">
                           {socialLinks.map((link, index) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="flex items-center gap-3 hover:text-white transition-colors">
                                        <div className="bg-[#303d5c] p-2 rounded-sm">
                                            <link.icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Bottom bar */}
            <div className="border-t border-gray-700/50">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    <div className="mb-4 md:mb-0">
                         <p>&copy; Copyright 2025 Researcher Connect. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
