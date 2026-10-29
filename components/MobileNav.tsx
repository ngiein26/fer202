'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, User, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  badge?: number;
  match: (path: string) => boolean;
};

export default function MobileNav() {
  const pathname = usePathname() || '/';
  const { user } = useAuth();
  const { favorites } = useFavorites();

  const items: NavItem[] = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      match: (p) => p === '/' || p.startsWith('/products'),
    },
    {
      href: user ? '/favorites' : '/login',
      label: 'Favorites',
      icon: Heart,
      badge: user ? favorites.length : undefined,
      match: (p) => p.startsWith('/favorites'),
    },
    user
      ? {
          href: '/account',
          label: 'Account',
          icon: User,
          match: (p) => p.startsWith('/account'),
        }
      : {
          href: '/login',
          label: 'Login',
          icon: LogIn,
          match: (p) => p.startsWith('/login') || p.startsWith('/register'),
        },
  ];

  return (
    <nav
      id="mobile-nav"
      data-testid="mobile-nav"
      aria-label="Mobile navigation"
      className="mobile-nav md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-[#181a38] bg-[#0a0b1c]/90 backdrop-blur-xl"
    >
      <ul className="grid grid-cols-3 h-16">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                id={`mobile-nav-${item.label.toLowerCase()}`}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors active:scale-95 ${
                  active ? 'text-indigo-300' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {active && (
                  <span className="absolute top-0 h-[3px] w-10 rounded-b-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                )}
                <span className="relative">
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#0a0b1c]">
                      {item.badge}
                    </span>
                  )}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
