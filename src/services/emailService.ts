// src/services/emailService.ts
'use server';

import { Resend } from 'resend';
import { AlertEmail } from '@/components/emails/alert-email';
import * as React from 'react';

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

  if (!resend || !resendApiKey || resendApiKey === 're_12345678_abcdefghijklmnopqrstuvwxyz') {
    const errorMessage = 'Resend API key is not configured. Please add it to your .env file.';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Pure Research Insights <onboarding@resend.dev>', // You must verify a domain in Resend to use your own email.
      to: [to],
      subject: subject,
      react: AlertEmail({ authorName, submissionTitle }) as React.ReactElement,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, message: `Failed to send email: ${error.message}` };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error in sendEmail service:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to send email: ${message}` };
  }
}
