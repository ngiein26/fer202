import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import ReviewsSection from '@/components/ReviewsSection';
import { ReviewsProvider } from '@/contexts/ReviewsContext';
import { getReviews, type Review } from '@/lib/reviews';

export const dynamicParams = false;

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

// Pre-render all product pages at build time
export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

// Per-product <title>
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) return { title: 'Not Found | TechStore' };
  return {
    title: `${product.name} | TechStore`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  let initialReviews: Review[] = [];
  try {
    initialReviews = (await getReviews(product.id)).reviews;
  } catch (e) {
    console.error('Failed to load reviews', e);
  }

  return (
    <div className="flex-1 text-slate-100">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-blue-900/30 blur-[140px] rounded-full" />
      </div>

      <main className="flex-1 container mx-auto px-4 sm:px-8 py-12 z-10 max-w-4xl">
        {/* Back link */}
        <Link
          href="/"
          data-testid="link-back"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Store
        </Link>

        <div
          data-testid="product-detail"
          className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#0e1022] border border-[#1e2246] rounded-2xl p-8 shadow-2xl"
        >
          {/* Product Image */}
          <div className="flex items-center justify-center rounded-xl bg-slate-950 aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-indigo-400 bg-indigo-900/30 px-3 py-1 rounded-full">
                <span data-testid="detail-category">{product.category}</span>
              </span>

              <h1
                data-testid="detail-name"
                className="text-2xl sm:text-3xl font-black text-white tracking-tight"
              >
                {product.name}
              </h1>

              <p
                data-testid="detail-description"
                className="text-slate-400 text-sm leading-relaxed"
              >
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span
                data-testid="detail-price"
                className="text-3xl font-extrabold text-indigo-400"
              >
                ${product.price.toFixed(2)}
              </span>
              {/* Client-side favorite button (needs context) */}
              <FavoriteButton productId={product.id} />
            </div>
          </div>
        </div>

        <ReviewsProvider productId={product.id} initialReviews={initialReviews}>
          <ReviewsSection productId={product.id} />
        </ReviewsProvider>
      </main>
    </div>
  );
}
