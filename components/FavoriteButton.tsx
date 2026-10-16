'use client';

import { useFavorites } from '@/contexts/FavoritesContext';

interface FavoriteButtonProps {
  productId: number;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(productId);

  return (
    <button
      type="button"
      data-testid="btn-favorite"
      aria-pressed={fav ? 'true' : 'false'}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => toggleFavorite(productId)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
        fav
          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
          : 'bg-[#1e2246] text-slate-300 hover:bg-rose-500/20 hover:text-rose-400'
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
      {fav ? 'Favorited' : 'Add to Favorites'}
    </button>
  );
}
