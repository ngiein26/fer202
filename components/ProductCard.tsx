'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { Card } from '@/components/ui/card';
import { useFavorites } from '@/contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  return (
    <Card
      data-testid="product-card"
      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1e2246] bg-[#0e1022] hover:border-[#383d78] transition-all duration-300 shadow-xl group text-slate-100"
    >
      <div className="p-4 flex flex-col">
        {/* Top Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.name}
            data-testid="product-image"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Heart / Favorite Button */}
          <button
            type="button"
            data-testid="btn-favorite"
            aria-pressed={fav ? 'true' : 'false'}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => toggleFavorite(product.id)}
            className={`absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
              fav
                ? 'bg-rose-500 text-white shadow-rose-500/40'
                : 'bg-[#0e1022]/80 text-slate-400 hover:text-rose-400 hover:bg-[#0e1022]'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={fav ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <h3
          data-testid="product-name"
          className="text-base font-bold text-white tracking-tight mb-1 group-hover:text-indigo-300 transition-colors line-clamp-1"
        >
          {product.name}
        </h3>

        <p
          data-testid="product-description"
          className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-2"
        >
          {product.description}
        </p>

        <span className="text-xs font-medium text-indigo-400/70 bg-indigo-900/20 px-2 py-0.5 rounded-full w-fit">
          {product.category}
        </span>
      </div>

      {/* Footer Price & Link to Detail */}
      <div className="px-4 pb-4 pt-2 flex items-center justify-between mt-auto">
        <span
          data-testid="product-price"
          className="text-base font-extrabold text-indigo-400"
        >
          ${product.price.toFixed(2)}
        </span>
        <Link
          href={`/products/${product.id}`}
          data-testid="link-detail"
          className="rounded-lg bg-[#24275a] hover:bg-[#33387d] text-indigo-200 text-xs font-semibold px-4 py-2 h-auto transition-colors active:scale-95 border-none"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}

export default ProductCard;
