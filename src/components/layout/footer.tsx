import Link from "next/link";
import { Logo } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Youtube, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

const quickLinks = [
    { href: "#", label: "Become a partner" },
    { href: "#", label: "Refer & Earn" },
    { href: "#", label: "Talk to an Expert" },
    { href: "#", label: "Sitemap" },
    { href: "#", label: "Pay now" },
    { href: "#", label: "Our Policies" },
    { href: "/about", label: "Blog" },
    { href: "/contact-us", label: "Contact Us" },
]

const exploreLinks = [
    { href: "#", label: "Labtech Studio" },
    { href: "/about", label: "Careers" },
    { href: "/research-support", label: "Research Support" },
    { href: "#", label: "Membership" },
    { href: "#", label: "Community" },
    { href: "#", label: "Scholarship" },
    { href: "/internship", label: "Internship" },
]

const socialLinks = [
    { href: "#", icon: Linkedin },
    { href: "#", icon: Twitter },
    { href: "#", icon: Youtube },
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
]

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
)


const Footer = () => {
    return (
        <footer className="bg-[#212121] text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Info */}
                    <div className="space-y-4">
                        <Logo className="h-24 w-24 text-[#D32F2F]" />
                        <div className="space-y-2 text-sm text-gray-400">
                            <p className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 text-[#D32F2F] flex-shrink-0" />
                                <span>No. 374 Chaurai Nagar, Somatne Phata, Talegaon Dabhade, Maharashtra 410506</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <Phone className="h-4 w-4 mt-0.5 text-[#D32F2F] flex-shrink-0" />
                                <span>+91-7020996341 | +91-8530698242</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <Mail className="h-4 w-4 mt-0.5 text-[#D32F2F] flex-shrink-0" />
                                <Link href="mailto:support@journaledge.com" className="hover:text-[#D32F2F]">support@journaledge.com</Link>
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 relative">
                            Quick Links
                            <span className="absolute bottom-[-4px] left-0 h-0.5 w-12 bg-[#D32F2F]"></span>
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {quickLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Explore */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 relative">
                            Explore
                             <span className="absolute bottom-[-4px] left-0 h-0.5 w-12 bg-[#D32F2F]"></span>
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {exploreLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Column 4: Subscribe & Brand */}
                    <div className="space-y-6">
                        <div>
                           <h3 className="text-lg font-semibold mb-4 relative">
                                Subscribe
                                <span className="absolute bottom-[-4px] left-0 h-0.5 w-12 bg-[#D32F2F]"></span>
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">Don't miss out on our updates! Subscribe to our newsletter by filling out the form below.</p>
                            <form className="flex items-center">
                                <Input type="email" placeholder="Email Address" className="bg-white text-black rounded-full rounded-r-none border-none h-11 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#D32F2F]" />
                                <Button type="submit" size="icon" className="bg-[#D32F2F] hover:bg-[#b71c1c] rounded-full rounded-l-none h-11 w-12 flex-shrink-0">
                                    <Send className="h-5 w-5" />
                                </Button>
                            </form>
                        </div>
                         <div>
                           <h3 className="text-lg font-semibold mb-4 relative">
                                Our Brand
                                <span className="absolute bottom-[-4px] left-0 h-0.5 w-12 bg-[#D32F2F]"></span>
                            </h3>
                            <div className="bg-white p-2 rounded-md inline-block">
                                <Image src="https://logodix.com/logo/796417.png" width={150} height={80} alt="Our Brand" data-ai-hint="logo brand" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6">
                    <p className="text-center text-sm font-semibold uppercase tracking-wider relative">
                        A Venture of JournalEdge Innovation Educational Research and Welfare Foundation.
                        <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 h-0.5 w-20 bg-[#D32F2F]"></span>
                    </p>

                    <div className="flex flex-col items-center mt-10">
                        <h4 className="font-semibold mb-4">Follow us</h4>
                        <div className="flex items-center space-x-3">
                            {socialLinks.map((link, index) => (
                                <Link key={index} href={link.href}>
                                    <Button variant="outline" size="icon" className="bg-transparent border-white rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                        <link.icon className="h-5 w-5" />
                                    </Button>
                                </Link>
                            ))}
                             <Link href="#">
                                <Button variant="outline" size="icon" className="bg-transparent border-white rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                    <WhatsAppIcon />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer;
