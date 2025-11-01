# 🎯 Guide des Actions Manuelles - Résolution CSRF Cross-Domain

## Vue d'Ensemble

Toutes les corrections de code ont été effectuées. Voici les **actions que vous devez faire manuellement** pour résoudre définitivement le problème CSRF et faire fonctionner toutes les fonctionnalités de Luxio Market.

**Temps estimé total**: 20-30 minutes  
**Niveau de difficulté**: Facile (configuration uniquement, pas de code)

---

## ✅ Ce Qui a Été Corrigé dans le Code

### Modifications Backend (server/index-render.ts)
- ✅ Configuration des cookies avec domaine partagé (`.luxiomarket.shop`)
- ✅ CORS optimisé pour accepter uniquement `luxiomarket.shop` et `www.luxiomarket.shop`
- ✅ Cookies `sameSite: 'lax'` au lieu de `'none'` (meilleur pour same-domain)
- ✅ Nettoyage des `console.log` sensibles en production
- ✅ Protection CSRF maintenue et fonctionnelle

### Modifications API Auth
- ✅ `api/auth/login.ts`: Cookies avec domaine partagé
- ✅ `api/auth/signup.ts`: Logs conditionnels (seulement en dev)
- ✅ `api/auth/verify-email.ts`: Cookies avec domaine partagé + logs conditionnels

### Résultat Attendu
Une fois vos actions manuelles effectuées, vous aurez :
- 🔒 Protection CSRF complètement fonctionnelle
- ✅ Toutes les fonctionnalités authentifiées fonctionnent (Dashboard, Paiement, Suppression)
- 🚀 Architecture propre et sécurisée
- 📈 Meilleure performance (moins de latence DNS)

---

## 📋 ACTIONS OBLIGATOIRES À FAIRE

### Étape 1: Configuration DNS (5-10 minutes)

Vous devez configurer votre DNS pour pointer `api.luxiomarket.shop` vers votre backend Render.

#### 1.1 Trouver l'URL de votre Backend Render

1. Allez sur **Render.com**
2. Ouvrez votre service backend (luxio API)
3. Copiez l'URL de déploiement (exemple: `luxio.onrender.com` ou `luxio-api.onrender.com`)

#### 1.2 Configurer le DNS

Allez chez votre registrar de domaine (où vous avez acheté `luxiomarket.shop`) et ajoutez cette entrée DNS :

```
Type:   CNAME
Nom:    api
Valeur: [VOTRE-URL-RENDER].onrender.com  (exemple: luxio.onrender.com)
TTL:    Auto ou 3600
```

**Exemple concret :**
```
Type:   CNAME
Nom:    api
Valeur: luxio.onrender.com
```

**Résultat :** Après propagation DNS (0-48h, souvent 5-10 min), `api.luxiomarket.shop` pointera vers votre backend Render.

#### 1.3 Vérifier la Configuration DNS

Attendez quelques minutes puis testez :

```bash
# Windows (cmd)
nslookup api.luxiomarket.shop

# Mac/Linux (terminal)
dig api.luxiomarket.shop
```

Vous devriez voir l'IP de Render dans la réponse.

**OU** testez directement dans votre navigateur :
```
https://api.luxiomarket.shop/
```

Vous devriez voir :
```json
{
  "status": "ok",
  "message": "Luxio Backend API is running",
  "environment": "production",
  "timestamp": "..."
}
```

---

### Étape 2: Variables d'Environnement sur Render (2-3 minutes)

Une fois le DNS configuré, allez sur **Render.com** → Votre service backend → **Environment**.

#### 2.1 Variables Obligatoires à Ajouter/Modifier

| Variable | Valeur | Explication |
|----------|--------|-------------|
| `FRONTEND_URL` | `https://luxiomarket.shop` | URL du frontend (sans trailing slash) |
| `COOKIE_DOMAIN` | `.luxiomarket.shop` | Domaine partagé pour les cookies (avec le point au début) |
| `NODE_ENV` | `production` | Active le mode production |

#### 2.2 Variables Recommandées (Si Pas Déjà Configurées)

| Variable | Où Trouver | Importance |
|----------|------------|------------|
| `SENDGRID_API_KEY` | SendGrid Dashboard → API Keys | 🔴 Critique pour emails |
| `SENDGRID_FROM_EMAIL` | Votre email vérifié sur SendGrid | 🔴 Critique pour emails |
| `SESSION_SECRET` | Générer : `openssl rand -base64 32` | 🟡 Important |
| `JWT_SECRET` | Générer : `openssl rand -base64 32` | 🔴 Critique |
| `ENCRYPTION_KEY` | Générer : `openssl rand -hex 32` | 🔴 Critique |

**Comment générer des secrets sécurisés :**

```bash
# Sur Mac/Linux/Git Bash
openssl rand -base64 32   # Pour SESSION_SECRET et JWT_SECRET
openssl rand -hex 32      # Pour ENCRYPTION_KEY

# OU en ligne (https://generate-secret.vercel.app)
```

#### 2.3 Sauvegarder et Redéployer

1. Cliquez sur **"Save Changes"**
2. Render va **automatiquement redéployer** (2-3 minutes)
3. Attendez que le statut passe à **"Live"**

---

### Étape 3: Variables d'Environnement sur Vercel (1 minute)

Allez sur **Vercel.com** → Votre projet frontend → **Settings** → **Environment Variables**.

#### 3.1 Variable à Modifier

| Variable | Valeur Actuelle | Nouvelle Valeur |
|----------|----------------|-----------------|
| `VITE_API_URL` | `https://luxio.onrender.com` (ou autre) | `https://api.luxiomarket.shop` |

#### 3.2 Redéployer le Frontend

1. Sauvegardez la variable
2. Allez dans **Deployments**
3. Cliquez sur **"Redeploy"** sur le dernier déploiement
4. Attendez 1-2 minutes

---

## 🧪 TESTS À EFFECTUER

Une fois que toutes les étapes sont terminées et que les redéploiements sont finis :

### Test 1: Inscription et Connexion ✅
1. Allez sur https://luxiomarket.shop
2. Créez un nouveau compte
3. Vérifiez votre email
4. Connectez-vous
5. **Résultat attendu :** Pas d'erreur "failed to fetch"

### Test 2: Dashboard Utilisateur ✅
1. Une fois connecté, allez dans le Dashboard
2. **Résultat attendu :** Vos informations s'affichent correctement

### Test 3: Modification de Profil ✅
1. Dans le Dashboard, modifiez votre nom/prénom
2. Sauvegardez
3. **Résultat attendu :** Modifications enregistrées sans erreur

### Test 4: Ajout au Panier et Paiement ✅
1. Ajoutez un produit au panier
2. Allez au checkout
3. Essayez un paiement (mode test)
4. **Résultat attendu :** Le paiement fonctionne sans "failed to fetch"

### Test 5: Suppression de Commande ✅
1. Dans le Dashboard → Mes Commandes
2. Supprimez une commande
3. **Résultat attendu :** Suppression réussie

**Si tous les tests passent :** 🎉 Félicitations ! Le problème CSRF est résolu.

---

## ❓ Dépannage

### Problème 1: "failed to fetch" persiste

**Causes possibles :**
- DNS pas encore propagé (attendez 10-30 min)
- Variables d'environnement mal configurées
- Cache du navigateur

**Solutions :**
1. Vérifiez que `https://api.luxiomarket.shop/` répond bien
2. Vérifiez les variables sur Render (FRONTEND_URL, COOKIE_DOMAIN)
3. Videz le cache du navigateur (Ctrl+Shift+Del) ou testez en navigation privée
4. Consultez les logs Render pour voir les erreurs

### Problème 2: DNS ne propage pas

**Solutions :**
- Vérifiez que vous avez bien créé un **CNAME** (pas un A record)
- Vérifiez le nom : `api` (pas `api.luxiomarket.shop`)
- Attendez jusqu'à 48h maximum (souvent 5-10 min)

### Problème 3: Emails ne partent pas

**Solutions :**
1. Vérifiez `SENDGRID_API_KEY` sur Render
2. Vérifiez `SENDGRID_FROM_EMAIL` (doit être vérifié sur SendGrid)
3. Consultez les logs Render pour voir les erreurs d'email

### Problème 4: "Invalid CSRF token"

**Solutions :**
1. Vérifiez que `COOKIE_DOMAIN=.luxiomarket.shop` (avec le point au début)
2. Vérifiez que `FRONTEND_URL=https://luxiomarket.shop` (sans www)
3. Videz les cookies du navigateur
4. Testez en navigation privée

---

## 📞 Checklist Finale

Avant de me dire que c'est fait, assurez-vous que :

- [ ] DNS configuré : `api.luxiomarket.shop` → Render
- [ ] DNS propagé : `https://api.luxiomarket.shop/` répond avec `{"status":"ok"}`
- [ ] Variables Render configurées : `FRONTEND_URL`, `COOKIE_DOMAIN`, `NODE_ENV`
- [ ] Variables Vercel configurées : `VITE_API_URL=https://api.luxiomarket.shop`
- [ ] Backend redéployé sur Render (statut "Live")
- [ ] Frontend redéployé sur Vercel
- [ ] Tests 1-5 réussis sans erreur "failed to fetch"

---

## 📊 Résumé des Changements

### Avant (Architecture Cross-Domain ❌)
```
Frontend: luxiomarket.shop (Vercel)
    ↓ CORS bloque les cookies
Backend: luxio.onrender.com (Render)
    ↓ Cookies jamais envoyés
Result: ❌ "failed to fetch" sur toutes les actions authentifiées
```

### Après (Architecture Same-Domain ✅)
```
Frontend: luxiomarket.shop (Vercel)
    ↓ Même domaine racine
Backend: api.luxiomarket.shop (Render)
    ↓ Cookies partagés via .luxiomarket.shop
Result: ✅ Tout fonctionne ! CSRF actif et sécurisé
```

---

## 🎯 Prochaines Étapes (Optionnel)

Une fois que tout fonctionne :

1. **Configurer les Secrets Manquants**
   - `SENDGRID_API_KEY` et `SENDGRID_FROM_EMAIL` pour les emails
   - `ENCRYPTION_KEY` pour sécuriser les données sensibles

2. **Optimisations Performance**
   - Convertir les images en WebP
   - Implémenter le lazy loading des composants
   - Ajouter un CDN pour les assets

3. **SEO et Marketing**
   - Ajouter Product Schema.org
   - Créer un blog de contenu
   - Améliorer les images Open Graph

---

**Date de création :** {{current_date}}  
**Version :** 1.0  
**Auteur :** Replit Agent

Bonne chance ! 🚀
