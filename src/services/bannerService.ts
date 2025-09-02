// src/services/bannerService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { z } from 'zod';

// Schema for data coming from the form, including the base64 string for the image
const bannerFormSchema = z.object({
  titleLine1: z.string().min(1, "First title line is required."),
  titleLine2: z.string().min(1, "Second title line is required."),
  subtitle: z.string().min(1, "Subtitle is required."),
  button1Text: z.string().min(1, "Button 1 text is required."),
  button1Link: z.string().min(1, "Please enter a link for Button 1.").refine(val => val.startsWith('/') || val.startsWith('http'), { message: "Link must be a relative path (e.g., /about) or a full URL."}),
  button2Text: z.string().min(1, "Button 2 text is required."),
  button2Link: z.string().min(1, "Please enter a link for Button 2.").refine(val => val.startsWith('/') || val.startsWith('http'), { message: "Link must be a relative path (e.g., /about) or a full URL."}),
  order: z.coerce.number().min(0, "Order must be a positive number."),
  imageSrc: z.string().min(1, "Image data is missing.").startsWith("data:image/", "Image data must be a valid data URI."),
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

/**
 * Adds a new banner document to the 'heroBanners' collection in Firestore.
 * The image is provided as a base64 data URI string and stored directly.
 */
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

/**
 * Fetches all banners from the 'heroBanners' collection, ordered by the 'order' field.
 * This function is resilient to missing or malformed data in Firestore.
 */
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
            let createdAtString = new Date().toISOString(); // Default to now if missing
            const createdAt = data.createdAt;
            if (createdAt instanceof Timestamp) {
                createdAtString = createdAt.toDate().toISOString();
            } else if (createdAt && typeof createdAt.toDate === 'function') {
                createdAtString = createdAt.toDate().toISOString();
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
                order: typeof data.order === 'number' ? data.order : 0,
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
