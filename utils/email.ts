import { sendEmail as sendEmailViaSMTP } from './mailer.js';
import { getTranslation, type EmailLanguage } from './email-translations.js';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import type { Db } from 'mongodb';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  return sendEmailViaSMTP(options);
}

export const DEFAULT_FROM = 'replitprojet97@gmail.com';
const DEFAULT_ADMIN = 'replitprojet97@gmail.com';

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
  const baseUrl = process.env.FRONTEND_URL || process.env.REPLIT_DEV_DOMAIN || 'https://luxiomarket.shop';
  const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
  
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

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || DEFAULT_FROM;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
const FRONTEND_URL = (process.env.CLIENT_URL || process.env.FRONTEND_URL || 'https://luxiomarket.shop').replace(/\/$/, '');
const TOKEN_TTL_MINUTES = Number(process.env.RESET_TOKEN_TTL_MINUTES || '60');

if (!FROM_EMAIL || !SENDGRID_API_KEY) {
  console.warn('Warning: SENDGRID_FROM_EMAIL or SENDGRID_API_KEY not set. Email sending will fail.');
}

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

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
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${encodedToken}`;

    const subjects: Record<string,string> = {
      en:'Reset your password', fr:'Réinitialiser votre mot de passe', es:'Restablece tu contraseña',
      pt:'Redefinir sua senha', hu:'Jelszó visszaállítása', it:'Reimposta la tua password', pl:'Zresetuj swoje hasło'
    };
    const subject = subjects[locale] || subjects.en;

    const plainText = `${firstName ? `Hi ${firstName},\n\n` : ''}You (or someone else) requested a password reset.\nVisit: ${resetUrl}\n\nIf you didn't request this, ignore this email.`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;font-size:16px;">
        <h2>${subject}</h2>
        <p>${firstName ? `Hello ${firstName},` : 'Hello,'}</p>
        <p>Click below to reset your password (expires in ${TOKEN_TTL_MINUTES} minutes):</p>
        <p style="text-align:center;">
          <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" data-sg-omit="true"
             style="padding:12px 20px;border-radius:6px;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;">
             Reset password
          </a>
        </p>
        <p>If button doesn't work, copy & paste this URL:</p>
        <p><small><a href="${resetUrl}" target="_blank" data-sg-omit="true">${resetUrl}</a></small></p>
      </div>
    `;

    const msg = { 
      to: userEmail, 
      from: FROM_EMAIL, 
      subject, 
      text: plainText, 
      html,
      trackingSettings: { 
        clickTracking: { enable: false, enable_text: false }, 
        openTracking: { enable: true } 
      } 
    };

    await sgMail.send(msg);
    console.info('[sendPasswordResetEmail] Email sent successfully to:', userEmail);
    return true;

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

    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 24px 0 16px 0;">💳 Informations de virement</h3>
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
          <td style="font-weight: 600; color: #dc2626;">Dépôt + ${order.customerName}</td>
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
${t.transfer_reason}: Dépôt + ${order.customerName}

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

// ==================== TICKET PAYMENT EMAILS ====================

interface TicketPaymentOrder {
  orderReference: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  ticketType: 'TransCash' | 'PCS';
  ticketCodes: string[];
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  language?: string;
}

export async function sendTicketConfirmationToCustomer(
  order: TicketPaymentOrder
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
        <tr>
          <td>${t.payment_method}</td>
          <td style="font-weight: 600;">${order.ticketType}</td>
        </tr>
        <tr>
          <td>${t.status}</td>
          <td style="color: #f59e0b; font-weight: 600;">⏳ ${t.pending_validation}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #fef3c7; padding: 16px; border-radius: 6px; font-size: 14px; color: #92400e; margin: 24px 0; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; white-space: pre-line; line-height: 1.6;">${t.validation_time}</p>
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

${t.order_received}

${t.order_number}: #${order.orderReference}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${t.payment_method}: ${order.ticketType}
${t.status}: ${t.pending_validation}

${t.validation_time}

${t.access_dashboard}: ${dashboardUrl}/dashboard

${t.team_signature}
  `.trim();

  return sendEmail({
    to: order.customerEmail,
    subject: t.subject_ticket_confirm,
    html: htmlContent,
    text: textContent,
    from: DEFAULT_FROM
  });
}

export async function sendTicketNotificationToSupport(
  order: TicketPaymentOrder
): Promise<boolean> {
  const t = getTranslation('fr');
  
  const supportHtml = getEmailLayout(`
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
          <td style="font-size: 18px; font-weight: 600;">${order.totalAmount.toFixed(2)} €</td>
        </tr>
        <tr>
          <td>${t.ticket_type}</td>
          <td>${order.ticketType}</td>
        </tr>
        <tr>
          <td>${t.codes_submitted}</td>
          <td>${order.ticketCodes.length} codes</td>
        </tr>
      </table>
    </div>
  `, 'fr');

  const supportText = `
${t.new_order_received}

${t.order_number}: #${order.orderReference}
${t.customer_name}: ${order.customerName}
${t.customer_email}: ${order.customerEmail}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${t.ticket_type}: ${order.ticketType}
${t.codes_submitted}: ${order.ticketCodes.length} codes
  `.trim();

  return sendEmail({
    to: DEFAULT_ADMIN,
    subject: t.subject_admin_new_order,
    html: supportHtml,
    text: supportText,
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
