# 🎨 Guide Administrateur - Gestion des Produits

Bienvenue dans votre espace administrateur pour gérer les produits de Luxio Market! Ce guide vous montre comment ajouter, modifier et supprimer facilement des produits directement depuis votre site web.

---

## 🚀 Accès à l'espace admin

### Pour vous connecter:

1. **Connectez-vous** avec votre compte admin: `replitprojet97@gmail.com`
2. Une fois connecté, vous verrez apparaître un lien **"Admin"** ou **"Admin - Produits"** dans le menu:
   - 📱 **Sur mobile/tablette**: Ouvrez le menu hamburger (☰), le lien apparaît en surbrillance ambrée
   - 💻 **Sur desktop**: Le lien "Admin" avec l'icône 📦 est visible dans la barre de navigation principale

3. **Cliquez sur le lien Admin** ou allez directement sur: `/admin/products`

---

## ✨ Fonctionnalités disponibles

### 📦 Vue d'ensemble des produits

Sur la page admin, vous voyez:
- **Liste de tous vos produits** avec leurs images, prix et catégories
- **Nombre total de produits** dans votre catalogue
- **Bouton "Ajouter un produit"** en haut à droite

### ➕ Ajouter un nouveau produit

1. Cliquez sur le bouton **"Ajouter un produit"**
2. Un formulaire s'ouvre avec les champs suivants:

#### Champs obligatoires (*)
- **Nom du produit*** : Ex: "iPhone 17 Pro Max"
- **Prix (€)*** : Ex: 1299.99
- **Image*** : Vous avez 2 options:
  - **URL** : Collez l'URL d'une image (ex: `/attached_assets/phone.jpg` ou `https://...`)
  - **Upload** : Téléchargez une image depuis votre ordinateur (max 5 Mo)
- **Catégorie*** : Choisissez parmi:
  - Smartphones
  - Montres connectées
  - Sneakers
  - Gadgets maison
  - Laptops
  - Tablets
  - Audio

#### Champs optionnels
- **Description** : Description détaillée du produit
- **Prix original (€)** : Pour afficher une promotion (ex: 1599.99)
  - Le pourcentage de réduction sera calculé automatiquement
- **Caractéristiques** : Une caractéristique par ligne, par exemple:
  ```
  Apple A19 Pro chip
  6.9" LTPO OLED 120Hz
  48MP triple camera
  Free shipping
  ```

3. Cliquez sur **"Ajouter"** pour créer le produit
4. Le produit apparaît immédiatement dans votre liste et sur le site!

---

### ✏️ Modifier un produit

1. Sur la carte d'un produit, cliquez sur le bouton **"Modifier"** (icône crayon)
2. Un formulaire pré-rempli s'ouvre avec toutes les informations actuelles
3. Modifiez les champs que vous souhaitez changer
4. Cliquez sur **"Mettre à jour"**
5. Les modifications sont instantanées!

---

### 🗑️ Supprimer un produit

1. Sur la carte d'un produit, cliquez sur le bouton **rouge avec l'icône poubelle**
2. Une confirmation s'affiche pour éviter les suppressions accidentelles
3. Confirmez la suppression
4. Le produit est immédiatement retiré de votre catalogue

---

## 🖼️ Gestion des images

### Option 1: Upload d'images (Recommandé)

**Avantages**: Images hébergées automatiquement sur Cloudinary, pas de souci de liens cassés

**Configuration requise**: Variables d'environnement Cloudinary:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

**Comment uploader**:
1. Dans le formulaire produit, onglet **"Upload"**
2. Cliquez sur **"Choisir une image"**
3. Sélectionnez votre image (JPG, PNG, WebP - max 5 Mo)
4. L'upload se fait automatiquement
5. L'URL de l'image est générée et insérée automatiquement

### Option 2: URL d'image

**Avantages**: Rapide si vous avez déjà une URL d'image

**Comment utiliser**:
1. Dans le formulaire produit, onglet **"URL"**
2. Collez l'URL complète de l'image
3. Une prévisualisation s'affiche automatiquement

**Sources d'URL possibles**:
- Images dans `/attached_assets/` : `/attached_assets/nom-image.jpg`
- Images hébergées ailleurs : `https://example.com/image.jpg`
- Images Cloudinary existantes

---

## 💡 Conseils et bonnes pratiques

### ✅ Pour de bons résultats

1. **Images de qualité**:
   - Utilisez des images haute résolution (au moins 800x800px)
   - Format carré recommandé pour un affichage homogène
   - Formats acceptés: JPG, PNG, WebP

2. **Prix cohérents**:
   - Si vous ajoutez un "Prix original", assurez-vous qu'il est supérieur au prix actuel
   - La réduction sera calculée automatiquement

3. **Descriptions claires**:
   - Ajoutez des descriptions détaillées pour améliorer le référencement
   - Utilisez des caractéristiques pour mettre en avant les points forts

4. **Catégorisation**:
   - Choisissez la bonne catégorie pour faciliter la navigation
   - Les produits sont automatiquement affichés dans les bonnes sections

### ⚠️ À éviter

- ❌ Laisser des champs obligatoires vides
- ❌ Utiliser des images trop lourdes (>5 Mo)
- ❌ Copier des URLs d'images avec des restrictions de droits
- ❌ Mettre un prix original inférieur au prix actuel

---

## 🔄 Synchronisation avec MongoDB

Vos produits sont automatiquement:
- ✅ **Sauvegardés en temps réel** dans MongoDB
- ✅ **Disponibles immédiatement** sur tous vos environnements (local, Vercel, Render)
- ✅ **Synchronisés** entre le frontend et le backend

**Note**: Les produits ajoutés via l'admin écrasent les produits statiques du code. C'est normal et voulu!

---

## 📊 Statistiques et aperçu

En haut de votre page admin, vous verrez:
- Nombre total de produits
- Catégories disponibles
- État de vos produits (disponible/indisponible)

---

## 🛠️ Dépannage

### L'upload d'images ne fonctionne pas
**Solution**: Vérifiez que les variables Cloudinary sont bien configurées dans vos secrets Render/Vercel

### Les produits ne s'affichent pas sur le site
**Solution**: 
1. Vérifiez que MongoDB est bien connecté
2. Rafraîchissez la page (Ctrl+F5)
3. Vérifiez que le produit est marqué comme "disponible"

### Je ne vois pas le lien "Admin"
**Solution**: Assurez-vous d'être connecté avec l'email `replitprojet97@gmail.com`

### Erreur lors de l'ajout d'un produit
**Solution**: 
1. Vérifiez que tous les champs obligatoires (*) sont remplis
2. Vérifiez le format du prix (utilisez des points, pas des virgules: 1299.99)
3. Vérifiez que l'image est valide (URL accessible ou upload réussi)

---

## 🎯 Workflow recommandé

1. **Avant de lancer le script seed-products**:
   - Ajoutez vos produits via l'admin
   - Testez-les sur le site
   - Une fois satisfait, vous pouvez les exporter si besoin

2. **Mise à jour régulière**:
   - Ajoutez de nouveaux produits au fur et à mesure
   - Mettez à jour les prix saisonniers
   - Désactivez les produits en rupture au lieu de les supprimer

3. **Gestion des promotions**:
   - Modifiez le prix original pour créer des promotions
   - La réduction s'affiche automatiquement en badge

---

## 🔐 Sécurité

- ✅ Seul l'email `replitprojet97@gmail.com` a accès à l'admin
- ✅ Toutes les requêtes sont protégées par CSRF
- ✅ Upload d'images sécurisé avec validation côté serveur
- ✅ Authentification JWT pour toutes les opérations

---

## 📱 Compatibilité

L'interface admin est **responsive** et fonctionne sur:
- 📱 Mobile (iOS, Android)
- 💻 Desktop (Windows, macOS, Linux)
- 🖥️ Tablettes

---

## ✨ Vous êtes prêt!

Votre espace admin est maintenant configuré et prêt à l'emploi. Ajoutez vos premiers produits et voyez-les apparaître instantanément sur **luxiomarket.shop** et **luxio.vercel.app**!

**Bon travail! 🎉**

---

*Dernière mise à jour: Octobre 2025*
