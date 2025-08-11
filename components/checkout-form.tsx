'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  paymentIntentId: string;
}

export default function CheckoutForm({ paymentIntentId }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?payment_intent=${paymentIntentId}`,
      },
    });

    // If payment is successful, the user will be redirected to payment-success page
    // If there's an error, we handle it here
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred');
      } else {
        setMessage('An unexpected error occurred.');
      }
      setIsLoading(false);
    }
    // Note: If payment succeeds, user gets redirected and this component unmounts
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md border border-gray-200 p-4 bg-white">
        <PaymentElement />
      </div>

      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm"
      >
        <span>
          {isLoading ? 'Processing…' : 'Pay now'}
        </span>
      </button>

      {message && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
          {message}
        </div>
      )}
    </form>
  );
}