// src/services/emailService.ts
'use server';

import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_SERVER_USER;
const emailPass = process.env.EMAIL_SERVER_PASSWORD;
const emailHost = process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
const emailPort = process.env.EMAIL_SERVER_PORT || 587;

interface EmailParams {
  to: string;
  subject: string;
  customMessage: string;
}

const createHtmlTemplate = (customMessage: string): string => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 20px auto; padding: 0; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
      .header { background-color: #D32F2F; padding: 24px; text-align: center; }
      .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
      .content { padding: 32px; }
      .content p { margin: 0 0 16px; }
      .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0; }
      .button { display: inline-block; background-color: #D32F2F; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; }
      .footer { background-color: #f1f5f9; padding: 24px; text-align: center; color: #64748b; font-size: 12px; }
      .footer a { color: #D32F2F; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Pure Research Insights</h1>
      </div>
      <div class="content">
        <div class="message-box">
          <p style="margin: 0;">${customMessage.replace(/\n/g, '<br>')}</p>
        </div>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br/><b>The Editorial Team</b><br/>Pure Research Insights</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Pure Research Insights. All rights reserved.</p>
        <p><a href="https://pureresearchinsights.com">Our Website</a> | <a href="https://pureresearchinsights.com/login">Login to your account</a></p>
      </div>
    </div>
  </body>
  </html>
`;


export async function sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
  const { to, subject, customMessage } = params;

  if (!emailUser || !emailPass) {
    const errorMessage = 'Email credentials are not configured. Please ensure EMAIL_SERVER_USER and EMAIL_SERVER_PASSWORD are set in your .env.local file.';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: Number(emailPort),
    secure: Number(emailPort) === 465, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Pure Research Insights" <${emailUser}>`,
      to: to,
      subject: subject,
      html: createHtmlTemplate(customMessage),
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true, message: 'Email sent successfully!' };

  } catch (error: unknown) {
    console.error('Nodemailer Error:', error);
    
    let message = 'An unexpected error occurred.';
    if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === 'object' && error !== null) {
        message = JSON.stringify(error);
    }
    
    return { success: false, message: `Failed to send email: ${message}` };
  }
}
