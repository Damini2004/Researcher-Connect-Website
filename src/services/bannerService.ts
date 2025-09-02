
// src/services/bannerService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
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

// This is the type that comes directly from the form before saving
type BannerFormData = z.infer<typeof bannerSchema>;

// This is the type that will be used throughout the app, with an ID and createdAt
export interface Banner extends BannerFormData {
    id: string;
    createdAt: string; // Storing as ISO string for serializability
}

export async function addBanner(data: BannerFormData): Promise<{ success: boolean; message: string; }> {
  try {
    // Validate the incoming data against the schema
    const validationResult = bannerSchema.safeParse(data);
    if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `${firstError.path.join('.')}: ${firstError.message}` };
    }
    
    await addDoc(collection(db, 'heroBanners'), {
        ...validationResult.data,
        createdAt: serverTimestamp(), // Use Firestore's server-side timestamp
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
        
        const banners: Banner[] = [];

        querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
            const data = docSnap.data();

            // Create a temporary object for validation that matches the form schema
            const dataToValidate = {
                titleLine1: data.titleLine1 || "",
                titleLine2: data.titleLine2 || "",
                subtitle: data.subtitle || "",
                button1Text: data.button1Text || "",
                button1Link: data.button1Link || "",
                button2Text: data.button2Text || "",
                button2Link: data.button2Link || "",
                order: data.order || 0,
                imageSrc: data.imageSrc || "",
            };

            const validation = bannerSchema.safeParse(dataToValidate);

            if (validation.success) {
                // Handle the timestamp conversion carefully
                let createdAtString = new Date().toISOString(); // Default to now if timestamp is missing
                if (data.createdAt && data.createdAt instanceof Timestamp) {
                    createdAtString = data.createdAt.toDate().toISOString();
                }

                banners.push({
                    id: docSnap.id,
                    ...validation.data,
                    createdAt: createdAtString,
                });
            } else {
                 // Log validation errors for debugging, but don't crash the app
                 console.warn(`Invalid banner data for doc ID ${docSnap.id}:`, validation.error.errors);
            }
        });

        return banners;
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
