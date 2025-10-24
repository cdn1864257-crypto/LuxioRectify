# Luxio - Premium E-Commerce Platform

## Overview
Luxio is a premium e-commerce platform built with React and TypeScript, designed for selling premium electronics. It provides a robust e-commerce experience with a focus on modern UI/UX, comprehensive product variant management, and secure payment processing. The platform uses MongoDB Atlas for user authentication and order storage, an Express.js backend API, and integrates with external payment gateways. Its ambition is to offer a seamless and secure online shopping experience for high-end electronic gadgets.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend uses React 18 with TypeScript, Vite for building, Wouter for routing, and TanStack React Query for server state management. Styling is handled with Tailwind CSS and shadcn/ui components, enhanced by Class Variance Authority (CVA). The UI is organized into logical components for Layout, Product, Cart, Authentication, Checkout, and general UI elements, prioritizing a modern aesthetic, responsive behavior (mobile-first), streamlined navigation, and clear calls to action. High-quality product images and detailed specifications are integrated.

### State Management
State is managed using React Query for server data, AuthContext for authentication, CartContext for the shopping cart, LanguageContext for internationalization, Local Storage for cart persistence and order history, and React Context API for toast notifications.

### Authentication System
User authentication uses JWT-based session management with email/password registration and login. Secure password hashing is done with bcrypt, and JWT tokens are stored in httpOnly cookies. The system supports dynamic navigation and protects sensitive pages. Security hardening includes CSRF protection (double-submit cookie), rate limiting on auth endpoints, and secure handling of sensitive data.

### Internationalization
The platform supports multiple languages (English, French, Polish, Spanish, Portuguese, Italian, Hungarian) with dynamic switching and IP-based detection. All payment modals and content are fully internationalized.

### Data Management
Product and order data are managed client-side using a static product database organized by categories. Local storage maintains cart persistence and order history. The product catalog includes extensive smartphone data with variant matrices, pricing, and professional images. Product images are synced from an `attached_assets/` folder to `frontend/public/attached_assets/`.

### Payment Processing
A complete payment system offers three secure methods: Bank Transfer, Maxelpay (redirect-based), and PCS/Transcash Tickets (with AES-256 encryption). All payment methods are protected routes, require authentication and a non-empty cart, and trigger email notifications via SendGrid. NowPayments integration includes HMAC SHA-512 signature verification for webhooks and automatic dashboard refresh for order updates.

### Technical Implementations
The project is configured for the Replit environment: a `start-dev.js` script runs both backend (Express on port 3001) and frontend (Vite dev server on port 5000) with API proxying. Vite is configured with `host: '0.0.0.0'` and `allowedHosts: true` for Replit proxy support. Deployment builds the frontend and serves via `serve` on port 5000. A `copy-images.js` script syncs product images. Backend error handling ensures all API errors return valid JSON responses.

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