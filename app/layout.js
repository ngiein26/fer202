import './globals.css';

export const metadata = {
  title: 'Next.js App Portal | FER202 Group 4',
  description: 'A modern Next.js project showcasing App Router architecture, responsive authentication UI, and Vercel deployment capability.',
  keywords: ['Next.js', 'React', 'Vercel', 'Authentication', 'FER202'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0a0d18" />
      </head>
      <body>
        <div className="ambient-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
