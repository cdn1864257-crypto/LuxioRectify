import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'replitprojet97@gmail.com',
      subject: '✅ Test SendGrid Luxio',
      text: 'Si tu reçois ce message, SendGrid SMTP fonctionne correctement pour Luxio.',
    });
    console.log('✅ Email envoyé avec succès :', info.messageId);
    console.log('✅ Configuration SendGrid terminée et test réussi pour Luxio');
  } catch (err) {
    console.error('❌ Erreur lors de l\'envoi de l\'email :', err);
  }
}

sendTestEmail();
