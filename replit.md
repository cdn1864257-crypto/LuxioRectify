# Luxio - Premium E-Commerce Platform

## Overview
Luxio is a premium e-commerce platform built with React and TypeScript for selling premium electronics (smartphones, smartwatches, sneakers, smart home gadgets, and urban mobility devices). It features a modern design with MongoDB Atlas for user authentication and order storage, Express.js backend API, and external payment processing. The project provides a robust e-commerce experience with a focus on modern UI/UX and comprehensive product variant management.

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
User authentication is managed with JWT-based session management. The system supports email/password registration and login, with secure password hashing using bcrypt. JWT tokens are stored in httpOnly cookies for security. Complete authentication flow includes dynamic navigation and protected pages.

### Internationalization
The platform supports multiple languages (English, French, Polish, Spanish, Portuguese, Italian, Hungarian) with dynamic switching, IP-based detection, and localized content. All payment modals (bank transfer, Maxelpay, PCS tickets) are fully internationalized with no hardcoded text, supporting all 7 languages with consistent translations.

### Data Management
Product and order data are managed client-side using a static product database, organized by categories. Local storage is used for cart persistence and order history. The product catalog includes extensive real smartphone data from GSMArena, including variant matrices, accurate pricing, and professional images. Product images are managed via an automated workflow that syncs images from a root `attached_assets/` folder to `frontend/public/attached_assets/`.

### Payment Processing
The platform includes a complete payment system with three secure methods:
1.  **Bank Transfer**: Features a two-step confirmation process where users first see bank details (IBAN: ES6115632626383268707364, BIC: NTSBESM1XXX, Beneficiary: Matt Luxio) with "Oui/Non" buttons. Email is sent via SMTP only when user confirms with "Oui, je procède au virement". Generates unique order reference (format: LX-timestamp-random) and includes delivery timing information (24h for instant transfer, 48-72h for standard).
2.  **Maxelpay**: A recommended redirect-based payment gateway integrated with environment variables and secure callbacks.
3.  **PCS/Transcash Tickets**: Allows payment via multiple ticket codes, with AES-256 encryption for secure storage of codes. Displays proper confirmation message: "Vous venez de recevoir une notification suite à votre commande. Nous procéderons à la vérification du paiement. Vous recevrez une confirmation définitive d'ici quelques minutes." Redirects to dashboard (not home page) after successful submission.

All payment methods feature a modern UI/UX, are protected routes requiring authentication and a non-empty cart. Email notifications are handled via SendGrid SMTP with proper logging ("✅ Email sent successfully").

### UI/UX Decisions
The design emphasizes a modern aesthetic, responsive behavior across devices (mobile-first approach), and improved user experience through streamlined navigation and clear calls to action. High-quality product images and detailed specifications are integrated.

### Technical Implementations
The project is configured for the Replit environment with:
- **Development**: A unified `start-dev.js` script runs both backend (Express on port 3001) and frontend (Vite dev server on port 5000)
- **Vite Configuration**: Configured with `host: '0.0.0.0'` and `allowedHosts: true` for Replit proxy support
- **API Proxy**: The Vite dev server proxies `/api` requests to the backend on port 3001
- **Deployment**: Autoscale deployment builds the frontend and serves via `serve` on port 5000
- **Image Management**: The `copy-images.js` script syncs product images from `attached_assets/` to `frontend/public/attached_assets/`

### Getting Started in Replit
1. ✅ **Setup Complete**: All dependencies have been installed (root and frontend packages)
2. ✅ **Workflow Configured**: Development server automatically starts both backend (port 3001) and frontend (port 5000)
3. Click the "Run" button to start the development server
4. The application will be available in the webview at port 5000
5. To deploy: Click the "Deploy" button for production hosting (configured for autoscale deployment)

### Replit Setup Status (October 4, 2025)
- ✅ **Project Import Complete**: Successfully imported GitHub repository
- ✅ **Root dependencies installed**: All backend packages (90 packages)
- ✅ **Frontend dependencies installed**: All frontend packages (334 packages)
- ✅ **Vite dev server configured**: `host: '0.0.0.0'` and `allowedHosts: true` for Replit proxy
- ✅ **Workflow configured**: Running `npm run dev` on port 5000 with webview output
- ✅ **Deployment configured**: Autoscale deployment with build and serve commands
- ✅ **Product images synced**: Images copied from `attached_assets/` to `frontend/public/`
- ✅ **Backend running**: Express API server on localhost:3001
- ✅ **Frontend running**: Vite dev server on 0.0.0.0:5000
- ✅ **Application accessible**: Successfully displaying in webview
- ⚠️ **Optional Configuration**: Set environment variables in Secrets for full functionality:
  - `MONGODB_URI` - MongoDB Atlas connection string for user/order data persistence
  - `JWT_SECRET` - Secret key for JWT token generation (32+ characters recommended)
  - `ENCRYPTION_KEY` - AES-256 encryption key for PCS/Transcash codes (32+ characters, critical for production)
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - SendGrid SMTP configuration for email notifications
  - `EMAIL_FROM`, `ADMIN_EMAIL` - Email addresses for outgoing messages
  - `MAXELPAY_MERCHANT_ID`, `MAXELPAY_API_KEY` - Maxelpay payment gateway credentials

### Recent Changes (October 4, 2025)
**GitHub Import and Replit Environment Setup - COMPLETED (October 4, 2025):**
- ✅ Successfully imported fresh clone from GitHub repository
- ✅ Installed all root dependencies (90 packages including Express, MongoDB, JWT, bcrypt)
- ✅ Installed all frontend dependencies (334 packages including React, Vite, Tailwind CSS)
- ✅ Configured workflow "Start application" with webview output type on port 5000
- ✅ Set up deployment configuration for autoscale hosting with build and serve commands
- ✅ Verified frontend displays correctly with Replit proxy support (host: 0.0.0.0, allowedHosts: true)
- ✅ Backend API running on localhost:3001 with development fallback keys for testing
- ✅ Frontend Vite dev server running on 0.0.0.0:5000 with API proxy configured
- ✅ All 485+ product images successfully synced from attached_assets to frontend/public
- ✅ Application fully accessible in webview with modern premium tech e-commerce UI displaying correctly
- ✅ Image copy script running automatically on startup
- ✅ Import process completed successfully - application ready for use
- **Setup Notes**: The Vite dev server was already configured with the correct settings. The only issue was missing frontend dependencies, which were successfully installed.

**Internationalization Fix - Bank Transfer Modals:**
- Added 18 new translation keys to support full internationalization of bank transfer payment modals
- Replaced all hardcoded French text in confirmation and success modals with dynamic translation keys
- Keys added: `verifyTransferDetails`, `amountToTransfer`, `instructionsLabel`, `transferInstruction1Short`, `transferInstruction2Short`, `immediateTransfer`, `delivery24h`, `standardTransfer`, `delivery4872h`, `noCancel`, `yesProceedTransfer`, `name`, `reference`, `importantReferenceNote`, `viewMyOrders`, `processing`, `orderReference`, `paymentInitError`
- All translations implemented across all 7 supported languages (EN, FR, ES, PT, PL, IT, HU)

**Ticket Payment Dashboard Refresh Fix (October 4, 2025):**
- ✅ Fixed automatic dashboard refresh issue after ticket (PCS/Transcash) payment
- **Problem**: After submitting ticket payment, users had to manually refresh the page to see their new order in the dashboard
- **Solution**: Implemented React Query cache invalidation in CheckoutModal component
- **Technical Details**:
  - Imported `queryClient` from `@/lib/queryClient` in CheckoutModal
  - Added `queryClient.invalidateQueries({ queryKey: ['/api/orders'] })` to `handleCloseTicketModal` function
  - Now when the ticket confirmation modal is closed, the orders cache is invalidated
  - Dashboard automatically refetches and displays the new order when the user navigates to it
- **Result**: Orders now appear instantly in the dashboard after ticket payment without manual page refresh

**Cart Variant Handling Fix (October 8, 2025):**
- ✅ Fixed critical bug where product variants (color/capacity) were incorrectly merged in the cart
- **Problem**: Products with same ID but different variants (e.g., iPhone 15 Pro 256GB Black vs 512GB White) were treated as the same item, causing incorrect quantities and UI issues
- **Solution**: Implemented composite key system for cart item identification
- **Technical Details**:
  - Modified `CartContext.tsx`: Updated `updateQuantity` and `removeFromCart` to accept both `productId` and `description` parameters
  - Modified cart logic to match items based on both product ID AND description (variant details)
  - Updated `CartSidebar.tsx` and `Cart.tsx`: Generate unique React keys using `${item.id}-${item.description.replace(/[^a-zA-Z0-9]/g, '-')}`
  - Applied composite keys to all data-testid attributes for proper testing and UI reconciliation
  - Each variant now displays its description (color/capacity details) in the cart UI
- **Result**: Different variants of the same product are now correctly handled as separate cart items with proper quantity tracking and removal

**Login Error Internationalization & Email Fix (October 8, 2025):**
- ✅ Fixed login errors to display in the user's selected language instead of hardcoded French
- ✅ Fixed email delivery issue for both Replit and Render deployments
- **Problems**: 
  1. Login error messages were hardcoded in French, not translated based on user language
  2. Welcome emails and order confirmations not being sent on Render deployment despite SendGrid configuration
- **Solution**: 
  1. Backend API now returns error codes (e.g., `INVALID_CREDENTIALS`, `REQUIRED_FIELDS`) instead of hardcoded messages
  2. Frontend translates error codes based on user's selected language
  3. Email service now detects environment and uses appropriate configuration
- **Technical Details**:
  - Added `invalidCredentials` translation key across all 7 supported languages (EN, FR, ES, PT, PL, IT, HU)
  - Modified `api/auth/login.ts`: Returns error codes (`INVALID_CREDENTIALS`, `REQUIRED_FIELDS`, etc.) instead of French messages
  - Modified `frontend/src/components/LoginForm.tsx`: Translates error codes using the language context
  - Modified `utils/sendgrid-service.ts`: Added environment detection to support both Replit (using connectors) and Render (using direct env vars)
  - SendGrid service now checks for `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` env vars to determine environment
- **Result**: Login errors now display in correct language for all users, and email notifications work on both Replit and Render deployments

### Environment Variables
The application requires several environment variables for full functionality, including `MONGODB_URI`, `JWT_SECRET`, `ENCRYPTION_KEY` (critical for production), `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `ADMIN_EMAIL`, `MAXELPAY_MERCHANT_ID`, and `MAXELPAY_API_KEY`.

**Development Fallbacks:**
- The app uses development fallback values for testing without configuration
- `ENCRYPTION_KEY`: Uses a development-only key (warning displayed in logs)
- `JWT_SECRET`: Authentication features will show errors without this
- `MONGODB_URI`: Database operations will fail gracefully without connection
- SMTP credentials: Email notifications won't be sent without SendGrid SMTP setup

## External Dependencies

### Authentication Services
-   **MongoDB Atlas**: User data storage and authentication.
-   **JWT (jsonwebtoken)**: Secure token-based authentication.
-   **bcrypt**: Password hashing and verification.

### Payment Processing
-   **MaxelPay**: Primary payment gateway.
-   **SendGrid SMTP**: For transactional email services.

### Development and Build Tools
-   **Vite**: Build tool and development server.
-   **TypeScript**: Type-safe development.

### UI and Styling
-   **Tailwind CSS**: Utility-first CSS framework.
-   **shadcn/ui Components**: UI component library based on Radix UI.
-   **Font Awesome**: Iconography.
-   **Google Fonts (Inter)**: Typography.

### Utility Libraries
-   **date-fns**: Date manipulation.
-   **clsx** and **tailwind-merge**: CSS class management.
-   **Embla Carousel**: Product showcase.
-   **Wouter**: Client-side routing.
-   **TanStack React Query**: Server state management.
