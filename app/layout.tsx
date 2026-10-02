import type { Metadata } from 'next';
import '@/app/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'TechStore - E-Commerce App',
  description: 'TechStore standard Next.js E-Commerce Application',
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
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            {children}
            <footer className="border-t border-[#181a38] py-8 text-center text-xs text-slate-500 z-10">
              &copy; 2026 TechStore | FER202 Lab 2. All rights reserved.
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
