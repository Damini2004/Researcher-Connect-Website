
// src/services/bannerService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

const bannerSchema = z.object({
  titleLine1: z.string().min(1, "First title line is required."),
  titleLine2: z.string().min(1, "Second title line is required."),
  subtitle: z.string().min(1, "Subtitle is required."),
  button1Text: z.string().min(1, "Button 1 text is required."),
  button1Link: z.string().min(1, "Please enter a link for Button 1."),
  button2Text: z.string().min(1, "Button 2 text is required."),
  button2Link: z.string().min(1, "Please enter a link for Button 2."),
  order: z.coerce.number().min(0, "Order must be a positive number."),
  imageSrc: z.string().min(1, "Image is required."),
});

type BannerFormData = z.infer<typeof bannerSchema>;

export interface Banner extends BannerFormData {
    id: string;
}

export async function addBanner(data: BannerFormData): Promise<{ success: boolean; message: string; }> {
  try {
    const validationResult = bannerSchema.safeParse(data);
    if (!validationResult.success) {
        return { success: false, message: validationResult.error.errors[0].message };
    }
    
    await addDoc(collection(db, 'heroBanners'), {
        ...validationResult.data,
        createdAt: serverTimestamp(),
    });
    
    return { success: true, message: 'Banner added successfully!' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add banner: ${message}` };
  }
}

export async function getBanners(): Promise<Banner[]> {
    try {
        const q = query(collection(db, "heroBanners"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => {
            const data = docSnap.data();
            // Robustly map data from Firestore to the Banner interface
            return {
                id: docSnap.id,
                titleLine1: data.titleLine1 || "",
                titleLine2: data.titleLine2 || "",
                subtitle: data.subtitle || "",
                button1Text: data.button1Text || "Learn More",
                button1Link: data.button1Link || "/",
                button2Text: data.button2Text || "Contact Us",
                button2Link: data.button2Link || "/contact-us",
                order: data.order ?? 0,
                imageSrc: data.imageSrc || "",
            } satisfies Banner;
        });
    } catch (error) {
        console.error("Error fetching banners: ", error);
        // In case of an error, return an empty array to prevent app crashes.
        return [];
    }
}

export async function deleteBanner(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Banner ID is required.' };
        }
        await deleteDoc(doc(db, 'heroBanners', id));
        return { success: true, message: 'Banner deleted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete banner: ${message}` };
    }
}
