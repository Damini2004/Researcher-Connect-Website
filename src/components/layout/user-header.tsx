
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, BookOpen, ChevronDown, FileText, Book, Presentation, MessageSquare, ThumbsUp, Library, Users, Award, DraftingCompass, TrendingUp, Globe, ArrowRight, User } from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const publicationSubMenu = [
    { href: "/publications/overview", label: "Overview", icon: FileText },
    { href: "/publications/journal-support", label: "Journals Publication Support", icon: Book },
    { href: "/publications/journal-selection", label: "Journal Selection", icon: ThumbsUp },
    { href: "/publications/conference-proceedings", label: "Conference Proceedings", icon: Presentation },
    { href: "/publications/response-to-reviewers", label: "Response To Reviewers", icon: MessageSquare },
    { href: "/publications/peer-review", label: "Pre-Submission Peer Review", icon: Users },
    { href: "/publications/digital-library", label: "Digital Library", icon: Library },
]

const iprServicesSubMenu = [
    { href: "/ipr-services/patent", label: "Patent", icon: Award },
    { href: "/ipr-services/copyright", label: "Copyright", icon: FileText },
    { href: "/ipr-services/trademark", label: "Trademark", icon: TrendingUp },
    { href: "/ipr-services/industrial-design", label: "Industrial Design", icon: DraftingCompass },
    { href: "/ipr-services/global-ip", label: "Global IP", icon: Globe },
]

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { 
    href: "/publications", 
    label: "Publications",
    children: publicationSubMenu
  },
  { 
    href: "/ipr-services", 
    label: "IPR Services",
    children: iprServicesSubMenu
  },
  { href: "/contact-us", label: "Contact Us" },
];

const topNavLinks = [
    { href: "/internship", label: "Internship" },
    { href: "/research-support", label: "Research Support" },
]

export default function UserHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  const NavLink = ({ link }: { link: { href: string, label: string, children?: any[] } }) => {
    if (link.children) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "px-3 py-2 rounded-md transition-colors hover:text-primary flex items-center gap-1 text-sm font-medium",
                pathname.startsWith(link.href) ? "text-primary" : "text-foreground/70"
              )}
            >
              {link.label}
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            {link.children.map((childLink) => (
              <DropdownMenuItem key={childLink.href} asChild>
                <Link
                  href={childLink.href}
                  className={cn(
                    "flex items-center gap-2",
                    pathname === childLink.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <childLink.icon className="h-4 w-4 text-muted-foreground" />
                  <span>{childLink.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    return (
      <Link
        href={link.href}
        className={cn(
          "px-3 py-2 rounded-md transition-colors hover:text-primary text-sm font-medium",
          pathname === link.href ? "text-primary" : "text-foreground/70"
        )}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        {/* Top Bar */}
        <div className="bg-red-600 text-white">
            <div className="container mx-auto flex h-10 items-center justify-between px-4">
                <nav className="hidden md:flex items-center space-x-6 text-base">
                    {topNavLinks.map(link => (
                        <Link key={link.href} href={link.href} className="hover:text-yellow-300 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/conference">
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-xs h-8 px-4">
                            Conference
                            <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                    </Link>
                    <Link href="/login">
                         <Button size="sm" variant="ghost" className="text-white hover:text-yellow-300 hover:bg-white/10 rounded-full text-xs h-8 px-4">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto flex h-20 items-center px-4">
            <div className="flex items-center">
                 <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Logo className="h-12 w-12" />
                    <span className="hidden font-bold sm:inline-block text-xl">
                    JournalEdge
                    </span>
                </Link>
            </div>
            
            <div className="flex flex-1 items-center justify-end">
                <nav className="hidden md:flex items-center space-x-1">
                    {mainNavLinks.map((link) => <NavLink key={link.href} link={link} />)}
                </nav>
                
                <div className="hidden md:flex items-center ml-6">
                    <Link href="/submit-journal">
                        <Button>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Submit Journal
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="ml-4 rounded-full" asChild>
                        <Link href="/login">
                            <User className="h-6 w-6 text-foreground/60" />
                            <span className="sr-only">Login</span>
                        </Link>
                    </Button>
                </div>
            </div>


            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
                <Button
                variant="ghost"
                className="ml-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <Link
                href="/"
                className="flex items-center space-x-2 mb-6"
                onClick={() => setMenuOpen(false)}
                >
                <Logo className="h-6 w-6" />
                <span className="font-bold">JournalEdge</span>
                </Link>
                <div className="flex flex-col space-y-3">
                {mainNavLinks.map((link) => 
                    link.children ? (
                        <div key={link.href} className="px-4">
                            <span className="font-semibold text-foreground/80">{link.label}</span>
                            <div className="flex flex-col space-y-2 mt-2 ml-2">
                                {link.children.map((child) => (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        onClick={() => setMenuOpen(false)}
                                        className={cn(
                                            "px-4 py-2 rounded-md text-base transition-colors hover:text-primary flex items-center gap-2",
                                            pathname === child.href ? "bg-accent text-primary font-semibold" : "text-foreground/80"
                                        )}
                                    >
                                        <child.icon className="h-4 w-4" />
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                                "px-4 py-2 rounded-md text-base transition-colors hover:text-primary",
                                pathname === link.href ? "bg-accent text-primary font-semibold" : "text-foreground/80"
                            )}
                        >
                            {link.label}
                        </Link>
                    )
                )}
                 <div className="border-t pt-4 mt-4 px-4 space-y-2">
                     {topNavLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                                "px-4 py-2 rounded-md text-base transition-colors hover:text-primary",
                                pathname === link.href ? "bg-accent text-primary font-semibold" : "text-foreground/80"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                 </div>
                </div>
            </SheetContent>
            </Sheet>
        </div>
    </header>
  );
}
