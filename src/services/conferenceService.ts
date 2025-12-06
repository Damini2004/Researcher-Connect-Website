// src/services/conferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, doc, updateDoc, getDoc, query, where, orderBy, serverTimestamp, Timestamp, startAt } from 'firebase/firestore';
import { z } from 'zod';
import { conferenceSchema, type Conference, type AddConferenceData } from '@/lib/types';
import { format } from 'date-fns';

const getJSDate = (field: any): Date | null => {
    if (!field) return null;
    if (field instanceof Timestamp) return field.toDate();
    if (field instanceof Date) return field;
    if (typeof field === 'string' || typeof field === 'number') {
      const d = new Date(field);
      if (!isNaN(d.getTime())) return d;
    }
    // Handle Firestore's object representation if it's not a Timestamp instance
    if (typeof field === 'object' && field.seconds !== undefined && field.nanoseconds !== undefined) {
      return new Timestamp(field.seconds, field.nanoseconds).toDate();
    }
    return null;
};

const mapDocToConference = (docSnap: QueryDocumentSnapshot<DocumentData> | DocumentData): Conference => {
  const data = typeof docSnap.data === 'function' ? docSnap.data() : docSnap;
  const id = docSnap.id || 'unknown-id';

  const startDate = getJSDate(data.startDate);
  const endDate = getJSDate(data.endDate);
  const submissionStartDate = getJSDate(data.submissionStartDate);
  const submissionEndDate = getJSDate(data.submissionEndDate);
  const fullPaperSubmissionDeadline = getJSDate(data.fullPaperSubmissionDeadline);
  const registrationDeadline = getJSDate(data.registrationDeadline);
  const createdAt = getJSDate(data.createdAt) || new Date();

  let dateRange = startDate ? format(startDate, "PPP") : "Date not set";
  if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
    dateRange = `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
  }

  const location = data.country || data.venueAddress || "Online";

  return {
    id,
    title: data.title || "N/A",
    shortTitle: data.shortTitle || "N/A",
    tagline: data.tagline,
    status: data.status || 'active',
    date: dateRange,
    startDate: startDate ? startDate.toISOString() : null,
    endDate: endDate ? endDate.toISOString() : null,
    venueName: data.venueName,
    country: data.country,
    modeOfConference: data.modeOfConference || [],
    aboutConference: data.aboutConference,
    conferenceWebsite: data.conferenceWebsite,
    imageSrc: data.imageSrc || data.conferenceLogo,
    conferenceEmail: data.conferenceEmail,
    organizingCommittee: data.organizingCommittee,
    keynoteSpeakers: data.keynoteSpeakers,
    editorialBoard: data.editorialBoard,
    teamBios: data.teamBios,
    tracks: data.tracks,
    keywords: data.keywords,
    submissionInstructions: data.submissionInstructions,
    paperTemplateUrl: data.paperTemplateUrl,
    submissionStartDate: submissionStartDate ? submissionStartDate.toISOString() : null,
    submissionEndDate: submissionEndDate ? submissionEndDate.toISOString() : null,
    fullPaperSubmissionDeadline: fullPaperSubmissionDeadline?.toISOString() ?? null,
    registrationDeadline: registrationDeadline?.toISOString() ?? null,
    paperCategories: data.paperCategories || [],
    peerReviewMethod: data.peerReviewMethod,
    registrationFees: data.registrationFees,
    accommodationDetails: data.accommodationDetails,
    faqs: data.faqs,
    editorChoice: data.editorChoice,
    createdAt: createdAt.toISOString(),
    dateObject: startDate ?? undefined,
    location,
    // Deprecated fields mapped for backward compatibility
    description: data.description || data.aboutConference || "",
    fullDescription: data.fullDescription || "",
    venueAddress: data.venueAddress || "",
    conferenceType: data.conferenceType || "",
    organizerName: data.organizerName || "",
    organizerEmail: data.organizerEmail || "",
    organizerPhone: data.organizerPhone || "",
    submissionDeadline: "N/A",
    locationType: data.locationType || "Offline",
    audienceType: data.audienceType || "",
    callForPapers: data.callForPapers || false,
    enableAbstractSubmission: data.enableAbstractSubmission || false,
    enableFullPaperSubmission: data.enableFullPaperSubmission || false,
  };
};


export async function addConference(data: any): Promise<{ success: boolean; message: string }> {
  try {
    const validatedData = conferenceSchema.parse(data);

    const dataToSave: { [key: string]: any } = {
        ...validatedData,
        imageSrc: data.conferenceLogo,
        paperTemplateUrl: data.paperTemplateUrl,
        createdAt: serverTimestamp(),
        startDate: validatedData.startDate ? Timestamp.fromDate(validatedData.startDate) : null,
        endDate: validatedData.endDate ? Timestamp.fromDate(validatedData.endDate) : null,
        submissionStartDate: validatedData.submissionStartDate ? Timestamp.fromDate(validatedData.submissionStartDate) : null,
        submissionEndDate: validatedData.submissionEndDate ? Timestamp.fromDate(validatedData.submissionEndDate) : null,
        fullPaperSubmissionDeadline: validatedData.fullPaperSubmissionDeadline ? Timestamp.fromDate(validatedData.fullPaperSubmissionDeadline) : null,
        registrationDeadline: validatedData.registrationDeadline ? Timestamp.fromDate(validatedData.registrationDeadline) : null,
    };
    
    delete dataToSave.conferenceLogo;


    await addDoc(collection(db, 'conferences'), dataToSave);
    return { success: true, message: 'Conference added successfully!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: `Validation failed: ${error.errors.map(e => e.message).join(', ')}` };
    }
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add conference: ${message}` };
  }
}

export async function getConferences(options: { activeOnly?: boolean } = {}): Promise<Conference[]> {
    try {
        const conferencesRef = collection(db, "conferences");
        
        const constraints = [];
        if (options.activeOnly) {
            constraints.push(where("status", "==", "active"));
        }
        
        const q = query(conferencesRef, ...constraints);
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(mapDocToConference);
    } catch (error) {
        console.error("Error fetching conferences: ", error);
        return [];
    }
}

export async function getConferenceById(id: string): Promise<{ success: boolean; conference?: Conference; message: string }> {
  try {
    if (!id) {
        return { success: false, message: "Conference ID is required." };
    }
    const docRef = doc(db, 'conferences', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const conference = mapDocToConference(docSnap);
      return { success: true, conference, message: "Conference fetched successfully." };
    } else {
      return { success: false, message: "Conference not found." };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, message: `Failed to fetch conference: ${message}` };
  }
}

export async function updateConference(id: string, data: Partial<AddConferenceData>): Promise<{ success: boolean, message: string }> {
    try {
        const validatedData = conferenceSchema.partial().parse(data);
        const conferenceRef = doc(db, 'conferences', id);
        
        const dataToUpdate: { [key: string]: any } = {
            ...validatedData,
        };

        if (validatedData.startDate) dataToUpdate.startDate = Timestamp.fromDate(validatedData.startDate);
        if (validatedData.endDate) dataToUpdate.endDate = Timestamp.fromDate(validatedData.endDate);
        if (validatedData.submissionStartDate) dataToUpdate.submissionStartDate = Timestamp.fromDate(validatedData.submissionStartDate);
        if (validatedData.submissionEndDate) dataToUpdate.submissionEndDate = Timestamp.fromDate(validatedData.submissionEndDate);
        if (validatedData.fullPaperSubmissionDeadline) dataToUpdate.fullPaperSubmissionDeadline = Timestamp.fromDate(validatedData.fullPaperSubmissionDeadline);
        if (validatedData.registrationDeadline) dataToUpdate.registrationDeadline = Timestamp.fromDate(validatedData.registrationDeadline);

        if (data.imageSrc) {
            dataToUpdate.imageSrc = data.imageSrc;
        }
         if (data.paperTemplateUrl) {
            dataToUpdate.paperTemplateUrl = data.paperTemplateUrl;
        }

        await updateDoc(conferenceRef, {
            ...dataToUpdate,
            updatedAt: serverTimestamp()
        });
        return { success: true, message: 'Conference updated successfully!' };
    } catch (error) {
        if (error instanceof z.ZodError) {
          return { success: false, message: `Validation failed: ${error.errors.map(e => e.message).join(', ')}` };
        }
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
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete conference: ${message}` };
    }
}

export async function updateConferenceStatus(id: string, status: 'active' | 'inactive'): Promise<{ success: boolean, message: string }> {
    try {
        const conferenceRef = doc(db, 'conferences', id);
        await updateDoc(conferenceRef, { status });
        return { success: true, message: `Conference status updated to ${status}.` };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update status: ${message}` };
    }
}
