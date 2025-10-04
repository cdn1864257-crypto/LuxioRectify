import { sendEmail as sendEmailViaSMTP } from './mailer';

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

export function getEmailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
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
      <p><strong>Luxio</strong> - Votre boutique de smartphones et accessoires premium</p>
      <p>Une question ? Contactez notre <a href="mailto:${process.env.EMAIL_FROM || 'contact@luxio-shop.com'}">support client</a></p>
      <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
        Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

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
    <p>
      Chez <strong>Luxio</strong>, nous sélectionnons pour vous les meilleurs produits 
      avec des réductions allant jusqu'à <strong>37%</strong>. Découvrez dès maintenant 
      notre catalogue exclusif de produits premium.
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com'}" class="button">
        Découvrir nos offres
      </a>
    </div>
    <p>
      Profitez de nos avantages :
    </p>
    <ul style="color: #4b5563;">
      <li>✅ <strong>Livraison gratuite</strong> sur toutes vos commandes</li>
      <li>✅ <strong>Garantie 2 ans</strong> sur tous nos produits</li>
      <li>✅ <strong>Paiement sécurisé</strong> à 100%</li>
      <li>✅ <strong>Livraison rapide</strong> sous 24-48h</li>
    </ul>
    <div class="divider"></div>
    <p style="color: #6b7280; font-size: 14px;">
      Merci de nous faire confiance. L'équipe Luxio est à votre disposition pour 
      toute question ou assistance.
    </p>
  `);

  const textContent = `
Bienvenue sur Luxio 🎉

Bonjour ${firstName},

Nous sommes ravis de vous accueillir dans la famille Luxio ! Vous venez de rejoindre la boutique en ligne de référence pour les smartphones, smartwatches, sneakers et gadgets high-tech.

Chez Luxio, nous sélectionnons pour vous les meilleurs produits avec des réductions allant jusqu'à 37%. Découvrez dès maintenant notre catalogue exclusif de produits premium.

Découvrir nos offres : ${process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com'}

Profitez de nos avantages :
✅ Livraison gratuite sur toutes vos commandes
✅ Garantie 2 ans sur tous nos produits
✅ Paiement sécurisé à 100%
✅ Livraison rapide sous 24-48h

Merci de nous faire confiance. L'équipe Luxio est à votre disposition pour toute question ou assistance.

---
Luxio - Votre boutique de smartphones et accessoires premium
  `.trim();

  return sendEmail({
    to: userEmail,
    subject: "Bienvenue sur Luxio 🎉",
    html: htmlContent,
    text: textContent,
  });
}

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
  const htmlContent = getEmailLayout(`
    <h2 style="color: #1e3a8a; margin-top: 0;">Confirmation de votre commande</h2>
    <p>Bonjour <strong>${order.customerName}</strong>,</p>
    <p>
      Nous avons bien reçu votre commande <strong>#${order.orderId}</strong>. 
      Merci pour votre confiance !
    </p>
    
    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #374151; font-size: 18px;">📦 Détails de votre commande</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Produit :</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600;">
            ${order.productName}${order.productModel ? ` - ${order.productModel}` : ''}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Prix :</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600;">
            ${order.productPrice.toFixed(2)} €
          </td>
        </tr>
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #111827; font-weight: 600;">Total payé :</td>
          <td style="padding: 12px 0; text-align: right; font-size: 20px; color: #3b82f6; font-weight: 700;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px 20px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #1e40af; font-size: 16px;">💳 Informations de paiement</h3>
      <p style="margin: 8px 0;"><strong>Type de code :</strong> ${order.codeType}</p>
      <p style="margin: 8px 0;"><strong>Code(s) fourni(s) :</strong></p>
      <ul style="margin: 10px 0; padding-left: 20px;">
        ${order.codes.map(code => `<li style="margin: 5px 0; font-family: 'Courier New', monospace; color: #1e40af;">${code}</li>`).join('')}
      </ul>
    </div>

    <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 15px 20px; margin: 25px 0;">
      <p style="margin: 0; color: #92400e;">
        ⏳ <strong>Votre commande est en attente de validation.</strong><br>
        Notre équipe vérifie actuellement votre paiement. Vous recevrez un email de confirmation 
        dès que votre commande sera validée et expédiée.
      </p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com'}/dashboard" class="button">
        Voir ma commande
      </a>
    </div>

    <p style="color: #6b7280; font-size: 14px;">
      En cas de question concernant votre commande, n'hésitez pas à nous contacter.
    </p>
  `);

  const textContent = `
Confirmation de votre commande

Bonjour ${order.customerName},

Nous avons bien reçu votre commande #${order.orderId}. Merci pour votre confiance !

--- Détails de votre commande ---
Produit : ${order.productName}${order.productModel ? ` - ${order.productModel}` : ''}
Prix : ${order.productPrice.toFixed(2)} €
Total payé : ${order.totalAmount.toFixed(2)} €

--- Informations de paiement ---
Type de code : ${order.codeType}
Code(s) fourni(s) :
${order.codes.map(code => `  - ${code}`).join('\n')}

⏳ Votre commande est en attente de validation.
Notre équipe vérifie actuellement votre paiement. Vous recevrez un email de confirmation dès que votre commande sera validée et expédiée.

Voir ma commande : ${process.env.REPLIT_DEV_DOMAIN || 'https://luxio-shop.com'}/dashboard

En cas de question concernant votre commande, n'hésitez pas à nous contacter.

---
Luxio - Votre boutique de smartphones et accessoires premium
  `.trim();

  return sendEmail({
    to: order.customerEmail,
    subject: `Confirmation de commande #${order.orderId} - Luxio`,
    html: htmlContent,
    text: textContent,
  });
}

export async function sendOrderNotificationToAdmin(
  order: OrderDetails
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || "admin@luxio-shop.com";

  const htmlContent = getEmailLayout(`
    <h2 style="color: #dc2626; margin-top: 0;">🔔 Nouvelle commande via ticket</h2>
    <p><strong>Une nouvelle commande a été passée et nécessite votre attention.</strong></p>
    
    <div style="background-color: #f9fafb; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #374151; font-size: 18px;">📋 Informations de commande</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 40%;">Numéro de commande :</td>
          <td style="padding: 8px 0; font-weight: 700; color: #dc2626;">
            #${order.orderId}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Client :</td>
          <td style="padding: 8px 0; font-weight: 600;">
            ${order.customerName}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Email :</td>
          <td style="padding: 8px 0; font-weight: 600;">
            ${order.customerEmail}
          </td>
        </tr>
        <tr style="border-top: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280;">Produit :</td>
          <td style="padding: 12px 0; font-weight: 600;">
            ${order.productName}${order.productModel ? ` - ${order.productModel}` : ''}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Prix :</td>
          <td style="padding: 8px 0; font-weight: 600;">
            ${order.productPrice.toFixed(2)} €
          </td>
        </tr>
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #111827; font-weight: 600;">Montant total :</td>
          <td style="padding: 12px 0; font-size: 20px; color: #059669; font-weight: 700;">
            ${order.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #92400e; font-size: 16px;">💳 Codes de paiement ${order.codeType}</h3>
      <ul style="margin: 10px 0; padding-left: 20px;">
        ${order.codes.map(code => `<li style="margin: 8px 0; font-family: 'Courier New', monospace; font-size: 16px; font-weight: 700; color: #b45309;">${code}</li>`).join('')}
      </ul>
    </div>

    <div style="background-color: #fee2e2; border: 1px solid #dc2626; border-radius: 8px; padding: 15px 20px; margin: 25px 0; text-align: center;">
      <p style="margin: 0; color: #991b1b; font-weight: 600;">
        ⚠️ ACTION REQUISE : Vérifier et valider les codes de paiement
      </p>
    </div>
    
    <div style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 15px 20px; margin: 25px 0;">
      <p style="margin: 0; color: #1e40af; font-size: 14px;">
        💡 <strong>Vérification requise</strong><br>
        Connectez-vous à votre compte ${order.codeType} pour vérifier les codes et valider le montant reçu.
      </p>
    </div>
  `);

  const textContent = `
🔔 NOUVELLE COMMANDE VIA TICKET - LUXIO

Une nouvelle commande a été passée et nécessite votre attention.

--- Informations de commande ---
Numéro de commande : #${order.orderId}
Client : ${order.customerName}
Email : ${order.customerEmail}

Produit : ${order.productName}${order.productModel ? ` - ${order.productModel}` : ''}
Prix : ${order.productPrice.toFixed(2)} €
Montant total : ${order.totalAmount.toFixed(2)} €

--- Codes de paiement ${order.codeType} ---
${order.codes.map(code => `  - ${code}`).join('\n')}

⚠️ ACTION REQUISE : Vérifier et valider les codes de paiement

💡 Vérification requise
Connectez-vous à votre compte ${order.codeType} pour vérifier les codes et valider le montant reçu.

---
Luxio Admin
  `.trim();

  return sendEmail({
    to: adminEmail,
    subject: `🔔 Nouvelle commande via ticket — Luxio (#${order.orderId})`,
    html: htmlContent,
    text: textContent,
  });
}

interface BankTransferDetails {
  orderId: string;
  orderReference: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  bankName: string;
  iban: string;
  bic: string;
  reference: string;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export async function sendBankTransferEmail(
  details: BankTransferDetails
): Promise<boolean> {
  const htmlContent = getEmailLayout(`
    <h2 style="color: #1e3a8a; margin-top: 0;">Merci pour votre confiance !</h2>
    <p>Bonjour <strong>${details.customerName}</strong>,</p>
    <p>
      Nous avons bien reçu votre commande <strong>#${details.orderReference}</strong>. 
      Pour finaliser votre achat, veuillez effectuer un virement bancaire en suivant les instructions ci-dessous.
    </p>
    
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #1e40af; font-size: 18px;">📦 Récapitulatif de votre commande</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${details.cartItems.map(item => `
          <tr>
            <td style="padding: 8px 0; color: #374151;">
              ${item.name} <span style="color: #6b7280;">(x${item.quantity})</span>
            </td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #111827;">
              ${(item.price * item.quantity).toFixed(2)} €
            </td>
          </tr>
        `).join('')}
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding: 12px 0; font-weight: 700; font-size: 18px; color: #111827;">Total</td>
          <td style="padding: 12px 0; text-align: right; font-size: 20px; font-weight: 700; color: #059669;">
            ${details.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 25px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #1e40af; font-size: 18px;">🏦 Informations bancaires</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Nom :</td>
          <td style="padding: 10px 0; font-weight: 700; color: #111827;">
            ${details.bankName}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">IBAN :</td>
          <td style="padding: 10px 0; font-family: 'Courier New', monospace; font-weight: 700; color: #1e40af;">
            ${details.iban}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">BIC :</td>
          <td style="padding: 10px 0; font-family: 'Courier New', monospace; font-weight: 700; color: #1e40af;">
            ${details.bic}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Motif :</td>
          <td style="padding: 10px 0; font-family: 'Courier New', monospace; font-weight: 700; color: #dc2626;">
            ${details.reference}
          </td>
        </tr>
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Montant :</td>
          <td style="padding: 12px 0; font-size: 24px; font-weight: 700; color: #059669;">
            ${details.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px 20px; margin: 25px 0;">
      <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 600;">
        ✅ Virement immédiat : Livraison en 24h
      </p>
      <p style="margin: 0; color: #1e40af; font-weight: 600;">
        ⏱️ Virement ordinaire : Délai de 48-72h selon votre banque
      </p>
    </div>

    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 25px 0;">
      <p style="margin: 0; color: #92400e; font-weight: 600;">
        ⚠️ Important : Indiquez bien le motif "<strong>${details.reference}</strong>" lors du virement
      </p>
    </div>

    <p style="color: #6b7280; font-size: 14px;">
      Merci de votre confiance. N'hésitez pas à nous contacter pour toute question.
    </p>
  `);

  const textContent = `
Merci pour votre confiance !

Bonjour ${details.customerName},

Nous avons bien reçu votre commande #${details.orderReference}.
Pour finaliser votre achat, veuillez effectuer un virement bancaire en suivant les instructions ci-dessous.

--- Récapitulatif de votre commande ---
${details.cartItems.map(item => `${item.name} (x${item.quantity}) : ${(item.price * item.quantity).toFixed(2)} €`).join('\n')}
Total : ${details.totalAmount.toFixed(2)} €

--- Informations bancaires ---
Nom : ${details.bankName}
IBAN : ${details.iban}
BIC : ${details.bic}
Motif : ${details.reference}
Montant : ${details.totalAmount.toFixed(2)} €

✅ Virement immédiat : Livraison en 24h
⏱️ Virement ordinaire : Délai de 48-72h selon votre banque

⚠️ Important : Indiquez bien le motif "${details.reference}" lors du virement

Merci de votre confiance. N'hésitez pas à nous contacter pour toute question.

---
Luxio - Votre boutique de smartphones et accessoires premium
  `.trim();

  return sendEmail({
    to: details.customerEmail,
    subject: `Confirmation de commande #${details.orderReference} - Luxio`,
    html: htmlContent,
    text: textContent,
  });
}

export async function sendBankTransferNotification(
  details: BankTransferDetails
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'support@luxio-shop.eu';
  
  const htmlContent = getEmailLayout(`
    <h2 style="color: #dc2626; margin-top: 0;">🔔 Nouvelle commande par virement bancaire</h2>
    <p>Une nouvelle commande nécessite un virement bancaire.</p>
    
    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #1f2937;">📋 Détails de la commande</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Commande :</td>
          <td style="padding: 8px 0; font-weight: 700;">#${details.orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Client :</td>
          <td style="padding: 8px 0; font-weight: 700;">${details.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Email :</td>
          <td style="padding: 8px 0;">${details.customerEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Montant :</td>
          <td style="padding: 8px 0; font-size: 18px; font-weight: 700; color: #059669;">
            ${details.totalAmount.toFixed(2)} €
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Référence :</td>
          <td style="padding: 8px 0; font-family: 'Courier New', monospace; font-weight: 700; color: #dc2626;">
            ${details.reference}
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 20px 0;">
      <p style="margin: 0; color: #92400e;">
        ⚠️ <strong>Action requise :</strong> Surveillez les virements entrants avec la référence <strong>${details.reference}</strong>
      </p>
    </div>
  `);

  const textContent = `
🔔 Nouvelle commande par virement bancaire

Une nouvelle commande nécessite un virement bancaire.

--- Détails de la commande ---
Commande : #${details.orderId}
Client : ${details.customerName}
Email : ${details.customerEmail}
Montant : ${details.totalAmount.toFixed(2)} €
Référence : ${details.reference}

⚠️ Action requise : Surveillez les virements entrants avec la référence ${details.reference}

---
Luxio Admin
  `.trim();

  return sendEmail({
    to: adminEmail,
    subject: `🔔 Nouvelle commande par virement — Luxio (#${details.orderId})`,
    html: htmlContent,
    text: textContent,
  });
}

interface TicketOrderDetails {
  orderId: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  ticketType: string;
  ticketCodes: Array<{ code: string; amount: number }>;
}

export async function sendTicketConfirmationToCustomer(
  details: TicketOrderDetails
): Promise<boolean> {
  const htmlContent = getEmailLayout(`
    <h2 style="color: #1e3a8a; margin-top: 0;">Confirmation de commande</h2>
    <p>Bonjour <strong>${details.customerName}</strong>,</p>
    <p>
      Merci pour votre commande <strong>#${details.orderId}</strong> via tickets ${details.ticketType}.
    </p>
    
    <div style="background-color: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 25px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #1e40af; font-size: 18px;">📋 Récapitulatif</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Commande :</td>
          <td style="padding: 10px 0; font-weight: 700;">#${details.orderId}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Type de ticket :</td>
          <td style="padding: 10px 0; font-weight: 700;">${details.ticketType}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Montant total :</td>
          <td style="padding: 10px 0; font-size: 20px; font-weight: 700; color: #059669;">
            ${details.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
      
      <h4 style="color: #1e40af; margin-top: 20px;">Codes soumis :</h4>
      <ul style="list-style: none; padding: 0;">
        ${details.ticketCodes.map(ticket => `
          <li style="background: #f0f9ff; padding: 8px 12px; margin: 5px 0; border-radius: 4px; font-family: 'Courier New', monospace;">
            ${ticket.code} — ${ticket.amount.toFixed(2)} €
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 25px 0;">
      <p style="margin: 0; color: #92400e;">
        ⏳ <strong>En attente de validation</strong><br>
        Votre commande sera validée sous 24-48h après vérification de vos codes.
      </p>
    </div>

    <p style="color: #6b7280; font-size: 14px;">
      Vous recevrez un email de confirmation une fois la commande validée.
    </p>
  `);

  const textContent = `
Confirmation de commande

Bonjour ${details.customerName},

Merci pour votre commande #${details.orderId} via tickets ${details.ticketType}.

--- Récapitulatif ---
Commande : #${details.orderId}
Type de ticket : ${details.ticketType}
Montant total : ${details.totalAmount.toFixed(2)} €

Codes soumis :
${details.ticketCodes.map(ticket => `  - ${ticket.code} — ${ticket.amount.toFixed(2)} €`).join('\n')}

⏳ En attente de validation
Votre commande sera validée sous 24-48h après vérification de vos codes.

Vous recevrez un email de confirmation une fois la commande validée.

---
Luxio - Votre boutique de smartphones et accessoires premium
  `.trim();

  return sendEmail({
    to: details.customerEmail,
    subject: `Confirmation de commande #${details.orderId} - Luxio`,
    html: htmlContent,
    text: textContent,
  });
}

export async function sendTicketNotificationToSupport(
  details: TicketOrderDetails
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'support@luxio-shop.eu';
  
  const htmlContent = getEmailLayout(`
    <h2 style="color: #dc2626; margin-top: 0;">🔔 Nouvelle commande via tickets ${details.ticketType}</h2>
    <p>Une nouvelle commande nécessite validation des codes de paiement.</p>
    
    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #1f2937;">📋 Détails de la commande</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Commande :</td>
          <td style="padding: 8px 0; font-weight: 700;">#${details.orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Client :</td>
          <td style="padding: 8px 0; font-weight: 700;">${details.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Email :</td>
          <td style="padding: 8px 0;">${details.customerEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Type :</td>
          <td style="padding: 8px 0; font-weight: 700;">${details.ticketType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Montant :</td>
          <td style="padding: 8px 0; font-size: 18px; font-weight: 700; color: #059669;">
            ${details.totalAmount.toFixed(2)} €
          </td>
        </tr>
      </table>
      
      <h4 style="color: #1f2937; margin-top: 20px;">Codes à valider :</h4>
      <ul style="list-style: none; padding: 0;">
        ${details.ticketCodes.map(ticket => `
          <li style="background: #e5e7eb; padding: 10px 15px; margin: 5px 0; border-radius: 4px; font-family: 'Courier New', monospace; font-weight: 600;">
            ${ticket.code} — ${ticket.amount.toFixed(2)} €
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 15px 20px; margin: 20px 0;">
      <p style="margin: 0; color: #7f1d1d;">
        ⚠️ <strong>ACTION REQUISE :</strong> Vérifier et valider les codes de paiement ${details.ticketType}
      </p>
    </div>
  `);

  const textContent = `
🔔 Nouvelle commande via tickets ${details.ticketType}

Une nouvelle commande nécessite validation des codes de paiement.

--- Détails de la commande ---
Commande : #${details.orderId}
Client : ${details.customerName}
Email : ${details.customerEmail}
Type : ${details.ticketType}
Montant : ${details.totalAmount.toFixed(2)} €

Codes à valider :
${details.ticketCodes.map(ticket => `  - ${ticket.code} — ${ticket.amount.toFixed(2)} €`).join('\n')}

⚠️ ACTION REQUISE : Vérifier et valider les codes de paiement ${details.ticketType}

---
Luxio Admin
  `.trim();

  return sendEmail({
    to: adminEmail,
    subject: `🔔 Nouvelle commande via ${details.ticketType} — Luxio (#${details.orderId})`,
    html: htmlContent,
    text: textContent,
  });
}
