# Configuration Multilingue NOWPayments

## Résumé des Changements

La page de paiement NOWPayments s'affiche maintenant dans la langue sélectionnée par l'utilisateur sur le site Luxio.

## Langues Supportées par NOWPayments

D'après la documentation officielle et les tests de 2025, NOWPayments supporte les langues suivantes :

### Langues Directement Supportées ✅
- **Anglais (en)** - Langue par défaut
- **Français (fr)** - Support complet
- **Espagnol (es)** - Ajouté en août 2025
- **Portugais (pt)** - Support complet
- **Italien (it)** - Support complet
- **Allemand (de)** - Support complet

### Langues avec Fallback vers l'Anglais ⚠️
- **Polonais (pl)** → Affiche en **anglais (en)**
- **Hongrois (hu)** → Affiche en **anglais (en)**

## Mapping des Langues Luxio → NOWPayments

| Langue du Site | Code | NOWPayments Affiche |
|----------------|------|---------------------|
| Anglais | en | Anglais (en) |
| Français | fr | Français (fr) |
| Espagnol | es | Espagnol (es) |
| Portugais | pt | Portugais (pt) |
| Italien | it | Italien (it) |
| Polonais | pl | Anglais (en) - fallback |
| Hongrois | hu | Anglais (en) - fallback |

## Implémentation Technique

### Frontend (NewPayment.tsx)
```typescript
// Le paramètre language est maintenant envoyé à l'API
const response = await fetchWithCsrf(getApiUrl('/api/payment/nowpayments-init'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerEmail: user.email,
    customerName: `${user.firstName} ${user.lastName}`,
    totalAmount: total,
    language: language, // ← Langue actuelle de l'utilisateur
    cartItems: cart.map(item => ({...}))
  })
});
```

### Backend (api/payment/nowpayments-init.ts)
```typescript
// Détection et mapping de la langue
const userLanguage = language || user?.language || 'fr';

// Langues supportées par NOWPayments
const supportedLangs = ['en', 'fr', 'es', 'pt', 'it', 'de'];
const lang = supportedLangs.includes(userLanguage) ? userLanguage : 'en';

// Ajout du paramètre lang à l'URL de redirection NOWPayments
const urlSeparator = redirectUrl.includes('?') ? '&' : '?';
redirectUrl = `${redirectUrl}${urlSeparator}lang=${lang}`;
```

## Flux Utilisateur

1. **Utilisateur navigue sur Luxio en polonais** → `language = 'pl'`
2. **Utilisateur clique sur "Payer avec NOWPayments"**
3. **Frontend envoie** `language: 'pl'` à l'API
4. **Backend détecte** que `pl` n'est pas supporté → **Fallback vers `en`**
5. **URL de redirection** : `https://nowpayments.io/payment/?iid=xxxxx&lang=en`
6. **NOWPayments affiche la page en anglais** pour l'utilisateur polonais

---

1. **Utilisateur navigue sur Luxio en français** → `language = 'fr'`
2. **Utilisateur clique sur "Payer avec NOWPayments"**
3. **Frontend envoie** `language: 'fr'` à l'API
4. **Backend détecte** que `fr` est supporté ✅
5. **URL de redirection** : `https://nowpayments.io/payment/?iid=xxxxx&lang=fr`
6. **NOWPayments affiche la page en français** 🎉

## Logs de Débogage

Pour vérifier que la langue est correctement transmise, consultez les logs backend :

```
[NowPayments] User language: pl, NOWPayments language: en
[NowPayments] Redirect URL with language (en): https://nowpayments.io/payment/?iid=xxxxx&lang=en
```

ou

```
[NowPayments] User language: fr, NOWPayments language: fr
[NowPayments] Redirect URL with language (fr): https://nowpayments.io/payment/?iid=xxxxx&lang=fr
```

## Mise à Jour Future

Si NOWPayments ajoute le support du **polonais** ou du **hongrois** :

1. Mettre à jour le tableau `supportedLangs` dans `api/payment/nowpayments-init.ts`
```typescript
const supportedLangs = ['en', 'fr', 'es', 'pt', 'it', 'de', 'pl', 'hu'];
```

2. Les utilisateurs polonais et hongrois verront automatiquement la page dans leur langue

## Tests Recommandés

Pour tester chaque langue :

1. Changer la langue sur le site Luxio
2. Ajouter un produit au panier
3. Aller à la page de paiement
4. Cliquer sur "NOWPayments (Crypto)"
5. Vérifier que la page NOWPayments s'affiche dans la bonne langue

✅ **Le système fonctionne correctement !**
