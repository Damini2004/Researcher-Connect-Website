
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";


const topBarInfo = [
    { text: "1010 Avenue, New York, NY 10018 US.", icon: MapPin },
    { text: "212 386 5575, 212 386 5576", icon: Phone, isLink: true, href: "tel:2123865575" },
    { text: "Mon-Sat, 8.00-18.00. Sunday CLOSED", icon: Clock, align: "ms-md-auto" }
]

const mainNavLinks = [
  { href: "/", label: "Home", hasDropdown: true },
  { href: "#", label: "Pages", hasDropdown: true },
  { href: "#", label: "News", hasDropdown: true },
  { href: "#", label: "Elements", hasDropdown: true },
  { href: "/contact-us", label: "Contact" },
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

  const NavLink = ({ link }: { link: { href: string, label: string, hasDropdown?: boolean } }) => {

    if (link.hasDropdown) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "px-3 py-2 rounded-md transition-colors hover:text-primary flex items-center gap-1 text-sm font-medium",
                pathname.startsWith(link.href) ? "text-primary bg-primary/10" : "text-foreground/70"
              )}
            >
              {link.label}
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
             {/* Placeholder Dropdown Items */}
            <DropdownMenuItem><Link href="#">Sub Page 1</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="#">Sub Page 2</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    return (
      <Link
        href={link.href}
        className={cn(
          "px-3 py-2 rounded-md transition-colors hover:text-primary text-sm font-medium",
          pathname === link.href ? "text-primary bg-primary/10" : "text-foreground/70"
        )}
      >
        {link.label}
      </Link>
    )
  }
  
  const MobileNavLink = ({ link, onLinkClick }: { link: { href: string, label: string }, onLinkClick: () => void }) => (
    <Link
        href={link.href}
        onClick={onLinkClick}
        className={cn(
            "block px-4 py-2 rounded-md text-base transition-colors hover:text-primary",
            pathname === link.href
            ? "bg-accent text-primary font-semibold"
            : "text-foreground/80"
        )}
    >
        {link.label}
    </Link>
  );
  
  const MobileNavAccordion = ({ link, onLinkClick }: { link: { href: string, label: string, hasDropdown?: boolean }, onLinkClick: () => void }) => (
    <AccordionItem value={link.label}>
        <AccordionTrigger className="px-4 py-2 text-base text-foreground/80 font-normal hover:no-underline hover:text-primary">
            {link.label}
        </AccordionTrigger>
        <AccordionContent className="pb-2">
            <div className="flex flex-col space-y-1 ml-4 border-l pl-4">
            {/* Placeholder mobile sublinks */}
             <Link href="#" onClick={onLinkClick} className="block py-2 rounded-md text-sm">Sub Page 1</Link>
             <Link href="#" onClick={onLinkClick} className="block py-2 rounded-md text-sm">Sub Page 2</Link>
            </div>
        </AccordionContent>
    </AccordionItem>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#3D4C6F] py-3 text-white text-sm font-semibold hidden md:block">
        <div className="container mx-auto px-4">
            <div className="flex items-center">
                {topBarInfo.map(info => (
                    <div key={info.text} className={cn("flex items-center mr-6", info.align)}>
                        <info.icon className="h-4 w-4 text-amber-400 mr-2" />
                        {info.isLink ? (
                            <a href={info.href} className="text-white hover:text-amber-400">{info.text}</a>
                        ) : (
                            <span>{info.text}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex h-20 items-center px-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
             <Logo className="h-12 w-24" /> {/* Adjusted size */}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavLinks.map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </nav>

          <div className="hidden md:flex items-center ml-6">
            <Button variant="outline" className="rounded-full border-2">Purchase</Button>
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
          <SheetContent side="left" className="pr-0 flex flex-col">
            <SheetHeader className="text-left p-4 border-b">
                 <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                 <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setMenuOpen(false)}
                    >
                    <Logo className="h-8 w-8" />
                    <span className="font-bold">Researcher Connect</span>
                </Link>
            </SheetHeader>
            <ScrollArea className="flex-1">
                <div className="py-4">
                    <Accordion type="multiple" className="w-full">
                        {mainNavLinks.map((link) =>
                            link.hasDropdown ? (
                                <MobileNavAccordion key={link.label} link={link} onLinkClick={() => setMenuOpen(false)} />
                            ) : (
                                <MobileNavLink key={link.label} link={link} onLinkClick={() => setMenuOpen(false)} />
                            )
                        )}
                    </Accordion>
                </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
