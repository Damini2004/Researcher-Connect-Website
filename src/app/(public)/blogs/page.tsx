
// src/app/(public)/blogs/page.tsx
"use client";

import React, { useState } from "react";
import { getBlogPosts, BlogPost } from "@/services/blogService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronRight, UserCircle, Lightbulb, User, Calendar } from "lucide-react";
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
import { RenderHtmlContent } from "@/components/ui/render-html-content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

function PageContent() {
    const [allPosts, setAllPosts] = React.useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    React.useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const posts = await getBlogPosts();
            setAllPosts(posts);
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

    const handlePostClick = (post: BlogPost) => {
        setSelectedPost(post);
    };

    const featuredArticles = allPosts.filter(p => p.isFeatured);
    const regularArticles = allPosts.filter(p => !p.isFeatured);
    
    const latestArticles = [...featuredArticles, ...regularArticles];

    const mainFeaturedArticle = latestArticles.length > 0 ? latestArticles[0] : null;
    const otherLatestArticles = latestArticles.slice(1, 5); 
    const popularArticles = allPosts.slice(0, 8);
    
    const articlesOnLeft = [mainFeaturedArticle].filter(Boolean) as BlogPost[];
    const idsOnLeft = new Set(articlesOnLeft.map(a => a.id));
    const keywordsOnLeft = new Set(articlesOnLeft.flatMap(a => a.keywords || []));

    const recommendedArticles = allPosts
      .filter(post => !idsOnLeft.has(post.id))
      .map(post => {
        const commonKeywords = (post.keywords || []).filter(kw => keywordsOnLeft.has(kw));
        return { post, score: commonKeywords.length };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.post);

    if (isLoading) {
        return (
             <div className="h-screen w-full flex items-center justify-center">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Skeleton className="h-[400px] w-full" />
                        </div>
                        <div className="space-y-6">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
                    
                    {latestArticles.length === 0 ? (
                         <div className="text-center py-16 text-muted-foreground">
                            <p>No blog posts have been published yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                {mainFeaturedArticle && (
                                    <div className="group cursor-pointer" onClick={() => handlePostClick(mainFeaturedArticle)}>
                                        <Image src={mainFeaturedArticle.imageSrc} alt={mainFeaturedArticle.title} width={800} height={450} className="w-full object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity" data-ai-hint={mainFeaturedArticle.imageHint} />
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                            <span>{(mainFeaturedArticle.category[0] || '').toUpperCase()}</span>
                                            <span>JOURNALS</span>
                                        </div>
                                        <h3 className="text-2xl font-bold hover:text-primary transition-colors">
                                            {mainFeaturedArticle.title}
                                        </h3>
                                        <div className="mt-4 prose prose-sm max-w-none line-clamp-5">
                                            <RenderHtmlContent htmlContent={mainFeaturedArticle.content} />
                                        </div>
                                         <button className="text-sm font-semibold text-primary inline-flex items-center mt-2">
                                            Read more <ArrowRight className="ml-2 h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="lg:col-span-1 space-y-8">
                                <div className="space-y-6">
                                    {otherLatestArticles.map(article => (
                                        <div key={article.id} className="group flex gap-4 items-start cursor-pointer" onClick={() => handlePostClick(article)}>
                                            <div className="w-24 h-24 relative flex-shrink-0">
                                                <Image src={article.imageSrc} alt={article.title} fill className="object-cover rounded-md" data-ai-hint={article.imageHint} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                                                    {article.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {recommendedArticles.length > 0 && (
                                    <div className="pt-8 border-t space-y-6">
                                        <h3 className="text-xl font-bold flex items-center gap-2"><Lightbulb className="text-primary"/> Recommended For You</h3>
                                        {recommendedArticles.map(article => (
                                            <div key={article.id} className="group flex gap-4 items-start cursor-pointer" onClick={() => handlePostClick(article)}>
                                                <div className="w-24 h-24 relative flex-shrink-0">
                                                    <Image src={article.imageSrc} alt={article.title} fill className="object-cover rounded-md" data-ai-hint={article.imageHint} />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                                                        {article.title}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            
            {popularArticles.length > 0 && (
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
                                    <div className="p-1 cursor-pointer" onClick={() => handlePostClick(post)}>
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
                                            <button className="font-semibold text-sm text-primary inline-flex items-center">
                                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                                            </button>
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
            )}

            <Dialog open={!!selectedPost} onOpenChange={(isOpen) => !isOpen && setSelectedPost(null)}>
                <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col">
                    {selectedPost && (
                        <>
                            <DialogHeader>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {selectedPost.category.map((cat) => (
                                    <Badge key={cat} variant="secondary" className="w-fit">{cat.toUpperCase()}</Badge>
                                  ))}
                                </div>
                                <DialogTitle className="text-2xl md:text-3xl font-extrabold tracking-tight">{selectedPost.title}</DialogTitle>
                                <div className="flex items-center gap-6 pt-2 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span className="text-sm">{selectedPost.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm">{selectedPost.date}</span>
                                    </div>
                                </div>
                            </DialogHeader>
                             <div className="relative w-full h-64 rounded-lg overflow-hidden my-4">
                                <Image
                                    src={selectedPost.imageSrc}
                                    alt={selectedPost.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <ScrollArea className="flex-grow">
                                <div className="pr-6">
                                  <RenderHtmlContent htmlContent={selectedPost.content} />
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function BlogsPage() {
    return <PageContent />;
}
