# Luxio - Premium E-Commerce Platform

## Overview
Luxio is a static e-commerce platform built with React and TypeScript, designed for selling premium electronics (smartphones, smartwatches, sneakers, smart home gadgets, and urban mobility devices). It features a modern design, client-side architecture with Firebase authentication, and external payment processing, operating without server-side dependencies. The project aims to provide a robust e-commerce experience with a focus on modern UI/UX and comprehensive product variant management.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes (September 30, 2025)

### Fresh GitHub Import Setup Complete (September 30, 2025 22:18 UTC - Latest) ✅
Successfully configured the GitHub import to run in the Replit environment from a fresh clone:

**Dependencies Installation**
- ✅ Verified root project dependencies (already installed)
- ✅ Installed frontend dependencies in `frontend/` directory (418 packages)
- ✅ All packages from both package.json files properly installed and functional

**Development Environment Configuration**
- ✅ Verified `start-dev.js` script launches both backend (port 3001) and frontend (port 5000)
- ✅ Backend Express server running on `localhost:3001` for API endpoints
- ✅ Frontend Vite dev server running on `0.0.0.0:5000` with proper host configuration
- ✅ Vite config already includes `allowedHosts: true` for Replit proxy support (required for iframe preview)
- ✅ API proxy configured in vite.config.ts to forward `/api` requests to backend on port 3001
- ✅ Tested backend health endpoint: `/api/health` returns success response

**Workflow Configuration**
- ✅ Configured "Start application" workflow to run `node start-dev.js`
- ✅ Workflow set to wait for port 5000 with webview output type
- ✅ Both servers start successfully and remain running without errors

**Deployment Configuration**
- ✅ Configured autoscale deployment for static site hosting
- ✅ Build command: `npm run build` (builds frontend to `dist` folder)
- ✅ Start command: `npm run start` (serves static files with `serve` package on port 5000)

**Verification**
- ✅ Application loads successfully in browser with no LSP errors
- ✅ Homepage displays correctly with navigation, hero section, and product showcase
- ✅ Both development servers running without errors
- ✅ Backend API responding correctly to health checks
- ✅ Vite HMR (Hot Module Replacement) connected and functional
- ✅ Frontend successfully connected to backend via proxy

**Project Structure**
- Root `package.json` - Main build and dev scripts
- `frontend/package.json` - Frontend-specific dependencies
- `server/index.ts` - Express backend server with API routes and Vercel handler conversion
- `api/` - Vercel serverless function handlers (auth, payment endpoints)
- `frontend/` - React/Vite frontend application
- `start-dev.js` - Development startup script for concurrent server execution

### Replit Environment Setup Complete (September 30, 2025 19:40 UTC) ✅
Successfully configured the project to run in the Replit environment:

**Dependencies Installation**
- ✅ Installed root project dependencies (already present)
- ✅ Installed frontend dependencies in `frontend/` directory
- ✅ All packages from both package.json files properly installed

**Development Environment Configuration**
- ✅ Verified `start-dev.js` script launches both backend (port 3001) and frontend (port 5000)
- ✅ Backend Express server runs on `localhost:3001` for API endpoints
- ✅ Frontend Vite dev server runs on `0.0.0.0:5000` with proper host configuration
- ✅ Vite config already includes `allowedHosts: true` for Replit proxy support
- ✅ API proxy configured in vite.config.ts to forward `/api` requests to backend

**Workflow Configuration**
- ✅ Configured "Start application" workflow to run `node start-dev.js`
- ✅ Workflow set to wait for port 5000 with webview output type
- ✅ Both servers start successfully and remain running

**Deployment Configuration**
- ✅ Configured autoscale deployment for static site hosting
- ✅ Build command: `npm run build` (builds frontend to `dist` folder)
- ✅ Start command: `npm run start` (serves static files with `serve` package on port 5000)

**Verification**
- ✅ Application loads successfully in browser
- ✅ Homepage displays correctly with navigation, hero section, and product showcase
- ✅ Both development servers running without errors

**Project Structure**
- Root `package.json` - Main build and dev scripts
- `frontend/package.json` - Frontend-specific dependencies
- `server/index.ts` - Express backend server with API routes
- `api/` - Serverless function handlers (auth endpoints)
- `frontend/` - React/Vite frontend application
- `start-dev.js` - Development startup script for concurrent server execution

### Dynamic Navigation & Protected Routes (September 30, 2025 19:30 UTC) ✅
Implemented complete authentication flow with dynamic navigation and protected pages:

**AuthContext Implementation**
- ✅ Created centralized `AuthContext` (`frontend/src/contexts/AuthContext.tsx`) for global user state management
- ✅ Replaced simple `use-auth` hook with context-based solution for better state management
- ✅ Synchronized with MongoDB API endpoints (`/api/auth/login`, `/api/auth/signup`, `/api/auth/logout`, `/api/auth/me`)
- ✅ Derived user display properties: `displayName`, `initials` from MongoDB user data
- ✅ Automatic session restoration on app load via JWT cookie verification

**Protected Routes System**
- ✅ Created `ProtectedRoute` component (`frontend/src/components/ProtectedRoute.tsx`) to guard private pages
- ✅ Redirects unauthenticated users to login with preserved target URL
- ✅ Shows loading state during authentication check
- ✅ Prevents unauthorized access to Dashboard, Cart, and Payment pages

**New Protected Pages**
- ✅ **Dashboard** (`frontend/src/pages/Dashboard.tsx`): Personalized user homepage with quick actions, recent orders, account stats
- ✅ **Cart** (`frontend/src/pages/Cart.tsx`): Full shopping cart page with quantity management, item removal, checkout flow
- ✅ **Payment** (`frontend/src/pages/Payment.tsx`): Secure payment page with multiple payment methods (card, PayPal, bank transfer)

**Dynamic Navigation**
- ✅ Updated Header (`frontend/src/components/Header.tsx`) with conditional navigation based on auth status:
  - **Logged Out**: Accueil, Premium, Watches, Sneakers, Gadgets, Mobility, Login button
  - **Logged In**: Accueil, Dashboard, Panier (Cart), Déconnexion (Logout)
- ✅ Mobile and desktop navigation both support dynamic links
- ✅ Logout functionality integrated in navigation menus

**Application Structure**
- ✅ Updated `App.tsx` with `AuthProvider` wrapping all routes
- ✅ Protected routes wrapped with `ProtectedRoute` component
- ✅ Fixed all components to use `AuthContext` instead of old `use-auth` hook
- ✅ Navigation redirects implemented in `useEffect` to avoid React warnings

### Replit Environment Setup (September 30, 2025 18:30 UTC) ✅
Completed setup for Replit deployment environment:

**Dependencies Installation**
- ✅ Installed root project dependencies (`npm install`)
- ✅ Installed frontend dependencies (`cd frontend && npm install`)
- ✅ All packages from package.json properly installed

**Workflow Configuration**
- ✅ Created unified `start-dev.js` script that launches both backend and frontend
- ✅ Backend runs on port 3001 (localhost) for API endpoints
- ✅ Frontend runs on port 5000 (0.0.0.0) with Vite dev server
- ✅ Configured workflow "Start application" to run both servers simultaneously
- ✅ Frontend properly configured with `allowedHosts: true` in vite.config.ts
- ✅ Vite proxy configured to forward `/api` requests to backend on port 3001

**Deployment Configuration**
- ✅ Configured autoscale deployment for static site hosting
- ✅ Build command: `npm run build` (builds frontend to `dist` folder)
- ✅ Start command: `npm run start` (serves static files on port 5000)

**Project Structure**
- `server/index.ts` - Express backend server with Vercel handler conversion
- `api/` - Vercel serverless function handlers (auth endpoints)
- `frontend/` - React/Vite frontend application
- `start-dev.js` - Development startup script for both servers

### MongoDB Atlas Authentication Migration (September 30, 2025 18:15 UTC) ✅
Completed full migration from Firebase to MongoDB Atlas for user authentication:

**Backend Configuration**
- ✅ Created Express API server on port 3001 (localhost) for auth endpoints
- ✅ Configured MongoDB Atlas connection with MongoClient (native driver)
- ✅ Implemented JWT-based authentication with httpOnly cookies
- ✅ Created API routes: `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- ✅ Secured with environment variables: `MONGODB_URI` and `JWT_SECRET`
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens valid for 7 days

**Frontend Migration**
- ✅ Completely removed Firebase dependencies (firebase package uninstalled)
- ✅ Deleted firebase.ts configuration file
- ✅ Rewrote use-auth.ts hook to use MongoDB API routes instead of Firebase
- ✅ Configured Vite proxy to forward /api requests to backend (localhost:3001)
- ✅ Updated SignupForm and LoginForm to work with new authentication system
- ✅ User profile now displays MongoDB user data (firstName, lastName, email, etc.)

**Database Schema (MongoDB Collection: users)**
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  country: String (optional),
  city: String (optional),
  address: String (optional),
  phone: String (optional),
  email: String (unique, lowercase),
  password: String (bcrypt hashed),
  createdAt: Date,
  updatedAt: Date
}
```

**Environment Variables Required**
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT token signing (min 32 characters)

## System Architecture

### Frontend Architecture
The application uses React 18 with TypeScript, Vite for building, Wouter for routing, and TanStack React Query for server state management. Styling is handled with Tailwind CSS and shadcn/ui components, enhanced by Class Variance Authority (CVA).

### Component Structure
The UI is organized into Layout (Header, Footer, Hero), Product (ProductGrid), Cart (CartSidebar), Authentication (AuthModal), Checkout (CheckoutModal), and general UI components from shadcn/ui.

### State Management
State is managed using:
- **React Query** for server state and API data fetching
- **AuthContext** (`frontend/src/contexts/AuthContext.tsx`) for centralized user authentication state
- **CartContext** for shopping cart state management
- **LanguageContext** for internationalization
- **Local Storage** for cart persistence and order history
- **React Context API** for toast notifications

### Authentication System
MongoDB Atlas is used for user authentication with JWT-based session management. The system supports email/password registration and login, with secure password hashing using bcrypt. JWT tokens are stored in httpOnly cookies for security.

### Internationalization
The platform supports multiple languages (English, French, Polish, Spanish, Portuguese, Italian, Hungarian) with dynamic switching, IP-based detection, and localized content.

### Data Management
Product and order data are managed client-side using a static product database, organized by categories. Local storage is used for cart persistence and order history.

### Payment Processing
External payment integration is handled via MaxelPay using a redirect-based flow, with an order reference system for tracking transactions.

### UI/UX Decisions
The design focuses on a modern aesthetic, responsive behavior across devices (mobile-first approach with hamburger menus, optimized breakpoints), and improved user experience through streamlined navigation and clear calls to action. High-quality product images and detailed specifications are integrated.

### Technical Implementations
- **Header Redesign**: Improved responsive navigation with a hamburger menu for mobile/tablet, streamlined main navigation, and accessibility enhancements.
- **Translation System**: Comprehensive internationalization with full translation of UI elements and product information across 7 languages.
- **Product Data Integration**: Extensive integration of real smartphone data from GSMArena, including iPhone 17 series, Samsung Galaxy S25 series, Google Pixel, Motorola Razr, Poco F6 Pro, Oppo Find X7 Ultra, and Vivo X100 Pro, complete with variant matrices, accurate pricing, and professional images.
- **Replit Setup**: Configured for Replit with Vite dev server (port 5000, `host: '0.0.0.0'`, `allowedHosts: true`), a "Frontend" workflow, and autoscale deployment for static sites.

## External Dependencies

### Authentication Services
- **MongoDB Atlas**: For user data storage and authentication
- **JWT (jsonwebtoken)**: For secure token-based authentication
- **bcrypt**: For password hashing and verification

### Payment Processing
- **MaxelPay**: Primary payment gateway.

### Development and Build Tools
- **Vite**: Build tool and development server.
- **TypeScript**: For type-safe development.

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/ui Components**: UI component library based on Radix UI.
- **Font Awesome**: Iconography.
- **Google Fonts (Inter)**: Typography.

### Utility Libraries
- **date-fns**: Date manipulation.
- **clsx** and **tailwind-merge**: CSS class management.
- **Embla Carousel**: Product showcase.
- **Wouter**: Client-side routing.

### Backend Infrastructure (Prepared for future expansion)
- **Drizzle ORM**: With PostgreSQL schema definitions.
- **Neon Database**: For potential backend data storage.
- **Express.js**: Server structure for API endpoints.
- **Session Management**: With PostgreSQL session storage.