export default function Loading() {
  return (
    <div
      data-testid="loading"
      className="flex-1 flex items-center justify-center py-32"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-slate-400 text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
