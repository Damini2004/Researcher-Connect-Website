// src/services/emailService.ts
'use server';

import { Resend } from 'resend';
import { AlertEmail } from '@/components/emails/alert-email';
import * as React from 'react';

// IMPORTANT: Hardcoding the API key as a last resort to bypass environment loading issues.
// For production, this should be loaded from environment variables.
const RESEND_API_KEY = "re_iagq3MPf_BdpQ57sy9PJinUhjhAy9xWCB";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

interface EmailParams {
  to: string;
  subject: string;
  submissionTitle: string;
  authorName: string;
}

export async function sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
  const { to, subject, submissionTitle, authorName } = params;

  if (!resend) {
    const errorMessage = 'Resend client is not initialized. The API key is likely missing.';
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
      // Improved error logging to capture the structure of the error object.
      console.error('Resend API Error:', JSON.stringify(error, null, 2));
      const errorMessage = `Failed to send email: ${error.name || 'UnknownError'} - ${error.message || 'No message provided.'}`;
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
      message = JSON.stringify(error);
    }
    return { success: false, message: `Failed to send email: ${message}` };
  }
}
