'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Use the first image or placeholder
  const imageSrc = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/placeholder.svg';

  return (
    <div className="group relative overflow-hidden bg-white rounded-xl border border-gray-200 soft-shadow hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-slate-100 to-slate-200">
          <Image
            src={imageSrc}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              -{discountPercentage}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1 overflow-hidden">
            <span className="block truncate">{product.name}</span>
          </h3>
          
          <p className="text-xs text-gray-500 mb-2 overflow-hidden">
            <span className="block truncate">{product.description}</span>
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {product.rating && (
              <div className="flex items-center">
                <span className="text-sm text-gray-600">
                  ★ {product.rating.toFixed(1)}
                </span>
                {product.reviewCount && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}