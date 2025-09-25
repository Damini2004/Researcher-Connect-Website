// src/services/faqService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { faqSchema, type FaqData } from '@/lib/types';

export interface Faq {
    id: string;
    question: string;
    answer: string;
    createdAt: string;
}

export async function addFaq(data: FaqData): Promise<{ success: boolean; message: string; }> {
  try {
    const validationResult = faqSchema.safeParse(data);
    if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
    }
    
    await addDoc(collection(db, 'faqs'), {
        ...validationResult.data,
        createdAt: serverTimestamp(),
    });
    
    return { success: true, message: 'FAQ added successfully!' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add FAQ: ${message}` };
  }
}

export async function getFaqs(): Promise<Faq[]> {
    try {
        const q = query(collection(db, "faqs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate() || new Date();
            return {
                id: doc.id,
                question: data.question,
                answer: data.answer,
                createdAt: createdAt.toISOString(),
            }
        });
    } catch (error) {
        console.error("Error fetching FAQs: ", error);
        throw error;
    }
}

export async function updateFaq(id: string, data: FaqData): Promise<{ success: boolean, message: string }> {
    try {
        const validationResult = faqSchema.safeParse(data);
        if (!validationResult.success) {
            const firstError = validationResult.error.errors[0];
            return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
        }

        const faqRef = doc(db, 'faqs', id);
        await updateDoc(faqRef, {
            ...validationResult.data,
            updatedAt: serverTimestamp()
        });
        
        return { success: true, message: 'FAQ updated successfully!' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update FAQ: ${message}` };
    }
}

export async function deleteFaq(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'FAQ ID is required.' };
        }
        await deleteDoc(doc(db, 'faqs', id));
        return { success: true, message: 'FAQ deleted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete FAQ: ${message}` };
    }
}
