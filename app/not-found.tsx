import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      data-testid="not-found"
      className="flex-1 flex flex-col items-center justify-center py-32 text-slate-400"
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-rose-900/20 via-purple-900/20 to-indigo-900/20 blur-[140px] rounded-full" />
      </div>

      <div className="text-center z-10">
        <p className="text-8xl font-black text-indigo-500/30 mb-4">404</p>
        <h1 className="text-3xl font-black text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8 text-sm max-w-sm mx-auto">
          The page or product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-600/30"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
