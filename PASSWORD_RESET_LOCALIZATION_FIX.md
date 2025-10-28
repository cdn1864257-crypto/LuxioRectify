# Correction de la Localisation des Emails de Réinitialisation de Mot de Passe

## Problème Identifié

L'email de réinitialisation de mot de passe n'était **pas entièrement localisé** :
- ✅ Le **sujet** de l'email était traduit correctement
- ❌ Le **contenu** de l'email restait en anglais pour toutes les langues

### Exemple du Problème (Polonais)
- Sujet: "Zresetuj swoje hasło" ✅ (Polonais)
- Contenu: "Hello Admin, Click below to reset your password..." ❌ (Anglais)

## Solution Implémentée

### 1. Ajout des Messages Multilingues (`server/utils/multilingual-messages.ts`)

Création de l'objet `PASSWORD_RESET_MESSAGES` avec toutes les traductions :

```typescript
export const PASSWORD_RESET_MESSAGES = {
  SUBJECT: {
    en: 'Reset your password',
    fr: 'Réinitialiser votre mot de passe',
    es: 'Restablece tu contraseña',
    pt: 'Redefinir sua senha',
    it: 'Reimposta la tua password',
    hu: 'Jelszó visszaállítása',
    pl: 'Zresetuj swoje hasło'
  },
  
  HELLO: {
    en: 'Hello',
    fr: 'Bonjour',
    es: 'Hola',
    pt: 'Olá',
    it: 'Ciao',
    hu: 'Helló',
    pl: 'Witaj'
  },
  
  CLICK_TO_RESET: {
    en: 'Click below to reset your password (expires in',
    fr: 'Cliquez ci-dessous pour réinitialiser votre mot de passe (expire dans',
    es: 'Haga clic a continuación para restablecer su contraseña (caduca en',
    pt: 'Clique abaixo para redefinir sua senha (expira em',
    it: 'Clicca qui sotto per reimpostare la tua password (scade tra',
    hu: 'Kattintson az alábbiakra a jelszó visszaállításához (lejár',
    pl: 'Kliknij poniżej, aby zresetować hasło (wygasa za'
  },
  
  BUTTON_TEXT: {
    en: 'Reset password',
    fr: 'Réinitialiser le mot de passe',
    es: 'Restablecer contraseña',
    pt: 'Redefinir senha',
    it: 'Reimposta password',
    hu: 'Jelszó visszaállítása',
    pl: 'Zresetuj hasło'
  },
  
  // ... et 5 autres messages traduits
};
```

### 2. Création de la Fonction Helper

```typescript
export function getPasswordResetMessage(
  messageKey: keyof typeof PASSWORD_RESET_MESSAGES, 
  lang: string = 'en'
): string {
  const message = PASSWORD_RESET_MESSAGES[messageKey];
  const supportedLang = ['en', 'fr', 'es', 'pt', 'it', 'hu', 'pl'].includes(lang) 
    ? lang 
    : 'en';
  return message[supportedLang as keyof MultilingualMessage];
}
```

### 3. Modification de `utils/email.ts`

Le code a été modifié pour utiliser les messages multilingues au lieu de texte en dur :

**Avant** (tout en anglais) :
```typescript
const plainText = `${firstName ? `Hi ${firstName},\n\n` : ''}You (or someone else) requested a password reset.\nVisit: ${resetUrl}\n\nIf you didn't request this, ignore this email.`;

const html = `
  <h2>${subject}</h2>
  <p>${firstName ? `Hello ${firstName},` : 'Hello,'}</p>
  <p>Click below to reset your password (expires in ${TOKEN_TTL_MINUTES} minutes):</p>
  <a href="${resetUrl}">Reset password</a>
  <p>If button doesn't work, copy & paste this URL:</p>
`;
```

**Après** (multilingue) :
```typescript
const { getPasswordResetMessage } = require('../server/utils/multilingual-messages');

const subject = getPasswordResetMessage('SUBJECT', locale);
const hello = getPasswordResetMessage('HELLO', locale);
const hi = getPasswordResetMessage('HI', locale);
const clickToReset = getPasswordResetMessage('CLICK_TO_RESET', locale);
const minutes = getPasswordResetMessage('MINUTES', locale);
const buttonText = getPasswordResetMessage('BUTTON_TEXT', locale);
const buttonAlt = getPasswordResetMessage('BUTTON_ALTERNATIVE', locale);
// ... etc

const plainText = `${firstName ? `${hi} ${firstName},\n\n` : ''}${requested}\n${visit} ${resetUrl}\n\n${ignore}`;

const html = `
  <h2>${subject}</h2>
  <p>${firstName ? `${hello} ${firstName},` : `${hello},`}</p>
  <p>${clickToReset} ${TOKEN_TTL_MINUTES} ${minutes}</p>
  <a href="${resetUrl}">${buttonText}</a>
  <p>${buttonAlt}</p>
`;
```

## Langues Supportées

| Langue | Code | Sujet | Salutation | Bouton |
|--------|------|-------|------------|--------|
| 🇬🇧 Anglais | `en` | Reset your password | Hello | Reset password |
| 🇫🇷 Français | `fr` | Réinitialiser votre mot de passe | Bonjour | Réinitialiser le mot de passe |
| 🇪🇸 Espagnol | `es` | Restablece tu contraseña | Hola | Restablecer contraseña |
| 🇵🇹 Portugais | `pt` | Redefinir sua senha | Olá | Redefinir senha |
| 🇮🇹 Italien | `it` | Reimposta la tua password | Ciao | Reimposta password |
| 🇭🇺 Hongrois | `hu` | Jelszó visszaállítása | Helló | Jelszó visszaállítása |
| 🇵🇱 Polonais | `pl` | Zresetuj swoje hasło | Witaj | Zresetuj hasło |

## Test de Validation

### Comment Tester

1. **Aller sur la page de réinitialisation** selon la langue :
   - Français: `https://luxiomarket.shop/fr/forgot-password`
   - Polonais: `https://luxiomarket.shop/pl/forgot-password`
   - Espagnol: `https://luxiomarket.shop/es/forgot-password`
   - etc.

2. **Entrer l'email** et demander une réinitialisation

3. **Vérifier l'email reçu** :
   - ✅ Sujet dans la langue correcte
   - ✅ Salutation dans la langue correcte
   - ✅ Texte du bouton dans la langue correcte
   - ✅ URL contient le bon code langue (`/pl/`, `/fr/`, etc.)

### Exemple Attendu pour Polonais (`/pl`)

**Email reçu** :
```
Sujet: Zresetuj swoje hasło

Witaj Admin,

Kliknij poniżej, aby zresetować hasło (wygasa za 60 minut):

[Zresetuj hasło]

Jeśli przycisk nie działa, skopiuj i wklej ten adres URL:
https://luxiomarket.shop/pl/reset-password?token=...
```

### Exemple Attendu pour Français (`/fr`)

**Email reçu** :
```
Sujet: Réinitialiser votre mot de passe

Bonjour Admin,

Cliquez ci-dessous pour réinitialiser votre mot de passe (expire dans 60 minutes) :

[Réinitialiser le mot de passe]

Si le bouton ne fonctionne pas, copiez et collez cette URL :
https://luxiomarket.shop/fr/reset-password?token=...
```

## Fichiers Modifiés

1. ✅ `server/utils/multilingual-messages.ts` - Ajout de `PASSWORD_RESET_MESSAGES` et `getPasswordResetMessage()`
2. ✅ `utils/email.ts` - Modification de `sendPasswordResetEmail()` pour utiliser les traductions

## Flux Complet

```
┌─────────────────────────────────────────────────────────┐
│ 1. Utilisateur visite luxiomarket.shop/pl/forgot-password │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 2. API reçoit langue 'pl' depuis forgot-password.ts      │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 3. sendPasswordResetEmail(email, { locale: 'pl' })       │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 4. getPasswordResetMessage('SUBJECT', 'pl')              │
│    → "Zresetuj swoje hasło"                             │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Email HTML généré avec tous les textes en polonais    │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Email envoyé via SendGrid                             │
└─────────────────────────────────────────────────────────┘
```

## Statut

✅ **CORRIGÉ** - Les emails de réinitialisation sont maintenant **entièrement localisés** pour toutes les langues supportées (fr, en, es, pt, it, hu, pl).

## Date du Fix

28 octobre 2025
