# Luxio - Premium E-Commerce Platform

## Overview

Luxio is a static e-commerce platform built with React and TypeScript, featuring a modern design for selling premium electronics including smartphones, smartwatches, sneakers, smart home gadgets, and urban mobility devices. The application uses a client-side architecture with Firebase authentication and external payment processing through MaxelPay, designed to be fully functional without server-side dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## Replit Setup (September 29, 2025)

This project has been successfully configured to run on Replit:

- **Development**: Frontend runs on port 5000 using Vite dev server with allowedHosts enabled for Replit proxy
- **Workflow**: "Frontend" workflow configured to run `cd frontend && npm run dev` on port 5000
- **Production Build**: Frontend builds to `/dist` folder (`npm run build`)
- **Production Serve**: Uses `serve` to host static files on port 5000 (`npm run start`)
- **Deployment**: Configured for Replit's autoscale deployment (static site)
- **TypeScript**: Added `vite-env.d.ts` for proper Vite environment variable typing

## System Architecture

### Frontend Architecture
The application follows a modern React architecture using:
- **React 18** with TypeScript for type safety and modern development patterns
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing
- **TanStack React Query** for server state management and caching
- **Tailwind CSS** with **shadcn/ui** component library for consistent, accessible UI components
- **Class Variance Authority (CVA)** for type-safe component styling

### Component Structure
The application is organized into several key component categories:
- **Layout Components**: Header, Footer, Hero section with navigation and branding
- **Product Components**: ProductGrid for displaying categorized products with pricing and discounts
- **Cart System**: CartSidebar for shopping cart management with local storage persistence
- **Authentication**: AuthModal for user login/signup flows
- **Checkout**: CheckoutModal for order processing and payment redirection
- **UI Components**: Comprehensive shadcn/ui component library for forms, dialogs, toasts, and other interface elements

### State Management
The application uses multiple state management approaches:
- **React Query** for server state and API data fetching
- **Custom Hooks** for cart management (`use-cart`), authentication (`use-auth`), and internationalization (`use-language`)
- **Local Storage** for cart persistence and order history
- **Context API** for toast notifications and component communication

### Authentication System
Authentication is handled through Firebase Auth:
- **Firebase SDK Integration** for user management
- **Email/Password Authentication** with user profile management
- **Real-time Auth State** monitoring with automatic UI updates
- **Protected Routes** and conditional rendering based on authentication status

### Internationalization
Multi-language support for European markets:
- **Language Detection** based on user IP or browser settings
- **Supported Languages**: English, French, Polish, Spanish, Portuguese, Italian, Hungarian
- **Dynamic Language Switching** with persistent user preferences
- **Localized Product Categories** and interface text

### Data Management
Product and order data is managed client-side:
- **Static Product Database** with comprehensive product information including pricing, discounts, and features
- **Category-based Organization** for smartphones, watches, sneakers, gadgets, and mobility products
- **Local Storage Integration** for cart persistence and order history
- **Order Reference Generation** for payment processing and tracking

### Payment Processing
External payment integration through MaxelPay:
- **Redirect-based Payment Flow** to external payment processor
- **Order Reference System** for tracking transactions
- **Multiple Payment Method Support** (MaxelPay active, others in development)
- **Customer Information Collection** for order fulfillment

## External Dependencies

### Authentication Services
- **Firebase Authentication** for user registration, login, and session management
- **Firebase SDK** (@firebase/auth) for client-side authentication flows

### Payment Processing
- **MaxelPay** as the primary payment processor with redirect-based integration
- **Future Payment Methods**: PayU, Transak, and Guardarian planned for implementation

### Development and Build Tools
- **Vite** for development server and production builds with React plugin support
- **Replit Integration** with development banner and error handling plugins
- **TypeScript** for type checking and enhanced developer experience
- **ESBuild** for server-side bundle generation

### UI and Styling
- **Tailwind CSS** for utility-first styling with custom design system
- **shadcn/ui Components** via Radix UI primitives for accessible, customizable components
- **Font Awesome** for consistent iconography throughout the application
- **Google Fonts** (Inter) for typography

### Utility Libraries
- **date-fns** for date manipulation and formatting
- **clsx** and **tailwind-merge** for conditional CSS class management
- **Embla Carousel** for product showcase functionality
- **Wouter** for lightweight routing without React Router overhead

### Backend Infrastructure (Prepared)
While the current implementation is client-only, the architecture includes:
- **Drizzle ORM** with PostgreSQL schema definitions for future server-side features
- **Neon Database** integration configured for potential backend expansion
- **Express.js** server structure prepared for API endpoints
- **Session Management** setup with PostgreSQL session storage