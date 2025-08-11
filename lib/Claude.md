# Claude.md - Lib Directory

## Directory Overview

The `lib/` directory contains utility functions, configuration files, type definitions, and shared logic that supports the application's functionality. This directory serves as the foundation for data management, external service integration, and type safety.

## Files

```
lib/
├── supabase.ts          # Supabase client configuration
├── database.ts          # Database service functions for products
├── orders.ts            # Order management for guest checkout
├── mock-data.ts         # Sample product data (temporary, for development)
├── stripe.ts            # Stripe configuration and utility functions
└── types.ts             # TypeScript type definitions
```

## Supabase Client (`supabase.ts`)

### Purpose
Centralizes Supabase client configuration for database access throughout the application.

### File Type
**Configuration Module** - Supabase client setup

### Key Functions

#### Client Initialization
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
```

### Integration Points
- **Client-side**: Public operations like product fetching
- **Server-side**: Admin operations with service role key
- **Environment**: Uses environment variables for configuration

## Database Services (`database.ts`)

### Purpose
Provides database service functions for product management and data fetching from Supabase.

### File Type
**Service Module** - Database operations and data transformation

### Key Functions

#### Product Operations
```typescript
export async function getProducts(): Promise<Product[]>
export async function getProductById(id: string): Promise<Product | null>
export async function getFeaturedProducts(limit: number): Promise<Product[]>
export async function getProductsByCategory(category: string): Promise<Product[]>
```

### Features
- **Data Transformation**: Converts database format to application format
- **Error Handling**: Graceful error management with fallbacks
- **Type Safety**: Full TypeScript support with proper interfaces
- **Performance**: Optimized queries with proper indexing

### Integration Points
- **Components**: Replace mock data imports with database functions
- **Server Components**: Use in Next.js server components for SSR
- **API Routes**: Use in API endpoints for data fetching

## Order Management (`orders.ts`)

### Purpose
Handles order creation and management for guest checkout without user authentication.

### File Type
**Service Module** - Order operations for guest checkout

### Key Functions

#### Order Operations
```typescript
export async function createOrder(
  items: CartItem[],
  total: number,
  customerEmail: string,
  shippingAddress: ShippingAddress,
  paymentIntentId: string
): Promise<DatabaseOrder>

export async function updateOrderStatus(
  paymentIntentId: string, 
  status: string
): Promise<void>

export async function getOrderByPaymentIntent(
  paymentIntentId: string
): Promise<DatabaseOrder | null>
```

### Features
- **Guest Checkout**: No user authentication required
- **Payment Integration**: Links orders with Stripe Payment Intents
- **Address Storage**: Stores shipping and billing addresses
- **Order Tracking**: Status updates and order retrieval

### Integration Points
- **Checkout Flow**: Creates orders during payment processing
- **Payment Success**: Updates order status after payment
- **Admin Operations**: Order management and fulfillment

## Mock Data (`mock-data.ts`)

### Purpose
Provides sample product data for development, testing, and demonstration purposes. **TEMPORARY** - will be replaced by database functions once Supabase is fully integrated.

### File Type
**Data Module** - Exports structured product data

### Status
**Deprecated** - This file contains temporary mock data with fixed duplicate key issues. Once Supabase is set up, components should use database functions from `database.ts` instead.

### Key Features

#### Product Data Structure
- **Complete Product Information**: Full product details including images, pricing, descriptions
- **Realistic Data**: Authentic-looking product information for demo purposes
- **Consistent Format**: Standardized product object structure
- **Image References**: Product image paths and references

#### Data Organization
```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  specifications?: Record<string, string>;
}

export const mockProducts: Product[] = [
  // Array of product objects
];
```

#### Data Categories
- **Product Variants**: Different product types and categories
- **Pricing Tiers**: Various price points for testing
- **Image Assets**: Multiple product images per item
- **Rich Descriptions**: Detailed product information

### Usage Examples

#### Product Listing
```typescript
import { mockProducts } from '@/lib/mock-data';

// Get all products
const allProducts = mockProducts;

// Get featured products
const featuredProducts = mockProducts.slice(0, 8);

// Get by category
const categoryProducts = mockProducts.filter(p => p.category === 'electronics');
```

#### Product Detail
```typescript
// Find specific product
const product = mockProducts.find(p => p.id === productId);
```

### Data Migration Strategy
- **Database Ready**: Structure compatible with database schemas
- **API Integration**: Easy migration to API-based data
- **CMS Compatible**: Structure suitable for headless CMS integration
- **Type Safety**: Full TypeScript support for smooth transitions

## Stripe Configuration (`stripe.ts`)

### Purpose
Centralizes Stripe integration configuration, utility functions, and helper methods for payment processing throughout the application.

### File Type
**Configuration Module** - Stripe client setup and utilities

### Key Functions

#### Stripe Client Initialization
```typescript
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};
```

#### Amount Formatting Utilities
```typescript
// Display formatting for user interfaces
export const formatAmountForDisplay = (amount: number, currency: string): string => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
};

// Stripe API formatting (converts dollars to cents)
export const formatAmountForStripe = (amount: number, currency: string): number => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
};
```

### Configuration Features

#### Environment Integration
- **API Key Management**: Secure environment variable usage
- **Client-side Keys**: Public key configuration for Stripe Elements
- **Server-side Keys**: Secret key handling for API routes

#### Internationalization Support
- **Currency Handling**: Multi-currency support and formatting
- **Locale Support**: Regional number formatting
- **Zero-decimal Currencies**: Proper handling of currencies without decimals

#### Error Handling
- **Key Validation**: Environment variable validation
- **Client Initialization**: Graceful handling of Stripe client creation
- **Network Resilience**: Error handling for Stripe service connectivity

### Integration Points

#### Client-side Usage
```typescript
// In React components
import { getStripe } from '@/lib/stripe';

const stripe = await getStripe();
// Use with Stripe Elements
```

#### Server-side Usage
```typescript
// In API routes
import { formatAmountForStripe } from '@/lib/stripe';

const amount = formatAmountForStripe(total, 'usd');
// Use with Stripe API calls
```

#### Display Usage
```typescript
// In components
import { formatAmountForDisplay } from '@/lib/stripe';

const displayPrice = formatAmountForDisplay(product.price, 'usd');
// Show formatted price to users
```

## Type Definitions (`types.ts`)

### Purpose
Centralized TypeScript type definitions and interfaces that ensure type safety and consistency across the entire application.

### File Type
**Type Module** - TypeScript definitions and interfaces

### Core Type Categories

#### Product Types
```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  specifications?: Record<string, string>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
}
```

#### Cart Types
```typescript
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
```

#### User Types
```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

#### Order Types
```typescript
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}
```

#### API Types
```typescript
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### Stripe Types
```typescript
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}
```

### Type Utilities

#### Generic Types
```typescript
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

#### Form Types
```typescript
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}
```

### Integration Benefits

#### Type Safety
- **Compile-time Validation**: Catch errors before runtime
- **IntelliSense Support**: Better development experience
- **Refactoring Safety**: Safe code refactoring with type checking
- **Documentation**: Types serve as inline documentation

#### Consistency
- **Standardized Interfaces**: Consistent data structures
- **Shared Vocabulary**: Common type definitions across components
- **Contract Enforcement**: API contract validation
- **Team Alignment**: Shared understanding of data structures

#### Maintenance
- **Centralized Changes**: Single source of truth for types
- **Easy Updates**: Change types in one location
- **Backward Compatibility**: Manage type evolution
- **Migration Support**: Facilitate data structure changes

## Directory Integration

### Cross-directory Usage
- **Components**: Import types for prop definitions
- **Pages**: Use types for data handling and API integration
- **API Routes**: Type API request and response data
- **Context**: Type state and action definitions

### Development Workflow
- **Type-first Development**: Define types before implementation
- **Iterative Refinement**: Evolve types as features develop
- **Documentation**: Types document expected data structures
- **Testing**: Use types for test data and mock generation

### Performance Considerations
- **Zero Runtime Cost**: TypeScript types removed during compilation
- **Development Experience**: Enhanced IDE support and error catching
- **Bundle Size**: No impact on production bundle size
- **Build Performance**: Optimized TypeScript compilation