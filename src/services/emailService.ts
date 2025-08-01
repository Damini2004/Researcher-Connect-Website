// src/services/emailService.ts
'use server';

import { Resend } from 'resend';
import { AlertEmail } from '@/components/emails/alert-email';
import * as React from 'react';
import { RESEND_API_KEY } from '@/lib/config';

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
    const errorMessage = 'Resend API key is not configured. Please ensure RESEND_API_KEY is set in your .env.local file.';
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
      console.error('Resend error:', error);
      // Use name and message from the error object for a more descriptive message
      const errorMessage = `Failed to send email: ${error.name} - ${error.message}`;
      return { success: false, message: errorMessage };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error in sendEmail service:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to send email: ${message}` };
  }
}
