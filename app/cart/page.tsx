'use client';

import Link from 'next/link';
import CartButton from '@/components/cart/CartButton';

export default function CartPage() {
  const isCartEmpty = true;

  return (
    <div className="min-h-screen bg-gray-50">
        {isCartEmpty ? (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href="/products">
                <CartButton onClick={() => console.log('Continue shopping')}>
                  Continue Shopping
                </CartButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Shopping Cart
              </h1>
              <p className="text-blue-100">
                Review your items and proceed to checkout
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Cart items will appear here when cart functionality is connected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">$0.00</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">$0.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <CartButton onClick={() => console.log('Checkout')} disabled={true}>
                      Proceed to Checkout
                    </CartButton>
                    
                    <Link href="/products" className="block">
                      <CartButton onClick={() => console.log('Continue shopping')} variant="secondary">
                        Continue Shopping
                      </CartButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}