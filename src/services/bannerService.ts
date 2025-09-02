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
  button1Link: z.string().min(1, "Button 1 link is required."),
  button2Text: z.string().min(1, "Button 2 text is required."),
  button2Link: z.string().min(1, "Button 2 link is required."),
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
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `${firstError.path.join('.')}: ${firstError.message}` };
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
            // Validate data against schema to ensure all fields are present and of the correct type
            const validation = bannerSchema.safeParse(data);
            if (!validation.success) {
                console.warn(`Invalid banner data for doc ID ${docSnap.id}:`, validation.error.errors);
                // Return a default or skip this banner
                return null;
            }
            return {
                id: docSnap.id,
                ...validation.data,
            };
        }).filter((banner): banner is Banner => banner !== null); // Filter out any null (invalid) banners
    } catch (error) {
        console.error("Error fetching banners: ", error);
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
