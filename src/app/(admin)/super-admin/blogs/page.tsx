// src/app/(admin)/super-admin/blogs/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@/lib/types";
import { getBlogPosts } from "@/services/blogService";
import AddBlogPostForm from "@/components/forms/add-blog-post-form";
import EditBlogPostForm from "@/components/forms/edit-blog-post-form";
import BlogPostsTable from "@/components/tables/blog-posts-table";

export default function ManageBlogPostsPage() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);
  const { toast } = useToast();

  const fetchPosts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch blog posts.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostAdded = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Blog Post Added!",
      description: "The new post has been successfully created.",
    });
    fetchPosts();
  };
  
  const handlePostUpdated = () => {
    setIsEditDialogOpen(false);
    toast({
      title: "Blog Post Updated!",
      description: "The post details have been successfully saved.",
    });
    fetchPosts();
  };

  const handlePostDeleted = () => {
    toast({
        title: "Blog Post Deleted",
        description: "The post has been successfully deleted.",
    });
    fetchPosts();
  }

  const handleEditClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Post Management</h1>
          <p className="text-muted-foreground">
            Create, view, and manage all blog posts.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl h-[95vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Add New Blog Post</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new blog post.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-hidden">
                <AddBlogPostForm onPostAdded={handlePostAdded} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <BlogPostsTable 
        posts={posts}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onPostDeleted={handlePostDeleted}
      />
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-4xl h-[95vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Post: {selectedPost?.title}</DialogTitle>
            <DialogDescription>
              Modify the post details below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow min-h-0">
            {selectedPost && (
                <EditBlogPostForm
                  post={selectedPost}
                  onPostUpdated={handlePostUpdated}
                />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
