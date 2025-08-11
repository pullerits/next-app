import { supabase } from './supabase';
import type { CartItem, ShippingAddress as TypesShippingAddress } from './types';

export interface DatabaseOrder {
  id: string;
  total: number;
  status: string;
  payment_intent_id: string | null;
  customer_email: string | null;
  shipping_address: TypesShippingAddress | null;
  billing_address: TypesShippingAddress | null;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  phone?: string;
}

export async function createOrder(
  items: CartItem[],
  total: number,
  customerEmail: string,
  shippingAddress: ShippingAddress,
  paymentIntentId: string
): Promise<DatabaseOrder> {
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

export async function updateOrderStatus(paymentIntentId: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('payment_intent_id', paymentIntentId);

  if (error) {
    throw new Error(`Failed to update order: ${error.message}`);
  }
}

export async function getOrderByPaymentIntent(paymentIntentId: string): Promise<DatabaseOrder | null> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('payment_intent_id', paymentIntentId)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data;
}

export async function getOrderWithItems(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        quantity,
        price,
        product_snapshot,
        products (
          id,
          name,
          images
        )
      )
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error fetching order with items:', error);
    return null;
  }

  return data;
}