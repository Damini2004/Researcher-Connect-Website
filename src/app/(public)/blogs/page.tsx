
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronRight, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const latestArticles = [
    {
        id: 1,
        title: "7 Unexpected Things to Do in Melbourne",
        category: "Australia",
        imageSrc: "https://images.unsplash.com/photo-1518091040436-0b335803d328?q=80&w=800&h=600&auto=format&fit=crop",
        imageHint: "dinosaur show",
        isLarge: true,
    },
    {
        id: 2,
        title: "Jewels for the Journey: The Positano Edit for a European Escape",
        imageSrc: "https://images.unsplash.com/photo-1516483638261-f4db93098076?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "positano coast"
    },
    {
        id: 3,
        title: "Sands and Recreation: These Are Australia's Top Pet-Friendly Escapes",
        imageSrc: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "dog beach"
    },
    {
        id: 4,
        title: "The Top of the South: See New Zealand Like a Local",
        imageSrc: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "new zealand landscape"
    },
    {
        id: 5,
        title: "6 Reasons Why This Nusa Dua Resort Redefines All-Inclusive Luxury",
        imageSrc: "https://images.unsplash.com/photo-1510074391355-152d1c1f2643?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "luxury resort"
    },
    {
        id: 6,
        title: "How to Plan a Family Holiday to Bali",
        imageSrc: "https://images.unsplash.com/photo-1547291194-e474fb5057b5?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "bali beach"
    },
    {
        id: 7,
        title: "These New Silk Road Luxury Train Journeys Look Epic",
        imageSrc: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "train journey"
    },
    {
        id: 8,
        title: "Take the Scenic Route: 4 of the Best Victoria Road Trip Destinations",
        imageSrc: "https://images.unsplash.com/photo-1444930694458-01bab732b857?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "scenic road"
    },
    {
        id: 9,
        title: "Baywanch: Melia Pattaya Hotel is the City's Most Exciting New Opening",
        imageSrc: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "hotel pool"
    },
    {
        id: 10,
        title: "The Dubai EDITION is an Oasis of Calm in the Dizzying Desert Town",
        imageSrc: "https://images.unsplash.com/photo-1528702748617-c67d89e60548?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "dubai architecture"
    },
    {
        id: 11,
        title: "Cool Japan: 10 Must-See Spots Off the Tourist Trail",
        imageSrc: "https://images.unsplash.com/photo-1506452292022-5b52a5ab5164?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "japan coast"
    },
    {
        id: 12,
        title: "Leading the Charge: Exploring Barossa Valley & Kangaroo Island in a Polestar 2",
        imageSrc: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=200&h=150&auto=format&fit=crop",
        imageHint: "road trip"
    }
];

const popularArticles = [
    {
        id: 1,
        title: "The Future of AI in Academic Publishing",
        author: "Dr. Jane Doe",
        date: "October 26, 2023",
        excerpt: "Artificial intelligence is set to revolutionize how we conduct, review, and publish research. Discover the key trends to watch.",
        imageSrc: "https://images.unsplash.com/photo-1677756119517-756a11bdfa1f?q=80&w=400&h=300&auto=format&fit=crop",
        imageHint: "abstract ai"
    },
    {
        id: 2,
        title: "Navigating the Peer Review Process: A Guide for Young Researchers",
        author: "Dr. John Smith",
        date: "October 20, 2023",
        excerpt: "Peer review can be daunting. Here are our top tips for successfully navigating feedback and getting your paper published.",
        imageSrc: "https://images.unsplash.com/photo-1581093458791-9a7ca5a5d3d3?q=80&w=400&h=300&auto=format&fit=crop",
        imageHint: "researcher writing"
    },
    {
        id: 3,
        title: "The Importance of Open Access in Modern Science",
        author: "Dr. Emily White",
        date: "October 15, 2023",
        excerpt: "Open access publishing is accelerating scientific discovery. We explore the benefits for researchers and the public.",
        imageSrc: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=400&h=300&auto=format&fit=crop",
        imageHint: "open source"
    },
    {
        id: 4,
        title: "Ethical Considerations in Scientific Research",
        author: "Dr. David Chen",
        date: "October 10, 2023",
        excerpt: "A deep dive into the ethical frameworks that every researcher must understand and apply in their work.",
        imageSrc: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&h=300&auto=format&fit=crop",
        imageHint: "ethical discussion"
    }
];


export default function BlogsPage() {
    const featuredArticle = latestArticles.find(a => a.isLarge);
    const sideArticles = latestArticles.slice(1, 7);
    const bottomArticles = latestArticles.slice(7);

    return (
        <div className="bg-background">
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Person writing in a journal"
                    data-ai-hint="writing journal"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Our Blog</h1>
                    <div className="flex items-center text-sm text-white/80 mt-2">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-semibold text-white">Blogs</span>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {featuredArticle && (
                                <div className="group">
                                    <Image src={featuredArticle.imageSrc} alt={featuredArticle.title} width={800} height={600} className="w-full object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity" data-ai-hint={featuredArticle.imageHint} />
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                        <span>RESEARCH</span>
                                        <span>AUSTRALIA</span>
                                        <span>JOURNALS</span>
                                    </div>
                                    <h3 className="text-2xl font-bold hover:text-primary transition-colors">
                                        <Link href="#">{featuredArticle.title}</Link>
                                    </h3>
                                    <Link href="#" className="text-sm font-semibold text-primary inline-flex items-center mt-2">
                                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                                {bottomArticles.slice(0, 4).map(article => (
                                     <div key={article.id} className="group flex gap-4 items-start">
                                        <div className="w-24 h-24 relative flex-shrink-0">
                                            <Image src={article.imageSrc} alt={article.title} fill className="object-cover rounded-md" data-ai-hint={article.imageHint} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                                                <Link href="#">{article.title}</Link>
                                            </h4>
                                            <Link href="#" className="text-xs font-semibold text-primary/80 inline-flex items-center mt-1">
                                                Read more
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                           {sideArticles.map(article => (
                                <div key={article.id} className="group flex gap-4 items-center">
                                    <div className="w-32 h-24 relative flex-shrink-0">
                                        <Image src={article.imageSrc} alt={article.title} fill className="object-cover rounded-md" data-ai-hint={article.imageHint} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                                            <Link href="#">{article.title}</Link>
                                        </h4>
                                        <Link href="#" className="text-sm font-semibold text-primary/80 inline-flex items-center mt-1">
                                            Read more <ArrowRight className="ml-1 h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-secondary/50">
                <div className="container mx-auto px-4">
                     <h2 className="text-3xl font-bold mb-8">Popular Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularArticles.map(post => (
                            <Card key={post.id} className="flex flex-col overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <Image src={post.imageSrc} alt={post.title} width={400} height={300} className="w-full object-cover" data-ai-hint={post.imageHint} />
                                <CardHeader>
                                    <CardTitle>{post.title}</CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                                        <UserCircle className="h-4 w-4" />
                                        <span>{post.author}</span>
                                        <span>&bull;</span>
                                        <span>{post.date}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                                </CardContent>
                                <CardFooter>
                                    <Link href="#" className="font-semibold text-sm text-primary inline-flex items-center">
                                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
