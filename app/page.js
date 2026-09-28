'use client';

import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text: string }

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(null);

    if (!email || !password || (activeTab === 'register' && !name)) {
      setToast({ type: 'error', text: 'Please fill out all required fields.' });
      return;
    }

    setLoading(true);

    // Simulate authentication API call
    setTimeout(() => {
      setLoading(false);
      setToast({
        type: 'success',
        text: activeTab === 'login'
          ? `Welcome back! Successfully logged in as ${email}.`
          : `Account created successfully! Welcome, ${name}.`,
      });

      // Reset sensitive password field
      setPassword('');
    }, 1200);
  };

  return (
    <div className="page-container">
      {/* Header Bar */}
      <header className="header-nav">
        <a href="#" className="brand-logo">
          <div className="logo-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
          <span>NextApp</span>
        </a>

        <div className="nav-pills">
          <div className="pill-tag">
            <span className="status-dot"></span>
            Next.js 15
          </div>
          <div className="pill-tag">Vercel Ready</div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="main-wrapper">
        {/* Auth Card Component */}
        <section className="auth-card-container">
          {/* Tab Bar */}
          <div className="tab-switcher">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveTab('login'); setToast(null); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => { setActiveTab('register'); setToast(null); }}
            >
              Create Account
            </button>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h1>{activeTab === 'login' ? 'Welcome Back' : 'Get Started'}</h1>
            <p>
              {activeTab === 'login'
                ? 'Enter your credentials to access your account'
                : 'Join our platform by creating a new account'}
            </p>
          </div>

          {/* Social Sign-In */}
          <div className="social-buttons">
            <button type="button" className="social-btn" onClick={() => setToast({ type: 'success', text: 'Google OAuth flow initialized.' })}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.8-.7-1.3-1.6-1.5-2.7z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              Google
            </button>
            <button type="button" className="social-btn" onClick={() => setToast({ type: 'success', text: 'GitHub OAuth flow initialized.' })}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <div className="divider">
            <span>or continue with email</span>
          </div>

          {/* Login Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <span>Password</span>
                {activeTab === 'login' && (
                  <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); setToast({ type: 'success', text: 'Password reset link sent to your email.' }); }}>
                    Forgot?
                  </a>
                )}
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="custom-checkbox">
                  {rememberMe && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                Remember me on this device
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Processing...
                </>
              ) : (
                <>
                  {activeTab === 'login' ? 'Sign In to Dashboard' : 'Create Account'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Feedback Toast */}
          {toast && (
            <div className={`toast-msg ${toast.type}`}>
              {toast.type === 'success' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              <span>{toast.text}</span>
            </div>
          )}
        </section>

        {/* Next.js Project Structure Educational Overview */}
        <section className="structure-section">
          <div className="section-title">
            <h2>Next.js Project Architecture</h2>
            <p>Understanding the basic project layout and App Router structure</p>
          </div>

          <div className="tree-grid">
            <div className="tree-card">
              <div className="card-header-icon">
                <div className="card-icon-badge icon-blue">📁</div>
                <h3>app/layout.js</h3>
              </div>
              <p>Root layout wrapper for the entire app. Defines html, body, global metadata, font imports, and persistent shell components.</p>
            </div>

            <div className="tree-card">
              <div className="card-header-icon">
                <div className="card-icon-badge icon-purple">📄</div>
                <h3>app/page.js</h3>
              </div>
              <p>The main entry point for the homepage route (<code>/</code>). Houses our interactive login portal component and UI elements.</p>
            </div>

            <div className="tree-card">
              <div className="card-header-icon">
                <div className="card-icon-badge icon-pink">🎨</div>
                <h3>app/globals.css</h3>
              </div>
              <p>Global CSS styles, glassmorphism backdrop filters, custom color variables, and responsive layout utilities.</p>
            </div>

            <div className="tree-card">
              <div className="card-header-icon">
                <div className="card-icon-badge icon-green">⚙️</div>
                <h3>next.config.mjs</h3>
              </div>
              <p>Next.js framework configuration file for compiler settings, image domains, headers, and build targets.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-text">
        <p>FER202 Group 4 • Built with Next.js 15 & deployed on Vercel</p>
      </footer>
    </div>
  );
}
