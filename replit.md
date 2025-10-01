# Luxio - Premium E-Commerce Platform

## Overview
Luxio is a static e-commerce platform built with React and TypeScript, designed for selling premium electronics (smartphones, smartwatches, sneakers, smart home gadgets, and urban mobility devices). It features a modern design, client-side architecture with Firebase authentication, and external payment processing, operating without server-side dependencies. The project aims to provide a robust e-commerce experience with a focus on modern UI/UX and comprehensive product variant management, with a business vision to capture a significant market share in premium electronics e-commerce.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses React 18 with TypeScript, Vite for building, Wouter for routing, and TanStack React Query for server state management. Styling is handled with Tailwind CSS and shadcn/ui components, enhanced by Class Variance Authority (CVA).

### Component Structure
The UI is organized into Layout (Header, Footer, Hero), Product (ProductGrid), Cart (CartSidebar), Authentication (AuthModal), Checkout (CheckoutModal), and general UI components from shadcn/ui.

### State Management
State is managed using React Query for server state, AuthContext for authentication, CartContext for shopping cart, LanguageContext for internationalization, Local Storage for cart persistence and order history, and React Context API for toast notifications.

### Authentication System
MongoDB Atlas is used for user authentication with JWT-based session management. The system supports email/password registration and login, with secure password hashing using bcrypt. JWT tokens are stored in httpOnly cookies for security. Complete authentication flow includes dynamic navigation and protected pages (Dashboard, Cart, Payment).

### Internationalization
The platform supports multiple languages (English, French, Polish, Spanish, Portuguese, Italian, Hungarian) with dynamic switching, IP-based detection, and localized content.

### Data Management
Product and order data are managed client-side using a static product database, organized by categories. Local storage is used for cart persistence and order history. Extensive integration of real smartphone data from GSMArena, including variant matrices, accurate pricing, and professional images.

#### Recent Catalog Updates (September 2025)
Expanded smartphone catalog with 8 new models:
- **Premium Segment**: Nothing Phone 3 ($799), Asus ROG Phone 8 Pro ($1,299), Sony Xperia 1 VI ($1,399)
- **Mid-Range Segment**: Samsung Galaxy A55 5G ($350), Google Pixel 8a ($499), OnePlus 12R ($549), Realme GT 6 ($420), Motorola Edge 50 Pro ($377)

All models include complete variant matrices with multiple colors and storage capacities, accurate 2025 pricing with discounts, and comprehensive technical specifications.

### Payment Processing
External payment integration is handled via MaxelPay using a redirect-based flow, with an order reference system for tracking transactions.

### UI/UX Decisions
The design focuses on a modern aesthetic, responsive behavior across devices (mobile-first approach with hamburger menus, optimized breakpoints), and improved user experience through streamlined navigation and clear calls to action. High-quality product images and detailed specifications are integrated.

### Technical Implementations
The project is configured for the Replit environment with a unified `start-dev.js` script to run both backend (Express on port 3001) and frontend (Vite dev server on port 5000). Vite is configured with `host: '0.0.0.0'` and `allowedHosts: true` for Replit proxy support, and an API proxy forwards `/api` requests to the backend. Autoscale deployment is configured for static site hosting.

#### Product Image Management Strategy
**Automated workflow for product variant images** (configured October 2025):
- All product images are stored in the root `attached_assets/` folder
- The `copy-images.js` script automatically syncs images to `frontend/public/attached_assets/` at startup
- This script is integrated into `start-dev.js` and runs before servers start
- **For future product additions**: Simply place images in `attached_assets/` and reference them in `frontend/src/lib/products.ts` as `/attached_assets/filename.jpg`
- Images are automatically copied to the public folder on every server restart
- Example: iPhone Air variants all use this pattern with images for Space Black, Cloud White, Sky Blue, and Light Gold colors

### Replit Environment Setup (October 2025)
**Status**: ✅ Fully configured and running successfully in Replit environment.

**Latest GitHub Import**: October 1, 2025 (Fresh Clone)
- ✅ Fresh clone successfully configured for Replit environment
- ✅ Frontend dependencies installed (418 packages in frontend/)
- ✅ Workflow configured with webview output on port 5000
- ✅ Build process tested and working (600KB JS, 97KB CSS)
- ✅ Deployment configuration verified (autoscale)
- ✅ Application fully functional and tested

**Development Workflow**: The "Start application" workflow runs `node start-dev.js` which:
- Copies product images from `attached_assets/` to `frontend/public/attached_assets/`
- Starts the Express backend API on port 3001 (localhost only)
- Starts the Vite frontend dev server on port 5000 (0.0.0.0 with allowedHosts: true)
- Frontend configured to proxy `/api` requests to the backend
- Both servers start automatically with proper logging

**Dependencies Status**:
- Root: npm packages already installed from original setup
- Frontend: `npm install` completed successfully (418 packages freshly installed)

**Environment Variables Required**:
- `MONGODB_URI` (optional): MongoDB connection string for user authentication features
- `JWT_SECRET` (optional): Secret key for JWT token signing
- `DATABASE_URL` (configured): PostgreSQL database (currently not used, Drizzle config present)

**Note**: Authentication features (signup/login) require MongoDB configuration. The app works without authentication for browsing and shopping cart functionality.

**Deployment Configuration**: ✅ Autoscale deployment configured with:
- Build: `npm run build` (builds frontend to `dist` folder)
- Run: `npm run start` (serves static files from `dist` on port 5000)
- Build verified successful: 600.45KB JS bundle, 97.22KB CSS, assets included

**Verified Working Features**:
- ✅ Frontend loads correctly with hero section and navigation
- ✅ Backend API responding (health check: OK)
- ✅ Vite proxy correctly forwarding API requests
- ✅ Responsive design displays properly
- ✅ Product browsing and cart functionality (client-side)
- ✅ Multi-language support active (EN default)
- ✅ Build process generates production-ready static files

## External Dependencies

### Authentication Services
- **MongoDB Atlas**: User data storage and authentication.
- **JWT (jsonwebtoken)**: Secure token-based authentication.
- **bcrypt**: Password hashing and verification.

### Payment Processing
- **MaxelPay**: Primary payment gateway.

### Development and Build Tools
- **Vite**: Build tool and development server.
- **TypeScript**: Type-safe development.

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
- **TanStack React Query**: Server state management.