'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import type { Review } from '@/lib/reviews';

type Action =
  | { type: 'SET'; reviews: Review[] }
  | { type: 'ADD'; review: Review }
  | { type: 'UPDATE'; review: Review }
  | { type: 'REMOVE'; id: number };

function reviewsReducer(state: Review[], action: Action): Review[] {
  switch (action.type) {
    case 'SET':
      return action.reviews;
    case 'ADD':
      return [action.review, ...state.filter((r) => r.id !== action.review.id)];
    case 'UPDATE':
      return state.map((r) => (r.id === action.review.id ? { ...r, ...action.review } : r));
    case 'REMOVE':
      return state.filter((r) => r.id !== action.id);
    default:
      return state;
  }
}

interface ReviewsContextType {
  reviews: Review[];
  myReview: Review | undefined;
  submitReview: (rating: number, comment: string) => Promise<{ error?: string }>;
  updateReview: (rating: number, comment: string) => Promise<{ error?: string }>;
  deleteReview: () => Promise<{ error?: string }>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{
  productId: number;
  initialReviews: Review[];
  children: React.ReactNode;
}> = ({ productId, initialReviews, children }) => {
  const [reviews, dispatch] = useReducer(reviewsReducer, initialReviews);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: 'SET', reviews: initialReviews });
  }, [initialReviews]);

  const myReview = useMemo(
    () => (user ? reviews.find((r) => r.user_id === user.id) : undefined),
    [reviews, user]
  );

  const submitReview = useCallback(
    async (rating: number, comment: string) => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) return { error: 'Please log in first' };
      try {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify({ product_id: productId, rating, comment }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) return { error: json.error || 'Failed to submit review' };
        dispatch({
          type: 'ADD',
          review: { ...json, user_id: data.session!.user.id } as Review,
        });
        router.refresh();
        return {};
      } catch {
        return { error: 'Network error' };
      }
    },
    [productId, router]
  );

  const updateReview = useCallback(
    async (rating: number, comment: string) => {
      if (!myReview) return { error: 'No review to update' };
      const { data, error } = await supabase
        .from('reviews')
        .update({ rating, comment: comment.trim() })
        .eq('id', myReview.id)
        .select('id, user_id, product_id, rating, comment, author, created_at')
        .single();
      if (error) return { error: error.message };
      dispatch({ type: 'UPDATE', review: data as Review });
      router.refresh();
      return {};
    },
    [myReview, router]
  );

  const deleteReview = useCallback(async () => {
    if (!myReview) return { error: 'No review to delete' };
    const backup = myReview;
    // Optimistic removal
    dispatch({ type: 'REMOVE', id: backup.id });
    const { error } = await supabase.from('reviews').delete().eq('id', backup.id);
    if (error) {
      // Roll back
      dispatch({ type: 'ADD', review: backup });
      return { error: error.message };
    }
    router.refresh();
    return {};
  }, [myReview, router]);

  return (
    <ReviewsContext.Provider
      value={{ reviews, myReview, submitReview, updateReview, deleteReview }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error('useReviews must be used within a ReviewsProvider');
  return ctx;
};
