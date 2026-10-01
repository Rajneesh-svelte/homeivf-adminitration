'use client';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6">
      {/* Floating background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary-300/30 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* 404 digits with bounce + gradient */}
      <div className="relative flex items-center gap-2 select-none">
        <span className="text-[8rem] md:text-[12rem] font-black leading-none bg-gradient-to-b from-primary-500 to-primary-700 bg-clip-text text-transparent animate-[bounce_2s_infinite]">
          4
        </span>
        <span
          className="text-[8rem] md:text-[12rem] font-black leading-none bg-gradient-to-b from-primary-500 to-primary-700 bg-clip-text text-transparent animate-[bounce_2s_infinite]"
          style={{ animationDelay: '0.15s' }}
        >
          0
        </span>
        <span
          className="text-[8rem] md:text-[12rem] font-black leading-none bg-gradient-to-b from-primary-500 to-primary-700 bg-clip-text text-transparent animate-[bounce_2s_infinite]"
          style={{ animationDelay: '0.3s' }}
        >
          4
        </span>
      </div>

      {/* Text */}
      <h2 className="mt-2 text-2xl md:text-3xl font-bold text-foreground animate-[fadeIn_0.8s_ease-out]">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-center text-foreground/60 animate-[fadeIn_1s_ease-out]">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-[fadeIn_1.2s_ease-out]">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-0.5"
        >
          <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
          Back to Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          className="group inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Go Back
        </button>
      </div>
    </div>
  );
}
