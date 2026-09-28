import Link from 'next/link';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060713] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background ambient glowing gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-blue-900/30 blur-[140px] rounded-full" />
      </div>

      {/* Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#181a38] bg-[#060713]/90 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              TechStore
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login" data-testid="btn-login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5">
              Login
            </Link>
            <Link href="/register" data-testid="btn-register" className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg shadow-md shadow-indigo-600/30 transition-all">
              Register
            </Link>
          </div>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="border-t border-[#181a38] py-8 text-center text-xs text-slate-500 z-10">
        &copy; 2026 TechStore | FER202 Lab 2. All rights reserved.
      </footer>
    </div>
  );
}
