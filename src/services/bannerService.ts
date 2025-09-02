
// src/services/bannerService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { z } from 'zod';

// Zod schema for banner data validation.
// This now correctly expects strings for all fields, as they are sent from the form,
// and ensures no unexpected data types cause issues.
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

// This is the type that comes from the form.
type BannerFormData = z.infer<typeof bannerSchema>;

// This is the type used in the application, with an ID and a converted timestamp.
export interface Banner extends BannerFormData {
    id: string;
    createdAt: string; // ISO string for serializability
}

/**
 * Adds a new banner document to the 'heroBanners' collection in Firestore.
 * @param data The banner data from the form.
 * @returns An object indicating success or failure.
 */
export async function addBanner(data: BannerFormData): Promise<{ success: boolean; message: string; }> {
  try {
    // Validate the incoming data against the schema.
    const validationResult = bannerSchema.safeParse(data);
    if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `${firstError.path.join('.')}: ${firstError.message}` };
    }
    
    // Add the validated data to Firestore, using its server-side timestamp.
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
 * Fetches all banners from Firestore, ordered by 'order' and 'createdAt'.
 * This function now correctly handles Firestore Timestamps.
 * @returns A promise that resolves to an array of Banner objects.
 */
export async function getBanners(): Promise<Banner[]> {
    try {
        // Query to get banners, ordered by the specified display order, then by creation date.
        const q = query(collection(db, "heroBanners"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const banners: Banner[] = [];

        querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
            const data = docSnap.data();

            // Create a temporary object for validation, matching the form schema.
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
                // *** ROOT CAUSE FIX ***
                // Correctly handle the Firestore Timestamp by converting it to a standard ISO string.
                let createdAtString = new Date().toISOString(); // Default to now if timestamp is missing.
                if (data.createdAt && data.createdAt instanceof Timestamp) {
                    createdAtString = data.createdAt.toDate().toISOString();
                }

                banners.push({
                    id: docSnap.id,
                    ...validation.data,
                    createdAt: createdAtString,
                });
            } else {
                 // Log validation errors for debugging, but don't crash the app.
                 console.warn(`Invalid banner data for doc ID ${docSnap.id}:`, validation.error.errors);
            }
        });

        return banners;
    } catch (error) {
        console.error("Error fetching banners: ", error);
        return []; // Return an empty array on error to prevent crashes.
    }
}

/**
 * Deletes a banner document from Firestore by its ID.
 * @param id The ID of the banner to delete.
 * @returns An object indicating success or failure.
 */
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
