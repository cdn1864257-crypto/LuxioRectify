# Luxio Market - Setup Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v20 or higher)
- **npm** (v9 or higher)
- **MongoDB** (for production) or MongoDB Atlas account
- **Git** for version control

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd luxio-market
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create environment files for both development and production:

#### Development (.env.development)

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_encryption_key_32_characters_min

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@luxiomarket.shop

# Session
SESSION_SECRET=your_session_secret

# URLs
FRONTEND_URL=http://localhost:5000
BACKEND_URL=http://localhost:3001

# Node Environment
NODE_ENV=development
```

#### Production (.env.production)

```env
# Database
MONGODB_URI=your_production_mongodb_uri

# Authentication
JWT_SECRET=your_production_jwt_secret
ENCRYPTION_KEY=your_production_encryption_key

# Email
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@luxiomarket.shop

# Session
SESSION_SECRET=your_production_session_secret

# URLs
FRONTEND_URL=https://luxiomarket.shop
BACKEND_URL=https://api.luxiomarket.shop

# Node Environment
NODE_ENV=production
```

## Database Setup

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP address (or use 0.0.0.0/0 for development)
4. Copy the connection string and add it to your `.env` file

### Seeding Products (Optional)

To populate your database with sample products:

```bash
npm run seed:products
```

To upsert (update or insert) products:

```bash
npm run seed:products:upsert
```

## Running the Application

### Development Mode

The development server runs both frontend and backend concurrently:

```bash
npm run dev
```

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:3001

### Production Build

Build the frontend for production:

```bash
npm run build
```

This will:
1. Build the frontend (Vite)
2. Run SEO analysis (automatically via postbuild script)

### Production Server

Start the production frontend server:

```bash
npm start
```

Start the production backend server:

```bash
npm run start:backend
```

## Verification

After setup, verify everything is working:

1. **Frontend**: Open http://localhost:5000 in your browser
2. **Backend Health**: Check http://localhost:3001/api/health
3. **Database Connection**: Try signing up or logging in

## Troubleshooting

### Port Already in Use

If ports 5000 or 3001 are already in use:

```bash
# Find and kill the process using port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill the process using port 3001
lsof -ti:3001 | xargs kill -9
```

### MongoDB Connection Issues

- Verify your connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

### Missing Environment Variables

If you see warnings about missing environment variables:
- Check that your `.env` file exists
- Verify all required variables are set
- Restart the development server

## Next Steps

- [Deployment Guide](./DEPLOYMENT.md) - Deploy to Vercel and Render
- [API Documentation](./API.md) - API endpoints reference
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues and solutions
