
// src/app/(public)/blogs/[id]/page.tsx
import { getBlogPostById } from "@/services/blogService";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User, ChevronRight, Home } from "lucide-react";
import { RenderHtmlContent } from "@/components/ui/render-html-content";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-secondary/30">
        <section className="relative w-full h-[400px] bg-gray-800 text-white">
            <Image
                src={post.imageSrc}
                alt={post.title}
                data-ai-hint={post.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.category.map((cat) => (
                    <Badge key={cat} variant="secondary" className="w-fit">{cat.toUpperCase()}</Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-white/80 mb-4">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <Link href="/blogs" className="hover:text-white">Blogs</Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-4xl">{post.title}</h1>
                <div className="flex items-center gap-6 mt-4 text-white/90">
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>{post.date}</span>
                    </div>
                </div>
            </div>
        </section>

        <article className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <RenderHtmlContent htmlContent={post.content} />
                </div>
            </div>
        </article>
    </div>
  );
}
