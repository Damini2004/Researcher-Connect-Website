// src/services/blogService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { AddBlogPostData, blogPostSchema, BlogPost } from '@/lib/types';
import { z } from 'zod';
import { format } from 'date-fns';

interface AddBlogPostPayload extends Omit<AddBlogPostData, 'image'> {
    imageSrc: string;
    imageHint: string;
}

export async function addBlogPost(data: AddBlogPostPayload): Promise<{ success: boolean; message: string; }> {
  try {
    const schemaForService = blogPostSchema.extend({
        imageSrc: z.string().min(1, "Image is required."),
        imageHint: z.string().optional(),
    }).omit({ image: true });

    const validationResult = schemaForService.safeParse(data);
    if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
    }
    
    await addDoc(collection(db, 'blogPosts'), {
        ...validationResult.data,
        createdAt: serverTimestamp(),
    });
    
    return { success: true, message: 'Blog post added successfully!' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add blog post: ${message}` };
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate() || new Date();
            return {
                id: doc.id,
                title: data.title,
                category: data.category,
                author: data.author,
                content: data.content,
                excerpt: data.excerpt,
                imageSrc: data.imageSrc,
                imageHint: data.imageHint || '',
                isFeatured: data.isFeatured || false,
                createdAt: createdAt.toISOString(),
                date: format(createdAt, "PPP"),
            }
        });
    } catch (error) {
        console.error("Error fetching blog posts: ", error);
        throw error;
    }
}

export async function updateBlogPost(id: string, data: Partial<AddBlogPostPayload>): Promise<{ success: boolean, message: string }> {
    try {
        const schemaForService = blogPostSchema.extend({
            imageSrc: z.string().optional(),
            imageHint: z.string().optional(),
        }).omit({ image: true }).partial();
        
        const validationResult = schemaForService.safeParse(data);
        if (!validationResult.success) {
            const firstError = validationResult.error.errors[0];
            return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
        }

        const postRef = doc(db, 'blogPosts', id);
        await updateDoc(postRef, {
            ...validationResult.data,
            updatedAt: serverTimestamp()
        });
        
        return { success: true, message: 'Blog post updated successfully!' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update blog post: ${message}` };
    }
}

export async function deleteBlogPost(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Blog post ID is required.' };
        }
        await deleteDoc(doc(db, 'blogPosts', id));
        return { success: true, message: 'Blog post deleted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete blog post: ${message}` };
    }
}
