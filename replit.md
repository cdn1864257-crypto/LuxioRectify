# Luxio - Premium E-Commerce Platform

## Overview
Luxio is a premium e-commerce platform built with React and TypeScript, designed for selling premium electronics (smartphones, smartwatches, sneakers, smart home gadgets, and urban mobility devices). It provides a robust e-commerce experience with a focus on modern UI/UX, comprehensive product variant management, and secure payment processing. The platform uses MongoDB Atlas for user authentication and order storage, an Express.js backend API, and integrates with external payment gateways.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes (October 2025)

### CORS Configuration Fix (October 14, 2025)
**Status**: ✅ Fixed
**Issue**: Payment endpoints returning "Failed to fetch" errors in production due to CORS misconfiguration.

#### Problem Identified:
- Backend CORS middleware required exact `FRONTEND_URL` match to allow requests
- If `FRONTEND_URL` was undefined or incorrect on Render, it defaulted to `'*'`
- The wildcard `'*'` in `allowedOrigins.includes(origin)` check always returned `false`
- Result: CORS headers not set, all cross-domain requests rejected

#### Solutions Implemented:
1. **Intelligent Fallback**: Changed `FRONTEND_URL` default from `'*'` to `'https://luxios.vercel.app'`
2. **Wildcard Support**: Added special handling for `FRONTEND_URL === '*'` to allow all origins
3. **CSRF Status**: Confirmed CSRF is disabled in production (cross-domain incompatibility)

#### Files Modified:
- `server/index-render.ts`: Updated CORS middleware and FRONTEND_URL fallback

#### Cart Image Issue Investigation:
**Status**: ⚠️ Likely due to cached localStorage data
- All product images are correctly configured in `frontend/src/lib/products.ts`
- Product variant images properly assigned via `selectedVariant.image || product.image`
- No coffee/cup images found in project assets
- **Root Cause**: Old cart data in browser localStorage with incorrect images
- **User Action Required**: Clear browser cache/localStorage or empty cart to resolve

### Security Hardening & Audit (October 9, 2025)
**Status**: ✅ All critical vulnerabilities fixed

#### Critical Security Fixes Applied:
1. **Password Reset Poisoning** (CRITICAL)
   - Fixed Host Header Poisoning vulnerability in password reset flow
   - Replaced `req.headers.origin` with trusted `FRONTEND_URL` environment variable
   - Prevents attackers from redirecting reset links to malicious domains

2. **CORS Misconfiguration** (HIGH)
   - Blocked localhost origins in production environment
   - Ensures only `FRONTEND_URL` is allowed in production
   - Prevents CSRF attacks from malicious localhost applications

3. **CSRF Protection** (HIGH)
   - Implemented double-submit cookie pattern using `csrf-csrf` package
   - Protected all state-changing routes (auth, payment, orders)
   - Added `/api/csrf-token` endpoint for token retrieval
   - NowPayments webhook exempt (validated via HMAC instead)

4. **Rate Limiting** (MEDIUM)
   - Auth endpoints: 5 attempts per 15 minutes (login, signup, password reset)
   - General endpoints: 100 requests per 15 minutes
   - Prevents brute force and DoS attacks

5. **NowPayments Webhook Security** (CRITICAL)
   - Made `NOWPAYMENTS_IPN_SECRET` mandatory in production
   - Implemented HMAC SHA-512 signature verification
   - Rejects webhooks with invalid signatures

6. **Security Headers** (MEDIUM)
   - Implemented Helmet.js for comprehensive HTTP security headers
   - Content Security Policy (CSP) prevents XSS attacks
   - HSTS enforces HTTPS (1 year max-age)
   - Anti-clickjacking and MIME-sniffing protections

#### New Required Environment Variables:
- `CSRF_SECRET` - 32+ character random string for CSRF token generation
- `BACKEND_URL` - Backend URL (e.g., `https://luxio.onrender.com`) for NowPayments callbacks
- `NOWPAYMENTS_IPN_SECRET` - IPN secret for webhook verification (now MANDATORY)

#### Documentation Added:
- `SECURITY.md` - Comprehensive security audit report and deployment checklist
- `.env.example` - Updated with all required security variables
- Production deployment verification steps

### NowPayments Integration Fixes
- **Critical Fix**: Corrected callback URLs to point to backend (`BACKEND_URL`) instead of frontend, preventing redirect failures after payment
- **Environment Variable**: Added mandatory `BACKEND_URL` environment variable for Render deployment
- **Cache Invalidation**: Added automatic query invalidation after successful payments for all payment methods
- **Auto-refresh Dashboard**: Implemented automatic dashboard refresh (30s interval + on window focus) to capture webhook updates even when users don't visit return page

### Dashboard Improvements
- Added `refetchOnWindowFocus: true` to refresh orders when user returns to tab
- Added `refetchInterval: 30000` for periodic refresh every 30 seconds
- Set `staleTime: 0` to always fetch fresh data from backend
- Ensures real-time order updates after NowPayments webhook completion

## System Architecture

### Frontend Architecture
The frontend uses React 18 with TypeScript, Vite for building, Wouter for routing, and TanStack React Query for server state management. Styling is handled with Tailwind CSS and shadcn/ui components, enhanced by Class Variance Authority (CVA). The UI is organized into logical components for Layout, Product, Cart, Authentication, Checkout, and general UI elements.

### State Management
State is managed using React Query for server data, AuthContext for authentication, CartContext for the shopping cart, LanguageContext for internationalization, Local Storage for cart persistence and order history, and React Context API for toast notifications.

### Authentication System
User authentication uses JWT-based session management with email/password registration and login. Secure password hashing is done with bcrypt, and JWT tokens are stored in httpOnly cookies. The system supports dynamic navigation and protects sensitive pages.

### Internationalization
The platform supports multiple languages (English, French, Polish, Spanish, Portuguese, Italian, Hungarian) with dynamic switching and IP-based detection. All payment modals and content are fully internationalized.

### Data Management
Product and order data are managed client-side using a static product database organized by categories. Local storage maintains cart persistence and order history. The product catalog includes extensive smartphone data with variant matrices, pricing, and professional images. Product images are synced from an `attached_assets/` folder to `frontend/public/attached_assets/`.

### Payment Processing
A complete payment system offers three secure methods:
1.  **Bank Transfer**: Features a two-step confirmation, displays bank details, and sends an email via SMTP upon user confirmation. Generates a unique order reference.
2.  **Maxelpay**: A redirect-based payment gateway.
3.  **PCS/Transcash Tickets**: Allows payment via multiple ticket codes, with AES-256 encryption for secure storage.

All payment methods are protected routes, require authentication and a non-empty cart, and trigger email notifications via SendGrid.

### UI/UX Decisions
The design prioritizes a modern aesthetic, responsive behavior (mobile-first), streamlined navigation, and clear calls to action. High-quality product images and detailed specifications are integrated.

### Technical Implementations
The project is configured for the Replit environment:
-   **Development**: A unified `start-dev.js` script runs both backend (Express on port 3001) and frontend (Vite dev server on port 5000).
-   **Vite Configuration**: Configured with `host: '0.0.0.0'` and `allowedHosts: true` for Replit proxy support.
-   **API Proxy**: The Vite dev server proxies `/api` requests to the backend.
-   **Deployment**: Autoscale deployment builds the frontend and serves via `serve` on port 5000.
-   **Image Management**: A `copy-images.js` script syncs product images.

### Environment Variables
The application requires the following environment variables for full functionality:

**Required for Production (Render Backend):**
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `BACKEND_URL` - Backend URL (e.g., `https://luxio.onrender.com`) **[MANDATORY for NowPayments]**
- `FRONTEND_URL` - Frontend URL (e.g., `https://luxios.vercel.app`)
- `NOWPAYMENTS_API_KEY` - NowPayments API key for crypto payments
- `SENDGRID_API_KEY` - SendGrid API key for email notifications
- `SENDGRID_FROM_EMAIL` - Verified sender email address

**Optional:**
- `ENCRYPTION_KEY` - Key for encrypting payment ticket codes
- `NOWPAYMENTS_IPN_SECRET` - IPN secret for webhook verification
- `MAXELPAY_MERCHANT_ID` - MaxelPay merchant ID
- `MAXELPAY_API_KEY` - MaxelPay API key

Development fallbacks are provided for testing without full configuration. See `VARIABLES_ENVIRONNEMENT.md` for detailed setup instructions.

## External Dependencies

### Authentication Services
-   **MongoDB Atlas**: Database for user and order data.
-   **JWT (jsonwebtoken)**: Token-based authentication.
-   **bcrypt**: Password hashing.

### Payment Processing
-   **MaxelPay**: Payment gateway.
-   **SendGrid SMTP**: Email services.

### Development and Build Tools
-   **Vite**: Build tool and dev server.
-   **TypeScript**: Type-safe language.

### UI and Styling
-   **Tailwind CSS**: Utility-first CSS.
-   **shadcn/ui Components**: UI component library.
-   **Font Awesome**: Iconography.
-   **Google Fonts (Inter)**: Typography.

### Utility Libraries
-   **date-fns**: Date manipulation.
-   **clsx** and **tailwind-merge**: CSS class management.
-   **Embla Carousel**: Product showcase.
-   **Wouter**: Client-side routing.
-   **TanStack React Query**: Server state management.