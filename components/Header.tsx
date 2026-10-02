'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { user, signOut, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#181a38] bg-[#060713]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            TechStore
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/account"
                data-testid="user-email"
                className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
              >
                {user.email}
              </Link>
              <Button
                type="button"
                data-testid="btn-logout"
                onClick={handleLogout}
                className="text-sm font-semibold text-white bg-rose-600/80 hover:bg-rose-600 px-4 py-2 rounded-lg shadow-md shadow-rose-600/20 transition-all h-auto"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                data-testid="btn-login"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5"
              >
                Login
              </Link>
              <Link
                href="/register"
                data-testid="btn-register"
                className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg shadow-md shadow-indigo-600/30 transition-all"
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
