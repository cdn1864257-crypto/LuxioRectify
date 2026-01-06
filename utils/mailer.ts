import { sendEmailWithMailerSend } from './mailersend-service.js';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  return sendEmailWithMailerSend(options);
}
