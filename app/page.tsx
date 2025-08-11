import ProductGrid from '@/components/products/ProductGrid';
import HeroSection from '@/components/sections/HeroSection';
import ProvenResultsSection from '@/components/sections/ProvenResultsSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import { getFeaturedProducts } from '@/lib/database';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <>
      <HeroSection />

      <ProvenResultsSection />

      <WhyChooseSection />

      {/* Featured Products Section */}
      <section className="bg-transparent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 lg:p-10">
            <ProductGrid products={featuredProducts} title="Featured Products" />
          </div>
        </div>
      </section>

      {/* As Seen On section removed */}
    </>
  );
}
