import { queueEmail } from './email-queue.js';
import { emailTranslations, type EmailLanguage } from './email-translations.js';

export async function sendSuspensionEmail(
  userEmail: string,
  userName: string,
  suspendedUntil: Date,
  language: string = 'fr'
): Promise<void> {
  const userLanguage = (language || 'fr') as EmailLanguage;
  const t = emailTranslations[userLanguage];

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const locale = language === 'en' ? 'en-US' : `${language}-${language.toUpperCase()}`;
  const formattedDate = new Intl.DateTimeFormat(locale, options).format(suspendedUntil);

  const emailSubject = t.subject_account_suspended;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #ef4444;">${t.account_suspended_title}</h2>
      <p>${t.hello} ${userName},</p>
      <p>${t.account_suspended_message}</p>
      <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold;">${t.account_suspended_reason}</p>
      </div>
      <p><strong>${t.account_suspended_until} ${formattedDate}</strong></p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; white-space: pre-line;">${t.account_suspended_actions}</p>
      </div>
      <p>${t.footer_note}</p>
      <p style="color: #666; font-size: 0.9em; margin-top: 30px;">${t.team_signature}</p>
    </div>
  `;

  await queueEmail({
    to: userEmail,
    subject: emailSubject,
    html: emailHtml,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@luxiomarket.shop',
    maxAttempts: 3
  });

  console.log(`📧 Suspension email queued for ${userEmail}`);
}

export async function sendReactivationEmail(
  userEmail: string,
  userName: string,
  language: string = 'fr'
): Promise<void> {
  const userLanguage = (language || 'fr') as EmailLanguage;
  const t = emailTranslations[userLanguage];

  const emailSubject = t.subject_account_reactivated;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #22c55e;">${t.account_reactivated_title}</h2>
      <p>${t.hello} ${userName},</p>
      <p>${t.account_reactivated_message}</p>
      <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><strong>${t.account_reactivated_welcome}</strong></p>
      </div>
      <a href="https://luxiomarket.shop" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
        ${t.discover_products}
      </a>
      <p>${t.footer_note}</p>
      <p style="color: #666; font-size: 0.9em; margin-top: 30px;">${t.team_signature}</p>
    </div>
  `;

  await queueEmail({
    to: userEmail,
    subject: emailSubject,
    html: emailHtml,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@luxiomarket.shop',
    maxAttempts: 3
  });

  console.log(`📧 Reactivation email queued for ${userEmail}`);
}
