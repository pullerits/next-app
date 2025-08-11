# Claude.md - App Directory

## Directory Overview

The `app/` directory contains the core Next.js App Router structure, implementing the main pages, layouts, and API routes for the e-commerce application. This directory follows Next.js 15 App Router conventions with server and client components.

## Files and Structure

```
app/
├── api/                    # Server-side API routes
│   └── create-payment-intent/
│       └── route.ts       # Stripe Payment Intent API
├── cart/
│   └── page.tsx           # Shopping cart page
├── checkout/
│   └── page.tsx           # Stripe checkout page
├── payment-success/
│   └── page.tsx           # Payment confirmation page
├── products/
│   ├── [id]/
│   │   ├── AddToCart.tsx  # Add to cart component
│   │   └── page.tsx       # Dynamic product detail page
│   └── page.tsx           # Product catalog page
├── favicon.ico            # Site favicon
├── globals.css            # Global styles and CSS variables
├── layout.tsx             # Root layout with providers
└── page.tsx               # Homepage
```

## Core Pages

### Root Layout (`layout.tsx`)
- **Purpose**: Root layout component wrapping all pages
- **Features**: 
  - CartProvider context wrapper
  - Font configuration (Geist Sans & Mono)
  - Global metadata setup
  - Navbar and Footer components
- **Type**: Server Component

### Homepage (`page.tsx`)
- **Purpose**: Landing page with featured products and marketing sections
- **Features**:
  - Promotional banner
  - Hero section
  - Featured products grid (up to 8 products)
  - Marketing sections (ProvenResults, WhyChoose, AsSeenOn)
- **Type**: Async Server Component
- **Data**: Uses `getFeaturedProducts(8)` from Supabase database

### Shopping Cart (`cart/page.tsx`)
- **Purpose**: Cart management interface
- **Features**:
  - Cart item display with quantity controls
  - Order summary with tax calculation
  - Checkout button integration
  - Empty cart state handling
- **Type**: Client Component (uses CartContext)
- **State**: Connected to CartContext for cart management

### Checkout (`checkout/page.tsx`)
- **Purpose**: Stripe payment processing interface
- **Features**:
  - Stripe Elements integration
  - Order summary display
  - Payment form with error handling
  - Empty cart validation
- **Type**: Client Component
- **Dependencies**: Stripe Elements, CartContext

### Payment Success (`payment-success/page.tsx`)
- **Purpose**: Post-payment confirmation page
- **Features**:
  - Success message display
  - Return to home navigation
  - Clean, minimal design
- **Type**: Server Component

### Product Catalog (`products/page.tsx`)
- **Purpose**: Product listing and browsing
- **Features**:
  - Product grid display
  - Product filtering/browsing (UI only - not functional yet)
  - Responsive product cards
- **Type**: Async Server Component
- **Data**: Uses `getProducts()` from Supabase database

### Product Details (`products/[id]/page.tsx`)
- **Purpose**: Individual product detail pages
- **Features**:
  - Dynamic routing with product ID
  - Product image display
  - Product information
  - Add to cart functionality
  - Breadcrumb navigation
- **Type**: Async Server Component
- **Parameters**: Dynamic route parameter `[id]`
- **Data**: Uses `getProductById(id)` from Supabase database

### Add to Cart Component (`products/[id]/AddToCart.tsx`)
- **Purpose**: Product-specific add to cart functionality
- **Features**:
  - Cart integration
  - Loading states
  - Success feedback
- **Type**: Client Component
- **Context**: Uses CartContext

## API Routes

### Payment Intent (`api/create-payment-intent/route.ts`)
- **Purpose**: Server-side Stripe Payment Intent creation
- **Method**: POST
- **Features**:
  - Amount validation
  - Currency handling (default USD)
  - Stripe API integration
  - Error handling
- **Security**: Server-side only, uses secret key

## Global Styles (`globals.css`)
- **Purpose**: Application-wide styling and CSS variables
- **Features**:
  - CSS custom properties for theming
  - Dark/light mode support
  - Font variable definitions
  - Base Tailwind imports
- **Integration**: Imported in root layout

## Component Types and Patterns

### Server Components
- Root layout, homepage, product pages
- Used for static content and data fetching
- Better performance for non-interactive content

### Client Components
- Cart, checkout, interactive elements
- Marked with 'use client' directive
- Required for state management and user interactions

### Async Components
- Product detail pages for dynamic routing
- Handle Promise-based parameters in Next.js 15

## Data Flow

### Product Data
- Real-time data from Supabase database
- Server-side rendering with async data fetching
- Dynamic product catalog with live database queries

### Cart Data
- Global state via CartContext
- localStorage persistence
- Client-side state management

### Payment Data
- Server-side Payment Intent creation
- Client-side form handling via Stripe Elements
- Secure token-based communication

## Integration Points

### Stripe Integration
- Payment Intent API in `/api/create-payment-intent`
- Client-side Elements in checkout page
- Error handling throughout payment flow

### Context Integration
- CartProvider in root layout
- Cart state accessible in all client components
- Persistent cart data across page navigation

### Navigation
- Next.js Link components for client-side routing
- Breadcrumb navigation in product pages
- Responsive navigation in layout components

## Performance Considerations

- **Server Components**: Used where possible for better performance
- **Image Optimization**: Next.js Image component for product images
- **Code Splitting**: Automatic with Next.js App Router
- **Streaming**: Supported through React 19 and Next.js 15