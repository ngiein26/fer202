import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'TechStore - E-Commerce App',
  description: 'TechStore standard Next.js E-Commerce Application',
  applicationName: 'TechStore',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  appleWebApp: {
    capable: true,
    title: 'TechStore',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#060713',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#060713] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col justify-between pb-mobile-nav md:pb-0">
              <Header />
              {children}
              <footer className="border-t border-[#181a38] py-6 md:py-8 px-4 text-center text-xs text-slate-500 z-10">
                &copy; 2026 TechStore | FER202 Lab 4 &amp; 5. All rights reserved.
              </footer>
            </div>
            <MobileNav />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
