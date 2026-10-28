'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, type ReviewInput } from '@/lib/reviewSchema';
import { useAuth } from '@/contexts/AuthContext';
import { useReviews } from '@/contexts/ReviewsContext';

const fieldClass =
  'w-full rounded-lg bg-slate-950 border border-[#1e2246] px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500';
const btnClass =
  'rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 transition-colors';

function ReviewForm({
  productId,
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  productId: number;
  initial?: { rating: number; comment: string };
  submitLabel: string;
  onSubmit: (rating: number, comment: string) => Promise<{ error?: string }>;
  onCancel?: () => void;
}) {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      product_id: productId,
      rating: initial?.rating as number,
      comment: initial?.comment ?? '',
    },
  });

  const submit = async (values: ReviewInput) => {
    setServerError('');
    setSuccess(false);
    const result = await onSubmit(values.rating, values.comment);
    if (result.error) {
      setServerError(result.error);
    } else {
      setSuccess(true);
      reset({ product_id: productId, rating: undefined as unknown as number, comment: '' });
    }
  };

  return (
    <form
      data-testid="review-form"
      onSubmit={handleSubmit(submit)}
      noValidate
      className="space-y-3 rounded-xl border border-[#1e2246] bg-[#0e1022] p-4"
    >
      <div>
        <label htmlFor="input-rating" className="block text-xs text-slate-400 mb-1">
          Rating
        </label>
        <select
          id="input-rating"
          data-testid="input-rating"
          className={fieldClass}
          defaultValue={initial?.rating ?? ''}
          {...register('rating', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })}
        >
          <option value="">Select rating…</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {errors.rating && (
          <p data-testid="error-rating" className="text-xs text-red-400 mt-1">
            {errors.rating.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="input-comment" className="block text-xs text-slate-400 mb-1">
          Comment
        </label>
        <textarea
          id="input-comment"
          data-testid="input-comment"
          rows={3}
          className={fieldClass}
          {...register('comment')}
        />
        {errors.comment && (
          <p data-testid="error-comment" className="text-xs text-red-400 mt-1">
            {errors.comment.message}
          </p>
        )}
      </div>
      {serverError && (
        <p data-testid="error-review" className="text-sm text-red-400">
          {serverError}
        </p>
      )}
      {success && (
        <p data-testid="review-success" className="text-sm text-emerald-400">
          Review saved!
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          data-testid="btn-submit-review"
          disabled={isSubmitting}
          className={btnClass}
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm text-slate-400 px-3">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function ReviewsSection({ productId }: { productId: number }) {
  const { user, loading } = useAuth();
  const { reviews, myReview, submitReview, updateReview, deleteReview } = useReviews();
  const [editing, setEditing] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const count = reviews.length;
  const average =
    count === 0 ? 0 : Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10;

  return (
    <section className="mt-10 space-y-6" aria-label="Reviews">
      <div className="flex items-baseline gap-4">
        <h2 className="text-xl font-bold text-white">Reviews</h2>
        <span className="text-amber-400 font-bold">
          ★ <span data-testid="rating-average">{average}</span>
        </span>
        <span className="text-sm text-slate-400">
          (<span data-testid="review-count">{count}</span> reviews)
        </span>
      </div>

      {count === 0 ? (
        <p data-testid="reviews-empty" className="text-slate-400 text-sm">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => {
            const mine = !!user && r.user_id === user.id;
            return (
              <li
                key={r.id}
                data-testid="review-item"
                className="rounded-xl border border-[#1e2246] bg-[#0e1022] p-4"
              >
                <div className="flex items-center justify-between">
                  <span data-testid="review-author" className="font-semibold text-indigo-300">
                    {r.author}
                  </span>
                  <span className="text-amber-400 text-sm">
                    ★ <span data-testid="review-rating">{r.rating}</span>
                  </span>
                </div>
                <p data-testid="review-comment" className="mt-2 text-sm text-slate-300">
                  {r.comment}
                </p>
                {mine && (
                  <div className="mt-3 flex gap-3">
                    <button
                      data-testid="btn-edit-review"
                      onClick={() => setEditing((v) => !v)}
                      className="text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      Edit
                    </button>
                    <button
                      data-testid="btn-delete-review"
                      onClick={async () => {
                        setDeleteError('');
                        setEditing(false);
                        const res = await deleteReview();
                        if (res.error) setDeleteError(res.error);
                      }}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {deleteError && <p className="text-sm text-red-400">{deleteError}</p>}

      {!user && (
        <Link
          href="/login"
          data-testid="link-login-to-review"
          className="inline-block text-sm text-indigo-400 hover:text-indigo-300 underline"
        >
          Log in to write a review
        </Link>
      )}

      {!loading && user && !myReview && (
        <ReviewForm productId={productId} submitLabel="Submit review" onSubmit={submitReview} />
      )}

      {!loading && user && myReview && editing && (
        <ReviewForm
          productId={productId}
          initial={{ rating: myReview.rating, comment: myReview.comment }}
          submitLabel="Save changes"
          onSubmit={async (rating, comment) => {
            const res = await updateReview(rating, comment);
            if (!res.error) setEditing(false);
            return res;
          }}
          onCancel={() => setEditing(false)}
        />
      )}
    </section>
  );
}
