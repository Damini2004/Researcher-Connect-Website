
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, BookOpen, ChevronDown, FileText, Book, Presentation, MessageSquare, ThumbsUp, Library, Users, Award, DraftingCompass, TrendingUp, Globe, ArrowRight, User } from "lucide-react";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Custom Icons for Conference Menu
const UpcomingConferencesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M12 18h.01"/><path d="M16 14h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/></svg>
);
const ScientificGalleryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 14h18"/><path d="m14 10-2.5 2.5a1.5 1.5 0 0 1-2.12 0L8 11"/></svg>
);
const PastWebinarsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const UpcomingWebinarsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
);
const PastConferencesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const ConferenceVideosIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
);

const topNavLinks = [
    { href: "/internship", label: "Internship" },
    { href: "/research-support", label: "Research Support" },
    { href: "/login", label: "Login" },
];

const publicationSubMenu = [
    { href: "/publications/overview", label: "Overview", icon: FileText },
    { href: "/publications/journal-support", label: "Journals Publication Support", icon: Book },
    { href: "/publications/journal-selection", label: "Journal Selection", icon: ThumbsUp },
    { href: "/publications/conference-proceedings", label: "Conference Proceedings", icon: Presentation },
    { href: "/publications/response-to-reviewers", label: "Response To Reviewers", icon: MessageSquare },
    { href: "/publications/peer-review", label: "Pre-Submission Peer Review", icon: Users },
    { href: "/publications/digital-library", label: "Journal Listing", icon: Library },
]

const iprServicesSubMenu = [
    { href: "/ipr-services/patent", label: "Patent", icon: Award },
    { href: "/ipr-services/copyright", label: "Copyright", icon: FileText },
    { href: "/ipr-services/trademark", label: "Trademark", icon: TrendingUp },
    { href: "/ipr-services/industrial-design", label: "Industrial Design", icon: DraftingCompass },
    { href: "/ipr-services/global-ip", label: "Global IP", icon: Globe },
]

const conferenceSubMenuLinks = [
    { href: "/conference/about-conference", label: "About IFERP Conference" },
    { href: "/conference/plan-conference", label: "Plan a Scientific Conference" },
    { href: "/conference/sponsors", label: "Sponsors & Exhibitors" },
    { href: "/conference/awards", label: "Awards & Recognition" },
    { href: "/conference/workshops", label: "Workshops & Courses" },
    { href: "/conference/faq", label: "Conference FAQ" },
]

const conferenceSubMenuItems = [
    { href: "/conference/upcoming-conferences", label: "Upcoming Conferences", icon: UpcomingConferencesIcon, color: "border hover:bg-primary/10 hover:text-primary" },
    { href: "/conference/scientific-gallery", label: "Scientific Gallery", icon: ScientificGalleryIcon, color: "border hover:bg-primary/10 hover:text-primary" },
    { href: "/conference/past-webinars", label: "Past Webinars", icon: PastWebinarsIcon, color: "border hover:bg-primary/10 hover:text-primary" },
    { href: "/conference/upcoming-webinars", label: "Upcoming Webinars", icon: UpcomingWebinarsIcon, color: "border hover:bg-primary/10 hover:text-primary" },
    { href: "/conference/past-conferences", label: "Past Conferences", icon: PastConferencesIcon, color: "border hover:bg-primary/10 hover:text-primary" },
    { href: "/conference/conference-videos", label: "Conference Videos & Galleries", icon: ConferenceVideosIcon, color: "border hover:bg-primary/10 hover:text-primary" },
]

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { 
    href: "/conference", 
    label: "Conference",
    isMegaMenu: true,
  },
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

  const ConferenceMegaMenu = () => (
    <PopoverContent className="w-screen max-w-3xl p-0 overflow-hidden shadow-2xl border bg-card" sideOffset={15}>
        <div className="grid grid-cols-12">
            <div className="col-span-4 bg-background p-6">
                <nav className="flex flex-col space-y-1">
                    {conferenceSubMenuLinks.map(link => (
                        <Link key={link.label} href={link.href} className="block px-3 py-2 text-sm text-foreground/80 rounded-md hover:bg-accent hover:text-accent-foreground font-medium transition-colors duration-200">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="col-span-8 p-0 bg-secondary/50">
                <div className="grid grid-cols-3">
                    {conferenceSubMenuItems.map(item => (
                        <Link key={item.label} href={item.href} className={cn("group flex flex-col items-center justify-center text-center p-4 text-foreground transition-all duration-300 hover:scale-105", item.color)}>
                            <item.icon className="h-10 w-10 mb-2 transition-transform duration-300 group-hover:rotate-6" />
                            <span className="text-sm font-semibold">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </PopoverContent>
  );

  const NavLink = ({ link }: { link: { href: string, label: string, children?: any[], isMegaMenu?: boolean } }) => {
    const isConference = link.label === "Conference";

    if (isConference) {
      return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                className={cn(
                    "px-3 py-2 rounded-md transition-colors hover:text-primary flex items-center gap-1 text-sm font-medium",
                    pathname.startsWith(link.href) ? "text-primary bg-primary/10" : "text-foreground/70"
                )}
                >
                {link.label}
                </button>
            </PopoverTrigger>
            <ConferenceMegaMenu />
        </Popover>
      )
    }

    if (link.children) {
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
          pathname === link.href ? "text-primary bg-primary/10" : "text-foreground/70"
        )}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-10 items-center justify-end px-4">
          <div className="flex items-center space-x-6 text-sm font-medium">
            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
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
            {mainNavLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </nav>

          <div className="hidden md:flex items-center ml-6">
            <Link href="/submit-journal">
              <Button>
                <BookOpen className="mr-2 h-4 w-4" />
                Submit Journal
              </Button>
            </Link>
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
            <SheetHeader className="text-left">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
            </SheetHeader>
            <Link
              href="/"
              className="flex items-center space-x-2 mb-6"
              onClick={() => setMenuOpen(false)}
            >
              <Logo className="h-6 w-6" />
              <span className="font-bold">JournalEdge</span>
            </Link>
            <div className="flex flex-col space-y-3">
              {[...mainNavLinks, ...topNavLinks].map((link) =>
                link.children ? (
                  <div key={link.href} className="px-4">
                    <span className="font-semibold text-foreground/80">
                      {link.label}
                    </span>
                    <div className="flex flex-col space-y-2 mt-2 ml-2">
                      {link.children.map((child: any) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            "px-4 py-2 rounded-md text-base transition-colors hover:text-primary flex items-center gap-2",
                            pathname === child.href
                              ? "bg-accent text-primary font-semibold"
                              : "text-foreground/80"
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
                      pathname === link.href
                        ? "bg-accent text-primary font-semibold"
                        : "text-foreground/80"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
