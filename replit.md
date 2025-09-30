# Luxio - Premium E-Commerce Platform

## Overview

Luxio is a static e-commerce platform built with React and TypeScript, featuring a modern design for selling premium electronics including smartphones, smartwatches, sneakers, smart home gadgets, and urban mobility devices. The application uses a client-side architecture with Firebase authentication and external payment processing through MaxelPay, designed to be fully functional without server-side dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (September 30, 2025)

### Header Navigation Optimization (September 30, 2025 - Latest)
Complete header redesign for improved UX and responsive behavior:

**Navigation Cleanup**
- Removed "Smartphones" dropdown from header navigation (redundant with Premium page)
- Added "Accueil" (Home) link to main navigation for better user orientation
- Streamlined navigation menu to: Accueil, Premium, Watches, Sneakers, Home Gadgets, Mobility
- Improved visual hierarchy and spacing for better readability

**Mobile Responsive Enhancement**
- Implemented hamburger menu (Sheet component) for mobile navigation
- Mobile header now shows: Menu button, Logo, Login/Profile, and Cart (always visible)
- All navigation links accessible through slide-out menu on mobile
- Language selector moved to mobile menu for better space utilization
- Added proper accessibility labels (SheetDescription) for screen readers

**Responsive Optimization**
- Fixed header overflow issues on all screen sizes
- Adjusted breakpoints: hamburger menu now active up to lg (1024px) instead of md (768px)
- Tablets (768px-1024px) now use hamburger menu to prevent text overlap/truncation
- Desktop navigation visible only on large screens (≥1024px) where sufficient space available
- Optimized spacing and element sizing for tablet, mobile, and desktop
- Cart badge and login button remain visible and properly positioned on all devices
- Search bar hidden on mobile/tablet, visible only on large screens (xl breakpoint)
- Proper gap management using Tailwind's responsive utilities

**Technical Implementation**
- Used shadcn Sheet component for mobile menu with smooth animations
- Implemented proper state management for menu open/close
- Navigation functions properly close menu after selection
- All interactive elements have proper test-ids for testing

### Translation System & UI Improvements (September 30, 2025)
Complete internationalization implementation and homepage optimization:

**Translation Enhancements**
- Added missing translation keys to all 7 supported languages (en, fr, es, pt, pl, it, hu)
- New keys: newCollectionAvailable, freeShipping, yearWarranty, securePayment, saveUpTo, fastDelivery, hoursGuaranteed, viewAllSmartphones
- Hero component fully translated - removed all hardcoded Spanish text
- All trust indicators (shipping, warranty, payment, delivery) now properly localized

**Homepage Optimization**
- Modified Home page to display only first 8 smartphones instead of all products
- Added "View All Smartphones" button below smartphone section linking to Premium page
- Improved user experience by reducing initial page load and providing clear navigation
- Maintained variant selectors and product functionality on all displayed items

**Navigation Consistency**
- Verified Premium page uses shared Header component with global navigation
- All pages now have consistent header navigation across the application
- Cart functionality verified to work instantly on both Home and Premium pages

### GSMArena Data Integration
Successfully integrated real smartphone data from GSMArena with professional product images:

**iPhone 17 Series (Complete Lineup)**
- iPhone 17 Pro Max: 4 colors × 3 capacities (256GB/512GB/1TB) = 12 variants
- iPhone 17 Pro: 4 colors × 3 capacities (128GB/256GB/512GB) = 12 variants
- iPhone 17: 5 colors × 3 capacities (128GB/256GB/512GB) = 15 variants
- iPhone 17 Plus: 5 colors × 3 capacities (128GB/256GB/512GB) = 15 variants
- All models include accurate GSMArena pricing, specifications, and features

**Samsung Galaxy S25 Series**
- Galaxy S25 Ultra: 4 colors × 3 capacities (256GB/512GB/1TB) = 12 variants
- Galaxy S25: 7 colors × 3 capacities (128GB/256GB/512GB) = 21 variants
- Titanium finish colors for Ultra model
- Standard colors for S25 model
- Accurate pricing based on GSMArena data

**Professional Product Images**
- Downloaded high-quality stock images for all new smartphone models
- Images stored in `/attached_assets/stock_images/` directory
- All image paths updated in product database
- Proper naming convention: `{brand}_{model}_{variant}_{hash}.jpg`

**Technical Implementation**
- Complete variant matrix system for colors and storage capacities
- Consistent pricing structure across all variants
- GSMArena-sourced specifications and features
- Verified all combinations render correctly in the UI
- No missing variants or incomplete product data

### Additional Smartphone Brands Integration (September 30, 2025)
Successfully added 5 new premium smartphone brands from 2024 with complete variant systems:

**Google Pixel 9 Pro XL** (2024)
- 3 colors (Obsidian, Porcelain, Hazel) × 4 capacities (128GB/256GB/512GB/1TB) = 12 variants
- Google Tensor G4 chipset, 6.8" LTPO OLED 120Hz
- 50MP triple camera system with 7 years of updates
- Pricing from €989 to €1529

**Motorola Razr 50 Ultra** (2024)
- 4 colors (Midnight Blue, Spring Green, Hot Pink, Peach Fuzz) × 2 capacities (256GB/512GB) = 8 variants
- Snapdragon 8s Gen 3, 6.9" foldable AMOLED 165Hz
- Largest external display (4.0") on flip phone with IPX8 water resistance
- Pricing from €899 to €1049

**Poco F6 Pro** (2024)
- 2 colors (Black, White) × 3 capacities (256GB/512GB/1TB) = 6 variants
- Snapdragon 8 Gen 2, 6.67" WQHD+ AMOLED 120Hz
- Flagship killer with 120W HyperCharge
- Pricing from €324 to €540

**Oppo Find X7 Ultra** (2024)
- 3 colors (Ocean Blue, Sepia Brown, Tailored Black) × 2 capacities (256GB/512GB) = 6 variants
- Snapdragon 8 Gen 3, 6.82" LTPO AMOLED 120Hz
- Quad main camera system with Hasselblad tuning
- Pricing from €752 to €896

**Vivo X100 Pro** (2024)
- 3 colors (Startrail Blue, Sunset Orange, Asteroid Black) × 3 capacities (256GB/512GB/1TB) = 9 variants
- MediaTek Dimensity 9300, 6.78" LTPO AMOLED 120Hz
- 50MP triple ZEISS camera system with 100W fast charging
- Pricing from €810 to €1080

**Implementation Notes:**
- All models use the same variant matrix system as iPhone 17 series
- Temporary image paths set to `/attached_assets/smartphones/*.jpg` (awaiting user-provided photos)
- Total of 41 new product variants added across 5 brands
- All specifications sourced from GSMArena and official manufacturer data
- Pricing includes 10% discount applied across all variants

## Replit Setup (September 30, 2025)

This project has been successfully configured to run on Replit from a GitHub import:

### Current Configuration
- **Development**: Frontend runs on port 5000 using Vite dev server with allowedHosts enabled for Replit proxy
- **Workflow**: "Frontend" workflow configured to run `cd frontend && npm run dev` on port 5000 with webview output
- **Production Build**: Frontend builds to `/dist` folder (`npm run build`)
- **Production Serve**: Uses `npx serve` to host static files on port 5000 (`npm run start`)
- **Deployment**: Configured for Replit's autoscale deployment (static site)
- **Host Configuration**: Vite dev server configured with `host: '0.0.0.0'` and `allowedHosts: true` for Replit proxy compatibility

### Latest Import Setup (September 30, 2025 14:45 UTC - Fresh Clone) ✅
Fresh clone from GitHub successfully configured and running:
1. ✅ Installed frontend dependencies with `cd frontend && npm install` (418 packages installed in 38s)
2. ✅ Verified Vite configuration has correct Replit settings (host: '0.0.0.0', port: 5000, allowedHosts: true) ✓
3. ✅ Configured "Frontend" workflow on port 5000 with webview output type
4. ✅ Workflow started successfully - Vite dev server ready in 289ms ✓
5. ✅ Tested application - homepage displays correctly with hero section, navigation, product grid, and all UI elements ✓
6. ✅ Deployment configured for autoscale (static site) with build (`npm run build`) and start (`npm run start`) commands ✓
7. ✅ Backend API handlers available but not needed (optional Express wrapper for Vercel-style handlers)
8. ✅ Import completed successfully - application fully functional and ready to use ✓

**What was configured:**
- Frontend dependencies installed in `/frontend/node_modules`
- Vite dev server running with proper Replit proxy configuration
- Deployment set up for autoscale (static site hosting)
- All existing features and data preserved from previous setup

### Project Structure
- `/frontend/` - React + Vite application with all source code
- `/api/` - Serverless API handlers (Vercel format, optional for Replit)
- `/server/` - Express server wrapper for API handlers (optional for Replit)
- `/dist/` - Production build output (generated by `npm run build`)

### Environment Variables (Optional)
The application works with default Firebase demo values. For production use, configure:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

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