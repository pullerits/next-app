'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/lib/types';
import CartButton from './CartButton';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
        </Link>
      </div>
      
      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          ${product.price.toFixed(2)} each
        </p>
        {item.selectedVariants && (
          <div className="mt-1">
            {Object.entries(item.selectedVariants).map(([key, value]) => (
              <span key={key} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2">
                {key}: {value}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <CartButton
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          variant="secondary"
          size="sm"
          disabled={quantity <= 1}
        >
          -
        </CartButton>
        
        <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
          {quantity}
        </span>
        
        <CartButton
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          variant="secondary"
          size="sm"
        >
          +
        </CartButton>
      </div>
      
      <div className="text-sm font-medium text-gray-900 dark:text-white min-w-[4rem] text-right">
        ${(product.price * quantity).toFixed(2)}
      </div>
      
      <CartButton
        onClick={() => onRemove(product.id)}
        variant="secondary"
        size="sm"
      >
        Remove
      </CartButton>
    </div>
  );
}