import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type EmailLanguage = 'fr' | 'en' | 'es' | 'pt' | 'pl' | 'hu' | 'it';

const LOGO_URL = 'https://luxiomarket.shop/Luxio_logo_dark_version_6197255a.png';
const PRIMARY_COLOR = '#0f172a';
const PRIMARY_LIGHT = '#1e293b';
const ACCENT_COLOR = '#f97316';
const ACCENT_GRADIENT = 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)';
const SUCCESS_COLOR = '#10b981';
const WARNING_COLOR = '#f59e0b';
const INFO_COLOR = '#3b82f6';
const SITE_URL = 'https://luxiomarket.shop';
const CONTACT_EMAIL = 'Contact@luxiomarket.shop';

// Load i18n translations
let translations: any = {};
try {
  const i18nPath = path.join(__dirname, 'i18n-emails.json');
  const i18nData = fs.readFileSync(i18nPath, 'utf-8');
  translations = JSON.parse(i18nData);
} catch (error) {
  console.error('Failed to load i18n translations:', error);
  translations = {}; // Fallback to empty object
}

function t(lang: EmailLanguage, key: string, params?: Record<string, string>): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  // Replace placeholders like {{orderNumber}}
  if (typeof value === 'string' && params) {
    return Object.keys(params).reduce((str, paramKey) => {
      return str.replace(new RegExp(`{{${paramKey}}}`, 'g'), params[paramKey]);
    }, value);
  }
  
  return value || key;
}

interface EmailTemplateData {
  firstName?: string;
  verificationLink?: string;
  orderNumber?: string;
  orderItems?: string;
  totalAmount?: string;
  paymentMethod?: string;
  paymentLink?: string;
  orderDate?: string;
  language: EmailLanguage;
  // Bank transfer details
  bankDetails?: {
    beneficiary?: string;
    iban?: string;
    bic?: string;
    reference?: string;
  };
  // Crypto details
  cryptoAddress?: string;
}

/**
 * Base template with responsive design compatible with all email clients
 * - Table-based layout for Outlook compatibility
 * - Inline styles everywhere
 * - MSO conditionals for Outlook-specific fixes
 * - Mobile-responsive with media queries
 */
function getBaseTemplate(content: string, preheader: string = '', language: EmailLanguage = 'en'): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="${language}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="format-detection" content="telephone=no">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Luxio</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }
    table { border-collapse: collapse; }
    .button { mso-padding-alt: 18px 48px; }
  </style>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    /* Client-specific Styles */
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    
    /* Responsive Styles */
    @media only screen and (max-width: 600px) {
      .wrapper { width: 100% !important; }
      .content { padding: 24px 16px !important; }
      .button { width: 100% !important; display: block !important; padding: 16px 24px !important; }
      .mobile-padding { padding: 16px !important; }
      .mobile-hide { display: none !important; }
      .mobile-full { width: 100% !important; max-width: 100% !important; }
      .header-padding { padding: 32px 16px !important; }
    }
    
    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      .dark-mode-bg { background-color: #0f172a !important; }
      .dark-mode-text { color: #f1f5f9 !important; }
      .dark-mode-card { background-color: #1e293b !important; }
    }
    
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" bgcolor="#f8fafc">
  <!-- Preheader (hidden text) -->
  ${preheader ? `<div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #f8fafc; mso-hide: all;">${preheader}</div>` : ''}
  
  <!-- Spacer for preheader -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #f8fafc; mso-hide: all;">
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>
  
  <!-- Main Container -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc;" bgcolor="#f8fafc">
    <tr>
      <td align="center" style="padding: 48px 16px;" class="mobile-padding">
        
        <!-- Email Wrapper -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrapper" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05); overflow: hidden;" bgcolor="#ffffff">
          
          <!-- Header with Modern Gradient Background -->
          <tr>
            <td align="center" class="header-padding" style="background-color: ${PRIMARY_COLOR}; padding: 48px 24px;" bgcolor="${PRIMARY_COLOR}">
              <!--[if mso]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fillcolor="${PRIMARY_COLOR}" stroke="f" style="width:600px; height:140px;">
              <v:textbox inset="0,0,0,0">
              <![endif]-->
              <div style="position: relative; z-index: 1;">
                <img src="${LOGO_URL}" alt="Luxio" width="160" height="auto" style="display: block; margin: 0 auto; max-width: 160px; height: auto; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));" />
                <p style="margin: 16px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 2px; font-weight: 500;">Premium Tech Marketplace</p>
              </div>
              <!--[if mso]>
              </v:textbox>
              </v:rect>
              <![endif]-->
            </td>
          </tr>
          
          <!-- Accent Stripe -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, ${ACCENT_COLOR} 0%, #fb923c 50%, ${ACCENT_COLOR} 100%);" bgcolor="${ACCENT_COLOR}"></td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td class="content" style="padding: 48px 40px;" bgcolor="#ffffff">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 40px 24px; text-align: center; border-top: 1px solid #e2e8f0;" bgcolor="#f8fafc" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <!-- Tagline -->
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #475569; font-weight: 600; letter-spacing: 0.5px;">
                      ${t(language, 'common.premium_tech')}
                    </p>
                  </td>
                </tr>
                
                <!-- Navigation Links -->
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 0 12px;">
                          <a href="${SITE_URL}" style="display: inline-block; padding: 8px 16px; background-color: #e2e8f0; color: ${PRIMARY_COLOR}; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 20px;">${t(language, 'common.shop')}</a>
                        </td>
                        <td style="padding: 0 12px;">
                          <a href="${SITE_URL}/support" style="display: inline-block; padding: 8px 16px; background-color: #e2e8f0; color: ${PRIMARY_COLOR}; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 20px;">${t(language, 'common.support')}</a>
                        </td>
                        <td style="padding: 0 12px;">
                          <a href="mailto:${CONTACT_EMAIL}" style="display: inline-block; padding: 8px 16px; background-color: #e2e8f0; color: ${PRIMARY_COLOR}; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 20px;">${t(language, 'common.contact')}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Contact Email -->
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <p style="margin: 0; font-size: 13px; color: #64748b;">
                      <a href="mailto:${CONTACT_EMAIL}" style="color: ${ACCENT_COLOR}; text-decoration: none; font-weight: 500;">${CONTACT_EMAIL}</a>
                    </p>
                  </td>
                </tr>
                
                <!-- Copyright -->
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #94a3b8;">
                      ${t(language, 'common.all_rights')}<br>
                      <span style="color: #cbd5e1;">Luxio Market - Your Premium Tech Partner</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
        
        <!-- Bottom Spacer with subtle branding -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrapper" style="max-width: 600px; width: 100%;">
          <tr>
            <td align="center" style="padding: 24px 0;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8; letter-spacing: 1px;">LUXIO 2025</p>
            </td>
          </tr>
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>`;
}

/**
 * Email Verification Template
 * Professional email verification with responsive design
 */
export function getVerificationEmailTemplate(data: EmailTemplateData): string {
  const lang = data.language;
  const greeting = data.firstName ? `${t(lang, 'email_verification.greeting')} ${data.firstName}` : `${t(lang, 'email_verification.greeting')}`;
  
  const content = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <!-- Welcome Icon -->
      <tr>
        <td align="center" style="padding-bottom: 24px;">
          <div style="width: 80px; height: 80px; background-color: ${ACCENT_COLOR}; border-radius: 50%; display: inline-block; text-align: center; line-height: 80px;">
            <span style="font-size: 36px; color: #ffffff;">&#9993;</span>
          </div>
        </td>
      </tr>
      
      <!-- Greeting -->
      <tr>
        <td align="center">
          <h1 style="color: ${PRIMARY_COLOR}; font-size: 32px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.2; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
            ${greeting}
          </h1>
        </td>
      </tr>
      
      <!-- Message -->
      <tr>
        <td align="center" style="padding: 16px 0 32px 0;">
          <p style="color: #64748b; font-size: 17px; line-height: 1.7; margin: 0; max-width: 440px;">
            ${t(lang, 'email_verification.message')}
          </p>
        </td>
      </tr>
      
      <!-- CTA Button -->
      <tr>
        <td align="center" style="padding: 8px 0 40px 0;">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.verificationLink}" style="height:56px; width:280px; v-text-anchor:middle;" arcsize="50%" fillcolor="${ACCENT_COLOR}">
            <w:anchorlock/>
            <center style="color:#ffffff; font-family:Arial,sans-serif; font-size:16px; font-weight:bold;">
              ${t(lang, 'email_verification.button')}
            </center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="${data.verificationLink}" class="button" style="display: inline-block; padding: 18px 48px; background-color: ${ACCENT_COLOR}; background: linear-gradient(135deg, ${ACCENT_COLOR} 0%, #ea580c 100%); color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-shadow: 0 8px 30px rgba(249, 115, 22, 0.35); text-transform: uppercase; letter-spacing: 1px; mso-padding-alt: 18px 48px;">
            ${t(lang, 'email_verification.button')}
          </a>
          <!--<![endif]-->
        </td>
      </tr>
      
      <!-- Info Card -->
      <tr>
        <td>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;" bgcolor="#f8fafc">
            <tr>
              <td style="padding: 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="width: 48px; vertical-align: top;">
                      <div style="width: 40px; height: 40px; background-color: ${WARNING_COLOR}; border-radius: 12px; text-align: center; line-height: 40px;">
                        <span style="font-size: 18px;">&#9200;</span>
                      </div>
                    </td>
                    <td style="vertical-align: top; padding-left: 16px;">
                      <p style="color: ${PRIMARY_COLOR}; font-size: 15px; font-weight: 600; margin: 0 0 6px 0;">
                        ${t(lang, 'email_verification.important')}
                      </p>
                      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
                        ${t(lang, 'email_verification.validity')}<br>
                        <span style="color: #94a3b8; font-size: 13px;">${t(lang, 'email_verification.not_you')}</span>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      
      <!-- Footer Signature -->
      <tr>
        <td align="center" style="padding-top: 40px;">
          <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">
            ${t(lang, 'email_verification.footer_greeting')}<br>
            <strong style="color: ${PRIMARY_COLOR}; font-size: 16px;">${t(lang, 'email_verification.team')}</strong>
          </p>
        </td>
      </tr>
    </table>
  `;
  
  return getBaseTemplate(content, t(lang, 'email_verification.preheader'), lang);
}

/**
 * Pending Order Email Template
 * With intelligent payment links based on payment method
 */
export function getPendingOrderEmailTemplate(data: EmailTemplateData): string {
  const lang = data.language;
  const greeting = data.firstName ? `${t(lang, 'order_confirmation.greeting')} ${data.firstName},` : `${t(lang, 'order_confirmation.greeting')},`;
  
  // Determine payment instructions based on payment method
  let paymentInstructions = '';
  const paymentMethodLower = (data.paymentMethod || '').toLowerCase();
  
  if (paymentMethodLower.includes('bank') || paymentMethodLower.includes('virement') || paymentMethodLower.includes('transfer')) {
    // Bank transfer instructions
    paymentInstructions = `
      <tr>
        <td style="padding: 24px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;" bgcolor="#fef3c7">
            <tr>
              <td style="padding: 20px;">
                <h3 style="color: #92400e; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">
                  💳 ${t(lang, 'order_confirmation.bank_transfer_title')}
                </h3>
                <p style="color: #78350f; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
                  ${t(lang, 'order_confirmation.bank_transfer_message')}
                </p>
                ${data.bankDetails ? `
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 4px; padding: 12px;" bgcolor="#ffffff">
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong style="color: #1f2937; font-size: 13px;">${t(lang, 'order_confirmation.beneficiary')} :</strong><br>
                      <span style="color: #4b5563; font-size: 14px;">${data.bankDetails.beneficiary || 'Luxio'}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong style="color: #1f2937; font-size: 13px;">${t(lang, 'order_confirmation.iban')} :</strong><br>
                      <span style="color: #4b5563; font-size: 14px; font-family: 'Courier New', monospace;">${data.bankDetails.iban || 'XX00 0000 0000 0000 0000 00'}</span>
                    </td>
                  </tr>
                  ${data.bankDetails.bic ? `
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong style="color: #1f2937; font-size: 13px;">${t(lang, 'order_confirmation.bic')} :</strong><br>
                      <span style="color: #4b5563; font-size: 14px; font-family: 'Courier New', monospace;">${data.bankDetails.bic}</span>
                    </td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong style="color: #1f2937; font-size: 13px;">${t(lang, 'order_confirmation.transfer_reason')} :</strong><br>
                      <span style="color: #dc2626; font-size: 14px; font-weight: 600;">${data.bankDetails.reference || data.orderNumber}</span>
                    </td>
                  </tr>
                </table>
                ` : ''}
                <p style="color: #78350f; font-size: 13px; line-height: 1.5; margin: 12px 0 0 0;">
                  <strong>⚠️ ${t(lang, 'order_confirmation.bank_transfer_important')}</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  } else if (paymentMethodLower.includes('crypto') || paymentMethodLower.includes('bitcoin') || paymentMethodLower.includes('ethereum')) {
    // Crypto payment instructions
    paymentInstructions = `
      <tr>
        <td style="padding: 24px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #dbeafe; border-left: 4px solid #3b82f6; border-radius: 4px;" bgcolor="#dbeafe">
            <tr>
              <td style="padding: 20px;">
                <h3 style="color: #1e40af; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">
                  ₿ ${t(lang, 'order_confirmation.crypto_title')}
                </h3>
                <p style="color: #1e3a8a; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
                  ${t(lang, 'order_confirmation.crypto_message')}
                </p>
                <p style="color: #1e3a8a; font-size: 13px; line-height: 1.5; margin: 0;">
                  <strong>ℹ️ ${t(lang, 'order_confirmation.crypto_note')}</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }
  
  const content = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td>
          <h1 style="color: #111827; font-size: 28px; font-weight: 700; margin: 0 0 20px 0; line-height: 1.3;">
            ${greeting}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 24px;">
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
            ${t(lang, 'order_confirmation.message', { orderNumber: data.orderNumber || '' })}
          </p>
        </td>
      </tr>
      
      <!-- Order Summary Box -->
      <tr>
        <td>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden;" bgcolor="#f9fafb">
            <tr>
              <td style="padding: 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="color: #6b7280; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">${t(lang, 'order_confirmation.items')}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #374151; font-size: 15px; line-height: 1.6;">
                      ${data.orderItems || t(lang, 'order_confirmation.order_summary')}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="padding: 8px 0;">
                            <span style="color: #6b7280; font-size: 14px;">${t(lang, 'order_confirmation.total')} :</span>
                          </td>
                          <td align="right" style="padding: 8px 0;">
                            <span style="color: ${PRIMARY_COLOR}; font-size: 20px; font-weight: 700;">${data.totalAmount}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">${t(lang, 'order_confirmation.payment_method')} :</span>
                          </td>
                          <td align="right" style="padding: 4px 0;">
                            <span style="color: #374151; font-size: 14px; font-weight: 500;">${data.paymentMethod}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">${t(lang, 'order_confirmation.status')} :</span>
                          </td>
                          <td align="right" style="padding: 4px 0;">
                            <span style="display: inline-block; padding: 4px 12px; background-color: #fef3c7; color: #92400e; font-size: 12px; font-weight: 600; border-radius: 12px; text-transform: uppercase;">🕓 ${t(lang, 'order_confirmation.status_pending')}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      
      <!-- Payment Instructions -->
      ${paymentInstructions}
      
      <!-- Payment Link Button (if provided) -->
      ${data.paymentLink ? `
      <tr>
        <td align="center" style="padding: 30px 0;">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.paymentLink}" style="height:50px; width:220px; v-text-anchor:middle;" arcsize="16%" fillcolor="${ACCENT_COLOR}">
            <w:anchorlock/>
            <center style="color:#ffffff; font-family:Arial,sans-serif; font-size:16px; font-weight:bold;">
              ${t(lang, 'order_confirmation.button_pay')}
            </center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="${data.paymentLink}" class="button" style="display: inline-block; padding: 16px 40px; background-color: ${ACCENT_COLOR}; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(255,107,53,0.3);">
            ${t(lang, 'order_confirmation.button_pay')}
          </a>
          <!--<![endif]-->
        </td>
      </tr>
      ` : ''}
      
      <tr>
        <td style="padding: 24px 0 0 0;">
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">
            ${t(lang, 'order_confirmation.notification')}<br>
            ${t(lang, 'order_confirmation.thanks')}
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 30px;">
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">
            ${t(lang, 'order_confirmation.regards')}<br>
            <strong style="color: ${PRIMARY_COLOR};">${t(lang, 'order_confirmation.team')}</strong>
          </p>
        </td>
      </tr>
    </table>
  `;
  
  return getBaseTemplate(content, t(lang, 'order_confirmation.preheader', { orderNumber: data.orderNumber || '' }), lang);
}

/**
 * Confirmed Order Email Template
 * Professional order confirmation with success indicators
 */
export function getConfirmedOrderEmailTemplate(data: EmailTemplateData): string {
  const lang = data.language;
  const greeting = data.firstName ? `${t(lang, 'order_validated.greeting')} ${data.firstName},` : `${t(lang, 'order_validated.greeting')},`;
  
  const content = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td>
          <h1 style="color: #111827; font-size: 28px; font-weight: 700; margin: 0 0 20px 0; line-height: 1.3;">
            ${greeting}
          </h1>
        </td>
      </tr>
      
      <!-- Success Banner -->
      <tr>
        <td style="padding-bottom: 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 8px; text-align: center;" bgcolor="#10b981">
            <tr>
              <td align="center">
                <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">
                  ${t(lang, 'order_validated.good_news')}
                </p>
                <p style="color: #d1fae5; font-size: 15px; margin: 0;">
                  ${t(lang, 'order_validated.message')}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      
      <!-- Order Summary Box -->
      <tr>
        <td>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden;" bgcolor="#f9fafb">
            <tr>
              <td style="padding: 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td colspan="2" style="padding: 0 0 16px 0;">
                      <span style="color: ${PRIMARY_COLOR}; font-size: 16px; font-weight: 700;">${t(lang, 'order_validated.order_number')} #${data.orderNumber}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="color: #6b7280; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">${t(lang, 'order_validated.items')}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #374151; font-size: 15px; line-height: 1.6;">
                      ${data.orderItems || t(lang, 'order_validated.order_summary')}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="padding: 8px 0;">
                            <span style="color: #6b7280; font-size: 14px;">${t(lang, 'order_validated.total')} :</span>
                          </td>
                          <td align="right" style="padding: 8px 0;">
                            <span style="color: ${PRIMARY_COLOR}; font-size: 20px; font-weight: 700;">${data.totalAmount}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">${t(lang, 'order_validated.status')} :</span>
                          </td>
                          <td align="right" style="padding: 4px 0;">
                            <span style="display: inline-block; padding: 4px 12px; background-color: #d1fae5; color: #065f46; font-size: 12px; font-weight: 600; border-radius: 12px; text-transform: uppercase;">${t(lang, 'order_validated.status_confirmed')}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">${t(lang, 'order_validated.date')} :</span>
                          </td>
                          <td align="right" style="padding: 4px 0;">
                            <span style="color: #374151; font-size: 14px; font-weight: 500;">${data.orderDate || new Date().toLocaleDateString('fr-FR')}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 24px 0 0 0;">
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">
            ${t(lang, 'order_validated.shipping_info')}<br>
            ${t(lang, 'order_validated.welcome')}
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 30px;">
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">
            ${t(lang, 'order_validated.regards')}<br>
            <strong style="color: ${PRIMARY_COLOR};">${t(lang, 'order_validated.team')}</strong>
          </p>
        </td>
      </tr>
    </table>
  `;
  
  return getBaseTemplate(content, t(lang, 'order_validated.preheader', { orderNumber: data.orderNumber || '' }), lang);
}

export const emailTemplatesV2 = {
  verification: getVerificationEmailTemplate,
  pendingOrder: getPendingOrderEmailTemplate,
  confirmedOrder: getConfirmedOrderEmailTemplate,
};
