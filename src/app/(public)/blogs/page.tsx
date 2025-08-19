
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronRight, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
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
    }
];

export default function BlogsPage() {
  return (
    <div>
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
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
                                <p className="text-muted-foreground">{post.excerpt}</p>
                            </CardContent>
                            <CardFooter>
                                <Link href="#" className="font-semibold text-primary inline-flex items-center">
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
