import React from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header with Navigation */}
      <Header />

      {/* Hero Banner / Page Intro */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Featured Tech Collection
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Discover Cutting-Edge Devices
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Explore our curated catalog of high-performance gadgets and premium accessories designed for developers, creators, and tech enthusiasts.
          </p>
        </section>

        {/* Product Grid Container */}
        <section data-testid="product-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} TechStore Inc. FER202 Lab 2 — Built with Next.js & ShadCN UI.</p>
        </div>
      </footer>
    </div>
  );
}
