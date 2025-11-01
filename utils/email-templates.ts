import { EmailLanguage } from './email-translations.js';

const LOGO_URL = 'https://luxiomarket.shop/Luxio_logo_dark_version_6197255a.png';
const PRIMARY_COLOR = '#1a2e44';
const ACCENT_COLOR = '#ff6b35';
const SITE_URL = 'https://luxiomarket.shop';

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
}

const translations = {
  fr: {
    confirmAccount: 'Confirmer mon compte',
    validFor24h: 'Ce lien est valable pendant 24 heures.',
    notYou: "Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer ce message.",
    seeSoon: 'À très bientôt,',
    team: "L'équipe Luxio",
    allRightsReserved: '© 2025 Luxio. Tous droits réservés.',
    premiumTech: 'Votre partenaire pour la tech premium',
    needHelp: "Besoin d'aide ?",
    contactSupport: 'Contactez notre support',
    payOrder: 'Payer ma commande',
    pendingPayment: "Votre paiement n'a pas encore été validé.",
    followInstructions: 'Veuillez suivre les instructions correspondant à votre méthode de paiement.',
    notificationOnConfirm: 'Vous recevrez une notification dès que votre commande sera confirmée.',
    thanksTrust: 'Merci pour votre confiance 💎',
    goodNews: 'Bonne nouvelle ! 🎉',
    orderValidated: 'Votre commande a été validée avec succès.',
    informShipping: 'Nous vous informerons dès que votre commande sera expédiée.',
    welcomePremium: 'Merci de votre confiance et bienvenue parmi les clients Luxio Premium 💎',
  },
  en: {
    confirmAccount: 'Confirm my account',
    validFor24h: 'This link is valid for 24 hours.',
    notYou: "If you didn't request this, you can safely ignore this message.",
    seeSoon: 'See you soon,',
    team: 'The Luxio Team',
    allRightsReserved: '© 2025 Luxio. All rights reserved.',
    premiumTech: 'Your partner for premium tech',
    needHelp: 'Need help?',
    contactSupport: 'Contact our support',
    payOrder: 'Pay my order',
    pendingPayment: 'Your payment has not yet been validated.',
    followInstructions: 'Please follow the instructions for your payment method.',
    notificationOnConfirm: 'You will receive a notification once your order is confirmed.',
    thanksTrust: 'Thank you for your trust 💎',
    goodNews: 'Good news! 🎉',
    orderValidated: 'Your order has been successfully validated.',
    informShipping: 'We will inform you as soon as your order is shipped.',
    welcomePremium: 'Thank you for your trust and welcome among Luxio Premium customers 💎',
  },
  es: {
    confirmAccount: 'Confirmar mi cuenta',
    validFor24h: 'Este enlace es válido durante 24 horas.',
    notYou: 'Si no solicitó esto, puede ignorar este mensaje.',
    seeSoon: 'Hasta pronto,',
    team: 'El equipo Luxio',
    allRightsReserved: '© 2025 Luxio. Todos los derechos reservados.',
    premiumTech: 'Tu socio para tecnología premium',
    needHelp: '¿Necesitas ayuda?',
    contactSupport: 'Contactar soporte',
    payOrder: 'Pagar mi pedido',
    pendingPayment: 'Su pago aún no ha sido validado.',
    followInstructions: 'Siga las instrucciones de su método de pago.',
    notificationOnConfirm: 'Recibirá una notificación cuando se confirme su pedido.',
    thanksTrust: 'Gracias por su confianza 💎',
    goodNews: '¡Buenas noticias! 🎉',
    orderValidated: 'Su pedido ha sido validado con éxito.',
    informShipping: 'Le informaremos tan pronto como se envíe su pedido.',
    welcomePremium: 'Gracias por su confianza y bienvenido entre los clientes Premium de Luxio 💎',
  },
  pt: {
    confirmAccount: 'Confirmar minha conta',
    validFor24h: 'Este link é válido por 24 horas.',
    notYou: 'Se você não solicitou isso, pode ignorar esta mensagem.',
    seeSoon: 'Até breve,',
    team: 'A equipe Luxio',
    allRightsReserved: '© 2025 Luxio. Todos os direitos reservados.',
    premiumTech: 'Seu parceiro para tecnologia premium',
    needHelp: 'Precisa de ajuda?',
    contactSupport: 'Contate nosso suporte',
    payOrder: 'Pagar meu pedido',
    pendingPayment: 'Seu pagamento ainda não foi validado.',
    followInstructions: 'Siga as instruções do seu método de pagamento.',
    notificationOnConfirm: 'Você receberá uma notificação assim que seu pedido for confirmado.',
    thanksTrust: 'Obrigado pela sua confiança 💎',
    goodNews: 'Boas notícias! 🎉',
    orderValidated: 'Seu pedido foi validado com sucesso.',
    informShipping: 'Informaremos assim que seu pedido for enviado.',
    welcomePremium: 'Obrigado pela sua confiança e bem-vindo entre os clientes Premium da Luxio 💎',
  },
  pl: {
    confirmAccount: 'Potwierdź moje konto',
    validFor24h: 'Ten link jest ważny przez 24 godziny.',
    notYou: 'Jeśli tego nie żądałeś, możesz zignorować tę wiadomość.',
    seeSoon: 'Do zobaczenia,',
    team: 'Zespół Luxio',
    allRightsReserved: '© 2025 Luxio. Wszelkie prawa zastrzeżone.',
    premiumTech: 'Twój partner w technologii premium',
    needHelp: 'Potrzebujesz pomocy?',
    contactSupport: 'Skontaktuj się z pomocą',
    payOrder: 'Zapłać za zamówienie',
    pendingPayment: 'Twoja płatność nie została jeszcze zweryfikowana.',
    followInstructions: 'Postępuj zgodnie z instrukcjami dla swojej metody płatności.',
    notificationOnConfirm: 'Otrzymasz powiadomienie po potwierdzeniu zamówienia.',
    thanksTrust: 'Dziękujemy za zaufanie 💎',
    goodNews: 'Dobra wiadomość! 🎉',
    orderValidated: 'Twoje zamówienie zostało pomyślnie zatwierdzone.',
    informShipping: 'Poinformujemy Cię, gdy zamówienie zostanie wysłane.',
    welcomePremium: 'Dziękujemy za zaufanie i witamy wśród klientów Luxio Premium 💎',
  },
  hu: {
    confirmAccount: 'Fiók megerősítése',
    validFor24h: 'Ez a link 24 óráig érvényes.',
    notYou: 'Ha nem te kérted ezt, nyugodtan figyelmen kívül hagyhatod ezt az üzenetet.',
    seeSoon: 'Hamarosan találkozunk,',
    team: 'A Luxio csapata',
    allRightsReserved: '© 2025 Luxio. Minden jog fenntartva.',
    premiumTech: 'Partnered a prémium technológiában',
    needHelp: 'Segítségre van szükséged?',
    contactSupport: 'Kapcsolat az ügyfélszolgálattal',
    payOrder: 'Megrendelés kifizetése',
    pendingPayment: 'A fizetésed még nem lett jóváhagyva.',
    followInstructions: 'Kérjük, kövesd a fizetési módod utasításait.',
    notificationOnConfirm: 'Értesítést kapsz, amint rendelésed megerősítésre kerül.',
    thanksTrust: 'Köszönjük a bizalmadat 💎',
    goodNews: 'Jó hírek! 🎉',
    orderValidated: 'Megrendelésed sikeresen jóváhagyva.',
    informShipping: 'Értesítünk, amint rendelésed feladásra kerül.',
    welcomePremium: 'Köszönjük a bizalmadat és üdvözlünk a Luxio Premium ügyfelek között 💎',
  },
};

const getBaseTemplate = (content: string, preheader: string = '', language: EmailLanguage = 'en') => {
  const t = translations[language] || translations.en;
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta name="x-apple-disable-message-reformatting">
  <title>Luxio</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; font-family:Inter,'Helvetica Neue',Helvetica,Arial,sans-serif; background-color:#f4f6f8; -webkit-font-smoothing:antialiased; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  ${preheader ? `<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">${preheader}</div>` : ''}
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f6f8" style="background-color:#f4f6f8;">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.1); overflow:hidden;">
          
          <!-- Header with gradient -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #2a4560 100%); padding:40px 20px;">
              <img src="${LOGO_URL}" alt="Luxio" width="140" style="display:block; margin:0 auto;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:40px 30px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:30px 20px; text-align:center; border-top:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="text-align:center; padding-bottom:15px;">
                    <p style="margin:0; font-size:14px; color:#6b7280; font-weight:500;">
                      ${t.premiumTech}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center; padding-bottom:15px;">
                    <a href="${SITE_URL}" style="display:inline-block; margin:0 10px; color:${PRIMARY_COLOR}; text-decoration:none; font-size:13px; font-weight:500;">
                      Boutique
                    </a>
                    <span style="color:#d1d5db;">|</span>
                    <a href="${SITE_URL}/support" style="display:inline-block; margin:0 10px; color:${PRIMARY_COLOR}; text-decoration:none; font-size:13px; font-weight:500;">
                      Support
                    </a>
                    <span style="color:#d1d5db;">|</span>
                    <a href="${SITE_URL}/contact" style="display:inline-block; margin:0 10px; color:${PRIMARY_COLOR}; text-decoration:none; font-size:13px; font-weight:500;">
                      Contact
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center; padding-top:10px;">
                    <p style="margin:0; font-size:12px; color:#9ca3af; line-height:1.5;">
                      ${t.allRightsReserved}<br>
                      ${t.needHelp} <a href="${SITE_URL}/contact" style="color:${PRIMARY_COLOR};">${t.contactSupport}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export function getVerificationEmailTemplate(data: EmailTemplateData): string {
  const t = translations[data.language] || translations.en;
  const greeting = data.firstName ? `${t.hello} ${data.firstName},` : `${t.hello},`;
  
  const welcomeText = data.language === 'fr' ? 
    `Merci d'avoir rejoint <strong style="color:${PRIMARY_COLOR};">Luxio</strong> ✨<br>Pour activer votre compte et accéder à nos offres premium, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :` :
    data.language === 'es' ?
    `Gracias por unirte a <strong style="color:${PRIMARY_COLOR};">Luxio</strong> ✨<br>Para activar tu cuenta y acceder a nuestras ofertas premium, confirma tu dirección de correo electrónico haciendo clic en el botón de abajo:` :
    data.language === 'pt' ?
    `Obrigado por se juntar à <strong style="color:${PRIMARY_COLOR};">Luxio</strong> ✨<br>Para ativar sua conta e acessar nossas ofertas premium, confirme seu endereço de e-mail clicando no botão abaixo:` :
    `Thank you for joining <strong style="color:${PRIMARY_COLOR};">Luxio</strong> ✨<br>To activate your account and access our premium offers, please confirm your email address by clicking the button below:`;
  
  const content = `
    <h1 style="color:#111827; font-size:28px; font-weight:700; margin:0 0 20px 0; line-height:1.3;">
      ${greeting}
    </h1>
    
    <p style="color:#4b5563; font-size:16px; line-height:1.6; margin:0 0 24px 0;">
      ${welcomeText}
    </p>
    
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0;">
      <tr>
        <td align="center">
          <a href="${data.verificationLink}" style="display:inline-block; padding:16px 40px; background-color:${PRIMARY_COLOR}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px; box-shadow:0 4px 6px rgba(26,46,68,0.2); transition:all 0.3s;">
            ${t.confirmAccount}
          </a>
        </td>
      </tr>
    </table>
    
    <p style="color:#6b7280; font-size:14px; line-height:1.6; margin:24px 0 0 0; padding:16px; background-color:#f9fafb; border-left:4px solid ${ACCENT_COLOR}; border-radius:4px;">
      <strong style="color:#374151;">⏱️ Important :</strong> ${t.validFor24h}<br>
      ${t.notYou}
    </p>
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6; margin:30px 0 0 0;">
      ${t.seeSoon}<br>
      <strong style="color:${PRIMARY_COLOR};">${t.team}</strong>
    </p>
  `;
  
  const preheader = data.language === 'fr' ? 'Confirmez votre adresse email pour activer votre compte Luxio' :
    data.language === 'es' ? 'Confirma tu dirección de correo electrónico para activar tu cuenta Luxio' :
    data.language === 'pt' ? 'Confirme seu endereço de e-mail para ativar sua conta Luxio' :
    'Confirm your email address to activate your Luxio account';
  
  return getBaseTemplate(content, preheader, data.language);
}

export function getPendingOrderEmailTemplate(data: EmailTemplateData): string {
  const t = translations[data.language] || translations.en;
  const greeting = data.firstName ? `${t.hello} ${data.firstName},` : `${t.hello},`;
  
  const orderReceivedText = data.language === 'fr' ?
    `Nous avons bien reçu votre commande <strong style="color:${PRIMARY_COLOR};">#${data.orderNumber}</strong> sur Luxio.<br>` :
    data.language === 'es' ?
    `Hemos recibido tu pedido <strong style="color:${PRIMARY_COLOR};">#${data.orderNumber}</strong> en Luxio.<br>` :
    data.language === 'pt' ?
    `Recebemos seu pedido <strong style="color:${PRIMARY_COLOR};">#${data.orderNumber}</strong> na Luxio.<br>` :
    `We have received your order <strong style="color:${PRIMARY_COLOR};">#${data.orderNumber}</strong> on Luxio.<br>`;
  
  const content = `
    <h1 style="color:#111827; font-size:28px; font-weight:700; margin:0 0 20px 0; line-height:1.3;">
      ${greeting}
    </h1>
    
    <p style="color:#4b5563; font-size:16px; line-height:1.6; margin:0 0 24px 0;">
      ${orderReceivedText}
      ${t.pendingPayment} ${t.followInstructions}
    </p>
    
    <!-- Order Summary Box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0; background-color:#f9fafb; border-radius:8px; border:1px solid #e5e7eb; overflow:hidden;">
      <tr>
        <td style="padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding:8px 0; border-bottom:1px solid #e5e7eb;">
                <span style="color:#6b7280; font-size:13px; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">Article(s)</span>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0; color:#374151; font-size:15px; line-height:1.6;">
                ${data.orderItems || 'Détails de la commande'}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0; border-top:1px solid #e5e7eb;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:8px 0;">
                      <span style="color:#6b7280; font-size:14px;">Montant total :</span>
                    </td>
                    <td align="right" style="padding:8px 0;">
                      <span style="color:${PRIMARY_COLOR}; font-size:20px; font-weight:700;">${data.totalAmount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;">
                      <span style="color:#6b7280; font-size:14px;">Mode de paiement :</span>
                    </td>
                    <td align="right" style="padding:4px 0;">
                      <span style="color:#374151; font-size:14px; font-weight:500;">${data.paymentMethod}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    ${data.paymentLink ? `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0;">
      <tr>
        <td align="center">
          <a href="${data.paymentLink}" style="display:inline-block; padding:16px 40px; background-color:${ACCENT_COLOR}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px; box-shadow:0 4px 6px rgba(255,107,53,0.3);">
            ${t.payOrder}
          </a>
        </td>
      </tr>
    </table>
    ` : ''}
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6; margin:24px 0 0 0;">
      ${t.notificationOnConfirm}<br>
      ${t.thanksTrust}
    </p>
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6; margin:30px 0 0 0;">
      Cordialement,<br>
      <strong style="color:${PRIMARY_COLOR};">${t.team}</strong>
    </p>
  `;
  
  return getBaseTemplate(content, `Commande #${data.orderNumber} reçue - Paiement en attente`);
}

export function getConfirmedOrderEmailTemplate(data: EmailTemplateData): string {
  const t = translations[data.language] || translations.en;
  const greeting = data.firstName ? `Bonjour ${data.firstName},` : 'Bonjour,';
  
  const content = `
    <h1 style="color:#111827; font-size:28px; font-weight:700; margin:0 0 20px 0; line-height:1.3;">
      ${greeting}
    </h1>
    
    <div style="background:linear-gradient(135deg, #10b981 0%, #059669 100%); padding:20px; border-radius:8px; margin:0 0 24px 0; text-align:center;">
      <p style="color:#ffffff; font-size:18px; font-weight:600; margin:0;">
        ${t.goodNews}
      </p>
      <p style="color:#d1fae5; font-size:15px; margin:8px 0 0 0;">
        ${t.orderValidated}
      </p>
    </div>
    
    <!-- Order Summary Box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0; background-color:#f9fafb; border-radius:8px; border:1px solid #e5e7eb; overflow:hidden;">
      <tr>
        <td style="padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td colspan="2" style="padding:0 0 16px 0;">
                <span style="color:${PRIMARY_COLOR}; font-size:16px; font-weight:700;">Commande #${data.orderNumber}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0; border-bottom:1px solid #e5e7eb;">
                <span style="color:#6b7280; font-size:13px; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">Article(s)</span>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0; color:#374151; font-size:15px; line-height:1.6;">
                ${data.orderItems || 'Détails de la commande'}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0; border-top:1px solid #e5e7eb;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:8px 0;">
                      <span style="color:#6b7280; font-size:14px;">Montant total :</span>
                    </td>
                    <td align="right" style="padding:8px 0;">
                      <span style="color:${PRIMARY_COLOR}; font-size:20px; font-weight:700;">${data.totalAmount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;">
                      <span style="color:#6b7280; font-size:14px;">Statut :</span>
                    </td>
                    <td align="right" style="padding:4px 0;">
                      <span style="display:inline-block; padding:4px 12px; background-color:#d1fae5; color:#065f46; font-size:12px; font-weight:600; border-radius:12px; text-transform:uppercase;">✓ Confirmée</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;">
                      <span style="color:#6b7280; font-size:14px;">Date :</span>
                    </td>
                    <td align="right" style="padding:4px 0;">
                      <span style="color:#374151; font-size:14px; font-weight:500;">${data.orderDate || new Date().toLocaleDateString('fr-FR')}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6; margin:24px 0 0 0;">
      ${t.informShipping}<br>
      ${t.welcomePremium}
    </p>
    
    <p style="color:#4b5563; font-size:15px; line-height:1.6; margin:30px 0 0 0;">
      À très bientôt,<br>
      <strong style="color:${PRIMARY_COLOR};">${t.team}</strong>
    </p>
  `;
  
  return getBaseTemplate(content, `Commande #${data.orderNumber} confirmée - Luxio`);
}

export const emailTemplates = {
  verification: getVerificationEmailTemplate,
  pendingOrder: getPendingOrderEmailTemplate,
  confirmedOrder: getConfirmedOrderEmailTemplate,
};
