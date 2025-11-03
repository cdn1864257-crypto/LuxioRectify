# Luxio - Premium E-Commerce Platform

## Overview
Luxio is a premium e-commerce platform built with React and TypeScript, designed for selling high-end electronics. It offers a modern UI/UX, comprehensive product variant management, and secure payment processing. The platform utilizes MongoDB Atlas, an Express.js backend API, and integrates with external payment gateways to deliver a seamless and secure online shopping experience. Its ambition is to be a leading online destination for premium electronic gadgets.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend uses React 18 with TypeScript, Vite, Wouter for routing, and TanStack React Query for server state management. Styling is handled with Tailwind CSS, shadcn/ui components, and Class Variance Authority (CVA), focusing on a modern, responsive, and intuitive user experience.

### State Management
State is managed using React Query for server data, dedicated contexts for authentication, shopping cart, and language, and Local Storage for persistence.

### Authentication System
The system employs JWT-based session management with email/password registration and login, secure password hashing, and httpOnly cookies for JWT storage. It includes a comprehensive email verification flow with auto-login and multilingual support. Security features include CSRF protection, rate limiting, and secure data handling.

### Internationalization
The platform supports 7 languages (English, French, Polish, Spanish, Portuguese, Italian, Hungarian) with automatic IP-based language detection, country-to-language mapping, and full internationalization of UI and emails. URL parameters are used for language routing, with session caching for detection.

### SEO Optimization
Comprehensive multilingual SEO is implemented for Google indexing and social media sharing. This includes optimized title tags, meta descriptions, keywords, Open Graph data, dynamic `hreflang` tag generation, and localized Open Graph images across primary languages. An optimized `sitemap.xml` and `robots.txt` are also included.

### Data Management
Product and order data are managed client-side using a static product database with extensive smartphone data and variant matrices. Local storage persists cart data and order history. Image assets are optimized and stored locally.

### Payment Processing
A complete and secure payment system offers multiple methods: Stripe (credit/debit cards), Bank Transfer, Maxelpay, and PCS/Transcash Tickets (with AES-256 encryption). NowPayments is integrated for cryptocurrency. All payment methods are protected, require authentication, and trigger email notifications. Payment references are standardized across the platform. Server-side validation is implemented for all payment methods to prevent price manipulation and ensure security.

### Email System
All automated emails (verification, welcome, password reset, order confirmations, admin notifications) are sent via SendGrid with full multilingual support. Email links default to the official domain, and sensitive data is handled securely.

### Cart & Checkout UX
Non-authenticated users attempting to checkout are prompted with a multilingual login dialog and automatically redirected to the login page after a short timeout. The checkout address page supports automatic address autocomplete from OpenStreetMap Nominatim API and includes postal code validation. User registration includes postal code field which automatically fills in the checkout when using registered address.

### Technical Implementations
The project is configured for Replit development, running both backend (Express on port 3001) and frontend (Vite on port 5000) with API proxying. Environment variables are utilized for sensitive configurations.

### Environment Variables
Key environment variables include `MONGODB_URI`, `JWT_SECRET`, `BACKEND_URL`, `FRONTEND_URL`, `NOWPAYMENTS_API_KEY`, `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, and `CSRF_SECRET`.

## External Dependencies

### Authentication & Database
-   **MongoDB Atlas**: Database.
-   **jsonwebtoken (JWT)**: Authentication tokens.
-   **bcrypt**: Password hashing.

### Payment & Communication
-   **MaxelPay**: Payment gateway.
-   **SendGrid SMTP**: Email services.
-   **NowPayments**: Cryptocurrency payments.
-   **Stripe**: Credit/debit card payments.

### Development & Core Technologies
-   **Vite**: Build tool.
-   **TypeScript**: Language.
-   **Express.js**: Backend framework.

### UI & Styling
-   **Tailwind CSS**: Styling.
-   **shadcn/ui Components**: UI component library.
-   **Font Awesome**: Iconography.
-   **Google Fonts (Inter)**: Typography.

### Utility Libraries
-   **Wouter**: Client-side routing.
-   **TanStack React Query**: Server state management.
-   **Helmet.js**: Security headers.
-   **csrf-csrf**: CSRF protection.