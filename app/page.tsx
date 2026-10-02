import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  return (
    <div className="flex-1 text-slate-100 flex flex-col justify-between">
      {/* Background ambient glowing gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-blue-900/30 blur-[140px] rounded-full" />
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-12 z-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b1947] border border-[#2e2a73] text-indigo-300 text-[11px] font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Featured Tech Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Discover Cutting-Edge Devices
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Explore our curated catalog of high performance gadgets and premium accessories designed for developers, creators, and tech enthusiasts.
          </p>
        </section>

        {/* Product Grid Container */}
        <div
          data-testid="product-list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
