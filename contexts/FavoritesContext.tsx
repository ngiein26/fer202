'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

// ─── State & Actions ────────────────────────────────────────────────────────

type FavoritesState = number[]; // list of product ids

type FavoritesAction =
  | { type: 'SET'; payload: number[] }
  | { type: 'ADD'; payload: number }
  | { type: 'REMOVE'; payload: number };

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      if (state.includes(action.payload)) return state;
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────────────────────

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// ─── Provider ───────────────────────────────────────────────────────────────

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const { user } = useAuth();
  const router = useRouter();

  // Load favorites when user logs in; clear when logs out
  useEffect(() => {
    if (!user) {
      dispatch({ type: 'SET', payload: [] });
      return;
    }

    const loadFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('product_id');

      if (!error && data) {
        dispatch({ type: 'SET', payload: data.map((row) => row.product_id) });
      }
    };

    loadFavorites();
  }, [user]);

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(
    async (id: number) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const alreadyFav = favorites.includes(id);

      // Optimistic update
      if (alreadyFav) {
        dispatch({ type: 'REMOVE', payload: id });
      } else {
        dispatch({ type: 'ADD', payload: id });
      }

      // Sync with Supabase
      if (alreadyFav) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('product_id', id)
          .eq('user_id', user.id);

        if (error) {
          // Rollback
          dispatch({ type: 'ADD', payload: id });
        }
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ product_id: id, user_id: user.id });

        if (error) {
          // Rollback
          dispatch({ type: 'REMOVE', payload: id });
        }
      }
    },
    [user, favorites, router]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// ─── Hook ───────────────────────────────────────────────────────────────────

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
