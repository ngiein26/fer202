'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { products } from '@/data/products';
import { Card } from '@/components/ui/card';

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // Loading state — render nothing
  if (loading) return null;

  // Not logged in — render nothing (redirect in progress)
  if (!user) return null;

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex-1 text-slate-100">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-rose-900/20 via-purple-900/20 to-indigo-900/30 blur-[140px] rounded-full" />
      </div>

      <main
        data-testid="favorites-page"
        className="flex-1 container mx-auto px-4 sm:px-8 py-6 md:py-12 z-10 max-w-3xl"
      >
        <div className="mb-5 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1 md:mb-2">
            My Favorites
          </h1>
          <p className="text-slate-400 text-sm">
            {favoriteProducts.length} saved item{favoriteProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div
            data-testid="favorites-empty"
            className="text-center py-24 text-slate-400"
          >
            <svg className="mx-auto mb-4 w-16 h-16 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p className="text-xl font-semibold text-slate-300">No favorites yet</p>
            <p className="text-sm mt-2 mb-6">Browse the store and click the heart icon to save items.</p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
            >
              Browse Store
            </Link>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {favoriteProducts.map((product) => (
              <Card
                key={product.id}
                data-testid="favorite-item"
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-[#1e2246] bg-[#0e1022] rounded-2xl shadow-xl hover:border-[#383d78] transition-all"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-slate-950 flex-shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{product.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{product.category}</p>
                  </div>
                  <span className="text-sm sm:text-base font-extrabold text-indigo-400 flex-shrink-0 mt-1 sm:mt-0">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="flex-shrink-0 px-3 py-2 md:py-1.5 rounded-lg bg-[#24275a] hover:bg-[#33387d] text-indigo-200 text-xs font-semibold transition-colors"
                >
                  View
                </Link>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
