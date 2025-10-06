import { sendEmail as sendEmailViaSMTP } from './mailer.js';
import { getTranslation, type EmailLanguage } from './email-translations.js';

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

const DEFAULT_FROM = 'replitprojet97@gmail.com';
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
  const dashboardUrl = process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com';
  
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
  const dashboardUrl = process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com';

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
  const dashboardUrl = process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com';

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

// ==================== MAXELPAY/CRYPTO EMAILS ====================

interface MaxelPayOrder {
  orderReference: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  transactionId: string;
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  language?: string;
}

export async function sendMaxelPayConfirmationToCustomer(
  order: MaxelPayOrder
): Promise<boolean> {
  const lang = (order.language?.toLowerCase() || 'fr') as EmailLanguage;
  const t = getTranslation(lang);
  const dashboardUrl = process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com';

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

export async function sendMaxelPayNotificationToAdmin(
  order: MaxelPayOrder
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
          <td>${t.crypto_payment}</td>
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
${t.payment_method}: ${t.crypto_payment}
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
