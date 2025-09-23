// src/services/categoryService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where, limit } from 'firebase/firestore';

export interface BlogCategory {
    id: string;
    name: string;
}

export async function getCategories(): Promise<BlogCategory[]> {
    try {
        const querySnapshot = await getDocs(collection(db, 'blogCategories'));
        const categories: BlogCategory[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
        }));
        return categories.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function addCategory(name: string): Promise<BlogCategory | null> {
    try {
        // Check if category already exists (case-insensitive)
        const q = query(collection(db, 'blogCategories'), where('name_lowercase', '==', name.toLowerCase()));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, name: doc.data().name };
        }

        // If not, add it
        const docRef = await addDoc(collection(db, 'blogCategories'), {
            name: name,
            name_lowercase: name.toLowerCase(), // Store lowercase version for case-insensitive checks
            createdAt: new Date(),
        });
        return { id: docRef.id, name: name };
    } catch (error) {
        console.error("Error adding category:", error);
        return null;
    }
}
