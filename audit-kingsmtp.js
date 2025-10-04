import fs from 'fs';
import path from 'path';
import readline from 'readline';
import nodemailer from 'nodemailer';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 1️⃣ Fonctions utilitaires

function scanFiles(dir, results = { kingmailer: [], kingsmtp: [], nodemailer: [] }) {
  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      // Skip node_modules and hidden directories
      if (file === 'node_modules' || file === '.git' || file.startsWith('.')) {
        return;
      }

      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanFiles(filePath, results);
      } else if (file.endsWith('.js') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('KingMailer')) results.kingmailer.push(filePath);
        if (content.includes('KingSMTP')) results.kingsmtp.push(filePath);
        if (content.includes('nodemailer')) results.nodemailer.push(filePath);
      }
    });
  } catch (err) {
    // Skip directories we can't read
  }

  return results;
}

function removeKingMailer(files) {
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    content = content.replace(/
    content = content.replace(/require\(['"]KingMailer['"]\)/g, '');
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`  ✅ Nettoyé: ${file}`);
    }
  });
}

async function testKingSMTP(smtpConfig, emailTest) {
  console.log('\n📧 Configuration SMTP détectée:');
  console.log(`  Host: ${smtpConfig.host}`);
  console.log(`  Port: ${smtpConfig.port}`);
  console.log(`  User: ${smtpConfig.user ? '***' + smtpConfig.user.slice(-10) : 'non défini'}`);
  console.log(`  Pass: ${smtpConfig.pass ? '***' : 'non défini'}\n`);

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: false,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  try {
    console.log('🔄 Envoi de l\'email de test...');
    const res = await transporter.sendMail({
      from: smtpConfig.from || 'no-reply@luxio-shop.com',
      to: emailTest,
      subject: 'Test KingSMTP - Audit Luxio',
      text: 'Si tu reçois ce message, KingSMTP fonctionne correctement avec nodemailer.',
      html: '<h1>✅ Test réussi!</h1><p>Si tu reçois ce message, KingSMTP fonctionne correctement avec nodemailer.</p>'
    });
    console.log('✅ Email envoyé avec succès!');
    console.log(`  Message ID: ${res.messageId}`);
    console.log(`  Accepté: ${res.accepted.join(', ')}`);
    return true;
  } catch (err) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:');
    console.error(`  ${err.message}`);
    return false;
  }
}

// 2️⃣ Interface interactive
console.log('🚀 Audit KingSMTP pour Luxio\n');

rl.question('📧 Entrez l\'adresse email de test (pour recevoir l\'email de test): ', emailTest => {
  rl.question('🔑 Entrez SMTP_HOST (ou appuyez sur Entrée pour smtp.kingsmtp.com): ', smtpHost => {
    rl.question('🔑 Entrez SMTP_PORT (ou appuyez sur Entrée pour 587): ', smtpPort => {
      rl.question('🔑 Entrez SMTP_USER (votre username KingSMTP): ', smtpUser => {
        rl.question('🔑 Entrez SMTP_PASS (votre password KingSMTP): ', async smtpPass => {
          rl.question('📧 Entrez EMAIL_FROM (ou appuyez sur Entrée pour no-reply@luxio-shop.com): ', emailFrom => {
            
            console.log('\n🔎 Scan du projet pour KingMailer, KingSMTP et nodemailer...\n');
            const scanResults = scanFiles('./');

            console.log('📊 Résultats du scan:');
            console.log(`  📄 Fichiers mentionnant KingMailer: ${scanResults.kingmailer.length}`);
            if (scanResults.kingmailer.length > 0) {
              scanResults.kingmailer.forEach(f => console.log(`    - ${f}`));
            }
            
            console.log(`  📄 Fichiers mentionnant KingSMTP: ${scanResults.kingsmtp.length}`);
            if (scanResults.kingsmtp.length > 0) {
              scanResults.kingsmtp.forEach(f => console.log(`    - ${f}`));
            }
            
            console.log(`  📄 Fichiers utilisant nodemailer: ${scanResults.nodemailer.length}`);
            if (scanResults.nodemailer.length > 0) {
              scanResults.nodemailer.forEach(f => console.log(`    - ${f}`));
            }

            if (scanResults.kingmailer.length > 0) {
              console.log('\n🧹 Suppression des traces inutilisées de KingMailer...');
              removeKingMailer(scanResults.kingmailer);
              console.log('✅ KingMailer nettoyé.');
            } else {
              console.log('\nℹ️  KingMailer non utilisé, aucune suppression nécessaire.');
            }

            const smtpConfig = {
              host: smtpHost || 'smtp.kingsmtp.com',
              port: parseInt(smtpPort || '587', 10),
              user: smtpUser,
              pass: smtpPass,
              from: emailFrom || 'no-reply@luxio-shop.com'
            };

            if (smtpUser && smtpPass) {
              testKingSMTP(smtpConfig, emailTest).then(success => {
                console.log('\n🎯 Audit terminé.');
                if (success) {
                  console.log('\n✅ Votre configuration KingSMTP fonctionne correctement!');
                  console.log('\n💡 Pour utiliser cette configuration dans votre application:');
                  console.log('  1. Ajoutez ces variables dans les Secrets Replit:');
                  console.log(`     SMTP_HOST=${smtpConfig.host}`);
                  console.log(`     SMTP_PORT=${smtpConfig.port}`);
                  console.log(`     SMTP_USER=${smtpConfig.user}`);
                  console.log(`     SMTP_PASS=***`);
                  console.log(`     EMAIL_FROM=${smtpConfig.from}`);
                } else {
                  console.log('\n❌ Problème avec la configuration KingSMTP.');
                  console.log('   Vérifiez vos identifiants et réessayez.');
                }
                rl.close();
              });
            } else {
              console.log('\n⚠️  Test d\'envoi ignoré (identifiants SMTP manquants)');
              console.log('🎯 Audit terminé (scan uniquement).');
              rl.close();
            }
          });
        });
      });
    });
  });
});
