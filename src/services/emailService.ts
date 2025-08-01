// src/services/emailService.ts
'use server';

import { Resend } from 'resend';
import { AlertEmail } from '@/components/emails/alert-email';
import * as React from 'react';

// Using Next.js standard for environment variables.
// The key should be in a .env.local file at the root of the project.
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface EmailParams {
  to: string;
  subject: string;
  submissionTitle: string;
  authorName: string;
}

export async function sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
  const { to, subject, submissionTitle, authorName } = params;

  if (!resend) {
    const errorMessage = 'Resend client is not initialized. Please ensure RESEND_API_KEY is set in your .env.local file.';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Pure Research Insights <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      react: AlertEmail({ authorName, submissionTitle }) as React.ReactElement,
    });

    if (error) {
      // Log the full error object for detailed debugging
      console.error('Resend API Error:', JSON.stringify(error, null, 2));
      
      // Provide a more informative error message
      const errorMessage = `Resend API Error: ${error.name} - ${error.message}. Please check your API key and verified domains in your Resend account.`;
      return { success: false, message: errorMessage };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error: unknown) {
    console.error('Exception in sendEmail service:', error);
    
    let message = 'An unexpected error occurred.';
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'object' && error !== null) {
      // Attempt to get more detail from the error object
      message = (error as any).message || JSON.stringify(error);
    }
    
    return { success: false, message: `Failed to send email: ${message}` };
  }
}
