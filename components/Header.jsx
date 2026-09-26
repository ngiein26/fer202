'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-slate-100 hover:opacity-90 transition-opacity">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <span className="tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-extrabold">
            TechStore
          </span>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            data-testid="btn-login"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            data-testid="btn-register"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 transition-all"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
