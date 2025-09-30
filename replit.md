# Luxio - Premium E-Commerce Platform

## Overview
Luxio is a static e-commerce platform built with React and TypeScript, designed for selling premium electronics (smartphones, smartwatches, sneakers, smart home gadgets, and urban mobility devices). It features a modern design, client-side architecture with Firebase authentication, and external payment processing, operating without server-side dependencies. The project aims to provide a robust e-commerce experience with a focus on modern UI/UX and comprehensive product variant management.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses React 18 with TypeScript, Vite for building, Wouter for routing, and TanStack React Query for server state management. Styling is handled with Tailwind CSS and shadcn/ui components, enhanced by Class Variance Authority (CVA).

### Component Structure
The UI is organized into Layout (Header, Footer, Hero), Product (ProductGrid), Cart (CartSidebar), Authentication (AuthModal), Checkout (CheckoutModal), and general UI components from shadcn/ui.

### State Management
State is managed using React Query for server state, custom hooks (e.g., `use-cart`, `use-auth`), local storage for persistence (cart, order history), and React Context API for notifications.

### Authentication System
Firebase Authentication is integrated for user registration, login, and session management, supporting email/password authentication and real-time auth state monitoring.

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
- **Firebase Authentication**: For user management and authentication.

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