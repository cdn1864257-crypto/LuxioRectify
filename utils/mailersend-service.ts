import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// Configuration
const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY as string;
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL || process.env.DEFAULT_FROM_EMAIL || 'support@luxiomarket.shop';
const FROM_NAME = process.env.MAILERSEND_FROM_NAME || 'Luxio Market';

// Initialisation du client
const mailerSend = new MailerSend({
  apiKey: MAILERSEND_API_KEY,
});

export interface MailerSendOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  from?: string;
  fromName?: string;
  replyTo?: string;
}

/**
 * Envoi d'email générique via MailerSend
 */
export async function sendEmailWithMailerSend(options: MailerSendOptions): Promise<boolean> {
  if (!MAILERSEND_API_KEY) {
    console.error('MAILERSEND_API_KEY non configurée');
    return false;
  }

  try {
    const sentFrom = new Sender(
      options.from || FROM_EMAIL,
      options.fromName || FROM_NAME
    );

    const recipients = [
      new Recipient(options.to, options.to.split('@')[0]) // Nom simplifié
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(options.subject)
      .setHtml(options.html)
      .setText(options.text);

    if (options.replyTo) {
      emailParams.setReplyTo(new Sender(options.replyTo, options.fromName || FROM_NAME));
    }

    const response = await mailerSend.email.send(emailParams);
    
    // @ts-ignore
    const messageId = response.headers?.['x-message-id'] || response.body?.id || 'N/A';
    console.log(`✅ Email envoyé via MailerSend à ${options.to}. Message ID: ${messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur MailerSend:', error);
    return false;
  }
}
