'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const { itemCount } = useCart();
  
  return (
    <header className="backdrop-blur-md bg-slate-900/60 supports-[backdrop-filter]:bg-slate-900/60 text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              TRACKPRO.
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-white hover:text-blue-200 transition-colors">
              Products
            </Link>
            <Link href="/cart" className="text-white hover:text-blue-200 transition-colors">
              Cart
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/cart" className="text-white hover:text-blue-200 transition-colors relative p-2 rounded-full hover:bg-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}