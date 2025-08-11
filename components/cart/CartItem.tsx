'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import CartButton from './CartButton';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { id, name, price, image, quantity } = item;

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex-shrink-0">
        <Link href={`/products/${id}`}>
          <Image
            src={image || '/placeholder.svg'}
            alt={name}
            width={72}
            height={72}
            className="rounded-md object-cover border border-gray-200"
          />
        </Link>
      </div>
      
      <div className="flex-1 min-w-0">
        <Link href={`/products/${id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-gray-700">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1">
          ${price.toFixed(2)} each
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <CartButton
          onClick={() => updateQuantity(id, quantity - 1)}
          variant="secondary"
          size="sm"
          disabled={quantity <= 1}
        >
          -
        </CartButton>
        
        <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
          {quantity}
        </span>
        
        <CartButton
          onClick={() => updateQuantity(id, quantity + 1)}
          variant="secondary"
          size="sm"
        >
          +
        </CartButton>
      </div>
      
      <div className="text-sm font-medium text-gray-900 min-w-[4rem] text-right">
        ${(price * quantity).toFixed(2)}
      </div>
      
      <CartButton
        onClick={() => removeItem(id)}
        variant="secondary"
        size="sm"
      >
        Remove
      </CartButton>
    </div>
  );
}