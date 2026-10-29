'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const { favorites } = useFavorites();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="safe-top sticky top-0 z-50 w-full border-b border-[#181a38] bg-[#060713]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-8 h-14 md:h-20 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <span className="font-extrabold text-lg md:text-xl tracking-tight text-white">
            TechStore
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {user ? (
            <>
              {/* Favorites link with count */}
              <Link
                href="/favorites"
                data-testid="link-favorites"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-200 hover:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-rose-400">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span
                  data-testid="favorites-count"
                  className="min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center"
                >
                  {favorites.length}
                </span>
              </Link>

              <Link
                href="/account"
                data-testid="user-email"
                className="text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-colors truncate max-w-[110px] sm:max-w-[220px]"
              >
                {user.email}
              </Link>
              <Button
                type="button"
                data-testid="btn-logout"
                onClick={handleLogout}
                className="flex-shrink-0 text-xs sm:text-sm font-semibold text-white bg-rose-600/80 hover:bg-rose-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md shadow-rose-600/20 transition-all h-auto"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                data-testid="btn-login"
                className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors px-2 sm:px-3 py-1.5"
              >
                Login
              </Link>
              <Link
                href="/register"
                data-testid="btn-register"
                className="text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg shadow-md shadow-indigo-600/30 transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
