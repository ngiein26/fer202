import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface HomePageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, category } = await searchParams;

  // Get unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products based on query params (server-side)
  const filtered = products.filter((p) => {
    const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase());
    const matchCat = !category || p.category.toLowerCase() === category.toLowerCase();
    return matchQ && matchCat;
  });

  return (
    <div className="flex-1 text-slate-100 flex flex-col justify-between">
      {/* Background ambient glowing gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-blue-900/30 blur-[140px] rounded-full" />
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-12 z-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-10">
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

        {/* Search & Filter Form */}
        <form
          method="get"
          action="/"
          className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl mx-auto"
        >
          <input
            type="text"
            id="search-input"
            name="q"
            data-testid="search-input"
            defaultValue={q ?? ''}
            placeholder="Search products..."
            className="flex-1 rounded-xl bg-[#0e1022] border border-[#1e2246] text-slate-100 placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <select
            id="category-select"
            name="category"
            data-testid="category-select"
            defaultValue={category ?? ''}
            className="rounded-xl bg-[#0e1022] border border-[#1e2246] text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            id="btn-search"
            data-testid="btn-search"
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
          >
            Search
          </button>
        </form>

        {/* Product Grid or Empty State */}
        {filtered.length === 0 ? (
          <div
            data-testid="no-results"
            className="text-center py-20 text-slate-400"
          >
            <svg className="mx-auto mb-4 w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <p className="text-lg font-semibold text-slate-300">No products found</p>
            <p className="text-sm mt-1">Try a different search term or category.</p>
          </div>
        ) : (
          <div
            data-testid="product-list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
