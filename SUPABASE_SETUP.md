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

## 6. Database Schema Setup

### Use the Production-Ready Improved Schema

This project uses the enterprise-grade schema from `IMPROVED_SCHEMA.md` which includes:
- ✅ Advanced constraints and validation
- ✅ Performance indexes 
- ✅ Row Level Security policies
- ✅ Auto-updating timestamps
- ✅ Stock management triggers
- ✅ Sample data included

### How to Set Up the Schema:

1. **Open your Supabase project dashboard**
2. **Navigate to the SQL Editor** (left sidebar)
3. **Open the `IMPROVED_SCHEMA.md` file** in this project
4. **Copy the ENTIRE SQL block** (everything between the ```sql markers - from line 7 to line 354)
5. **Paste it ALL into the Supabase SQL Editor**
6. **Click "Run"** - Supabase will execute all statements automatically
7. **Wait 10-15 seconds** for completion
8. **Check the Messages tab** to verify all statements executed successfully

### What This Creates:
- Complete database schema with all tables
- 4 sample products ready for testing  
- Production-ready constraints and indexes
- Guest checkout functionality
- Order management system

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

## 8. Verify Setup

After running the improved schema, verify everything is working:

1. **Check Tables**: Go to "Table Editor" in Supabase - you should see 4 tables
2. **Check Sample Data**: Open the "products" table - you should see 4 sample products
3. **Test Queries**: Try running `SELECT * FROM products;` in SQL Editor

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
3. **Run the improved schema** (step 6) - copy/paste entire SQL block from `IMPROVED_SCHEMA.md`
4. **Verify setup** (step 8) - check that tables and sample data were created
5. **Test your application** - products should now load from the database

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