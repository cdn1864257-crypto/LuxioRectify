# Guide de correction CORS/CSRF pour Vercel + Render

## ✅ Corrections effectuées

### 1. Ordre des middlewares corrigé
L'ordre d'exécution est maintenant optimal :
```
1. Helmet (sécurité)
2. express.json/urlencoded/cookieParser
3. CORS ← DÉPLACÉ EN PREMIER (critique pour preflight)
4. Sessions MongoDB
5. CSRF (avec exemptions)
6. Rate limiting
7. Routes API
```

### 2. Routes exemptées de CSRF
Les routes suivantes **ne nécessitent plus de token CSRF** :
- `/api/csrf-token` - Pour récupérer le token
- `/api/auth/signup` - Inscription
- `/api/auth/login` - Connexion
- `/api/payment/nowpayments-webhook` - Webhook NowPayments
- `/api/payment/nowpayments-return` - Retour paiement

### 3. Configuration CORS
✅ `Access-Control-Allow-Origin`: dynamique selon l'environnement
✅ `Access-Control-Allow-Credentials`: `true`
✅ `Access-Control-Allow-Methods`: GET, POST, PUT, DELETE, OPTIONS
✅ `Access-Control-Allow-Headers`: inclut X-CSRF-Token

### 4. Configuration des sessions
✅ Store MongoDB pour persistance cross-instance
✅ `secure: true` en production (HTTPS obligatoire)
✅ `sameSite: 'none'` en production (cross-domain)
✅ `httpOnly: true` (protection XSS)

---

## 🧪 Comment tester

### Sur Replit (développement)
```bash
# Le serveur tourne déjà sur localhost:5000 (frontend) et localhost:3001 (backend)
# Tester l'inscription depuis le navigateur
```

### Sur Render (production)

#### 1. Variables d'environnement requises
Assurez-vous que ces variables sont définies sur Render :
```env
NODE_ENV=production
FRONTEND_URL=https://luxios.vercel.app
MONGODB_URI=mongodb+srv://...
SESSION_SECRET=votre-secret-session-secure
JWT_SECRET=votre-jwt-secret
```

#### 2. Tester /api/csrf-token
```bash
curl -i https://luxio.onrender.com/api/csrf-token
```
Doit renvoyer :
```json
{"csrfToken":"..."}
```

#### 3. Tester /api/auth/signup depuis Vercel
Ouvrir https://luxios.vercel.app dans Chrome/Firefox :
1. Ouvrir DevTools (F12) → Onglet "Network"
2. Remplir le formulaire d'inscription
3. Soumettre
4. Vérifier qu'il n'y a **pas d'erreur "Failed to fetch"**
5. Vérifier que la réponse est 200 OK ou 400 (validation)

#### 4. Vérifier les cookies
Dans Chrome → DevTools (F12) → Onglet "Application" → Cookies :
- URL : https://luxios.vercel.app
- Cookie : `connect.sid` (session)
- Attributs : `SameSite=None; Secure`

---

## 🔧 Déploiement sur Render

### Méthode 1 : Git push (recommandé)
```bash
git add server/index-render.ts
git commit -m "fix: Corriger ordre middlewares CORS/CSRF pour Vercel"
git push origin main
```
Render redéploiera automatiquement.

### Méthode 2 : Déploiement manuel
1. Aller sur https://dashboard.render.com
2. Sélectionner le service "luxio"
3. Cliquer sur "Manual Deploy" → "Deploy latest commit"

---

## 🐛 Dépannage

### Erreur: "Failed to fetch"
**Cause** : CORS bloque la requête
**Solution** : Vérifier que `FRONTEND_URL` est bien `https://luxios.vercel.app` sur Render

### Erreur: "CSRF token missing"
**Cause** : La route n'est pas exemptée ou le token n'est pas envoyé
**Solution** : Vérifier que `/api/auth/signup` et `/api/auth/login` sont dans `exemptRoutes`

### Erreur: "Session not saved"
**Cause** : Cookie bloqué ou MongoDB non connecté
**Solutions** :
1. Vérifier que `MONGODB_URI` est défini
2. Vérifier que le cookie a `Secure` et `SameSite=None`
3. Vérifier les logs Render : `MongoDB session store error`

### Les cookies ne sont pas envoyés
**Cause** : `credentials: 'include'` manquant côté frontend
**Solution** : Vérifier que toutes les requêtes fetch incluent :
```javascript
fetch('https://luxio.onrender.com/api/...', {
  credentials: 'include',
  // ...
})
```

---

## 📋 Checklist finale

- [ ] Variables d'environnement définies sur Render
- [ ] Code poussé sur Git et déployé sur Render
- [ ] `/api/csrf-token` fonctionne (retourne un token)
- [ ] `/api/auth/signup` fonctionne (pas de "Failed to fetch")
- [ ] `/api/auth/login` fonctionne
- [ ] Cookie `connect.sid` visible dans DevTools
- [ ] Cookie a les attributs `SameSite=None; Secure`
- [ ] Paiements crypto (NowPayments) fonctionnent
- [ ] Paiements Transcash/PCS fonctionnent
- [ ] Virement bancaire fonctionne

---

## 🎯 Résultat attendu

✅ Plus d'erreur "Failed to fetch"
✅ Inscription et connexion fonctionnelles
✅ Sessions persistantes entre requêtes
✅ Cookies échangés correctement entre Vercel et Render
✅ Paiements opérationnels
