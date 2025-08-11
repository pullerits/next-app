'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/checkout-form';

export default function CheckoutPage() {
  const { total, items } = useCart();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const finalAmount = total * 1.08; // Including 8% tax

  // Create payment intent when email is provided and cart has items
  useEffect(() => {
    if (total > 0 && customerEmail && customerEmail.includes('@')) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: finalAmount,
          customerEmail,
          cartItems: items
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.client_secret) {
            setClientSecret(data.client_secret);
            setPaymentIntentId(data.payment_intent_id);
            setIsFormValid(true);
          }
        })
        .catch((error) => {
          console.error('Error creating payment intent:', error);
          setIsFormValid(false);
        });
    } else {
      setClientSecret('');
      setPaymentIntentId('');
      setIsFormValid(false);
    }
  }, [finalAmount, total, customerEmail, items]);

  const appearance = {
    theme: 'stripe' as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Your cart is empty</h1>
        <p className="text-white/70 mb-6">Add some items to your cart before checking out.</p>
        <Link href="/products" className="inline-block bg-white text-gray-900 px-5 py-2 rounded-md border border-gray-200 soft-shadow hover:shadow-md">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-3 text-white/80 text-sm">
          <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10">Cart</span>
          <span>→</span>
          <span className="px-2 py-1 rounded-md bg-white/20 border border-white/10 text-white">Checkout</span>
          <span>→</span>
          <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10">Confirm</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Billing & Payment */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900">Billing & Payment</h1>
              <p className="text-gray-500 text-sm mt-1">Secure checkout. We use industry‑standard encryption.</p>

              {/* Email */}
              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">We’ll send your receipt and updates here.</p>
              </div>

              {/* Payment */}
              <div className="mt-6">
                {clientSecret && isFormValid ? (
                  <Elements options={options} stripe={getStripe()}>
                    <CheckoutForm paymentIntentId={paymentIntentId} />
                  </Elements>
                ) : (
                  <div className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-md p-4">
                    Enter a valid email address to continue to payment.
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-500">
                <div className="rounded-md border border-gray-200 p-2 text-center">256‑bit SSL</div>
                <div className="rounded-md border border-gray-200 p-2 text-center">PCI‑DSS Compliant</div>
                <div className="rounded-md border border-gray-200 p-2 text-center">30‑Day Returns</div>
                <div className="rounded-md border border-gray-200 p-2 text-center">Support 24/7</div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Order Summary</h2>

              {/* Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="h-14 w-14 rounded-md object-cover border border-gray-200" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 text-gray-900">
                  <span>Total</span>
                  <span>${finalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="mt-6 rounded-md bg-green-50 border border-green-200 p-3 text-xs text-green-800">
                100‑day money‑back guarantee. Free returns if you are not satisfied.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}