
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, BookOpen } from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/ipr-services", label: "IPR Services" },
  { href: "/internship", label: "Internship" },
  { href: "/research-support", label: "Research Support" },
  { href: "/conference", label: "Conference" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function UserHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              JournalEdge
            </span>
          </Link>
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary font-semibold" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
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
