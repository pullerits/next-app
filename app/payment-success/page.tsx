'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface OrderInfo {
  id: string;
  total: number;
  status: string;
  customerEmail: string;
  createdAt: string;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent');
    
    if (!paymentIntentId) {
      setError('No payment information found');
      setIsLoading(false);
      return;
    }

    // Confirm payment and create order
    fetch('/api/confirm-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to confirm payment');
        }
        return data;
      })
      .then((data) => {
        if (data.success && data.order) {
          setOrderInfo(data.order);
          clearCart(); // Clear the cart after successful order creation
        } else {
          throw new Error('Order creation failed');
        }
      })
      .catch((err) => {
        console.error('Error confirming payment:', err);
        setError('Failed to process your order. Please contact support.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams, clearCart]);

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 text-center">
        <div className="text-blue-600 text-4xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold mb-4">Processing your order...</h1>
        <p className="text-gray-600">Please wait while we confirm your payment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 text-center">
        <div className="text-red-600 text-4xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">Order Processing Failed</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="space-y-2">
          <Link
            href="/checkout"
            className="block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="block text-blue-600 hover:text-blue-800"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 text-center">
      <div className="mb-6">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-green-600">Order Complete!</h1>
      </div>
      
      {orderInfo && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Order Details</h2>
          <div className="text-sm text-green-700 space-y-1">
            <p><strong>Order ID:</strong> {orderInfo.id.slice(0, 8)}...</p>
            <p><strong>Total:</strong> ${orderInfo.total.toFixed(2)}</p>
            <p><strong>Email:</strong> {orderInfo.customerEmail}</p>
            <p><strong>Status:</strong> {orderInfo.status}</p>
          </div>
        </div>
      )}
      
      <p className="text-gray-600 mb-6">
        Thank you for your purchase! Your order has been processed successfully and a confirmation email has been sent to your email address.
      </p>
      
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto mt-8 p-6 text-center">
        <div className="text-blue-600 text-4xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}