import React from 'react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      data-testid="product-card"
      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1e2246] bg-[#0e1022] hover:border-[#383d78] transition-all duration-300 shadow-xl group"
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
        </div>

        {/* Product Info */}
        <h3
          data-testid="product-name"
          className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-indigo-300 transition-colors line-clamp-1"
        >
          {product.name}
        </h3>

        <p
          data-testid="product-description"
          className="text-xs text-slate-400 leading-relaxed line-clamp-2"
        >
          {product.description}
        </p>
      </div>

      {/* Footer Price & Add to Cart */}
      <div className="px-4 pb-4 pt-2 flex items-center justify-between mt-auto">
        <span
          data-testid="product-price"
          className="text-base font-extrabold text-indigo-400"
        >
          {product.price}
        </span>
        <button
          type="button"
          className="rounded-lg bg-[#24275a] hover:bg-[#33387d] text-indigo-200 text-xs font-semibold px-4 py-2 transition-colors active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
