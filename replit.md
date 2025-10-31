# Luxio - Premium E-Commerce Platform

## Overview
Luxio is a premium e-commerce platform built with React and TypeScript, designed for selling premium electronics. It provides a robust e-commerce experience with a focus on modern UI/UX, comprehensive product variant management, and secure payment processing. The platform uses MongoDB Atlas for user authentication and order storage, an Express.js backend API, and integrates with external payment gateways. Its ambition is to offer a seamless and secure online shopping experience for high-end electronic gadgets.

**Official Domain**: luxiomarket.shop

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend uses React 18 with TypeScript, Vite for building, Wouter for routing, and TanStack React Query for server state management. Styling is handled with Tailwind CSS and shadcn/ui components, enhanced by Class Variance Authority (CVA). The UI is organized into logical components for Layout, Product, Cart, Authentication, Checkout, and general UI elements, prioritizing a modern aesthetic, responsive behavior (mobile-first), streamlined navigation, and clear calls to action. High-quality product images and detailed specifications are integrated.

### State Management
State is managed using React Query for server data, AuthContext for authentication, CartContext for the shopping cart, LanguageContext for internationalization, Local Storage for cart persistence and order history, and React Context API for toast notifications.

### Authentication System (Updated: October 26, 2025)
User authentication uses JWT-based session management with email/password registration and login. Secure password hashing is done with bcrypt, and JWT tokens are stored in httpOnly cookies. The system supports dynamic navigation and protects sensitive pages. Security hardening includes CSRF protection (double-submit cookie), rate limiting on auth endpoints, and secure handling of sensitive data.

**Email Verification** (Updated: October 27, 2025): Complete email verification flow with auto-login and multilingual support:
- New users receive verification email with secure token (24-hour expiry, crypto.randomBytes generation)
- Login is blocked until email is verified (with backward compatibility for legacy accounts)
- Verification endpoint (`/api/auth/verify-email`) validates tokens, generates JWT, and automatically logs in the user
- **Auto-Login**: Upon successful verification, a 7-day JWT token is created and set as httpOnly cookie, automatically connecting the user
- **Multilingual Verification Page**: The verification page (`/verify-email`) displays messages in the user's registration language
- **Minimalist Design**: Clean, simple interface with clear status messages and automatic 3-second redirect to homepage
- MongoDB schema includes `isEmailVerified`, `verificationToken`, and `verificationTokenExpiry` fields
- Multilingual verification emails and UI messages sent via SendGrid (FR, EN, ES, PT, PL, HU, IT)
- Secure token validation with expiry checks and automatic cleanup after successful verification
- AuthContext synchronization via `refreshUser()` ensures immediate session availability

### Internationalization (Updated: October 26, 2025)
The platform supports 7 languages (English, French, Polish, Spanish, Portuguese, Italian, Hungarian) with:
- **Automatic IP-based Language Detection**: Uses `https://ipapi.co/country_code/` to detect user's country and automatically redirect to appropriate language route
- **Country-to-Language Mapping**:
  - French (fr): France, Belgium, Switzerland, Luxembourg, Monaco, Canada
  - English (en): USA, UK, Ireland, Australia, New Zealand, India, Singapore, South Africa (default for unlisted countries)
  - Spanish (es): Spain, Mexico, Argentina, Colombia, Chile, Peru, Venezuela
  - Portuguese (pt): Portugal, Brazil
  - Polish (pl): Poland
  - Italian (it): Italy
  - Hungarian (hu): Hungary
- **Detection Priority**: URL parameter (?lang=) → localStorage → IP detection → browser language → English default
- **Automatic Redirection**: Routes users to `/{language}` based on detected language (e.g., /fr, /pl, /en)
- **Session Caching**: Country detection cached in sessionStorage to avoid repeated API calls
- **Full Internationalization**: All payment modals, UI content, and emails are fully internationalized

### SEO Optimization (Updated: October 25, 2025)
Complete multilingual SEO implementation for Google indexing and social media sharing across 6 primary languages (FR, EN, PT, ES, IT, HU):
- **Comprehensive SEO Translations**: All pages have optimized title tags, meta descriptions, keywords, and Open Graph data in all supported languages (translations.ts)
- **SEO Component (SEO.tsx)**: Dynamic multilingual SEO with automatic hreflang tag generation, og:locale support, canonical URLs, dynamic HTML lang attribute, and language-specific Open Graph images
- **Multilingual Open Graph Images**: 6 localized OG images (1200x630px) stored in `frontend/public/` with translated slogans for optimal social media sharing (Facebook, Twitter, LinkedIn)
- **Hreflang Implementation**: Proper hreflang tags on all pages pointing to language variants via query parameters (?lang=en, ?lang=fr, etc.)
- **Sitemap.xml**: Complete XML sitemap with all pages and 6 language variants, including hreflang alternate links and proper priorities
- **Robots.txt**: Optimized robots.txt allowing all pages and referencing the sitemap URL
- **Vercel Configuration**: Updated vercel.json with proper rewrites for SEO static files (robots.txt, sitemap.xml, og-image-*.png) and appropriate headers
- **Pages Optimized**: Home, Premium, Dashboard, Cart, and Payment pages all have complete SEO implementation with enriched Open Graph meta tags (dimensions, type)
- **Fallback Strategy**: Automatic fallback to English OG image for languages without dedicated images (e.g., Polish)
- **Alt Tags Infrastructure**: Translated alt tag system ready for all images (seoImageAltLogo, seoImageAltProduct, etc.)
- URL structure uses query parameters to maintain compatibility with existing routing while providing proper language targeting for search engines.

### Data Management (Updated: October 27, 2025)
Product and order data are managed client-side using a static product database organized by categories. Local storage maintains cart persistence and order history. The product catalog includes extensive smartphone data with variant matrices, pricing, and professional images. Product images are synced from an `attached_assets/` folder to `frontend/public/attached_assets/`.

**Image Asset Optimization** (October 27, 2025): Cleaned up image assets to eliminate cart image mismatches:
- Removed 164 unused generic stock images from `frontend/public/attached_assets/stock_images/`
- Maintained only 11 actively used product images referenced in `products.ts`
- Eliminated all external placeholder dependencies (via.placeholder.com) by replacing with inline SVG placeholders
- Updated `ImageUpload.tsx` and `AdminProducts.tsx` to use self-contained SVG error placeholders
- Ensured all cart images correctly correspond to their products with no generic fallbacks

### Payment Processing (Updated: October 29, 2025)
A complete payment system offers secure payment methods: **Stripe** (credit/debit cards), Bank Transfer, Maxelpay (redirect-based), and PCS/Transcash Tickets (with AES-256 encryption). All payment methods are protected routes, require authentication and a non-empty cart, and trigger email notifications via SendGrid. NowPayments integration includes HMAC SHA-512 signature verification for webhooks and automatic dashboard refresh for order updates.

**Stripe Payment Security** (October 29, 2025): Server-side validation of cart totals prevents price manipulation:
- **Quantity Validation**: Enforces positive integers (1-999) to block fractional or negative quantity attacks
- **Price Verification**: Server-side price lookup from static product catalog (`api/lib/products.ts`) validates all client-submitted prices
- **Currency Whitelist**: Only EUR, USD, and GBP are accepted to prevent unexpected currency attacks
- **Server-Calculated Amount**: Payment Intent created with server-calculated total, never trusting client-provided amount
- **Variant Protection**: Product variants (colors, capacities) validated against server catalog
- **Shared Product Data**: Product catalog duplicated in `api/lib/products.ts` for both Vercel serverless functions and Render Express server access

### Email System (Updated: October 27, 2025)
All automated emails are sent via SendGrid with full multilingual support:
- **Verification Email**: Sent upon registration with secure verification link (24-hour token expiry)
- **Welcome Email**: Sent after successful email verification
- **Password Reset Email**: Sent when user requests password reset (1-hour token expiry, secure logging without token exposure)
- **Order Confirmation Emails**: For Bank Transfer, NowPayments (crypto), and Ticket payments
- **Admin Notifications**: Sent to admin for new orders
- **Domain Configuration**: All email links default to https://luxiomarket.shop (overridable via REPLIT_DEV_DOMAIN)
- **Privacy**: Email addresses removed from footer and instructions to maintain privacy
- **Languages**: Full support for FR, EN, ES, PT, PL, HU, IT with localized content
- **Security**: All email functions use shared DEFAULT_FROM constant; sensitive data (tokens, reset URLs) never logged

**Recent Fix (October 27, 2025)**: Password reset email was failing due to missing `from` parameter. Fixed by:
1. Adding DEFAULT_FROM parameter to forgot-password endpoint
2. Implementing secure logging (email destination and language only, no tokens)
3. Centralizing email sender configuration across all email functions

### Cart & Checkout UX (Updated: October 31, 2025)
**Automatic Login Redirect for Non-Authenticated Users**:
- When a non-authenticated user attempts to checkout, a multilingual dialog appears with a login prompt
- **Auto-redirect**: After 3.5 seconds, the user is automatically redirected to the login page with the language parameter
- **Timeout Management**: The redirect timeout is properly cleared when:
  - User clicks the "Login" button (immediate redirect)
  - User clicks "Cancel" (dialog closes, no redirect)
  - Dialog is closed via overlay or X button (no redirect)
  - Component unmounts (cleanup to prevent memory leaks)
- **Duplicate Prevention**: If the checkout button is clicked multiple times, any existing timeout is cleared before scheduling a new one
- **Multilingual Support**: The dialog message is displayed in the user's current language (FR, EN, ES, PT, PL, IT, HU)

### Technical Implementations
The project is configured for the Replit environment: a `start-dev.js` script runs both backend (Express on port 3001) and frontend (Vite dev server on port 5000) with API proxying. Vite is configured with `host: '0.0.0.0'` and `allowedHosts: true` for Replit proxy support. Deployment builds the frontend and serves via `serve` on port 5000. A `copy-images.js` script syncs product images. Backend error handling ensures all API errors return valid JSON responses.

**Replit Development Configuration** (October 31, 2025):
- `.env.development.example` provides template for local development configuration
- `REPLIT_DEVELOPMENT_GUIDE.md` explains common development issues and solutions
- **401 Error in Development**: When developing locally without MongoDB/JWT secrets configured, the frontend will show 401 errors
  - **Recommended Solution**: Point `VITE_API_URL` to production backend (`https://api.luxiomarket.shop`) in `.env` file
  - **Alternative**: Configure all required Replit secrets for full local backend (MONGODB_URI, JWT_SECRET, ENCRYPTION_KEY, SENDGRID_API_KEY, SENDGRID_FROM_EMAIL)

### Environment Variables
Key environment variables are required for full functionality, including `MONGODB_URI`, `JWT_SECRET`, `BACKEND_URL`, `FRONTEND_URL`, `NOWPAYMENTS_API_KEY`, `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, and `CSRF_SECRET`.

## External Dependencies

### Authentication & Database
-   **MongoDB Atlas**: Database for user and order data.
-   **jsonwebtoken (JWT)**: Token-based authentication.
-   **bcrypt**: Password hashing.

### Payment & Communication
-   **MaxelPay**: Payment gateway.
-   **SendGrid SMTP**: Email services.
-   **NowPayments**: Cryptocurrency payment gateway.

### Development & Core Technologies
-   **Vite**: Build tool and dev server.
-   **TypeScript**: Type-safe language.
-   **Express.js**: Backend framework.

### UI & Styling
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
-   **Helmet.js**: Security headers middleware.
-   **csrf-csrf**: CSRF protection.