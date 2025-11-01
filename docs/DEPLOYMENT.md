# Luxio Market - Deployment Guide

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Domain Configuration](#domain-configuration)
- [Post-Deployment Checklist](#post-deployment-checklist)

## Architecture Overview

Luxio Market uses a split deployment architecture:

- **Frontend**: Deployed on Vercel (https://luxiomarket.shop)
- **Backend**: Deployed on Render (https://api.luxiomarket.shop)
- **Database**: MongoDB Atlas (managed database)

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- Project repository on GitHub/GitLab/Bitbucket

### Deployment Steps

1. **Import Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository

2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: cd frontend && npm run build
   Output Directory: frontend/dist
   Install Command: npm install
   ```

3. **Environment Variables**
   
   Add these environment variables in Vercel dashboard:
   ```
   VITE_API_URL=https://api.luxiomarket.shop
   VITE_FRONTEND_URL=https://luxiomarket.shop
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend

### Custom Domain Setup (Vercel)

1. Go to Project Settings → Domains
2. Add your custom domain: `luxiomarket.shop`
3. Configure DNS records as instructed by Vercel
4. Wait for DNS propagation (usually 5-30 minutes)

## Backend Deployment (Render)

### Prerequisites
- Render account
- Project repository on GitHub/GitLab

### Deployment Steps

1. **Create New Web Service**
   - Go to [Render Dashboard](https://render.com/dashboard)
   - Click "New" → "Web Service"
   - Connect your Git repository

2. **Configure Service**
   ```
   Name: luxio-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npm run build:backend
   Start Command: npm run start:backend
   ```

3. **Environment Variables**
   
   Add these in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ENCRYPTION_KEY=<your_encryption_key>
   SESSION_SECRET=<your_session_secret>
   SENDGRID_API_KEY=<your_sendgrid_key>
   SENDGRID_FROM_EMAIL=noreply@luxiomarket.shop
   FRONTEND_URL=https://luxiomarket.shop
   BACKEND_URL=https://api.luxiomarket.shop
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your backend

### Custom Domain Setup (Render)

1. Go to Service Settings → Custom Domains
2. Add your custom domain: `api.luxiomarket.shop`
3. Configure DNS records:
   ```
   Type: CNAME
   Name: api
   Value: <your-render-app>.onrender.com
   ```

## Domain Configuration

### DNS Records

Configure these DNS records with your domain registrar:

#### For Frontend (luxiomarket.shop)
```
Type: A
Name: @
Value: <Vercel IP - provided in dashboard>

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### For Backend (api.luxiomarket.shop)
```
Type: CNAME
Name: api
Value: <your-service>.onrender.com
```

### SSL Certificates

Both Vercel and Render automatically provision and manage SSL certificates for your domains. No manual configuration needed.

## Post-Deployment Checklist

### 1. Verify Deployments

- [ ] Frontend is accessible at https://luxiomarket.shop
- [ ] Backend health check at https://api.luxiomarket.shop/api/health
- [ ] No console errors in browser
- [ ] CORS is properly configured

### 2. Test Core Functionality

- [ ] User registration works
- [ ] User login works
- [ ] Products are loading
- [ ] Cart functionality works
- [ ] Payment flow is functional
- [ ] Email verification emails are sent

### 3. SEO Verification

- [ ] robots.txt is accessible: https://luxiomarket.shop/robots.txt
- [ ] sitemap.xml is accessible: https://luxiomarket.shop/sitemap.xml
- [ ] Meta tags are rendering correctly
- [ ] OpenGraph images are working
- [ ] Google Search Console is configured

### 4. Performance Check

- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Check Core Web Vitals
- [ ] Verify image optimization
- [ ] Test on mobile devices

### 5. Security Verification

- [ ] HTTPS is enforced on all pages
- [ ] CSRF protection is working
- [ ] Rate limiting is active on auth endpoints
- [ ] Sensitive data is encrypted
- [ ] Environment variables are not exposed

## Continuous Deployment

Both Vercel and Render support automatic deployments:

- **Vercel**: Automatically deploys on every push to main branch
- **Render**: Automatically deploys on every push to main branch

To disable auto-deployment, adjust settings in respective dashboards.

## Rollback Procedure

### Vercel Rollback
1. Go to Deployments tab
2. Find the previous working deployment
3. Click "Promote to Production"

### Render Rollback
1. Go to Service → Events
2. Find the previous successful deploy
3. Click "Redeploy"

## Monitoring

### Vercel Analytics
- Enable Vercel Analytics in project settings for visitor metrics

### Render Metrics
- View service metrics in Render dashboard
- Set up alerts for service downtime

### External Monitoring
Consider setting up:
- [UptimeRobot](https://uptimerobot.com) - Free uptime monitoring
- [Google Analytics](https://analytics.google.com) - Website analytics
- [Sentry](https://sentry.io) - Error tracking

## Troubleshooting

### Frontend not loading
- Check Vercel build logs
- Verify environment variables are set
- Check DNS propagation

### Backend not responding
- Check Render service logs
- Verify MongoDB connection string
- Check environment variables
- Verify CORS settings

### CORS Errors
Ensure backend has proper CORS configuration:
```javascript
origin: 'https://luxiomarket.shop'
credentials: true
```

## Support

For deployment issues:
- Vercel: https://vercel.com/support
- Render: https://render.com/docs/support
- MongoDB Atlas: https://www.mongodb.com/support
