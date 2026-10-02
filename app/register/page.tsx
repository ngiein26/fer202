'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  const { signUp } = useAuth();

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

  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setAuthError('');

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const { data, error } = await signUp(email, password);
      if (error) {
        setAuthError(error.message);
      } else {
        setSuccessMessage('Registration successful');
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
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
    setAuthError('');
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
    setAuthError('');
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
    <main className="flex-1 flex items-center justify-center p-4 my-8 z-10">
      <Card className="w-full max-w-md border border-[#1e2246] bg-[#0e1022] p-8 shadow-2xl text-slate-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-xs text-slate-400">Join TechStore to start exploring devices</p>
        </div>

        {authError && (
          <div
            data-testid="error-auth"
            className="p-3 mb-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center"
          >
            {authError}
          </div>
        )}

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
            <Label htmlFor="name" className="text-xs font-semibold text-slate-300">
              Full Name
            </Label>
            <Input
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
            <Label htmlFor="email" className="text-xs font-semibold text-slate-300">
              Email Address
            </Label>
            <Input
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
            <Label htmlFor="password" className="text-xs font-semibold text-slate-300">
              Password
            </Label>
            <Input
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
            <Label htmlFor="confirm-password" className="text-xs font-semibold text-slate-300">
              Confirm Password
            </Label>
            <Input
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

          <Button
            type="submit"
            data-testid="register-submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 text-sm shadow-lg shadow-indigo-600/30 transition-all mt-2 h-auto border-none"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-[#181a38]">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}
