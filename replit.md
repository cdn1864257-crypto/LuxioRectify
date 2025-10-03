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

#### Recent Catalog Updates

**October 2025 - Premium Product Image Updates (Oct 1):**
- Updated product variant images for 6 premium smartphone families:
  - **Xiaomi 15**: Updated Black, White, and Green variants with new official images
  - **Oppo Find X7 Ultra**: Updated main product image
  - **Vivo X100 Pro**: Updated main product image
  - **Sony Xperia 1 VI**: Updated Black, Platinum Silver, and added Red variant with images
  - **Samsung Galaxy A55 5G**: Updated all color variants (Iceblue, Navy, Lilac, Lemon) with new images
  - **Google Pixel 8a**: Updated Obsidian, Porcelain, and Bay variants with new images
- All new images stored in `attached_assets/` and automatically synced to `frontend/public/attached_assets/`
- Images verified and copied successfully via the automated `copy-images.js` workflow

**October 2025 - Official Brand Images & New Models:**
- Downloaded official product images from brand media kits and distributor catalogs
- Updated Samsung Galaxy A16 5G and M15 5G with official images
- Fixed Samsung Galaxy A16 5G specs (corrected to Dimensity 6300 chipset for proper 5G support)
- Added 2 new gaming flagship models:
  - **Motorola Edge 60 Pro** ($599) - Snapdragon 8 Gen 3, Sony LYTIA 700C camera system
  - **Lenovo Legion Phone Duel 2** ($549) - Dual cooling system, pop-up camera
- Corrected all product image paths to use standardized `/attached_assets/stock_images/` format
- Total catalog: **69 premium smartphone models** with official imagery

**September 2025 - Initial Expansion:**
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

**Latest GitHub Import**: October 3, 2025 (Fresh Clone - COMPLETED ✅)
- ✅ Fresh clone successfully configured for Replit environment
- ✅ Frontend dependencies installed (418 packages in frontend/)
- ✅ Workflow configured with webview output on port 5000
- ✅ Vite dev server properly configured for Replit proxy (host: 0.0.0.0, allowedHosts: true)
- ✅ Backend API running on port 3001 (localhost)
- ✅ Both frontend and backend servers running successfully
- ✅ Product images automatically synced (310+ images copied to frontend/public)
- ✅ Application fully functional and tested with screenshot verification
- ✅ Deployment configuration set up (autoscale deployment ready)
- ✅ Hero section displaying correctly with premium product images
- ✅ Navigation, language selector, and cart icon all functional
- ✅ Import completed successfully - Ready for use!
- ✅ MongoDB authentication configured with JWT secret (user signup/login fully functional)

**Import Summary (October 3, 2025)**:
This was a fresh GitHub clone that required setup for the Replit environment:
1. Installed frontend dependencies (418 npm packages) in the `frontend/` subdirectory
2. Configured the workflow with proper webview output type on port 5000
3. Verified Vite configuration already has correct Replit settings (host: 0.0.0.0, allowedHosts: true)
4. Confirmed backend Express server binds to localhost:3001 (correct for backend)
5. Tested application successfully - Hero section, navigation, and responsive design all working
6. Set up autoscale deployment configuration for production
7. All 310+ product images copied successfully from attached_assets to frontend/public

The application is now fully functional and ready to use in the Replit environment!

**Development Workflow**: The "Start application" workflow runs `node start-dev.js` which:
- Copies product images from `attached_assets/` to `frontend/public/attached_assets/`
- Starts the Express backend API on port 3001 (localhost only)
- Starts the Vite frontend dev server on port 5000 (0.0.0.0 with allowedHosts: true)
- Frontend configured to proxy `/api` requests to the backend
- Both servers start automatically with proper logging

**Dependencies Status**:
- Root: npm packages already installed from original setup
- Frontend: `npm install` completed successfully (418 packages freshly installed)

**Environment Variables Configured**:
- ✅ `MONGODB_URI`: MongoDB Atlas connection string configured for user authentication
- ✅ `JWT_SECRET`: Secret key configured for JWT token signing
- `DATABASE_URL` (optional): PostgreSQL database (Drizzle config present but not actively used)

**Authentication Status**: ✅ Fully configured - User signup, login, and protected pages (Dashboard, Cart, Payment) are now operational.

**Deployment Configuration**: ✅ Autoscale deployment configured with:
- Build: `npm run build` (builds frontend to `dist` folder)
- Run: `npm run start` (serves static files from `dist` on port 5000)
- Build verified successful: 612KB JS bundle, 97KB CSS, assets included

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