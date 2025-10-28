# Fix CSRF_INVALID - Réinitialisation du Mot de Passe

## Problème Identifié

L'erreur "CSRF_INVALID" apparaissait lors de la réinitialisation du mot de passe car :

1. **Contexte de l'utilisateur** : L'utilisateur arrive sur la page de réinitialisation via un lien dans son email
2. **Pas de session active** : Aucune session n'existe pour cet utilisateur au moment où il clique sur le lien
3. **Pas de token CSRF** : Sans session active, le navigateur ne peut pas obtenir de token CSRF
4. **Protection CSRF active** : La route `/api/auth/reset-password` était protégée par le middleware CSRF

## Cause Racine

Le endpoint `/api/auth/reset-password` n'était PAS dans la liste des routes exemptées de la protection CSRF dans `server/index-render.ts`.

## Solution Implémentée

### Modification dans `server/index-render.ts`

Ajout de `/api/auth/reset-password` à la liste des routes exemptées :

```typescript
const exemptRoutes = [
  /^\/api\/csrf-token/,
  /^\/api\/auth\/signup/,
  /^\/api\/auth\/verify-email/,
  /^\/api\/auth\/login/,
  /^\/api\/auth\/logout/,
  /^\/api\/auth\/forgot-password/,
  /^\/api\/auth\/reset-password/,  // ✅ AJOUTÉ
  /^\/api\/payment\/nowpayments-webhook/,
  /^\/api\/payment\/nowpayments-return/,
];
```

## Pourquoi cette exemption est sécurisée

La route `/api/auth/reset-password` peut être exemptée de la protection CSRF car :

1. **Token de réinitialisation unique** : Chaque demande de réinitialisation génère un token cryptographique unique
2. **Expiration temporelle** : Le token expire après 1 heure (configurable)
3. **Usage unique** : Le token est supprimé de la base de données après utilisation
4. **Pas d'accès aux ressources** : Cette route ne donne accès à aucune ressource utilisateur, elle ne fait que réinitialiser le mot de passe
5. **Validation stricte** : Le token est validé côté serveur avant toute action

## Flux de Sécurité

1. Utilisateur demande une réinitialisation → `/api/auth/forgot-password`
2. Système génère un token sécurisé et l'envoie par email
3. Utilisateur clique sur le lien avec le token
4. Utilisateur soumet le nouveau mot de passe → `/api/auth/reset-password` (exempt CSRF)
5. Système vérifie le token avant de mettre à jour le mot de passe
6. Token supprimé après utilisation

## Routes Exemptées de CSRF (avec raisons)

| Route | Raison |
|-------|--------|
| `/api/csrf-token` | Endpoint de génération du token |
| `/api/auth/signup` | Création de compte (pas de session) |
| `/api/auth/verify-email` | Vérification via lien email |
| `/api/auth/login` | Authentification (pas encore de session) |
| `/api/auth/logout` | Déconnexion (détruit la session) |
| `/api/auth/forgot-password` | Demande de réinitialisation (pas de session) |
| `/api/auth/reset-password` | Réinitialisation via lien email |
| `/api/payment/nowpayments-webhook` | Webhook externe (validé par HMAC) |
| `/api/payment/nowpayments-return` | Retour après paiement |

## Test de Validation

Pour tester le fix :

1. Demander une réinitialisation de mot de passe
2. Ouvrir l'email et cliquer sur le lien
3. Entrer un nouveau mot de passe
4. Vérifier que la réinitialisation fonctionne sans erreur CSRF_INVALID

## Date du Fix

28 octobre 2025

## Statut

✅ **RÉSOLU** - Le problème CSRF sur la réinitialisation du mot de passe est définitivement corrigé.
