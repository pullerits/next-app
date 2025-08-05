import ProductGrid from '@/components/products/ProductGrid';
import { mockProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Our Products
            </h1>
            <p className="text-xl text-blue-100">
              Discover our range of ultra-slim, ultra-secure tracking solutions.
            </p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              All Products
            </h2>
            
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Rating</option>
              </select>
              
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="books">Books</option>
              </select>
            </div>
          </div>
          
          <ProductGrid products={mockProducts} />
        </div>
    </div>
  );
}