import { sendEmailWithSendGrid } from './sendgrid-service.js';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  return sendEmailWithSendGrid(options);
}
