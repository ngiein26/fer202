'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const validate = () => {
    const newErrors = {};

    if (!name || name.trim() === '') {
      newErrors.name = 'Full name is required';
    }

    if (!email || email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage('Registration successful (demo)');
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);

    if (errors.name) {
      if (val && val.trim() !== '') {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.name;
          return updated;
        });
      }
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (errors.email) {
      if (val && val.trim() !== '' && isValidEmail(val)) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.email;
          return updated;
        });
      }
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (errors.password) {
      if (val && val.length >= 6) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.password;
          return updated;
        });
      }
    }

    if (errors.confirmPassword && confirmPassword) {
      if (val === confirmPassword) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.confirmPassword;
          return updated;
        });
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);

    if (errors.confirmPassword) {
      if (val && val === password) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.confirmPassword;
          return updated;
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-extrabold tracking-tight text-white">
              Create an account
            </CardTitle>
            <CardDescription className="text-slate-400">
              Join TechStore to unlock exclusive features and offers
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form noValidate data-testid="register-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  data-testid="register-name"
                  value={name}
                  onChange={handleNameChange}
                  className="bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20"
                />
                {errors.name && (
                  <p data-testid="error-name" className="text-sm text-red-400 font-medium mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  data-testid="register-email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20"
                />
                {errors.email && (
                  <p data-testid="error-email" className="text-sm text-red-400 font-medium mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  data-testid="register-password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20"
                />
                {errors.password && (
                  <p data-testid="error-password" className="text-sm text-red-400 font-medium mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  data-testid="register-confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20"
                />
                {errors.confirmPassword && (
                  <p data-testid="error-confirm-password" className="text-sm text-red-400 font-medium mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                data-testid="register-submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-indigo-600/20 transition-all mt-6"
              >
                Register
              </Button>

              {/* Success Message */}
              {successMessage && (
                <div
                  data-testid="form-success"
                  className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold rounded-lg text-center mt-4 animate-in fade-in-50 duration-200"
                >
                  {successMessage}
                </div>
              )}
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
