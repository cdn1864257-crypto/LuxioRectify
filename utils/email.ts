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
  firstName: string,
  language?: string
): Promise<boolean> {
  const lang = language?.toLowerCase() || 'fr';
  const validLanguages = ['fr', 'en', 'es', 'pt', 'pl', 'hu'];
  const emailLang = validLanguages.includes(lang) ? lang : 'fr';
  const dashboardUrl = process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com';
  
  // Traductions pour l'email de bienvenue
  const welcomeTranslations: Record<string, {
    title: string;
    subtitle: string;
    greeting: string;
    intro: string;
    highlights: string[];
    sections: Array<{
      icon: string;
      title: string;
      description: string;
      linkText: string;
      linkUrl: string;
    }>;
    ctaButton: string;
    helpText: string;
    footerNote: string;
    teamSignature: string;
  }> = {
    fr: {
      title: 'Bienvenue chez Luxio ! 🎉',
      subtitle: 'DÉCOUVREZ L\'EXCELLENCE TECH À PRIX IMBATTABLES',
      greeting: `Bonjour <strong>${firstName}</strong>,`,
      intro: 'Nous sommes ravis de vous accueillir dans la famille Luxio ! Vous venez de rejoindre <strong>la boutique en ligne de référence</strong> pour les passionnés de technologie et de mode. Chez Luxio, nous croyons que tout le monde mérite d\'accéder aux meilleurs produits.',
      highlights: [
        'Réductions jusqu\'à 37% sur une sélection de produits',
        'Livraison gratuite et garantie 2 ans',
        'Paiement sécurisé avec plusieurs options'
      ],
      sections: [
        {
          icon: '📱',
          title: 'Smartphones Premium',
          description: 'Découvrez les derniers iPhone 17, Samsung Galaxy S25, Google Pixel et bien plus encore. Tous les modèles, toutes les couleurs, au meilleur prix.',
          linkText: 'Voir les smartphones →',
          linkUrl: `${dashboardUrl}/premium`
        },
        {
          icon: '⌚',
          title: 'Montres Connectées',
          description: 'Apple Watch, Samsung Galaxy Watch, montres de luxe TAG Heuer... Restez connecté avec style grâce à notre sélection exclusive.',
          linkText: 'Découvrir les montres →',
          linkUrl: `${dashboardUrl}/watches`
        },
        {
          icon: '👟',
          title: 'Sneakers & Mode',
          description: 'Nike, Adidas, New Balance, Yeezy... Les sneakers les plus recherchées pour compléter votre style urbain.',
          linkText: 'Explorer les sneakers →',
          linkUrl: `${dashboardUrl}/sneakers`
        },
        {
          icon: '🏠',
          title: 'Gadgets High-Tech',
          description: 'Drones, trottinettes électriques, écouteurs sans fil, objets connectés... Tous les gadgets tendance pour faciliter votre quotidien.',
          linkText: 'Voir les gadgets →',
          linkUrl: `${dashboardUrl}/home-gadgets`
        }
      ],
      ctaButton: 'Commencer mes achats',
      helpText: 'Vous avez des questions ? Notre équipe est là pour vous aider à trouver les produits parfaits qui correspondent à vos besoins et à votre budget.',
      footerNote: 'Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.',
      teamSignature: '— Équipe Luxio – Service Client'
    },
    en: {
      title: 'Welcome to Luxio! 🎉',
      subtitle: 'DISCOVER TECH EXCELLENCE AT UNBEATABLE PRICES',
      greeting: `Hello <strong>${firstName}</strong>,`,
      intro: 'We\'re thrilled to welcome you to the Luxio family! You\'ve just joined <strong>the leading online store</strong> for tech and fashion enthusiasts. At Luxio, we believe everyone deserves access to the best products.',
      highlights: [
        'Discounts up to 37% on selected products',
        'Free shipping and 2-year warranty',
        'Secure payment with multiple options'
      ],
      sections: [
        {
          icon: '📱',
          title: 'Premium Smartphones',
          description: 'Discover the latest iPhone 17, Samsung Galaxy S25, Google Pixel and much more. All models, all colors, at the best price.',
          linkText: 'View smartphones →',
          linkUrl: `${dashboardUrl}/premium`
        },
        {
          icon: '⌚',
          title: 'Smart Watches',
          description: 'Apple Watch, Samsung Galaxy Watch, luxury TAG Heuer watches... Stay connected in style with our exclusive selection.',
          linkText: 'Discover watches →',
          linkUrl: `${dashboardUrl}/watches`
        },
        {
          icon: '👟',
          title: 'Sneakers & Fashion',
          description: 'Nike, Adidas, New Balance, Yeezy... The most sought-after sneakers to complete your urban style.',
          linkText: 'Explore sneakers →',
          linkUrl: `${dashboardUrl}/sneakers`
        },
        {
          icon: '🏠',
          title: 'High-Tech Gadgets',
          description: 'Drones, electric scooters, wireless earbuds, smart devices... All the trending gadgets to simplify your daily life.',
          linkText: 'View gadgets →',
          linkUrl: `${dashboardUrl}/home-gadgets`
        }
      ],
      ctaButton: 'Start Shopping',
      helpText: 'Have questions? Our team is here to help you find the perfect products that match your needs and budget.',
      footerNote: 'This email was sent automatically. Please do not reply directly.',
      teamSignature: '— Luxio Support Team'
    },
    es: {
      title: '¡Bienvenido a Luxio! 🎉',
      subtitle: 'DESCUBRE LA EXCELENCIA TECH A PRECIOS INMEJORABLES',
      greeting: `Hola <strong>${firstName}</strong>,`,
      intro: '¡Estamos encantados de darte la bienvenida a la familia Luxio! Acabas de unirte a <strong>la tienda online de referencia</strong> para los apasionados de la tecnología y la moda. En Luxio, creemos que todos merecen acceder a los mejores productos.',
      highlights: [
        'Descuentos hasta el 37% en productos seleccionados',
        'Envío gratis y garantía de 2 años',
        'Pago seguro con múltiples opciones'
      ],
      sections: [
        {
          icon: '📱',
          title: 'Smartphones Premium',
          description: 'Descubre los últimos iPhone 17, Samsung Galaxy S25, Google Pixel y mucho más. Todos los modelos, todos los colores, al mejor precio.',
          linkText: 'Ver smartphones →',
          linkUrl: `${dashboardUrl}/premium`
        },
        {
          icon: '⌚',
          title: 'Relojes Inteligentes',
          description: 'Apple Watch, Samsung Galaxy Watch, relojes de lujo TAG Heuer... Mantente conectado con estilo con nuestra selección exclusiva.',
          linkText: 'Descubrir relojes →',
          linkUrl: `${dashboardUrl}/watches`
        },
        {
          icon: '👟',
          title: 'Sneakers & Moda',
          description: 'Nike, Adidas, New Balance, Yeezy... Las sneakers más buscadas para completar tu estilo urbano.',
          linkText: 'Explorar sneakers →',
          linkUrl: `${dashboardUrl}/sneakers`
        },
        {
          icon: '🏠',
          title: 'Gadgets High-Tech',
          description: 'Drones, patinetes eléctricos, auriculares inalámbricos, dispositivos inteligentes... Todos los gadgets de moda para facilitar tu día a día.',
          linkText: 'Ver gadgets →',
          linkUrl: `${dashboardUrl}/home-gadgets`
        }
      ],
      ctaButton: 'Empezar a Comprar',
      helpText: '¿Tienes preguntas? Nuestro equipo está aquí para ayudarte a encontrar los productos perfectos que se adapten a tus necesidades y presupuesto.',
      footerNote: 'Este correo fue enviado automáticamente. Por favor, no responda directamente.',
      teamSignature: '— Equipo de Soporte Luxio'
    },
    pt: {
      title: 'Bem-vindo ao Luxio! 🎉',
      subtitle: 'DESCUBRA A EXCELÊNCIA TECH A PREÇOS IMBATÍVEIS',
      greeting: `Olá <strong>${firstName}</strong>,`,
      intro: 'Estamos muito felizes em recebê-lo na família Luxio! Você acabou de se juntar à <strong>loja online de referência</strong> para apaixonados por tecnologia e moda. Na Luxio, acreditamos que todos merecem acesso aos melhores produtos.',
      highlights: [
        'Descontos de até 37% em produtos selecionados',
        'Frete grátis e garantia de 2 anos',
        'Pagamento seguro com múltiplas opções'
      ],
      sections: [
        {
          icon: '📱',
          title: 'Smartphones Premium',
          description: 'Descubra os últimos iPhone 17, Samsung Galaxy S25, Google Pixel e muito mais. Todos os modelos, todas as cores, ao melhor preço.',
          linkText: 'Ver smartphones →',
          linkUrl: `${dashboardUrl}/premium`
        },
        {
          icon: '⌚',
          title: 'Relógios Inteligentes',
          description: 'Apple Watch, Samsung Galaxy Watch, relógios de luxo TAG Heuer... Fique conectado com estilo com nossa seleção exclusiva.',
          linkText: 'Descobrir relógios →',
          linkUrl: `${dashboardUrl}/watches`
        },
        {
          icon: '👟',
          title: 'Tênis & Moda',
          description: 'Nike, Adidas, New Balance, Yeezy... Os tênis mais procurados para completar seu estilo urbano.',
          linkText: 'Explorar tênis →',
          linkUrl: `${dashboardUrl}/sneakers`
        },
        {
          icon: '🏠',
          title: 'Gadgets High-Tech',
          description: 'Drones, patinetes elétricos, fones sem fio, dispositivos inteligentes... Todos os gadgets em alta para facilitar seu dia a dia.',
          linkText: 'Ver gadgets →',
          linkUrl: `${dashboardUrl}/home-gadgets`
        }
      ],
      ctaButton: 'Começar a Comprar',
      helpText: 'Tem dúvidas? Nossa equipe está aqui para ajudá-lo a encontrar os produtos perfeitos que atendam às suas necessidades e orçamento.',
      footerNote: 'Este e-mail foi enviado automaticamente. Por favor, não responda diretamente.',
      teamSignature: '— Equipe de Suporte Luxio'
    },
    pl: {
      title: 'Witamy w Luxio! 🎉',
      subtitle: 'ODKRYJ DOSKONAŁOŚĆ TECH W NIEZRÓWNANYCH CENACH',
      greeting: `Witaj <strong>${firstName}</strong>,`,
      intro: 'Cieszymy się, że możemy powitać Cię w rodzinie Luxio! Właśnie dołączyłeś do <strong>wiodącego sklepu internetowego</strong> dla pasjonatów technologii i mody. W Luxio wierzymy, że każdy zasługuje na dostęp do najlepszych produktów.',
      highlights: [
        'Rabaty do 37% na wybrane produkty',
        'Darmowa dostawa i 2-letnia gwarancja',
        'Bezpieczna płatność z wieloma opcjami'
      ],
      sections: [
        {
          icon: '📱',
          title: 'Smartfony Premium',
          description: 'Odkryj najnowsze iPhone 17, Samsung Galaxy S25, Google Pixel i wiele więcej. Wszystkie modele, wszystkie kolory, w najlepszej cenie.',
          linkText: 'Zobacz smartfony →',
          linkUrl: `${dashboardUrl}/premium`
        },
        {
          icon: '⌚',
          title: 'Smartwatche',
          description: 'Apple Watch, Samsung Galaxy Watch, luksusowe zegarki TAG Heuer... Pozostań w kontakcie ze stylem dzięki naszej ekskluzywnej ofercie.',
          linkText: 'Odkryj zegarki →',
          linkUrl: `${dashboardUrl}/watches`
        },
        {
          icon: '👟',
          title: 'Sneakersy i Moda',
          description: 'Nike, Adidas, New Balance, Yeezy... Najbardziej poszukiwane sneakersy, aby dopełnić Twój miejski styl.',
          linkText: 'Odkryj sneakersy →',
          linkUrl: `${dashboardUrl}/sneakers`
        },
        {
          icon: '🏠',
          title: 'Gadżety High-Tech',
          description: 'Drony, hulajnogi elektryczne, słuchawki bezprzewodowe, inteligentne urządzenia... Wszystkie modne gadżety ułatwiające codzienne życie.',
          linkText: 'Zobacz gadżety →',
          linkUrl: `${dashboardUrl}/home-gadgets`
        }
      ],
      ctaButton: 'Rozpocznij Zakupy',
      helpText: 'Masz pytania? Nasz zespół jest tu, aby pomóc Ci znaleźć idealne produkty odpowiadające Twoim potrzebom i budżetowi.',
      footerNote: 'Ten e-mail został wysłany automatycznie. Prosimy nie odpowiadać bezpośrednio.',
      teamSignature: '— Zespół Wsparcia Luxio'
    },
    hu: {
      title: 'Üdvözlünk a Luxio-ban! 🎉',
      subtitle: 'FEDEZD FEL A TECH KIVÁLÓSÁGOT VERHETETLEN ÁRAKON',
      greeting: `Szia <strong>${firstName}</strong>,`,
      intro: 'Örömmel üdvözlünk a Luxio családban! Most csatlakoztál a <strong>vezető online áruházhoz</strong> a technológia és divat rajongóinak. A Luxio-nál hiszünk abban, hogy mindenki megérdemli a hozzáférést a legjobb termékekhez.',
      highlights: [
        'Akár 37%-os kedvezmények kiválasztott termékekre',
        'Ingyenes szállítás és 2 éves garancia',
        'Biztonságos fizetés több opcióval'
      ],
      sections: [
        {
          icon: '📱',
          title: 'Prémium Okostelefonok',
          description: 'Fedezd fel a legújabb iPhone 17, Samsung Galaxy S25, Google Pixel és még sok más. Minden modell, minden szín, a legjobb áron.',
          linkText: 'Okostelefonok megtekintése →',
          linkUrl: `${dashboardUrl}/premium`
        },
        {
          icon: '⌚',
          title: 'Okosórák',
          description: 'Apple Watch, Samsung Galaxy Watch, luxus TAG Heuer órák... Maradj kapcsolatban stílusosan exkluzív kínálatunkkal.',
          linkText: 'Órák felfedezése →',
          linkUrl: `${dashboardUrl}/watches`
        },
        {
          icon: '👟',
          title: 'Tornacipők és Divat',
          description: 'Nike, Adidas, New Balance, Yeezy... A legkeresettebb tornacipők, hogy kiegészítsd városi stílusodat.',
          linkText: 'Tornacipők felfedezése →',
          linkUrl: `${dashboardUrl}/sneakers`
        },
        {
          icon: '🏠',
          title: 'High-Tech Kütyük',
          description: 'Drónok, elektromos rollerek, vezeték nélküli fülhallgatók, okos eszközök... Minden trendi kütyü, hogy megkönnyítsd mindennapodat.',
          linkText: 'Kütyük megtekintése →',
          linkUrl: `${dashboardUrl}/home-gadgets`
        }
      ],
      ctaButton: 'Vásárlás Kezdése',
      helpText: 'Kérdésed van? Csapatunk itt van, hogy segítsünk megtalálni a tökéletes termékeket, amelyek megfelelnek igényeidnek és költségvetésednek.',
      footerNote: 'Ez az e-mail automatikusan lett elküldve. Kérjük, ne válaszolj közvetlenül.',
      teamSignature: '— Luxio Támogatási Csapat'
    }
  };

  const content = welcomeTranslations[emailLang] || welcomeTranslations.fr;
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="${emailLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue sur Luxio</title>
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
      padding: 20px;
      text-align: center;
    }
    .logo {
      color: #ffffff;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 1px;
      margin: 0;
    }
    .banner {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      padding: 40px 20px;
      text-align: center;
      border-bottom: 4px solid #3b82f6;
    }
    .banner h1 {
      color: #1e3a8a;
      font-size: 36px;
      margin: 0 0 10px 0;
      font-weight: 800;
    }
    .banner p {
      color: #1e40af;
      font-size: 16px;
      margin: 0;
      font-weight: 600;
    }
    .content {
      padding: 30px;
      color: #333333;
    }
    .greeting {
      font-size: 18px;
      color: #111827;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .intro-text {
      font-size: 16px;
      color: #374151;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    .feature-section {
      background-color: #f9fafb;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      border-left: 4px solid #3b82f6;
    }
    .feature-title {
      color: #1e3a8a;
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 15px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .feature-icon {
      font-size: 28px;
    }
    .feature-description {
      color: #4b5563;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    .feature-link {
      display: inline-block;
      color: #3b82f6;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: color 0.3s;
    }
    .feature-link:hover {
      color: #2563eb;
    }
    .cta-button {
      display: inline-block;
      padding: 16px 40px;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
    }
    .highlights {
      background-color: #eff6ff;
      border-radius: 8px;
      padding: 20px;
      margin: 25px 0;
    }
    .highlight-item {
      display: flex;
      align-items: center;
      margin: 12px 0;
      color: #1e40af;
      font-weight: 600;
    }
    .highlight-icon {
      font-size: 20px;
      margin-right: 12px;
    }
    .footer {
      background-color: #1f2937;
      color: #9ca3af;
      padding: 25px;
      text-align: center;
      font-size: 13px;
    }
    .footer-note {
      margin: 15px 0 10px 0;
      font-size: 12px;
      color: #6b7280;
    }
    @media only screen and (max-width: 600px) {
      .banner h1 {
        font-size: 28px;
      }
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1 class="logo">Luxio</h1>
    </div>
    
    <div class="banner">
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
    
    <div class="content">
      <p class="greeting">${content.greeting}</p>
      
      <p class="intro-text">
        ${content.intro}
      </p>

      <div class="highlights">
        ${content.highlights.map(highlight => `
        <div class="highlight-item">
          <span class="highlight-icon">✓</span>
          <span>${highlight}</span>
        </div>
        `).join('')}
      </div>

      ${content.sections.map(section => `
      <div class="feature-section">
        <div class="feature-title">
          <span class="feature-icon">${section.icon}</span>
          <span>${section.title}</span>
        </div>
        <p class="feature-description">
          ${section.description}
        </p>
        <a href="${section.linkUrl}" class="feature-link">${section.linkText}</a>
      </div>
      `).join('')}

      <div style="text-align: center; margin: 35px 0;">
        <a href="${dashboardUrl}" class="cta-button">
          ${content.ctaButton}
        </a>
      </div>

      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px;">
        ${content.helpText}
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Luxio</strong></p>
      <p class="footer-note">
        ${content.footerNote}
      </p>
      <p style="margin-top: 10px;">
        ${content.teamSignature}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const textContent = `
${content.title}

${content.greeting.replace(/<[^>]*>/g, '')}

${content.intro.replace(/<[^>]*>/g, '')}

${content.highlights.map(h => `✓ ${h}`).join('\n')}

${content.sections.map(s => `
${s.icon} ${s.title}
${s.description}
${s.linkText}: ${s.linkUrl}
`).join('\n')}

${content.ctaButton}: ${dashboardUrl}

${content.helpText}

${content.footerNote}
${content.teamSignature}
  `.trim();

  const emailSubject = content.title;
  
  return sendEmail({
    to: userEmail,
    subject: emailSubject,
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
