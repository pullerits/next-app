import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder } from '@/lib/orders';
import type { CartItem } from '@/lib/types';
import { env } from '@/lib/env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { paymentIntentId } = await req.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment Intent ID is required' },
        { status: 400 }
      );
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not successful' },
        { status: 400 }
      );
    }

    // Extract order data from payment intent metadata
    const customerEmail = paymentIntent.metadata.customerEmail;
    const cartItemsJson = paymentIntent.metadata.cartItems;

    if (!customerEmail || !cartItemsJson) {
      return NextResponse.json(
        { error: 'Missing order information in payment intent' },
        { status: 400 }
      );
    }

    const cartItems: CartItem[] = JSON.parse(cartItemsJson);
    const total = paymentIntent.amount / 100; // Convert cents to dollars

    // Create shipping address from payment intent
    const shippingAddress = {
      name: paymentIntent.shipping?.name || 'N/A',
      address: {
        line1: paymentIntent.shipping?.address?.line1 || 'N/A',
        line2: paymentIntent.shipping?.address?.line2 || undefined,
        city: paymentIntent.shipping?.address?.city || 'N/A',
        state: paymentIntent.shipping?.address?.state || 'N/A',
        postal_code: paymentIntent.shipping?.address?.postal_code || 'N/A',
        country: paymentIntent.shipping?.address?.country || 'US'
      },
      phone: paymentIntent.shipping?.phone || undefined
    };

    // Create order in database
    const order = await createOrder(
      cartItems,
      total,
      customerEmail,
      shippingAddress,
      paymentIntentId
    );

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order: {
        id: order.id,
        total: order.total,
        status: order.status,
        customerEmail: order.customer_email,
        createdAt: order.created_at
      }
    });

  } catch (error) {
    console.error('Error confirming payment and creating order:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}