// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, orderBy, query, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { type AddConferenceData, type Conference, conferenceSchema } from '@/lib/types';
import { z } from 'zod';

interface AddConferencePayload extends AddConferenceData {
    conferenceLogo: string;
}

export async function addConference(data: AddConferencePayload): Promise<{ success: boolean; message: string; }> {
  try {
    // We don't validate file objects here, just the string URLs
    const schemaForService = conferenceSchema.extend({
        conferenceLogo: z.string(),
    });
    
    const validationResult = schemaForService.safeParse(data);
    if (!validationResult.success) {
        console.error("Zod validation failed:", validationResult.error.errors);
        const firstError = validationResult.error.errors[0];
        return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
    }

    // Use the validated data, but ensure we use the correct file URLs
    const dataToSave: { [key: string]: any } = {
        ...validationResult.data,
        imageSrc: data.conferenceLogo, // The base64 string
        createdAt: new Date(),
    };
    
    // Remove the temporary 'conferenceLogo' fields from the object to be saved
    delete dataToSave.conferenceLogo;


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

    const getJSDate = (field: any): Date | undefined => {
        if (!field) return undefined;
        if (field && typeof field.toDate === 'function') {
            return field.toDate();
        }
        if (typeof field === 'string' || typeof field === 'number') {
            const date = new Date(field);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return field instanceof Date ? field : undefined;
    };
    
    const formatDate = (date: Date | undefined) => date ? format(date, "PPP") : undefined;

    const startDate = getJSDate(data.startDate) || new Date();
    const endDate = getJSDate(data.endDate) || new Date();

    let dateRange = format(startDate, "PPP");
    if (startDate.getTime() !== endDate.getTime()) {
        dateRange = `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
    }

    const location = data.country || data.venueAddress || "Online";

    return {
        id: docSnap.id,
        title: data.title || "N/A",
        shortTitle: data.shortTitle || "N/A",
        tagline: data.tagline,
        status: data.status || 'active',
        date: dateRange,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        venueName: data.venueName,
        country: data.country,
        modeOfConference: data.modeOfConference || [],
        aboutConference: data.aboutConference,
        conferenceWebsite: data.conferenceWebsite,
        imageSrc: data.imageSrc, // Use imageSrc from now on
        conferenceEmail: data.conferenceEmail,
        organizingCommittee: data.organizingCommittee,
        keynoteSpeakers: data.keynoteSpeakers,
        editorialBoard: data.editorialBoard,
        teamBios: data.teamBios,
        tracks: data.tracks,
        keywords: data.keywords,
        submissionInstructions: data.submissionInstructions,
        paperTemplateUrl: data.paperTemplateUrl,
        submissionStartDate: (getJSDate(data.submissionStartDate) || new Date()).toISOString(),
        submissionEndDate: (getJSDate(data.submissionEndDate) || new Date()).toISOString(),
        fullPaperSubmissionDeadline: getJSDate(data.fullPaperSubmissionDeadline)?.toISOString(),
        registrationDeadline: getJSDate(data.registrationDeadline)?.toISOString(),
        paperCategories: data.paperCategories || [],
        peerReviewMethod: data.peerReviewMethod,
        registrationFees: data.registrationFees,
        accommodationDetails: data.accommodationDetails,
        faqs: data.faqs,
        editorChoice: data.editorChoice,
        createdAt: (getJSDate(data.createdAt) || new Date()).toISOString(),
        dateObject: startDate,
        location,
        
        // --- Fallback fields for old data structure ---
        venueAddress: data.venueAddress || "",
        description: data.description || data.aboutConference || "",
        fullDescription: data.fullDescription || "",
        conferenceType: data.conferenceType || "",
        organizerName: data.organizerName || "",
        organizerEmail: data.organizerEmail || "",
        organizerPhone: data.organizerPhone || "",
        submissionDeadline: formatDate(getJSDate(data.submissionDeadline)) || "N/A",
        locationType: data.locationType || "Offline",
        audienceType: data.audienceType || "",
        callForPapers: data.callForPapers || false,
        enableAbstractSubmission: data.enableAbstractSubmission || false,
        enableFullPaperSubmission: data.enableFullPaperSubmission || false,
    };
}

export async function getConferences(options: { activeOnly?: boolean } = {}): Promise<Conference[]> {
    try {
        const q = query(collection(db, "conferences"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        let conferences = querySnapshot.docs.map(mapDocToConference);

        if (options.activeOnly) {
            conferences = conferences.filter(c => c.status === 'active');
        }

        return conferences;
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

export async function updateConference(id: string, data: Partial<AddConferenceData> & { imageSrc?: string }): Promise<{ success: boolean; message: string }> {
    try {
        const validationResult = conferenceSchema.partial().safeParse(data);
        if (!validationResult.success) {
            console.error("Zod validation failed on update:", validationResult.error.errors);
            const firstError = validationResult.error.errors[0];
            return { success: false, message: `${firstError.path.join('.')} - ${firstError.message}` };
        }
        
        const dataToSave: { [key: string]: any } = {
            ...validationResult.data,
            updatedAt: new Date(),
        };

        if (data.imageSrc) {
            dataToSave.imageSrc = data.imageSrc;
        }

        // Remove file objects if they exist
        delete dataToSave.conferenceLogo;

        const conferenceRef = doc(db, 'conferences', id);
        await updateDoc(conferenceRef, dataToSave);

        return { success: true, message: 'Conference updated successfully!' };
    } catch (error) {
        console.error("Error updating conference:", error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update conference: ${message}` };
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


export async function updateConferenceStatus(id: string, status: 'active' | 'inactive'): Promise<{ success: boolean; message: string }> {
  try {
    const conferenceRef = doc(db, "conferences", id);
    await updateDoc(conferenceRef, { status });
    return { success: true, message: "Conference status updated." };
  } catch (error) {
    console.error("Error updating conference status:", error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to update status: ${message}` };
  }
}
