// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { type AddConferenceData, type Conference, conferenceSchema } from '@/lib/types';

export async function addConference(data: AddConferenceData & { bannerImage: string }): Promise<{ success: boolean; message: string; }> {
  try {
    const validationResult = conferenceSchema.safeParse(data);
    if (!validationResult.success) {
        console.error("Zod validation failed:", validationResult.error.errors);
        return { success: false, message: validationResult.error.errors[0].message };
    }

    const dataToSave = {
        ...validationResult.data,
        bannerImage: data.bannerImage,
        createdAt: serverTimestamp(), // Use Firestore server timestamp
    };

    await addDoc(collection(db, 'conferences'), dataToSave);
    
    return { 
        success: true, 
        message: 'Conference added successfully!',
    };
  } catch (error) {
    console.error("Error adding conference:", error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add conference: ${message}` };
  }
}

const mapDocToConference = (docSnap: QueryDocumentSnapshot<DocumentData> | DocumentData): Conference => {
    const data = docSnap.data();

    const getJSDate = (field: any): Date => {
        if (field && typeof field.toDate === 'function') {
            return field.toDate();
        }
        return field instanceof Date ? field : new Date();
    };

    const startDate = getJSDate(data.startDate);
    const endDate = getJSDate(data.endDate);

    let dateRange = format(startDate, "PPP");
    if (startDate.getTime() !== endDate.getTime()) {
        dateRange = `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
    }

    let location = "Online";
    if (data.locationType === "Offline") {
        location = data.venueAddress;
    } else if (data.locationType === "Hybrid") {
        location = `${data.venueAddress} / Online`;
    }
    
    return {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        fullDescription: data.fullDescription,
        conferenceType: data.conferenceType,
        organizerName: data.organizerName,
        organizerEmail: data.organizerEmail,
        organizerPhone: data.organizerPhone,
        date: dateRange,
        startDate: format(startDate, "PPP"),
        endDate: format(endDate, "PPP"),
        submissionDeadline: format(getJSDate(data.submissionDeadline), "PPP"),
        registrationDeadline: format(getJSDate(data.registrationDeadline), "PPP"),
        dateObject: startDate,
        locationType: data.locationType,
        location: location,
        audienceType: data.audienceType,
        callForPapers: data.callForPapers,
        enableAbstractSubmission: data.enableAbstractSubmission,
        enableFullPaperSubmission: data.enableFullPaperSubmission,
        imageSrc: data.bannerImage,
        createdAt: getJSDate(data.createdAt).toISOString(),
    };
}


export async function getConferences(): Promise<Conference[]> {
    try {
        const q = query(collection(db, "conferences"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(mapDocToConference);
    } catch (error) {
        console.error("Error fetching conferences from service: ", error);
        throw error;
    }
}

export async function getConferenceById(id: string): Promise<{ success: boolean; message: string; conference?: Conference }> {
    try {
        if (!id) {
            return { success: false, message: 'Conference ID is required.' };
        }
        const docRef = doc(db, 'conferences', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return { success: false, message: 'Conference not found.' };
        }
        
        const conference = mapDocToConference(docSnap);

        return { success: true, message: 'Conference fetched successfully.', conference };

    } catch (error) {
        console.error("Error fetching conference:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to fetch conference: ${message}` };
    }
}

export async function deleteConference(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if (!id) {
            return { success: false, message: 'Conference ID is required.' };
        }
        await deleteDoc(doc(db, 'conferences', id));
        return { success: true, message: 'Conference deleted successfully.' };
    } catch (error) {
        console.error("Error deleting conference:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete conference: ${message}` };
    }
}
