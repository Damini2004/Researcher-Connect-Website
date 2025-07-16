
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, BookOpen, ChevronDown, FileText, Book, Presentation, MessageSquare, ThumbsUp, Library, Users } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";

const publicationSubMenu = [
    { href: "/publications/overview", label: "Overview", icon: FileText },
    { href: "/publications/journal-support", label: "Journals Publication Support", icon: Book },
    { href: "/publications/journal-selection", label: "Journal Selection", icon: ThumbsUp },
    { href: "/publications/book-publication", label: "Book Publication", icon: BookOpen },
    { href: "/publications/conference-proceedings", label: "Conference Proceedings", icon: Presentation },
    { href: "/publications/response-to-reviewers", label: "Response To Reviewers", icon: MessageSquare },
    { href: "/publications/peer-review", label: "Pre-Submission Peer Review", icon: Users },
    { href: "/publications/digital-library", label: "Digital Library", icon: Library },
]

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { 
    href: "/publications", 
    label: "Publications",
    children: publicationSubMenu
  },
  { href: "/ipr-services", label: "IPR Services" },
  { href: "/internship", label: "Internship" },
  { href: "/research-support", label: "Research Support" },
  { href: "/conference", label: "Conference" },
  { href: "/contact-us", label: "Contact Us" },
];

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              JournalEdge
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => 
                link.children ? (
                    <DropdownMenu key={link.href}>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={cn(
                                    "relative flex items-center gap-1 transition-colors hover:text-primary",
                                    pathname.startsWith(link.href) ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                                <ChevronDown className="h-4 w-4" />
                                {pathname.startsWith(link.href) && (
                                    <span className="absolute bottom-[-22px] left-0 w-full h-0.5 bg-primary"></span>
                                )}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {link.children.map((childLink) => (
                                <DropdownMenuItem key={childLink.href} asChild>
                                    <Link href={childLink.href} className="flex items-center gap-2">
                                        <childLink.icon className="h-4 w-4" />
                                        <span>{childLink.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                        "relative transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        {link.label}
                        {pathname === link.href && (
                        <span className="absolute bottom-[-22px] left-0 w-full h-0.5 bg-primary"></span>
                        )}
                    </Link>
                )
            )}
          </nav>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
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
              {navLinks.map((link) => (
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
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add a search bar here if needed */}
          </div>
          <nav className="flex items-center">
            <Link href="/submit-journal">
              <Button size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Submit Journal
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="ml-2">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
