# Guide d'importation des produits dans MongoDB

## 🎯 Objectif

Ce guide explique comment synchroniser vos produits statiques (définis dans `frontend/src/lib/products.ts`) avec votre base de données MongoDB en production. Cela garantit que les mêmes produits sont affichés sur tous vos environnements (local, Vercel, Render).

## 📋 Prérequis

- Node.js installé
- Accès à votre URI MongoDB (disponible dans vos variables d'environnement Render/Vercel)
- Package `tsx` installé (déjà dans vos devDependencies)

## 🚀 Utilisation

### Option 1: Remplacement complet (Recommandé)

Cette option supprime tous les produits existants et réimporte les produits statiques. **Utilisez cette option pour une synchronisation complète.**

```bash
# En local (avec .env configuré)
MONGODB_URI="votre_uri_mongodb" npx tsx utils/seed-products.ts

# Ou si vous avez un fichier .env
npx tsx utils/seed-products.ts
```

### Option 2: Mise à jour (Upsert)

Cette option met à jour les produits existants sans les supprimer, et ajoute les nouveaux. **Utilisez cette option si vous avez des produits personnalisés en base.**

```bash
MONGODB_URI="votre_uri_mongodb" npx tsx utils/seed-products.ts upsert
```

## 📝 Étapes pour la production

### Sur Render (Backend)

1. **Obtenir votre URI MongoDB** depuis vos variables d'environnement Render:
   - Allez sur votre dashboard Render
   - Sélectionnez votre service backend
   - Copiez la valeur de `MONGODB_URI`

2. **Exécuter le script localement** (plus simple):
   ```bash
   MONGODB_URI="mongodb+srv://..." npx tsx utils/seed-products.ts
   ```

3. **OU via Render Shell** (avancé):
   - Connectez-vous au shell Render
   - Naviguez vers votre projet
   - Exécutez: `npx tsx utils/seed-products.ts`

### Vérification

Après l'importation, vérifiez que vos produits sont bien en base:

1. Visitez votre site: **luxiomarket.shop** ou **luxio.vercel.app**
2. Les produits affichés devraient maintenant correspondre à ceux de votre code statique
3. Vérifiez la console du navigateur - vous devriez voir: `✅ Loaded X products from API` au lieu du fallback

## 🔄 Synchronisation continue

### Quand réimporter les produits ?

- ✅ Après avoir modifié `frontend/src/lib/products.ts`
- ✅ Si vous ajoutez de nouveaux produits
- ✅ Si vous changez les prix, images ou descriptions
- ✅ Si les produits affichés en production ne correspondent pas au code

### Script NPM (optionnel)

Vous pouvez ajouter un script dans votre `package.json`:

```json
{
  "scripts": {
    "seed:products": "tsx utils/seed-products.ts",
    "seed:products:upsert": "tsx utils/seed-products.ts upsert"
  }
}
```

Puis exécutez:
```bash
npm run seed:products
```

## 🎨 Détails techniques

### Structure des produits en MongoDB

Chaque produit est stocké avec:
```typescript
{
  _id: string,              // ID du produit (ex: "iphone-17-pro-max")
  name: string,             // Nom du produit
  price: number,            // Prix actuel
  originalPrice: number,    // Prix original (pour calcul de réduction)
  discount: number,         // Pourcentage de réduction
  image: string,            // URL de l'image principale
  category: string,         // Catégorie (smartphones, watches, etc.)
  description: string,      // Description courte
  features: string[],       // Liste des caractéristiques
  variants: ProductVariant[], // Variantes (couleurs, capacités)
  hasVariants: boolean,     // Si le produit a des variantes
  available: boolean,       // Disponibilité
  createdAt: Date,          // Date de création
  updatedAt: Date           // Date de mise à jour
}
```

### Catégories de produits

Les catégories actuellement supportées:
- `smartphones` - Smartphones premium
- `watches` - Montres connectées
- `sneakers` - Chaussures de sport
- `home-gadgets` - Gadgets pour la maison

## ⚠️ Notes importantes

1. **Backup**: Si vous avez des données importantes en production, faites un backup avant de lancer le script en mode "replace"

2. **Images**: Assurez-vous que toutes les images référencées dans `products.ts` sont bien accessibles sur votre serveur

3. **IDs**: Les IDs des produits statiques doivent être uniques et ne pas changer

4. **Admin**: Seul le compte admin peut créer/modifier des produits via l'API (protection en place)

## 🐛 Dépannage

### Erreur "MONGODB_URI not defined"
- Vérifiez que votre variable d'environnement est bien définie
- Sur Render: vérifiez dans Settings > Environment Variables

### Erreur de connexion MongoDB
- Vérifiez que votre URI MongoDB est correcte
- Vérifiez que votre IP est autorisée (whitelist MongoDB Atlas si applicable)

### Produits non affichés après importation
- Vérifiez les logs du backend Render
- Vérifiez que `available: true` pour tous les produits
- Rafraîchissez votre cache navigateur (Ctrl+F5)

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez les logs du script
2. Vérifiez les logs du backend sur Render
3. Testez d'abord en local avant de lancer en production

---

✨ Une fois les produits importés, ils seront automatiquement affichés sur **luxiomarket.shop** et **luxio.vercel.app**!
