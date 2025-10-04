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
The platform supports multiple languages (English, French, Polish, Spanish, Portuguese, Italian, Hungarian) with dynamic switching, IP-based detection, and localized content.

### Data Management
Product and order data are managed client-side using a static product database, organized by categories. Local storage is used for cart persistence and order history. The product catalog includes extensive real smartphone data from GSMArena, including variant matrices, accurate pricing, and professional images. Product images are managed via an automated workflow that syncs images from a root `attached_assets/` folder to `frontend/public/attached_assets/`.

### Payment Processing
The platform includes a complete payment system with three secure methods:
1.  **Bank Transfer**: Features a two-step confirmation process where users first see bank details (IBAN: ES6115632626383268707364, BIC: NTSBESM1XXX, Beneficiary: Matt Luxio) with "Oui/Non" buttons. Email is sent via KingSMTP only when user confirms with "Oui, je procède au virement". Generates unique order reference (format: LX-timestamp-random) and includes delivery timing information (24h for instant transfer, 48-72h for standard).
2.  **Maxelpay**: A recommended redirect-based payment gateway integrated with environment variables and secure callbacks.
3.  **PCS/Transcash Tickets**: Allows payment via multiple ticket codes, with AES-256 encryption for secure storage of codes. Displays proper confirmation message: "Vous venez de recevoir une notification suite à votre commande. Nous procéderons à la vérification du paiement. Vous recevrez une confirmation définitive d'ici quelques minutes." Redirects to dashboard (not home page) after successful submission.

All payment methods feature a modern UI/UX, are protected routes requiring authentication and a non-empty cart. Email notifications are handled via KingSMTP with proper logging ("✅ Email sent successfully via KingSMTP").

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
1. The project is pre-configured with all dependencies installed
2. Click the "Run" button to start the development server
3. The application will be available in the webview
4. To deploy: Click the "Deploy" button for production hosting

### Environment Variables
The application requires several environment variables for full functionality, including `MONGODB_URI`, `JWT_SECRET`, `ENCRYPTION_KEY` (critical for production), `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `ADMIN_EMAIL`, `MAXELPAY_MERCHANT_ID`, and `MAXELPAY_API_KEY`.

## External Dependencies

### Authentication Services
-   **MongoDB Atlas**: User data storage and authentication.
-   **JWT (jsonwebtoken)**: Secure token-based authentication.
-   **bcrypt**: Password hashing and verification.

### Payment Processing
-   **MaxelPay**: Primary payment gateway.
-   **KingSMTP**: For transactional email services.

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