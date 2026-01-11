import { sendEmail as sendEmailViaSMTP } from './email.service.js';
import { getTranslation, type EmailLanguage } from './email-translations.js';
import { generateDepositMotif } from './payment-reference.js';
import crypto from 'crypto';
import type { Db } from 'mongodb';
import { getPasswordResetMessage } from '../server/utils/multilingual-messages.js';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  fromName?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  return sendEmailViaSMTP(options);
}

export const DEFAULT_FROM = process.env.MAIL_FROM || 'support@luxiomarket.shop';
const DEFAULT_ADMIN = process.env.ADMIN_EMAILS?.split(',')[0] || 'support@luxiomarket.shop';

function getEmailLayout(content: string, language: EmailLanguage = 'fr'): string {
  const t = getTranslation(language);
  
  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luxio</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f9fafb;
    }
    .email-container {
      max-width: 560px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      padding: 32px 24px;
      text-align: center;
    }
    .logo {
      color: #ffffff;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin: 0;
    }
    .content {
      padding: 32px 24px;
      color: #374151;
      line-height: 1.6;
    }
    .content h2 {
      color: #111827;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 16px 0;
    }
    .content p {
      margin: 0 0 16px 0;
      color: #6b7280;
    }
    .details {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .details table {
      width: 100%;
      border-collapse: collapse;
    }
    .details tr td {
      padding: 8px 0;
      vertical-align: top;
    }
    .details tr td:first-child {
      color: #6b7280;
      font-size: 14px;
      width: 40%;
    }
    .details tr td:last-child {
      color: #111827;
      font-weight: 500;
      text-align: right;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #3b82f6;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      font-size: 14px;
      margin: 20px 0 8px 0;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      font-size: 13px;
      color: #9ca3af;
      border-top: 1px solid #e5e7eb;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 24px 0;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 0;
        border-radius: 0;
      }
      .content {
        padding: 24px 20px;
      }
      .header {
        padding: 24px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1 class="logo">Luxio</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      ${t.footer_note}
    </div>
  </div>
</body>
</html>
  `;
}

// ==================== EMAIL VERIFICATION ====================

export async function sendVerificationEmail(
  userEmail: string,
  firstName: string,
  verificationToken: string,
  language?: string
): Promise<boolean> {
  const lang = language?.toLowerCase() || 'fr';
  const validLanguages = ['fr', 'en', 'es', 'pt', 'pl', 'hu'];
  const emailLang = validLanguages.includes(lang) ? lang as EmailLanguage : 'fr';
  const t = getTranslation(emailLang);
  const backendUrl = process.env.BACKEND_URL || 'https://luxiomarket.shop';
  const verificationUrl = `${backendUrl}/api/auth/verify-email?token=${verificationToken}`;
  
  const htmlContent = getEmailLayout(`
    <h2>${t.verify_email_title}</h2>
    <p>${t.hello} <strong>${firstName}</strong>,</p>
    <p style="white-space: pre-line; line-height: 1.8;">${t.verify_email_message}</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${verificationUrl}" class="button">${t.verify_email_button}</a>
    </div>
    
    <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; font-size: 13px; color: #6b7280; margin: 24px 0;">
      <p style="margin: 0;">${t.verify_email_expiration}</p>
      <p style="margin: 8px 0 0 0; word-break: break-all; font-family: 'Courier New', monospace;">${verificationUrl}</p>
    </div>
    
    <div class="divider"></div>
    
    <p style="color: #6b7280; font-size: 14px; white-space: pre-line;">${t.team_signature}</p>
  `, emailLang);

  const textContent = `
${t.verify_email_title}

${t.hello} ${firstName},

${t.verify_email_message}

${t.verify_email_button}: ${verificationUrl}

${t.verify_email_expiration}

${t.team_signature}
  `.trim();

  return sendEmail({
    to: userEmail,
    subject: t.subject_verify_email,
    html: htmlContent,
    text: textContent,
    from: DEFAULT_FROM
  });
}

// ==================== WELCOME EMAIL ====================

export async function sendWelcomeEmail(
  userEmail: string,
  firstName: string,
  language?: string
): Promise<boolean> {
  const lang = language?.toLowerCase() || 'fr';
  const validLanguages = ['fr', 'en', 'es', 'pt', 'pl', 'hu'];
  const emailLang = validLanguages.includes(lang) ? lang as EmailLanguage : 'fr';
  const t = getTranslation(emailLang);
  const dashboardUrl = process.env.FRONTEND_URL || process.env.REPLIT_DEV_DOMAIN || 'https://luxiomarket.shop';
  
  const htmlContent = getEmailLayout(`
    <h2>${t.welcome_title}</h2>
    <p>${t.hello} <strong>${firstName}</strong>,</p>
    <p style="white-space: pre-line; line-height: 1.8;">${t.welcome_message}</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${dashboardUrl}" class="button">${t.discover_products}</a>
    </div>
    
    <div class="divider"></div>
    
    <p style="color: #6b7280; font-size: 14px; white-space: pre-line;">${t.team_signature}</p>
  `, emailLang);

  const textContent = `
${t.welcome_title}

${t.hello} ${firstName},

${t.welcome_message}

${t.discover_products}: ${dashboardUrl}

${t.team_signature}
  `.trim();

  return sendEmail({
    to: userEmail,
    subject: t.subject_welcome,
    html: htmlContent,
    text: textContent,
    from: DEFAULT_FROM
  });
}

// ==================== PASSWORD RESET EMAIL ====================

const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL || DEFAULT_FROM;
const FRONTEND_URL = (process.env.CLIENT_URL || process.env.FRONTEND_URL || 'https://luxiomarket.shop').replace(/\/$/, '');
const TOKEN_TTL_MINUTES = Number(process.env.RESET_TOKEN_TTL_MINUTES || '60');

function generateUrlSafeToken(bytes = 32) {
  const raw = crypto.randomBytes(bytes).toString('base64');
  return raw.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

type SendPasswordResetOpts = {
  firstName?: string;
  locale?: string;
  db?: Db;
};

export async function sendPasswordResetEmail(
  userEmail: string,
  opts: SendPasswordResetOpts = {}
): Promise<boolean> {
  const { firstName = '', locale = 'en', db } = opts;

  if (!userEmail) { 
    console.error('[sendPasswordResetEmail] Missing userEmail'); 
    return false; 
  }

  let database: Db | undefined = db;
  try {
    if (!database) {
      throw new Error('No DB instance provided. Pass db in opts or adapt fallback.');
    }

    const users = database.collection('users');
    const user = await users.findOne({ email: userEmail.toLowerCase() });
    if (!user) {
      console.info('[sendPasswordResetEmail] No user found — returning success to avoid enumeration.');
      return true;
    }

    const resetToken = generateUrlSafeToken(32);
    const resetTokenHash = hashToken(resetToken);
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60_000);

    await users.updateOne(
      { _id: user._id },
      { $set: { 'security.resetPassword': { tokenHash: resetTokenHash, expiresAt, createdAt: new Date() } } }
    );

    const encodedToken = encodeURIComponent(resetToken);
    const resetUrl = `${FRONTEND_URL}/${locale}/reset-password?token=${encodedToken}`;
    
    const subject = getPasswordResetMessage('SUBJECT', locale);
    const hello = getPasswordResetMessage('HELLO', locale);
    const hi = getPasswordResetMessage('HI', locale);
    const clickToReset = getPasswordResetMessage('CLICK_TO_RESET', locale);
    const minutes = getPasswordResetMessage('MINUTES', locale);
    const buttonText = getPasswordResetMessage('BUTTON_TEXT', locale);
    const buttonAlt = getPasswordResetMessage('BUTTON_ALTERNATIVE', locale);
    const requested = getPasswordResetMessage('EMAIL_PLAIN_TEXT_REQUESTED', locale);
    const visit = getPasswordResetMessage('EMAIL_PLAIN_TEXT_VISIT', locale);
    const ignore = getPasswordResetMessage('EMAIL_PLAIN_TEXT_IGNORE', locale);

    const plainText = `${firstName ? `${hi} ${firstName},\n\n` : ''}${requested}\n${visit} ${resetUrl}\n\n${ignore}`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;font-size:16px;">
        <h2>${subject}</h2>
        <p>${firstName ? `${hello} ${firstName},` : `${hello},`}</p>
        <p>${clickToReset} ${TOKEN_TTL_MINUTES} ${minutes}</p>
        <p style="text-align:center;">
          <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" data-sg-omit="true"
             style="padding:12px 20px;border-radius:6px;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;">
             ${buttonText}
          </a>
        </p>
        <p>${buttonAlt}</p>
        <p><small><a href="${resetUrl}" target="_blank" data-sg-omit="true">${resetUrl}</a></small></p>
      </div>
    `;

    const msg = { 
      to: userEmail, 
      from: FROM_EMAIL, 
      subject, 
      text: plainText, 
      html
    };

    console.log('RESET EMAIL MSG:', msg);
    const sent = await sendEmail(msg);
    if (sent) {
      console.info('[sendPasswordResetEmail] Email sent successfully to:', userEmail);
    } else {
      console.error('[sendPasswordResetEmail] Failed to send email to:', userEmail);
    }
    return sent;

  } catch (err: any) {
    console.error('[sendPasswordResetEmail] Error:', err);
    return false;
  }
}

export async function verifyResetToken(db: Db, token: string) {
  const tokenHash = hashToken(token);
  const users = db.collection('users');
  const user = await users.findOne({ 'security.resetPassword.tokenHash': tokenHash });
  if (!user) return null;
  const meta = user.security?.resetPassword;
  if (!meta || !meta.expiresAt) return null;
  if (new Date(meta.expiresAt) < new Date()) return null;
  return user;
}

// ==================== BANK TRANSFER EMAILS ====================

interface BankTransferOrder {
  orderReference: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  language?: string;
}

export async function sendBankTransferEmail(
  order: BankTransferOrder
): Promise<boolean> {
  const lang = (order.language?.toLowerCase() || 'fr') as EmailLanguage;
  const t = getTranslation(lang);
  const dashboardUrl = process.env.FRONTEND_URL || process.env.REPLIT_DEV_DOMAIN || 'https://luxiomarket.shop';

  const htmlContent = getEmailLayout(`
    <h2>${t.order_confirmed}</h2>
    <p>${t.hello} <strong>${order.customerName}</strong>,</p>
    <p style="white-space: pre-line; line-height: 1.8;">${t.order_received}</p>
    
    <div class="details">
      <table>
        <tr>
          <td>${t.order_number}</td>
          <td style="font-weight: 600;">#${order.orderReference}</td>
        </tr>
        <tr>
          <td>${t.total_amount}</td>
          <td style="font-size: 18px; font-weight: 600; color: #059669;">${order.totalAmount.toFixed(2)} €</td>
        </tr>
      </table>
    </div>

    <div class="divider"></div>

    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 24px 0 16px 0;">💳 ${t.bank_transfer_info_title || t.bank_transfer || 'Informations de virement'}</h3>
    <p style="white-space: pre-line; line-height: 1.8; color: #6b7280; font-size: 14px;">${t.bank_instructions}</p>
    
    <div class="details">
      <table>
        <tr>
          <td>${t.beneficiary}</td>
          <td style="font-weight: 600;">Matt Luxio</td>
        </tr>
        <tr>
          <td>${t.iban}</td>
          <td style="font-family: 'Courier New', monospace; font-size: 13px; font-weight: 600;">ES6115632626383268707364</td>
        </tr>
        <tr>
          <td>${t.bic}</td>
          <td style="font-family: 'Courier New', monospace; font-weight: 600;">NTSBESM1XXX</td>
        </tr>
        <tr>
          <td>${t.transfer_reason}</td>
          <td style="font-weight: 600; color: #dc2626;">${generateDepositMotif(order.orderReference, lang)}</td>
        </tr>
      </table>
    </div>

    <p style="white-space: pre-line; line-height: 1.8; font-size: 14px; color: #6b7280; margin: 24px 0;">${t.delivery_time}</p>
    
    <div style="background-color: #eff6ff; padding: 16px; border-radius: 6px; font-size: 14px; color: #1e40af; margin: 24px 0; border-left: 4px solid #3b82f6;">
      <p style="margin: 0; white-space: pre-line; line-height: 1.6;">${t.proof_instruction}</p>
    </div>
    
    <div style="text-align: center;">
      <a href="${dashboardUrl}/dashboard" class="button">${t.access_dashboard}</a>
    </div>
    
    <div class="divider"></div>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 24px; white-space: pre-line;">${t.team_signature}</p>
  `, lang);

  const textContent = `
${t.order_confirmed}

${t.hello} ${order.customerName},

${t.bank_instructions}

${t.order_number}: #${order.orderReference}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €

${t.beneficiary}: Matt Luxio
${t.iban}: ES6115632626383268707364
${t.bic}: NTSBESM1XXX
${t.transfer_reason}: ${generateDepositMotif(order.orderReference, lang)}

${t.delivery_time}

${t.proof_instruction}

${t.access_dashboard}: ${dashboardUrl}/dashboard

${t.team_signature}
  `.trim();

  return sendEmail({
    to: order.customerEmail,
    subject: t.subject_order_confirm,
    html: htmlContent,
    text: textContent,
    from: DEFAULT_FROM
  });
}

export async function sendBankTransferNotificationToAdmin(
  order: BankTransferOrder
): Promise<boolean> {
  const t = getTranslation('fr');
  
  const adminHtml = getEmailLayout(`
    <h2>${t.new_order_received}</h2>
    
    <div class="details">
      <table>
        <tr>
          <td>${t.order_number}</td>
          <td>#${order.orderReference}</td>
        </tr>
        <tr>
          <td>${t.customer_name}</td>
          <td>${order.customerName}</td>
        </tr>
        <tr>
          <td>${t.customer_email}</td>
          <td>${order.customerEmail}</td>
        </tr>
        <tr>
          <td>${t.total_amount}</td>
          <td style="font-size: 18px; font-weight: 600; color: #059669;">${order.totalAmount.toFixed(2)} €</td>
        </tr>
        <tr>
          <td>${t.payment_method}</td>
          <td>${t.bank_transfer}</td>
        </tr>
      </table>
    </div>
  `, 'fr');

  const adminText = `
${t.new_order_received}

${t.order_number}: #${order.orderReference}
${t.customer_name}: ${order.customerName}
${t.customer_email}: ${order.customerEmail}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${t.payment_method}: ${t.bank_transfer}
  `.trim();

  return sendEmail({
    to: DEFAULT_ADMIN,
    subject: t.subject_admin_new_order,
    html: adminHtml,
    text: adminText,
    from: DEFAULT_FROM
  });
}

// ==================== NOWPAYMENTS/CRYPTO EMAILS ====================

interface NowPaymentsOrder {
  orderReference: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  transactionId: string;
  payAmount?: number;
  payCurrency?: string;
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  language?: string;
}

export async function sendNowPaymentsConfirmationToCustomer(
  order: NowPaymentsOrder
): Promise<boolean> {
  const lang = (order.language?.toLowerCase() || 'fr') as EmailLanguage;
  const t = getTranslation(lang);
  const dashboardUrl = process.env.FRONTEND_URL || process.env.REPLIT_DEV_DOMAIN || 'https://luxiomarket.shop';

  const htmlContent = getEmailLayout(`
    <h2>${t.order_confirmed}</h2>
    <p>${t.hello} <strong>${order.customerName}</strong>,</p>
    <p style="line-height: 1.8; color: #059669; font-weight: 500;">${t.payment_received}</p>
    
    <div class="details">
      <table>
        <tr>
          <td>${t.order_number}</td>
          <td style="font-weight: 600;">#${order.orderReference}</td>
        </tr>
        <tr>
          <td>${t.total_amount}</td>
          <td style="font-size: 18px; font-weight: 600; color: #059669;">${order.totalAmount.toFixed(2)} €</td>
        </tr>
        ${order.payAmount && order.payCurrency ? `
        <tr>
          <td>Montant payé</td>
          <td style="font-family: 'Courier New', monospace; font-size: 12px; font-weight: 600;">${order.payAmount} ${order.payCurrency.toUpperCase()}</td>
        </tr>
        ` : ''}
        <tr>
          <td>${t.transaction_id}</td>
          <td style="font-family: 'Courier New', monospace; font-size: 12px; font-weight: 600;">${order.transactionId}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #ecfdf5; padding: 16px; border-radius: 6px; font-size: 14px; color: #065f46; margin: 24px 0; border-left: 4px solid #059669;">
      <p style="margin: 0; white-space: pre-line; line-height: 1.6;">${t.verification_message}</p>
    </div>
    
    <div style="text-align: center;">
      <a href="${dashboardUrl}/dashboard" class="button">${t.access_dashboard}</a>
    </div>
    
    <div class="divider"></div>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 24px; white-space: pre-line;">${t.team_signature}</p>
  `, lang);

  const textContent = `
${t.order_confirmed}

${t.hello} ${order.customerName},

${t.payment_received}

${t.order_number}: #${order.orderReference}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${order.payAmount && order.payCurrency ? `Montant payé: ${order.payAmount} ${order.payCurrency.toUpperCase()}` : ''}
${t.transaction_id}: ${order.transactionId}

${t.verification_message}

${t.access_dashboard}: ${dashboardUrl}/dashboard

${t.team_signature}
  `.trim();

  return sendEmail({
    to: order.customerEmail,
    subject: t.subject_crypto_confirm,
    html: htmlContent,
    text: textContent,
    from: DEFAULT_FROM
  });
}

export async function sendNowPaymentsNotificationToAdmin(
  order: NowPaymentsOrder
): Promise<boolean> {
  const t = getTranslation('fr');
  
  const adminHtml = getEmailLayout(`
    <h2>${t.new_order_received}</h2>
    
    <div class="details">
      <table>
        <tr>
          <td>${t.order_number}</td>
          <td>#${order.orderReference}</td>
        </tr>
        <tr>
          <td>${t.customer_name}</td>
          <td>${order.customerName}</td>
        </tr>
        <tr>
          <td>${t.customer_email}</td>
          <td>${order.customerEmail}</td>
        </tr>
        <tr>
          <td>${t.total_amount}</td>
          <td style="font-size: 18px; font-weight: 600; color: #059669;">${order.totalAmount.toFixed(2)} €</td>
        </tr>
        ${order.payAmount && order.payCurrency ? `
        <tr>
          <td>Montant payé (crypto)</td>
          <td style="font-family: 'Courier New', monospace;">${order.payAmount} ${order.payCurrency.toUpperCase()}</td>
        </tr>
        ` : ''}
        <tr>
          <td>${t.payment_method}</td>
          <td>${t.crypto_payment} (NowPayments)</td>
        </tr>
        <tr>
          <td>${t.transaction_id}</td>
          <td style="font-family: 'Courier New', monospace; font-size: 13px;">${order.transactionId}</td>
        </tr>
      </table>
    </div>
  `, 'fr');

  const adminText = `
${t.new_order_received}

${t.order_number}: #${order.orderReference}
${t.customer_name}: ${order.customerName}
${t.customer_email}: ${order.customerEmail}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${order.payAmount && order.payCurrency ? `Montant payé: ${order.payAmount} ${order.payCurrency.toUpperCase()}` : ''}
${t.payment_method}: ${t.crypto_payment} (NowPayments)
${t.transaction_id}: ${order.transactionId}
  `.trim();

  return sendEmail({
    to: DEFAULT_ADMIN,
    subject: t.subject_admin_new_order,
    html: adminHtml,
    text: adminText,
    from: DEFAULT_FROM
  });
}


// ==================== OXAPAY/CRYPTO EMAILS ====================

interface OxaPayOrder {
  orderReference: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  transactionId: string;
  payAmount?: number;
  payCurrency?: string;
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  language?: string;
}

export async function sendOxaPayConfirmationToCustomer(
  order: OxaPayOrder
): Promise<boolean> {
  const lang = (order.language?.toLowerCase() || 'fr') as EmailLanguage;
  const t = getTranslation(lang);
  const dashboardUrl = process.env.FRONTEND_URL || process.env.REPLIT_DEV_DOMAIN || 'https://luxiomarket.shop';

  const htmlContent = getEmailLayout(`
    <h2>${t.order_confirmed}</h2>
    <p>${t.hello} <strong>${order.customerName}</strong>,</p>
    <p style="line-height: 1.8; color: #059669; font-weight: 500;">${t.payment_received}</p>
    
    <div class="details">
      <table>
        <tr>
          <td>${t.order_number}</td>
          <td style="font-weight: 600;">#${order.orderReference}</td>
        </tr>
        <tr>
          <td>${t.total_amount}</td>
          <td style="font-size: 18px; font-weight: 600; color: #059669;">${order.totalAmount.toFixed(2)} €</td>
        </tr>
        ${order.payAmount && order.payCurrency ? `
        <tr>
          <td>Montant payé</td>
          <td style="font-family: 'Courier New', monospace; font-size: 12px; font-weight: 600;">${order.payAmount} ${order.payCurrency.toUpperCase()}</td>
        </tr>
        ` : ''}
        <tr>
          <td>${t.transaction_id}</td>
          <td style="font-family: 'Courier New', monospace; font-size: 12px; font-weight: 600;">${order.transactionId}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #ecfdf5; padding: 16px; border-radius: 6px; font-size: 14px; color: #065f46; margin: 24px 0; border-left: 4px solid #059669;">
      <p style="margin: 0; white-space: pre-line; line-height: 1.6;">${t.verification_message}</p>
    </div>
    
    <div style="text-align: center;">
      <a href="${dashboardUrl}/dashboard" class="button">${t.access_dashboard}</a>
    </div>
    
    <div class="divider"></div>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 24px; white-space: pre-line;">${t.team_signature}</p>
  `, lang);

  const textContent = `
${t.order_confirmed}

${t.hello} ${order.customerName},

${t.payment_received}

${t.order_number}: #${order.orderReference}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${order.payAmount && order.payCurrency ? `Montant payé: ${order.payAmount} ${order.payCurrency.toUpperCase()}` : ''}
${t.transaction_id}: ${order.transactionId}

${t.verification_message}

${t.access_dashboard}: ${dashboardUrl}/dashboard

${t.team_signature}
  `.trim();

  return sendEmail({
    to: order.customerEmail,
    subject: t.subject_crypto_confirm,
    html: htmlContent,
    text: textContent,
    from: DEFAULT_FROM
  });
}

export async function sendOxaPayNotificationToAdmin(
  order: OxaPayOrder
): Promise<boolean> {
  const t = getTranslation('fr');
  
  const adminHtml = getEmailLayout(`
    <h2>${t.new_order_received}</h2>
    
    <div class="details">
      <table>
        <tr>
          <td>${t.order_number}</td>
          <td>#${order.orderReference}</td>
        </tr>
        <tr>
          <td>${t.customer_name}</td>
          <td>${order.customerName}</td>
        </tr>
        <tr>
          <td>${t.customer_email}</td>
          <td>${order.customerEmail}</td>
        </tr>
        <tr>
          <td>${t.total_amount}</td>
          <td style="font-size: 18px; font-weight: 600; color: #059669;">${order.totalAmount.toFixed(2)} €</td>
        </tr>
        ${order.payAmount && order.payCurrency ? `
        <tr>
          <td>Montant payé (crypto)</td>
          <td style="font-family: 'Courier New', monospace;">${order.payAmount} ${order.payCurrency.toUpperCase()}</td>
        </tr>
        ` : ''}
        <tr>
          <td>${t.payment_method}</td>
          <td>${t.crypto_payment} (OxaPay)</td>
        </tr>
        <tr>
          <td>${t.transaction_id}</td>
          <td style="font-family: 'Courier New', monospace; font-size: 13px;">${order.transactionId}</td>
        </tr>
      </table>
    </div>
  `, 'fr');

  const adminText = `
${t.new_order_received}

${t.order_number}: #${order.orderReference}
${t.customer_name}: ${order.customerName}
${t.customer_email}: ${order.customerEmail}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${order.payAmount && order.payCurrency ? `Montant payé: ${order.payAmount} ${order.payCurrency.toUpperCase()}` : ''}
${t.payment_method}: ${t.crypto_payment} (OxaPay)
${t.transaction_id}: ${order.transactionId}
  `.trim();

  return sendEmail({
    to: DEFAULT_ADMIN,
    subject: t.subject_admin_new_order,
    html: adminHtml,
    text: adminText,
    from: DEFAULT_FROM
  });
}


export async function sendSuspensionEmail(
  email: string,
  firstName: string,
  suspendedUntil: Date,
  language: EmailLanguage = 'fr'
): Promise<boolean> {
  const t = getTranslation(language);
  const formattedDate = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : `${language}-${language.toUpperCase()}`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(suspendedUntil));

  const html = getEmailLayout(`
    <h2>${t.account_suspended_title}</h2>
    <p><strong>${t.hello} ${firstName},</strong></p>
    <p>${t.account_suspended_message.replace(/\n\n/g, '</p><p>')}</p>
    
    <div class="details" style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 24px 0;">
      <p style="margin: 0 0 12px 0; color: #991b1b; font-weight: 600;">${t.account_suspended_reason}</p>
      <p style="margin: 0; color: #7f1d1d;"><strong>${t.account_suspended_until}:</strong> ${formattedDate}</p>
    </div>
    
    <div class="details" style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #6b7280; margin: 24px 0;">
      <p style="white-space: pre-line; margin: 0; color: #374151;">${t.account_suspended_actions}</p>
    </div>
    
    <p style="margin-top: 24px; color: #6b7280;">${t.team_signature.replace(/\n/g, '<br>')}</p>
  `, language);

  const text = `
${t.account_suspended_title}

${t.hello} ${firstName},

${t.account_suspended_message}

${t.account_suspended_reason}
${t.account_suspended_until}: ${formattedDate}

${t.account_suspended_actions}

${t.team_signature}
  `.trim();

  return sendEmail({
    to: email,
    subject: t.subject_account_suspended,
    html,
    text,
    from: DEFAULT_FROM
  });
}

export async function sendReactivationEmail(
  email: string,
  firstName: string,
  language: EmailLanguage = 'fr'
): Promise<boolean> {
  const t = getTranslation(language);

  const html = getEmailLayout(`
    <h2>${t.account_reactivated_title}</h2>
    <p><strong>${t.hello} ${firstName},</strong></p>
    <p>${t.account_reactivated_message.replace(/\n\n/g, '</p><p>')}</p>
    
    <div class="details" style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #059669; margin: 24px 0;">
      <p style="margin: 0; color: #047857;">${t.account_reactivated_welcome}</p>
    </div>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${process.env.FRONTEND_URL || 'https://luxiomarket.shop'}" class="button" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);">${t.discover_products}</a>
    </div>
    
    <p style="margin-top: 24px; color: #6b7280;">${t.team_signature.replace(/\n/g, '<br>')}</p>
  `, language);

  const text = `
${t.account_reactivated_title}

${t.hello} ${firstName},

${t.account_reactivated_message}

${t.account_reactivated_welcome}

${t.discover_products}: ${process.env.FRONTEND_URL || 'https://luxiomarket.shop'}

${t.team_signature}
  `.trim();

  return sendEmail({
    to: email,
    subject: t.subject_account_reactivated,
    html,
    text,
    from: DEFAULT_FROM
  });
}

// ==================== COUPON EMAIL ====================

export interface CouponEmailData {
  customerEmail: string;
  customerName: string;
  couponCode: string;
  discountPercent: number;
  expirationDate: Date;
  language?: string;
}

export async function sendCouponEmail(data: CouponEmailData): Promise<boolean> {
  const lang = data.language?.toLowerCase() || 'fr';
  const validLanguages = ['fr', 'en', 'es', 'pt', 'pl', 'hu'];
  const emailLang = validLanguages.includes(lang) ? lang as EmailLanguage : 'fr';
  const t = getTranslation(emailLang);
  
  const firstName = data.customerName.split(' ')[0] || data.customerName;
  const formattedDate = new Date(data.expirationDate).toLocaleDateString(emailLang === 'en' ? 'en-US' : emailLang === 'fr' ? 'fr-FR' : emailLang === 'es' ? 'es-ES' : emailLang === 'pt' ? 'pt-BR' : emailLang === 'pl' ? 'pl-PL' : 'hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const frontendUrl = process.env.FRONTEND_URL || 'https://luxiomarket.shop';

  const html = getEmailLayout(`
    <h2>${t.coupon_title}</h2>
    <p><strong>${t.hello} ${firstName},</strong></p>
    <p>${t.coupon_message}</p>
    
    <div class="details" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; border: 2px dashed #f59e0b;">
      <p style="margin: 0 0 8px 0; color: #78350f; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">${t.coupon_code_label}</p>
      <p style="margin: 0; font-size: 28px; font-weight: 700; color: #92400e; font-family: monospace; letter-spacing: 2px;">${data.couponCode}</p>
    </div>
    
    <div class="details" style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${t.coupon_discount_label}</td>
          <td style="padding: 8px 0; color: #059669; font-weight: 700; text-align: right; font-size: 18px;">-${data.discountPercent}%</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${t.coupon_expires_label}</td>
          <td style="padding: 8px 0; color: #111827; font-weight: 500; text-align: right;">${formattedDate}</td>
        </tr>
      </table>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; background-color: #f3f4f6; padding: 12px 16px; border-radius: 6px;">${t.coupon_how_to_use}</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${frontendUrl}" class="button" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);">${t.coupon_shop_now}</a>
    </div>
    
    <p style="margin-top: 24px; color: #6b7280;">${t.team_signature.replace(/\n/g, '<br>')}</p>
  `, emailLang);

  const text = `
${t.coupon_title}

${t.hello} ${firstName},

${t.coupon_message}

${t.coupon_code_label}: ${data.couponCode}
${t.coupon_discount_label}: -${data.discountPercent}%
${t.coupon_expires_label}: ${formattedDate}

${t.coupon_how_to_use}

${t.coupon_shop_now}: ${frontendUrl}

${t.team_signature}
  `.trim();

  try {
    const result = await sendEmail({
      to: data.customerEmail,
      subject: t.subject_coupon,
      html,
      text,
      from: DEFAULT_FROM
    });
    
    if (result) {
      console.log(`[Coupon Email] Successfully sent coupon email to ${data.customerEmail} with code ${data.couponCode}`);
    } else {
      console.error(`[Coupon Email] Failed to send coupon email to ${data.customerEmail} - sendEmail returned false`);
    }
    
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error(`[Coupon Email] Error sending coupon email to ${data.customerEmail}:`, {
      couponCode: data.couponCode,
      error: errorMessage,
      stack: errorStack
    });
    return false;
  }
}

