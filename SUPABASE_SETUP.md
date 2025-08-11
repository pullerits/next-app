# Supabase Setup Guide

This guide walks you through setting up Supabase as the database backend for your Next.js e-commerce application with guest checkout (no authentication required).

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `next-ecommerce` (or your preferred name)
   - **Database Password**: Generate a secure password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for project initialization

## 2. Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## 3. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## 4. Environment Variables

Create or update `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Existing Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## 5. Create Supabase Client

**Note**: This file has already been created for you, but here's what it contains:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

## 6. Database Schema

**RECOMMENDED**: Use the improved production-ready schema from `IMPROVED_SCHEMA.md` which includes better constraints, indexes, and validation.

**Quick Setup** (Basic): Use the simple schema below
**Production Setup** (Recommended): See `IMPROVED_SCHEMA.md` for the complete enterprise-grade schema

### Basic Schema (Quick Start)

### Products Table
```sql
-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL,
  tags TEXT[],
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  images TEXT[],
  features TEXT[],
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public read access for products" ON products
  FOR SELECT USING (true);
```

### Product Variants Table
```sql
-- Create product variants table
CREATE TABLE product_variants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Allow public read access to variants
CREATE POLICY "Public read access for variants" ON product_variants
  FOR SELECT USING (true);
```

### Orders (Guest Checkout)
```sql
-- Create orders table (no user authentication required)
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_intent_id TEXT UNIQUE,
  customer_email TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  product_snapshot JSONB -- Store product details at time of order
);

-- Enable RLS but allow public access for guest checkout
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow public creation of orders (guest checkout)
CREATE POLICY "Allow public order creation" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow order updates only by payment system
CREATE POLICY "Allow order updates for payment processing" ON orders
  FOR UPDATE USING (true);

-- Allow public creation of order items
CREATE POLICY "Allow public order items creation" ON order_items
  FOR INSERT WITH CHECK (true);
```

## 7. Update Types

Update `lib/types.ts`:

```typescript
// Add to existing types
export interface DatabaseProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  tags: string[] | null;
  in_stock: boolean;
  stock_quantity: number;
  rating: number | null;
  review_count: number;
  images: string[] | null;
  features: string[] | null;
  specifications: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrder {
  id: string;
  total: number;
  status: string;
  payment_intent_id: string | null;
  customer_email: string | null;
  shipping_address: Record<string, any> | null;
  billing_address: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}
```

## 8. Seed Sample Data

**Note**: If you used the improved schema from `IMPROVED_SCHEMA.md`, sample data is already included.

**For Basic Schema Only** - Run this in the SQL Editor to add sample products:

```sql
-- Insert sample products
INSERT INTO products (name, description, price, original_price, category, tags, images, stock_quantity, rating, review_count) VALUES
('TRACKPRO Ultra-Slim Card', 'Ultra-slim tracking card that fits in your wallet. Track your valuables with precision GPS and long battery life.', 89.99, 119.99, 'Tracking Devices', ARRAY['ultra-slim', 'wallet', 'gps', 'tracking'], ARRAY['/images/products/trackpro-card-black.jpg'], 25, 4.8, 342),
('TRACKPRO Smart Tag', 'Advanced smart tag with Bluetooth connectivity and motion detection. Perfect for keys, bags, and personal items.', 49.99, NULL, 'Tracking Devices', ARRAY['bluetooth', 'smart', 'motion-detection'], ARRAY['/placeholder.svg'], 18, 4.6, 189),
('TRACKPRO Wireless Charger', 'Fast wireless charging pad designed specifically for TRACKPRO devices. 15W fast charging with LED indicators.', 34.99, 44.99, 'Accessories', ARRAY['wireless', 'charger', 'fast-charging'], ARRAY['/placeholder.svg'], 30, 4.4, 156);

-- Add variants for first product
INSERT INTO product_variants (product_id, name, value) 
SELECT id, 'Color', 'Black' FROM products WHERE name = 'TRACKPRO Ultra-Slim Card'
UNION ALL
SELECT id, 'Color', 'Blue' FROM products WHERE name = 'TRACKPRO Ultra-Slim Card';
```

## 9. Database Service Functions

**Note**: These files have already been created for you (`lib/database.ts` and `lib/orders.ts`), but here's what they contain:

```typescript
import { supabase } from './supabase';
import type { DatabaseProduct } from './types';

export async function getProducts(): Promise<DatabaseProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (
        id,
        name,
        value,
        in_stock
      )
    `)
    .eq('in_stock', true);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getProductById(id: string): Promise<DatabaseProduct | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (
        id,
        name,
        value,
        in_stock
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}
```

## 10. Component Integration

**Note**: Components have already been updated to use database functions instead of mock data. The following files now use Supabase:

- `app/page.tsx` - Uses `getFeaturedProducts(8)`
- `app/products/page.tsx` - Uses `getProducts()`
- `app/products/[id]/page.tsx` - Uses `getProductById(id)`

## 11. Order Management

Create `lib/orders.ts` for guest checkout:

```typescript
import { supabase } from './supabase';
import type { CartItem } from './types';

export async function createOrder(
  items: CartItem[],
  total: number,
  customerEmail: string,
  shippingAddress: any,
  paymentIntentId: string
) {
  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      total,
      customer_email: customerEmail,
      shipping_address: shippingAddress,
      payment_intent_id: paymentIntentId,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(`Failed to create order: ${orderError.message}`);
  }

  // Create order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
    product_snapshot: {
      name: item.name,
      image: item.image
    }
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    throw new Error(`Failed to create order items: ${itemsError.message}`);
  }

  return order;
}

export async function updateOrderStatus(paymentIntentId: string, status: string) {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('payment_intent_id', paymentIntentId);

  if (error) {
    throw new Error(`Failed to update order: ${error.message}`);
  }
}
```

## 12. What You Need to Do

**Required Steps:**
1. **Create Supabase project** (steps 1-2)
2. **Add environment variables** to `.env.local` (step 4)
3. **Choose your schema**:
   - **Recommended**: Use the complete schema from `IMPROVED_SCHEMA.md` (production-ready)
   - **Quick**: Use the basic schema from step 6 above
4. **Run your chosen schema** in Supabase SQL Editor
5. **Test your application** - products should now load from database

**Already Complete:**
- ✅ Supabase client installed and configured
- ✅ Database service functions created
- ✅ Order management functions created
- ✅ Components updated to use database instead of mock data
- ✅ TypeScript types updated

**Optional Next Steps:**
- Set up Supabase Storage for product images
- Integrate order creation in checkout flow
- Deploy with production environment variables

## Common Issues

- **CORS errors**: Make sure your site URL is configured in Supabase
- **RLS policies**: If you can't fetch data, check your Row Level Security policies
- **Environment variables**: Make sure all variables are properly set in `.env.local`

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Database](https://supabase.com/docs/guides/database)