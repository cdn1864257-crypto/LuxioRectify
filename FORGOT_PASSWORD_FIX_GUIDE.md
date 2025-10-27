# Guide de correction - Email "Mot de passe oublié"

## Problème résolu ✅

L'email de réinitialisation de mot de passe ne s'envoyait pas à cause d'un paramètre manquant dans le code.

## Corrections apportées

### 1. Ajout du paramètre `from` manquant
**Fichier:** `api/auth/forgot-password.ts`

**Avant:**
```typescript
const emailSent = await sendEmail({
  to: user.email,
  subject: '...',
  html: emailHtml,
  text: emailText
  // ❌ Paramètre 'from' manquant
});
```

**Après:**
```typescript
import { sendEmail, DEFAULT_FROM } from '../../utils/email.js';

const emailSent = await sendEmail({
  to: user.email,
  subject: '...',
  html: emailHtml,
  text: emailText,
  from: DEFAULT_FROM // ✅ Utilise la constante partagée
});
```

### 2. Ajout de logs sécurisés pour faciliter le débogage

Des logs ont été ajoutés pour faciliter le diagnostic en cas de problème, tout en **respectant la sécurité**:
- ✅ Email destinataire
- ✅ Langue utilisée
- ❌ **JAMAIS** le token ou l'URL de reset (données sensibles)

**Important:** Les tokens de réinitialisation ne doivent **JAMAIS** apparaître dans les logs pour éviter les vols de session.

## Vérifications à faire sur Render (Backend)

### Variables d'environnement requises

Assurez-vous que les variables suivantes sont bien configurées sur votre dashboard Render:

1. **SENDGRID_API_KEY**
   - Votre clé API SendGrid
   - Format: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Où la trouver: [SendGrid Dashboard](https://app.sendgrid.com/settings/api_keys)

2. **SENDGRID_FROM_EMAIL**
   - L'email expéditeur vérifié dans SendGrid
   - Exemple: `replitprojet97@gmail.com`
   - Doit être vérifié dans SendGrid: [Sender Authentication](https://app.sendgrid.com/settings/sender_auth)

3. **FRONTEND_URL**
   - L'URL de votre frontend Vercel
   - Exemple: `https://luxiomarket.shop`
   - Utilisé pour générer le lien de réinitialisation

4. **MONGODB_URI**
   - Votre URI de connexion MongoDB
   - Déjà configuré (fonctionne pour les autres fonctionnalités)

### Comment vérifier sur Render

1. Allez sur https://dashboard.render.com
2. Sélectionnez votre service backend (API)
3. Cliquez sur "Environment" dans le menu de gauche
4. Vérifiez que toutes les variables ci-dessus sont présentes et correctes
5. Si vous modifiez une variable, Render redémarrera automatiquement votre service

## Comment tester

### 1. Test depuis votre site en production

1. Allez sur https://luxiomarket.shop/login
2. Cliquez sur "Mot de passe oublié"
3. Entrez votre email
4. Cliquez sur "Envoyer"
5. Vérifiez votre boîte mail (et spam)
6. Le lien devrait être: `https://luxiomarket.shop/reset-password?token=...`

### 2. Vérifier les logs sur Render

Si l'email ne s'envoie toujours pas:

1. Allez sur https://dashboard.render.com
2. Sélectionnez votre service backend
3. Cliquez sur "Logs"
4. Recherchez les messages suivants:
   - `[Forgot Password] Attempting to send reset email...`
   - `[Forgot Password] To: ...`
   - `✅ Email sent successfully via SendGrid` (succès)
   - `❌ Error sending email via SendGrid` (erreur)

## Comparaison avec les emails qui fonctionnent

Les emails d'inscription et de confirmation de commande fonctionnent car ils utilisent tous la même configuration SendGrid, mais **spécifient toujours le paramètre `from`**.

La correction appliquée aligne l'email de mot de passe oublié avec ces emails fonctionnels.

## En cas de problème persistant

Si l'email ne s'envoie toujours pas après vérification des variables d'environnement:

1. **Vérifiez votre quota SendGrid**
   - Compte gratuit: 100 emails/jour
   - Allez sur: https://app.sendgrid.com/statistics

2. **Vérifiez que l'email expéditeur est vérifié**
   - SendGrid exige une vérification de l'email expéditeur
   - Allez sur: https://app.sendgrid.com/settings/sender_auth

3. **Vérifiez les logs SendGrid**
   - Allez sur: https://app.sendgrid.com/email_activity
   - Recherchez les emails récents envoyés ou bloqués

4. **Testez avec un autre email destinataire**
   - Certains fournisseurs d'email bloquent les emails automatiques

## Déploiement

Les modifications ont été apportées au code source. Pour les déployer:

### Backend (Render)
- Render se redéploie automatiquement depuis votre dépôt Git
- Si connecté à GitHub/GitLab: poussez vos modifications
- Render détectera les changements et redéploiera automatiquement

### Frontend (Vercel)
- Aucune modification frontend nécessaire pour ce correctif
- Vercel se redéploie automatiquement depuis votre dépôt Git

## Résumé

✅ **Problème identifié:** Paramètre `from` manquant dans l'appel SendGrid  
✅ **Solution appliquée:** Ajout du paramètre `from: 'replitprojet97@gmail.com'`  
✅ **Logs ajoutés:** Pour faciliter le débogage futur  
⚠️ **À vérifier:** Variables d'environnement sur Render (SENDGRID_API_KEY, SENDGRID_FROM_EMAIL)

---

**Date de création:** 27 octobre 2025  
**Fichiers modifiés:** `api/auth/forgot-password.ts`
