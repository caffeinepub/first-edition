import { Outlet } from '@tanstack/react-router';
import Navigation from './Navigation';
import { FileText } from 'lucide-react';

export default function Layout() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b-2 border-primary/20 bg-card shadow-elegant sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-elegant text-primary tracking-wide">
              First Edition
            </h1>
          </div>
        </div>
      </header>

      <Navigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t-2 border-primary/20 bg-card mt-auto">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} First Edition. Built with{' '}
            <span className="text-destructive">❤</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
