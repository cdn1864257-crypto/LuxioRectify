# Guide de développement sur Replit - LuxioMarket

## Vue d'ensemble

Ce projet LuxioMarket est une application fullstack avec:
- **Frontend**: Déployé sur Vercel (luxiomarket.shop) 
- **Backend**: Déployé sur Render (api.luxiomarket.shop)

## Configuration pour le développement local sur Replit

### Problème: Erreur "Failed to fetch" (401)

Lorsque vous développez sur Replit, vous pouvez rencontrer des erreurs 401 (Unauthorized) car le backend local n'a pas toutes les variables d'environnement nécessaires (MONGODB_URI, JWT_SECRET, etc.).

### Solution recommandée: Pointer vers le backend de production

Au lieu de configurer un backend local complet, vous pouvez pointer le frontend vers le backend de production déjà configuré sur Render.

#### Étape 1: Créer un fichier `.env`

Créez un fichier `.env` à la racine du projet avec le contenu suivant:

```bash
VITE_API_URL=https://api.luxiomarket.shop
```

#### Étape 2: Redémarrer le workflow

Après avoir créé le fichier `.env`, redémarrez le workflow "Start application" pour appliquer les changements.

### Configuration alternative: Backend local complet

Si vous souhaitez utiliser un backend local complet pour tester des modifications backend, vous devez configurer les secrets Replit suivants:

1. Ouvrir l'outil "Secrets" dans Replit
2. Ajouter les secrets suivants avec les valeurs de votre environnement Render:
   - `MONGODB_URI`: URI de connexion à MongoDB
   - `JWT_SECRET`: Clé secrète pour les tokens JWT
   - `ENCRYPTION_KEY`: Clé de chiffrement
   - `SENDGRID_API_KEY`: Clé API SendGrid
   - `SENDGRID_FROM_EMAIL`: Email d'expéditeur SendGrid

3. Modifier le fichier `.env`:
```bash
VITE_API_URL=http://localhost:3001
```

## Fonctionnalités implémentées

### Redirection automatique pour utilisateurs non connectés

Lorsqu'un utilisateur non connecté tente de passer commande:

1. **Message multilingue**: Un message s'affiche dans la langue de l'utilisateur:
   - 🇫🇷 Français: "Connexion requise - Veuillez vous connecter ou vous inscrire pour passer commande."
   - 🇬🇧 Anglais: "Login Required - Please log in or sign up to place your order."
   - 🇪🇸 Espagnol: "Inicio de sesión requerido - Por favor inicie sesión o regístrese para realizar su pedido."
   - 🇵🇹 Portugais: "Login necessário - Por favor, faça login ou cadastre-se para fazer seu pedido."
   - 🇵🇱 Polonais: "Wymagane logowanie - Zaloguj się lub zarejestruj, aby złożyć zamówienie."
   - 🇮🇹 Italien: "Accesso richiesto - Effettua il login o registrati per effettuare l'ordine."
   - 🇭🇺 Hongrois: "Bejelentkezés szükséges - Kérjük, jelentkezzen be vagy regisztráljon a rendelés leadásához."

2. **Redirection automatique**: 
   - Si l'utilisateur clique sur le bouton "Se connecter", il est redirigé immédiatement
   - Si l'utilisateur ne fait rien, il est automatiquement redirigé après **3,5 secondes**
   - Si l'utilisateur clique sur "Annuler", la redirection est annulée

## Déploiement en production

Pour déployer sur Render, assurez-vous que toutes les variables d'environnement sont correctement configurées dans le tableau de bord Render:

- `MONGODB_URI`
- `JWT_SECRET`
- `ENCRYPTION_KEY`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `NODE_ENV=production`

Le build et le démarrage sont gérés automatiquement par Replit lors du push vers le repository.

## Support

Pour toute question ou problème, consultez la documentation ou contactez l'équipe de support.
