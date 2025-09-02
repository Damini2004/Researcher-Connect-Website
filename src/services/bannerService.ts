
// src/services/bannerService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { z } from 'zod';

// Schema for data coming from the form
const bannerFormSchema = z.object({
  titleLine1: z.string(),
  titleLine2: z.string(),
  subtitle: z.string(),
  button1Text: z.string(),
  button1Link: z.string(),
  button2Text: z.string(),
  button2Link: z.string(),
  order: z.number(),
  imageSrc: z.string(),
});

type BannerFormData = z.infer<typeof bannerFormSchema>;

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
    // Validate the final payload before sending to Firestore
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

export async function getBanners(): Promise<Banner[]> {
    try {
        const q = query(
            collection(db, "heroBanners"),
            orderBy("order", "asc"),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const banners: Banner[] = [];

        querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
            const data = docSnap.data();

            // Safely handle timestamp conversion
            let createdAtString = new Date().toISOString(); // Default value
            if (data.createdAt && typeof data.createdAt.toDate === 'function') {
                createdAtString = data.createdAt.toDate().toISOString();
            } else if (data.createdAt) {
                // Fallback for other potential date formats
                const d = new Date(data.createdAt);
                if (!isNaN(d.getTime())) {
                    createdAtString = d.toISOString();
                }
            }

            // Construct the banner object with defaults for missing fields
            const banner: Banner = {
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
                createdAt: createdAtString,
            };
            banners.push(banner);
        });

        return banners;
    } catch (error) {
        console.error("Error fetching banners:", error);
        // In case of an error, return an empty array to prevent the app from crashing.
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
