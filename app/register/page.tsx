'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    const nameTrimmed = name.trim();
    if (!nameTrimmed) {
      newErrors.name = 'Full name is required';
    }

    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSuccessMessage('Registration successful (demo)');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (errors.name && val.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email) {
      const emailTrimmed = val.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailTrimmed && emailRegex.test(emailTrimmed)) {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (errors.password) {
      if (val && val.length >= 6) {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
    if (errors.confirmPassword && confirmPassword === val && confirmPassword !== '') {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (errors.confirmPassword) {
      if (val && val === password) {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#060713] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
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
            <Link href="/login" data-testid="btn-login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5">
              Login
            </Link>
            <Link href="/register" data-testid="btn-register" className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg shadow-md shadow-indigo-600/30 transition-all">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 my-8 z-10">
        <div className="w-full max-w-md rounded-2xl border border-[#1e2246] bg-[#0e1022] p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-xs text-slate-400">Join TechStore to start exploring devices</p>
          </div>

          {successMessage && (
            <div
              data-testid="form-success"
              className="p-3 mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold text-center"
            >
              {successMessage}
            </div>
          )}

          <form noValidate data-testid="register-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                data-testid="register-name"
                value={name}
                onChange={handleNameChange}
                className="w-full rounded-lg bg-[#060713] border border-[#24275a] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {errors.name && (
                <p data-testid="error-name" className="text-xs font-medium text-rose-400 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                data-testid="register-email"
                value={email}
                onChange={handleEmailChange}
                className="w-full rounded-lg bg-[#060713] border border-[#24275a] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {errors.email && (
                <p data-testid="error-email" className="text-xs font-medium text-rose-400 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                data-testid="register-password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full rounded-lg bg-[#060713] border border-[#24275a] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {errors.password && (
                <p data-testid="error-password" className="text-xs font-medium text-rose-400 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirm-password" className="text-xs font-semibold text-slate-300">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                data-testid="register-confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full rounded-lg bg-[#060713] border border-[#24275a] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {errors.confirmPassword && (
                <p data-testid="error-confirm-password" className="text-xs font-medium text-rose-400 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              data-testid="register-submit"
              className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 text-sm shadow-lg shadow-indigo-600/30 transition-all mt-2"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-[#181a38]">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#181a38] py-6 text-center text-xs text-slate-500 z-10">
        &copy; 2026 TechStore | FER202 Lab 2. All rights reserved.
      </footer>
    </div>
  );
}
