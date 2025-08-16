
import Link from "next/link";
import { Logo } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Facebook } from "lucide-react";

const quickLinks = [
    { href: "/contact-us", label: "Contact Us" },
    { href: "/conference/faq", label: "FAQ" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "#", label: "Terms of Use" },
    { href: "#", label: "Global Office" },
    { href: "#", label: "Local Office" },
]

const socialLinks = [
    { href: "#", icon: Linkedin, label: "Linkedin" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Facebook, label: "Facebook" },
]

const GooglePlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 10h1v4h-1v-4zm2 0h1v4h-1v-4zm11-2.5c0-2.84-2.2-5-5.02-5C12.64 2.5 10.5 4.64 10.5 7.5c0 2.86 2.14 5 4.98 5 .6 0 1.18-.1 1.72-.28l.28-.08v-1.14c-.5.22-1.08.36-1.72.36-2.2 0-3.98-1.78-3.98-4s1.78-4 3.98-4 4.02 1.8 4.02 4v.32H16.5v1.18h2.82c.08-.2.12-.42.12-.64zM21 10.5h-1V12h1v-1.5zM17 10.5h1.5v1.5H17v-1.5z"></path>
    </svg>
)

const Footer = () => {
    return (
        <footer className="bg-[#3D4C6F] text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
                    {/* Column 1: Sign up form */}
                    <div className="md:col-span-6">
                        <div className="bg-[#303d5c] p-8 rounded-lg shadow-lg">
                            <h3 className="text-3xl font-bold mb-2">Sign up for email alerts</h3>
                            <p className="text-gray-400 mb-6">Stay current with our latest insights</p>
                            <form className="flex flex-col sm:flex-row gap-2">
                                <Input 
                                    type="email" 
                                    placeholder="Enter Email Here" 
                                    className="bg-white text-black border-none flex-grow h-12"
                                />
                                <Button 
                                    type="submit" 
                                    className="bg-[#FFC107] text-black hover:bg-[#ffca2c] h-12 px-8 font-bold"
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                    
                    {/* Column 2: Links */}
                    <div className="md:col-span-3">
                         <ul className="space-y-3 text-gray-300">
                            {quickLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Social Links */}
                    <div className="md:col-span-3">
                        <ul className="space-y-3 text-gray-300">
                           {socialLinks.map((link, index) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="flex items-center gap-3 hover:text-white transition-colors">
                                        <div className="bg-[#303d5c] p-2 rounded-sm">
                                            <link.icon className="h-5 w-5" />
                                        </div>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                             <li>
                                <Link href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                                    <div className="bg-[#303d5c] p-2 rounded-sm">
                                        <GooglePlusIcon className="h-5 w-5" />
                                    </div>
                                    <span>Google+</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Bottom bar */}
            <div className="border-t border-gray-700/50">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                         <Logo className="h-8 w-16" />
                    </div>
                    <div className="mb-4 md:mb-0">
                         <p>&copy; Copyright 2024 Researcher Connect. All Rights Reserved.</p>
                    </div>
                    <div>
                        <p>Designed by <span className="text-white font-semibold">Firebase Studio</span></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
