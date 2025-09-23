// src/services/keywordService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function getKeywords(): Promise<string[]> {
    try {
        const querySnapshot = await getDocs(collection(db, 'blogPosts'));
        const keywords = new Set<string>();

        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.keywords && Array.isArray(data.keywords)) {
                data.keywords.forEach((keyword: string) => {
                    keywords.add(keyword);
                });
            }
        });

        return Array.from(keywords).sort();
    } catch (error) {
        console.error("Error fetching keywords:", error);
        return [];
    }
}
