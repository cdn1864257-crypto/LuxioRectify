# 🚨 DÉPLOIEMENT URGENT - Correction CSRF Production

## LE VRAI PROBLÈME IDENTIFIÉ

L'erreur **"ForbiddenError: invalid csrf token"** dans vos logs Render était causée par :

### Problème 1️⃣ : Cookie CSRF incompatible cross-domain
```javascript
// ❌ AVANT (Ne fonctionne PAS en cross-domain)
sameSite: 'lax'  

// ✅ APRÈS (Fonctionne en cross-domain)
sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
```

**Explication** : 
- Votre frontend est sur `luxios.vercel.app`
- Votre backend est sur `luxio.onrender.com`
- Ce sont **deux domaines différents** = cross-site
- `sameSite: 'lax'` **empêche** le cookie CSRF d'être envoyé dans les requêtes POST cross-site
- **Solution** : `sameSite: 'none'` + `secure: true` en production

### Problème 2️⃣ : Header CORS manquant
```javascript
// ❌ AVANT
res.header('Access-Control-Allow-Headers', '... Cookie');  // Manque X-CSRF-Token

// ✅ APRÈS  
res.header('Access-Control-Allow-Headers', '... Cookie, X-CSRF-Token');
```

---

## ✅ CORRECTIONS APPLIQUÉES

### Fichier modifié : `server/index-render.ts`

**Ligne 58** : Cookie CSRF compatible cross-domain
```javascript
sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
```

**Ligne 113** : Header CORS avec X-CSRF-Token
```javascript
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie, X-CSRF-Token');
```

---

## 🚀 DÉPLOIEMENT SUR RENDER

### Étape 1 : Commit & Push
```bash
git add .
git commit -m "fix: Configure CSRF for cross-domain (sameSite: none + CORS header)"
git push origin main
```

### Étape 2 : Attendre le déploiement automatique
- Render détecte automatiquement le push
- Le déploiement prend 2-3 minutes
- Vérifiez sur dashboard.render.com que le statut passe à "Live"

### OU : Déploiement manuel sur Render
1. Allez sur **dashboard.render.com**
2. Cliquez sur votre service **luxio**
3. Cliquez sur **"Manual Deploy"**
4. Sélectionnez **"Deploy latest commit"**
5. Attendez la fin du déploiement

---

## 🧪 TESTS APRÈS DÉPLOIEMENT

### Test 1 : Inscription
1. Ouvrez https://luxios.vercel.app/
2. Cliquez sur "Sign Up"
3. Remplissez le formulaire
4. Cliquez sur "Create Account"
5. ✅ **Devrait réussir** sans erreur JSON

### Test 2 : Vérification des cookies (DevTools)
1. Ouvrez https://luxios.vercel.app/
2. Ouvrez DevTools (F12)
3. Allez dans **Application** → **Cookies** → `https://luxio.onrender.com`
4. Cherchez le cookie **`x-csrf-token`**
5. Vérifiez :
   - ✅ `SameSite` = `None`
   - ✅ `Secure` = `✓` (coché)
   - ✅ `HttpOnly` = `✓` (coché)

### Test 3 : Paiement
1. Ajoutez un produit au panier
2. Procédez au checkout
3. Sélectionnez un mode de paiement
4. ✅ **Devrait créer la commande** sans erreur

### Test 4 : Suppression de commande
1. Allez dans Dashboard
2. Cliquez sur "Cancel Order"
3. ✅ **Devrait supprimer** sans erreur JSON

---

## 📊 VÉRIFICATION DES LOGS RENDER

Après le déploiement, vérifiez les logs :

### Logs AVANT (avec erreur)
```
ForbiddenError: invalid csrf token
at doubleCsrf
```

### Logs APRÈS (sans erreur)
```
POST /api/auth/signup 200
POST /api/payment/submit-order 200
DELETE /api/orders/xxx 200
```

Aucune erreur **"ForbiddenError: invalid csrf token"** ne devrait apparaître !

---

## 🔍 DIAGNOSTIC EN CAS DE PROBLÈME

### Si l'erreur persiste :

**1. Vérifiez que le déploiement a bien utilisé le nouveau code**
```bash
# Sur Render, dans les logs, cherchez :
"sameSite: none" dans la configuration
```

**2. Vérifiez NODE_ENV sur Render**
- Allez dans **Environment** sur Render
- Vérifiez que `NODE_ENV=production`
- ⚠️ Si ce n'est pas défini, le cookie utilisera `sameSite: 'lax'` !

**3. Videz le cache du navigateur**
- Ctrl+Shift+Suppr (Cmd+Shift+Delete sur Mac)
- Cochez "Cookies" et "Cache"
- Videz tout
- Rechargez https://luxios.vercel.app/

**4. Testez en navigation privée**
- Ouvrez une nouvelle fenêtre privée
- Allez sur https://luxios.vercel.app/
- Essayez de vous inscrire

---

## 📋 CHECKLIST DE VÉRIFICATION

Avant de considérer que c'est résolu :

- [ ] Code commité et pushé sur Git
- [ ] Déploiement Render terminé (statut "Live")
- [ ] `NODE_ENV=production` défini sur Render
- [ ] Cookie `x-csrf-token` visible avec `SameSite=None` dans DevTools
- [ ] Inscription fonctionne sans erreur
- [ ] Paiement fonctionne sans erreur
- [ ] Suppression de commande fonctionne
- [ ] Aucune erreur "ForbiddenError" dans les logs Render

---

## 📞 SI ÇA NE MARCHE TOUJOURS PAS

Envoyez-moi :
1. Screenshot des **logs Render** après le déploiement
2. Screenshot de **DevTools** → **Application** → **Cookies** → cookie `x-csrf-token`
3. Screenshot de **DevTools** → **Network** lors d'une tentative d'inscription (Request Headers et Response Headers)

---

**Dernière mise à jour** : 9 Octobre 2025  
**Fichier corrigé** : `server/index-render.ts` (lignes 58 et 113)  
**Commit requis** : OUI ✅
