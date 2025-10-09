# 🔧 Correction du problème de paiement - CSRF Token

## ❌ Problème identifié

Tous les moyens de paiement retournaient l'erreur:
```
"Unexpected token '<', '<!DOCTYPE '... is not valid JSON"
```

**Cause:** Le backend a la protection CSRF activée (sécurité) mais le frontend ne récupérait ni n'envoyait le token CSRF. Résultat: toutes les requêtes POST étaient bloquées et retournaient du HTML d'erreur au lieu de JSON.

---

## ✅ Solution implémentée

### 1. Ajout de la gestion automatique du CSRF dans le frontend

**Fichiers modifiés:**
- ✅ `frontend/src/lib/config.ts` - Ajout des fonctions `getCsrfToken()` et `fetchWithCsrf()`
- ✅ `frontend/src/lib/api.ts` - Nouveau fichier avec helpers API (apiPost, apiGet, etc.)
- ✅ `frontend/src/pages/NewPayment.tsx` - Mise à jour pour utiliser `fetchWithCsrf()`

### 2. Comment ça marche maintenant

1. **Au chargement:** Le frontend récupère automatiquement le token CSRF depuis `/api/csrf-token`
2. **À chaque requête POST:** Le token est automatiquement ajouté dans le header `X-CSRF-Token`
3. **Le backend valide:** Si le token est correct, la requête est acceptée ✅

---

## 🚀 Étapes pour déployer la correction

### **Étape 1: Redéployer le frontend sur Vercel**

Les changements ont été faits dans le code frontend, donc vous devez redéployer sur Vercel:

```bash
# Option 1: Redéploiement automatique (si Git push déclenche auto-deploy)
git add .
git commit -m "Fix: Add CSRF token management for payments"
git push

# Option 2: Redéploiement manuel sur Vercel
# Allez sur Vercel Dashboard → Votre projet → Deployments → Redeploy
```

### **Étape 2: Vérifier que BACKEND_URL est bien configuré sur Render**

Allez sur **Render Dashboard** et vérifiez:
```
BACKEND_URL=https://luxio.onrender.com
```

Si cette variable n'existe pas, ajoutez-la et redémarrez le service.

### **Étape 3: Tester les paiements**

Après le déploiement Vercel (environ 2-3 minutes):

1. Allez sur https://luxios.vercel.app
2. Ajoutez un produit au panier
3. Allez au checkout
4. Testez chaque méthode de paiement:
   - ✅ NowPayments (crypto)
   - ✅ Transfert bancaire
   - ✅ Tickets PCS/TransCash

**Résultat attendu:** Plus d'erreur JSON, les paiements doivent fonctionner normalement.

---

## 📋 Variables d'environnement - Récapitulatif complet

### **RENDER (Backend)** - Toutes configurées ✅
```bash
NODE_ENV=production
MONGODB_URI=✅ (configuré)
JWT_SECRET=✅ (configuré)
ENCRYPTION_KEY=✅ (configuré)
SENDGRID_API_KEY=✅ (configuré)
SENDGRID_FROM_EMAIL=✅ (configuré)
NOWPAYMENTS_API_KEY=✅ (configuré)
NOWPAYMENTS_IPN_SECRET=✅ (configuré)
FRONTEND_URL=https://luxios.vercel.app ✅ (configuré)
CSRF_SECRET=✅ (configuré)
BACKEND_URL=https://luxio.onrender.com ⚠️ (VÉRIFIER!)
```

### **VERCEL (Frontend)** - Optionnel
```bash
VITE_API_URL=https://luxio.onrender.com
```
> Note: Si non défini, utilise automatiquement `https://luxio.onrender.com` (valeur par défaut)

---

## 🔍 Comment vérifier que tout fonctionne

### Test 1: Backend actif
```bash
curl https://luxio.onrender.com/api/health
# Résultat attendu: {"status":"ok"}
```

### Test 2: CSRF token disponible
```bash
curl https://luxio.onrender.com/api/csrf-token
# Résultat attendu: {"csrfToken":"...un long token..."}
```

### Test 3: Frontend peut récupérer le token
1. Allez sur https://luxios.vercel.app
2. Ouvrez la console développeur (F12)
3. Exécutez:
```javascript
fetch('https://luxio.onrender.com/api/csrf-token', {credentials: 'include'})
  .then(r => r.json())
  .then(console.log)
```
4. Résultat attendu: `{csrfToken: "..."}`

---

## 🐛 Dépannage

### Si l'erreur persiste après le déploiement:

1. **Vider le cache du navigateur:**
   - Chrome: Ctrl+Shift+Del → Cocher "Cookies" et "Cache" → Effacer
   - Ou mode navigation privée

2. **Vérifier les logs Render:**
   - Render Dashboard → Votre service → Logs
   - Chercher les erreurs liées à CSRF

3. **Vérifier que le frontend appelle bien le bon backend:**
   - Console navigateur (F12) → Network
   - Cliquer sur "Payer maintenant"
   - Vérifier que la requête va bien vers `luxio.onrender.com` (pas `localhost`)

4. **Backend en veille (Render Free Tier):**
   - Le premier appel API peut prendre 30-60 secondes si le backend était en veille
   - Rafraîchir la page et réessayer

---

## 📝 Fichiers modifiés pour référence

1. **frontend/src/lib/config.ts**
   - Ajout `getCsrfToken()` - Récupère le token CSRF
   - Ajout `fetchWithCsrf()` - Wrapper fetch avec token auto

2. **frontend/src/lib/api.ts** (NOUVEAU)
   - `apiPost()` - Helper pour POST avec CSRF
   - `apiGet()` - Helper pour GET
   - `apiPut()`, `apiDelete()` - Autres méthodes

3. **frontend/src/pages/NewPayment.tsx**
   - Mise à jour: utilise `fetchWithCsrf()` au lieu de `fetch()`
   - Impacte: NowPayments, Transfert bancaire, Tickets PCS/TransCash

---

## ✅ Prochaines étapes recommandées

Après avoir vérifié que les paiements fonctionnent:

1. **Mettre à jour les autres composants** pour utiliser les nouveaux helpers API:
   - `AuthContext.tsx` (login/signup)
   - `ForgotPasswordForm.tsx`
   - `ResetPasswordForm.tsx`
   - `UserProfile.tsx`

2. **Ajouter la validation des prix côté serveur** (cf. SECURITY.md section "Known Limitations")

3. **Tester tous les flux de paiement** en production avec de vraies transactions test

---

**Date:** 9 octobre 2025  
**Version:** 1.1.0  
**Auteur:** Replit Agent
