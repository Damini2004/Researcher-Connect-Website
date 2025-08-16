
// src/services/settingsService.ts
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

const settingsCollectionId = 'settings';
const paymentDocId = 'payment';

const paymentUrlSchema = z.string().url("Invalid URL format.");

export async function updatePaymentUrl(url: string): Promise<{ success: boolean; message: string }> {
    try {
        const validation = paymentUrlSchema.safeParse(url);
        if (!validation.success) {
            return { success: false, message: validation.error.errors[0].message };
        }

        const settingsRef = doc(db, settingsCollectionId, paymentDocId);
        await setDoc(settingsRef, {
            url: validation.data,
            updatedAt: serverTimestamp(),
        });
        
        return { success: true, message: "Payment URL updated successfully." };

    } catch (error) {
        console.error("Error updating payment URL:", error);
        const message = error instanceof Error ? error.message : "An unexpected error occurred.";
        return { success: false, message: `Failed to update URL: ${message}` };
    }
}

export async function getPaymentUrl(): Promise<{ success: boolean; url: string; message: string }> {
    try {
        const settingsRef = doc(db, settingsCollectionId, paymentDocId);
        const docSnap = await getDoc(settingsRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return { success: true, url: data.url, message: "URL fetched successfully." };
        } else {
            return { success: true, url: "", message: "No payment URL is set." };
        }
    } catch (error) {
        console.error("Error fetching payment URL:", error);
        const message = error instanceof Error ? error.message : "An unexpected error occurred.";
        return { success: false, url: "", message: `Failed to fetch URL: ${message}` };
    }
}
