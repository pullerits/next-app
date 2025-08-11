'use client';

import Link from 'next/link';
import CartButton from '@/components/cart/CartButton';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/cart/CartItem';

export default function CartPage() {
  const { items, total } = useCart();
  const isCartEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-transparent py-8">
      {isCartEmpty ? (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-10">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any items yet.</p>
            <Link href="/products">
              <CartButton onClick={() => console.log('Continue shopping')}>
                Continue Shopping
              </CartButton>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-center gap-3 text-white/80 text-sm">
            <span className="px-2 py-1 rounded-md bg-white/20 border border-white/10 text-white">Cart</span>
            <span>→</span>
            <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10">Checkout</span>
            <span>→</span>
            <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10">Confirm</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-500 text-sm mt-1">Review your items and adjust quantities before checkout.</p>
                <div className="mt-4 divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="text-gray-900">${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 text-gray-900">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link href="/checkout">
                    <CartButton className="w-full" onClick={() => console.log('Checkout')} disabled={isCartEmpty}>
                      Proceed to Checkout
                    </CartButton>
                  </Link>
                  <div className="text-center">
                    <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900">
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}