// src/app/(public)/blogs/page.tsx
import { getBlogPosts, BlogPost } from "@/services/blogService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronRight, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton";

async function PageContent() {
    const allPosts: BlogPost[] = await getBlogPosts();

    const featuredArticles = allPosts.filter(p => p.isFeatured).slice(0, 1);
    const regularArticles = allPosts.filter(p => !p.isFeatured);
    
    // Create a combined list for the "Latest Articles" section
    const latestArticles = [...featuredArticles, ...regularArticles].slice(0, 11);

    const featuredArticle = latestArticles.length > 0 ? latestArticles[0] : null;
    const sideArticles = latestArticles.slice(1, 7);
    const bottomArticles = latestArticles.slice(7);

    // Using all posts for the "Popular" section for now, can be changed later
    const popularArticles = allPosts.slice(0, 8);

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
                            {featuredArticle ? (
                                <div className="group">
                                    <Image src={featuredArticle.imageSrc} alt={featuredArticle.title} width={800} height={600} className="w-full object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity" data-ai-hint={featuredArticle.imageHint} />
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                        <span>{featuredArticle.category.toUpperCase()}</span>
                                        <span>JOURNALS</span>
                                    </div>
                                    <h3 className="text-2xl font-bold hover:text-primary transition-colors">
                                        <Link href="#">{featuredArticle.title}</Link>
                                    </h3>
                                    <p className="text-muted-foreground mt-2">{featuredArticle.excerpt}</p>
                                    <Link href="#" className="text-sm font-semibold text-primary inline-flex items-center mt-2">
                                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            ) : <Skeleton className="h-[400px] w-full" />}
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
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {popularArticles.map((post) => (
                            <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                <Card className="flex flex-col h-full overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                    <Image src={post.imageSrc} alt={post.title} width={400} height={300} className="w-full h-48 object-cover" data-ai-hint={post.imageHint} />
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
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>
        </div>
    );
}


export default function BlogsPage() {
    return (
        <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading blog posts...</div>}>
            <PageContent />
        </React.Suspense>
    )
}
