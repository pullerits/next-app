# CLAUDE.md - Next.js E-commerce Application

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive Next.js 15 e-commerce application built with React 19, TypeScript, and Tailwind CSS 4. The project implements a full-featured online store with Stripe payment integration, featuring a modern shopping cart system, product catalog, and secure checkout process. The application follows the App Router architecture introduced in Next.js 13+ with the `app/` directory structure.

### Key Technologies
- **Next.js 15** with App Router architecture
- **React 19** with modern hooks and patterns
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling with custom theming
- **Supabase** for database and backend services (@supabase/supabase-js)
- **Stripe** for payment processing (@stripe/stripe-js, @stripe/react-stripe-js, stripe)
- **Turbopack** for fast development builds

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

- **App Router**: Uses Next.js App Router with `app/` directory structure
- **Styling**: Tailwind CSS 4 with custom CSS variables for theming
- **Fonts**: Uses Geist Sans and Geist Mono fonts via `next/font/google`
- **TypeScript**: Configured with strict mode and path aliases (`@/*` maps to root)
- **Database**: Supabase PostgreSQL with Row Level Security
- **State Management**: React Context (CartContext) for shopping cart functionality
- **Payment Processing**: Stripe integration with Elements and Payment Intents
- **Component Architecture**: Feature-based organization with reusable components

## Folder Structure

```
next-app/
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # Server-side API routes
│   │   └── create-payment-intent/ # Stripe payment processing
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Stripe checkout integration
│   ├── payment-success/   # Payment confirmation page
│   ├── products/          # Product catalog and details
│   │   └── [id]/         # Dynamic product pages
│   ├── layout.tsx         # Root layout with CartProvider
│   ├── page.tsx           # Homepage with featured products
│   └── globals.css        # Global styles and CSS variables
├── components/            # Reusable React components
│   ├── cart/             # CartButton, CartItem components
│   ├── layout/           # Navbar, Footer components
│   ├── products/         # ProductCard, ProductGrid components
│   ├── sections/         # Homepage sections (Hero, ProvenResults, etc.)
│   └── checkout-form.tsx # Stripe Elements payment form
├── contexts/             # React Context providers
│   └── CartContext.tsx   # Shopping cart state management
├── lib/                  # Utility functions and configurations
│   ├── supabase.ts       # Supabase client configuration
│   ├── database.ts       # Database service functions
│   ├── orders.ts         # Order management for guest checkout
│   ├── stripe.ts         # Stripe configuration and utilities
│   └── types.ts          # TypeScript type definitions
├── public/               # Static assets
│   └── images/           # Product images, icons, and backgrounds
└── Configuration Files    # package.json, tsconfig.json, etc.
```

## Core Features

### E-commerce Functionality
- **Product Catalog**: Browse products with detailed information and images (Supabase database)
- **Shopping Cart**: Add/remove items with localStorage persistence
- **Checkout Process**: Secure Stripe payment integration with error handling
- **Order Management**: Guest checkout with order tracking via payment intents
- **Responsive Design**: Mobile-first responsive layout with Tailwind CSS

### Payment Integration
- **Stripe Elements**: Pre-built payment form components
- **Payment Intents**: Secure server-side payment processing
- **Error Handling**: Comprehensive payment error management
- **Success Flow**: Post-payment confirmation and cart clearing

## Key Files

### Core Application Files
- `app/layout.tsx` - Root layout with CartProvider, Navbar, Footer, font configuration, and metadata
- `app/page.tsx` - Homepage with featured products and marketing sections
- `app/globals.css` - Global styles with dark/light theme CSS variables
- `contexts/CartContext.tsx` - Shopping cart state management with localStorage
- `lib/supabase.ts` - Supabase client configuration for database access
- `lib/database.ts` - Product fetching and database service functions
- `lib/orders.ts` - Order management and guest checkout functionality
- `lib/stripe.ts` - Stripe configuration, utilities, and amount formatting

### Page Components
- `app/cart/page.tsx` - Shopping cart with item management and checkout button
- `app/checkout/page.tsx` - Stripe Elements checkout form integration
- `app/products/page.tsx` - Product catalog listing page (uses database)
- `app/products/[id]/page.tsx` - Individual product detail pages (uses database)
- `app/payment-success/page.tsx` - Post-payment confirmation page
- `app/page.tsx` - Homepage with featured products (uses database)

### API Routes
- `app/api/create-payment-intent/route.ts` - Stripe Payment Intent creation endpoint

### Component Libraries
- `components/cart/` - Cart-related UI components (CartButton, CartItem)
- `components/products/` - Product display components (ProductCard, ProductGrid)
- `components/layout/` - Layout components (Navbar, Footer)
- `components/sections/` - Homepage marketing sections

### Configuration Files
- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript configuration with `@/*` path alias
- `package.json` - Dependencies including Stripe packages
- `.env.local` - Environment variables for Stripe API keys

## Styling System

The project uses Tailwind CSS 4 with a custom theming system:
- CSS variables for `--background` and `--foreground` colors
- Automatic dark mode support via `prefers-color-scheme`
- Custom font variables integrated with theme system
- Component-level styling with utility classes
- Responsive design patterns for mobile-first development

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key for client-side
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key for server-side operations
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key for client-side
- `STRIPE_SECRET_KEY` - Stripe secret key for server-side operations
- `STRIPE_WEBHOOK_SECRET` - For webhook verification (future implementation)

## State Management

### CartContext (`contexts/CartContext.tsx`)
- **Purpose**: Global shopping cart state management
- **Features**: Add/remove items, quantity updates, localStorage persistence
- **Types**: CartItem interface with id, name, price, image, quantity
- **Methods**: addItem, removeItem, updateQuantity, clearCart

### Local State
- Component-level state for UI interactions (loading states, form handling)
- Stripe Elements state for payment form management

## Development Patterns

### Component Organization
- **Feature-based**: Components grouped by functionality (cart/, products/, etc.)
- **Atomic Design**: Reusable components with consistent prop interfaces
- **Client/Server Separation**: Clear distinction with 'use client' directives

### Type Safety
- **Strict TypeScript**: All components and functions properly typed
- **Interface Definitions**: Centralized in `lib/types.ts`
- **Stripe Types**: Leveraging official Stripe TypeScript definitions

### Error Handling
- **Payment Errors**: Comprehensive Stripe error handling in checkout
- **API Errors**: Proper error responses in API routes
- **User Feedback**: Clear error messages and loading states

## Important Implementation Notes

1. **Database Integration**: Uses Supabase PostgreSQL with Row Level Security
2. **Guest Checkout**: No user authentication required - orders linked by email and payment intent
3. **Cart Persistence**: Cart data persists in localStorage across sessions
4. **Payment Security**: All sensitive operations handled server-side
5. **Mobile Responsive**: All components optimized for mobile devices
6. **SEO Friendly**: Proper metadata and semantic HTML structure
7. **Performance**: Optimized with Next.js Image component and lazy loading
8. **Real-time Data**: All product data fetched from Supabase database in real-time