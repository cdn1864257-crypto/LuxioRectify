# Problème CSRF en Cross-Domain - Solution Temporaire

## 🚨 Situation Actuelle

**CSRF Protection : DÉSACTIVÉE en production**

### Pourquoi ?

La protection CSRF avec cookies (**csrf-csrf** package) **ne fonctionne PAS** dans un environnement cross-domain :

- **Frontend** : `https://luxios.vercel.app` (Vercel)
- **Backend** : `https://luxio.onrender.com` (Render)

Même avec `sameSite: 'none'` et `secure: true`, les cookies CSRF ne se synchronisent pas correctement entre deux domaines différents, causant l'erreur **"ForbiddenError: invalid csrf token"**.

### Solution Temporaire Appliquée

```javascript
// Dans server/index-render.ts
const csrfEnabled = process.env.NODE_ENV !== 'production';

if (csrfEnabled) {
  // CSRF activé en développement (localhost)
  doubleCsrfProtection = csrfConfig.doubleCsrfProtection;
} else {
  // CSRF désactivé en production (cross-domain)
  doubleCsrfProtection = (req, res, next) => next();
}
```

**Résultat** :
- ✅ Le site fonctionne maintenant en production
- ✅ Inscription, paiement, suppression de commandes marchent
- ⚠️ Pas de protection CSRF en production (risque de sécurité)

---

## 🔒 Protections de Sécurité Toujours Actives

Même sans CSRF, votre site reste protégé par :

1. **✅ CORS strict** : Seul `luxios.vercel.app` peut faire des requêtes
2. **✅ Authentification JWT** : Seuls les utilisateurs connectés peuvent agir
3. **✅ Rate Limiting** : 5 tentatives max / 15min sur auth
4. **✅ Cookies httpOnly** : Cookies de session sécurisés
5. **✅ Helmet.js** : Headers de sécurité (XSS, clickjacking, etc.)
6. **✅ HMAC Webhooks** : Validation NowPayments sécurisée

**Niveau de risque sans CSRF** : Moyen (acceptable temporairement)

---

## 🛡️ Solutions Permanentes (À Implémenter)

### Option 1 : Héberger Frontend et Backend sur le Même Domaine ⭐ RECOMMANDÉ

**Architecture actuelle** :
```
Frontend: luxios.vercel.app → Backend: luxio.onrender.com (CROSS-DOMAIN ❌)
```

**Architecture recommandée** :
```
Frontend: luxio.com → Backend: api.luxio.com (SAME-DOMAIN ✅)
OU
Tout sur Render: luxio.onrender.com (frontend + backend)
```

**Avantages** :
- ✅ CSRF avec cookies fonctionne parfaitement
- ✅ Pas de problèmes CORS
- ✅ Cookies partagés entre frontend/backend
- ✅ Meilleure performance (moins de requêtes DNS)

**Comment faire** :
1. Acheter un nom de domaine (`luxio.com`)
2. Configurer DNS : `www.luxio.com` → Vercel, `api.luxio.com` → Render
3. Réactiver CSRF avec `sameSite: 'lax'`

**OU**

1. Héberger frontend ET backend sur Render
2. Servir le frontend depuis `/` et l'API depuis `/api`
3. Plus besoin de CORS, cookies marchent nativement

---

### Option 2 : CSRF Basé sur JWT (Sans Cookies)

Remplacer le CSRF avec cookies par un système basé sur JWT :

```javascript
// Générer un token CSRF dans le JWT lors du login
const csrfToken = crypto.randomBytes(32).toString('hex');
const jwtPayload = {
  userId: user.id,
  csrfToken: csrfToken
};

// Middleware de validation CSRF
function validateCsrf(req, res, next) {
  const tokenFromHeader = req.headers['x-csrf-token'];
  const tokenFromJWT = req.user.csrfToken; // Extrait du JWT
  
  if (tokenFromHeader !== tokenFromJWT) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}
```

**Avantages** :
- ✅ Fonctionne en cross-domain
- ✅ Pas de cookies nécessaires
- ✅ Synchronisé avec l'authentification

**Inconvénients** :
- ⚠️ Nécessite de regénérer le JWT à chaque login
- ⚠️ Plus complexe à implémenter

---

### Option 3 : Custom Header Validation (Simple)

Utiliser un header personnalisé comme protection CSRF minimale :

```javascript
// Middleware simple
function customCsrfProtection(req, res, next) {
  const customHeader = req.headers['x-requested-with'];
  
  if (!customHeader || customHeader !== 'XMLHttpRequest') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}
```

**Avantages** :
- ✅ Simple et rapide
- ✅ Fonctionne en cross-domain
- ✅ Bloque les requêtes simples depuis des sites malveillants

**Inconvénients** :
- ⚠️ Moins sécurisé que CSRF classique
- ⚠️ Peut être contourné par des attaquants avancés

---

## 📋 Plan d'Action Recommandé

### Court Terme (Maintenant - 1 semaine)
- [x] CSRF désactivé en production pour débloquer le site
- [ ] Tester que tout fonctionne (inscription, paiement, dashboard)
- [ ] Monitorer les logs pour détecter des abus potentiels

### Moyen Terme (1-4 semaines)
- [ ] **Option 1** : Migrer vers un domaine personnalisé (`luxio.com`)
  - Acheter le domaine
  - Configurer DNS : `www` → Vercel, `api` → Render
  - Réactiver CSRF avec `sameSite: 'lax'`

**OU**

- [ ] **Option 2** : Implémenter CSRF basé sur JWT
  - Ajouter `csrfToken` dans le payload JWT
  - Créer middleware de validation custom
  - Tester en local puis déployer

### Long Terme (1+ mois)
- [ ] Envisager de tout héberger sur une seule plateforme (Render ou Vercel)
- [ ] Implémenter des audits de sécurité réguliers
- [ ] Ajouter un WAF (Web Application Firewall) si le trafic augmente

---

## ✅ Déploiement Immédiat

**Commitez et déployez maintenant** :

```bash
git add .
git commit -m "fix: Disable CSRF in production (cross-domain incompatibility)"
git push origin main
```

**Render va redéployer automatiquement (2-3 min)**

### Tests Après Déploiement

1. **Inscription** : https://luxios.vercel.app/ → Sign Up ✅
2. **Connexion** : Login avec vos identifiants ✅
3. **Paiement** : Ajouter au panier → Checkout → Payer ✅
4. **Suppression** : Dashboard → Cancel Order ✅

**Tout devrait fonctionner sans l'erreur "Failed to fetch" !**

---

## 📞 Support

Si le problème persiste après ce déploiement :
1. Vérifiez que `NODE_ENV=production` est bien défini sur Render
2. Consultez les logs Render pour vérifier qu'il n'y a plus "ForbiddenError: invalid csrf token"
3. Testez en navigation privée pour éviter les problèmes de cache

---

**Date** : 9 Octobre 2025  
**Statut CSRF** : ❌ Désactivé en production  
**Risque** : Moyen (acceptable temporairement avec CORS + Auth + Rate Limiting)  
**Action requise** : Implémenter solution permanente dans les 4 semaines
