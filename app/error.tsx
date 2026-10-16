'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  return (
    <div
      data-testid="error-boundary"
      className="flex-1 flex flex-col items-center justify-center py-32 text-slate-400"
    >
      <div className="text-center z-10 max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-rose-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Something went wrong</h2>
        <p className="text-slate-400 text-sm mb-1">{error.message || 'An unexpected error occurred.'}</p>
        {error.digest && (
          <p className="text-xs text-slate-600 mb-6">Error ID: {error.digest}</p>
        )}
        <button
          type="button"
          data-testid="btn-retry"
          onClick={reset}
          className="mt-6 inline-block px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-600/30"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
