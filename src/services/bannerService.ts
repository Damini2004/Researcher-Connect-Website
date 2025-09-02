
// src/services/bannerService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { z } from 'zod';

const bannerSchema = z.object({
  titleLine1: z.string().min(1, "First title line is required."),
  titleLine2: z.string().min(1, "Second title line is required."),
  subtitle: z.string().min(1, "Subtitle is required."),
  button1Text: z.string().min(1, "Button 1 text is required."),
  button1Link: z.string().min(1, "Please enter a link for Button 1.").refine(val => val.startsWith('/') || val.startsWith('http'), { message: "Link must be a relative path (e.g., /about) or a full URL."}),
  button2Text: z.string().min(1, "Button 2 text is required."),
  button2Link: z.string().min(1, "Please enter a link for Button 2.").refine(val => val.startsWith('/') || val.startsWith('http'), { message: "Link must be a relative path (e.g., /about) or a full URL."}),
  order: z.coerce.number().min(0, "Order must be a positive number."),
});

const bannerFormSchema = bannerSchema.extend({
  imageSrc: z.string().min(1, "Image data is missing.").startsWith("data:image/", "Image data must be a valid data URI."),
});

type BannerFormData = z.infer<typeof bannerFormSchema>;
export type UpdateBannerData = z.infer<typeof bannerSchema> & { imageSrc?: string };

export interface Banner {
    id: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    button1Text: string;
    button1Link: string;
    button2Text: string;
    button2Link: string;
    order: number;
    imageSrc: string;
    createdAt: string; 
}

export async function addBanner(data: BannerFormData): Promise<{ success: boolean; message: string; }> {
  try {
    const validationResult = bannerFormSchema.safeParse(data);
    if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `Validation Error: ${firstError.path.join('.')} - ${firstError.message}` };
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

export async function updateBanner(id: string, data: UpdateBannerData): Promise<{ success: boolean, message: string }> {
    try {
        const schemaForUpdate = bannerSchema.extend({
            imageSrc: z.string().optional(),
        });

        const validationResult = schemaForUpdate.safeParse(data);
        if (!validationResult.success) {
            const firstError = validationResult.error.errors[0];
            return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
        }

        const bannerRef = doc(db, 'heroBanners', id);
        await updateDoc(bannerRef, {
            ...validationResult.data,
            updatedAt: serverTimestamp()
        });
        
        return { success: true, message: 'Banner updated successfully!' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update banner: ${message}` };
    }
}


export async function getBanners(): Promise<Banner[]> {
    try {
        const q = query(
            collection(db, "heroBanners"),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const banners: Banner[] = [];

        querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
            const data = docSnap.data();

            let createdAtString = new Date().toISOString(); 
            const createdAt = data.createdAt;
            if (createdAt instanceof Timestamp) {
                createdAtString = createdAt.toDate().toISOString();
            } else if (createdAt && typeof createdAt.toDate === 'function') {
                createdAtString = createdAt.toDate().toISOString();
            }

            const banner: Banner = {
                id: docSnap.id,
                titleLine1: data.titleLine1 || "",
                titleLine2: data.titleLine2 || "",
                subtitle: data.subtitle || "",
                button1Text: data.button1Text || "Learn More",
                button1Link: data.button1Link || "/",
                button2Text: data.button2Text || "Contact Us",
                button2Link: data.button2Link || "/contact-us",
                order: typeof data.order === 'number' ? data.order : 0,
                imageSrc: data.imageSrc || "",
                createdAt: createdAtString,
            };
            banners.push(banner);
        });

        return banners.sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error("Error fetching banners:", error);
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
