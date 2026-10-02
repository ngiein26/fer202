'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex-1 container mx-auto px-4 sm:px-8 py-12 z-10 flex justify-center items-center">
      <Card
        data-testid="account-page"
        className="w-full max-w-md border border-[#1e2246] bg-[#0e1022] p-8 shadow-2xl text-slate-100"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Account Profile</h1>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#060713] border border-[#24275a]">
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Email Address
            </span>
            <span
              data-testid="account-email"
              className="text-lg font-bold text-indigo-300 break-all"
            >
              {user.email}
            </span>
          </div>
        </div>
      </Card>
    </main>
  );
}
