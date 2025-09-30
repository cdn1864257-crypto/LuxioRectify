import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

function isSESConfigured(): boolean {
  const hasAccessKey = !!process.env.AWS_SES_ACCESS_KEY;
  const hasSecretKey = !!process.env.AWS_SES_SECRET_KEY;
  const hasEmailFrom = !!process.env.EMAIL_FROM;

  return hasAccessKey && hasSecretKey && hasEmailFrom;
}

function getSESClient(): SESClient | null {
  if (!isSESConfigured()) {
    return null;
  }

  return new SESClient({
    region: process.env.AWS_SES_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_SES_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SES_SECRET_KEY!,
    },
  });
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Vérifier la configuration SES
  if (!isSESConfigured()) {
    console.warn("⚠️  Amazon SES not configured. Email sending skipped.");
    console.warn("   Please set the following environment variables:");
    console.warn("   - AWS_SES_ACCESS_KEY");
    console.warn("   - AWS_SES_SECRET_KEY");
    console.warn("   - EMAIL_FROM");
    console.warn(`   Email was intended for: ${Array.isArray(options.to) ? options.to.join(', ') : options.to}`);
    console.warn(`   Subject: ${options.subject}`);
    return false;
  }

  const sesClient = getSESClient();
  if (!sesClient) {
    return false;
  }

  const fromEmail = options.from || process.env.EMAIL_FROM || "noreply@luxio-shop.com";
  const toAddresses = Array.isArray(options.to) ? options.to : [options.to];

  const params = {
    Source: fromEmail,
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Subject: {
        Data: options.subject,
        Charset: "UTF-8",
      },
      Body: {
        Text: {
          Data: options.text,
          Charset: "UTF-8",
        },
        Html: {
          Data: options.html,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);
    console.log("✅ Email sent successfully:", result.MessageId);
    console.log(`   To: ${toAddresses.join(', ')}`);
    console.log(`   Subject: ${options.subject}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    console.error(`   To: ${toAddresses.join(', ')}`);
    console.error(`   Subject: ${options.subject}`);
    if (error instanceof Error) {
      console.error(`   Error message: ${error.message}`);
    }
    return false;
  }
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
