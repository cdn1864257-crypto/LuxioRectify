# Déploiement Vercel - Guide de Migration

## Structure du Projet pour Vercel

Votre projet a été restructuré pour être compatible avec Vercel :

```
project-root/
├── frontend/          # Application React + Vite
│   ├── src/          # Code source React
│   ├── package.json  # Dépendances frontend
│   └── vite.config.ts
├── api/              # Fonctions serverless
│   ├── users.ts      # API utilisateurs
│   └── health.ts     # Check de santé
├── dist/             # Build de production (généré)
├── vercel.json       # Configuration Vercel
└── package-final.json # Package.json pour Vercel
```

## Étapes de Déploiement

### 1. Préparation du Projet

```bash
# Remplacer le package.json actuel par la version Vercel
mv package.json package-replit.json
mv package-final.json package.json

# Installer les dépendances frontend
cd frontend && npm install
```

### 2. Configuration Vercel

Le fichier `vercel.json` est déjà configuré avec :
- Redirection des routes `/api/*` vers les fonctions serverless
- Redirection SPA pour toutes les autres routes vers `index.html`

### 3. Variables d'Environnement

Ajoutez vos variables d'environnement dans le dashboard Vercel :
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_MAXELPAY_MERCHANT_ID`

### 4. Déploiement

1. **Via CLI Vercel :**
```bash
npm i -g vercel
vercel
```

2. **Via GitHub :**
- Connectez votre repo GitHub à Vercel
- Le déploiement se fera automatiquement

### 5. Build Commands pour Vercel

- **Build Command :** `npm run build`
- **Output Directory :** `dist`
- **Install Command :** `npm run install-deps`

## API Serverless

Les routes Express ont été converties en fonctions serverless :

- `GET /api/health` - Check de santé de l'API
- `GET/POST /api/users` - Gestion des utilisateurs

### Ajouter de Nouvelles Routes API

1. Créez un nouveau fichier `.ts` dans `/api/`
2. Exportez une fonction `handler` avec le format Vercel :

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello World' });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

## Scripts Disponibles

- `npm run dev` - Développement local (frontend)
- `npm run build` - Build pour production
- `npm run preview` - Prévisualiser le build
- `npm run install-all` - Installer toutes les dépendances

## Notes Importantes

- Le frontend utilise Vite et reste inchangé
- Les fonctions API sont maintenant serverless
- La persistance localStorage est conservée côté client
- Firebase Auth reste côté client
- MaxelPay integration reste côté client

## Test Local

Pour tester localement avant déploiement :

```bash
# Terminal 1 - API locale (optionnel)
cd api && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Le projet est maintenant prêt pour un déploiement immédiat sur Vercel !