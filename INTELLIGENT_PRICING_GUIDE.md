# 🎯 Guide du Système de Réduction Intelligent Luxio

## Vue d'ensemble

Le système de réduction intelligent applique automatiquement des taux de réduction optimisés à tous les produits en fonction de leur catégorie et de leur gamme de prix. Cette approche stratégique permet de :

- **Maximiser les ventes** avec des réductions attractives
- **Maintenir la rentabilité** avec des taux adaptés par segment
- **Rester compétitif** face au marché
- **Simplifier la gestion** des prix avec un système automatisé

## 📊 Règles de Réduction par Catégorie

### 📱 SMARTPHONES

| Gamme de Prix | Taux de Réduction | Stratégie |
|---------------|-------------------|-----------|
| > 1000€ | **19%** | Stimuler les ventes premium |
| 500€ - 999€ | **23%** | Position compétitive milieu de gamme |
| < 500€ | **17%** | Maintenir les marges entrée de gamme |

### ⌚ MONTRES CONNECTÉES

| Gamme de Prix | Taux de Réduction | Stratégie |
|---------------|-------------------|-----------|
| > 500€ | **28%** | Forte réduction pour concurrencer le luxe traditionnel |
| 200€ - 499€ | **24%** | Réduction attractive segment standard |
| < 200€ | **18%** | Réduction modérée pour les basiques |

### 👟 SNEAKERS

| Gamme de Prix | Taux de Réduction | Stratégie |
|---------------|-------------------|-----------|
| > 200€ | **30%** | Forte réduction pour rotation rapide des éditions limitées |
| 100€ - 199€ | **25%** | Réduction attractive milieu de gamme |
| < 100€ | **20%** | Réduction standard pour les basiques |

### 🏠 GADGETS MAISON

| Gamme de Prix | Taux de Réduction | Stratégie |
|---------------|-------------------|-----------|
| > 300€ | **28%** | Forte réduction pour dégager les stocks premium |
| 100€ - 299€ | **24%** | Réduction compétitive segment standard |
| < 100€ | **18%** | Réduction modérée pour les petits gadgets |

### 🛴 MOBILITÉ ÉLECTRIQUE

| Gamme de Prix | Taux de Réduction | Stratégie |
|---------------|-------------------|-----------|
| > 1000€ | **24%** | Réduction importante pour les vélos électriques |
| 500€ - 999€ | **28%** | Forte réduction pour les trottinettes |
| < 500€ | **22%** | Réduction modérée entrée de gamme |

## 🚀 Utilisation

### Afficher les règles de réduction

```bash
npm run pricing:rules
```

Cette commande affiche toutes les règles de réduction configurées par catégorie et gamme de prix.

### Appliquer les réductions intelligentes

```bash
npm run pricing:apply
```

Cette commande :
1. Charge tous les produits actuels
2. Calcule les nouveaux prix selon les règles intelligentes
3. Met à jour les prix et taux de réduction
4. Affiche un résumé détaillé des changements

**Note :** Cette commande met à jour les fichiers statiques mais ne synchronise pas automatiquement avec la base de données MongoDB.

### Synchroniser avec MongoDB (optionnel)

Si vous utilisez MongoDB pour stocker les produits :

```bash
npm run seed:products:upsert
```

Cette commande synchronise les produits mis à jour avec la base de données MongoDB.

## 📈 Résultats Actuels

Après application du système de réduction intelligent sur 101 produits :

- ✅ **98 produits mis à jour**
- 💰 **Réduction moyenne : 22%**
- 💵 **Économies totales disponibles : 18 942€**
- 📉 **Prix moyen avant : 761€**
- 📉 **Prix moyen après : 688€**

## 🔧 Configuration Technique

### Fichiers Principaux

1. **`utils/intelligent-pricing.ts`**
   - Définit les règles de réduction par catégorie et gamme de prix
   - Fournit les fonctions de calcul de prix
   - Exporte les utilitaires de tarification

2. **`utils/apply-intelligent-discounts.ts`**
   - Script d'application des réductions
   - Génère les rapports de changement
   - Met à jour les fichiers de produits

### Fonctions Clés

```typescript
// Calculer le taux de réduction intelligent
calculateIntelligentDiscount(category: string, originalPrice: number): number

// Appliquer une réduction à un prix
applyDiscount(originalPrice: number, discountRate: number): number

// Calculer le prix final avec toutes les informations
calculateIntelligentPrice(category: string, originalPrice: number): {
  originalPrice: number;
  finalPrice: number;
  discountRate: number;
  savings: number;
  savingsPercent: number;
}
```

## 💡 Personnalisation

### Modifier les taux de réduction

Éditez le fichier `utils/intelligent-pricing.ts` et modifiez l'array `discountRules` :

```typescript
export const discountRules: DiscountRule[] = [
  {
    category: 'smartphones',
    minPrice: 1000,
    maxPrice: Infinity,
    discountRate: 19,  // ← Modifier ce taux
    description: 'Smartphones premium - Réduction importante pour stimuler les ventes'
  },
  // ... autres règles
];
```

### Ajouter une nouvelle catégorie

Ajoutez une nouvelle règle dans `discountRules` :

```typescript
{
  category: 'nouvelle-categorie',
  minPrice: 0,
  maxPrice: Infinity,
  discountRate: 25,
  description: 'Description de votre catégorie'
}
```

## 📊 Logique de Tarification

Le système utilise une stratégie de tarification intelligente :

1. **Analyse du produit** : Examine la catégorie et le prix original
2. **Sélection de la règle** : Trouve la règle correspondante selon les critères
3. **Calcul du prix** : Applique le taux de réduction optimal
4. **Arrondi** : Arrondit le prix final à l'euro près pour une meilleure présentation

### Règle par défaut

Si aucune règle spécifique n'est trouvée pour un produit :
- Prix ≥ 500€ : **20% de réduction**
- Prix < 500€ : **15% de réduction**

## 🎯 Meilleures Pratiques

1. **Analyser régulièrement** : Vérifiez les performances des ventes par catégorie
2. **Ajuster les taux** : Modifiez les pourcentages selon les résultats
3. **Tester avant déploiement** : Utilisez `pricing:apply` pour voir les changements
4. **Documenter les modifications** : Notez les raisons des ajustements de taux
5. **Surveiller la rentabilité** : Assurez-vous que les réductions maintiennent les marges

## 🔍 Exemple d'Application

### Avant
```typescript
{
  name: "iPhone 17 Pro Max",
  price: 1198,
  originalPrice: 1479,
  discount: 19,
  category: "smartphones"
}
```

### Analyse Intelligente
- Catégorie : `smartphones`
- Prix original : `1479€`
- Gamme : `> 1000€`
- Règle appliquée : `19% de réduction`

### Après
```typescript
{
  name: "iPhone 17 Pro Max",
  price: 1198,      // 1479 × (1 - 0.19) = 1198€
  originalPrice: 1479,
  discount: 19,
  category: "smartphones"
}
```

### Économie Client
- Prix original : `1479€`
- Prix final : `1198€`
- **Économie : 281€** ✨

## 🔄 Maintenance

### Mise à jour périodique

Il est recommandé de réappliquer les réductions intelligentes :
- **Mensuellement** : Pour ajuster selon les tendances du marché
- **Avant les soldes** : Pour préparer les promotions saisonnières
- **Après ajout de produits** : Pour garantir la cohérence tarifaire

### Script de maintenance

```bash
# 1. Vérifier les règles actuelles
npm run pricing:rules

# 2. Appliquer les nouvelles réductions
npm run pricing:apply

# 3. Synchroniser avec MongoDB
npm run seed:products:upsert
```

## 📞 Support

Pour toute question ou suggestion d'amélioration du système de réduction intelligent, consultez la documentation technique dans les fichiers source.

---

**Dernière mise à jour :** Novembre 2025  
**Version du système :** 1.0.0
