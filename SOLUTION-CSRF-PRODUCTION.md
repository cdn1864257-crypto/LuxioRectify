# Solution au problème CSRF en Production

## 🎯 Problème Identifié

L'erreur `"Unexpected token '<', "<!DOCTYPE "... is not valid JSON"` que vous rencontriez lors de l'inscription, du paiement et de la suppression de commandes était causée par un **header CORS manquant** dans le backend sur Render.

### Cause du Problème

Dans `server/index-render.ts`, le header CORS `Access-Control-Allow-Headers` ne contenait **PAS** `X-CSRF-Token` :

```javascript
// ❌ AVANT (INCORRECT)
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
```

Sans ce header, les navigateurs **bloquent** l'envoi du token CSRF depuis le frontend (Vercel) vers le backend (Render), ce qui cause le rejet de toutes les requêtes POST/PUT/DELETE par la protection CSRF.

### Correction Appliquée

```javascript
// ✅ APRÈS (CORRECT)
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie, X-CSRF-Token');
```

Le header `X-CSRF-Token` a été ajouté à la liste des headers autorisés par CORS.

---

## 📋 Ce qui a été fait

1. ✅ **Correction du header CORS** dans `server/index-render.ts` (ligne 113)
2. ✅ **Mise à jour de la documentation** dans `SECURITY.md`
3. ✅ **Ajout d'un avertissement** pour éviter ce problème à l'avenir

---

## 🚀 Étapes pour Déployer la Correction sur Render

### Option 1 : Déploiement Automatique (Recommandé)

1. **Commitez et pushez** les modifications sur votre repository Git :
   ```bash
   git add .
   git commit -m "fix: Add X-CSRF-Token to CORS headers for production"
   git push origin main
   ```

2. **Render déploiera automatiquement** la nouvelle version
   - Attendez que le déploiement soit terminé (vous verrez un statut "Live" dans Render)
   - Cela prend généralement 2-3 minutes

### Option 2 : Déploiement Manuel sur Render

1. Allez sur **dashboard.render.com**
2. Sélectionnez votre service **luxio**
3. Cliquez sur **"Manual Deploy" → "Deploy latest commit"**
4. Attendez la fin du déploiement

---

## ✅ Vérification que tout fonctionne

Une fois le déploiement terminé sur Render, testez ces fonctionnalités :

### 1. Test d'Inscription
- Allez sur https://luxios.vercel.app/
- Cliquez sur "Sign Up"
- Créez un nouveau compte
- ✅ Devrait fonctionner sans erreur JSON

### 2. Test de Paiement
- Ajoutez un produit au panier
- Procédez au checkout
- Choisissez un mode de paiement
- ✅ La commande devrait être créée sans erreur

### 3. Test de Suppression de Commande
- Allez dans votre Dashboard
- Cliquez sur "Cancel Order" pour une commande en attente
- ✅ La suppression devrait fonctionner

---

## 🔍 Comment vérifier si le fix est déployé

### Test CORS depuis le navigateur

1. Ouvrez https://luxios.vercel.app/
2. Ouvrez les DevTools (F12)
3. Allez dans l'onglet **Network**
4. Tentez de vous inscrire ou de vous connecter
5. Regardez la requête vers `https://luxio.onrender.com/api/auth/signup` (ou login)
6. Vérifiez les **Response Headers** :

```
access-control-allow-headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie, X-CSRF-Token
```

Si vous voyez `X-CSRF-Token` dans la liste, c'est bon ! ✅

---

## 📝 Variables d'Environnement sur Render (Rappel)

Assurez-vous que toutes ces variables sont bien configurées sur Render :

```bash
BACKEND_URL=https://luxio.onrender.com
CSRF_SECRET=I0uR0ikuNnnDuUuuumcAQ1wJyPe8nbnW
ENCRYPTION_KEY=I0uR0ikuNnnDuUuuumcAQ1wJyPe8nbnW
FRONTEND_URL=https://luxios.vercel.app
JWT_SECRET=FSKds0Djx1mwn4g8Y
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
NOWPAYMENTS_API_KEY=16SMG0P-EQWHM-FC...
NOWPAYMENTS_IPN_SECRET=0kVC463T59HXBeMev...
PORT=10000
SENDGRID_API_KEY=SG.jkAgjX18RyBxv2BX...
SENDGRID_FROM_EMAIL=zep1itpcoSat97mnB@gmail.com
```

✅ Toutes ces variables sont déjà configurées (d'après vos screenshots)

---

## 🔒 Sécurité Maintenue

Après cette correction, votre application conserve **toutes les protections de sécurité** :

- ✅ Protection CSRF active (double-submit cookie)
- ✅ Rate limiting sur les routes d'authentification (5 tentatives/15min)
- ✅ CORS restreint uniquement au frontend Vercel en production
- ✅ Headers de sécurité Helmet.js
- ✅ Validation HMAC des webhooks NowPayments
- ✅ Hachage des mots de passe avec bcrypt
- ✅ JWT pour l'authentification

---

## 🆘 Si le problème persiste après le déploiement

### 1. Vérifiez les logs Render
- Allez sur dashboard.render.com
- Cliquez sur votre service "luxio"
- Allez dans l'onglet "Logs"
- Vérifiez qu'il n'y a pas d'erreurs au démarrage

### 2. Vérifiez que le bon fichier est utilisé
- Sur Render, allez dans "Settings"
- Vérifiez que **Build Command** est vide
- Vérifiez que **Start Command** est : `npx tsx server/index-render.ts`

### 3. Videz le cache du navigateur
- Appuyez sur Ctrl+Shift+Suppr (ou Cmd+Shift+Delete sur Mac)
- Sélectionnez "Cookies" et "Cache"
- Videz tout
- Rechargez https://luxios.vercel.app/

---

## 📚 Résumé

**Le problème** : Le header `X-CSRF-Token` manquait dans la configuration CORS, bloquant les tokens CSRF

**La solution** : Ajout de `X-CSRF-Token` dans `Access-Control-Allow-Headers`

**Action requise** : Déployer cette correction sur Render (git push ou déploiement manuel)

**Résultat attendu** : Inscription, paiement et suppression de commandes fonctionnent à nouveau ! 🎉

---

**Date de résolution** : 9 Octobre 2025  
**Fichier modifié** : `server/index-render.ts` (ligne 113)  
**Documentation mise à jour** : `SECURITY.md`
