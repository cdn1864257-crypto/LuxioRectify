# Guide de correction - Déconnexion complète

## ✅ Problème résolu

**Problème initial** : Après déconnexion, l'utilisateur restait connecté après un rafraîchissement de page.

**Cause** : 
- La route `/api/auth/logout` ne détruisait pas la session MongoDB
- Le cookie `connect.sid` n'était pas supprimé correctement
- La session persistait dans MongoDB Atlas

---

## 🔧 Corrections effectuées

### 1. Route logout Express native (Backend)

Les fichiers `server/index-render.ts` (production) et `server/index.ts` (développement) ont été modifiés pour remplacer la route logout Vercel par une **route Express native** qui gère correctement les sessions.

#### Fonctionnalités implémentées :

✅ **Destruction de la session MongoDB** avec `req.session.destroy()`
✅ **Suppression du cookie `connect.sid`** avec `res.clearCookie()` et les bons paramètres :
  - `httpOnly: true` - Protection XSS
  - `secure: true` en production - HTTPS obligatoire
  - `sameSite: 'none'` en production - Cross-domain (Vercel ↔ Render)
  - `path: '/'` - Suppression sur tout le domaine

✅ **Suppression du cookie `auth_token`** (JWT)
✅ **Gestion des erreurs** robuste avec logs
✅ **Réponse JSON standardisée** avec `ok: true/false`

#### Code implémenté :

```typescript
app.post('/api/auth/logout', (req: any, res) => {
  try {
    // Détruire la session MongoDB
    req.session.destroy((err: any) => {
      if (err) {
        console.error('Erreur destruction session:', err);
        return res.status(500).json({ 
          ok: false,
          error: 'Erreur lors de la déconnexion' 
        });
      }

      // Supprimer les cookies avec les bons paramètres
      const isProduction = process.env.NODE_ENV === 'production';
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
      });

      res.clearCookie('auth_token', {
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
      });

      return res.status(200).json({
        ok: true,
        message: 'Déconnexion réussie'
      });
    });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return res.status(500).json({
      ok: false,
      error: 'Erreur serveur lors de la déconnexion'
    });
  }
});
```

### 2. Frontend (déjà correct)

Le hook `useAuth` dans `frontend/src/hooks/use-auth.ts` :
✅ Appelle `/api/auth/logout` avec `credentials: 'include'`
✅ Vide `localStorage` et `sessionStorage` (panier inclus)
✅ Réinitialise l'état utilisateur à `null`

---

## 🧪 Tests à effectuer

### Test 1 : Déconnexion locale (Replit)

1. Démarrer l'application :
   ```bash
   npm run dev
   ```

2. Se connecter avec un compte test

3. Ouvrir DevTools (F12) → Onglet **Application** → **Cookies**
   - Vérifier la présence du cookie `connect.sid`

4. Cliquer sur **Déconnexion**

5. **Vérifications** :
   - ✅ Cookie `connect.sid` supprimé
   - ✅ Cookie `auth_token` supprimé (si présent)
   - ✅ localStorage vidé (panier vide)

6. **Rafraîchir la page (F5)**
   - ✅ Utilisateur toujours déconnecté
   - ✅ Redirection vers la page de connexion

### Test 2 : Déconnexion production (Vercel + Render)

1. Aller sur https://luxios.vercel.app

2. Se connecter avec un compte test

3. Ouvrir DevTools (F12) → Onglet **Network**

4. Cliquer sur **Déconnexion**

5. **Vérifier la requête `/api/auth/logout`** :
   - Méthode : `POST`
   - Status : `200 OK`
   - Réponse : `{ "ok": true, "message": "Déconnexion réussie" }`
   - Headers de réponse : `Set-Cookie` avec `connect.sid=; Max-Age=0`

6. Onglet **Application** → **Cookies** :
   - ✅ Cookie `connect.sid` supprimé
   - ✅ localStorage vidé

7. **Rafraîchir la page (F5 ou Ctrl+R)**
   - ✅ Utilisateur toujours déconnecté
   - ✅ Aucune reconnexion automatique

### Test 3 : Vérification MongoDB Atlas

1. Se connecter à MongoDB Atlas

2. Sélectionner la base de données du projet

3. Aller dans la collection `sessions`

4. Avant déconnexion :
   - Noter le `_id` de votre session active

5. **Après déconnexion** :
   - ✅ Le document de session doit être **supprimé** de la collection

---

## 🐛 Dépannage

### Problème : Le cookie n'est pas supprimé

**Cause possible** : Les paramètres de `clearCookie` ne correspondent pas exactement à ceux du cookie initial.

**Solution** : Vérifier que :
- `path: '/'` est identique
- `httpOnly: true` est identique
- `secure` et `sameSite` correspondent à l'environnement

### Problème : La session reste dans MongoDB

**Cause** : `req.session.destroy()` a échoué

**Solution** :
1. Vérifier les logs backend : `Erreur destruction session: ...`
2. Vérifier la connexion MongoDB avec `MONGODB_URI`
3. Vérifier que le store MongoDB est bien configuré

### Problème : "Failed to fetch" lors du logout

**Cause** : CORS mal configuré ou route protégée par CSRF

**Solution** :
1. Vérifier que `/api/auth/logout` est dans la liste des routes exemptées de CSRF
2. Vérifier que CORS autorise `credentials: true`

---

## 📋 Checklist de déploiement

Avant de déployer sur Render :

- [ ] Les deux serveurs (index.ts et index-render.ts) ont la nouvelle route logout
- [ ] Les variables d'environnement sont configurées sur Render :
  - `NODE_ENV=production`
  - `MONGODB_URI=mongodb+srv://...`
  - `SESSION_SECRET=...`
- [ ] Code poussé sur Git
- [ ] Déployé sur Render
- [ ] Test de déconnexion sur production (Vercel)
- [ ] Vérification MongoDB : session supprimée
- [ ] Cookies supprimés dans DevTools
- [ ] Panier vidé après déconnexion
- [ ] Pas de reconnexion après F5

---

## 🎯 Résultat attendu

✅ **Session MongoDB détruite** après logout
✅ **Cookies supprimés** du navigateur (`connect.sid` + `auth_token`)
✅ **localStorage/sessionStorage vidés** (panier inclus)
✅ **Déconnexion permanente** même après rafraîchissement
✅ **Pas de reconnexion automatique**
✅ **Logs backend propres** (pas d'erreur dans `req.session.destroy`)

---

## 🔐 Sécurité

Les corrections maintiennent la sécurité :
- ✅ Cookies `httpOnly` - Protection contre XSS
- ✅ Cookies `secure` en production - HTTPS obligatoire
- ✅ `sameSite: 'none'` en production - Cross-domain sécurisé
- ✅ Gestion des erreurs sans fuite d'informations sensibles
- ✅ Destruction complète de la session côté serveur

---

## 📝 Notes techniques

### Pourquoi une route Express native ?

L'ancienne implémentation utilisait `convertVercelHandler` qui ne passait **pas** l'objet `req.session` au handler Vercel. Résultat : impossible de détruire la session.

La nouvelle route Express native a **accès direct** à `req.session` fourni par le middleware `express-session`.

### Compatibilité cross-domain

Les paramètres `sameSite: 'none'` et `secure: true` sont **obligatoires** pour que les cookies fonctionnent entre :
- Frontend Vercel : `https://luxios.vercel.app`
- Backend Render : `https://luxio.onrender.com`

Sans ces paramètres, les navigateurs modernes (Chrome, Firefox, Safari) bloquent les cookies cross-domain.

---

## ✨ Améliorations futures (optionnel)

1. **Supprimer l'ancien handler** `api/auth/logout.ts` (plus utilisé)
2. **Ajouter un rate limiting** sur `/api/auth/logout` (protection DoS)
3. **Ajouter un audit log** des déconnexions (traçabilité)
4. **Implémenter "Déconnexion de tous les appareils"** (supprimer toutes les sessions de l'utilisateur)
