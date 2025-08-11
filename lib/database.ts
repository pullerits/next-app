import { supabase } from './supabase';
import type { Product, DatabaseProduct } from './types';

export async function getProducts(): Promise<Product[]> {
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
    .eq('in_stock', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  // Transform database format to app format
  return data?.map(transformDatabaseProduct) || [];
}

export async function getProductById(id: string): Promise<Product | null> {
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

  return data ? transformDatabaseProduct(data) : null;
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
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
    .eq('in_stock', true)
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data?.map(transformDatabaseProduct) || [];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
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
    .eq('category', category)
    .eq('in_stock', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data?.map(transformDatabaseProduct) || [];
}

// Transform database product to app product format
function transformDatabaseProduct(dbProduct: DatabaseProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description || '',
    price: dbProduct.price,
    originalPrice: dbProduct.original_price || undefined,
    category: dbProduct.category,
    tags: dbProduct.tags || [],
    inStock: dbProduct.in_stock,
    stockQuantity: dbProduct.stock_quantity,
    rating: dbProduct.rating || undefined,
    reviewCount: dbProduct.review_count || 0,
    images: dbProduct.images || ['/placeholder.svg'],
    features: dbProduct.features || [],
    specifications: dbProduct.specifications || {},
    variants: dbProduct.product_variants?.map(v => ({
      id: v.id,
      name: v.name,
      value: v.value,
      inStock: v.in_stock
    })) || []
  };
}