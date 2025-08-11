'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import CartButton from '@/components/cart/CartButton';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/placeholder.svg',
      },
      quantity
    );

    // Simulate loading for better UX
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center border border-gray-300 rounded-md">
        <button
          type="button"
          onClick={decrease}
          className="px-3 py-2 text-gray-600 hover:text-gray-900"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="px-4 py-2 text-gray-900" aria-live="polite">{quantity}</span>
        <button
          type="button"
          onClick={increase}
          className="px-3 py-2 text-gray-600 hover:text-gray-900"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <CartButton onClick={handleAddToCart} disabled={isAdding} className="w-full">
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </CartButton>
    </div>
  );
}