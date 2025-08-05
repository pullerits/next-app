'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { mockProducts } from '@/lib/mock-data';
import CartButton from '@/components/cart/CartButton';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Get image source safely
  const getImageSrc = (index = 0) => {
    if (product.images && product.images.length > index) {
      return product.images[index];
    }
    return '/placeholder.svg';
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600">Home</a>
              </li>
              <li>/</li>
              <li>
                <a href="/products" className="hover:text-blue-600">Products</a>
              </li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                <Image
                  src={getImageSrc(0)}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-md">
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
                          -{discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {product.rating && (
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(product.rating!) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>

              {product.variants && product.variants.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Options
                  </h3>
                  <div className="space-y-3">
                    {product.variants.map((variant) => (
                      <div key={variant.id}>
                        <label className="text-sm font-medium text-gray-700">
                          {variant.name}
                        </label>
                        <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value={variant.value}>{variant.value}</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900">1</span>
                  <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
                    +
                  </button>
                </div>
                
                <CartButton
                  onClick={() => console.log('Add to cart:', product.name)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </CartButton>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Category:</span>
                    <span className="ml-2 text-gray-600">{product.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Stock:</span>
                    <span className="ml-2 text-gray-600">
                      {product.inStock ? `${product.stockQuantity} available` : 'Out of stock'}
                    </span>
                  </div>
                </div>
                
                {product.tags.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-900">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}