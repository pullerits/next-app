'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import ProductGrid from './ProductGrid';

type SortOption = 'price-low' | 'price-high' | 'name' | 'rating' | '';

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('');
  const [under50, setUnder50] = useState<boolean>(false);
  const [between50And100, setBetween50And100] = useState<boolean>(false);
  const [over100, setOver100] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSortBy('');
    setUnder50(false);
    setBetween50And100(false);
    setOver100(false);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const hasActiveFilters = selectedCategory !== 'all' || under50 || between50And100 || over100 || inStockOnly || onSaleOnly;

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set).sort();
  }, [products]);

  const filteredAndSorted = useMemo(() => {
    let result = products.slice();

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Availability filters
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    if (onSaleOnly) {
      result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }

    // Price filters
    const anyPriceFilter = under50 || between50And100 || over100;
    if (anyPriceFilter) {
      result = result.filter((p) => {
        const price = p.price;
        const isUnder50 = under50 && price < 50;
        const isBetween = between50And100 && price >= 50 && price <= 100;
        const isOver100 = over100 && price > 100;
        return isUnder50 || isBetween || isOver100;
      });
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return result;
  }, [products, selectedCategory, sortBy, under50, between50And100, over100, inStockOnly, onSaleOnly]);

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Shop</h1>
          <p className="text-white/70 mt-1">Explore our ultra‑slim, ultra‑secure tracking lineup.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="rating">Rating</option>
          </select>

          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="mt-4 space-y-5 text-sm">
              <div>
                <p className="font-medium text-gray-900">Price</p>
                <div className="mt-2 space-y-2 text-gray-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" checked={under50} onChange={(e) => setUnder50(e.target.checked)} />
                    Under $50
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" checked={between50And100} onChange={(e) => setBetween50And100(e.target.checked)} />
                    $50 – $100
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" checked={over100} onChange={(e) => setOver100(e.target.checked)} />
                    Over $100
                  </label>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Availability</p>
                <div className="mt-2 space-y-2 text-gray-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                    In stock
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} />
                    On sale
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product grid in a white card */}
        <section className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
            <ProductGrid products={filteredAndSorted} />
          </div>
        </section>
      </div>
    </div>
  );
}


