import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              TRACKPRO.
            </h3>
            <p className="text-blue-200 text-sm">
              Your trusted partner for ultra-slim, ultra-secure tracking technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-blue-200 hover:text-white text-sm transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-blue-200 text-sm">
            © 2024 TRACKPRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}