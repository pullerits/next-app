import ProductGrid from '@/components/products/ProductGrid';
import { getProducts } from '@/lib/database';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white">Shop</h1>
            <p className="text-white/70 mt-1">Explore our ultra‑slim, ultra‑secure tracking lineup.</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="rating">Rating</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Categories</option>
              <option value="trackers">Trackers</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Promotional banner */}
        <div className="mb-8 rounded-2xl border border-white/10 backdrop-blur-md bg-slate-900/60 supports-[backdrop-filter]:bg-slate-900/60 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <p className="text-sm text-blue-200">Limited time</p>
            <h2 className="text-2xl font-bold">Bundle and Save</h2>
            <p className="text-blue-100">Buy two trackers, get 20% off accessories.</p>
          </div>
          <Link href="/products" className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-white text-gray-900 border border-gray-200 soft-shadow hover:shadow-md">
            Shop bundles
          </Link>
        </div>

        {/* Content cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Faceted filter */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6">
              <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
              <div className="mt-4 space-y-5 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Price</p>
                  <div className="mt-2 space-y-2 text-gray-700">
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300" /> Under $50</label>
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300" /> $50 – $100</label>
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300" /> Over $100</label>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Availability</p>
                  <div className="mt-2 space-y-2 text-gray-700">
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300" /> In stock</label>
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300" /> On sale</label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid in a white card */}
          <section className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
              <ProductGrid products={products} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}