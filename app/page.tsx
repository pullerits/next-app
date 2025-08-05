import ProductGrid from '@/components/products/ProductGrid';
import HeroSection from '@/components/sections/HeroSection';
import ProvenResultsSection from '@/components/sections/ProvenResultsSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import AsSeenOnSection from '@/components/sections/AsSeenOnSection';
import { mockProducts } from '@/lib/mock-data';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-blue-900 text-white py-2 text-center text-sm font-medium">
        SUMMER SALE: BUY 2 GET 1 FREE
      </div>

      <HeroSection />

      <ProvenResultsSection />

      <WhyChooseSection />

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid products={featuredProducts} title="Featured Products" />
        </div>
      </section>

      <AsSeenOnSection />
    </>
  );
}
