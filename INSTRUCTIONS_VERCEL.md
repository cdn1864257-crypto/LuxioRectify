# Instructions pour configurer Vercel 🚀

## Problème résolu
Le frontend Vercel ne pouvait pas communiquer avec le backend Render, causant l'erreur **"Unexpected end of JSON input"**.

## ✅ Modifications apportées au code

### 1. Configuration API créée
- **`frontend/src/lib/config.ts`** - Gère l'URL du backend
- **`frontend/src/lib/queryClient.ts`** - Modifié pour utiliser l'URL dynamique

### 2. Bug des images du panier corrigé
Les images des variantes (couleurs différentes) s'affichent maintenant correctement dans le panier.

## 📋 ÉTAPES À SUIVRE SUR VERCEL

### Étape 1 : Ajouter la variable d'environnement

1. Aller sur [vercel.com](https://vercel.com)
2. Sélectionner votre projet **luxio-rectify**
3. Aller dans **Settings** → **Environment Variables**
4. Ajouter cette variable :

```
Nom: VITE_API_URL
Valeur: https://luxio.onrender.com
Environnements: ✅ Production ✅ Preview ✅ Development
```

### Étape 2 : Redéployer le frontend

Deux options :

**Option A - Déploiement automatique (recommandé) :**
```bash
git add .
git commit -m "Fix API connection and cart images"
git push
```

**Option B - Déploiement manuel :**
1. Aller dans **Deployments**
2. Cliquer sur les **3 points** du dernier déploiement
3. Sélectionner **Redeploy**

### Étape 3 : Vérifier que ça fonctionne

1. Attendre la fin du déploiement (1-2 min)
2. Ouvrir votre site Vercel
3. Essayer de se connecter avec :
   - Email : `mamanpromesse8@gmail.com`
   - Mot de passe : votre mot de passe

✅ La connexion devrait maintenant fonctionner !

## 🔧 Configuration backend Render (déjà fait)

Sur Render, assurez-vous que ces variables sont configurées :

```env
NODE_ENV=production
FRONTEND_URL=https://luxio-rectify-95asq4svv-cdn1864257-cryptos-projects.vercel.app
MONGODB_URI=votre_mongodb_uri
JWT_SECRET=votre_jwt_secret
# ... autres variables
```

⚠️ **Important** : La variable `FRONTEND_URL` sur Render doit correspondre EXACTEMENT à l'URL de votre frontend Vercel.

## 🧪 Test de connexion

Une fois redéployé, testez dans la console du navigateur :

```javascript
// Ouvrir DevTools (F12) → Console
fetch(import.meta.env.VITE_API_URL + '/api/health', {
  credentials: 'include'
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Devrait afficher : {status: "ok", message: "API is healthy"}
```

## 📝 Récapitulatif

**Problème 1 - Connexion :** ✅ Résolu
- Frontend utilise maintenant `VITE_API_URL` pour appeler le backend

**Problème 2 - Images panier :** ✅ Résolu  
- Les variantes (couleurs) utilisent maintenant la bonne image

## ❓ Si ça ne fonctionne toujours pas

1. Vérifier que `VITE_API_URL` est bien configurée sur Vercel
2. Vérifier les logs Render pour voir si les requêtes arrivent
3. Vérifier la console du navigateur (F12) pour voir les erreurs
4. S'assurer que `FRONTEND_URL` sur Render = URL exacte Vercel

---

**Une fois configuré, tout devrait fonctionner parfaitement !** 🎉
