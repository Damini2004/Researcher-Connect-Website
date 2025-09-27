// src/components/blog/blog-page-content.tsx
"use client";

import React, { useState } from "react";
import { getBlogPosts, BlogPost } from "@/services/blogService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronRight, UserCircle, Lightbulb, User, Calendar, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategories, BlogCategory } from "@/services/categoryService";

export default function BlogPageContent() {
    const [allPosts, setAllPosts] = React.useState<BlogPost[]>([]);
    const [categories, setCategories] = React.useState<BlogCategory[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [mainFeaturedArticle, setMainFeaturedArticle] = React.useState<BlogPost | null>(null);
    const [popularSearchTerm, setPopularSearchTerm] = React.useState("");
    const [popularCategoryFilter, setPopularCategoryFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 6;


    React.useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const [posts, cats] = await Promise.all([getBlogPosts(), getCategories()]);
                setAllPosts(posts);
                setCategories(cats);
                if (posts.length > 0) {
                  setMainFeaturedArticle(posts[0]);
                }
            } catch (error) {
                console.error("Failed to fetch posts or categories", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleArticleClick = (post: BlogPost) => {
        setMainFeaturedArticle(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const latestArticles = allPosts;
    
    const otherLatestArticles = latestArticles.filter(p => p.id !== mainFeaturedArticle?.id).slice(0, 4); 
    
    const popularArticles = allPosts.filter(post => {
        const searchTermLower = popularSearchTerm.toLowerCase();
        const searchMatch = popularSearchTerm === "" ||
            post.title.toLowerCase().includes(searchTermLower) ||
            post.excerpt.toLowerCase().includes(searchTermLower) ||
            post.author.toLowerCase().includes(searchTermLower) ||
            (post.keywords && post.keywords.some(kw => kw.toLowerCase().includes(searchTermLower)));

        const categoryMatch = popularCategoryFilter === 'all' ||
            (Array.isArray(post.category) 
                ? post.category.some(c => c.toLowerCase() === popularCategoryFilter.toLowerCase())
                : post.category.toLowerCase() === popularCategoryFilter.toLowerCase());

        return searchMatch && categoryMatch;
    });

    const totalPages = Math.ceil(popularArticles.length / ITEMS_PER_PAGE);
    const paginatedPopularArticles = popularArticles.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
    
    const articlesOnLeft = [mainFeaturedArticle].filter(Boolean) as BlogPost[];
    const idsOnLeft = new Set(articlesOnLeft.map(a => a.id));
    const keywordsOnLeft = React.useMemo(() => new Set(articlesOnLeft.flatMap(a => a.keywords || [])), [articlesOnLeft]);


    const recommendedArticles = React.useMemo(() => {
        return allPosts
            .filter(post => !idsOnLeft.has(post.id))
            .map(post => {
                const commonKeywords = (post.keywords || []).filter(kw => keywordsOnLeft.has(kw));
                return { post, score: commonKeywords.length };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(item => item.post);
    }, [allPosts, idsOnLeft, keywordsOnLeft]);


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
                                    <div className="group space-y-4 cursor-pointer" onClick={() => setSelectedPost(mainFeaturedArticle)}>
                                        <Image src={mainFeaturedArticle.imageSrc} alt={mainFeaturedArticle.title} width={800} height={450} className="w-full object-cover rounded-lg mb-4" data-ai-hint={mainFeaturedArticle.imageHint} />
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                            <span>{(Array.isArray(mainFeaturedArticle.category) ? mainFeaturedArticle.category[0] || '' : mainFeaturedArticle.category).toUpperCase()}</span>
                                            <span>JOURNALS</span>
                                        </div>
                                        <h3 className="text-2xl font-bold">
                                            {mainFeaturedArticle.title}
                                        </h3>
                                        <div className="prose prose-sm max-w-none text-justify">
                                            <RenderHtmlContent htmlContent={mainFeaturedArticle.content} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="lg:col-span-1 space-y-8">
                                <h1>Recommended Articles</h1>
                                <div className="space-y-6">
                                    {otherLatestArticles.map(article => (
                                        <div key={article.id} className="group flex gap-4 items-start cursor-pointer" onClick={() => handleArticleClick(article)}>
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
                                        <h3 className="text-xl font-bold flex items-center gap-2"><Lightbulb className="text-primary"/>Recommended Blogs</h3>
                                        {recommendedArticles.map(article => (
                                            <div key={article.id} className="group flex gap-4 items-start cursor-pointer" onClick={() => handleArticleClick(article)}>
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
            
            <section className="py-16 md:py-24 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Popular Articles</h2>
                     <Card className="mb-8 bg-gradient-to-br from-background via-background to-primary/5 border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                <div className="relative md:col-span-2">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                                    <Input
                                        type="text"
                                        placeholder="Search by title, author, or keyword..."
                                        className="w-full h-12 pl-12"
                                        value={popularSearchTerm}
                                        onChange={(e) => setPopularSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Select value={popularCategoryFilter} onValueChange={setPopularCategoryFilter}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Filter by category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {paginatedPopularArticles.length > 0 ? (
                       <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedPopularArticles.map((post) => (
                                <div key={post.id} className="cursor-pointer" onClick={() => setSelectedPost(post)}>
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
                                ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <nav className="flex rounded-md shadow-sm">
                                <Button
                                    variant="outline"
                                    className="rounded-r-none"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <Button
                                    key={i + 1}
                                    variant={currentPage === i + 1 ? "default" : "outline"}
                                    className="rounded-none"
                                    onClick={() => handlePageChange(i + 1)}
                                    >
                                    {i + 1}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    className="rounded-l-none"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                                </nav>
                            </div>
                        )}
                       </>
                    ) : (
                         <div className="text-center py-16 text-muted-foreground">
                            <p>No popular articles match your criteria.</p>
                        </div>
                    )}
                </div>
            </section>

            <Dialog open={!!selectedPost} onOpenChange={(isOpen) => !isOpen && setSelectedPost(null)}>
                <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col">
                    {selectedPost && (
                        <>
                            <DialogHeader>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {(Array.isArray(selectedPost.category) ? selectedPost.category : [selectedPost.category]).map((cat) => (
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
