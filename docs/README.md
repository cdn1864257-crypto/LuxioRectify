# Luxio Market - Documentation

Welcome to the Luxio Market documentation. This guide will help you set up, deploy, and maintain the application.

## 📚 Documentation Index

### Getting Started
- **[Setup Guide](./SETUP.md)** - Installation and local development setup
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to Vercel and Render
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions

### Reference
- **[API Documentation](./API.md)** - Complete API endpoints reference

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd luxio-market

# Install dependencies
npm install

# Configure environment
cp .env.example .env.development
# Edit .env.development with your settings

# Start development server
npm run dev
```

Visit http://localhost:5000 to see the application.

## 🏗️ Project Structure

```
luxio-market/
├── frontend/           # React + Vite frontend
│   ├── public/        # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   └── lib/         # Utilities
│   └── index.html
├── server/            # Express backend
│   ├── index-render.ts # Production server
│   └── index.ts       # Development server
├── api/               # API route handlers
│   ├── auth/         # Authentication endpoints
│   ├── products/     # Product endpoints
│   └── payment/      # Payment endpoints
├── docs/             # Documentation
└── scripts/          # Utility scripts
```

## 🔑 Key Features

- **Multi-language Support**: French, English, Spanish, Portuguese, Italian, Hungarian, Polish
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Payment Integration**: Stripe and crypto payment support
- **SEO Optimized**: Meta tags, OpenGraph, sitemap, robots.txt
- **GDPR Compliant**: Cookie consent with granular controls
- **Responsive Design**: Mobile-first, works on all devices
- **Real-time Updates**: Hot reload during development

## 🛠️ Development Workflow

### Local Development

```bash
# Start development server (frontend + backend)
npm run dev

# Run tests
npm test

# Check TypeScript
npm run check

# Analyze SEO
npm run analyze:seo
```

### Building for Production

```bash
# Build frontend
npm run build

# This automatically runs SEO analysis
# Fix any issues before deploying
```

### Deployment

1. **Frontend** → Vercel (automatic on git push)
2. **Backend** → Render (automatic on git push)

See [Deployment Guide](./DEPLOYMENT.md) for details.

## 📊 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build frontend for production |
| `npm run postbuild` | Run SEO analysis after build |
| `npm run analyze:seo` | Manually run SEO analysis |
| `npm start` | Serve production frontend |
| `npm run start:backend` | Start production backend |
| `npm run seed:products` | Seed database with products |

## 🌐 Environments

### Development
- Frontend: http://localhost:5000
- Backend: http://localhost:3001
- Database: MongoDB (local or Atlas)

### Production
- Frontend: https://luxiomarket.shop
- Backend: https://api.luxiomarket.shop
- Database: MongoDB Atlas

## 🔒 Security Features

- HTTPS enforced on all connections
- CSRF protection on state-changing endpoints
- Rate limiting on authentication endpoints
- HTTP-only cookies for session management
- Password hashing with bcrypt
- JWT token authentication
- XSS protection headers
- CORS configured for specific origins

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 💬 Support

- Documentation: Check this docs folder
- Issues: Open a GitHub issue
- Email: support@luxiomarket.shop

## 📈 Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Blocking Time: < 300ms

## 🔄 Updates

This project is actively maintained. Check the CHANGELOG for recent updates.

Last updated: November 2025
