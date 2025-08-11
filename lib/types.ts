export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  rating?: number;
  reviewCount?: number;
  variants?: ProductVariant[];
  features?: string[];
  specifications?: Record<string, string | number | boolean>;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

export interface Order {
  id: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_intent_id: string | null;
  customer_email: string | null;
  shipping_address: ShippingAddress | null;
  billing_address: ShippingAddress | null;
  created_at: string;
  updated_at: string;
}

// Database-specific types
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
  specifications: Record<string, string | number | boolean> | null;
  created_at: string;
  updated_at: string;
  product_variants?: DatabaseProductVariant[];
}

export interface DatabaseProductVariant {
  id: string;
  name: string;
  value: string;
  in_stock: boolean;
}

export interface DatabaseOrder {
  id: string;
  total: number;
  status: string;
  payment_intent_id: string | null;
  customer_email: string | null;
  shipping_address: ShippingAddress | null;
  billing_address: ShippingAddress | null;
  created_at: string;
  updated_at: string;
}