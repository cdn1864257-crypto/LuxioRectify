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
  const dashboardUrl = process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com';
  
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
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      padding: 30px 20px;
      text-align: center;
    }
    .logo {
      color: #ffffff;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 1px;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
      color: #333333;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #3b82f6;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .info-box {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 15px 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .warning-box {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .summary-box {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin: 25px 0;
    }
    .bank-details {
      background-color: #eff6ff;
      border: 2px solid #3b82f6;
      border-radius: 8px;
      padding: 25px;
      margin: 25px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table tr td {
      padding: 8px 0;
    }
    .footer {
      background-color: #1f2937;
      color: #9ca3af;
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #60a5fa;
      text-decoration: none;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 30px 0;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 30px 20px;
      }
      .button {
        display: block;
        text-align: center;
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
      <p><strong>Luxio</strong></p>
      <p><a href="mailto:${DEFAULT_FROM}">${DEFAULT_FROM}</a></p>
      <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
        ${t.footer_note}
      </p>
      <p style="margin-top: 10px;">
        ${t.team_signature}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
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
    <h2 style="color: #1e3a8a; margin-top: 0;">${t.order_confirmed}</h2>
    <p>${t.hello} <strong>${order.customerName}</strong>,</p>
    <p>${t.bank_instructions}</p>
    
    <div class="bank-details">
      <h3 style="margin-top: 0; color: #1e40af; font-size: 18px;">🏦 ${t.order_details}</h3>
      <table>
        <tr>
          <td style="color: #6b7280; font-weight: 500;">${t.beneficiary}:</td>
          <td style="font-weight: 700; color: #111827;">Matt Luxio</td>
        </tr>
        <tr>
          <td style="color: #6b7280; font-weight: 500;">${t.iban}:</td>
          <td style="font-family: 'Courier New', monospace; font-weight: 700; color: #1e40af;">
            ES6115632626383268707364
          </td>
        </tr>
        <tr>
          <td style="color: #6b7280; font-weight: 500;">${t.bic}:</td>
          <td style="font-family: 'Courier New', monospace; font-weight: 700; color: #1e40af;">
            NTSBESM1XXX
          </td>
        </tr>
        <tr>
          <td style="color: #6b7280; font-weight: 500;">${t.transfer_reason}:</td>
          <td style="font-family: 'Courier New', monospace; font-weight: 700; color: #dc2626;">
            Dépôt + ${order.customerName}
          </td>
        </tr>
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding-top: 12px; color: #6b7280; font-weight: 500;">${t.total_amount}:</td>
          <td style="padding-top: 12px; font-size: 24px; font-weight: 700; color: #059669;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    <div class="summary-box">
      <h3 style="margin-top: 0; color: #374151; font-size: 18px;">📦 ${t.order_summary}</h3>
      <table>
        ${order.cartItems.map(item => `
          <tr>
            <td style="color: #374151;">
              ${item.name} <span style="color: #6b7280;">(x${item.quantity})</span>
            </td>
            <td style="text-align: right; font-weight: 600; color: #111827;">
              ${(item.price * item.quantity).toFixed(2)} €
            </td>
          </tr>
        `).join('')}
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding-top: 12px; font-weight: 700; font-size: 18px; color: #111827;">${t.total_amount}</td>
          <td style="padding-top: 12px; text-align: right; font-size: 20px; font-weight: 700; color: #059669;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    <div class="info-box">
      <p style="margin: 5px 0; color: #1e40af; font-weight: 600;">
        ✅ ${t.instant_transfer}
      </p>
      <p style="margin: 5px 0; color: #1e40af; font-weight: 600;">
        ⏱️ ${t.standard_transfer}
      </p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}/dashboard" class="button">
        ${t.access_dashboard}
      </a>
    </div>
  `, lang);

  const textContent = `
${t.order_confirmed}

${t.hello} ${order.customerName},

${t.bank_instructions}

--- ${t.order_details} ---
${t.beneficiary}: Matt Luxio
${t.iban}: ES6115632626383268707364
${t.bic}: NTSBESM1XXX
${t.transfer_reason}: Dépôt + ${order.customerName}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €

--- ${t.order_summary} ---
${order.cartItems.map(item => `${item.name} (x${item.quantity}): ${(item.price * item.quantity).toFixed(2)} €`).join('\n')}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €

✅ ${t.instant_transfer}
⏱️ ${t.standard_transfer}

${t.access_dashboard}: ${dashboardUrl}/dashboard

${t.footer_note}
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

export async function sendBankTransferNotification(
  order: BankTransferOrder
): Promise<boolean> {
  const lang = 'fr' as EmailLanguage;
  const t = getTranslation(lang);

  const htmlContent = getEmailLayout(`
    <h2 style="color: #dc2626; margin-top: 0;">🔔 ${t.new_order_received}</h2>
    <p><strong>${t.admin_notification}</strong></p>
    
    <div class="summary-box" style="border: 2px solid #3b82f6;">
      <h3 style="margin-top: 0; color: #374151; font-size: 18px;">📋 ${t.order_details}</h3>
      <table>
        <tr>
          <td style="color: #6b7280; width: 40%;">${t.order_number}:</td>
          <td style="font-weight: 700; color: #dc2626;">${order.orderReference}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.customer_name}:</td>
          <td style="font-weight: 600;">${order.customerName}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.customer_email}:</td>
          <td style="font-weight: 600;">${order.customerEmail}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.payment_method}:</td>
          <td style="font-weight: 600;">${t.bank_transfer}</td>
        </tr>
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding-top: 12px; color: #6b7280; font-weight: 600;">${t.total_amount}:</td>
          <td style="padding-top: 12px; font-size: 20px; font-weight: 700; color: #059669;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    <div class="summary-box">
      <h3 style="margin-top: 0; color: #374151; font-size: 16px;">${t.items}:</h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${order.cartItems.map(item => `
          <li style="margin: 8px 0;">
            ${item.name} - ${t.quantity}: ${item.quantity} - ${t.price}: ${item.price.toFixed(2)} €
          </li>
        `).join('')}
      </ul>
    </div>
  `, lang);

  const textContent = `
🔔 ${t.new_order_received}

${t.admin_notification}

--- ${t.order_details} ---
${t.order_number}: ${order.orderReference}
${t.customer_name}: ${order.customerName}
${t.customer_email}: ${order.customerEmail}
${t.payment_method}: ${t.bank_transfer}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €

--- ${t.items} ---
${order.cartItems.map(item => `${item.name} - ${t.quantity}: ${item.quantity} - ${t.price}: ${item.price.toFixed(2)} €`).join('\n')}

${t.team_signature}
  `.trim();

  return sendEmail({
    to: DEFAULT_ADMIN,
    subject: `${t.subject_admin_new_order} - ${order.orderReference}`,
    html: htmlContent,
    text: textContent,
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
    <h2 style="color: #1e3a8a; margin-top: 0;">${t.order_confirmed}</h2>
    <p>${t.hello} <strong>${order.customerName}</strong>,</p>
    <p>${t.ticket_thanks}</p>
    
    <div class="summary-box">
      <h3 style="margin-top: 0; color: #374151; font-size: 18px;">📋 ${t.order_summary}</h3>
      <table>
        <tr>
          <td style="color: #6b7280;">${t.order_number}:</td>
          <td style="font-weight: 700; color: #111827;">#${order.orderReference}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.ticket_type}:</td>
          <td style="font-weight: 600;">${order.ticketType}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.total_amount}:</td>
          <td style="font-size: 20px; font-weight: 700; color: #059669;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
        <tr>
          <td style="color: #6b7280; vertical-align: top;">${t.codes_submitted}:</td>
          <td>
            <ul style="margin: 5px 0; padding-left: 20px;">
              ${order.ticketCodes.map(code => `<li style="font-family: 'Courier New', monospace; margin: 3px 0;">${code.substring(0, 4)}****</li>`).join('')}
            </ul>
          </td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.status}:</td>
          <td style="font-weight: 600; color: #f59e0b;">${t.pending_validation}</td>
        </tr>
      </table>
    </div>

    <div class="warning-box">
      <p style="margin: 0; color: #92400e; font-weight: 600;">
        ⏳ ${t.ticket_wait_message}
      </p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}/dashboard" class="button">
        ${t.access_dashboard}
      </a>
    </div>
  `, lang);

  const textContent = `
${t.order_confirmed}

${t.hello} ${order.customerName},

${t.ticket_thanks}

--- ${t.order_summary} ---
${t.order_number}: #${order.orderReference}
${t.ticket_type}: ${order.ticketType}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${t.codes_submitted}: ${order.ticketCodes.length} code(s)
${t.status}: ${t.pending_validation}

⏳ ${t.ticket_wait_message}

${t.access_dashboard}: ${dashboardUrl}/dashboard

${t.footer_note}
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
  const lang = 'fr' as EmailLanguage;
  const t = getTranslation(lang);

  const htmlContent = getEmailLayout(`
    <h2 style="color: #dc2626; margin-top: 0;">🔔 ${t.new_order_received}</h2>
    <p><strong>${t.admin_notification} - ${t.ticket_payment}</strong></p>
    
    <div class="summary-box" style="border: 2px solid #3b82f6;">
      <h3 style="margin-top: 0; color: #374151; font-size: 18px;">📋 ${t.order_details}</h3>
      <table>
        <tr>
          <td style="color: #6b7280; width: 40%;">${t.order_number}:</td>
          <td style="font-weight: 700; color: #dc2626;">#${order.orderReference}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.customer_name}:</td>
          <td style="font-weight: 600;">${order.customerName}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.customer_email}:</td>
          <td style="font-weight: 600;">${order.customerEmail}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.payment_method}:</td>
          <td style="font-weight: 600;">${order.ticketType}</td>
        </tr>
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding-top: 12px; color: #6b7280; font-weight: 600;">${t.total_amount}:</td>
          <td style="padding-top: 12px; font-size: 20px; font-weight: 700; color: #059669;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    <div class="warning-box">
      <h3 style="margin-top: 0; color: #92400e; font-size: 16px;">💳 ${t.codes_submitted}:</h3>
      <ul style="margin: 10px 0; padding-left: 20px;">
        ${order.ticketCodes.map(code => `
          <li style="margin: 8px 0; font-family: 'Courier New', monospace; font-size: 16px; font-weight: 700; color: #b45309;">
            ${code}
          </li>
        `).join('')}
      </ul>
    </div>

    ${order.cartItems ? `
    <div class="summary-box">
      <h3 style="margin-top: 0; color: #374151; font-size: 16px;">${t.items}:</h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${order.cartItems.map(item => `
          <li style="margin: 8px 0;">
            ${item.name} - ${t.quantity}: ${item.quantity} - ${t.price}: ${item.price.toFixed(2)} €
          </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
  `, lang);

  const textContent = `
🔔 ${t.new_order_received}

${t.admin_notification} - ${t.ticket_payment}

--- ${t.order_details} ---
${t.order_number}: #${order.orderReference}
${t.customer_name}: ${order.customerName}
${t.customer_email}: ${order.customerEmail}
${t.payment_method}: ${order.ticketType}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €

--- ${t.codes_submitted} ---
${order.ticketCodes.map(code => `  - ${code}`).join('\n')}

${order.cartItems ? `
--- ${t.items} ---
${order.cartItems.map(item => `${item.name} - ${t.quantity}: ${item.quantity} - ${t.price}: ${item.price.toFixed(2)} €`).join('\n')}
` : ''}

${t.team_signature}
  `.trim();

  return sendEmail({
    to: DEFAULT_ADMIN,
    subject: `${t.subject_admin_new_order} - ${order.orderReference} - ${order.ticketType}`,
    html: htmlContent,
    text: textContent,
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
    <h2 style="color: #1e3a8a; margin-top: 0;">${t.order_confirmed}</h2>
    <p>${t.hello} <strong>${order.customerName}</strong>,</p>
    <p>${t.crypto_received}</p>
    
    <div class="summary-box">
      <h3 style="margin-top: 0; color: #374151; font-size: 18px;">📋 ${t.order_summary}</h3>
      <table>
        <tr>
          <td style="color: #6b7280;">${t.order_number}:</td>
          <td style="font-weight: 700; color: #111827;">#${order.orderReference}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.total_amount}:</td>
          <td style="font-size: 20px; font-weight: 700; color: #059669;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.transaction_id}:</td>
          <td style="font-family: 'Courier New', monospace; font-weight: 600; color: #1e40af;">
            ${order.transactionId}
          </td>
        </tr>
      </table>
    </div>

    <div class="info-box">
      <p style="margin: 0; color: #1e40af; font-weight: 600;">
        🔐 ${t.crypto_validation_message}
      </p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}/dashboard" class="button">
        ${t.access_dashboard}
      </a>
    </div>
  `, lang);

  const textContent = `
${t.order_confirmed}

${t.hello} ${order.customerName},

${t.crypto_received}

--- ${t.order_summary} ---
${t.order_number}: #${order.orderReference}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €
${t.transaction_id}: ${order.transactionId}

🔐 ${t.crypto_validation_message}

${t.access_dashboard}: ${dashboardUrl}/dashboard

${t.footer_note}
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
  const lang = 'fr' as EmailLanguage;
  const t = getTranslation(lang);

  const htmlContent = getEmailLayout(`
    <h2 style="color: #dc2626; margin-top: 0;">🔔 ${t.new_order_received}</h2>
    <p><strong>${t.admin_notification} - MaxelPay</strong></p>
    
    <div class="summary-box" style="border: 2px solid #3b82f6;">
      <h3 style="margin-top: 0; color: #374151; font-size: 18px;">📋 ${t.order_details}</h3>
      <table>
        <tr>
          <td style="color: #6b7280; width: 40%;">${t.order_number}:</td>
          <td style="font-weight: 700; color: #dc2626;">#${order.orderReference}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.customer_name}:</td>
          <td style="font-weight: 600;">${order.customerName}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.customer_email}:</td>
          <td style="font-weight: 600;">${order.customerEmail}</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.payment_method}:</td>
          <td style="font-weight: 600;">MaxelPay (Crypto)</td>
        </tr>
        <tr>
          <td style="color: #6b7280;">${t.transaction_id}:</td>
          <td style="font-family: 'Courier New', monospace; font-weight: 600;">
            ${order.transactionId}
          </td>
        </tr>
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding-top: 12px; color: #6b7280; font-weight: 600;">${t.total_amount}:</td>
          <td style="padding-top: 12px; font-size: 20px; font-weight: 700; color: #059669;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    ${order.cartItems ? `
    <div class="summary-box">
      <h3 style="margin-top: 0; color: #374151; font-size: 16px;">${t.items}:</h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${order.cartItems.map(item => `
          <li style="margin: 8px 0;">
            ${item.name} - ${t.quantity}: ${item.quantity} - ${t.price}: ${item.price.toFixed(2)} €
          </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
  `, lang);

  const textContent = `
🔔 ${t.new_order_received}

${t.admin_notification} - MaxelPay

--- ${t.order_details} ---
${t.order_number}: #${order.orderReference}
${t.customer_name}: ${order.customerName}
${t.customer_email}: ${order.customerEmail}
${t.payment_method}: MaxelPay (Crypto)
${t.transaction_id}: ${order.transactionId}
${t.total_amount}: ${order.totalAmount.toFixed(2)} €

${order.cartItems ? `
--- ${t.items} ---
${order.cartItems.map(item => `${item.name} - ${t.quantity}: ${item.quantity} - ${t.price}: ${item.price.toFixed(2)} €`).join('\n')}
` : ''}

${t.team_signature}
  `.trim();

  return sendEmail({
    to: DEFAULT_ADMIN,
    subject: `${t.subject_admin_new_order} - ${order.orderReference} - MaxelPay`,
    html: htmlContent,
    text: textContent,
    from: DEFAULT_FROM
  });
}

// ==================== LEGACY/COMPATIBILITY FUNCTIONS ====================

export async function sendWelcomeEmail(
  userEmail: string,
  firstName: string
): Promise<boolean> {
  const htmlContent = getEmailLayout(`
    <h2 style="color: #1e3a8a; margin-top: 0;">Bienvenue sur Luxio 🎉</h2>
    <p>Bonjour <strong>${firstName}</strong>,</p>
    <p>
      Nous sommes ravis de vous accueillir dans la famille Luxio ! 
      Vous venez de rejoindre la boutique en ligne de référence pour les smartphones, 
      smartwatches, sneakers et gadgets high-tech.
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com'}" class="button">
        Découvrir nos offres
      </a>
    </div>
  `, 'fr');

  const textContent = `
Bienvenue sur Luxio 🎉

Bonjour ${firstName},

Nous sommes ravis de vous accueillir dans la famille Luxio !

Découvrir nos offres : ${process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com'}
  `.trim();

  return sendEmail({
    to: userEmail,
    subject: "Bienvenue sur Luxio 🎉",
    html: htmlContent,
    text: textContent,
    from: DEFAULT_FROM
  });
}

// Legacy order confirmation functions (for backward compatibility)
interface OrderDetails {
  orderId: string;
  customerEmail: string;
  customerName: string;
  productName: string;
  productModel?: string;
  productPrice: number;
  totalAmount: number;
  codeType: "TransCash" | "PCS";
  codes: string[];
}

export async function sendOrderConfirmationToCustomer(
  order: OrderDetails
): Promise<boolean> {
  return sendTicketConfirmationToCustomer({
    orderReference: order.orderId,
    customerEmail: order.customerEmail,
    customerName: order.customerName,
    totalAmount: order.totalAmount,
    ticketType: order.codeType,
    ticketCodes: order.codes,
    cartItems: [{
      id: '1',
      name: order.productName + (order.productModel ? ` - ${order.productModel}` : ''),
      price: order.productPrice,
      quantity: 1
    }]
  });
}

export async function sendOrderNotificationToAdmin(
  order: OrderDetails
): Promise<boolean> {
  return sendTicketNotificationToSupport({
    orderReference: order.orderId,
    customerEmail: order.customerEmail,
    customerName: order.customerName,
    totalAmount: order.totalAmount,
    ticketType: order.codeType,
    ticketCodes: order.codes,
    cartItems: [{
      id: '1',
      name: order.productName + (order.productModel ? ` - ${order.productModel}` : ''),
      price: order.productPrice,
      quantity: 1
    }]
  });
}
