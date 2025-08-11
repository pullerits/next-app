import { getProducts } from '@/lib/database';
import ProductCatalog from '@/components/products/ProductCatalog';

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProductCatalog products={products} />
      </div>
    </div>
  );
}