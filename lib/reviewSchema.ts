import { z } from 'zod';

// Single source of truth: used by the API route (server) AND the review form (client).
export const reviewSchema = z.object({
  product_id: z.number().int().positive(),
  rating: z
    .number({ message: 'Please choose a rating' })
    .int('Rating must be a whole number')
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),
  comment: z
    .string()
    .trim()
    .min(1, 'Comment is required')
    .max(500, 'Comment must be at most 500 characters'),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
